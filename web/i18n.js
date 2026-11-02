/* Repository-owned bilingual research copy. */
window.GF_I18N = {
  en: {
    "nav.story": "The story",
    "nav.example": "The evidence",
    "nav.method": "The method",
    "nav.results": "The results",
    skip: "Skip to content",
    "nav.paper": "Research notes",
    "nav.menu": "Menu",
    "nav.resources": "Resources",
    "hero.eyebrow": "Inspired by aerodynamics",
    "hero.subtitle":
      "Learning to navigate<br>fine-grained remote sensing scenes.",
    "hero.lead":
      "From FBA’s scene-transfer question to finer contextual adaptation. Inspired by aerodynamics, G&amp;F brings visual grounding and evidence-based reasoning together.",
    "hero.explore": "Explore the framework",
    "hero.results": "See the results",
    "hero.footer": "Remote sensing · Vision-language learning",
    "hero.scroll": "Follow the evidence",
    "stats.demos": "EoT demonstrations",
    "stats.images": "across 888 images",
    "stats.pairs": "Task-matched pairs",
    "stats.pairImages": "1,000 distinct harbor images",
    "stats.score": "Overall score",
    "stats.scoreNote": "mean across six harbor sets",
    "stats.gain": "Over the backbone",
    "stats.gainNote": "+4.56 over Stage 1",
    "story.label": "The research lineage",
    "story.title": "From scene transfer<br><em>to context transfer.</em>",
    "story.body1":
      "Filling Before Advancing (FBA) prepares the capabilities needed for scenario specialization. Its second stage, Bridging-Conv, learns shared priors from target and related bridging scenes. This scene-transfer idea is the starting point for G&amp;F.",
    "story.body2":
      "We bring the transfer question inside a scene domain: when two images belong to the same broad category, how should judgments adapt to changes in local attributes, spatial relations, or visibility? G&amp;F studies these fine-grained contexts under a shared task.",
    "example.label": "02 / The evidence",
    "example.title": "Same question.<br><em>A different reading.</em>",
    "example.lead":
      "Two distinct harbor images, one shared question. Each image is answered independently; their local evidence determines what the judgments should preserve, change, or leave less specific.",
    "example.taskLabel": "Shared question",
    "example.task":
      "How are the vessels positioned relative to the waterfront?",
    "example.original": "Original image",
    "example.capA": "A vessel within a narrow, elongated enclosure.",
    "example.capB": "Vessels along the edges of a more open basin.",
    "example.preserve": "Preserve",
    "example.change": "Change",
    "example.weaken": "Reduce specificity",
    "example.preserveTitle": "Keep what both images support.",
    "example.preserveBody":
      "Vessels, waterfront structures, and shore-side buildings appear in both images. These broad observations remain supported; an identical operating function does not follow.",
    "example.changeTitle": "Reconsider the spatial relation.",
    "example.changeBody":
      "In A, the vessel sits inside a narrow enclosure. In B, vessels lie along a more open basin. The spatial description should change with the local evidence.",
    "example.weakenTitle": "Make the claim no stronger than the evidence.",
    "example.weakenBody":
      "These views alone do not establish active repair, facility throughput, or operational intensity. Describe the visible structure while leaving unsupported activity uncertain.",
    "example.note":
      "Illustrative reading of the repository images. These descriptions are not model outputs or benchmark results.",
    "forces.label": "03 / The design inspiration",
    "forces.title": "An idea borrowed from aerodynamics.",
    "forces.lead":
      "From gravity and lift to visual grounding and reasoning: a physical intuition becomes two complementary verification views.",
    "forces.gQuestion": "“Does the image support what was said?”",
    "forces.g1": "Visual fidelity",
    "forces.g1Body":
      "Checks visual claims throughout the response against the image and its Evidence Card.",
    "forces.g2": "Observation coverage",
    "forces.g2Body":
      "Checks the initial description for salient subjects, attributes, and relations. Later analysis cannot fill a missing observation.",
    "forces.fQuestion": "“Does the reasoning follow from the description?”",
    "forces.f1": "Evidence use",
    "forces.f1Body":
      "Checks whether the analysis uses described facts under the task’s target, conditions, and scope.",
    "forces.f2": "Paired adaptation",
    "forces.f2Body":
      "Checks task execution on both sides and whether the evidence supports consistency, change, or a narrower claim.",
    "forces.note":
      "Flight accepts described premises conditionally. It does not inspect images or Evidence Cards. Gravity checks visual truth; a separate Task Check assesses final answers.",
    "method.label": "04 / The learning process",
    "method.title": "How G&amp;F learns.",
    "method.lead":
      "Read the framework from top to bottom: supervised initialization, then relational policy optimization.",
    "results.label": "05 / The results",
    "results.title": "The difference,<br><em>measured.</em>",
    "results.lead":
      "Harbor specialization on six evaluation sets. Each benchmark keeps its own scoring protocol; Overall is their unweighted mean on a 0–100 scale.",
    "results.overall": "Harbor · Overall",
    "results.vsBase": "points over Base",
    "results.vsS1": "points over EoT-SFT",
    "results.chartTitle": "From initialization to specialization",
    "results.metric": "Metric",
    "results.chartNote":
      "Overall: reported means from Tables 1–2. Per-benchmark views compare Base and G&F; Stage 1 breakdowns are not reported.",
    "results.tableToggle": "Compare all six evaluation sets",
    "results.tableCaption": "Harbor evaluation · Table 1 · Higher is better",
    "results.limit":
      "G&amp;F improves over its backbone on every reported harbor set. RSThinker retains the higher VRSBench score. These are harbor subsets, not full-benchmark rankings.",
    "results.ablationLabel": "Ablations &amp; matched controls",
    "results.ablationTitle": "Both views contribute.",
    "results.ablationBody":
      "Full G&amp;F has a higher Overall score than either reward ablation and the matched controls. Removing Flight gives 65.11; removing Gravity gives 66.32.",
    "results.ablationSource": "Ablations · Study design & controls",
    "results.urbanLabel": "A second scene domain",
    "results.urbanTitle": "The framework travels.",
    "results.urbanBody":
      "A separate urban model is trained through both stages using 160 demonstrations and 60 training pairs, retaining the harbor rubric dimensions and reward weights.",
    "results.urbanNote":
      "Points over urban Stage 1 on fixed subsets; this is separate urban specialization, not zero-shot transfer of the harbor model.",
    "token.label": "06 / Inside the response",
    "token.title": "Less text.<br><em>More concentrated evidence.</em>",
    "token.lead":
      "A token-level analysis of six randomly sampled image–question cases compares Base and G&amp;F responses to the same inputs.",
    "token.density": "Mean task-related content density",
    "token.length": "Mean response length",
    "token.agreement": "Answers agreeing with reference",
    "token.note":
      "A descriptive analysis of six cases, not a benchmark-wide efficiency or accuracy estimate. Density is the mean per-response task-related content proportion; full-response length includes format tokens.",
    "token.source": "Response analysis · Scope & statistics",
    "resources.label": "Continue the inquiry",
    "resources.title": "Take a closer look.",
    "resources.paper": "Read the research notes",
    "resources.paperDetail": "Method, reported results & study scope",
    "resources.code": "Explore the project repository",
    "resources.codeDetail": "Website source & project documentation",
    "resources.source": "Follow the research release",
    "resources.sourceDetail": "Manuscript, training code, models & data",
    "resources.access":
      "The website and research summaries are public. The manuscript, training code, model weights, and datasets have not yet been released.",
    "resources.copy": "Copy project link",
    "footer.note": "Faithful to the image. Responsive to the evidence.",
    "footer.top": "Back to top",
    "footer.version": "Research snapshot",
    "example.altA":
      "Overhead harbor image with a large vessel inside a narrow elongated enclosure",
    "example.altB":
      "Overhead harbor image with vessels along the edges of a more open basin",
    "resources.copied": "Project link copied.",
    "resources.copyFailed":
      "Copy unavailable. Use the project repository link above.",
    "chart.base": "Base",
    "chart.stage1": "Stage 1",
    "chart.gf": "Stage 2",
    "chart.metricNote":
      "Scores from Table 1. Both models use single-image inputs.",
    "meta.title": "Gravity & Flight — Learning to see, learning to reason",
    "meta.description":
      "Gravity and Flight: an aerodynamics-inspired framework that develops FBA’s scene-transfer question into fine-grained contextual adaptation.",
    "index.title": "In this study",
    "index.story": "Background & lineage",
    "index.example": "Evidence",
    "index.aero": "Inspiration",
    "index.method": "Training",
    "index.results": "Results",
    "index.analysis": "Analysis",
    "results.scoreUnit": "Score / 100 · higher is better",
    "ablation.scale": "Overall / 100",
    "ablation.delta": "Δ vs. full G&F",
    "token.sampleCases": "paired cases",
    "token.sampleScope":
      "Same image–question inputs · one response per model per case",
    "chart.context": "Harbor",
    "chart.metricTitle": "Base and G&F on",
    "ablation.reference": "ref.",
    "nav.paperShort": "Notes",
    "nav.aero": "Design inspiration",
    "nav.analysis": "Response analysis",
    "example.inspectA": "Inspect original Anchor image in a new tab",
    "example.inspectB": "Inspect original Bridging image in a new tab",
    "results.tableHint": "Scroll horizontally to compare all six sets",
    "index.label": "In this study",
    "hero.artAlt":
      "Concentric gravity arcs on warm paper open into upward blue trajectories.",
    "hero.artCaption": "Gravity anchors observation. Flight guides reasoning.",
    "hero.begin": "Enter the study",
    "lineage.fbaTitle": "Across scene domains",
    "lineage.gfTitle": "Within one scene domain",
    "aero.lift": "Lift",
    "aero.weight": "Weight",
    "aero.sketch": "A conceptual inspiration for the two verification views.",
    "aero.body":
      "The design draws inspiration from the interplay of gravity and aerodynamic lift. Gravity anchors visual claims to the image; Flight evaluates how reasoning develops from those observations and adapts across task-matched contexts.",
    "aero.note":
      "The sketch expresses the naming metaphor. Its arrows do not encode reward weights.",
    "paper.backgroundTitle":
      "From filling capability gaps to organizing existing strengths.",
    "paper.backgroundFba":
      "FBA asked which remote-sensing capabilities a model needs before scenario specialization. Its staged training develops semantic alignment, shared priors across related scenes and sensors, and evidence-grounded scenario skills.",
    "paper.backgroundGf":
      "G&F shifts our research focus to how a capable backbone uses what it already recognizes. In the harbor example, identifying ships and facilities is a starting point; judging vehicle-staging suitability requires connecting vehicle rows, usable paved space, and nearby berths to the question. We train this observation-to-judgment process through demonstrations and feedback on task-matched scenes.",
    "paper.backgroundLineage":
      "FBA's second stage, Bridging-Conv, is the intellectual starting point for that move. Its transfer across target and related scenes motivates our finer question within one scene domain: which contextual changes should alter a judgment, preserve it, or narrow its scope? G&F explores this question with EoT-SFT and RTPO, starting from Qwen3.5-4B.",
    "paper.fbaMotivationCaption":
      "FBA's original motivation: acquire the alignment, modality, and task capabilities needed for scenario specialization. This is the earlier work's framing, illustrated with a harbor report.",
    "paper.fbaMethodCaption":
      "FBA's three-stage training design. Stage 2 learns shared priors from target and related bridging scenes; this transfer idea later motivated G&F's focus on contextual variations within one scene domain.",
    "paper.gfMotivationCaption":
      "An illustrative harbor case: recognizing ships and facilities does not by itself resolve vehicle-staging suitability. The G&F response connects vehicle rows, paved space, and nearby berths to the task. Both waterfronts are in one input image.",
    "paper.gfMethodCaption":
      "Two stages connect careful observation to contextual reasoning: EoT-SFT establishes the process, and RTPO refines it through feedback on task-matched image pairs. Inference uses one image.",
    "paper.fbaMotivationAlt":
      "FBA motivation showing scenario-data scarcity and gaps in alignment, modality, and task capability, followed by a staged specialization design.",
    "paper.fbaMethodAlt":
      "FBA three-stage method: remote-sensing semantic anchoring, domain-bridge convergence using target and related scenes, and evidence-grounded scenario tuning.",
    "paper.gfMotivationAlt":
      "One harbor image with two waterfronts: a Base response favors the left using broad cues, while the G&F example favors the right using vehicles, paved space, and nearby berths.",
    "paper.gfMethodAlt":
      "G&F training overview: supervised observation, analysis, and answer; independent Anchor and Bridging rollouts; separate verification views; additive pair rewards, shared advantages, and a frozen reference.",
    "background.label": "01 / A changing research question",
    "background.title":
      "From adding knowledge<br><em>to organizing capability.</em>",
    "background.body1":
      "Our earlier work focused on capability coverage: giving a model the remote-sensing knowledge and skills it needed before specialization. As the backbone grows stronger, our research shifts toward a new question: how can it organize what it already knows to solve more demanding tasks?",
    "background.body2":
      "Recognizing ships, vehicles, and facilities is a starting point. A useful judgment must select the observations that matter, connect them to the task, and adapt when the local evidence changes. This is the step from FBA to Gravity &amp; Flight.",
    "background.fbaTitle": "Build the capability base.",
    "background.gfTitle": "Put existing capabilities to work.",
    "background.bridge":
      "Knowing what is there is the beginning.<br><em>Knowing what matters is the next step.</em>",
    "lineage.label": "The connection to FBA",
    "figure.motivation": "Motivation figure",
    "figure.method": "Method figure",
    "figure.enlarge": "Explore figure",
    "figure.pdf": "Original PDF",
    "figure.detail": "View at 1:1",
    "figure.fit": "Fit to window",
    "figure.close": "Close",
    "figure.pan": "Scroll to explore the enlarged figure.",
    "method.figureTitle": "The G&F training framework",
    "method.figureCaption":
      "First, learn to observe, reason, and answer. Then refine those judgments across related contexts. Training uses image pairs; inference needs only one image.",
    "fba.label": "The preceding work · 2026",
    "fba.resources": "FBA resources",
    "fba.paper": "arXiv paper",
    "fba.website": "Project website",
    "fba.model": "HF model",
    "fba.dataset": "HF dataset",
  },
  zh: {
    "nav.story": "研究起点",
    "nav.example": "视觉证据",
    "nav.method": "训练方法",
    "nav.results": "实验结果",
    skip: "跳至正文",
    "nav.paper": "研究说明",
    "nav.menu": "目录",
    "nav.resources": "研究资源",
    "hero.eyebrow": "源自空气动力学的启发",
    "hero.subtitle": "面向细粒度遥感场景的<br>观察与推理学习。",
    "hero.lead":
      "从 FBA 的场景迁移出发，进一步探索同类场景中的细粒度上下文迁移。借鉴空气动力学，让视觉观察有所依据，让推理随证据适应。",
    "hero.explore": "探索研究框架",
    "hero.results": "查看实验结果",
    "hero.footer": "遥感 · 视觉语言学习",
    "hero.scroll": "沿着证据阅读",
    "stats.demos": "EoT 示范样本",
    "stats.images": "覆盖 888 张图像",
    "stats.pairs": "任务匹配图像对",
    "stats.pairImages": "1,000 张不同的港口图像",
    "stats.score": "综合得分",
    "stats.scoreNote": "六个港口评测集的等权均值",
    "stats.gain": "相较基座模型提升",
    "stats.gainNote": "相较 Stage 1 提升 4.56 分",
    "story.label": "研究脉络",
    "story.title": "从场景间迁移，<br><em>到场景内迁移。</em>",
    "story.body1":
      "Filling Before Advancing（FBA）先补足场景专精所需的能力。其第二阶段 Bridging-Conv 从目标场景与相关桥接场景中学习共享先验。这一场景迁移思路，是 G&amp;F 的研究起点。",
    "story.body2":
      "我们进一步将迁移问题推进到同一场景领域内部：当两张图像属于同一大类场景，局部属性、空间关系或可见性发生变化，判断应如何随之调整？G&amp;F 在共同任务下研究这些细粒度上下文差异。",
    "example.label": "02 / 视觉证据",
    "example.title": "同一个问题，<br><em>不同的解读。</em>",
    "example.lead":
      "两张不同的港口图像，同一个问题。每张图像独立作答，再依据局部证据，检验判断应保持、改变，还是降低具体程度。",
    "example.taskLabel": "共同问题",
    "example.task": "船舶与滨水设施之间呈现怎样的空间关系？",
    "example.original": "查看原图",
    "example.capA": "一艘船舶位于狭长的围合区域内。",
    "example.capB": "船舶沿较为开阔的水域边缘分布。",
    "example.preserve": "保持",
    "example.change": "改变",
    "example.weaken": "降低具体程度",
    "example.preserveTitle": "保留两侧证据都支持的判断。",
    "example.preserveBody":
      "两张图像均可见船舶、滨水设施和岸上建筑。这些宽泛观察可以保持一致，但它们并不意味着设施具有完全相同的作业功能。",
    "example.changeTitle": "重新判断空间关系。",
    "example.changeBody":
      "A 中的船舶处于狭窄围合区域内；B 中的船舶沿开阔水域边缘排列。空间描述应随局部证据的变化而改变。",
    "example.weakenTitle": "让断言止于证据能够支持之处。",
    "example.weakenBody":
      "仅凭这两张图像，无法确定是否正在维修、设施吞吐量或作业强度。应描述可见结构，并对缺乏支持的活动状态保留不确定性。",
    "example.note": "以上为仓库图像的原理性解读，非模型输出或基准测试结果。",
    "forces.label": "03 / 设计启发",
    "forces.title": "从空气动力学中获得启发。",
    "forces.lead":
      "从重力与升力，到视觉依据与推理过程：将飞行中的直觉，转化为两种互补的验证视角。",
    "forces.gQuestion": "“图像是否支持所陈述的内容？”",
    "forces.g1": "视觉忠实性",
    "forces.g1Body": "结合图像与 Evidence Card，检验回答各部分的视觉陈述。",
    "forces.g2": "观察覆盖度",
    "forces.g2Body":
      "检查初始描述是否覆盖主要对象、属性与关系；后续分析不能弥补描述中的遗漏。",
    "forces.fQuestion": "“推理是否能够从已有描述中成立？”",
    "forces.f1": "证据使用",
    "forces.f1Body": "检验分析是否在任务目标、条件与范围下使用已描述的事实。",
    "forces.f2": "成对适应",
    "forces.f2Body":
      "检查两侧任务执行，以及证据是否支持一致判断、改变结论或缩小断言范围。",
    "forces.note":
      "Flight 在条件成立的前提下接受描述内容，不读取图像或 Evidence Card。Gravity 检查视觉真实性，独立的 Task Check 评估最终答案。",
    "method.label": "04 / 学习过程",
    "method.title": "G&amp;F 如何学习。",
    "method.lead":
      "从上到下阅读这张图：先以监督学习初始化，再通过关系迁移优化策略。",
    "results.label": "05 / 实验结果",
    "results.title": "改变，<br><em>有据可量。</em>",
    "results.lead":
      "在六个评测集上检验港口场景专精。各基准沿用自身评分协议；Overall 为六项分数在 0–100 标度上的等权均值。",
    "results.overall": "港口 · 综合得分",
    "results.vsBase": "分，相较 Base",
    "results.vsS1": "分，相较 EoT-SFT",
    "results.chartTitle": "从初始化到场景专精",
    "results.metric": "评测项",
    "results.chartNote":
      "Overall 取自表 1–2。单项视图比较 Base 与 G&F；论文未报告 Stage 1 的逐项分数。",
    "results.tableToggle": "展开六项评测对比",
    "results.tableCaption": "港口评测 · 表 1 · 越高越好",
    "results.limit":
      "G&amp;F 在每个已报告的港口评测集上均优于基座；RSThinker 的 VRSBench 分数仍更高。这里比较的是港口子集，不代表完整基准的排名。",
    "results.ablationLabel": "消融与匹配对照",
    "results.ablationTitle": "两种检验共同发挥作用。",
    "results.ablationBody":
      "完整 G&amp;F 的 Overall 高于两项奖励消融与匹配对照。移除 Flight 得 65.11，移除 Gravity 得 66.32。",
    "results.ablationSource": "消融研究 · 设计与对照",
    "results.urbanLabel": "第二个场景领域",
    "results.urbanTitle": "框架可复用于新领域。",
    "results.urbanBody":
      "独立的城市场景模型使用 160 条示范与 60 对训练图像完成两阶段训练，沿用港口任务的评分维度与奖励权重。",
    "results.urbanNote":
      "相较城市 Stage 1 在固定子集上的增分；此处为独立的城市场景专精，并非港口模型的零样本迁移。",
    "token.label": "06 / 回答内部的变化",
    "token.title": "更精简的回答，<br><em>更集中的证据。</em>",
    "token.lead":
      "对六个随机抽取的图像—问题案例进行 token 级分析，比较 Base 与 G&amp;F 在相同输入上的回答。",
    "token.density": "平均任务相关内容密度",
    "token.length": "平均完整回答长度",
    "token.agreement": "与参考判断一致的答案",
    "token.note":
      "这是对六个案例的描述性分析，不代表整个基准的效率或准确率估计。密度取各回答任务相关内容占比的均值；完整回答长度包含格式 token。",
    "token.source": "回答分析 · 范围与统计",
    "resources.label": "继续探索",
    "resources.title": "进一步了解。",
    "resources.paper": "阅读研究说明",
    "resources.paperDetail": "方法、研究结果与适用范围",
    "resources.code": "访问项目仓库",
    "resources.codeDetail": "网站源码与项目文档",
    "resources.source": "查看资源发布状态",
    "resources.sourceDetail": "论文、训练代码、模型与数据",
    "resources.access":
      "网站与研究介绍已公开。论文、训练代码、模型权重和数据集尚未发布。",
    "resources.copy": "复制项目链接",
    "footer.note": "忠实于图像，响应于证据。",
    "footer.top": "返回顶部",
    "footer.version": "研究内容快照",
    "example.altA": "港口俯视图，一艘大型船舶位于狭长的围合区域内",
    "example.altB": "港口俯视图，船舶沿较为开阔的水域边缘分布",
    "resources.copied": "已复制项目链接。",
    "resources.copyFailed": "无法自动复制，请使用上方项目仓库链接。",
    "chart.base": "基座模型",
    "chart.stage1": "阶段一",
    "chart.gf": "阶段二",
    "chart.metricNote": "分数取自表 1。两个模型均使用单图输入。",
    "meta.title": "Gravity & Flight — 学会观察，学会推理",
    "meta.description":
      "Gravity and Flight：受空气动力学启发，从 FBA 的场景迁移思路出发，探索同类场景中的细粒度上下文迁移。",
    "index.title": "本页导览",
    "index.story": "背景与脉络",
    "index.example": "视觉证据",
    "index.aero": "设计启发",
    "index.method": "训练方法",
    "index.results": "实验结果",
    "index.analysis": "回答分析",
    "results.scoreUnit": "得分 / 100 · 越高越好",
    "ablation.scale": "综合得分 / 100",
    "ablation.delta": "Δ 相较完整 G&F",
    "token.sampleCases": "组配对案例",
    "token.sampleScope": "相同图像—问题输入 · 每个案例、每个模型各一条回答",
    "chart.context": "港口",
    "chart.metricTitle": "Base 与 G&F ·",
    "ablation.reference": "参考项",
    "nav.paperShort": "说明",
    "nav.aero": "设计启发",
    "nav.analysis": "回答分析",
    "example.inspectA": "在新标签页查看原始Anchor图像",
    "example.inspectB": "在新标签页查看原始Bridging图像",
    "results.tableHint": "左右滑动，查看六项评测",
    "index.label": "本研究",
    "hero.artAlt": "暖色纸面上的同心圆弧，展开为向上延伸的蓝色轨迹。",
    "hero.artCaption": "Gravity 让观察立足证据，Flight 让推理适应变化。",
    "hero.begin": "开始阅读",
    "lineage.fbaTitle": "场景间的迁移",
    "lineage.gfTitle": "同类场景内的迁移",
    "aero.lift": "升力",
    "aero.weight": "重力",
    "aero.sketch": "两种验证视角的概念性启发。",
    "aero.body":
      "设计借鉴飞行中重力与气动升力的共同作用。Gravity 让视觉陈述立足图像；Flight 检验推理如何从这些观察出发，并在任务匹配的上下文之间适应变化。",
    "aero.note": "示意图表达命名中的隐喻，箭头不表示奖励权重。",
    "paper.backgroundTitle": "从补足能力，到组织已有能力。",
    "paper.backgroundFba":
      "FBA 关注模型在场景专精前需要具备哪些遥感能力，通过分阶段训练建立语义对齐、相关场景与传感器之间的共享先验，以及有证据支撑的场景能力。",
    "paper.backgroundGf":
      "G&F 将我们的研究重点推进到：如何让具备较强基础能力的模型，用好已经能够识别的内容。在港口示例中，识别船舶与设施只是起点；判断哪处岸线更适合车辆集结，还需要把车辆排列、可用铺装空间和邻近泊位联系到具体问题。我们通过示范与任务匹配场景的反馈，训练这一从观察到判断的过程。",
    "paper.backgroundLineage":
      "FBA 第二阶段 Bridging-Conv 是这一研究转向的思想起点。它在目标场景与相关场景之间迁移共享先验，启发我们进一步追问：在同类场景内部，哪些上下文变化应当改变判断，哪些应保持判断，哪些应收窄结论范围？G&F 从 Qwen3.5-4B 出发，以 EoT-SFT 与 RTPO 探索这个问题。",
    "paper.fbaMotivationCaption":
      "FBA 的原始动机：为场景专精建立所需的对齐、模态与任务能力。图中以港口报告说明前作的研究问题。",
    "paper.fbaMethodCaption":
      "FBA 的三阶段训练设计。第二阶段从目标场景与相关桥接场景学习共享先验；这一迁移思路随后启发了 G&F 对同类场景内部上下文变化的研究。",
    "paper.gfMotivationCaption":
      "一个港口示例：仅识别船舶与设施，还不足以判断车辆集结条件。G&F 的回答将车辆排列、铺装空间与邻近泊位联系到任务；图中两处岸线位于同一张输入图像中。",
    "paper.gfMethodCaption":
      "两个阶段将细致观察连接到上下文推理：EoT-SFT 建立这一过程，RTPO 利用共享任务下的成对图像反馈进一步优化。实际推理只需一张图。",
    "paper.fbaMotivationAlt":
      "FBA 动机图：场景数据稀缺与对齐、模态、任务能力缺口，以及分阶段实现专精的设计。",
    "paper.fbaMethodAlt":
      "FBA 三阶段方法：遥感语义锚定、利用目标与相关场景进行领域桥接收敛，以及有证据支撑的场景调优。",
    "paper.gfMotivationAlt":
      "一张港口图像中的两处岸线：Base 示例依赖宽泛线索选择左侧，G&F 示例依据车辆、铺装空间与邻近泊位选择右侧。",
    "paper.gfMethodAlt":
      "G&F 训练概览：监督学习观察、分析与回答；Anchor 和 Bridging 独立采样；分视角验证；相加的配对奖励、共享优势与冻结参考模型。",
    "background.label": "01 / 研究问题的变化",
    "background.title": "从补充领域知识，<br><em>到组织已有能力。</em>",
    "background.body1":
      "前一阶段，我们关注能力覆盖：通过广泛、结构化的领域监督，为模型补足场景专精所需的遥感知识与技能。随着基座能力增强，我们的研究重点转向一个新问题：如何让模型组织已经具备的能力，完成更复杂的任务？",
    "background.body2":
      "能识别船舶、车辆和设施，只是起点。有效的判断还需要筛选与问题相关的观察，将其联系到任务条件，并随局部证据变化调整结论。这构成了从 FBA 到 Gravity &amp; Flight 的研究推进。",
    "background.fbaTitle": "建立场景专精的能力基础。",
    "background.gfTitle": "让已有能力服务具体判断。",
    "background.bridge":
      "看见图中有什么，是起点。<br><em>理解哪些观察与任务有关，是下一步。</em>",
    "lineage.label": "与 FBA 的联系",
    "figure.motivation": "研究动机图",
    "figure.method": "论文方法图",
    "figure.enlarge": "放大查看",
    "figure.pdf": "原始 PDF",
    "figure.detail": "查看原始尺寸",
    "figure.fit": "适应窗口",
    "figure.close": "关闭",
    "figure.pan": "放大后可滚动查看图中细节。",
    "method.figureTitle": "G&F 完整训练框架",
    "method.figureCaption":
      "先学习观察、推理与回答，再在相关上下文中优化判断。训练时使用成对图像，实际推理只需一张图。",
    "fba.label": "前序工作 · 2026",
    "fba.resources": "FBA 相关资源",
    "fba.paper": "arXiv 论文",
    "fba.website": "项目官网",
    "fba.model": "HF 模型",
    "fba.dataset": "HF 数据集",
  },
};
