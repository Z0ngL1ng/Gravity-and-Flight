#!/usr/bin/env python3
"""Check this static showcase's local links without network calls or dependencies.

Checks HTML/SVG resources and IDs, CSS url()/imports, Markdown links and heading
fragments, and same-repository GitHub blob/main or tree/main links. Other remote
URLs are deliberately not fetched. This is a link check, not a full Markdown
renderer or a substitute for browser/accessibility testing.
"""
from __future__ import annotations

import html
import re
import sys
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

OWNER = "Z0ngL1ng"
REPOSITORY = "Gravity-and-Flight"
TEXT_SUFFIXES = {".html", ".htm", ".svg", ".css", ".md", ".js", ".json", ".yml", ".yaml", ".txt"}
SKIP_DIRS = {".git", ".venv", "node_modules", "__pycache__", ".cache"}
PRIVATE_URL = re.compile(
    r"(?:https?:)?//(?:github\.com|raw\.githubusercontent\.com)/"
    + re.escape(OWNER) + r"/G-F-Write(?=[/#?\s\"'<>)]|$)", re.IGNORECASE
)
CSS_URL = re.compile(r"url\(\s*(?:\"([^\"]*)\"|'([^']*)'|([^)]*?))\s*\)", re.IGNORECASE)
REMOTE_URL = re.compile(r"https?://[^\s<>\"'`\\]+")


def css_links(text):
    """Keep newlines while blanking comments, so diagnostics retain line numbers."""
    cleaned = re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group().count("\n"), text, flags=re.S)
    for match in CSS_URL.finditer(cleaned):
        yield next(value for value in match.groups() if value is not None).strip(), cleaned.count("\n", 0, match.start()) + 1
    for match in re.finditer(r"@import\s+['\"]([^'\"]+)['\"]", cleaned, re.IGNORECASE):
        yield match.group(1), cleaned.count("\n", 0, match.start()) + 1


