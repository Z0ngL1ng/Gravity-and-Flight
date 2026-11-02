# Project website

The website is a static bilingual research narrative. It requires no build step, GPU, model download, API key, or external font service.

## View the website

**The source is public; GitHub Pages still needs to be enabled for this repository.** The intended website URL is `https://z0ngl1ng.github.io/Gravity-and-Flight/web/`. It is not yet a verified live link.

For a local preview, run from the repository root:

```sh
python3 -m http.server 8765
```

Open [localhost:8765/web/](http://localhost:8765/web/). The root URL also redirects to `web/`.

**网站源码已公开，在线访问需先启用 GitHub Pages。** 在仓库根目录执行上述命令后，可通过本机浏览器预览。当前预期线上地址尚未验证上线。

## Publish with GitHub Pages

This repository is ready for branch-based static publishing:

1. Open [Settings → Pages](https://github.com/Z0ngL1ng/Gravity-and-Flight/settings/pages).
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main**, then **/(root)**, and save.
4. After the Pages build completes, open the URL shown by GitHub and verify the website. Update this page and the [release status](../RELEASE_STATUS.md) to record the live link.

The root `.nojekyll` serves the static source directly. The root `index.html` redirects to `web/`; all website assets use relative paths so they load under the `/Gravity-and-Flight/` project prefix. No custom domain is configured.

Official reference: [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Structure

| File | Purpose |
| --- | --- |
| [`web/index.html`](../web/index.html) | Semantic English content and initial result tables; readable without JavaScript |
| [`web/styles.css`](../web/styles.css) | Visual tokens, typography, responsive layout, reduced-motion and print styles |
| [`web/i18n.js`](../web/i18n.js) | English and Chinese interface and research copy |
| [`web/research-data.js`](../web/research-data.js) | Reported values, source revision, and study scope |
| [`web/main.js`](../web/main.js) | Language switch, evidence tabs, benchmark selection, navigation, and clipboard feedback |
| [`web/assets/`](../web/assets/) | Local photographs, vector illustrations, and fonts |
| [`assets/`](../assets/) | Repository cover and method overview |

## Design system

Warm `#FCF1EB` provides the page background and Base-model comparison field. Cool `#EFF5FB` marks G&F method and comparison surfaces. Dark ink and the evidence chapter provide contrast; labels and values accompany comparison colors.

Instrument Serif provides display typography, and DM Sans provides prose and controls. Chinese text uses system fallbacks. Three WOFF2 files are self-hosted with `font-display: swap`. Their [license notices](../LICENSE_SCOPE.md#bundled-fonts) are retained. Font sources: [Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif) and [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans).

The composition draws on the reading rhythm of a research publication: a typographic cover, an asymmetric introduction, a full-width illustration, numbered chapters, and quiet controls. The [design reference collection](https://azivor.github.io/reference/#anthropic) informed composition only; its artwork is not bundled or traced.

The field-study illustration and airfoil sketch are original vector drawings. Aerodynamics supplies a naming metaphor, not a physical model of the reward. The sketch's lift and weight arrows are illustrative; their lengths do not encode measured forces or reward weights. [NASA Glenn's force terminology](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/four-forces-on-an-airplane/) is a factual reference, not an endorsement or image source.

## Maintain the research content

The research snapshot is documented in [RESEARCH.md](RESEARCH.md#source-of-truth). Website design changes do not imply new experimental results. When updating a reported value, update the data module and the English HTML fallback together, then check both languages. Missing per-benchmark Stage-1/control values remain `null` rather than inferred scores.

Keep the study boundaries visible: Overall is a six-set harbor mean; urban specialization uses a separately trained model; the token analysis describes six sampled cases. The two example photographs illustrate reasoning relations and are not evaluated model outputs. Public resource links should point to accessible notes or the availability table until the corresponding artifacts are released.

## Validate changes

From the repository root:

```sh
python3 scripts/check_site.py
node --check web/main.js
node --check web/i18n.js
node --check web/research-data.js
```

The repository workflow runs these static checks on pushes and pull requests. For changes to layout or interaction, also preview both languages at desktop and phone widths, with and without JavaScript. Exercise all seven benchmark options, the evidence tabs and their arrow/Home/End keys, the mobile menu and Escape key, native disclosures, and clipboard feedback. Check for horizontal overflow, failed fonts/images, console errors, and accurate internal anchors under the project URL prefix.
