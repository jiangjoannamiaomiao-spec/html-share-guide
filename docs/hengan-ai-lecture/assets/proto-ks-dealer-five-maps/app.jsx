// =====================================================
// App shell: top bar, tab switching, scene scaling
// =====================================================
const { useState, useEffect, useRef, useMemo } = React;

const TABS = [
  { id: "intro",      num: "00", title: "信号粒子" },
  { id: "customer",   num: "01", title: "客户类型" },
  { id: "network",    num: "02", title: "关系网络" },
  { id: "decision",   num: "03", title: "决策人" },
  { id: "risk",       num: "04", title: "风险预警" },
  { id: "capability", num: "05", title: "能力评估" },
  { id: "dossier",    num: "06", title: "经销商档案" },
];

function useStageScale(active) {
  useEffect(() => {
    function fit() {
      const stage  = document.getElementById("stage");
      const sizer  = document.getElementById("stage-sizer");
      if (!stage || !sizer) return;
      const s = window.innerWidth / 1920;
      stage.style.transform = `scale(${s})`;
      sizer.style.width  = (1920 * s) + "px";
      sizer.style.height = (stage.offsetHeight * s) + "px";
    }
    fit();
    // Re-fit a couple of frames later in case fonts / images settle in
    const t1 = setTimeout(fit, 80);
    const t2 = setTimeout(fit, 320);
    window.addEventListener("resize", fit);
    // Observe content height changes
    const stage = document.getElementById("stage");
    const ro = stage && "ResizeObserver" in window ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(stage);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener("resize", fit);
      if (ro) ro.disconnect();
    };
  }, []);

  // Scroll back to top when switching tab
  useEffect(() => {
    const wrap = document.getElementById("stage-wrap");
    if (wrap) wrap.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);
}

function TopBar({ active, setActive }) {
  const now = useMemo(() => {
    const d = new Date(2026, 4, 25, 9, 42);
    return d.toLocaleString("zh-CN", { hour12: false });
  }, []);
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">G</div>
        <div className="col">
          <div className="brand-title">经销商生意大脑</div>
          <div className="brand-sub">Group Commerce OS · v1.4</div>
        </div>
      </div>
      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={"tab" + (active === t.id ? " active" : "")}
            onClick={() => setActive(t.id)}
          >
            <span className="tab-num">{t.num}</span>
            <span>{t.title}</span>
          </button>
        ))}
      </div>
      <div className="topbar-meta">
        <span><span className="dot"></span>实时数据</span>
        <span>{now}</span>
        <span>陆总 · 销售总裁</span>
      </div>
    </div>
  );
}

function SceneFooter({ left, right }) {
  return (
    <div className="scene-footer">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("dossier");
  useStageScale(active);
  return (
    <React.Fragment>
      <TopBar active={active} setActive={setActive} />
      {active === "intro"      && <SceneIntro      go={setActive} />}
      {active === "customer"   && <SceneCustomer />}
      {active === "decision"   && <SceneDecision />}
      {active === "risk"       && <SceneRisk />}
      {active === "capability" && <SceneCapability />}
      {active === "network"    && <SceneNetwork />}
      {active === "dossier"    && <SceneDossier />}
    </React.Fragment>
  );
}

window.App = App;
window.SceneFooter = SceneFooter;
