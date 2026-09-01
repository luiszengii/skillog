# AI Skill / Prompt / Workflow / Tool 选题源地图

> 调研快照：2026-08-20。只采用平台官方页面、官方文档、官方仓库和第一方 API 作为事实来源；不采用二手榜单和媒体盘点。

## 结论先行

“热门”不能由单一榜单证明。建议把来源分成两层：

- **线索发现层**：回答“最近有什么值得看”。核心是 skills.sh、GitHub Trending/Search、官方插件目录，以及 n8n、Hugging Face、Replicate、Product Hunt 等平台内榜单或目录。
- **事实验证层**：回答“它是谁做的、现在还能不能用、具体能做什么、成本和授权是什么”。必须回到作者/厂商的仓库、文档、版本记录、许可证与实际运行结果。

一条内容进入待发布池前，应满足三个底线：**来源可追溯、近期仍可用、结果可展示**；再至少有两个互相独立的热度信号，例如 skills.sh 安装量上升 + GitHub 近期增长，或 Product Hunt 当期排名 + Replicate 运行量。所有“热度”都应写成“在某平台上的热度”，不能外推成全网用户规模或实际效果。

### 证据等级

- **L0 · 发现线索**：榜单、搜索结果、安装量、Star、Like、评论和目录收录。只能说明“值得继续查”。
- **L1 · 身份/制品验证**：第一方仓库、manifest、版本、许可证、源码、OpenAPI 或包元数据。能确认“是谁发布了什么”，不能证明运行效果。
- **L2 · 可执行面验证**：公开 API、交互演示或官方测试流程能够发起真实调用。只有保存本次输入、版本、输出、时间、成本和错误后，才算验证了当时的功能。
- **L3 · 业务可用性验证**：在目标账号、地区、权限和真实工作流中完成端到端测试。本次只做无账号、无用户数据的公开来源调研，因此没有把任何候选标为 L3。

### 2026-08-20 公开快照（用于校准“新鲜/热门”）

