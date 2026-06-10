// =====================================================
// Scene 05 — 关系网络地图
// =====================================================
function SceneNetwork() {
  const [filter, setFilter] = useState("all");
  const [hover, setHover] = useState(null);

  const typeColor = {
    core: "var(--amber)",
    kin: "var(--pink)",
    town: "var(--pink)",
    interest: "var(--purple)",
    money: "var(--purple)",
    rival: "var(--red)",
    competitor: "var(--red)",
    smuggle: "var(--cyan)",
    second: "var(--green)",
  };
  const edgeMatch = (e) => {
    if (filter === "all") return true;
    if (filter === "kin") return e.type === "kin" || e.type === "town";
    if (filter === "interest") return e.type === "interest" || e.type === "money";
    return e.type === filter;
  };
  const nodeFaded = (n) => {
    if (filter === "all") return false;
    if (n.type === "core") return false;
    if (filter === "kin") return !(n.type === "kin" || n.type === "town" || n.type === "core");
    if (filter === "interest") return !(n.type === "interest" || n.type === "money" || n.type === "core");
    return n.type !== filter && n.type !== "core";
  };

  const filters = [
    { key: "all",        label: "全部信号",     count: D.NET_EDGES.length },
    { key: "kin",        label: "亲族 / 同乡", count: D.NET_EDGES.filter(e => e.type === "kin" || e.type === "town").length },
    { key: "interest",   label: "利益 / 同金主", count: D.NET_EDGES.filter(e => e.type === "interest" || e.type === "money").length },
    { key: "smuggle",    label: "窜货 / 暗中分货", count: D.NET_EDGES.filter(e => e.type === "smuggle").length },
    { key: "rival",      label: "竞品同步挖角", count: D.NET_EDGES.filter(e => e.type === "rival").length },
    { key: "second",     label: "二代俱乐部",   count: D.NET_EDGES.filter(e => e.type === "second").length },
  ];

  return (
    <div className="scene fade-in" style={{ gridTemplateRows: "auto 1fr auto", gap: 24 }}>
      <SectionHead
        eyebrow="MAP 02 · DEALER RELATIONSHIP GRAPH"
        title="关系网络地图"
        sub={<>过去 — 这张图只在 <b className="t1">区域老业务员的酒桌上</b>。<br/>现在 — 第一次出现在总部屏幕。<br/>对 <b className="amber">窜货治理 / 价格管控 / 区域博弈</b> 的价值, 无法估量。</>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 28, minHeight: 760, flex: 1 }}>
        <div className="card subtle-grid" style={{ padding: 0, position: "relative", overflow: "hidden" }}>
          <div className="card-title" style={{ padding: "20px 24px 0" }}>
            5 大关系簇 · 实时信号
            <span className="badge">CLICK FILTERS →</span>
          </div>

          <svg viewBox="0 0 1100 660" style={{ width: "100%", height: "100%" }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="var(--t-3)"/>
              </marker>
            </defs>

            {/* edges */}
            {D.NET_EDGES.map((e, i) => {
              const a = D.NET_NODES.find(n => n.id === e.a);
              const b = D.NET_NODES.find(n => n.id === e.b);
              const on = edgeMatch(e);
              const c = typeColor[e.type] || "var(--t-3)";
              const dash = e.type === "smuggle" || e.type === "rival" ? "4 3" : "0";
              return (
                <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={c} strokeOpacity={on ? 0.65 : 0.08}
                  strokeWidth={on ? 1.6 : 1}
                  strokeDasharray={dash}/>
              );
            })}

            {/* nodes */}
            {D.NET_NODES.map(n => {
              const faded = nodeFaded(n);
              const c = typeColor[n.type] || "var(--t-2)";
              return (
                <g key={n.id}
                  onMouseEnter={(e) => setHover({ x: e.clientX, y: e.clientY, n })}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer", opacity: faded ? 0.18 : 1, transition: "opacity .2s" }}>
                  {n.type === "core" && (
                    <circle cx={n.x} cy={n.y} r={n.r + 10} fill={c} opacity="0.08"/>
                  )}
                  <circle cx={n.x} cy={n.y} r={n.r} fill={n.type === "core" ? c : "var(--bg-2)"} stroke={c} strokeWidth={n.type === "core" ? 0 : 1.5}/>
                  {n.type === "competitor" && <text x={n.x} y={n.y + 5} textAnchor="middle" style={{ fill: "var(--red)", fontSize: 16, fontWeight: 600 }}>★</text>}
                  <text x={n.x} y={n.y + n.r + 20} textAnchor="middle" className="node-label"
                    style={{ fill: n.type === "core" ? "var(--t-1)" : "var(--t-2)", fontSize: n.type === "core" ? 17 : 14, fontFamily: "var(--f-sans)", fontWeight: n.type === "core" ? 600 : 500 }}>
                    {n.label}
                  </text>
                  {n.note && !faded && (
                    <text x={n.x} y={n.y + n.r + 40} textAnchor="middle" style={{ fill: c, fontSize: 13, fontFamily: "var(--f-mono)" }}>
                      ◆ {n.note}
                    </text>
                  )}
                </g>
              );
            })}

            {/* cluster labels */}
            {[
              { x: 220, y: 28, label: "01 · 亲族 / 同乡 簇 (华东)", c: "var(--pink)" },
              { x: 880, y: 28, label: "02 · 利益 / 同金主 簇 (华南)", c: "var(--purple)" },
              { x: 240, y: 410, label: "03 · 窜货流向 簇 (西南)", c: "var(--cyan)" },
              { x: 540, y: 420, label: "04 · 竞品同步挖角 簇 (华中)", c: "var(--red)" },
              { x: 770, y: 420, label: "05 · 二代俱乐部 (隐性)", c: "var(--green)" },
            ].map((g, i) => (
              <text key={i} x={g.x} y={g.y} textAnchor="middle"
                style={{ fill: g.c, fontSize: 15, fontFamily: "var(--f-mono)", letterSpacing: "0.1em", fontWeight: 600 }}>
                {g.label}
              </text>
            ))}
          </svg>
        </div>

        <div className="col gap-16">
          {/* filters */}
          <div className="card">
            <div className="card-title">信号筛选<span className="badge">{filters.find(f => f.key === filter).count} 条</span></div>
            <div className="col gap-8">
              {filters.map(f => (
                <button key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    background: filter === f.key ? "var(--bg-2)" : "transparent",
                    border: "1px solid " + (filter === f.key ? "var(--amber)" : "var(--border-1)"),
                    padding: "12px 16px",
                    color: "var(--t-1)",
                    fontSize: 17,
                    cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "var(--f-sans)",
                    textAlign: "left",
                  }}>
                  <span>{f.label}</span>
                  <span className="mono t3" style={{ fontSize: 15 }}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">本周新发现<span className="badge">+3</span></div>
            <div className="col gap-12">
              {[
                { l: "粤西·李氏 ↔ 粤东·黄氏", n: "同金主信号 · 暗中分货 月 240 万", c: "var(--purple)" },
                { l: "豫北·陈氏 · 豫南·赵氏", n: "竞品 X 同步高频拜访 · 协同挖角嫌疑", c: "var(--red)" },
                { l: "川中·王氏 → 渝北 / 黔东", n: "窜货流向新增 2 节点 · 价盘波动 8%", c: "var(--cyan)" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, padding: 12, background: "var(--bg-2)", borderLeft: `3px solid ${a.c}` }}>
                  <div className="t1" style={{ fontSize: 17, fontWeight: 600 }}>{a.l}</div>
                  <div className="mono" style={{ color: a.c, fontSize: 14 }}>{a.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {hover && (
        <div className="tt" style={{ left: Math.min(hover.x + 12, window.innerWidth - 240), top: hover.y - 60 }}>
          <div className="tt-title">{hover.n.label}</div>
          {hover.n.revenue && <div className="tt-row"><span>年回款</span><b className="amber">{hover.n.revenue}</b></div>}
          {hover.n.note && <div className="tt-row"><span>关系信号</span><b>{hover.n.note}</b></div>}
          <div className="tt-row"><span>类型</span><b>{hover.n.type}</b></div>
        </div>
      )}

      <SceneFooter
        left="过去 — 关系网在老业务员脑子里 / 现在 — 在总部一块屏幕上"
        right="MAP 02 · 24 NODES · 19 RELATIONS"
      />
    </div>
  );
}

window.SceneNetwork = SceneNetwork;
