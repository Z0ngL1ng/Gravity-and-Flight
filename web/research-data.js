/*
 * Research data transcribed from manuscript revision b51cf1882030d8008983c71ef829d0221b0690ce.
 * Sources: paper/1_main.tex, paper/preamble.tex, paper/appendix_token_analysis.tex,
 * and paper/X_suppl.tex. Values are reported scores, not live model evaluations.
 * Scores preserve the manuscript's benchmark order; null means not reported.
 */
window.GF_RESEARCH = {
  revision: "b51cf1882030d8008983c71ef829d0221b0690ce",
  source:
    "https://github.com/Z0ngL1ng/Gravity-and-Flight/blob/main/docs/RESEARCH.md#source-of-truth",
  // Table 1 (tab:model_comparison); all six evaluations use single-image harbor inputs.
  benchmarks: [
    { id: "harboreval", label: "HarborEval" },
    { id: "vrsbench", label: "VRSBench" },
    { id: "rsvqa", label: "RSVQA" },
    { id: "openeval", label: "OpenEval" },
    { id: "omniearth", label: "OmniEarth" },
    { id: "vlrsbench", label: "VLRS-Bench" },
  ],
  // Stage 1 and controls have only Overall in Table 2. Their per-set scores are unavailable.
  models: [
    {
      id: "base",
      label: "Qwen3.5-4B Base",
      shortLabel: "Base",
      scores: [73.15, 37.21, 58.69, 67.34, 80.39, 39.39],
      overall: 59.36,
    },
    {
      id: "stage1",
      label: "EoT-SFT · Stage 1",
      shortLabel: "Stage 1",
      scores: null,
      overall: 64.56,
    },
    {
      id: "rs-eot",
      label: "RS-EoT · 7B",
      shortLabel: "RS-EoT",
      scores: [74.54, 31.86, 63.98, 58.19, 67.34, 41.67],
      overall: 56.26,
    },
    {
      id: "rsthinker",
      label: "RSThinker · 9B",
      shortLabel: "RSThinker",
      scores: [69.06, 67.67, 50.07, 42.53, 66.33, 34.47],
      overall: 55.02,
    },
    {
      id: "single-image",
      label: "Single-image RL",
      shortLabel: "Single-image RL",
      scores: null,
      overall: 65.12,
    },
    {
      id: "joint-input",
      label: "Joint-input RL",
      shortLabel: "Joint-input RL",
      scores: null,
      overall: 66.49,
    },
    {
      id: "gf",
      label: "Gravity & Flight · 4B",
      shortLabel: "G&F",
      scores: [82.57, 54.19, 67.18, 82.07, 80.99, 47.73],
      overall: 69.12,
    },
  ],
  // Table 2 (tab:ablation). Cost is estimated cumulative training wall time, including
  // Stage 1 and verifier waiting, normalized to Stage-1 SFT. Dagger = projected cost.
  ablations: [
    {
      id: "base",
      label: "Base",
      overall: 59.36,
      delta: 0.0,
      relativeCost: null,
      costProjected: false,
    },
    {
      id: "stage1",
      label: "Stage 1 · EoT-SFT",
      overall: 64.56,
      delta: 5.2,
      relativeCost: 1.0,
      costProjected: false,
    },
    {
      id: "without-both",
      label: "Without Gravity & Flight",
      overall: 63.34,
      delta: 3.98,
      relativeCost: 8.15,
      costProjected: true,
    },
    {
      id: "without-flight",
      label: "Without Flight",
      overall: 65.11,
      delta: 5.75,
      relativeCost: 10.13,
      costProjected: true,
    },
    {
      id: "without-gravity",
      label: "Without Gravity",
      overall: 66.32,
      delta: 6.96,
      relativeCost: 19.53,
      costProjected: true,
    },
    {
      id: "single-image",
      label: "Single-image RL",
      overall: 65.12,
      delta: 5.76,
      relativeCost: 13.38,
      costProjected: true,
    },
    {
      id: "joint-input",
      label: "Joint-input RL",
      overall: 66.49,
      delta: 7.13,
      relativeCost: 20.64,
      costProjected: true,
    },
    {
      id: "gf",
      label: "Gravity & Flight",
      overall: 69.12,
      delta: 9.76,
      relativeCost: 20.48,
      costProjected: false,
    },
  ],
  highlights: {
    overall: 69.12,
    gainOverBase: 9.76,
    gainOverStage1: 4.56,
    gainOverBestRemoteSensingBaseline: 12.86,
    demonstrations: 1008,
    demonstrationImages: 888,
    trainingPairs: 500,
    pairImages: 1000,
    evidenceCards: 1000,
    boundaryCards: 500,
    backbone: "Qwen3.5-4B",
    stages: 2,
    candidatesPerImage: 6,
    firstPlaceBenchmarks: 5,
    evaluatedBenchmarks: 6,
    inferenceImages: 1,
    overallDefinition:
      "Unweighted mean of the six harbor evaluation scores on a 0–100 scale. Each benchmark retains its own scoring protocol; Overall is a study-specific summary, not a pooled accuracy.",
  },
  // Section 4.4 and Appendix: Token-Level Annotation and Statistics.
  // These statistics describe six sampled cases (twelve responses), not a full-benchmark
  // speed/accuracy evaluation. Inference density excludes one Base case with no analysis.
  tokenAnalysis: {
    source:
      "https://github.com/Z0ngL1ng/Gravity-and-Flight/blob/main/docs/RESEARCH.md#response-analysis",
    sampleCases: 6,
    responseCount: 12,
    fullResponseTokens: { base: 355.5, gf: 179.5 },
    contentTokens: { base: 350.83, gf: 156.33 },
    fullResponseReductionPercent: 49.51,
    evidenceDensityPercent: { base: 21.53, gf: 38.48 },
    taskRelatedDensityPercent: { base: 22.35, gf: 39.91 },
    // The manuscript reports +17.57 pp from its underlying per-case values.
    taskRelatedDensityGainPoints: 17.57,
    inferenceDensityPercent: { base: 24.82, gf: 46.61 },
    inferenceDensityCases: 5,
    requiredFactCoveragePercent: { base: 91.67, gf: 100.0 },
    finalAnswerAgreementPercent: { base: 50.0, gf: 100.0 },
    finalAnswerAgreementCount: { base: 3, gf: 6 },
    caveat:
      "Descriptive analysis of six sampled image–question cases, with one response per model per case. These values do not establish benchmark-wide accuracy, latency, or token-efficiency gains.",
  },
  // Table 3 (tab:cross-scene), Section 4.5, and Appendix: Urban Specialization.
  // This is a separately trained urban model, not zero-shot transfer of the harbor checkpoint.
  urban: {
    images: 320,
    demonstrations: 160,
    trainingPairs: 60,
    developmentPairs: 20,
    benchmarks: ["EarthVQA Urban", "VRSBench Urban", "RSVQA HR"],
    models: [
      { id: "base", label: "Base model", scores: [11.0, 23.33, 15.0] },
      { id: "stage1", label: "Urban Stage 1", scores: [29.5, 54.17, 39.0] },
      { id: "gf", label: "Urban G&F", scores: [31.43, 56.25, 43.67] },
    ],
    gainsOverStage1: [1.93, 2.08, 4.67],
    caveat:
      "A separate urban model is trained from the same base through EoT-SFT and RTPO, retaining the harbor rubric dimensions and reward weights. Evaluation uses fixed urban subsets with single-image inputs.",
  },
  // Section 3.2: Anchor–Bridging scene-pair composition.
  pairRelations: [
    { id: "preserve", label: "Preserve the judgment", count: 77 },
    { id: "change", label: "Change the judgment", count: 372 },
    { id: "weaken", label: "Narrow the claim", count: 51 },
  ],
};
