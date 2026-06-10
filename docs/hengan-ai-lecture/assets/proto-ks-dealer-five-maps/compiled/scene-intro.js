// =====================================================
// Scene 00 — Intro: 信号粒子 凝结机制
// =====================================================
const D = window.AppData;
function SceneIntro({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.15fr 1fr",
      gap: 56,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      gap: 36,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "FROM ONE VISIT \xB7 TO A LIVING NETWORK"), /*#__PURE__*/React.createElement("div", {
    className: "serif t1",
    style: {
      fontSize: 64,
      lineHeight: 1.15,
      fontWeight: 600,
      letterSpacing: "0.01em"
    }
  }, "\u4ECE\u4E00\u6B21\u62DC\u8BBF,", /*#__PURE__*/React.createElement("br", null), "\u5230\u4E00\u5F20", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--amber)"
    }
  }, "\u96C6\u56E2\u751F\u610F\u5730\u56FE")), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 26,
      lineHeight: 1.7,
      marginTop: 28,
      maxWidth: 720
    }
  }, "\u738B\u54E5\u7684\u4E00\u6B21\u62DC\u8BBF,\u8D21\u732E ", /*#__PURE__*/React.createElement("b", {
    className: "amber mono"
  }, "5"), " \u9897\u4FE1\u53F7\u7C92\u5B50\u3002", /*#__PURE__*/React.createElement("br", null), "\u5168\u96C6\u56E2 ", /*#__PURE__*/React.createElement("b", {
    className: "amber mono"
  }, D.ACTIVE_FIELD_REPS.toLocaleString()), " \u540D\u4E1A\u52A1\u5458\u3001\u5E74 ", /*#__PURE__*/React.createElement("b", {
    className: "amber mono"
  }, D.ANNUAL_VISITS.toLocaleString()), " \u6B21\u62DC\u8BBF,", /*#__PURE__*/React.createElement("br", null), "\u51DD\u7ED3\u6210 ", /*#__PURE__*/React.createElement("b", {
    className: "amber mono"
  }, (D.TOTAL_PARTICLES / 1e4).toFixed(1)), " \u4E07\u9897\u7C92\u5B50 \u2192 ", /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, "5 \u5F20\u603B\u90E8\u4ECE\u672A\u62E5\u6709\u8FC7\u7684\u5730\u56FE"), "\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-16",
    style: {
      gap: 16
    }
  }, [{
    v: "5",
    l: "一次拜访 · 信号粒子",
    s: "客户类型 / 决策人 / 真实能力 / 风险 / 策略"
  }, {
    v: D.ACTIVE_FIELD_REPS.toLocaleString(),
    l: "活跃业务员 · 信号源",
    s: "覆盖全国 31 省 · 7 大区"
  }, {
    v: (D.TOTAL_PARTICLES / 1e4).toFixed(1) + "万",
    l: "年凝结粒子 · 增长中",
    s: "+8.4% MoM · 自动验证校准"
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "card",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-val",
    style: {
      color: "var(--amber)"
    }
  }, m.v), /*#__PURE__*/React.createElement("div", {
    className: "metric-label t2",
    style: {
      fontSize: 18
    }
  }, m.l), /*#__PURE__*/React.createElement("div", {
    className: "t4 mono",
    style: {
      fontSize: 14,
      letterSpacing: "0.08em",
      marginTop: 6
    }
  }, m.s))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u56DB\u5C42\u8DC3\u8FC1 \xB7 \u4FE1\u53F7\u7C92\u5B50\u5982\u4F55\u51DD\u7ED3\u6210\u5730\u56FE", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "MECHANISM")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 12,
      marginTop: 8
    }
  }, [{
    n: "01",
    t: "单次拜访",
    s: "→ 结构化信号",
    c: "var(--cyan)"
  }, {
    n: "02",
    t: "多次拜访",
    s: "→ 画像收敛",
    c: "var(--purple)"
  }, {
    n: "03",
    t: "+ 业务结果",
    s: "→ 验证校准",
    c: "var(--pink)"
  }, {
    n: "04",
    t: "几千家画像",
    s: "→ 集团地图",
    c: "var(--amber)"
  }].map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderLeft: `3px solid ${x.c}`,
      paddingLeft: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono t4",
    style: {
      fontSize: 14,
      letterSpacing: "0.12em"
    }
  }, x.n), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 20,
      fontWeight: 600,
      marginTop: 6
    }
  }, x.t), /*#__PURE__*/React.createElement("div", {
    className: "t3",
    style: {
      fontSize: 16,
      marginTop: 2
    }
  }, x.s))))), /*#__PURE__*/React.createElement("div", {
    className: "row gap-16",
    style: {
      gap: 16,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => go("customer")
  }, "\u8FDB\u5165 5 \u5F20\u5730\u56FE  \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => go("risk")
  }, "\u8DF3\u81F3\u98CE\u9669\u9884\u8B66 \xB7 \u5F53\u524D 5 \u4F8B"))), /*#__PURE__*/React.createElement(ParticleAggregation, null)), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u4E00\u6B21\u62DC\u8BBF \xB7 5 \u9897\u7C92\u5B50 / \u4E00\u5E74 \xB7 48 \u4E07\u9897 / \u51DD\u7ED3\u6210 5 \u5F20\u6D3B\u5730\u56FE",
    right: "DECK 00 / 07 \xB7 GROUP COMMERCE OS"
  }));
}
function ParticleAggregation() {
  // Concept:
  //   bottom: one BD visit (王哥 → 陈总)
  //   center: 5 particles fly up
  //   top: aggregates with the noise from thousands of others → 5 map nodes
  const targets = [{
    x: 110,
    y: 90,
    label: "客户类型",
    c: "var(--green)"
  }, {
    x: 280,
    y: 60,
    label: "决策人",
    c: "var(--pink)"
  }, {
    x: 460,
    y: 60,
    label: "风险预警",
    c: "var(--red)"
  }, {
    x: 640,
    y: 90,
    label: "能力评估",
    c: "var(--cyan)"
  }, {
    x: 800,
    y: 140,
    label: "关系网络",
    c: "var(--purple)"
  }];
  const noise = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 220; i++) {
      arr.push({
        x: Math.random() * 900 + 10,
        y: Math.random() * 180 + 30,
        d: Math.random() * 6,
        op: 0.15 + Math.random() * 0.4
      });
    }
    return arr;
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      minHeight: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      padding: "20px 24px 0",
      marginBottom: 0
    }
  }, "\u738B\u54E5 \u2192 \u9648\u603B \xB7 \u4E00\u6B21\u62DC\u8BBF\u7684\u7C92\u5B50\u6D41", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "LIVE \xB7 ", new Date().toISOString().slice(11, 19))), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 920 660",
    style: {
      width: "100%",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "beam",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--amber)",
    stopOpacity: "0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "var(--amber)",
    stopOpacity: "0.5"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--amber)",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "halo",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "currentColor",
    stopOpacity: "0.55"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "currentColor",
    stopOpacity: "0"
  }))), targets.map((t, i) => /*#__PURE__*/React.createElement("g", {
    key: i,
    style: {
      color: t.c
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: t.x,
    cy: t.y,
    r: "42",
    fill: "url(#halo)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: t.x,
    cy: t.y,
    r: "14",
    fill: "none",
    stroke: t.c,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: t.x,
    cy: t.y,
    r: "5",
    fill: t.c
  }), /*#__PURE__*/React.createElement("text", {
    x: t.x,
    y: t.y + 40,
    textAnchor: "middle",
    className: "node-label",
    style: {
      fill: "var(--t-1)",
      fontSize: 17,
      fontWeight: 600,
      fontFamily: "var(--f-sans)"
    }
  }, t.label), /*#__PURE__*/React.createElement("text", {
    x: t.x,
    y: t.y - 26,
    textAnchor: "middle",
    className: "node-label",
    style: {
      fill: t.c,
      fontSize: 13
    }
  }, "MAP-0", i + 1))), noise.map((n, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: n.x,
    cy: n.y,
    r: "1.2",
    fill: "var(--amber-dim)",
    opacity: n.op
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    values: `${n.op};${n.op * 0.2};${n.op}`,
    dur: `${3 + n.d}s`,
    repeatCount: "indefinite"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    x2: "900",
    y1: "240",
    y2: "240",
    stroke: "var(--border-1)",
    strokeDasharray: "3 6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "230",
    className: "node-label",
    style: {
      fill: "var(--t-3)",
      fontSize: 15
    }
  }, "\u25B2 \u603B\u90E8 \xB7 5 \u5F20\u6D3B\u5730\u56FE (Group HQ)"), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "452",
    className: "node-label",
    style: {
      fill: "var(--t-3)",
      fontSize: 15
    }
  }, "\u25BC \u4E00\u7EBF \xB7 \u4E00\u6B21\u62DC\u8BBF 5 \u9897\u7C92\u5B50 (Field)"), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    x2: "900",
    y1: "440",
    y2: "440",
    stroke: "var(--border-1)",
    strokeDasharray: "3 6"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(80,486)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "780",
    height: "144",
    rx: "2",
    fill: "var(--bg-2)",
    stroke: "var(--border-1)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "34",
    style: {
      fill: "var(--t-3)",
      fontSize: 14,
      fontFamily: "var(--f-mono)",
      letterSpacing: "0.12em"
    }
  }, "VISIT-#84217 \xB7 2026-05-21 14:22 \xB7 \u6CB3\u5357\u90D1\u5DDE"), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "72",
    style: {
      fill: "var(--t-1)",
      fontSize: 26,
      fontFamily: "var(--f-serif)",
      fontWeight: 600
    }
  }, "\u738B\u54E5 \xB7 \u62DC\u8BBF \u9648\u603B(\u8C6B\u5317 \xB7 \u9648\u6C0F\u8D38\u6613)"), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "104",
    style: {
      fill: "var(--amber)",
      fontSize: 17,
      fontFamily: "var(--f-mono)"
    }
  }, "\u8BED\u97F3\u5907\u5FD8 12'04\" \u2192 \u7ED3\u6784\u5316 \u2192 5 \u9897\u7C92\u5B50"), /*#__PURE__*/React.createElement("text", {
    x: "22",
    y: "128",
    style: {
      fill: "var(--t-3)",
      fontSize: 15
    }
  }, "\"\u9996\u6279\u538B\u8D27\u8FC7\u91CF, \u8001\u677F\u5A18\u8BF4\u4E86\u7B97, \u771F\u5B9E\u662F\u4ED3\u50A8\u578B, \u9700\u6162\u517B, \u5229\u6DA6\u578B\u4E3A\u4E3B\"")), targets.map((t, i) => {
    const startX = 200 + i * 140;
    const startY = 500;
    return /*#__PURE__*/React.createElement("g", {
      key: "p" + i,
      style: {
        color: t.c
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: startX,
      y1: startY,
      x2: t.x,
      y2: t.y,
      stroke: t.c,
      strokeOpacity: "0.25",
      strokeDasharray: "2 4"
    }), /*#__PURE__*/React.createElement("circle", {
      r: "5",
      fill: t.c
    }, /*#__PURE__*/React.createElement("animateMotion", {
      dur: `${3 + i * 0.4}s`,
      repeatCount: "indefinite",
      keyTimes: "0;1",
      path: `M ${startX} ${startY} L ${t.x} ${t.y}`
    }), /*#__PURE__*/React.createElement("animate", {
      attributeName: "opacity",
      values: "0;1;1;0",
      dur: `${3 + i * 0.4}s`,
      repeatCount: "indefinite"
    })), /*#__PURE__*/React.createElement("circle", {
      r: "10",
      fill: t.c,
      opacity: "0.25"
    }, /*#__PURE__*/React.createElement("animateMotion", {
      dur: `${3 + i * 0.4}s`,
      repeatCount: "indefinite",
      keyTimes: "0;1",
      path: `M ${startX} ${startY} L ${t.x} ${t.y}`
    })), /*#__PURE__*/React.createElement("text", {
      x: startX,
      y: startY - 10,
      textAnchor: "middle",
      style: {
        fill: t.c,
        fontSize: 14,
        fontFamily: "var(--f-mono)",
        letterSpacing: "0.08em"
      }
    }, "\u25C6 ", t.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-1)",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      color: "var(--t-3)",
      fontFamily: "var(--f-mono)",
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u8FC7\u53BB \u2014 \u8FD9 5 \u9897\u7C92\u5B50\u7559\u5728\u738B\u54E5\u8111\u5B50\u91CC"), /*#__PURE__*/React.createElement("span", {
    className: "amber"
  }, "\u73B0\u5728 \u2014 \u5B83\u4EEC\u6C47\u5165\u603B\u90E8\u7684 5 \u5F20\u5730\u56FE"))));
}
window.SceneIntro = SceneIntro;