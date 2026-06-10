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
    second: "var(--green)"
  };
  const edgeMatch = e => {
    if (filter === "all") return true;
    if (filter === "kin") return e.type === "kin" || e.type === "town";
    if (filter === "interest") return e.type === "interest" || e.type === "money";
    return e.type === filter;
  };
  const nodeFaded = n => {
    if (filter === "all") return false;
    if (n.type === "core") return false;
    if (filter === "kin") return !(n.type === "kin" || n.type === "town" || n.type === "core");
    if (filter === "interest") return !(n.type === "interest" || n.type === "money" || n.type === "core");
    return n.type !== filter && n.type !== "core";
  };
  const filters = [{
    key: "all",
    label: "全部信号",
    count: D.NET_EDGES.length
  }, {
    key: "kin",
    label: "亲族 / 同乡",
    count: D.NET_EDGES.filter(e => e.type === "kin" || e.type === "town").length
  }, {
    key: "interest",
    label: "利益 / 同金主",
    count: D.NET_EDGES.filter(e => e.type === "interest" || e.type === "money").length
  }, {
    key: "smuggle",
    label: "窜货 / 暗中分货",
    count: D.NET_EDGES.filter(e => e.type === "smuggle").length
  }, {
    key: "rival",
    label: "竞品同步挖角",
    count: D.NET_EDGES.filter(e => e.type === "rival").length
  }, {
    key: "second",
    label: "二代俱乐部",
    count: D.NET_EDGES.filter(e => e.type === "second").length
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in",
    style: {
      gridTemplateRows: "auto 1fr auto",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "MAP 02 \xB7 DEALER RELATIONSHIP GRAPH",
    title: "\u5173\u7CFB\u7F51\u7EDC\u5730\u56FE",
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u8FC7\u53BB \u2014 \u8FD9\u5F20\u56FE\u53EA\u5728 ", /*#__PURE__*/React.createElement("b", {
      className: "t1"
    }, "\u533A\u57DF\u8001\u4E1A\u52A1\u5458\u7684\u9152\u684C\u4E0A"), "\u3002", /*#__PURE__*/React.createElement("br", null), "\u73B0\u5728 \u2014 \u7B2C\u4E00\u6B21\u51FA\u73B0\u5728\u603B\u90E8\u5C4F\u5E55\u3002", /*#__PURE__*/React.createElement("br", null), "\u5BF9 ", /*#__PURE__*/React.createElement("b", {
      className: "amber"
    }, "\u7A9C\u8D27\u6CBB\u7406 / \u4EF7\u683C\u7BA1\u63A7 / \u533A\u57DF\u535A\u5F08"), " \u7684\u4EF7\u503C, \u65E0\u6CD5\u4F30\u91CF\u3002")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 400px",
      gap: 28,
      minHeight: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card subtle-grid",
    style: {
      padding: 0,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      padding: "20px 24px 0"
    }
  }, "5 \u5927\u5173\u7CFB\u7C07 \xB7 \u5B9E\u65F6\u4FE1\u53F7", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "CLICK FILTERS \u2192")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1100 660",
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "arrow",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L10,5 L0,10 Z",
    fill: "var(--t-3)"
  }))), D.NET_EDGES.map((e, i) => {
    const a = D.NET_NODES.find(n => n.id === e.a);
    const b = D.NET_NODES.find(n => n.id === e.b);
    const on = edgeMatch(e);
    const c = typeColor[e.type] || "var(--t-3)";
    const dash = e.type === "smuggle" || e.type === "rival" ? "4 3" : "0";
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      stroke: c,
      strokeOpacity: on ? 0.65 : 0.08,
      strokeWidth: on ? 1.6 : 1,
      strokeDasharray: dash
    });
  }), D.NET_NODES.map(n => {
    const faded = nodeFaded(n);
    const c = typeColor[n.type] || "var(--t-2)";
    return /*#__PURE__*/React.createElement("g", {
      key: n.id,
      onMouseEnter: e => setHover({
        x: e.clientX,
        y: e.clientY,
        n
      }),
      onMouseLeave: () => setHover(null),
      style: {
        cursor: "pointer",
        opacity: faded ? 0.18 : 1,
        transition: "opacity .2s"
      }
    }, n.type === "core" && /*#__PURE__*/React.createElement("circle", {
      cx: n.x,
      cy: n.y,
      r: n.r + 10,
      fill: c,
      opacity: "0.08"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: n.x,
      cy: n.y,
      r: n.r,
      fill: n.type === "core" ? c : "var(--bg-2)",
      stroke: c,
      strokeWidth: n.type === "core" ? 0 : 1.5
    }), n.type === "competitor" && /*#__PURE__*/React.createElement("text", {
      x: n.x,
      y: n.y + 5,
      textAnchor: "middle",
      style: {
        fill: "var(--red)",
        fontSize: 16,
        fontWeight: 600
      }
    }, "\u2605"), /*#__PURE__*/React.createElement("text", {
      x: n.x,
      y: n.y + n.r + 20,
      textAnchor: "middle",
      className: "node-label",
      style: {
        fill: n.type === "core" ? "var(--t-1)" : "var(--t-2)",
        fontSize: n.type === "core" ? 17 : 14,
        fontFamily: "var(--f-sans)",
        fontWeight: n.type === "core" ? 600 : 500
      }
    }, n.label), n.note && !faded && /*#__PURE__*/React.createElement("text", {
      x: n.x,
      y: n.y + n.r + 40,
      textAnchor: "middle",
      style: {
        fill: c,
        fontSize: 13,
        fontFamily: "var(--f-mono)"
      }
    }, "\u25C6 ", n.note));
  }), [{
    x: 220,
    y: 28,
    label: "01 · 亲族 / 同乡 簇 (华东)",
    c: "var(--pink)"
  }, {
    x: 880,
    y: 28,
    label: "02 · 利益 / 同金主 簇 (华南)",
    c: "var(--purple)"
  }, {
    x: 240,
    y: 410,
    label: "03 · 窜货流向 簇 (西南)",
    c: "var(--cyan)"
  }, {
    x: 540,
    y: 420,
    label: "04 · 竞品同步挖角 簇 (华中)",
    c: "var(--red)"
  }, {
    x: 770,
    y: 420,
    label: "05 · 二代俱乐部 (隐性)",
    c: "var(--green)"
  }].map((g, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: g.x,
    y: g.y,
    textAnchor: "middle",
    style: {
      fill: g.c,
      fontSize: 15,
      fontFamily: "var(--f-mono)",
      letterSpacing: "0.1em",
      fontWeight: 600
    }
  }, g.label)))), /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u4FE1\u53F7\u7B5B\u9009", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, filters.find(f => f.key === filter).count, " \u6761")), /*#__PURE__*/React.createElement("div", {
    className: "col gap-8"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.key,
    onClick: () => setFilter(f.key),
    style: {
      background: filter === f.key ? "var(--bg-2)" : "transparent",
      border: "1px solid " + (filter === f.key ? "var(--amber)" : "var(--border-1)"),
      padding: "12px 16px",
      color: "var(--t-1)",
      fontSize: 17,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "var(--f-sans)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, f.label), /*#__PURE__*/React.createElement("span", {
    className: "mono t3",
    style: {
      fontSize: 15
    }
  }, f.count))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u672C\u5468\u65B0\u53D1\u73B0", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "+3")), /*#__PURE__*/React.createElement("div", {
    className: "col gap-12"
  }, [{
    l: "粤西·李氏 ↔ 粤东·黄氏",
    n: "同金主信号 · 暗中分货 月 240 万",
    c: "var(--purple)"
  }, {
    l: "豫北·陈氏 · 豫南·赵氏",
    n: "竞品 X 同步高频拜访 · 协同挖角嫌疑",
    c: "var(--red)"
  }, {
    l: "川中·王氏 → 渝北 / 黔东",
    n: "窜货流向新增 2 节点 · 价盘波动 8%",
    c: "var(--cyan)"
  }].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      padding: 12,
      background: "var(--bg-2)",
      borderLeft: `3px solid ${a.c}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 17,
      fontWeight: 600
    }
  }, a.l), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      color: a.c,
      fontSize: 14
    }
  }, a.n))))))), hover && /*#__PURE__*/React.createElement("div", {
    className: "tt",
    style: {
      left: Math.min(hover.x + 12, window.innerWidth - 240),
      top: hover.y - 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tt-title"
  }, hover.n.label), hover.n.revenue && /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u5E74\u56DE\u6B3E"), /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, hover.n.revenue)), hover.n.note && /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u5173\u7CFB\u4FE1\u53F7"), /*#__PURE__*/React.createElement("b", null, hover.n.note)), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u7C7B\u578B"), /*#__PURE__*/React.createElement("b", null, hover.n.type))), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u8FC7\u53BB \u2014 \u5173\u7CFB\u7F51\u5728\u8001\u4E1A\u52A1\u5458\u8111\u5B50\u91CC / \u73B0\u5728 \u2014 \u5728\u603B\u90E8\u4E00\u5757\u5C4F\u5E55\u4E0A",
    right: "MAP 02 \xB7 24 NODES \xB7 19 RELATIONS"
  }));
}
window.SceneNetwork = SceneNetwork;