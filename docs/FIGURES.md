# Paper figures

Six author-provided figures are published as original PDFs and WebP display versions: two FBA figures retained from earlier uploads, and four G&F figures from the latest supplied set. The project READMEs use only the four G&F paper figures. These are individual figure PDFs, not a release of the full G&F manuscript. Availability and reuse scope are recorded in [release status](../RELEASE_STATUS.md) and [license scope](../LICENSE_SCOPE.md).

## Source mapping and display files

Attachment filenames are local to each supplied set. In particular, the earlier FBA `fig1.pdf` and the latest G&F `fig1.pdf` depict different work.

| Figure | Supplied set and filename | Original PDF | Full WebP (px) | Preview WebP (px) |
| --- | --- | --- | --- | --- |
| FBA motivation | Earlier FBA upload · `fig1.pdf` | [PDF](../web/assets/papers/fba-motivation.pdf) | [2800 × 1107](../web/assets/papers/fba-motivation.webp) | [1400 × 554](../web/assets/papers/fba-motivation-1400.webp) |
| FBA method | Earlier FBA upload · `fig3.pdf` | [PDF](../web/assets/papers/fba-method.pdf) | [2800 × 1205](../web/assets/papers/fba-method.webp) | [1400 × 603](../web/assets/papers/fba-method-1400.webp) |
| G&F motivation | Latest G&F set · `fig1.pdf` | [PDF](../web/assets/papers/gf-motivation.pdf) | [2800 × 953](../web/assets/papers/gf-motivation.webp) | [1400 × 477](../web/assets/papers/gf-motivation-1400.webp) |
| G&F method | Latest G&F set · `fig2.pdf` | [PDF](../web/assets/papers/gf-method.pdf) | [2800 × 1392](../web/assets/papers/gf-method.webp) | [1400 × 696](../web/assets/papers/gf-method-1400.webp) |
| G&F qualitative cases | Latest G&F set · `fig3.pdf` | [PDF](../web/assets/papers/gf-qualitative-cases.pdf) | [2800 × 1361](../web/assets/papers/gf-qualitative-cases.webp) | [1400 × 681](../web/assets/papers/gf-qualitative-cases-1400.webp) |
| G&F token analysis | Latest G&F set · `fig4.pdf` | [PDF](../web/assets/papers/gf-token-analysis.pdf) | [2800 × 1659](../web/assets/papers/gf-token-analysis.webp) | [1400 × 830](../web/assets/papers/gf-token-analysis-1400.webp) |

The four current G&F source PDFs are byte-identical to the corresponding figures in the manuscript snapshot dated **2026-10-30**, revision **`b51cf1882030d8008983c71ef829d0221b0690ce`**: motivation, method, qualitative comparison, and token-level analysis. This provenance does not imply publication of the full manuscript. The new G&F motivation and method files are the current editions used by both the website and READMEs.

Each WebP renders the complete original page on white, with no cropping, relabeling, or content changes. The full version is 2800 pixels wide and the preview is 1400 pixels wide. WebP exports use quality 92–93; the corrected soft-mask exports use quality 93 at both sizes. These are display derivatives of the supplied PDFs, not reconstructions or newly generated research outputs. The PDFs are image-based; an enlarged rendering improves inspection but cannot recover detail absent from the source.

For source pages with an image soft mask, composite the embedded RGB pixels and their mask onto white at the original pixel resolution **before resizing**. Then preserve the full PDF page geometry when producing the display sizes. This prevents invisible black pixels in transparent margins from leaking into a gray edge during resampling; no artwork is cropped, and the source PDFs remain unchanged.

The website's figure viewer loads the 2800-pixel version and permits scrolling at 1:1. Without JavaScript or dialog support, clicking a linked preview opens the full WebP directly; a separate Original PDF link remains available. Embedded figure labels retain their original language when the surrounding page switches between English and Chinese.

## Caption boundaries

