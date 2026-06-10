// =====================================================
// Scene 04 — 能力评估地图
// =====================================================
function SceneCapability() {
  const [hover, setHover] = useState(null);

  // axes: claimed (x) vs actual (y); 0–1
  const W = 980, H = 600, PAD = 60;
  const x = v => PAD + v * (W - PAD * 2);
  const y = v => H - PAD - v * (H - PAD * 2);

  const quadrantOf = (c, a) => {
    if (a >= 0.55 && c >= 0.55) return "strong";   // 真实强
    if (a < 0.55 && c >= 0.55) return "inflated";  // 虚高
    if (a >= 0.55 && c < 0.55) return "hidden";    // 隐藏型
    return "weak";                                  // 弱
  };

  const quads = {
    strong:   { name: "真实强", color: "var(--green)", count: 0, action: "承接新品首发 · 区域代理" },
    inflated: { name: "虚高型", color: "var(--red)",   count: 0, action: "限制压货 · 重新核定经销区域" },
    hidden:   { name: "隐藏型", color: "var(--cyan)",  count: 0, action: "重新签订更高分销目标 · 给舞台" },
    weak:     { name: "基础型", color: "var(--t-3)",   count: 0, action: "仅承担基础 SKU · 不压货" },
  };
  D.CAPABILITY.forEach(d => { quads[quadrantOf(d.claimed, d.actual)].count++; });

  return (
    <div className="scene fade-in" style={{ gridTemplateRows: "auto 1fr auto", gap: 24 }}>
      <SectionHead
        eyebrow="MAP 05 · TRUE CAPABILITY MAP"
        title="能力评估地图"
        sub={<>真实分销能力 vs 自称能力 — 差距有多大?<br/>过去靠 <b className="t1">年回款一个指标拍脑袋</b>, 现在按 <b className="amber">真实能力</b> 精细化。</>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 28, minHeight: 760, flex: 1 }}>
        {/* Scatter */}
        <div className="card" style={{ padding: 0, position: "relative", overflow: "hidden" }}>
          <div className="card-title" style={{ padding: "20px 24px 0" }}>
            散点图 · 自称 vs 真实
            <span className="badge">N = {D.CAPABILITY.length}</span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%" }}>
            {/* quadrant shading */}
            <rect x={x(0)} y={y(1)}   width={x(0.55) - x(0)}   height={y(0.55) - y(1)}   fill="var(--t-4)" opacity="0.05"/>
            <rect x={x(0.55)} y={y(1)} width={x(1) - x(0.55)}   height={y(0.55) - y(1)}   fill="var(--green)" opacity="0.07"/>
            <rect x={x(0)} y={y(0.55)} width={x(0.55) - x(0)}   height={y(0) - y(0.55)}   fill="var(--cyan)" opacity="0.05"/>
            <rect x={x(0.55)} y={y(0.55)} width={x(1) - x(0.55)} height={y(0) - y(0.55)}   fill="var(--red)" opacity="0.08"/>

            {/* y=x reference (言行一致) */}
            <line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} stroke="var(--t-4)" strokeDasharray="3 4"/>
            <text x={x(0.5) + 6} y={y(0.5) - 10} style={{ fill: "var(--t-3)", fontSize: 14, fontFamily: "var(--f-mono)" }}>y = x · 言行一致</text>

            {/* axes */}
            <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border-2)"/>
            <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="var(--border-2)"/>

            {/* axis labels */}
            <text x={W / 2} y={H - 22} textAnchor="middle" style={{ fill: "var(--t-2)", fontSize: 17, fontWeight: 500 }}>自称分销能力 →</text>
            <text x={20} y={H / 2} textAnchor="middle" transform={`rotate(-90 20 ${H / 2})`} style={{ fill: "var(--t-2)", fontSize: 17, fontWeight: 500 }}>真实分销能力 →</text>

            {/* quadrant labels */}
            <text x={x(0.85)} y={y(0.92)} textAnchor="middle" style={{ fill: "var(--green)", fontSize: 22, fontFamily: "var(--f-serif)", fontWeight: 600 }}>真实强</text>
            <text x={x(0.85)} y={y(0.92) + 24} textAnchor="middle" style={{ fill: "var(--green)", fontSize: 14, fontFamily: "var(--f-mono)" }}>承接新品首发</text>

            <text x={x(0.85)} y={y(0.20)} textAnchor="middle" style={{ fill: "var(--red)", fontSize: 22, fontFamily: "var(--f-serif)", fontWeight: 600 }}>虚高 · 风险</text>
            <text x={x(0.85)} y={y(0.20) + 24} textAnchor="middle" style={{ fill: "var(--red)", fontSize: 14, fontFamily: "var(--f-mono)" }}>限制压货</text>

            <text x={x(0.20)} y={y(0.92)} textAnchor="middle" style={{ fill: "var(--cyan)", fontSize: 22, fontFamily: "var(--f-serif)", fontWeight: 600 }}>隐藏 · 低调强</text>
            <text x={x(0.20)} y={y(0.92) + 24} textAnchor="middle" style={{ fill: "var(--cyan)", fontSize: 14, fontFamily: "var(--f-mono)" }}>给舞台</text>

            <text x={x(0.20)} y={y(0.20)} textAnchor="middle" style={{ fill: "var(--t-3)", fontSize: 22, fontFamily: "var(--f-serif)", fontWeight: 600 }}>基础型</text>
            <text x={x(0.20)} y={y(0.20) + 24} textAnchor="middle" style={{ fill: "var(--t-4)", fontSize: 14, fontFamily: "var(--f-mono)" }}>仅基础 SKU</text>

            {/* scatter */}
            {D.CAPABILITY.map((d, i) => {
              const q = quadrantOf(d.claimed, d.actual);
              return (
                <circle key={i}
                  cx={x(d.claimed)} cy={y(d.actual)} r={2 + d.rev * 2}
                  fill={quads[q].color} fillOpacity="0.55"
                  stroke={quads[q].color}
                  onMouseEnter={(e) => setHover({ x: e.clientX, y: e.clientY, d, q })}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer", transition: "r .2s, opacity .2s" }}
                  onMouseOver={e => e.currentTarget.setAttribute("r", 4 + d.rev * 2.5)}
                  onMouseOut={e => e.currentTarget.setAttribute("r", 2 + d.rev * 2)}
                />
              );
            })}

            {/* labeled outliers */}
            {D.CAP_LABELS.map((l, i) => {
              const q = quadrantOf(l.claimed, l.actual);
              return (
                <g key={i}>
                  <circle cx={x(l.claimed)} cy={y(l.actual)} r="10" fill="none" stroke={quads[q].color} strokeWidth="1.5"/>
                  <circle cx={x(l.claimed)} cy={y(l.actual)} r="3" fill={quads[q].color}/>
                  <text x={x(l.claimed) + 16} y={y(l.actual) - 10} style={{ fill: "var(--t-1)", fontSize: 14, fontFamily: "var(--f-sans)" }}>
                    {l.name}
                  </text>
                </g>
              );
            })}

            {/* tick marks: 0.5 midline */}
            <line x1={x(0.55)} y1={y(0)} x2={x(0.55)} y2={y(1)} stroke="var(--border-1)" strokeDasharray="2 4"/>
            <line x1={x(0)} y1={y(0.55)} x2={x(1)} y2={y(0.55)} stroke="var(--border-1)" strokeDasharray="2 4"/>
          </svg>

          <div style={{ position: "absolute", bottom: 14, left: 24, right: 24, display: "flex", justifyContent: "space-between", color: "var(--t-4)", fontFamily: "var(--f-mono)", fontSize: 13 }}>
            <span>※ 圆点大小 = 年回款</span>
            <span>※ 真实能力来自 9 个维度: 仓储 / 配送时效 / 终端覆盖 / 动销 / 周转 / 等</span>
          </div>
        </div>

        {/* Right: quadrant summary */}
        <div className="col gap-16">
          {Object.entries(quads).map(([k, q]) => (
            <div key={k} className="card" style={{ borderLeft: `3px solid ${q.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="mono t3" style={{ fontSize: 14, letterSpacing: "0.14em" }}>{k.toUpperCase()}</div>
                  <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: q.color, marginTop: 6 }}>{q.name}</div>
                </div>
                <div className="mono" style={{ fontSize: 42, fontWeight: 600 }}>
                  {q.count}<span style={{ fontSize: 17, color: "var(--t-3)" }}> / {D.CAPABILITY.length}</span>
                </div>
              </div>
              <div className="t2" style={{ fontSize: 17, marginTop: 12, lineHeight: 1.5 }}>
                <span className="mono amber" style={{ marginRight: 8 }}>▸</span>
                {q.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {hover && (
        <div className="tt" style={{ left: Math.min(hover.x + 12, window.innerWidth - 240), top: hover.y - 80 }}>
          <div className="tt-title">{quads[hover.q].name}</div>
          <div className="tt-row"><span>自称能力</span><b>{(hover.d.claimed * 100).toFixed(0)}</b></div>
          <div className="tt-row"><span>真实能力</span><b>{(hover.d.actual * 100).toFixed(0)}</b></div>
          <div className="tt-row"><span>年回款</span><b className="mono">{hover.d.rev.toFixed(1)} 亿</b></div>
          <div className="tt-row"><span>建议</span><b style={{ color: quads[hover.q].color }}>{quads[hover.q].action}</b></div>
        </div>
      )}

      <SceneFooter
        left="过去 — 一个指标 (回款) 拍脑袋 / 现在 — 9 维评估 · 自动归类"
        right="MAP 05 · 9 CAPABILITY DIMENSIONS"
      />
    </div>
  );
}

window.SceneCapability = SceneCapability;
