# Gravity & Flight

**面向遥感视觉语言模型的细粒度证据化推理。**

[项目网站](https://z0ngl1ng.github.io/Gravity-and-Flight/) · [研究说明](docs/RESEARCH.md) · [Filling Before Advancing](https://github.com/Z0ngL1ng/filling-before-advancing) · [English](README.md)

Gravity and Flight（G&F）以 **Qwen3.5-4B** 为基座，通过两阶段后训练，让模型将细致观察连接到具体任务下的判断，并在证据变化时相应调整判断。

![G&F 动机：将物体识别与局部证据连接到车辆集结任务的判断。](web/assets/papers/gf-motivation.webp)

*识别船舶与设施只是起点。这个示例要求模型把车辆排列、铺装空间和邻近泊位联系到任务；图中的两处岸线位于同一张输入图像中。* [原始 PDF](web/assets/papers/gf-motivation.pdf)

## 研究思路

[Filling Before Advancing（FBA）](https://github.com/Z0ngL1ng/filling-before-advancing) 建立遥感场景专精所需的能力，其第二阶段 **Bridging-Conv** 从目标场景与相关场景中学习共享先验。G&F 将这一思路推进到**同一场景领域内部**的细粒度上下文变化：当局部属性、空间关系或可见性改变，哪些判断应随之改变，哪些应保持一致，哪些应降低具体程度？

命名灵感来自重力与气动升力。**Gravity** 让视觉陈述立足图像；**Flight** 检验推理如何从已描述的观察出发。这一类比启发了互补验证设计，不是奖励函数的物理模型。

## 方法

![G&F 两阶段方法：Evidence-of-Thought 监督微调与 Relational Transfer Policy Optimization。](web/assets/papers/gf-method.webp)

*论文中的完整方法图。* [原始 PDF](web/assets/papers/gf-method.pdf)

1. **EoT-SFT** 通过覆盖 888 张港口图像的 1,008 条示范，初始化“描述 → 分析 → 回答”的过程。
2. **RTPO** 使用共同任务下的 500 对 Anchor–Bridging 图像细化这一过程。每张图像独立生成回答，再随机一对一匹配，进行成对验证。

Gravity 检查视觉忠实性与描述覆盖度，Flight 检查证据使用及两侧判断的调整是否有据，Task Check 检查最终答案正确性。各项分数组成**相加的成对奖励与共享优势信号**；Gravity 不对 Flight 设置门控，Flight 不读取图像或答案约定。[验证定义](docs/RESEARCH.md#complementary-verification)

**推理时只需一张图像与一个问题。** 成对监督与验证卡片用于训练，不是部署时的策略输入。

## 已报告结果

G&F 的 **Overall 为 69.12**，相较 **Base 提升 9.76 分**，相较 **EoT-SFT 再提升 4.56 分**。

| 模型阶段 | Overall | 相较 Base 提升 |
| --- | ---: | ---: |
| Qwen3.5-4B Base | 59.36 | — |
| EoT-SFT | 64.56 | +5.20 |
| **G&F** | **69.12** | **+9.76** |

Overall 是 HarborEval、VRSBench、RSVQA、OpenEval、OmniEarth 与 VLRS-Bench 六个港口评测集得分的等权均值。各集保留自身评分协议，因此这是本研究的汇总指标，不是合并准确率或完整基准排行榜。[完整比较、消融与独立城市场景实验](docs/RESEARCH.md#harbor-evaluation)

<details>
<summary><strong>两个定性案例</strong>：局部证据与空间关系</summary>

![论文中的两个案例：对比 Base 与 G&F 对车辆区域支撑作用、船舶与封闭船坞相对位置的判断。](web/assets/papers/gf-qualitative-cases.webp)

两个案例展示局部观察如何支撑具体结论：第一个案例关注有组织的车辆停放与道路通达，第二个案例区分封闭船坞内部与船坞外的沿岸靠泊。这些是定性示例，不是总体准确率估计。[原始 PDF](web/assets/papers/gf-qualitative-cases.pdf)

</details>

<details>
<summary><strong>六案例回答分析</strong>：证据与推理 token 的位置</summary>

![六个采样案例中，Base 与 G&F 回答的证据 token 和推理 token 位置。](web/assets/papers/gf-token-analysis.webp)

**E** 表示证据 token，**I** 表示推理 token；暖色对应 Base，冷色对应 G&F。**NA** 表示该条 Base 回答没有分析 token，不代表推理密度为零。

横轴按内容 token 计数，不含格式专用 token。在六个采样图像—问题案例中，平均内容长度为 **350.83 → 156.33 tokens**，平均任务相关内容密度为 **22.35% → 39.91%**。这项描述性分析不能用于推断整个基准的效率或准确率。[分析定义](docs/RESEARCH.md#response-analysis) · [原始 PDF](web/assets/papers/gf-token-analysis.pdf)

</details>

## 资源

- **已公开：**[项目网站](https://z0ngl1ng.github.io/Gravity-and-Flight/)、[网站源码](web/)、[研究说明](docs/RESEARCH.md)及[四幅原始论文插图](docs/FIGURES.md)。
- **尚未发布：**完整论文、训练与评测实现、模型权重和数据集。后续更新见[发布状态](RELEASE_STATUS.md)。

[本地预览网站](docs/WEBSITE.md#view-the-website) · [插图来源](docs/FIGURES.md) · [授权范围](LICENSE_SCOPE.md)
