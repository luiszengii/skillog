# Skillog 四卡模板

当前版本：`v1.0`。设计基线是手机端优先，表头仅保留左上角 `INDEX` 与右上角“万术录”；不显示日期、页码或页尾。

每条帖子使用一个 `post.json` 驱动四张 1080 × 1440 PNG：

1. `cover`：直接封面
2. `result`：结果展示
3. `intro`：轻量介绍
4. `access`：获取入口

每条帖子的插画与 `post.json`、文案和成品卡片放在同一个帖子目录中。`post.json` 使用相对路径声明：

```json
{
  "index": "001",
  "templateVersion": "v1.0",
  "illustration": "find-skills-illustration-v1.png",
  "illustrationAlt": "插画说明"
}
```

不要把帖子专属插画放进仓库根部的 `assets/`。`assets/` 只保留跨帖子复用的品牌级素材。

渲染命令：

```bash
node scripts/render-cards.mjs posts/SKL-0001-find-skills/post.json
```

校验命令：

```bash
npm run verify:cards
```

新帖子复制 `posts/SKL-0001-find-skills/post.json`，修改内容编号、来源、真实数据与四卡文案。不要编造安装量、效果或安全结论。
