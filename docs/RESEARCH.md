# Gravity & Flight — research notes

[Project overview](../README.md) · [中文概览](../README_zh.md) · [Release status](../RELEASE_STATUS.md)

These notes explain the method and reproduce reported results used by the public project showcase. They accompany the website; they are not a release of the full manuscript, evaluation implementation, model weights, or datasets. The [source-of-truth section](#source-of-truth) records the research snapshot and how the numbers should be maintained.

## Research lineage

Filling Before Advancing (FBA) organizes adaptation by capability dependency. Its second stage, **Bridging-Conv**, learns shared remote-sensing priors from target and related scenes. The authors identify that scene-transfer idea as the starting point for G&F's finer question: within one scene domain, how should judgments adapt to changes in local attributes, spatial relations, and visibility?

The earlier method is documented in the [FBA repository](https://github.com/Z0ngL1ng/filling-before-advancing/blob/6803ab97583562d3e5e580c9acb84f7495ed852f/README.md#L55-L65). G&F itself starts from **Qwen3.5-4B** and trains through **EoT-SFT → RTPO**. The lineage describes intellectual motivation rather than initialization from an FBA checkpoint.

The name also draws on gravity and aerodynamic lift: visual claims stay anchored to an image while reasoning develops from its observations. This is a conceptual design analogy. The original website sketch labels the physical forces **Lift / 升力** and **Weight / 重力**; arrow lengths do not encode reward weights. [NASA Glenn's force overview](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/four-forces-on-an-airplane/) supplies the physical terminology.

## Method

### Two stages and the training unit

**Evidence-of-Thought supervised fine-tuning (EoT-SFT)** teaches a description → analysis → answer process. The resulting Stage-1 checkpoint initializes RTPO and remains its frozen KL reference. Harbor specialization adapts Qwen3.5-4B with LoRA and a frozen vision encoder.

**Relational Transfer Policy Optimization (RTPO)** uses an Anchor image A and a distinct Bridging image B under a shared task. The question, target, scope, and public conditions apply to each image independently. The images are comparable scene configurations; the method does not require the same geographic location or a registered temporal pair.

Each image has an **Evidence Card** recording visible objects, attributes, relations, coverage priorities, and visibility limits. A shared **Boundary Card** connects observations to public conditions, inference limits, side-specific answer contracts, and comparison annotations. These cards support verification and are not included in the policy prompt.

| Harbor supervision item | Count |
| --- | ---: |
| Stage-1 demonstrations | 1,008 |
| Stage-1 images | 888 |
| Stage-2 training pairs | 500 |
| Stage-2 distinct images | 1,000 |
| Stage-2 Evidence Cards | 1,000 |
| Stage-2 Boundary Cards | 500 |

The 500 pairs contain **372 decisive-change cases (74.4%)**, **77 invariance cases (15.4%)**, and **51 visibility-scope cases (10.2%)**. A supported judgment changes when decisive evidence changes, remains consistent when irrelevant details vary, and becomes less specific when a required detail is obscured. Both sides receive symmetric supervision.

### Complementary verification

| Criterion | Input and assessment | Raw score |
| --- | --- | ---: |
| **Gravity G1 · Visual fidelity** | Checks visual claims throughout the response against the image and Evidence Card, including objects, attributes, counts, ownership, relations, and visibility-compatible certainty. | 0–3 |
| **Gravity G2 · Coverage** | Checks salient subjects, attributes, and relations in the initial description. Later analysis cannot fill descriptive omissions; exhaustive card matching is not required. | 0–3 |
| **Flight F1 · Evidence use** | Checks whether each analysis uses previously described facts under the task's target, conditions, rules, and scope. | 0–5 |
| **Flight F2 · Paired adaptation** | Checks execution of the task on both sides and the relationship between their judgments, using both descriptions and analyses plus permitted public comparison metadata. | 0–5 |
| **Task Check · Correctness** | Checks each final answer against its side-specific answer contract. | Normalized to 0–1 |

Gravity verifies visual truth; Flight accepts described premises conditionally and evaluates reasoning from them. **Flight does not receive images, Evidence Cards, answer contracts, or reference judgments.** A logically valid inference from a visually false described premise can pass Flight while failing Gravity. A decisive visual claim introduced only in the analysis cannot supply its own prior descriptive support.

G1 and G2 are scored per response, as is F1. F2 is scored once per matched pair and shared across its two sides; a decisive contextual failure on either side limits its score. Gravity and Flight use separate view-specific calls to the same fixed judge, so their judging errors may remain correlated.

### Sampling, reward, and update

1. For each annotated image pair, independently sample **K = 6** responses per image from that image and the shared question.
2. Randomly match responses one-to-one, using each response once to form six candidate pairs.
3. Compute the additive reward for each candidate pair and normalize rewards within that training unit.
4. Assign the same advantage to both responses. Update one policy with equal side weights and KL regularization toward the frozen Stage-1 reference.

Let $G_{i,k}$ and $F_{i,k}$ be normalized Gravity and Flight scores for side $i$ of matched pair $k$, and let $C_{i,k}$ be normalized task correctness. Gravity scores are divided by three and Flight scores by five before dimension weighting; Flight weights are normalized over applicable dimensions. The response-format indicator $v_{i,k}$ checks that description, analysis, and answer all contain text in that order.

The pair reward is

$$
R_k = \frac{1}{2}\sum_{i\in\{A,B\}} v_{i,k}
\left[0.50 C_{i,k} + \lambda_G G_{i,k} + \lambda_F F_{i,k}\right].
$$

This combines task correctness with weighted verification scores. **There is no Gravity gate on Flight.** With shared applicability weights, paired adaptation is counted once after averaging the two sides.

Among candidate pairs with valid verifier outputs, let $\mu_{\mathcal V}$ and $\sigma_{\mathcal V}$ be the reward mean and standard deviation. Both responses receive

$$
\hat A_k = \frac{R_k-\mu_{\mathcal V}}{\sigma_{\mathcal V}+\epsilon}.
$$

The policy objective uses a clipped update and averages retained completion tokens on each side before giving A and B equal weight. A separate KL term uses the frozen Stage-1 policy; it is **outside the reward**. Unverifiable pairs are excluded from both policy and KL losses. This verifier-validity filtering is distinct from the response-format indicator above.

**Deployment remains single-image:** one image and its question produce one answer. The paired context, annotations, and verifier are training machinery rather than required inference inputs.

## Harbor evaluation

### Scope and aggregation

The reported comparison covers HarborEval and OpenEval, together with single-image harbor subsets of VRSBench, RSVQA, OmniEarth, and VLRS-Bench. Views of the same scene remain within one split. Each evaluation set keeps its own scoring protocol; these include task-specific answer scoring and open-ended assessment. The open-ended evaluation judge is separate from the training verifier, with blinded human review also reported in the study.

All scores below use a 0–100 reporting scale. **Overall is the unweighted mean of the six evaluation-set scores**, regardless of sample count. It is a study-specific summary of different metrics, not pooled accuracy or a full-benchmark leaderboard. The evaluation sets may share capabilities or source imagery, so they should not be treated as six independent replications.

### Main comparison

The following values reproduce the manuscript's main comparison table. Parameter and adaptation-data counts are source-reported context, not a matched-budget comparison. `n/r` means not reported.

| Model | Parameters | Reported data scale | Overall | HarborEval | VRSBench | RSVQA | OpenEval | OmniEarth | VLRS-Bench |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| LLaVA-1.5 | 7B | 1.2M | 36.87 | 46.22 | 37.44 | 27.26 | 45.75 | 32.32 | 32.20 |
| Qwen3.5 Base | 4B | n/r | 59.36 | 73.15 | 37.21 | 58.69 | 67.34 | 80.39 | 39.39 |
| GeoChat | 7B | 318K | 41.61 | 47.49 | 53.44 | 51.46 | 21.78 | 41.42 | 34.09 |
| SkySenseGPT | 7B | 3.00M | 39.25 | 47.24 | 42.99 | 42.98 | 35.78 | 29.38 | 37.12 |
| EarthDial | 4B | 11.11M | 44.01 | 65.02 | 42.33 | 53.96 | 34.31 | 38.50 | 29.92 |
| VHM | 7B | 1.58M | 46.30 | 57.62 | 49.70 | 52.13 | 54.44 | 32.44 | 31.44 |
| SkyEyeGPT | 7B | 968K | 25.98 | 28.28 | 36.72 | 36.72 | 12.33 | 21.36 | 20.45 |
| LHRS-Bot-Nova | 8B | 2.02M | 34.64 | 39.73 | 28.40 | 31.15 | 22.96 | 48.48 | 37.12 |
| RS-EoT | 7B | 65.7K | 56.26 | 74.54 | 31.86 | 63.98 | 58.19 | 67.34 | 41.67 |
| RSThinker | 9B | 380K | 55.02 | 69.06 | 67.67 | 50.07 | 42.53 | 66.33 | 34.47 |
| **G&F (Qwen3.5)** | **4B** | **2K*** | **69.12** | **82.57** | **54.19** | **67.18** | **82.07** | **80.99** | **47.73** |

*The manuscript's coarse data-scale entry for G&F is 2K. Its actual supervision units are 1,008 demonstrations and 500 image pairs, detailed above. These incremental annotations have a different accounting scope from another model's full pretraining or instruction-tuning collection.*

G&F improves over its backbone on all six reported sets and ranks first on five in this comparison; **RSThinker leads VRSBench at 67.67**. G&F's Overall gain is **9.76 points over Base** and **12.86 over RS-EoT**, the strongest remote-sensing baseline by Overall in this table. No claim of statistical significance is attached to these point differences.

## Ablations and controls

All harbor RL variants start from the same Stage-1 checkpoint $M_1$ and share image–question exposure, generation limits, and optimization settings. Removing a reward component leaves the remaining coefficients fixed. Every checkpoint is evaluated with single-image inputs.

| Setting | Overall | Δ vs. Base | Estimated relative training time |
| --- | ---: | ---: | ---: |
| Base $M_0$ | 59.36 | 0.00 | — |
| Stage 1 $M_1$ | 64.56 | +5.20 | 1.00× |
| Without Gravity and Flight | 63.34 | +3.98 | 8.15× † |
| Without Flight | 65.11 | +5.75 | 10.13× † |
| Without Gravity | 66.32 | +6.96 | 19.53× † |
| Single-image RL | 65.12 | +5.76 | 13.38× † |
| Joint-input RL | 66.49 | +7.13 | 20.64× † |
| **Full G&F** | **69.12** | **+9.76** | **20.48×** |

The time estimates include Stage-1 initialization and subsequent training, including online-verifier waiting, normalized to Stage-1 SFT. **† marks a projected cost entry**, not a projected evaluation score. The estimates combine rollout logs, update profiling, verifier latency, concurrency, and synchronization; residual system overhead is only partly reconstructed. These are elapsed-time estimates, not GPU-hours or API expenditure.

- **Supervised initialization and RTPO:** Stage 1 adds 5.20 Overall points over Base; full RTPO adds another 4.56.
- **Reward components:** removing Flight lowers Overall by 4.01; removing Gravity lowers it by 2.80. Task-only training scores 63.34, below Stage 1's 64.56.
- **Single-image RL:** retains local Gravity, evidence-use, and correctness rewards, with per-image advantages and no F2 paired-adaptation term. It gains 0.56 over Stage 1 and remains 4.00 below full G&F. This comparison tests the combined organization of relational feedback and shared pair updates, rather than isolating only one mechanism.
- **Joint-input RL:** retains the full criteria and reward weights but generates both responses in one context. Its 66.49 Overall is 2.63 below G&F. Scene-evidence mixing is a proposed explanation, not directly established by the aggregate score.

Per-benchmark scores for Stage 1 and these controls are not reported. The website therefore shows them only in the Overall view and records missing breakdowns as `null`.

## Urban specialization

A separate urban model starts from the same base backbone and is trained through both stages using **160 demonstrations and 60 training pairs**, with **20 additional development pairs**, from a collection of **320 images at 1024 × 1024**. Rubric dimensions and reward weights are retained from the harbor setting. Adaptation and evaluation use distinct image sets; inference remains single-image.

| Checkpoint | EarthVQA Urban | VRSBench Urban | RSVQA HR |
| --- | ---: | ---: | ---: |
| Base model | 11.00 | 23.33 | 15.00 |
| Urban Stage 1 | 29.50 | 54.17 | 39.00 |
| **Urban G&F** | **31.43** | **56.25** | **43.67** |
| **Gain over Urban Stage 1** | **+1.93** | **+2.08** | **+4.67** |

These are fixed urban subsets with task-specific protocols. The study supports reuse of the supervision design in another domain; it does **not** measure zero-shot transfer of the harbor checkpoint. No combined urban Overall score is reported.

## Response analysis

This descriptive analysis uses **six randomly sampled image–question cases**, each with two required visual facts and a reference judgment. One Base response and one G&F response are sampled per case, giving **twelve responses** in total. The cases cover road access, surface/vegetation constraints, and relative spatial relations.

Annotations identify task-bearing evidence phrases and valid inference clauses. The same Qwen tokenizer maps their character spans to token offsets. Full-response length includes format tokens; content length excludes format-only tokens while retaining ordinary punctuation and final-answer content. Unselected tokens can include valid background observations, connective wording, and answer text.

| Statistic | Base | G&F | Scope |
| --- | ---: | ---: | --- |
| Mean full-response length | 355.50 tokens | 179.50 tokens | Six cases |
| Mean content length | 350.83 tokens | 156.33 tokens | Six cases |
| Mean evidence density | 21.53% | 38.48% | Six cases |
| Mean task-related content density | 22.35% | 39.91% | Six cases |
| Mean inference density | 24.82% | 46.61% | Five matched cases with analytical spans in both responses |
| Mean required-fact coverage | 91.67% | 100.00% | Six cases |
| Final answers agreeing with reference | 50.00% (3/6) | 100.00% (6/6) | Six cases |

The reported full-response-length reduction is **49.51%**, computed from the two mean lengths. The manuscript reports a **17.57 percentage-point** increase in task-related density from its underlying per-case values; subtracting the displayed rounded endpoints can differ in the last decimal.

With $n_E$ selected evidence tokens, $n_I$ selected inference tokens, $n_D$ descriptive content tokens, $n_A$ analytical content tokens, and $n_C$ all content tokens:

- Evidence density is $n_E/n_D$.
- Inference density is $n_I/n_A$.
- Task-related density is $(n_E+n_I)/n_C$.

Per-case values are averaged equally. Inference density excludes the one Base response with no analytical tokens, recorded as NA. Supported repetitions contribute to density; required-fact coverage counts each required fact once. A higher density describes a larger fraction of content, not necessarily a larger absolute number of evidence tokens.

The sample illustrates more concentrated task-related content in shorter G&F responses. It does not establish benchmark-wide accuracy, latency, or token-efficiency gains, and the six-case answer agreement is not a benchmark result.

## Source of truth

The reported method and results correspond to the manuscript snapshot dated **2026-10-30**, revision **`b51cf1882030d8008983c71ef829d0221b0690ce`**. This identifier records provenance; it is not a public paper URL or a released research artifact.

| Material in these notes | Source within the manuscript snapshot |
| --- | --- |
| Two-stage method, verification, and RTPO | Method section, including Anchor–Bridging supervision and the pair objective |
| Main harbor comparison | Table 1 |
| Ablations, matched controls, and relative training time | Table 2 and supplementary control/cost definitions |
| Separate urban study | Table 3 and supplementary urban protocol |
| Six-case response analysis | Section 4.4 and the token-analysis appendix |
| Demonstration count and supervision units | Manuscript definitions and supplementary inventory |

The public website's numeric data are stored in [`web/research-data.js`](../web/research-data.js). These are transcribed reported values, not results produced by a live model service or independently reproduced by this website. The manuscript, implementation, weights, and data have separate availability states in [RELEASE_STATUS.md](../RELEASE_STATUS.md).

When updating the research snapshot, reconcile this document, both project READMEs, the website's English fallback content, both language dictionaries, and the numeric data module together. Keep unknown per-benchmark results missing, preserve unit/scope distinctions, and do not silently replace manuscript values with recomputed values from rounded tables.
