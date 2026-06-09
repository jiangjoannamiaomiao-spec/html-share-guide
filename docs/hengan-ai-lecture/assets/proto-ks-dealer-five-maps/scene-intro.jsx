// =====================================================
// Scene 00 — Intro: 信号粒子 凝结机制
// =====================================================
const D = window.AppData;

function SceneIntro({ go }) {
  return (
    <div className="scene fade-in">
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56, alignItems: "stretch" }}>
        {/* LEFT: narrative + metrics */}
        <div className="col" style={{ gap: 36, paddingTop: 8 }}>
        <div>
          <div className="section-eyebrow">FROM ONE VISIT · TO A LIVING NETWORK</div>
          <div className="serif t1" style={{ fontSize: 64, lineHeight: 1.15, fontWeight: 600, letterSpacing: "0.01em" }}>
            从一次拜访,<br/>到一张<span style={{ color: "var(--amber)" }}>集团生意地图</span>
          </div>
          <div className="t2" style={{ fontSize: 26, lineHeight: 1.7, marginTop: 28, maxWidth: 720 }}>
            王哥的一次拜访,贡献 <b className="amber mono">5</b> 颗信号粒子。<br/>
            全集团 <b className="amber mono">{D.ACTIVE_FIELD_REPS.toLocaleString()}</b> 名业务员、年 <b className="amber mono">{D.ANNUAL_VISITS.toLocaleString()}</b> 次拜访,<br/>
            凝结成 <b className="amber mono">{(D.TOTAL_PARTICLES / 1e4).toFixed(1)}</b> 万颗粒子 → <b className="amber">5 张总部从未拥有过的地图</b>。
          </div>
        </div>

        <div className="row gap-16" style={{ gap: 16 }}>
          {[
            { v: "5", l: "一次拜访 · 信号粒子", s: "客户类型 / 决策人 / 真实能力 / 风险 / 策略" },
            { v: D.ACTIVE_FIELD_REPS.toLocaleString(), l: "活跃业务员 · 信号源", s: "覆盖全国 31 省 · 7 大区" },
            { v: (D.TOTAL_PARTICLES / 1e4).toFixed(1) + "万", l: "年凝结粒子 · 增长中", s: "+8.4% MoM · 自动验证校准" },
          ].map((m, i) => (
            <div key={i} className="card" style={{ flex: 1 }}>
              <div className="metric">
                <div className="metric-val" style={{ color: "var(--amber)" }}>{m.v}</div>
                <div className="metric-label t2" style={{ fontSize: 18 }}>{m.l}</div>
                <div className="t4 mono" style={{ fontSize: 14, letterSpacing: "0.08em", marginTop: 6 }}>{m.s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 layer upgrade */}
        <div className="card">
          <div className="card-title">四层跃迁 · 信号粒子如何凝结成地图<span className="badge">MECHANISM</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginTop: 8 }}>
            {[
              { n: "01", t: "单次拜访", s: "→ 结构化信号", c: "var(--cyan)" },
              { n: "02", t: "多次拜访", s: "→ 画像收敛", c: "var(--purple)" },
              { n: "03", t: "+ 业务结果", s: "→ 验证校准", c: "var(--pink)" },
              { n: "04", t: "几千家画像", s: "→ 集团地图", c: "var(--amber)" },
            ].map((x, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${x.c}`, paddingLeft: 14 }}>
                <div className="mono t4" style={{ fontSize: 14, letterSpacing: "0.12em" }}>{x.n}</div>
                <div className="t1" style={{ fontSize: 20, fontWeight: 600, marginTop: 6 }}>{x.t}</div>
                <div className="t3" style={{ fontSize: 16, marginTop: 2 }}>{x.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="row gap-16" style={{ gap: 16, marginTop: 8 }}>
          <button className="btn btn-primary" onClick={() => go("customer")}>
            进入 5 张地图  →
          </button>
          <button className="btn" onClick={() => go("risk")}>跳至风险预警 · 当前 5 例</button>
        </div>
      </div>

      {/* RIGHT: animation */}
      <ParticleAggregation />
      </div>

      <SceneFooter
        left="一次拜访 · 5 颗粒子 / 一年 · 48 万颗 / 凝结成 5 张活地图"
        right="DECK 00 / 07 · GROUP COMMERCE OS"
      />
    </div>
  );
}

function ParticleAggregation() {
  // Concept:
  //   bottom: one BD visit (王哥 → 陈总)
  //   center: 5 particles fly up
  //   top: aggregates with the noise from thousands of others → 5 map nodes
  const targets = [
    { x: 110, y: 90,  label: "客户类型", c: "var(--green)" },
    { x: 280, y: 60,  label: "决策人",   c: "var(--pink)" },
    { x: 460, y: 60,  label: "风险预警", c: "var(--red)" },
    { x: 640, y: 90,  label: "能力评估", c: "var(--cyan)" },
    { x: 800, y: 140, label: "关系网络", c: "var(--purple)" },
  ];

  const noise = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 220; i++) {
      arr.push({
        x: Math.random() * 900 + 10,
        y: Math.random() * 180 + 30,
        d: Math.random() * 6,
        op: 0.15 + Math.random() * 0.4,
      });
    }
    return arr;
  }, []);

  return (
    <div className="col" style={{ position: "relative" }}>
      <div className="card" style={{ flex: 1, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 760 }}>
        <div className="card-title" style={{ padding: "20px 24px 0", marginBottom: 0 }}>
          王哥 → 陈总 · 一次拜访的粒子流<span className="badge mono">LIVE · {new Date().toISOString().slice(11,19)}</span>
        </div>

        <svg viewBox="0 0 920 660" style={{ width: "100%", flex: 1 }}>
          <defs>
            <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"  stopColor="var(--amber)" stopOpacity="0"/>
              <stop offset="60%" stopColor="var(--amber)" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="var(--amber)" stopOpacity="0"/>
            </linearGradient>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* TOP — 5 map nodes */}
          {targets.map((t, i) => (
            <g key={i} style={{ color: t.c }}>
              <circle cx={t.x} cy={t.y} r="42" fill="url(#halo)" />
              <circle cx={t.x} cy={t.y} r="14" fill="none" stroke={t.c} strokeWidth="1.5"/>
              <circle cx={t.x} cy={t.y} r="5"  fill={t.c}/>
              <text x={t.x} y={t.y + 40} textAnchor="middle" className="node-label" style={{ fill: "var(--t-1)", fontSize: 17, fontWeight: 600, fontFamily: "var(--f-sans)" }}>
                {t.label}
              </text>
              <text x={t.x} y={t.y - 26} textAnchor="middle" className="node-label" style={{ fill: t.c, fontSize: 13 }}>
                MAP-0{i+1}
              </text>
            </g>
          ))}

          {/* aggregation noise – tiny dots */}
          {noise.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="1.2" fill="var(--amber-dim)" opacity={n.op}>
              <animate attributeName="opacity"
                values={`${n.op};${n.op * 0.2};${n.op}`}
                dur={`${3 + n.d}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {/* MIDDLE — band line */}
          <line x1="20" x2="900" y1="240" y2="240" stroke="var(--border-1)" strokeDasharray="3 6"/>
          <text x="20" y="230" className="node-label" style={{ fill: "var(--t-3)", fontSize: 15 }}>
            ▲ 总部 · 5 张活地图 (Group HQ)
          </text>
          <text x="20" y="452" className="node-label" style={{ fill: "var(--t-3)", fontSize: 15 }}>
            ▼ 一线 · 一次拜访 5 颗粒子 (Field)
          </text>
          <line x1="20" x2="900" y1="440" y2="440" stroke="var(--border-1)" strokeDasharray="3 6"/>

          {/* BOTTOM — visit */}
          <g transform="translate(80,486)">
            <rect width="780" height="144" rx="2" fill="var(--bg-2)" stroke="var(--border-1)"/>
            <text x="22" y="34" style={{ fill: "var(--t-3)", fontSize: 14, fontFamily: "var(--f-mono)", letterSpacing: "0.12em" }}>
              VISIT-#84217 · 2026-05-21 14:22 · 河南郑州
            </text>
            <text x="22" y="72" style={{ fill: "var(--t-1)", fontSize: 26, fontFamily: "var(--f-serif)", fontWeight: 600 }}>
              王哥 · 拜访 陈总(豫北 · 陈氏贸易)
            </text>
            <text x="22" y="104" style={{ fill: "var(--amber)", fontSize: 17, fontFamily: "var(--f-mono)" }}>
              语音备忘 12'04" → 结构化 → 5 颗粒子
            </text>
            <text x="22" y="128" style={{ fill: "var(--t-3)", fontSize: 15 }}>
              "首批压货过量, 老板娘说了算, 真实是仓储型, 需慢养, 利润型为主"
            </text>
          </g>

          {/* 5 particles flying from visit → 5 targets */}
          {targets.map((t, i) => {
            const startX = 200 + i * 140;
            const startY = 500;
            return (
              <g key={"p" + i} style={{ color: t.c }}>
                <line x1={startX} y1={startY} x2={t.x} y2={t.y} stroke={t.c} strokeOpacity="0.25" strokeDasharray="2 4"/>
                <circle r="5" fill={t.c}>
                  <animateMotion
                    dur={`${3 + i * 0.4}s`}
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    path={`M ${startX} ${startY} L ${t.x} ${t.y}`}
                  />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + i * 0.4}s`} repeatCount="indefinite"/>
                </circle>
                <circle r="10" fill={t.c} opacity="0.25">
                  <animateMotion
                    dur={`${3 + i * 0.4}s`}
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    path={`M ${startX} ${startY} L ${t.x} ${t.y}`}
                  />
                </circle>
                {/* label near bottom for which particle */}
                <text x={startX} y={startY - 10} textAnchor="middle" style={{ fill: t.c, fontSize: 14, fontFamily: "var(--f-mono)", letterSpacing: "0.08em" }}>
                  ◆ {t.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div style={{ borderTop: "1px solid var(--border-1)", padding: "16px 24px", display: "flex", justifyContent: "space-between", color: "var(--t-3)", fontFamily: "var(--f-mono)", fontSize: 15 }}>
          <span>过去 — 这 5 颗粒子留在王哥脑子里</span>
          <span className="amber">现在 — 它们汇入总部的 5 张地图</span>
        </div>
      </div>
    </div>
  );
}

window.SceneIntro = SceneIntro;
