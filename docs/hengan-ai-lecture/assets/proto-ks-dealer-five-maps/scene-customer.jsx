// =====================================================
// Scene 01 — 客户类型地图
// =====================================================
function SceneCustomer() {
  const [active, setActive] = useState("loyal");
  const types = D.CUSTOMER_TYPES;
  const total = types.reduce((s, t) => s + t.count, 0);

  // Bubble field: each dealer is a bubble, clustered by type
  const bubbles = useMemo(() => {
    const arr = [];
    const clusters = {
      loyal:   { cx: 200, cy: 280 },
      profit:  { cx: 540, cy: 250 },
      fence:   { cx: 880, cy: 290 },
      unknown: { cx: 1150, cy: 310 },
    };
    types.forEach(t => {
      const c = clusters[t.key];
      const n = Math.round(t.count / 8);
      for (let i = 0; i < n; i++) {
        const r = 20 + Math.sqrt(i) * 16;
        const a = (i * 137.5) * Math.PI / 180;
        arr.push({
          x: c.cx + Math.cos(a) * r,
          y: c.cy + Math.sin(a) * r,
          r: 2.5 + Math.random() * 3,
          color: t.color,
          key: t.key,
        });
      }
    });
    return arr;
  }, []);

  const a = types.find(t => t.key === active);

  return (
    <div className="scene fade-in" style={{ gridTemplateRows: "auto 1fr auto", gap: 24 }}>
      <SectionHead
        eyebrow="MAP 01 · CUSTOMER LOYALTY MAP"
        title="客户类型地图"
        sub={<>全集团 <b className="amber mono">{total.toLocaleString()}</b> 家经销商按"忠诚度类型"切分 — <b className="t1">营销资源该往哪里投, 一目了然</b></>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 28, minHeight: 760, flex: 1 }}>
        {/* Bubble map */}
        <div className="card subtle-grid" style={{ padding: 0, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 20, left: 24, right: 24, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
            <div className="card-title" style={{ margin: 0 }}>
              全国分布 · 按类型聚类
              <span className="badge">每点 ≈ 8 家</span>
            </div>
            <div className="row gap-16" style={{ gap: 16 }}>
              {types.map(t => (
                <span className="chip" key={t.key}>
                  <i style={{ background: t.color }}></i>{t.name}
                </span>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 1300 660" style={{ width: "100%", height: "100%" }}>
            {/* cluster halos */}
            {types.map(t => {
              const c = { loyal: { cx: 200, cy: 320 }, profit: { cx: 540, cy: 290 }, fence: { cx: 880, cy: 330 }, unknown: { cx: 1150, cy: 350 } }[t.key];
              const isOn = active === t.key;
              const r = Math.sqrt(t.count) * 7;
              return (
                <g key={t.key} style={{ color: t.color, cursor: "pointer" }} onClick={() => setActive(t.key)}>
                  <circle cx={c.cx} cy={c.cy} r={r * 1.3} fill={t.color} opacity={isOn ? 0.08 : 0.03}/>
                  <circle cx={c.cx} cy={c.cy} r={r} fill="none" stroke={t.color} strokeOpacity={isOn ? 0.7 : 0.25} strokeWidth="1.5"/>
                  <text x={c.cx} y={c.cy - r - 18} textAnchor="middle" style={{ fill: t.color, fontFamily: "var(--f-mono)", fontSize: 16, letterSpacing: "0.12em" }}>
                    {t.name.toUpperCase()}
                  </text>
                  <text x={c.cx} y={c.cy + 8} textAnchor="middle" style={{ fill: "var(--t-1)", fontSize: 48, fontFamily: "var(--f-mono)", fontWeight: 600 }}>
                    {t.count}
                  </text>
                  <text x={c.cx} y={c.cy + 34} textAnchor="middle" style={{ fill: "var(--t-3)", fontSize: 15, fontFamily: "var(--f-mono)" }}>
                    {Math.round(t.count / total * 100)}% · 贡献 {t.rev}% 回款
                  </text>
                </g>
              );
            })}
            {bubbles.map((b, i) => (
              <circle key={i} cx={b.x} cy={b.y + 30} r={b.r} fill={b.color}
                opacity={active === b.key ? 0.9 : 0.25}
                style={{ transition: "opacity .3s" }}/>
            ))}
          </svg>

          {/* X-axis: loyalty spectrum */}
          <div style={{ position: "absolute", bottom: 20, left: 24, right: 24, display: "flex", justifyContent: "space-between", color: "var(--t-3)", fontFamily: "var(--f-mono)", fontSize: 14, letterSpacing: "0.14em" }}>
            <span>← 情感 · 忠诚维度</span>
            <span>政策敏感 ·  算账</span>
            <span>变心倾向 · 骑墙</span>
            <span>样本不足 →</span>
          </div>
        </div>

        {/* Right: focus panel */}
        <div className="col gap-16">
          {/* type stat */}
          <div className="card" style={{ borderTop: `3px solid ${a.color}` }}>
            <div className="t3 mono" style={{ fontSize: 14, letterSpacing: "0.16em" }}>FOCUS · {a.key.toUpperCase()}</div>
            <div className="serif" style={{ fontSize: 42, fontWeight: 600, marginTop: 8 }}>{a.name}</div>
            <div className="t2" style={{ fontSize: 18, marginTop: 6 }}>{a.note}</div>
            <div style={{ display: "flex", gap: 24, marginTop: 18 }}>
              <div className="metric">
                <div className="metric-val">{a.count}</div>
                <div className="metric-label">经销商家数</div>
              </div>
              <div className="metric">
                <div className="metric-val" style={{ color: a.color }}>{a.rev}<span style={{ fontSize: 22, color: "var(--t-3)" }}>%</span></div>
                <div className="metric-label">回款贡献</div>
              </div>
            </div>
          </div>

          {/* recommendation */}
          <div className="card">
            <div className="card-title">总部资源建议<span className="badge">AUTO</span></div>
            <div className="t1" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.4 }}>
              {a.recommendation}
            </div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {customerTactics(a.key).map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 14, fontSize: 17, color: "var(--t-2)", lineHeight: 1.45 }}>
                  <span className="mono" style={{ color: a.color }}>▸</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* policy elasticity sparkbar */}
          <div className="card">
            <div className="card-title">竞品政策敏感度<span className="badge">90D</span></div>
            <ElasticityBars active={active}/>
          </div>
        </div>
      </div>

      <SceneFooter
        left="切换聚类: 死忠 / 利润 / 骑墙 / 未画像"
        right="MAP 01 · LAST PARTICLE INGEST 14 SEC AGO"
      />
    </div>
  );
}

