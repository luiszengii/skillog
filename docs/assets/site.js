const $ = (selector) => document.querySelector(selector);
const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const setCopyState = (button, state, label) => {
  button.dataset.state = state;
  button.textContent = label;
  $("#copy-status").textContent = label;
};

const copyText = async (button, text, idleLabel) => {
  setCopyState(button, "loading", "复制中");
  try {
    await navigator.clipboard.writeText(text);
    setCopyState(button, "success", "已复制");
  } catch {
    setCopyState(button, "error", "复制失败");
  }
  window.setTimeout(() => setCopyState(button, "idle", idleLabel), 1400);
};

const mascotPrompt = "Use $skillog-robot-illustrations 为「Skill 名称」生成一张 3:4 的 Skillog 吉祥物手绘配图。核心结果是「想表达的结果」，让机器人亲自完成「具体动作」。";
$('[data-copy-mascot-prompt]').addEventListener("click", (event) => copyText(event.currentTarget, mascotPrompt, "复制指令"));

const renderContent = (items) => {
  $("#content-count").textContent = String(items.length).padStart(2, "0");
  if (!items.length) {
    $("#content-root").innerHTML = '<div class="empty-state"><strong>还没有内容</strong><p>选题通过审核后，会出现在这里。</p></div>';
    return;
  }

  const post = items[0];
  const gallery = post.cards.map((src, index) => `
    <figure>
      <img src="${esc(src)}" alt="${esc(post.id)} 第 ${index + 1} 张内容卡" width="1080" height="1440" loading="eager" />
      <a href="${esc(src)}" download>下载第 ${index + 1} 张</a>
    </figure>`).join("");

  $("#content-root").innerHTML = `
    <article class="post-feature">
      <figure class="post-feature__cover">
        <img src="${esc(post.cards[0])}" alt="${esc(post.title)}" width="1080" height="1440" fetchpriority="high" />
      </figure>
      <div class="post-feature__info">
        <div class="post-feature__meta">
          <span class="tag">${esc(post.id)}</span>
          <span class="tag">${esc(post.status)}</span>
          <span class="tag">${esc(post.type)}</span>
          <span class="tag">${esc(post.verification)}</span>
          <span class="tag">模板 ${esc(post.templateVersion)}</span>
        </div>
        <h3>${esc(post.title)}</h3>
        <p>${esc(post.body)}</p>
        <p><strong>热度快照：</strong>${esc(post.heat)}</p>
        <div class="actions">
          <button type="button" data-copy-title>复制标题</button>
          <button type="button" data-copy-body>复制正文</button>
          <a class="button" href="${esc(post.cardsZip)}" download>下载四图</a>
          <a class="button" href="${esc(post.captionFile)}" download>下载文案</a>
        </div>
        <a href="${esc(post.source)}">查看原始来源 →</a>
      </div>
    </article>
    <div class="gallery" aria-label="四张成品图">${gallery}</div>
    <section class="caption-block">
      <h4>发布正文</h4>
      <p>${esc(post.body)}</p>
    </section>`;

  $("[data-copy-title]").addEventListener("click", (event) => copyText(event.currentTarget, post.title, "复制标题"));
  $("[data-copy-body]").addEventListener("click", (event) => copyText(event.currentTarget, post.body, "复制正文"));
};

const renderMetrics = (items) => {
  $("#metric-count").textContent = String(items.length).padStart(2, "0");
  if (!items.length) {
    $("#metrics-root").innerHTML = '<div class="empty-state"><strong>等待第一篇发布</strong><p>发布后分别在 24 小时、72 小时和 7 天写入表现快照。</p></div>';
    return;
  }
  $("#metrics-root").innerHTML = `<div class="metric-list">${items.map((item) => {
    const values = item.metrics ?? {};
    const cells = Object.entries(values).map(([key, value]) => `
      <div><dt>${esc(key)}</dt><dd>${value === null ? "待确认" : esc(value)}</dd></div>`).join("");
    return `<article class="metric-entry">
      <header>
        <strong>${esc(item.contentId ?? item.id ?? "未关联内容")}</strong>
        <span>${esc(item.window ?? "时间窗口待确认")} · ${esc(item.capturedAt ?? item.date ?? "日期待确认")}</span>
      </header>
      ${cells ? `<dl>${cells}</dl>` : '<p class="muted">还没有可确认的指标。</p>'}
      ${item.sourceImage ? `<a href="${esc(item.sourceImage)}">查看原始截图 →</a>` : ""}
    </article>`;
  }).join("")}</div>`;
};

