# Posts

一篇帖子一个目录，目录名使用永久内容编号与稳定 slug：`<content-id>-<slug>`。

每个帖子目录固定包含：

- `content/`：小红书标题、正文、标签与来源文案。
- `skill/`：帖子介绍的 Skill 本体，以及上游版本和来源记录。
- `artwork/`：该帖专属的首页配图与后续版本。
- `cards/`：由指定流水线渲染完成的每一页图。
- `data/`：驱动渲染的 `post.json`、实测结果、流量截图和 `metrics.json`。

不要把一篇帖子的文件拆到仓库级 `assets/` 或 `data/` 中。
