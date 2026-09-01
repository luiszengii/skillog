# 万术录 Skillog

每日 AI Skill 的内容、数据与决策档案。

## 构建 GitHub Pages

```bash
npm install
npm run build:site
```

构建结果位于 `docs/`，可由 GitHub Pages 从 `main` 分支的 `/docs` 目录发布。

## 数据分工

- `data/notion-export.json`：Notion 结构化数据快照
- `data/conversations.json`：用户可见对话与结果索引
- `data/metrics.json`：流量快照的结构化指标
- `journal/`：按日期保存的对话原文与用户提供的素材
- `posts/`：每条帖子的四图、专属插画、文案、结果与流量截图
- `templates/`：四卡 HTML/CSS 模板
- `docs/`：静态网页发布目录

## 项目级 Skill

仓库自带 `.agents/skills/skillog-robot-illustrations/`。在其他设备克隆本项目后，Codex 可以直接将它识别为项目级 Skill，无需依赖原电脑的全局 Skill 目录。

调用示例：

```text
Use $skillog-robot-illustrations 为这个 Skill 生成一张 3:4 的 Skillog 吉祥物手绘配图。
```

角色基准图、角色结构规则、提示词模板和生成后检查表均已包含在该 Skill 目录中。

## 公开性提醒

GitHub Pages 网页通常公开可访问。站点使用 `noindex` 降低自然搜索曝光，但这不是访问控制。归档不得包含凭证、隐藏指令、内部推理或工具原始日志。
