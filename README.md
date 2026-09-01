# 万术录 Skillog

项目只维护三个业务目录：帖子、版本化内容流水线、静态网站。

```text
posts/                 一帖一目录；文案、Skill、配图、帖子数据、成品图全部内聚
pipelines/             每个流水线版本一个目录；当前正式版为 v1
website/               GitHub Pages 的源码、站点级数据、历史公开归档与构建脚本
docs/                  自动生成的 Pages 发布目录，不直接编辑
```

## 帖子目录

每篇帖子使用 `posts/<content-id>-<slug>/`：

```text
artwork/               该帖首页配图
cards/                 渲染完成的每一页 PNG
content/               发布文案
data/                  帖子 JSON、实测结果、后续表现数据
skill/                 帖子介绍的 Skill 本体与来源快照
```

## 流水线目录

`pipelines/v1/` 同时定义文案风格、机器人配图规则、排版样式、渲染脚本和校验脚本。以后调整成新风格时新增 `pipelines/v2/`，不覆盖 v1。

Codex 仍可通过 `.agents/skills/skillog-robot-illustrations` 自动发现机器人配图 Skill；该路径是指向 v1 流水线内真实文件的入口。

## 常用命令

```bash
npm install
npm run render:cards -- posts/SKL-0001-find-skills/data/post.json
npm run verify:cards
npm run build:site
```

GitHub Pages 从 `main:/docs` 发布。`docs/` 由构建脚本完全重建，不应手工维护。

## 公开性提醒

GitHub Pages 可公开访问。站点使用 `noindex` 降低自然搜索曝光，但这不是访问控制；不得归档凭证、隐藏指令、内部推理或工具原始日志。