function customerTactics(key) {
  switch (key) {
    case "loyal":
      return [
        "情感投入 · 高层走访 · 老业务员长期绑定",
        "新品首发优先权 · 不靠政策刺激",
        "保护:警惕被竞品高溢价挖角",
      ];
    case "profit":
      return [
        "定向政策 · 把账算到小数点后两位",
        "ROI 模型对标其历史最高利润月",
        "避免情感话术 · 直接给数据",
      ];
    case "fence":
      return [
        "立即分流: 救援队 OR 战略放弃",
        "救援:48 小时内大区总+品牌总裁组合拜访",
        "放弃:腾出资源给上升期经销商",
      ];
    default:
      return [
        "加密拜访 · 6 个月内补全画像",
        "样本不足 · 总部不做资源决策",
      ];
  }
}

function ElasticityBars({ active }) {
  const data = {
    loyal:   [12, 14, 11, 13, 12, 10, 9,  11, 12, 13, 11, 10],
    profit:  [22, 41, 58, 49, 33, 62, 71, 55, 48, 67, 73, 80],
    fence:   [38, 52, 47, 61, 78, 88, 92, 84, 79, 86, 91, 95],
    unknown: [8,  10, 12, 11, 9,  10, 11, 12, 13, 10, 11, 12],
  }[active];
  const color = D.CUSTOMER_TYPES.find(t => t.key === active).color;
  const max = 100;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 110 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: color, opacity: 0.3 + (v/max)*0.7 }}/>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--t-4)", fontFamily: "var(--f-mono)", fontSize: 14, marginTop: 10 }}>
        <span>JAN</span><span>JUN</span><span>DEC</span>
      </div>
      <div className="t3 mono" style={{ fontSize: 14, marginTop: 6 }}>
        竞品促销发布后 14 天内进货下滑 %
      </div>
    </div>
  );
}

// shared section header
function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="section-head">
      <div>
        <div className="section-eyebrow">{eyebrow}</div>
        <div className="section-title">{title}</div>
      </div>
      <div className="section-sub">{sub}</div>
    </div>
  );
}

window.SceneCustomer = SceneCustomer;
window.SectionHead = SectionHead;
