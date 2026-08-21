# Skillog 四卡模板

当前版本：`v0.2`。设计基线是手机端优先，减少辅助说明并放大主体文字。

每条帖子使用一个 `post.json` 驱动四张 1080 × 1440 PNG：

1. `cover`：直接封面
2. `result`：结果展示
3. `intro`：轻量介绍
4. `access`：获取入口

渲染命令：

```bash
npm run render:cards -- posts/SKL-0001-find-skills/post.json
```

校验命令：

```bash
npm run verify:cards
```

新帖子复制 `posts/SKL-0001-find-skills/post.json`，修改内容编号、来源、真实数据与四卡文案。不要编造安装量、效果或安全结论。
