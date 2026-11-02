# Project website

The website is a static bilingual research narrative. It requires no build step, GPU, model download, API key, or external font service.

## View the website

**[Visit the live project website →](https://z0ngl1ng.github.io/Gravity-and-Flight/)**

GitHub Pages was enabled and the public website verified on **2026-11-02**. The root URL redirects to the canonical [website entry](https://z0ngl1ng.github.io/Gravity-and-Flight/web/).

For a local preview, run from the repository root:

```sh
python3 -m http.server 8765
```

Open [localhost:8765/web/](http://localhost:8765/web/). The root URL also redirects to `web/`.

**[项目网站已上线 →](https://z0ngl1ng.github.io/Gravity-and-Flight/)**，于 2026-11-02 完成在线验证。也可在仓库根目录执行上述命令，通过本机浏览器预览。

## Publish with GitHub Pages

The active publishing source is **main / (root)**. Updates pushed to `main` are published by GitHub Pages. To restore this configuration if it changes:

1. Open [Settings → Pages](https://github.com/Z0ngL1ng/Gravity-and-Flight/settings/pages).
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main**, then **/(root)**, and save.
4. After the Pages build completes, open the public URL and verify the website. If the address changes, update both READMEs and the [release status](../RELEASE_STATUS.md).

The root `.nojekyll` serves the static source directly. The root `index.html` redirects to `web/`; all website assets use relative paths so they load under the `/Gravity-and-Flight/` project prefix. No custom domain is configured. The repository About description, homepage, and topics are maintained separately; see [REPOSITORY.md](REPOSITORY.md).

Official reference: [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Structure

| File | Purpose |
| --- | --- |
| [`web/index.html`](../web/index.html) | Semantic English content and initial result tables; readable without JavaScript |
| [`web/styles.css`](../web/styles.css) | Visual tokens, typography, responsive layout, reduced-motion and print styles |
| [`web/i18n.js`](../web/i18n.js) | English and Chinese interface and research copy |
| [`web/research-data.js`](../web/research-data.js) | Reported values, source revision, and study scope |
| [`web/main.js`](../web/main.js) | Language switch, figure viewer, progressive reveals, evidence tabs, benchmark selection, navigation, and clipboard feedback |
| [`web/assets/`](../web/assets/) | Local photographs, vector illustrations, paper figures, and fonts |
| [`web/assets/papers/`](../web/assets/papers/) | Author-provided paper figures used by the website and repository overview |

## Design system

Warm `#FCF1EB` provides the page background and Base-model comparison field. Cool `#EFF5FB` marks G&F method and comparison surfaces. Dark ink and the evidence chapter provide contrast; labels and values accompany comparison colors.

The Gravity and Flight wordmark, cover title, verification headings, and method title use system Times New Roman with looser spacing. Italic accents use its italic face. The fallback stack is Times, Liberation Serif, Noto Serif, and the system serif. Instrument Serif remains on other regular display text and numeric callouts; DM Sans provides prose and controls. Times New Roman is not bundled or downloaded. Chinese text uses system fallbacks. Two WOFF2 files are self-hosted with `font-display: swap`: Instrument Serif regular and DM Sans. The former Instrument Serif italic file is no longer included. The bundled fonts’ [license notices](../LICENSE_SCOPE.md#bundled-fonts) are retained. Font sources: [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif) and [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans).

The composition draws on the reading rhythm of a research publication: a typographic cover, an asymmetric introduction, a full-width illustration, numbered chapters, and quiet controls. The [design reference collection](https://azivor.github.io/reference/#anthropic) informed composition only; its artwork is not bundled or traced.

The field-study illustration and airfoil sketch are original vector drawings. Aerodynamics supplies a naming metaphor, not a physical model of the reward. The sketch's lift and weight arrows are illustrative; their lengths do not encode measured forces or reward weights. [NASA Glenn's force terminology](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/four-forces-on-an-airplane/) is a factual reference, not an endorsement or image source.

## Language, motion, and figure viewing

Every page load starts in **English**, including when the browser language is Chinese or the visitor previously selected Chinese. The language control switches the current page between English and Chinese; that choice is not persisted to local storage or another session.

Content is visible by default in the HTML and CSS. Sections below the initial viewport receive a one-time entry animation through the Web Animations API when they scroll into view; sections initially on screen do not animate. Missing JavaScript or animation support leaves the content readable. `prefers-reduced-motion: reduce` skips entry animations, cancels any running entry animation when enabled, and disables CSS transitions, animations, and smooth scrolling.

The paper figures retain their complete source layouts. On the page, the white paper margins blend into their warm or cool reading surface through CSS compositing, without a white card border. The enlargement dialog uses the unblended white source, preserving its original colors. The method viewer can be opened from the figure or the small link beside its PDF link. Story previews use 1400-pixel-wide WebP images. The method section displays the original G&F framework as a full-width figure with a brief caption, replacing the earlier HTML flow diagram. Its responsive image selects a 1400- or 2800-pixel source for the display size and pixel density. The repository overview uses only the four current G&F paper figures; two earlier FBA figures remain in the website’s research-lineage comparison. With JavaScript and dialog support, a figure click opens the full 2800-pixel-wide WebP in an enlargement dialog with **Fit** and **1:1** views; 1:1 allows scrolling across the full image. Without JavaScript or dialog support, the image link opens that full WebP directly in a new tab. A separate **Original PDF** link is available beside each figure and inside the dialog. See [figure provenance](FIGURES.md) for the source mappings, checksums, and caption boundaries. These individual PDFs are available; the full G&F manuscript remains unreleased.

The HTML includes content-fingerprint query parameters on the CSS/JavaScript and current G&F figure URLs. Refresh those fingerprints when changing the corresponding file so repeat visits load the current assets.

## Maintain the research content

The research snapshot is documented in [RESEARCH.md](RESEARCH.md#source-of-truth). Website design changes do not imply new experimental results. When updating a reported value, update the data module and the English HTML fallback together, then check both languages. Missing per-benchmark Stage-1/control values remain `null` rather than inferred scores.

Keep the study boundaries visible: Overall is a six-set harbor mean; urban specialization uses a separately trained model; the token analysis describes six sampled cases. The two example photographs illustrate reasoning relations and are not evaluated model outputs. The author-provided paper figures are also presentation material: their caption boundaries are recorded in [FIGURES.md](FIGURES.md#caption-boundaries). Public resource links should point to accessible notes or the availability table until the corresponding artifacts are released.

## Validate changes

From the repository root:

```sh
python3 scripts/check_site.py
node --check web/main.js
node --check web/i18n.js
node --check web/research-data.js
```

The repository workflow runs these static checks on pushes and pull requests. For changes to layout or interaction, also preview both languages at desktop and phone widths, with and without JavaScript. Confirm that a reload starts in English after switching to Chinese. Exercise all seven benchmark options, the evidence tabs and their arrow/Home/End keys, the mobile menu and Escape key, native disclosures, and clipboard feedback. Open each figure placement, including the full-width method figure, switch between Fit and 1:1, close with Escape, and follow the original PDF links. Check both Gravity and Flight title widths. Check reveal behavior with reduced motion enabled. Check for horizontal overflow, failed fonts/images, console errors, and accurate internal anchors under the project URL prefix.
