# Paper figures

Four author-provided PDF attachments are published with this website update. The files retain their original content under descriptive filenames. They are individual figure PDFs, not a release of the full G&F manuscript. Availability and reuse scope are recorded separately in [release status](../RELEASE_STATUS.md) and [license scope](../LICENSE_SCOPE.md).

## Source mapping and display files

| Figure | Original attachment | Original PDF | Full WebP (px) | Preview WebP (px) |
| --- | --- | --- | --- | --- |
| FBA motivation | `fig1.pdf` | [PDF](../web/assets/papers/fba-motivation.pdf) | [2800 × 1107](../web/assets/papers/fba-motivation.webp) | [1400 × 554](../web/assets/papers/fba-motivation-1400.webp) |
| FBA method | `fig3.pdf` | [PDF](../web/assets/papers/fba-method.pdf) | [2800 × 1205](../web/assets/papers/fba-method.webp) | [1400 × 603](../web/assets/papers/fba-method-1400.webp) |
| G&F motivation | `motivation-old.pdf` | [PDF](../web/assets/papers/gf-motivation.pdf) | [2800 × 944](../web/assets/papers/gf-motivation.webp) | [1400 × 472](../web/assets/papers/gf-motivation-1400.webp) |
| G&F method | `methods.pdf` | [PDF](../web/assets/papers/gf-method.pdf) | [2800 × 1392](../web/assets/papers/gf-method.webp) | [1400 × 696](../web/assets/papers/gf-method-1400.webp) |

Each WebP renders the complete original page on white, with no cropping, relabeling, or semantic edits. The full version is 2800 pixels wide at WebP quality 93; the 1400-pixel preview uses quality 92. These are display derivatives of the supplied PDFs, not reconstructions or newly generated research outputs. The PDFs are image-based; an enlarged rendering improves inspection but cannot recover detail absent from the source.

The website scales the 1400-pixel inline preview to the page layout. Its Fit / 1:1 dialog loads the 2800-pixel version and permits scrolling at 1:1. Without JavaScript or dialog support, clicking the preview opens the full WebP directly; a separate Original PDF link remains available. Embedded figure labels retain their original language when the surrounding page switches between English and Chinese.

## Caption boundaries

| Figure | What the caption may establish |
| --- | --- |
| **FBA motivation** | The earlier work’s framing: alignment, modality, and task capabilities needed for remote-sensing scenario specialization, illustrated with a harbor report. This is not a G&F result figure. |
| **FBA method** | FBA’s three-stage design. Stage 2 learns shared priors from target and related bridging scenes, providing the intellectual starting point for G&F’s within-scene contextual-transfer question. Its model and teacher labels belong to FBA; G&F starts from Qwen3.5-4B and follows its own two-stage design. |
| **G&F motivation** | An **author-provided earlier illustrative version** of a vehicle-staging example. Both waterfronts are in one input image. It illustrates connecting local evidence to the task; it is not a quantitative evaluation, evidence of gains across every pictured provider, or a depiction of two-image inference. Its wording should not be presented as the current manuscript’s final figure edition. |
| **G&F method** | EoT-SFT → RTPO: independent responses for Anchor and Bridging images, random one-to-one response matching, complementary verification, an additive pair reward, and a shared advantage. Deployment remains single-image. |

Keep the G&F method’s schematic verifier flow distinct from its input permissions. Gravity checks visual claims against images and Evidence Cards. Flight evaluates descriptions and analyses with the public task and permitted comparison metadata; it does not receive images, Evidence Cards, answer contracts, reference judgments, or final-answer text. The Boundary Card icon does not mean the entire card is passed to Flight. Task Check uses the side-specific answer contract. Gravity does not gate Flight, and frozen-reference KL is outside the reward. See the [method notes](RESEARCH.md#method) for the precise definitions.

FBA’s scene-transfer lineage does not imply initialization from an FBA checkpoint or that G&F empirically supersedes FBA across domains. The figure publication does not change the reported research snapshot or the scope of its results.

## Original PDF checksums

SHA-256 hashes identify the supplied source PDFs. Renaming a source to its public filename does not change its bytes.

| Public PDF | SHA-256 |
| --- | --- |
| `fba-motivation.pdf` | `a9c58054718b9aa0920795de18f7c22dda90cb11ce72d134577b28e4fa640ae9` |
| `fba-method.pdf` | `c22a08dd3b4652910ccfe05c505c792ef38354038c13c99ea05358ae4488e178` |
| `gf-motivation.pdf` | `a80cf144df032192337b0185d545ae4c1cbf134cc9a6ff75febb2b694f61b02c` |
| `gf-method.pdf` | `1d398125ad49507008b0835dceedb2a122c403db2628e30bb74fff34e0c60cf3` |

## 中文说明

四份原始 PDF 均由作者提供，公开文件与附件的对应关系及校验值见上表。WebP 仅做完整页面渲染与尺寸适配，未裁切、改写标签或改变图意。G&F 动机图来自较早的示意版本，不能当作定量实验结果；其中两处岸线位于同一张输入图像中。FBA 三阶段方法与 G&F 两阶段方法应分别说明。原始插图 PDF 已公开，G&F 完整论文尚未发布。