| 来源 | 当日可读元数据 | 证据等级与解读 |
|---|---|---|
| [skills.sh](https://www.skills.sh/) | 公开榜单显示 `find-skills` 约 300 万次安装、`grill-me` 约 90.99 万、Anthropic `frontend-design` 约 79.63 万；[文档](https://www.skills.sh/docs)说明排名来自 CLI 的匿名安装遥测。[CLI v1.5.23](https://github.com/vercel-labs/skills/releases/tag/v1.5.23)于 2026-08-18 发布。 | **L0**。安装次数不是独立用户或成功执行次数；站方也明确不保证每个 Skill 的质量或安全。 |
| [`openai/plugins`](https://github.com/openai/plugins) | 公共 [marketplace.json](https://raw.githubusercontent.com/openai/plugins/main/.agents/plugins/marketplace.json) 当日包含 180 个条目；[GitHub 公共仓库 API](https://api.github.com/repos/openai/plugins)显示约 5,120 Star；[Plugin UI changelog](https://developers.openai.com/plugins/changelog)最近一条为 2026-07-21。 | **L1**。能核对 OpenAI 当前示例、manifest 与来源；没有逐插件安装量，也不是运行测试。旧 `openai/skills` 已在 README 中标为弃用。 |
| [`anthropics/skills`](https://github.com/anthropics/skills) | `skills/` 下 19 个公开 Skill 目录；[仓库 API](https://api.github.com/repos/anthropics/skills)当日约 170,549 Star，Skill 路径最近一次提交为 2026-08-18；[Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)记录 Agent Skills 与 `/v1/skills` 于 2026-08-19 GA。 | **L1**。官方示例与 release notes 可确认结构和当前 API 状态；仓库总 Star 不能分摊到单个 Skill，API 实际调用仍需账户并应另行测试，本次未访问。 |
| [`github/awesome-copilot`](https://github.com/github/awesome-copilot) | `skills/` 下 410 个目录；[仓库 API](https://api.github.com/repos/github/awesome-copilot)当日约 38,038 Star，`pushed_at` 为 2026-08-19。 | **L0→L1**。适合搜索，再读具体文件；内容是社区贡献，GitHub 明确要求安装前检查。 |
| [`google-gemini/gemini-skills`](https://github.com/google-gemini/gemini-skills) | [仓库 API](https://api.github.com/repos/google-gemini/gemini-skills)当日约 3,918 Star，`pushed_at` 为 2026-08-19。 | **L1**。可确认 Google Gemini 第一方 Skill 指令与依赖版本；不证明模型端当前行为。 |
| [MCP Registry](https://registry.modelcontextprotocol.io/) | 官方 [Registry API 文档](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/api/official-registry-api.md)支持公开读取、按名称搜索、`updated_since` 增量同步和版本历史；[仓库 API](https://api.github.com/repos/modelcontextprotocol/registry)当日约 7,175 Star，`pushed_at` 为 2026-08-19；[API changelog](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/api/CHANGELOG.md)记录字段与端点变更。 | **L1**。能确认发布者命名空间、包、版本、仓库与状态；Registry 不运行服务器，也没有使用量、uptime 或效果评分。 |
| [Hugging Face Spaces](https://huggingface.co/spaces) | 官方 `list_spaces` 支持按 `created_at`、`last_modified`、`likes`、`trending_score` 排序；[语义搜索 API](https://huggingface.co/api/spaces/semantic-search?q=agent%20tool&sdk=gradio)返回 Space ID、Like 与最后更新时间。 | **L0→L2**。目录信号只是线索；每个 Gradio Space 暴露 API/OpenAPI，实际调用并保存结果后才能升到 L2。 |

GitHub 数字来自无需登录即可读取的公共仓库元数据端点；GitHub 说明公共仓库的 “Get a repository” 可匿名使用，且 `stargazers_count` 表示 Star 数量。[REST 仓库端点](https://docs.github.com/en/rest/repos/repos#get-a-repository) · [Star 字段语义](https://docs.github.com/en/rest/activity/starring#about-starring)

## 1. Agent Skills 与插件：主线来源

| 来源 | 用法与可读信号 | 它能证明什么 | 它不能证明什么 / 限制 |
|---|---|---|---|
| [skills.sh / Vercel `skills` 生态](https://www.skills.sh/) | 按类别、累计安装量、24 小时 Trending、Hot、[官方厂商](https://www.skills.sh/official)与[安全审计](https://www.skills.sh/audits)发现 Skill；可用 [`npx skills find`](https://github.com/vercel-labs/skills) 搜索。 | 证明该 Skill 在 skills.sh 生态被安装过，以及当前自动扫描状态。它是目前最直接的“单个 Skill 平台热度”线索。 | 安装量不等于独立用户、活跃使用、满意度或效果；自动审计也不等于人工权限审查。站方明确不保证每项质量或安全。公开网页可匿名浏览，但[目录/search/audit API](https://www.skills.sh/docs/api)要求 Vercel OIDC，600 请求/分钟；本次未登录调用。 |
| [GitHub Trending](https://github.com/trending) + [Repository Search/API](https://docs.github.com/en/rest/search/search#search-repositories) | Trending 提供日/周/月窗口和当期新增 Star；Search 可按 Star、Fork、更新时间排序，并用 `pushed:`、`stars:`、`archived:false`、`topic:` 等条件过滤。适合发现 `SKILL.md` 仓库、Agent 工具和开源工作流。 | 证明 GitHub 平台内的关注度、近期代码活动、开源状态和作者身份。 | Star 不等于安装或使用；Trending 算法并不公开，也没有正式公开 API。Search 最多返回 1,000 个结果；认证搜索通常 30 次/分钟，代码搜索 10 次/分钟，未认证搜索 10 次/分钟。代码搜索还可能不完整。 |
| [GitHub Agent Finder](https://github.com/agentfinder) | 当日公开目录显示 2,000 个 Skill、MCP、Agent、Canvas 与 Tool 资源；可按自然语言检索，2026-06-17 的[官方 changelog](https://github.blog/changelog/2026-06-17-agent-finder-for-github-copilot-now-available/)说明其采用 ARD 规范。 | **L0**：证明资源进入指定目录并获得相关性排序。 | GitHub 明确说明它不会自动安装或连接结果；资源是否安全、可运行、适合当前客户端仍需回源和测试。 |
| [OpenAI / ChatGPT 与 Codex 统一插件目录](https://learn.chatgpt.com/docs/plugins) | 官方文档确认 ChatGPT 与 Codex 共用一个公共插件目录；插件可包含 Skills、Connectors、MCP、Hooks 等。适合发现当前可安装的 OpenAI 生态能力。 | 证明一个插件已进入该目录，并可在受支持的 OpenAI 产品界面安装。 | 官方未公开逐项安装量或趋势分；可见性受账户、产品界面和发布状态影响，IDE 扩展也不支持插件。它适合“身份与可安装性验证”，不适合单独证明热门。 |
| [`openai/plugins`](https://github.com/openai/plugins) | OpenAI 当前维护的 Codex 插件示例集合，可直接检查 manifest、Skills、MCP 和资源文件。 | 证明 OpenAI 当前推荐的插件结构与官方示例内容。 | 这是示例仓库，不是完整公共目录，也没有单个 Skill 的使用量。特别注意：旧 [`openai/skills`](https://github.com/openai/skills) 已明确弃用，不能再作为“当前官方目录”。 |
| [OpenAI Skills API](https://developers.openai.com/api/docs/guides/tools-skills) | `GET /skills`、不可变版本和 bundle 下载可列出并核对当前 Project 内的 Skill；将 Skill 挂到 hosted shell 后可以进行执行测试。 | **L1→L2**：能验证项目库存、版本和内容；保存一次真实执行的输入/输出后可升到 L2。 | 它是需认证的 Project 私有库存 API，不是公共 Skill 目录；本次未使用账户或 API Key。 |
| [Anthropic 官方 Claude Code 插件目录](https://github.com/anthropics/claude-plugins-official) | Marketplace 同时包含 Anthropic 内部插件和第三方插件；[marketplace.json](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json) 给出作者、类别、主页、源仓库、ref/commit SHA。 | 证明插件被 Anthropic 目录收录，并能追到具体发布源和版本。 | 仓库 Star 是整个目录的，不是逐插件热度；没有公开逐项安装量。Anthropic 也明确提醒其不控制外部插件包含的 MCP、文件或后续变更，收录不等于无风险或有效。 |
| [Anthropic `skills` 官方示例](https://github.com/anthropics/skills) | 读取官方文档型 Skills 和示例 Skills；配合 [Agent Skills 官方说明](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) 验证结构、平台支持和限制。 | 证明 Anthropic 官方提供/示范了某种 Skill 及其当前接口语义。 | 仓库总 Star 不能分摊为每个 Skill 的热度；示例存在也不代表大量用户正在使用。 |
| [Anthropic Skills API](https://platform.claude.com/docs/en/api/beta/skills/list) | 可列出 Workspace Skills，并通过[版本接口](https://platform.claude.com/docs/en/api/beta/skills/versions/list)核对与下载具体版本；2026-08-19 release notes 已宣布 GA、无需旧 beta header。 | **L1**：能验证已认证 Workspace 内的 Skill 身份、版本和内容。 | 它不是公共发现 API，必须使用账户权限；目录与运行效果仍需分开验证。本次未登录调用。 |
| [Google Gemini 官方 Skills](https://github.com/google-gemini/gemini-skills) | 直接读取 Gemini API、SDK 和模型/Agent 交互的第一方 `SKILL.md`；仓库还包含 Codex 与 Claude 插件 manifest。 | 证明 Google 当前公开的 Skill 指令、包依赖和示例结构。 | 这是厂商示例库，不是全生态榜单；Star 是仓库级信号。指令中的模型、版本和 API 行为仍要回到 Gemini 文档并实际调用。 |
| [GitHub Awesome Copilot](https://github.com/github/awesome-copilot) | GitHub 官方组织托管的社区合集，可全文搜索 Skills、Agents、Workflows 和 Plugins；GitHub 文档也支持用 `gh skill` 搜索、安装和更新 Skill。 | 证明条目进入 GitHub 的社区合集并可按公开源码检查、安装。 | 合集内容来自第三方开发者；GitHub 明确要求安装前检查。没有逐项安装量，收录不等于 GitHub 对效果或安全背书。 |
| [MCP 官方 Registry](https://github.com/modelcontextprotocol/registry) | 公共读取 API 可列出服务器、版本和元数据；[官方 API 文档](https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/api/official-registry-api.md)给出 `/v0.1/servers`、搜索、增量同步和版本历史。适合补充“工具型 Skill / Connector”选题。 | 证明某 MCP 条目已经发布到官方 Registry，并能追踪命名空间、包、版本与仓库元数据。 | Registry 只托管元数据，不托管产物；没有使用量、评分或效果指标。当前文档仍提示预览状态，且不提供 uptime 或数据持久性保证。[官方信任模型](https://github.com/modelcontextprotocol/registry/blob/main/docs/modelcontextprotocol-io/about.mdx)也明确不扫描 Server 代码；命名空间校验只证明发布权限，不证明质量。 |
| [GitHub MCP Registry](https://github.com/mcp) | 当日公开目录显示 220 个 MCP Server，并展示来源、仓库 Star 与安装入口。 | **L0→L1**：适合用 GitHub 平台信号发现候选并回到源码。 | 条目数与 Star 只能证明目录收录和仓库关注度，不能证明服务器安全、在线或调用成功；还应与 canonical MCP Registry 的版本/状态交叉核对。 |
| [MCP 官方参考 Servers](https://github.com/modelcontextprotocol/servers) | 查看 Steering Group 维护的少量参考服务器、源码、测试与[发布记录](https://github.com/modelcontextprotocol/servers/releases)，用于理解文件、Git、Memory、Fetch 等工具的标准实现。 | **L1**：能验证参考实现和发布制品确实存在，并对照 SDK 用法。 | README 明确说该仓库不再是服务器目录，完整发现应去 Registry；这些实现是教学参考而非 production-ready，不能替代安全审查和真实客户端测试。 |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector) | 对候选 Server 执行初始化，枚举 Tools / Resources / Prompts，并发起代表性 Tool 调用。 | **L2**：这是最强的官方协议功能验证面，可证明某一版本在测试时能连接、暴露 schema 并返回结果。 | 它不是发现目录，也不能证明服务器安全、稳定、成本可接受或业务结果正确；测试仍应隔离权限并保留完整日志。 |

### GitHub 具体搜索建议

先用 Repository Search 找活跃仓库，再对候选做代码搜索：

- 仓库级：`agent skills in:name,description,readme pushed:>=2026-05-20 archived:false`
- 代码级：查找文件名 `SKILL.md`，再结合 `path:skills`、目标关键词和作者组织；代码搜索需要认证。
- 不要只按 Star 排序。把 `pushed_at`、Release、Issue 活跃度、许可证、README 的安装步骤和一次真实运行一起记录。

GitHub 官方文档确认，仓库搜索可以用 `stars:`、`pushed:`、`topic:`、`license:` 与 `archived:` 等过滤条件，并按 Star、Fork 或更新时间排序；API 的分页、结果上限与速率限制也应写入采集器配置。[搜索语法](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories) · [API 限制](https://docs.github.com/en/rest/search/search)

## 2. Prompt、工作流与 AI 工具：扩展来源

| 来源 | 最适合发现 | 平台内信号 | 限制与验证要求 |
|---|---|---|---|
| [n8n AI 模板库](https://n8n.io/ai/) | 可直接展示流程图和产出结果的 AI Agent / 自动化工作流。官方页面称社区每周新增工作流；单页可见作者、类别和最后更新时间。 | 上新时间、最后更新时间、节点/集成组合、作者与分类。 | 社区模板不是 n8n 对效果的背书；很多模板依赖 API Key、付费服务或自托管节点。目录没有统一、透明的逐项热度口径，发布前必须实际导入并跑通。 |
| [Zapier AI workflow templates](https://zapier.com/templates/ai-workflows) / [Make templates](https://www.make.com/en/templates) | 面向非技术用户的“工具型 Skill”：邮件、销售、内容、会议、表单等结果导向自动化。 | 官方精选、使用场景、所需应用和流程结构。 | 公开页面通常缺少可横向比较的安装量；目录位置不能证明热门。验证时记录所需付费计划、连接器权限、地区可用性和是否真能复现。 |
| [LangChain Tool Integrations](https://docs.langchain.com/oss/python/integrations/tools) | 按搜索、代码解释、生产力、浏览器、数据库、金融、集成平台等类别发现 Agent 工具；[Provider 总目录](https://docs.langchain.com/oss/python/integrations/providers/overview)称有 1,000+ integrations。 | 证明 LangChain 当前文档化了某个标准接口、安装包和示例调用。 | 文档目录没有统一的逐工具下载量、最近更新时间或运行状态；部分条目由社区/厂商维护并需要付费 Key。它是 **L1 兼容性证据**，不是效果证明。 |
| [LlamaHub](https://llamahub.ai/) | 查找 Data Loaders、Agent Tools、Llama Packs 和 Datasets；LlamaIndex 官方仓库称生态包含 300+ integration packages。 | 证明该集成被 LlamaIndex 生态编目，并能回到对应包/源码检查接口。 | 公开目录缺少统一热度与健康度字段；[LlamaIndex 仓库](https://github.com/run-llama/llama_index)还明确提示 README 不如文档更新及时。先看当前 docs、包版本和 release，再本地调用。 |
| [Hugging Face Spaces Trending](https://huggingface.co/spaces?sort=trending) | 可直接试玩的图像、视频、语音、Agent Demo，也适合寻找“生图 Skill”的结果钩子。官方客户端支持按 `trending_score`、Likes、创建时间和最后更新时间排序。 | `trending_score`、Likes、`lastModified`、运行/休眠/报错状态、关联模型与数据集。 | Trending Score 是 Hugging Face 自己的指标；Like 不等于生产使用。Space 可能休眠、报错或只是一层 Demo UI。必须检查模型卡、许可证、作者、依赖和实际输出。[API 字段说明](https://huggingface.co/docs/huggingface_hub/en/package_reference/hf_api) |
| [Replicate Explore](https://replicate.com/explore) | 新的图像、视频、音频模型和可复现演示；适合做“一个提示词能产出什么”的帖子。 | 页面和[模型 API](https://replicate.com/docs/reference/http)公开累计 `run_count`；模型对象还可给出 GitHub、论文、许可证、示例和最新版本，部分模型标记 Official。 | Run count 是累计调用次数，不是独立用户、近期增速或满意度，老模型天然占优。Official 标记主要说明托管维护属性，仍需核对模型所有者、价格、输入输出和内容政策。API 调用需要 Token。 |
| [Product Hunt AI 主题页](https://www.producthunt.com/topics/artificial-intelligence) | 新发布的 AI 工具、产品化方向与潜在商单品牌。 | 日/周/月排名、Points、评论与发布时间。Product Hunt 说明 Points 来自 Upvote 及其他真实互动，不是一票一分。 | 只证明 Product Hunt 上的发布期关注，不能证明留存、收入或中国用户适配。排名算法不完全公开。API 必须使用 Token，且官方条款默认禁止商业用途；若要批量用于商业内容系统，需要先取得许可。[Points 解释](https://help.producthunt.com/en/articles/10275873-what-are-points) · [API 条款与访问](https://api.producthunt.com/v2/docs) |

## 3. 第一方 Prompt 与教程库：验证源，不是热度源

- [OpenAI Cookbook](https://github.com/openai/openai-cookbook)：OpenAI API 的官方示例和指南。适合验证提示词、Agents 和多模态工作流的当前写法；仓库 Star 只能说明整个 Cookbook 的关注度，不能证明其中某条 Prompt 热门。
- [Anthropic Claude Cookbooks](https://github.com/anthropics/claude-cookbooks) 与 [Console prompting tools](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools)：适合验证 Prompt Template、变量、Prompt Generator/Improver 及 Agent 工作流。它们证明官方推荐的实现方式，不提供用户热度。
- [Midjourney Prompt Basics](https://docs.midjourney.com/docs/prompts)、[Image Prompts](https://docs.midjourney.com/hc/en-us/articles/32040250122381-Image-Prompts) 与 [Version](https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version)：适合核对生图提示词语法、图片参考、参数和当前默认模型版本。版本变化会影响同一 Prompt 的结果，所以帖子必须记录模型版本和生成日期。
- [OpenAI 图像模型页](https://developers.openai.com/api/docs/models/gpt-image-2)：适合核对当前图像模型的输入输出、端点、快照和限制。与所有第一方 Prompt 文档一样，它能证明“语法与能力边界”，不能证明“这条 Prompt 正在流行”。

## 4. 每个候选的验证清单

1. **身份**：作者/组织、官方主页、仓库、目录条目是否互相指向；如果是第三方目录条目，不能写成“官方 Skill”。
2. **新鲜度**：最近 commit/release、目录更新时间、产品官方 changelog；例如 [OpenAI changelog](https://developers.openai.com/api/docs/changelog) 与 [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)。
3. **可用性**：安装步骤能否执行；是否需要登录、地区权限、邀请码、付费套餐、API Key 或特定模型。
4. **结果证据**：用固定输入亲自跑一次，保存原始输入、完整 Prompt、模型/版本、参数、日期、耗时、成本、输出和失败情况。不要只转发作者的 Demo。
5. **安全与权限**：阅读 `SKILL.md`、脚本、MCP 权限、Hooks 和依赖；自动审计只能做初筛。陌生代码先隔离测试，不接主账号或生产数据。
6. **授权**：记录代码许可证、模板条款和截图/图片来源。社区图只作研究参考；小红书成品图应优先使用自己实测生成的结果，避免直接搬运。
7. **热度表述**：精确写明信号与窗口，例如“skills.sh 累计安装量”“GitHub 本周新增 Star”“Product Hunt 当日排名”；不写“全网最火”或“百万用户都在用”。

## 5. 建议的日常采集节奏

- **每天 15 分钟**：skills.sh 热门/搜索、GitHub Trending（日/周）、Product Hunt AI 当日榜。
- **每周 2 次**：OpenAI 统一插件目录、Anthropic 插件 marketplace、GitHub Awesome Copilot、MCP Registry 新版本。
- **按内容类型轮换**：n8n / Zapier / Make 找工作流；Hugging Face / Replicate 找可视化结果；OpenAI / Anthropic Cookbooks 与 Midjourney 文档做语法和版本核验。
- **进入 Notion 前先去重**：用“能力对象 + 单一结果”作为唯一键，而不是只按产品名；同一个工具可以拆成多个 Skill 选题，但每条只展示一个明确结果。

推荐在 Notion 为每条候选保存：`类型`、`能力对象`、`单一结果`、`发现源`、`发现日期`、`热度信号1/2`、`官方验证源`、`作者/组织`、`当前版本`、`最后更新`、`费用/登录`、`许可证/截图权限`、`实测状态`、`结果图片`、`风险/限制`、`选题状态`。这样“发现它”和“相信它”不会混在同一个字段里。
