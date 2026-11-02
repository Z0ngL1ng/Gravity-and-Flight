<div align="center">

# Gravity & Flight

**Fine-grained evidence-grounded reasoning in remote sensing**

*Ground each judgment. Adapt when evidence changes.*

[Website launch & preview](docs/WEBSITE.md#view-the-website) · [Research notes](docs/RESEARCH.md) · [Release status](RELEASE_STATUS.md) · [中文](README_zh.md)

</div>

![Gravity and Flight: visual grounding and reasoning that adapts to evidence.](assets/project-cover.svg)

**Gravity and Flight (G&F)** is a two-stage post-training framework that teaches vision-language models how to connect detailed observations to task-specific judgments. Related scenes provide a further lesson: which judgments should remain consistent, which should change, and which should become less specific when evidence is limited.

This public showcase contains the project website, method overview, and selected reported results. **GitHub Pages activation is pending.** The full manuscript, training/evaluation implementation, model weights, and datasets are not released in this repository; see the [availability table](RELEASE_STATUS.md).

## From scene transfer to context transfer

The research starts from [Filling Before Advancing (FBA)](https://github.com/Z0ngL1ng/filling-before-advancing). FBA's second stage, **Bridging-Conv**, learns shared priors from target and related scenes. This inspired a finer question for G&F: **within one scene domain, how should judgments adapt when local attributes, spatial relations, or visibility change?**

G&F makes this question explicit with **Anchor–Bridging image pairs under a shared task**. Each image receives an independent response. Paired feedback then assesses the relation between the judgments. The pair can contain two different harbor images; it need not show the same geographic location or a temporal change. G&F starts from **Qwen3.5-4B**, followed by EoT-SFT and RTPO.

The name draws inspiration from gravity and aerodynamic lift. **Gravity** anchors visual claims to the image; **Flight** evaluates reasoning from described observations. This is a conceptual motivation for complementary verification, rather than a physical model of the training objective.

## Two stages, one single-image policy

![G&F method overview: EoT supervised initialization followed by independent sampling, complementary verification, and a shared pair advantage.](assets/method-overview.svg)

| Stage | What it learns | Harbor supervision |
| --- | --- | ---: |
| **1 · EoT-SFT** | Connect scene description, task analysis, and a supported answer through Evidence-of-Thought demonstrations. | 1,008 demonstrations over 888 images |
| **2 · RTPO** | Refine evidence use through Relational Transfer Policy Optimization on task-matched scenes. | 500 pairs containing 1,000 distinct images |

RTPO samples responses independently, matches them one-to-one, and combines three verification views:

| View | Assessment |
| --- | --- |
| **Gravity** | Visual fidelity throughout the response and coverage in the initial description, checked against the image and its Evidence Card. |
| **Flight** | Evidence use within each response and warranted consistency, change, or reduced specificity across the pair. Described premises are accepted conditionally; Flight does not inspect images or Evidence Cards. |
| **Task Check** | Final-answer correctness against the side-specific answer contract. |

The scores form an additive pair reward. One group-normalized advantage is assigned to both responses, with equal loss weight for the two sides. **At inference, the policy needs only one image and one question.** Verification cards are training supervision and do not enter the policy prompt. [Read the method notes →](docs/RESEARCH.md)

## Reported harbor results

The main study adapts Qwen3.5-4B. EoT-SFT improves the reported Overall score, and RTPO adds **4.56 points** beyond that supervised initialization.

| Training state | Overall | Gain over Base |
| --- | ---: | ---: |
| Qwen3.5-4B Base | 59.36 | — |
| Stage 1 · EoT-SFT | 64.56 | +5.20 |
| **G&F · EoT-SFT + RTPO** | **69.12** | **+9.76** |

| Model | HarborEval | VRSBench | RSVQA | OpenEval | OmniEarth | VLRS-Bench |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Qwen3.5-4B Base | 73.15 | 37.21 | 58.69 | 67.34 | 80.39 | 39.39 |
| **G&F** | **82.57** | **54.19** | **67.18** | **82.07** | **80.99** | **47.73** |

**Scope matters.** Overall is the unweighted mean of these six harbor-set scores on a 0–100 scale. Each set retains its own scoring protocol; the aggregate is not pooled accuracy or a full-benchmark leaderboard. G&F improves over its backbone on all six sets, while RSThinker has a higher VRSBench score in the broader comparison. Per-benchmark Stage-1 scores are not reported. These are results reported in the research draft; the evaluation implementation is not part of this release.

The [research notes](docs/RESEARCH.md) also cover reward ablations and matched controls, including Overall scores of **65.11 without Flight**, **66.32 without Gravity**, **65.12 for single-image RL**, and **66.49 for joint-input RL**.

## Beyond the main comparison

- **Separate urban specialization.** An urban model trained through both stages with 160 demonstrations and 60 training pairs improves over urban Stage 1 by **1.93 / 2.08 / 4.67 points** on fixed EarthVQA Urban, VRSBench Urban, and RSVQA HR subsets. This tests reuse of the framework, not zero-shot transfer of the harbor checkpoint.
- **Inside six sampled response pairs.** Mean full-response length is **355.50 → 179.50 tokens**, while mean task-related content density is **22.35% → 39.91%**. This descriptive analysis covers six image–question cases, with one response per model per case; it does not establish benchmark-wide efficiency or accuracy.

## Explore this repository

| Path | Contents |
| --- | --- |
| [`web/`](web/) | Bilingual static website, interactive benchmark comparisons, local fonts, and original illustrations |
| [`assets/`](assets/) | Project cover and method overview for this repository |
| [`docs/RESEARCH.md`](docs/RESEARCH.md) | Public method explanation, reported tables, and interpretation limits |
| [`docs/WEBSITE.md`](docs/WEBSITE.md) | Website launch status and preview instructions |
| [`RELEASE_STATUS.md`](RELEASE_STATUS.md) | Availability of the manuscript, code, weights, and data |
| [`LICENSE_SCOPE.md`](LICENSE_SCOPE.md) | Scope of permissions and third-party asset licenses |

To preview the website, run this command from the repository root:

```sh
python3 -m http.server 8765
```

Open [localhost:8765/web/](http://localhost:8765/web/). No build step, model download, GPU, or API key is needed. The primary English content remains readable without JavaScript; JavaScript adds Chinese switching, evidence tabs, and benchmark selection.

Resource releases and any future manuscript link will be recorded in [RELEASE_STATUS.md](RELEASE_STATUS.md).