class Markup(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = []
        self.links = []
        self.in_style = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        line = self.getpos()[0]
        anchor = attrs.get("id") or (attrs.get("name") if tag == "a" else None)
        if anchor:
            if anchor in self.ids:
                self.duplicates.append((anchor, line))
            self.ids.add(anchor)
        for key in ("href", "src", "poster", "xlink:href"):
            if attrs.get(key):
                self.links.append((attrs[key], line))
        if tag == "object" and attrs.get("data"):
            self.links.append((attrs["data"], line))
        # Data-URL srcsets contain commas that are not candidate separators.
        srcset = attrs.get("srcset", "")
        if srcset and not srcset.lstrip().startswith("data:"):
            for candidate in srcset.split(","):
                if candidate.strip():
                    self.links.append((candidate.strip().split()[0], line))
        if attrs.get("style"):
            self.links.extend((url, line + offset - 1) for url, offset in css_links(attrs["style"]))
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            match = re.search(r"(?:^|;)\s*url\s*=\s*['\"]?([^'\"]+)", attrs.get("content", ""), re.I)
            if match:
                self.links.append((match.group(1).strip(), line))
        if tag == "meta" and (attrs.get("property") or attrs.get("name")) in {"og:image", "twitter:image"}:
            if attrs.get("content"):
                self.links.append((attrs["content"], line))
        if tag == "style":
            self.in_style = True

    def handle_startendtag(self, tag, attributes):
        self.handle_starttag(tag, attributes)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == "style":
            self.in_style = False

    def handle_data(self, data):
        if self.in_style:
            line = self.getpos()[0]
            self.links.extend((url, line + offset - 1) for url, offset in css_links(data))


def without_fences(text):
    result = []
    fence = None
    for line in text.splitlines(keepends=True):
        marker = re.match(r"^ {0,3}(`{3,}|~{3,})", line)
        if fence:
            result.append("\n" if line.endswith("\n") else "")
            if marker and marker.group(1)[0] == fence[0] and len(marker.group(1)) >= len(fence):
                fence = None
        elif marker:
            fence = marker.group(1)
            result.append("\n" if line.endswith("\n") else "")
        else:
            result.append(line)
    return "".join(result)


def heading_slug(value):
    value = re.sub(r"!?\[([^]]+)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"<[^>]+>", "", value)
    value = html.unescape(value).strip().lower()
    # GitHub keeps underscores and hyphens, but removes other punctuation/symbols.
    value = "".join(ch for ch in value if ch in "_-" or unicodedata.category(ch)[0] not in "PSC")
    return re.sub(r"\s", "-", value)


def markdown_ids(text):
    visible = without_fences(text)
    markup = Markup()
    markup.feed(visible)
    ids = set(markup.ids)
    used = set()
    lines = visible.splitlines()
    for i, line in enumerate(lines):
        atx = re.match(r"^ {0,3}#{1,6}\s+(.+?)(?:\s+#+)?\s*$", line)
        setext = i + 1 < len(lines) and re.match(r"^ {0,3}(?:=+|-+)\s*$", lines[i + 1])
        if atx:
            heading = atx.group(1)
        elif line.strip() and setext and not re.match(r"^\s*[|>*-]", line):
            heading = line
        else:
            continue
        slug = heading_slug(heading)
        candidate, suffix = slug, 0
        while candidate in used:
            suffix += 1
            candidate = "{}-{}".format(slug, suffix)
        used.add(candidate)
        ids.add(candidate)
    return ids, markup


def markdown_links(text):
    visible = without_fences(text)
    # Inline code examples are not links; preserve their newlines for diagnostics.
    visible = re.sub(r"(`+)(.*?)\1", lambda m: "\n" * m.group().count("\n"), visible, flags=re.S)
    # Starting after ]( also finds the outer link around a linked Markdown image.
    for match in re.finditer(r"\]\(\s*", visible):
        start = match.end()
        if start >= len(visible):
            continue
        if visible[start] == "<":
            end = visible.find(">", start + 1)
            target = visible[start + 1:end] if end != -1 else ""
        else:
            end, depth = start, 0
            while end < len(visible):
                char = visible[end]
                if char == "\\" and end + 1 < len(visible):
                    end += 2
                    continue
                if char == "(":
                    depth += 1
                elif char == ")":
                    if depth == 0:
                        break
                    depth -= 1
                elif char.isspace() and depth == 0:
                    break
                end += 1
            target = visible[start:end]
        if target:
            yield re.sub(r"\\([()])", r"\1", target), visible.count("\n", 0, match.start()) + 1
    # Reference-style targets are checked once, whether used once or repeatedly.
    for match in re.finditer(r"^ {0,3}\[[^]\n]+\]:\s*(?:<([^>]+)>|(\S+))", visible, re.M):
        yield match.group(1) or match.group(2), visible.count("\n", 0, match.start()) + 1


class SiteChecker:
    def __init__(self, root):
        self.root = Path(root).resolve()
        self.errors = set()
        self.references = 0
        self.anchor_cache = {}

    def error(self, source, line, message):
        self.errors.add("{}:{}: {}".format(source.relative_to(self.root), line, message))

    def anchors(self, path):
        if path not in self.anchor_cache:
            text = path.read_text(encoding="utf-8")
            if path.suffix.lower() == ".md":
                self.anchor_cache[path] = markdown_ids(text)[0]
            else:
                parser = Markup()
                parser.feed(text)
                self.anchor_cache[path] = parser.ids
        return self.anchor_cache[path]

    def check_link(self, source, line, value):
        value = html.unescape(value.strip())
        if not value:
            return
        parts = urlsplit(value)
        url_path = unquote(parts.path)
        github_file = False
        if parts.scheme or parts.netloc:
            prefix = "/{}/{}/".format(OWNER, REPOSITORY)
            if parts.netloc.lower() == "github.com" and url_path.lower().startswith(prefix.lower()):
                tail = url_path[len(prefix):]
                if tail.startswith(("blob/main/", "tree/main/")):
                    url_path = "/" + tail.split("/", 2)[2]
                    github_file = True
                else:
                    return
            elif parts.netloc.lower() == "raw.githubusercontent.com" and url_path.lower().startswith((prefix + "main/").lower()):
                url_path = "/" + url_path[len(prefix + "main/"):]
                github_file = True
            else:
                return
        # A fragment in a standalone stylesheet refers to its consuming document.
        if not url_path and source.suffix.lower() == ".css":
            return
        if url_path.startswith("/"):
            project_prefix = "/" + REPOSITORY + "/"
            if url_path.startswith(project_prefix):
                url_path = url_path[len(project_prefix):]
            target = self.root / url_path.lstrip("/")
        elif url_path:
            target = source.parent / url_path
        else:
            target = source
        target = target.resolve()
        self.references += 1
        try:
            target.relative_to(self.root)
        except ValueError:
            self.error(source, line, "link escapes repository: " + value)
            return
        if not target.exists():
            self.error(source, line, "missing target: " + value)
            return
        if target.is_dir():
            for name in ("index.html", "README.md"):
                if (target / name).is_file():
                    target = target / name
                    break
        fragment = unquote(parts.fragment).split(":~:text=", 1)[0]
        if not fragment or target.is_dir():
            return
        if github_file and re.fullmatch(r"L\d+(?:-L\d+)?", fragment):
            return
        if target.suffix.lower() in {".html", ".htm", ".svg", ".md"}:
            anchors = self.anchors(target)
            # GitHub also accepts its explicit user-content- prefixed HTML IDs.
            plain = fragment.removeprefix("user-content-") if hasattr(str, "removeprefix") else re.sub(r"^user-content-", "", fragment)
            if fragment not in anchors and plain not in anchors:
                self.error(source, line, "missing anchor: " + value)

    def run(self):
        files = sorted(path for path in self.root.rglob("*") if path.is_file()
                       and not any(part in SKIP_DIRS for part in path.relative_to(self.root).parts)
                       and path.suffix.lower() in TEXT_SUFFIXES)
        for source in files:
            text = source.read_text(encoding="utf-8")
            for match in PRIVATE_URL.finditer(html.unescape(text)):
                self.error(source, text.count("\n", 0, match.start()) + 1, "private manuscript repository URL: " + match.group())
            suffix = source.suffix.lower()
            links = []
            if suffix in {".html", ".htm", ".svg"}:
                parser = Markup()
                parser.feed(text)
                links.extend(parser.links)
                for anchor, line in parser.duplicates:
                    self.error(source, line, "duplicate ID: " + anchor)
            elif suffix == ".md":
                _, parser = markdown_ids(text)
                links.extend(parser.links)
                links.extend(markdown_links(text))
            elif suffix == ".css":
                links.extend(css_links(text))
            # This also catches public documentation links embedded in JS/JSON.
            for match in REMOTE_URL.finditer(text):
                url = match.group().rstrip(".,;)")
                links.append((url, text.count("\n", 0, match.start()) + 1))
            for value, line in set(links):
                self.check_link(source, line, value)
        for message in sorted(self.errors):
            print(message, file=sys.stderr)
        if self.errors:
            print("Site check failed: {} error(s).".format(len(self.errors)), file=sys.stderr)
            return 1
        print("Site check passed: {} text files, {} local references.".format(len(files), self.references))
        return 0


def main():
    return SiteChecker(Path(__file__).resolve().parents[1]).run()


if __name__ == "__main__":
    raise SystemExit(main())
