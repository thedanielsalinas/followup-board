import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("sequence.json", "utf8"));

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const markdown = (() => {
  const lines = [
    `# ${data.title}`,
    "",
    `**Source:** ${data.source}`,
    "",
    "## Definitions",
    "",
    `- **First-call no-show:** ${data.definitions.firstCallNoShow}`,
    `- **Second-call no-show:** ${data.definitions.secondCallNoShow}`,
    `- **Timing:** ${data.definitions.timing}`,
    "",
    "## Routing authority",
    "",
    `**${data.authority.source}:** ${data.authority.rule}`,
    "",
    "## Global rules",
    "",
    ...data.globalRules.map((rule) => `- ${rule}`),
    ""
  ];

  for (const branch of data.branches) {
    lines.push(
      `---`,
      "",
      `# Branch ${branch.id} · ${branch.name}`,
      "",
      `**Purpose:** ${branch.purpose}`,
      "",
      `**Entry trigger:** ${branch.entry}`,
      "",
      `**Total cadence:** ${branch.counts.emails} emails · ${branch.counts.texts} texts`,
      ""
    );

    for (const phase of branch.phases) {
      lines.push(`## ${phase.name}`, "");
      for (const touch of phase.touches) {
        const condition = touch.conditional ? " · conditional" : "";
        lines.push(`- **${touch.timing} · ${touch.channel}${condition}:** ${touch.label} — prompt: _(empty)_`);
      }
      lines.push("");
    }

    lines.push("## Routes / exits", "");
    for (const route of branch.routes) {
      lines.push(`- **${route.when}** → ${route.to}`);
    }
    lines.push("");
  }

  lines.push("---", "", "# Open questions", "", ...data.openQuestions.map((item) => `- ${item}`), "");
  return lines.join("\n");
})();

const touchCard = (touch, color) => `
  <article class="touch ${touch.channel === "SMS" ? "sms" : "email"} ${touch.conditional ? "conditional" : ""}" style="--branch:${color}">
    <div class="timing">${escapeHtml(touch.timing)}</div>
    <div class="channel">${escapeHtml(touch.channel)}${touch.conditional ? " · conditional" : ""}</div>
    <div class="label">${escapeHtml(touch.label)}</div>
    <div class="prompt">prompt — to be written</div>
  </article>`;

const routeCard = (route) => `
  <div class="route"><b>${escapeHtml(route.when)}</b><span>→</span>${escapeHtml(route.to)}</div>`;

const branchLane = (branch) => `
  <section class="branch" id="branch-${branch.id}" style="--branch:${branch.color}">
    <div class="branch-head">
      <div>
        <div class="branch-number">Branch ${branch.id}</div>
        <h2>${escapeHtml(branch.name)}</h2>
        <p>${escapeHtml(branch.purpose)}</p>
      </div>
      <div class="totals"><strong>${branch.counts.emails}</strong> emails<br><strong>${escapeHtml(branch.counts.texts)}</strong> texts</div>
    </div>
    <div class="entry"><b>Entry trigger</b>${escapeHtml(branch.entry)}</div>
    <div class="phases">
      ${branch.phases.map((phase) => `
        <div class="phase">
          <h3>${escapeHtml(phase.name)}</h3>
          <div class="timeline">${phase.touches.map((touch) => touchCard(touch, branch.color)).join('<div class="arrow">→</div>')}</div>
        </div>`).join("")}
    </div>
    <div class="routes">
      <h3>Routes / exits</h3>
      <div class="route-grid">${branch.routes.map(routeCard).join("")}</div>
    </div>
  </section>`;

