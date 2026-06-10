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
        redIdx = 18 + Math.floor(p.name.charCodeAt(0) % 14);
      }
      let amberIdx = -1;
      if (dealers.some(d => d.level === "amber")) {
        amberIdx = 8 + Math.floor(p.name.charCodeAt(0) % 22);
      }
      for (let w = 0; w < 36; w++) {
        let l = "green";
        const seed = (p.name.charCodeAt(0) * 91 + w * 7) % 100;
        if (seed < 6) l = "yellow";
        if (w === amberIdx) l = "amber";
        if (w === redIdx) l = "red";
        cells.push(l);
      }
      return {
        province: p.name,
        region: p.r,
        cells
      };
    });
    return out;
  }, []);
  const colorMap = {
    green: "oklch(0.30 0.04 150)",
    yellow: "oklch(0.55 0.10 90)",
    amber: "oklch(0.65 0.16 50)",
    red: "oklch(0.62 0.22 25)"
  };

  // counts
  const counts = D.RISK_DEALERS.reduce((acc, d) => {
    acc[d.level] = (acc[d.level] || 0) + 1;
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in",
    style: {
      gridTemplateRows: "auto 1fr auto",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "MAP 04 \xB7 CHANNEL HEALTH HEATMAP",
    title: "\u98CE\u9669\u9884\u8B66\u5730\u56FE",
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u63D0\u524D ", /*#__PURE__*/React.createElement("b", {
      className: "amber"
    }, "3\u20136 \u4E2A\u6708"), " \u770B\u5230 \"\u53D8\u5FC3\u4FE1\u53F7\"\u3002", /*#__PURE__*/React.createElement("br", null), "\u8FD9\u4E00\u5F20\u56FE, \u76F4\u63A5\u5BF9\u5E94 ", /*#__PURE__*/React.createElement("b", {
      className: "t1"
    }, "\u51E0\u5341\u4EBF\u6E20\u9053\u8D44\u4EA7"), "\u3002")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 460px",
      gap: 28,
      minHeight: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-16",
    style: {
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(RiskStat, {
    color: "var(--red)",
    v: counts.red || 0,
    l: "\u9AD8\u98CE\u9669 \xB7 \u7ACB\u5373\u4ECB\u5165",
    pulse: true
  }), /*#__PURE__*/React.createElement(RiskStat, {
    color: "var(--amber)",
    v: counts.amber || 0,
    l: "\u6B21\u9AD8 \xB7 \u4E3B\u52A8\u8054\u7CFB"
  }), /*#__PURE__*/React.createElement(RiskStat, {
    color: "oklch(0.65 0.12 90)",
    v: counts.yellow || 0,
    l: "\u89C2\u5BDF \xB7 \u6301\u7EED\u76D1\u6D4B"
  }), /*#__PURE__*/React.createElement(RiskStat, {
    color: "var(--green)",
    v: counts.green || 0,
    l: "\u7A33\u5B9A"
  })), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "31 \u7701 \xB7 36 \u5468\u5173\u7CFB\u5065\u5EB7\u5EA6\u70ED\u529B\u56FE", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "\u6700\u8FD1 9 \u4E2A\u6708 \xB7 \u5468\u5EA6")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: -8,
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "84px 1fr",
      gap: 6
    }
  }, heat.map((row, ri) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: row.province
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 13,
      color: "var(--t-2)",
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, row.province), /*#__PURE__*/React.createElement("span", {
    className: "mono t4",
    style: {
      fontSize: 10
    }
  }, row.region)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(36, 1fr)",
      gap: 3
    }
  }, row.cells.map((c, ci) => /*#__PURE__*/React.createElement("div", {
    key: ci,
    onMouseEnter: e => setHover({
      x: e.clientX,
      y: e.clientY,
      prov: row.province,
      week: ci + 1,
      level: c
    }),
    onMouseLeave: () => setHover(null),
    onClick: () => c === "red" ? setSelected(D.TOP_RISK[ri % D.TOP_RISK.length]) : null,
    style: {
      aspectRatio: "1",
      background: colorMap[c],
      cursor: c === "red" ? "pointer" : "default",
      border: c === "red" ? "1px solid var(--red)" : "none",
      position: "relative"
    }
  }, c === "red" && /*#__PURE__*/React.createElement("div", {
    className: "pulse-red",
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%"
    }
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-1)",
      paddingTop: 12,
      marginTop: 12,
      display: "flex",
      justifyContent: "space-between",
      color: "var(--t-3)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row gap-16",
    style: {
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: colorMap.green
    }
  }), "\u7A33\u5B9A"), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: colorMap.yellow
    }
  }), "\u89C2\u5BDF"), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: colorMap.amber
    }
  }), "\u6B21\u9AD8"), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: colorMap.red
    }
  }), "\u9AD8\u98CE\u9669")), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      letterSpacing: "0.1em"
    }
  }, "9 \u6708\u524D \u25C0\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501 \u672C\u5468")))), /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u672C\u5468\u9AD8\u98CE\u9669 \xB7 TOP 5", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "CONFIDENCE \u2265 0.70")), /*#__PURE__*/React.createElement("div", {
    className: "col gap-12"
  }, D.TOP_RISK.map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: r.name,
    onClick: () => setSelected(r),
    style: {
      background: selected.name === r.name ? "var(--bg-2)" : "transparent",
      border: "1px solid " + (selected.name === r.name ? "var(--red)" : "var(--border-1)"),
      padding: "10px 12px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--t-1)",
      fontSize: 15,
      fontWeight: 600
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "mono t3",
    style: {
      fontSize: 11
    }
  }, r.region, " \xB7 ", r.revenue, " \xB7 ", r.since, "\u524D\u51FA\u73B0\u9996\u4E2A\u4FE1\u53F7")), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      color: "var(--red)",
      fontSize: 18,
      fontWeight: 600
    }
  }, (r.confidence * 100).toFixed(0), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10
    }
  }, "%")))))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderTop: "3px solid var(--red)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 11,
      letterSpacing: "0.16em"
    }
  }, "DOSSIER \xB7 \u53D8\u5FC3\u4FE1\u53F7"), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 26,
      fontWeight: 600,
      marginTop: 4
    }
  }, selected.name), /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 11,
      marginTop: 2
    }
  }, selected.region, " \xB7 \u5E74\u56DE\u6B3E ", selected.revenue, " \xB7 \u8D23\u4EFB\u4EBA ", selected.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, selected.signals.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "8px 10px",
      background: "var(--bg-2)",
      border: "1px solid var(--border-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: "var(--red)",
      fontSize: 12,
      marginTop: 2
    }
  }, "\u25C6 S0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--t-1)",
      lineHeight: 1.4
    }
  }, s)))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginTop: 16,
      width: "100%"
    }
  }, "\u542F\u52A8\u6551\u63F4\u5DE5\u5355 \u2192 \u5927\u533A+\u54C1\u724C\u603B\u88C1\u7EC4\u5408\u62DC\u8BBF")))), hover && hover.level === "red" && /*#__PURE__*/React.createElement("div", {
    className: "tt",
    style: {
      left: Math.min(hover.x + 12, window.innerWidth - 220),
      top: hover.y - 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tt-title"
  }, hover.prov, " \xB7 \u7B2C ", hover.week, " \u5468"), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u5173\u7CFB\u5065\u5EB7"), /*#__PURE__*/React.createElement("b", {
    className: "red"
  }, "\u9AD8\u98CE\u9669")), /*#__PURE__*/React.createElement("div", {
    className: "tt-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u70B9\u51FB\u67E5\u770B"), /*#__PURE__*/React.createElement("b", null, "\u53D8\u5FC3\u4FE1\u53F7\u6863\u6848"))), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u8FC7\u53BB \u2014 \u56DE\u6B3E\u6389\u4E86\u624D\u53D1\u73B0 / \u73B0\u5728 \u2014 \u63D0\u524D 3-6 \u4E2A\u6708\u770B\u5230",
    right: "MAP 04 \xB7 NEW SIGNALS 14 / 24 HRS"
  }));
}
function RiskStat({
  color,
  v,
  l,
  pulse
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      padding: 22,
      position: "relative"
    }
  }, pulse && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: color
    },
    className: "pulse-red"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      color,
      fontSize: 54,
      fontWeight: 600,
      lineHeight: 1
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "t3",
    style: {
      fontSize: 17,
      marginTop: 8
    }
  }, l));
}
window.SceneRisk = SceneRisk;