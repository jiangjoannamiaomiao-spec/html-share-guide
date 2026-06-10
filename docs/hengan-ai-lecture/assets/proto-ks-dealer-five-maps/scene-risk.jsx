// =====================================================
// Scene 03 — 风险预警地图
// =====================================================
function SceneRisk() {
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(D.TOP_RISK[0]);

  const heat = useMemo(() => {
    // grid by province (rows = provinces)
    const out = D.PROVINCES.map(p => {
      const dealers = D.RISK_DEALERS.filter(d => d.province === p.name);
      // 36 weekly cells; level=red if any red dealer in week
      const cells = [];
      let redIdx = -1;
      if (dealers.some(d => d.level === "red")) {
        redIdx = 18 + Math.floor((p.name.charCodeAt(0) % 14));
      }
      let amberIdx = -1;
      if (dealers.some(d => d.level === "amber")) {
        amberIdx = 8 + Math.floor((p.name.charCodeAt(0) % 22));
      }
      for (let w = 0; w < 36; w++) {
        let l = "green";
        const seed = ((p.name.charCodeAt(0) * 91) + w * 7) % 100;
        if (seed < 6) l = "yellow";
        if (w === amberIdx) l = "amber";
        if (w === redIdx) l = "red";
        cells.push(l);
      }
      return { province: p.name, region: p.r, cells };
    });
    return out;
  }, []);

  const colorMap = {
    green:  "oklch(0.30 0.04 150)",
    yellow: "oklch(0.55 0.10 90)",
    amber:  "oklch(0.65 0.16 50)",
    red:    "oklch(0.62 0.22 25)",
  };

  // counts
  const counts = D.RISK_DEALERS.reduce((acc, d) => { acc[d.level] = (acc[d.level] || 0) + 1; return acc; }, {});

  return (
    <div className="scene fade-in" style={{ gridTemplateRows: "auto 1fr auto", gap: 20 }}>
      <SectionHead
        eyebrow="MAP 04 · CHANNEL HEALTH HEATMAP"
        title="风险预警地图"
        sub={<>提前 <b className="amber">3–6 个月</b> 看到 "变心信号"。<br/>这一张图, 直接对应 <b className="t1">几十亿渠道资产</b>。</>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 28, minHeight: 760, flex: 1 }}>
        {/* LEFT: heatmap */}
        <div className="col gap-16">
          {/* top stats */}
          <div className="row gap-16" style={{ gap: 16 }}>
            <RiskStat color="var(--red)" v={counts.red || 0} l="高风险 · 立即介入" pulse/>
            <RiskStat color="var(--amber)" v={counts.amber || 0} l="次高 · 主动联系"/>
            <RiskStat color="oklch(0.65 0.12 90)" v={counts.yellow || 0} l="观察 · 持续监测"/>
            <RiskStat color="var(--green)" v={counts.green || 0} l="稳定"/>
          </div>

          {/* heatmap */}
          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="card-title">
              31 省 · 36 周关系健康度热力图
              <span className="badge">最近 9 个月 · 周度</span>
            </div>

            <div style={{ marginRight: -8, paddingRight: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 6 }}>
                {heat.map((row, ri) => (
                  <React.Fragment key={row.province}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "var(--t-2)", paddingRight: 8 }}>
                      <span>{row.province}</span>
                      <span className="mono t4" style={{ fontSize: 10 }}>{row.region}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(36, 1fr)", gap: 3 }}>
                      {row.cells.map((c, ci) => (
                        <div key={ci}
                          onMouseEnter={(e) => setHover({ x: e.clientX, y: e.clientY, prov: row.province, week: ci + 1, level: c })}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => c === "red" ? setSelected(D.TOP_RISK[ri % D.TOP_RISK.length]) : null}
                          style={{
                            aspectRatio: "1",
                            background: colorMap[c],
                            cursor: c === "red" ? "pointer" : "default",
                            border: c === "red" ? "1px solid var(--red)" : "none",
                            position: "relative",
                          }}>
                          {c === "red" && (
                            <div className="pulse-red" style={{ position: "absolute", inset: 0, borderRadius: "50%" }}/>
                          )}
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-1)", paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between", color: "var(--t-3)", fontSize: 12 }}>
              <div className="row gap-16" style={{ gap: 16 }}>
                <span className="chip"><i style={{ background: colorMap.green }}></i>稳定</span>
                <span className="chip"><i style={{ background: colorMap.yellow }}></i>观察</span>
                <span className="chip"><i style={{ background: colorMap.amber }}></i>次高</span>
                <span className="chip"><i style={{ background: colorMap.red }}></i>高风险</span>
              </div>
              <span className="mono" style={{ letterSpacing: "0.1em" }}>9 月前 ◀━━━━━━━━━━━━━━━━━━━━━━━ 本周</span>
            </div>
          </div>
        </div>

        {/* RIGHT: top-5 list + dossier */}
        <div className="col gap-16">
          <div className="card">
            <div className="card-title">本周高风险 · TOP 5<span className="badge">CONFIDENCE ≥ 0.70</span></div>
            <div className="col gap-12">
              {D.TOP_RISK.map((r, i) => (
                <button key={r.name}
                  onClick={() => setSelected(r)}
                  style={{
                    background: selected.name === r.name ? "var(--bg-2)" : "transparent",
                    border: "1px solid " + (selected.name === r.name ? "var(--red)" : "var(--border-1)"),
                    padding: "10px 12px",
                    cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    textAlign: "left",
                  }}>
                  <div>
                    <div style={{ color: "var(--t-1)", fontSize: 15, fontWeight: 600 }}>{r.name}</div>
                    <div className="mono t3" style={{ fontSize: 11 }}>{r.region} · {r.revenue} · {r.since}前出现首个信号</div>
                  </div>
                  <div className="mono" style={{ color: "var(--red)", fontSize: 18, fontWeight: 600 }}>
                    {(r.confidence * 100).toFixed(0)}<span style={{ fontSize: 10 }}>%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ borderTop: "3px solid var(--red)" }}>
            <div className="t3 mono" style={{ fontSize: 11, letterSpacing: "0.16em" }}>DOSSIER · 变心信号</div>
            <div className="serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>{selected.name}</div>
            <div className="t3 mono" style={{ fontSize: 11, marginTop: 2 }}>{selected.region} · 年回款 {selected.revenue} · 责任人 {selected.lead}</div>

            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {selected.signals.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 10px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
                  <span className="mono" style={{ color: "var(--red)", fontSize: 12, marginTop: 2 }}>◆ S0{i+1}</span>
                  <span style={{ fontSize: 14, color: "var(--t-1)", lineHeight: 1.4 }}>{s}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" style={{ marginTop: 16, width: "100%" }}>
              启动救援工单 → 大区+品牌总裁组合拜访
            </button>
          </div>
        </div>
      </div>

      {hover && hover.level === "red" && (
        <div className="tt" style={{ left: Math.min(hover.x + 12, window.innerWidth - 220), top: hover.y - 60 }}>
          <div className="tt-title">{hover.prov} · 第 {hover.week} 周</div>
          <div className="tt-row"><span>关系健康</span><b className="red">高风险</b></div>
          <div className="tt-row"><span>点击查看</span><b>变心信号档案</b></div>
        </div>
      )}

      <SceneFooter
        left="过去 — 回款掉了才发现 / 现在 — 提前 3-6 个月看到"
        right="MAP 04 · NEW SIGNALS 14 / 24 HRS"
      />
    </div>
  );
}

function RiskStat({ color, v, l, pulse }) {
  return (
    <div className="card" style={{ flex: 1, padding: 22, position: "relative" }}>
      {pulse && <div style={{ position: "absolute", top: 16, right: 16, width: 10, height: 10, borderRadius: "50%", background: color }} className="pulse-red"/>}
      <div className="mono" style={{ color, fontSize: 54, fontWeight: 600, lineHeight: 1 }}>{v}</div>
      <div className="t3" style={{ fontSize: 17, marginTop: 8 }}>{l}</div>
    </div>
  );
}

window.SceneRisk = SceneRisk;
