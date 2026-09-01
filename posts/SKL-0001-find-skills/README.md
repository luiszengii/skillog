# SKL-0001 · Find Skills

```text
artwork/find-skills-illustration-v1.png   首页配图
cards/                                   v1 流水线渲染出的四张成品图
content/caption.md                       小红书发布文案
data/post.json                           本帖全部结构化内容与排版数据
data/results/find-output.txt             Find Skills 实测输出
data/metrics.json                        本帖发布后的表现快照
skill/SKILL.md                           上游 Find Skills 快照
skill/SOURCE.md                          上游来源与 commit
```

本帖使用 `pipelines/v1/`。重新渲染：

```bash
npm run render:cards -- posts/SKL-0001-find-skills/data/post.json
```
