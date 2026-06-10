// =====================================================
// Scene 02 — 决策人地图
// =====================================================
function SceneDecision() {
  const [active, setActive] = useState("wife");
  const dms = D.DECISION_MAKERS;
  const total = dms.reduce((s, d) => s + d.count, 0);

  return (
    <div className="scene fade-in" style={{ gridTemplateRows: "auto 1fr auto", gap: 24 }}>
      <SectionHead
        eyebrow="MAP 03 · TRUE DECISION-MAKER MAP"
        title="决策人地图"
        sub={<>多少家经销商的真正决策人, <b className="t1">不是合同上的老板?</b> — 第一次有了答案。</>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 28, minHeight: 760, flex: 1 }}>
        {/* LEFT: stacked bar + grid of dealers */}
        <div className="col gap-16">
          {/* Big stacked bar */}
          <div className="card">
            <div className="card-title">
              全集团 · 真实决策人构成
              <span className="badge">N = {total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", height: 108, border: "1px solid var(--border-1)" }}>
              {dms.map((d, i) => (
                <button key={d.key}
                  onClick={() => setActive(d.key)}
                  style={{
                    flex: d.count,
                    background: active === d.key ? d.color : "transparent",
                    color: active === d.key ? "var(--bg-0)" : "var(--t-1)",
                    border: "none",
                    borderRight: i < dms.length - 1 ? "1px solid var(--border-1)" : "none",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    transition: "background .2s, color .2s",
                    position: "relative",
                  }}>
                  <div className="mono" style={{ fontSize: 32, fontWeight: 600 }}>
                    {Math.round(d.count / total * 100)}%
                  </div>
                  <div style={{ fontSize: 17, marginTop: 4 }}>{d.name}</div>
                  <div className="mono" style={{ fontSize: 13, letterSpacing: "0.12em", color: active === d.key ? "var(--bg-0)" : "var(--t-4)", marginTop: 4 }}>
                    {d.count.toLocaleString()} 家
                  </div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 14, color: "var(--t-3)", fontSize: 16, lineHeight: 1.6 }}>
              ※ 由业务员拜访信号自动萃取 · 经 <b className="amber">3 次以上</b>多源验证 · 置信度 <b className="amber mono">≥ 0.72</b>
            </div>
          </div>

          {/* Dealer grid – 200 cells colored by decision maker */}
          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="card-title">
              抽样 200 家经销商 · 决策人指纹
              <span className="badge">CLICK CELLS</span>
            </div>
            <DealerGrid active={active} setActive={setActive}/>
          </div>
        </div>

        {/* RIGHT: persona detail */}
        <PersonaCard d={dms.find(d => d.key === active)} />
      </div>

      <SceneFooter
        left="总部第一次能区分: 跟谁谈, 谈什么, 用什么话术"
        right="MAP 03 · IDENTITY CONFIDENCE 0.72+"
      />
    </div>
  );
}

function DealerGrid({ active, setActive }) {
  const cells = useMemo(() => {
    const dms = D.DECISION_MAKERS;
    const cells = [];
    dms.forEach(d => {
      const n = Math.round(200 * d.count / D.DECISION_MAKERS.reduce((s, x) => s + x.count, 0));
      for (let i = 0; i < n; i++) cells.push(d);
    });
    // shuffle
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(((i * 1664525 + 1013904223) % 0xffffffff) / 0xffffffff * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    return cells.slice(0, 200);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 4, flex: 1, alignContent: "start" }}>
      {cells.map((c, i) => (
        <div key={i}
          onClick={() => setActive(c.key)}
          style={{
            aspectRatio: "1",
            background: c.color,
            opacity: active === c.key ? 1 : 0.18,
            cursor: "pointer",
            transition: "opacity .2s",
            border: active === c.key ? "1px solid var(--t-1)" : "1px solid transparent",
          }}
          title={c.name}/>
      ))}
    </div>
  );
}

function PersonaCard({ d }) {
  if (!d) return null;
  return (
    <div className="col gap-16">
      <div className="card" style={{ borderTop: `3px solid ${d.color}` }}>
        <div className="t3 mono" style={{ fontSize: 14, letterSpacing: "0.16em" }}>FOCUS · DECISION MAKER</div>
        <div className="serif" style={{ fontSize: 54, fontWeight: 600, marginTop: 8, color: d.color }}>{d.name}</div>
        <div className="t2" style={{ fontSize: 19, marginTop: 6 }}>{d.persona}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 24, borderTop: "1px solid var(--border-1)", paddingTop: 20 }}>
          <div>
            <div className="metric-val" style={{ fontSize: 42 }}>{d.count.toLocaleString()}</div>
            <div className="metric-label">家数</div>
          </div>
          <div>
            <div className="metric-val" style={{ fontSize: 42, color: d.color }}>{d.weight}<span style={{ fontSize: 22 }}>%</span></div>
            <div className="metric-label">回款影响</div>
          </div>
          <div>
            <div className="metric-val" style={{ fontSize: 42 }}>0.{Math.round(72 + Math.random() * 20)}</div>
            <div className="metric-label">画像置信度</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">建议策略 · 总部</div>
        <div className="t1" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.4 }}>{d.tactic}</div>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {tactics(d.key).map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 14, fontSize: 17, color: "var(--t-2)", lineHeight: 1.45 }}>
              <span className="mono" style={{ color: d.color }}>▸</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">新维度 · 总部能做的事</div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 17, color: "var(--t-2)", lineHeight: 1.5 }}>
          {strategicLevers(d.key).map((s, i) => (
            <li key={i}>
              <span className="mono amber" style={{ marginRight: 8 }}>0{i+1}.</span>{s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function tactics(key) {
  switch (key) {
    case "boss": return [
      "标准 BD 话术包 · 政策为主轴",
      "数据透明 · 不绕弯子",
      "经营案例对标(同区域同体量)",
    ];
    case "wife": return [
      "专属内容包 · 家庭场景 · 子女教育",
      "邀请进 \"老板娘联盟\" 私域社群",
      "话术避免 \"硬指标\" · 强调 \"家\"",
    ];
    case "second": return [
      "二代俱乐部 · 名校私董 · 数字化共创",
      "RFM + 大数据培训 · 双向赋能",
      "新品 / 新渠道首发权 · 给舞台",
    ];
    case "pro": return [
      "KPI 导向 · 月度对账可视化",
      "联动 SKU 利润矩阵 · 透明返利",
      "经销商内部数据共享(经过授权)",
    ];
    default: return [
      "持续观察 · 不动用资源",
      "派遣高级 BD 重新画像 · 90 天内出结论",
    ];
  }
}

function strategicLevers(key) {
  switch (key) {
    case "boss": return [
      "新品全国上市 · 优先在此群体内启动",
      "经营案例对标:释放老板的对标欲",
      "政策颗粒度可粗一些 · 重点是节奏",
    ];
    case "wife": return [
      "市场部专门设计 \"打动老板娘\" 内容矩阵",
      "面销培训补充家庭沟通话术",
      "节日礼盒走 \"家人路线\" 而非 \"客户路线\"",
    ];
    case "second": return [
      "总部成立 \"二代经销商联盟\" 私董组织",
      "联合海外参访 · 加深品牌认同",
      "提供 SaaS 工具 · 把品牌嵌进他们的系统",
    ];
    case "pro": return [
      "数据接口对齐 · 双向开放",
      "考核口径与品牌指标绑定 · 利益对齐",
      "可作为 \"模板经销商\" 输出最佳实践",
    ];
    default: return [
      "暂不归类 · 90 天观察期",
      "样本完整后再纳入资源分配模型",
    ];
  }
}

window.SceneDecision = SceneDecision;
