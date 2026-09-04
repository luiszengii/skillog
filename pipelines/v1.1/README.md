# Skillog 内容流水线 v1.1（固定紧凑试稿）

这是从正式 v1 分出的固定紧凑试稿流水线。它保留 v1 的文案、配图与视觉系统，减少第 02–04 页的无信息留白，并统一文字和分隔线的对齐关系。正式 v1 不受影响。

```text
content-style.md        选题、文案语气和信息边界
illustration/           Skillog 机器人配图 Skill 与角色基准图
layout/                 四卡 HTML、CSS 与设计 tokens
scripts/                渲染和多尺寸校验
research/               流水线选题与来源研究
WORKFLOW.md             从帖子到网站发布的操作约束
```

## 排版规则

设计基线仍是手机端优先，表头仅保留左上角 `INDEX` 与右上角“万术录”；不显示日期、页码或页尾。

## 固定排版规则

v1.1 不使用随机数、seed 或版式变体。相同内容始终生成相同布局：结果页双列统计等高对齐，步骤页所有正文使用同一左边界，安装页按命令、规格、审计顺序紧凑排列。

每条帖子使用一个 `post.json` 驱动四张 1080 × 1440 PNG：

1. `cover`：直接封面
2. `result`：结果展示
3. `intro`：轻量介绍
4. `access`：获取入口

每条帖子的插画、数据、文案和成品卡片放在同一个帖子目录中。`data/post.json` 使用相对路径声明：

```json
{
  "index": "001",
  "templateVersion": "v1.1-fixed",
  "illustration": "../artwork/find-skills-illustration-v1.png",
  "illustrationAlt": "插画说明"
}
```

帖子专属插画固定放在该帖 `artwork/`。跨帖子复用的角色基准图由本流水线的机器人配图 Skill 管理。

渲染命令：

```bash
npm run render:cards:v1.1 -- posts/SKL-0001-find-skills/data/post.json posts/SKL-0001-find-skills/trials/v1.1/layout.json
```

校验命令：

```bash
npm run verify:cards:v1.1 -- posts/SKL-0001-find-skills/data/post.json posts/SKL-0001-find-skills/trials/v1.1/layout.json
```

试稿只写入 `posts/<post>/trials/v1.1/`，不要覆盖正式 `cards/`。配置默认渲染图一至图四；用户确认后，再把固定规则升级为正式流水线。

新帖子复制现有帖子目录骨架，修改内容编号、来源、真实数据与四卡文案。不要编造安装量、效果或安全结论。
