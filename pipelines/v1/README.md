# Skillog 内容流水线 v1

这是已经确认的正式 v1 流水线。一个版本目录必须自包含文案规范、配图 Skill、排版模板、渲染脚本和校验脚本；后续改版新增相邻版本目录，不直接覆盖本版本。

```text
content-style.md        选题、文案语气和信息边界
illustration/           Skillog 机器人配图 Skill 与角色基准图
layout/                 四卡 HTML、CSS 与设计 tokens
scripts/                渲染和多尺寸校验
research/               流水线选题与来源研究
WORKFLOW.md             从帖子到网站发布的操作约束
```

## 排版规则

设计基线是手机端优先，表头仅保留左上角 `INDEX` 与右上角“万术录”；不显示日期、页码或页尾。

每条帖子使用一个 `post.json` 驱动四张 1080 × 1440 PNG：

1. `cover`：直接封面
2. `result`：结果展示
3. `intro`：轻量介绍
4. `access`：获取入口

每条帖子的插画、数据、文案和成品卡片放在同一个帖子目录中。`data/post.json` 使用相对路径声明：

```json
{
  "index": "001",
  "templateVersion": "v1.0",
  "illustration": "../artwork/find-skills-illustration-v1.png",
  "illustrationAlt": "插画说明"
}
```

帖子专属插画固定放在该帖 `artwork/`。跨帖子复用的角色基准图由本流水线的机器人配图 Skill 管理。

渲染命令：

```bash
npm run render:cards -- posts/SKL-0001-find-skills/data/post.json
```

校验命令：

```bash
npm run verify:cards
```

新帖子复制现有帖子目录骨架，修改内容编号、来源、真实数据与四卡文案。不要编造安装量、效果或安全结论。
