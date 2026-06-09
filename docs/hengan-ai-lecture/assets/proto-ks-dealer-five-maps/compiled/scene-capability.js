// =====================================================
// Scene 04 — 能力评估地图
// =====================================================
function SceneCapability() {
  const [hover, setHover] = useState(null);

  // axes: claimed (x) vs actual (y); 0–1
  const W = 980,
    H = 600,
    PAD = 60;
  const x = v => PAD + v * (W - PAD * 2);
  const y = v => H - PAD - v * (H - PAD * 2);
  const quadrantOf = (c, a) => {
    if (a >= 0.55 && c >= 0.55) return "strong"; // 真实强
    if (a < 0.55 && c >= 0.55) return "inflated"; // 虚高
    if (a >= 0.55 && c < 0.55) return "hidden"; // 隐藏型
    return "weak"; // 弱
  };
  const quads = {
    strong: {
      name: "真实强",
      color: "var(--green)",
      count: 0,
      action: "承接新品首发 · 区域代理"
    },
    inflated: {
      name: "虚高型",
      color: "var(--red)",
      count: 0,
      action: "限制压货 · 重新核定经销区域"
    },
    hidden: {
      name: "隐藏型",
      color: "var(--cyan)",
      count: 0,
      action: "重新签订更高分销目标 · 给舞台"
    },
    weak: {
      name: "基础型",
      color: "var(--t-3)",
      count: 0,
      action: "仅承担基础 SKU · 不压货"
    }
  };
  D.CAPABILITY.forEach(d => {
    quads[quadrantOf(d.claimed, d.actual)].count++;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in",
    style: {
      gridTemplateRows: "auto 1fr auto",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "MAP 05 \xB7 TRUE CAPABILITY MAP",
    title: "\u80FD\u529B\u8BC4\u4F30\u5730\u56FE",
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u771F\u5B9E\u5206\u9500\u80FD\u529B vs \u81EA\u79F0\u80FD\u529B \u2014 \u5DEE\u8DDD\u6709\u591A\u5927?", /*#__PURE__*/React.createElement("br", null), "\u8FC7\u53BB\u9760 ", /*#__PURE__*/React.createElement("b", {
      className: "t1"
    }, "\u5E74\u56DE\u6B3E\u4E00\u4E2A\u6307\u6807\u62CD\u8111\u888B"), ", \u73B0\u5728\u6309 ", /*#__PURE__*/React.createElement("b", {
      className: "amber"
    }, "\u771F\u5B9E\u80FD\u529B"), " \u7CBE\u7EC6\u5316\u3002")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: 28,
      minHeight: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
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
  }, "\u6563\u70B9\u56FE \xB7 \u81EA\u79F0 vs \u771F\u5B9E", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "N = ", D.CAPABILITY.length)), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: x(0),
    y: y(1),
    width: x(0.55) - x(0),
    height: y(0.55) - y(1),
    fill: "var(--t-4)",
    opacity: "0.05"
  }), /*#__PURE__*/React.createElement("rect", {
    x: x(0.55),
    y: y(1),
    width: x(1) - x(0.55),
    height: y(0.55) - y(1),
    fill: "var(--green)",
    opacity: "0.07"
  }), /*#__PURE__*/React.createElement("rect", {
    x: x(0),
    y: y(0.55),
    width: x(0.55) - x(0),
    height: y(0) - y(0.55),
    fill: "var(--cyan)",
    opacity: "0.05"
  }), /*#__PURE__*/React.createElement("rect", {
    x: x(0.55),
    y: y(0.55),
    width: x(1) - x(0.55),
    height: y(0) - y(0.55),
    fill: "var(--red)",
    opacity: "0.08"
  }), /*#__PURE__*/React.createElement("line", {
    x1: x(0),
    y1: y(0),
    x2: x(1),
    y2: y(1),
    stroke: "var(--t-4)",
    strokeDasharray: "3 4"
  }), /*#__PURE__*/React.createElement("text", {
    x: x(0.5) + 6,
    y: y(0.5) - 10,
    style: {
      fill: "var(--t-3)",
      fontSize: 14,
      fontFamily: "var(--f-mono)"
    }
  }, "y = x \xB7 \u8A00\u884C\u4E00\u81F4"), /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    y1: H - PAD,
    x2: W - PAD,
    y2: H - PAD,
    stroke: "var(--border-2)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    y1: PAD,
    x2: PAD,
    y2: H - PAD,
    stroke: "var(--border-2)"
  }), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: H - 22,
    textAnchor: "middle",
    style: {
      fill: "var(--t-2)",
      fontSize: 17,
      fontWeight: 500
    }
  }, "\u81EA\u79F0\u5206\u9500\u80FD\u529B \u2192"), /*#__PURE__*/React.createElement("text", {
    x: 20,
    y: H / 2,
    textAnchor: "middle",
    transform: `rotate(-90 20 ${H / 2})`,
    style: {
      fill: "var(--t-2)",
      fontSize: 17,
      fontWeight: 500
    }
  }, "\u771F\u5B9E\u5206\u9500\u80FD\u529B \u2192"), /*#__PURE__*/React.createElement("text", {
    x: x(0.85),
    y: y(0.92),
    textAnchor: "middle",
    style: {
      fill: "var(--green)",
      fontSize: 22,
      fontFamily: "var(--f-serif)",
      fontWeight: 600
    }
  }, "\u771F\u5B9E\u5F3A"), /*#__PURE__*/React.createElement("text", {
    x: x(0.85),
    y: y(0.92) + 24,
    textAnchor: "middle",
    style: {
      fill: "var(--green)",
      fontSize: 14,
      fontFamily: "var(--f-mono)"
    }
  }, "\u627F\u63A5\u65B0\u54C1\u9996\u53D1"), /*#__PURE__*/React.createElement("text", {
    x: x(0.85),
    y: y(0.20),
    textAnchor: "middle",
    style: {
      fill: "var(--red)",
      fontSize: 22,
      fontFamily: "var(--f-serif)",
      fontWeight: 600
    }
  }, "\u865A\u9AD8 \xB7 \u98CE\u9669"), /*#__PURE__*/React.createElement("text", {
    x: x(0.85),
    y: y(0.20) + 24,
    textAnchor: "middle",
    style: {
      fill: "var(--red)",
      fontSize: 14,
      fontFamily: "var(--f-mono)"
    }
  }, "\u9650\u5236\u538B\u8D27"), /*#__PURE__*/React.createElement("text", {
    x: x(0.20),
    y: y(0.92),
    textAnchor: "middle",
    style: {
      fill: "var(--cyan)",
      fontSize: 22,
      fontFamily: "var(--f-serif)",
      fontWeight: 600
    }
  }, "\u9690\u85CF \xB7 \u4F4E\u8C03\u5F3A"), /*#__PURE__*/React.createElement("text", {
    x: x(0.20),
    y: y(0.92) + 24,
    textAnchor: "middle",
    style: {
      fill: "var(--cyan)",
      fontSize: 14,
      fontFamily: "var(--f-mono)"
    }
  }, "\u7ED9\u821E\u53F0"), /*#__PURE__*/React.createElement("text", {
    x: x(0.20),
    y: y(0.20),
    textAnchor: "middle",
    style: {
      fill: "var(--t-3)",
      fontSize: 22,
      fontFamily: "var(--f-serif)",
      fontWeight: 600
    }
  }, "\u57FA\u7840\u578B"), /*#__PURE__*/React.createElement("text", {
    x: x(0.20),
    y: y(0.20) + 24,
    textAnchor: "middle",
    style: {
      fill: "var(--t-4)",
      fontSize: 14,
      fontFamily: "var(--f-mono)"
    }
  }, "\u4EC5\u57FA\u7840 SKU"), D.CAPABILITY.map((d, i) => {
    const q = quadrantOf(d.claimed, d.actual);
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x(d.claimed),
      cy: y(d.actual),
      r: 2 + d.rev * 2,
      fill: quads[q].color,
      fillOpacity: "0.55",
      stroke: quads[q].color,
      onMouseEnter: e => setHover({
        x: e.clientX,
        y: e.clientY,
        d,
        q
      }),
      onMouseLeave: () => setHover(null),
      style: {
        cursor: "pointer",
        transition: "r .2s, opacity .2s"
      },
      onMouseOver: e => e.currentTarget.setAttribute("r", 4 + d.rev * 2.5),
      onMouseOut: e => e.currentTarget.setAttribute("r", 2 + d.rev * 2)
    });
  }), D.CAP_LABELS.map((l, i) => {
    const q = quadrantOf(l.claimed, l.actual);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: x(l.claimed),
      cy: y(l.actual),
      r: "10",
      fill: "none",
      stroke: quads[q].color,
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x(l.claimed),
      cy: y(l.actual),
      r: "3",
      fill: quads[q].color
    }), /*#__PURE__*/React.createElement("text", {
      x: x(l.claimed) + 16,
      y: y(l.actual) - 10,
      style: {
        fill: "var(--t-1)",
        fontSize: 14,
        fontFamily: "var(--f-sans)"
      }
    }, l.name));
  }), /*#__PURE__*/React.createElement("line", {
    x1: x(0.55),
    y1: y(0),
    x2: x(0.55),
    y2: y(1),
    stroke: "var(--border-1)",
    strokeDasharray: "2 4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: x(0),
    y1: y(0.55),
    x2: x(1),
    y2: y(0.55),
    stroke: "var(--border-1)",
    strokeDasharray: "2 4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 14,
      left: 24,
      right: 24,
      display: "flex",
      justifyContent: "space-between",
      color: "var(--t-4)",
      fontFamily: "var(--f-mono)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u203B \u5706\u70B9\u5927\u5C0F = \u5E74\u56DE\u6B3E"), /*#__PURE__*/React.createElement("span", null, "\u203B \u771F\u5B9E\u80FD\u529B\u6765\u81EA 9 \u4E2A\u7EF4\u5EA6: \u4ED3\u50A8 / \u914D\u9001\u65F6\u6548 / \u7EC8\u7AEF\u8986\u76D6 / \u52A8\u9500 / \u5468\u8F6C / \u7B49"))), /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, Object.entries(quads).map(([k, q]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "card",
    style: {
      borderLeft: `3px solid ${q.color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono t3",
    style: {
      fontSize: 14,
      letterSpacing: "0.14em"
    }
  }, k.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: q.color,
      marginTop: 6
    }
  }, q.name)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 42,
      fontWeight: 600
    }
  }, q.count, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      color: "var(--t-3)"
    }
  }, " / ", D.CAPABILITY.length))), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 17,
      marginTop: 12,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono amber",
    style: {
      marginRight: 8
    }
  }, "\u25B8"), q.action))))), hover && /*#__PURE__*/React.createElement("div", {
    className: "tt",
    style: {
      left: Math.min(hover.x + 12, window.innerWidth - 240),
      top: hover.y - 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tt-title"
  }, quads[hover.q].name), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u81EA\u79F0\u80FD\u529B"), /*#__PURE__*/React.createElement("b", null, (hover.d.claimed * 100).toFixed(0))), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u771F\u5B9E\u80FD\u529B"), /*#__PURE__*/React.createElement("b", null, (hover.d.actual * 100).toFixed(0))), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u5E74\u56DE\u6B3E"), /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, hover.d.rev.toFixed(1), " \u4EBF")), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u5EFA\u8BAE"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: quads[hover.q].color
    }
  }, quads[hover.q].action))), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u8FC7\u53BB \u2014 \u4E00\u4E2A\u6307\u6807 (\u56DE\u6B3E) \u62CD\u8111\u888B / \u73B0\u5728 \u2014 9 \u7EF4\u8BC4\u4F30 \xB7 \u81EA\u52A8\u5F52\u7C7B",
    right: "MAP 05 \xB7 9 CAPABILITY DIMENSIONS"
  }));
}
window.SceneCapability = SceneCapability;