const embeddedJson = JSON.stringify(data).replaceAll("<", "\\u003c");
const embeddedMarkdown = escapeHtml(markdown);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
  <title>${escapeHtml(data.title)}</title>
  <style>
    *{box-sizing:border-box}html,body{margin:0;height:100%;overflow:hidden;overscroll-behavior:none}
    body{font:17px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#e9edf2;color:#182027;-webkit-user-select:none;user-select:none}
    #viewport{position:fixed;inset:0;overflow:hidden;touch-action:none;cursor:grab;background-image:radial-gradient(#bec6cf 1.2px,transparent 1.2px);background-size:24px 24px}
    #viewport.dragging{cursor:grabbing}.board{position:absolute;left:0;top:0;transform-origin:0 0;width:max-content;min-width:2900px;padding:64px;display:flex;flex-direction:column;gap:44px}
    .top{display:grid;grid-template-columns:600px 1fr;gap:36px;align-items:start}.hero,.panel,.branch{background:#fff;border-radius:22px;box-shadow:0 3px 12px #26323820}
    .hero{padding:34px}.eyebrow{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#607d8b}.hero h1{font-size:42px;line-height:1.08;margin:8px 0 14px}.hero p{margin:8px 0;color:#54616c}
    .legend{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}.legend span{border:2px solid #90a4ae;border-radius:9px;padding:5px 10px;font-size:13px}.legend .sms{border-style:dashed}
    .panel{padding:26px}.panel h2{margin:0 0 14px;font-size:25px}.authority{border:3px solid #f9a825;background:#fff8e1}.authority strong{display:block;margin-bottom:5px}.rules{display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:12px;margin-top:16px}.rule{padding:13px;border:2px solid #90a4ae;border-radius:11px;background:#f7f9fb}
    .router{padding:28px}.router-grid{display:grid;grid-template-columns:repeat(6,minmax(260px,1fr));gap:16px}.router-card{border:4px solid var(--branch);border-radius:15px;padding:16px;background:#fff}.router-card b{display:block;color:var(--branch);font-size:19px}.router-card span{display:block;margin-top:6px;color:#54616c;font-size:14px}
    .branch{border:5px solid var(--branch);background:color-mix(in srgb,var(--branch) 5%,white);padding:30px;min-width:2800px}.branch-head{display:flex;justify-content:space-between;gap:30px;align-items:flex-start}.branch-number{text-transform:uppercase;letter-spacing:.12em;font-size:13px;font-weight:900;color:var(--branch)}
    .branch h2{font-size:34px;margin:2px 0 6px;color:var(--branch)}.branch-head p{font-size:19px;max-width:1050px;margin:0}.totals{flex:none;border:3px solid var(--branch);background:#fff;border-radius:14px;padding:12px 18px;text-align:center}.totals strong{font-size:22px;color:var(--branch)}
    .entry{display:flex;gap:14px;align-items:baseline;margin:22px 0;padding:15px 18px;border:3px solid #f9a825;border-radius:13px;background:#fff8e1}.entry b{text-transform:uppercase;font-size:13px;letter-spacing:.09em;white-space:nowrap}
    .phases{display:flex;flex-direction:column;gap:20px}.phase{background:#fff;border-radius:17px;padding:18px 20px;box-shadow:0 2px 8px #26323818}.phase h3,.routes h3{margin:0 0 13px;text-transform:uppercase;letter-spacing:.08em;font-size:15px;color:#596773}.timeline{display:flex;align-items:stretch;gap:10px;flex-wrap:nowrap}.arrow{align-self:center;font-size:28px;color:#7b8790}
    .touch{width:205px;min-height:166px;flex:none;border:3px solid var(--branch);border-radius:13px;padding:12px;background:#fff;display:flex;flex-direction:column}.touch.sms{border-style:dashed}.touch.conditional{background:#fffde7}.timing{font-size:14px;font-weight:900;color:var(--branch)}.channel{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6b7780;margin:3px 0 10px}.label{font-weight:750}.prompt{margin-top:auto;border:2px dashed #c7cdd2;border-radius:8px;padding:7px;text-align:center;color:#98a1a8;font-size:12px}
    .routes{margin-top:20px}.route-grid{display:grid;grid-template-columns:repeat(5,minmax(260px,1fr));gap:12px}.route{display:grid;grid-template-columns:1fr auto 1fr;gap:9px;align-items:center;padding:13px;border:2px solid var(--branch);border-radius:11px;background:#fff}.route span{font-size:22px;color:var(--branch)}
    .open-questions{border:4px dashed #f9a825;background:#fffde7}.questions{display:grid;grid-template-columns:repeat(4,minmax(280px,1fr));gap:12px}.question{padding:14px;border:2px solid #f9a825;border-radius:11px;background:#fff}
    #controls{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:10;display:flex;gap:8px}#controls button{height:48px;min-width:48px;border:1px solid #aab3bb;border-radius:12px;background:#fff;box-shadow:0 2px 8px #0003;font:700 17px system-ui}
    details{position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:10;max-width:min(720px,calc(100vw - 230px));max-height:72vh;overflow:auto;background:#fff;border-radius:12px;padding:9px 13px;box-shadow:0 2px 8px #0003;font-size:13px;-webkit-user-select:text;user-select:text}pre{white-space:pre-wrap}
  </style>
</head>
<body>
  <div id="viewport"><main class="board" id="board">
    <div class="top">
      <header class="hero">
        <div class="eyebrow">ScaleDaycares · Sales automation architecture</div>
        <h1>${escapeHtml(data.title)}</h1>
        <p>${escapeHtml(data.source)}</p>
        <p>Drag to move · pinch or scroll to zoom · Fit shows the complete board.</p>
        <div class="legend"><span>Email</span><span class="sms">SMS</span><span style="background:#fffde7">Conditional</span><span style="border-color:#f9a825;background:#fff8e1">Entry</span></div>
      </header>
      <section class="panel authority">
        <h2>Routing authority</h2>
        <strong>${escapeHtml(data.authority.source)}</strong>
        ${escapeHtml(data.authority.rule)}
        <div class="rules">${data.globalRules.map((rule) => `<div class="rule">${escapeHtml(rule)}</div>`).join("")}</div>
      </section>
    </div>
    <section class="panel router">
      <h2>One lead → one active branch</h2>
      <div class="router-grid">${data.branches.map((branch) => `<div class="router-card" style="--branch:${branch.color}"><b>Branch ${branch.id} · ${escapeHtml(branch.name)}</b><span>${escapeHtml(branch.entry)}</span></div>`).join("")}</div>
    </section>
    ${data.branches.map(branchLane).join("")}
    <section class="panel open-questions"><h2>Open questions</h2><div class="questions">${data.openQuestions.map((item) => `<div class="question">${escapeHtml(item)}</div>`).join("")}</div></section>
  </main></div>
  <div id="controls"><button id="zoom-out" aria-label="Zoom out">−</button><button id="zoom-in" aria-label="Zoom in">+</button><button id="fit">⤢ Fit</button></div>
  <details><summary>Plain-text version</summary><pre>${embeddedMarkdown}</pre></details>
  <script type="application/json" id="sequence-data">${embeddedJson}</script>
  <script>
    (()=>{const vp=document.getElementById("viewport"),board=document.getElementById("board");let scale=1,x=0,y=0,last=null;const pointers=new Map();
    const apply=()=>board.style.transform="translate("+x+"px,"+y+"px) scale("+scale+")";const clamp=v=>Math.min(3,Math.max(.04,v));
    const zoomAt=(cx,cy,factor)=>{const next=clamp(scale*factor);x=cx-(cx-x)*next/scale;y=cy-(cy-y)*next/scale;scale=next;apply()};
    const fit=()=>{const w=board.scrollWidth,h=board.scrollHeight,W=vp.clientWidth,H=vp.clientHeight;scale=Math.min(W/w,H/h);x=(W-w*scale)/2;y=(H-h*scale)/2;apply()};
    const snapshot=()=>{const p=[...pointers.values()];if(p.length===1)last={x:p[0].x,y:p[0].y};else if(p.length>=2)last={x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)};else last=null};
    vp.addEventListener("pointerdown",e=>{vp.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});vp.classList.add("dragging");snapshot()});
    vp.addEventListener("pointermove",e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const p=[...pointers.values()];if(p.length===1){x+=p[0].x-last.x;y+=p[0].y-last.y;apply();last={x:p[0].x,y:p[0].y}}else{const cx=(p[0].x+p[1].x)/2,cy=(p[0].y+p[1].y)/2,d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);x+=cx-last.x;y+=cy-last.y;zoomAt(cx,cy,d/last.d);last={x:cx,y:cy,d}}});
    const up=e=>{pointers.delete(e.pointerId);if(!pointers.size)vp.classList.remove("dragging");snapshot()};["pointerup","pointercancel"].forEach(type=>vp.addEventListener(type,up));
    vp.addEventListener("wheel",e=>{e.preventDefault();if(e.ctrlKey||(!e.deltaX&&Math.abs(e.deltaY)>=50)){zoomAt(e.clientX,e.clientY,Math.exp(-e.deltaY*(e.ctrlKey ? .01 : .0015)))}else{x-=e.deltaX;y-=e.deltaY;apply()}},{passive:false});
    const center=()=>[vp.clientWidth/2,vp.clientHeight/2];document.getElementById("zoom-in").onclick=()=>zoomAt(...center(),1.3);document.getElementById("zoom-out").onclick=()=>zoomAt(...center(),1/1.3);document.getElementById("fit").onclick=fit;addEventListener("resize",fit);fit()})();
  </script>
</body>
</html>`;

fs.writeFileSync("sequence.md", `${markdown}\n`);
fs.writeFileSync("index.html", html);

console.log(`Built ${data.branches.length} branches into sequence.md and index.html`);