const renderConversations = (items) => {
  $("#conversation-count").textContent = String(items.length).padStart(2, "0");
  if (!items.length) {
    $("#conversations-root").innerHTML = '<div class="empty-state"><strong>还没有归档</strong><p>下一次交流完成后，会从这里开始留下记录。</p></div>';
    return;
  }

  $("#conversations-root").innerHTML = `<div class="conversation-list">${[...items].reverse().map((item) => `
    <article class="conversation-entry">
      <header>
        <strong>${esc(item.id)}</strong>
        <span>${esc(item.date)} · ${esc(item.timezone)}</span>
      </header>
      <div class="conversation-message">
        <span>你</span>
        <p>${esc(item.user)}</p>
      </div>
      <div class="conversation-message conversation-message--assistant">
        <span>Skillog</span>
        <p>${esc(item.assistantOutcome)}</p>
      </div>
      ${item.journalPath ? `<a href="${esc(item.journalPath)}">打开当天完整归档 →</a>` : ""}
    </article>`).join("")}</div>`;
};

const renderStrategy = (items) => {
  $("#decision-count").textContent = String(items.length).padStart(2, "0");
  $("#strategy-root").innerHTML = `<div class="decision-list">${items.map((item) => `
    <details class="decision">
      <summary>
        <strong>${esc(item.title)}</strong>
        <span>${esc(item.date)} · ${esc(item.type)} · ${esc(item.status)} · 影响 ${esc(item.impact)}</span>
      </summary>
      <div class="decision__body">
        <dl>
          <div><dt>决定</dt><dd>${esc(item.decision)}</dd></div>
          <div><dt>原因</dt><dd>${esc(item.reason)}</dd></div>
          <div><dt>曾考虑</dt><dd>${esc(item.alternative)}</dd></div>
        </dl>
      </div>
    </details>`).join("")}</div>`;
};

const renderNotes = (notes) => {
  $("#notes-root").innerHTML = `
    <div class="notes-copy">${[...notes.intro, ...notes.project].map((line) => `<p>${esc(line)}</p>`).join("")}</div>
    <div class="reference-grid">${notes.images.map((image) => `<figure><img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy" /><figcaption>${esc(image.alt)}</figcaption></figure>`).join("")}</div>`;
};

const load = async () => {
  const [notionResponse, conversationsResponse, metricsResponse] = await Promise.all([
    fetch("./data/notion-export.json"),
    fetch("./data/conversations.json"),
    fetch("./data/metrics.json")
  ]);
  for (const response of [notionResponse, conversationsResponse, metricsResponse]) {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }
  const [data, conversations, metrics] = await Promise.all([
    notionResponse.json(),
    conversationsResponse.json(),
    metricsResponse.json()
  ]);
  const exportedAt = $("#exported-at");
  exportedAt.textContent = "公开归档";
  exportedAt.title = `同步时间：${new Date(data.exportedAt).toLocaleString("zh-CN")}`;
  renderContent(data.content);
  renderConversations(conversations.entries);
  renderMetrics(metrics.entries);
  renderStrategy(data.decisions);
  renderNotes(data.notes);
};

load().catch((error) => {
  $("#content-root").innerHTML = `<div class="empty-state"><strong>数据没有载入</strong><p>${esc(error.message)}。请重新构建静态站点。</p></div>`;
});
