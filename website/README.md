# Website

GitHub Pages 静态站的所有源文件集中在这里：

```text
src/             HTML、CSS、JavaScript 与站点图标
data/            站点级数据；帖子级数据不放这里
assets/          网站自身使用的参考素材
archive/         已公开的历史对话与附件
automation/      网站归档与发布 Skill
scripts/         构建和浏览器校验
previews/        本地校验截图，忽略提交
```

`npm run build:site` 会读取 `posts/*/data/`，聚合帖子和表现数据，并完全重建仓库根部的 `docs/`。`docs/` 是 GitHub Pages 的部署产物，不是源文件目录。
