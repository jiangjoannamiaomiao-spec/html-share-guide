// =====================================================
// App shell: top bar, tab switching, scene scaling
// =====================================================
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
const TABS = [{
  id: "intro",
  num: "00",
  title: "信号粒子"
}, {
  id: "customer",
  num: "01",
  title: "客户类型"
}, {
  id: "network",
  num: "02",
  title: "关系网络"
}, {
  id: "decision",
  num: "03",
  title: "决策人"
}, {
  id: "risk",
  num: "04",
  title: "风险预警"
}, {
  id: "capability",
  num: "05",
  title: "能力评估"
}, {
  id: "dossier",
  num: "06",
  title: "经销商档案"
}];
function useStageScale(active) {
  useEffect(() => {
    function fit() {
      const stage = document.getElementById("stage");
      const sizer = document.getElementById("stage-sizer");
      if (!stage || !sizer) return;
      const s = window.innerWidth / 1920;
      stage.style.transform = `scale(${s})`;
      sizer.style.width = 1920 * s + "px";
      sizer.style.height = stage.offsetHeight * s + "px";
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
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", fit);
      if (ro) ro.disconnect();
    };
  }, []);

  // Scroll back to top when switching tab
  useEffect(() => {
    const wrap = document.getElementById("stage-wrap");
    if (wrap) wrap.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [active]);
}
function TopBar({
  active,
  setActive
}) {
  const now = useMemo(() => {
    const d = new Date(2026, 4, 25, 9, 42);
    return d.toLocaleString("zh-CN", {
      hour12: false
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-mark"
  }, "G"), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-title"
  }, "\u7ECF\u9500\u5546\u751F\u610F\u5927\u8111"), /*#__PURE__*/React.createElement("div", {
    className: "brand-sub"
  }, "Group Commerce OS \xB7 v1.4"))), /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: "tab" + (active === t.id ? " active" : ""),
    onClick: () => setActive(t.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "tab-num"
  }, t.num), /*#__PURE__*/React.createElement("span", null, t.title)))), /*#__PURE__*/React.createElement("div", {
    className: "topbar-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "\u5B9E\u65F6\u6570\u636E"), /*#__PURE__*/React.createElement("span", null, now), /*#__PURE__*/React.createElement("span", null, "\u9646\u603B \xB7 \u9500\u552E\u603B\u88C1")));
}
function SceneFooter({
  left,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("span", null, left), /*#__PURE__*/React.createElement("span", null, right));
}
function App() {
  const [active, setActive] = useState("dossier");
  useStageScale(active);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    active: active,
    setActive: setActive
  }), active === "intro" && /*#__PURE__*/React.createElement(SceneIntro, {
    go: setActive
  }), active === "customer" && /*#__PURE__*/React.createElement(SceneCustomer, null), active === "decision" && /*#__PURE__*/React.createElement(SceneDecision, null), active === "risk" && /*#__PURE__*/React.createElement(SceneRisk, null), active === "capability" && /*#__PURE__*/React.createElement(SceneCapability, null), active === "network" && /*#__PURE__*/React.createElement(SceneNetwork, null), active === "dossier" && /*#__PURE__*/React.createElement(SceneDossier, null));
}
window.App = App;
window.SceneFooter = SceneFooter;