| Figure | What the caption may establish |
| --- | --- |
| **FBA motivation** | The earlier work's framing: alignment, modality, and task capabilities needed for remote-sensing scenario specialization, illustrated with a harbor report. This is an FBA figure. |
| **FBA method** | FBA's three-stage design. Stage 2 learns shared priors from target and related bridging scenes, providing the intellectual starting point for G&F's within-scene contextual-transfer question. Its model and teacher labels belong to FBA; G&F starts from Qwen3.5-4B and follows its own two-stage design. |
| **G&F motivation** | A vehicle-staging example connecting local observations to the task. Both waterfronts are in one input image. Its qualitative labels do not establish a quantitative evaluation or gains across every pictured model provider. |
| **G&F method** | EoT-SFT → RTPO: independent responses for Anchor and Bridging images, random one-to-one response matching, complementary verification, an additive pair reward, and a shared advantage. Deployment remains single-image. |
| **G&F qualitative cases** | Two held-out harbor examples using the same image–question inputs for Base and G&F. Case 1 connects parking bays, driving aisles, and quay access to organized parking and landside circulation. Case 2 distinguishes a vessel alongside an open quay from one inside an enclosed dock. These examples do not provide an aggregate accuracy estimate. |
| **G&F token analysis** | Six sampled response pairs, with evidence (E) and inference (I) annotations on a common absolute content-token axis. This is a descriptive twelve-response analysis, not a benchmark-wide efficiency or accuracy measurement. |

Keep the G&F method's schematic verifier flow distinct from its input permissions. Gravity checks visual claims against images and Evidence Cards. Flight evaluates descriptions and analyses with the public task and permitted comparison metadata; it does not receive images, Evidence Cards, answer contracts, reference judgments, or final-answer text. The Boundary Card icon does not mean the entire card is passed to Flight. Task Check uses the side-specific answer contract. Gravity does not gate Flight, and frozen-reference KL is outside the reward. See the [method notes](RESEARCH.md#method) for the precise definitions.

In the token figure, peach tracks represent Base and blue tracks represent G&F. Dark marks indicate membership in annotated evidence or inference phrases, not attention weights. Each track ends at that response's final content token. Format-only tokens are excluded; ordinary punctuation and final-answer content remain. **NA in Base case 5 means no analytical tokens**, rather than a zero inference-density score.

The plotted **content lengths** have means of **350.83 tokens for Base and 156.33 for G&F**. The separately reported **full-response lengths**, including format tokens, are **355.50 and 179.50**; their reduction is **49.51%**. That percentage is not computed from the lengths of the plotted content tracks. Preserve this distinction when placing the figure beside response statistics. Definitions and scope appear in the [response analysis](RESEARCH.md#response-analysis).

FBA's scene-transfer lineage does not imply initialization from an FBA checkpoint or that G&F empirically supersedes FBA across domains. Publishing these figures does not change the reported research snapshot or the scope of its results.

## Original PDF checksums

SHA-256 hashes identify the supplied source PDFs. Renaming a source to its public filename does not change its bytes.

| Public PDF | SHA-256 |
| --- | --- |
| `fba-motivation.pdf` | `a9c58054718b9aa0920795de18f7c22dda90cb11ce72d134577b28e4fa640ae9` |
| `fba-method.pdf` | `c22a08dd3b4652910ccfe05c505c792ef38354038c13c99ea05358ae4488e178` |
| `gf-motivation.pdf` | `ff343d2a27d7cc5a1c7b9d40f8c19e4ace6afa8e44822d01ec4d1c86f2d0cfd6` |
| `gf-method.pdf` | `4420d814e5697d8e392844fcd6bb78a686c937c03deb54dc0365881905823d9c` |
| `gf-qualitative-cases.pdf` | `e318df43ddf8bd7ad7d5db2c6092f88803efd352ea3f48fa15c0827337346275` |
| `gf-token-analysis.pdf` | `20aa32e97721d1e13c086e8f159da57775a40be9412074861284097f8f0c5f02` |

## 中文说明

当前共公开六份作者提供的原始插图 PDF：保留此前的两幅 FBA 图，并使用最新四幅 G&F 图。最新附件 `fig1` 至 `fig4` 依次为 G&F 动机、方法、两个定性案例和六案例 token 分析，均与上述论文快照对应图文件字节一致。两个项目 README 仅使用这四幅 G&F 论文图。

WebP 仅做完整页面渲染与尺寸适配，未裁切、改写标签或改变图意。G&F 动机图中的两处岸线位于同一张输入图像中；定性案例和六案例分析应保留各自适用范围。token 图展示排除格式 token 后的内容长度（均值 **350.83 → 156.33**），与包含格式 token 的完整回答长度（**355.50 → 179.50**，缩短 **49.51%**）口径不同。FBA 三阶段方法与 G&F 两阶段方法分别说明；原始插图 PDF 已公开，G&F 完整论文尚未发布。
