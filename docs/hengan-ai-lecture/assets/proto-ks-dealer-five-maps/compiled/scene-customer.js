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
      loyal: {
        cx: 200,
        cy: 280
      },
      profit: {
        cx: 540,
        cy: 250
      },
      fence: {
        cx: 880,
        cy: 290
      },
      unknown: {
        cx: 1150,
        cy: 310
      }
    };
    types.forEach(t => {
      const c = clusters[t.key];
      const n = Math.round(t.count / 8);
      for (let i = 0; i < n; i++) {
        const r = 20 + Math.sqrt(i) * 16;
        const a = i * 137.5 * Math.PI / 180;
        arr.push({
          x: c.cx + Math.cos(a) * r,
          y: c.cy + Math.sin(a) * r,
          r: 2.5 + Math.random() * 3,
          color: t.color,
          key: t.key
        });
      }
    });
    return arr;
  }, []);
  const a = types.find(t => t.key === active);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in",
    style: {
      gridTemplateRows: "auto 1fr auto",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "MAP 01 \xB7 CUSTOMER LOYALTY MAP",
    title: "\u5BA2\u6237\u7C7B\u578B\u5730\u56FE",
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u5168\u96C6\u56E2 ", /*#__PURE__*/React.createElement("b", {
      className: "amber mono"
    }, total.toLocaleString()), " \u5BB6\u7ECF\u9500\u5546\u6309\"\u5FE0\u8BDA\u5EA6\u7C7B\u578B\"\u5207\u5206 \u2014 ", /*#__PURE__*/React.createElement("b", {
      className: "t1"
    }, "\u8425\u9500\u8D44\u6E90\u8BE5\u5F80\u54EA\u91CC\u6295, \u4E00\u76EE\u4E86\u7136"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 420px",
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
    style: {
      position: "absolute",
      top: 20,
      left: 24,
      right: 24,
      display: "flex",
      justifyContent: "space-between",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      margin: 0
    }
  }, "\u5168\u56FD\u5206\u5E03 \xB7 \u6309\u7C7B\u578B\u805A\u7C7B", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "\u6BCF\u70B9 \u2248 8 \u5BB6")), /*#__PURE__*/React.createElement("div", {
    className: "row gap-16",
    style: {
      gap: 16
    }
  }, types.map(t => /*#__PURE__*/React.createElement("span", {
    className: "chip",
    key: t.key
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: t.color
    }
  }), t.name)))), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1300 660",
    style: {
      width: "100%",
      height: "100%"
    }
  }, types.map(t => {
    const c = {
      loyal: {
        cx: 200,
        cy: 320
      },
      profit: {
        cx: 540,
        cy: 290
      },
      fence: {
        cx: 880,
        cy: 330
      },
      unknown: {
        cx: 1150,
        cy: 350
      }
    }[t.key];
    const isOn = active === t.key;
    const r = Math.sqrt(t.count) * 7;
    return /*#__PURE__*/React.createElement("g", {
      key: t.key,
      style: {
        color: t.color,
        cursor: "pointer"
      },
      onClick: () => setActive(t.key)
    }, /*#__PURE__*/React.createElement("circle", {
      cx: c.cx,
      cy: c.cy,
      r: r * 1.3,
      fill: t.color,
      opacity: isOn ? 0.08 : 0.03
    }), /*#__PURE__*/React.createElement("circle", {
      cx: c.cx,
      cy: c.cy,
      r: r,
      fill: "none",
      stroke: t.color,
      strokeOpacity: isOn ? 0.7 : 0.25,
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: c.cx,
      y: c.cy - r - 18,
      textAnchor: "middle",
      style: {
        fill: t.color,
        fontFamily: "var(--f-mono)",
        fontSize: 16,
        letterSpacing: "0.12em"
      }
    }, t.name.toUpperCase()), /*#__PURE__*/React.createElement("text", {
      x: c.cx,
      y: c.cy + 8,
      textAnchor: "middle",
      style: {
        fill: "var(--t-1)",
        fontSize: 48,
        fontFamily: "var(--f-mono)",
        fontWeight: 600
      }
    }, t.count), /*#__PURE__*/React.createElement("text", {
      x: c.cx,
      y: c.cy + 34,
      textAnchor: "middle",
      style: {
        fill: "var(--t-3)",
        fontSize: 15,
        fontFamily: "var(--f-mono)"
      }
    }, Math.round(t.count / total * 100), "% \xB7 \u8D21\u732E ", t.rev, "% \u56DE\u6B3E"));
  }), bubbles.map((b, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: b.x,
    cy: b.y + 30,
    r: b.r,
    fill: b.color,
    opacity: active === b.key ? 0.9 : 0.25,
    style: {
      transition: "opacity .3s"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 20,
      left: 24,
      right: 24,
      display: "flex",
      justifyContent: "space-between",
      color: "var(--t-3)",
      fontFamily: "var(--f-mono)",
      fontSize: 14,
      letterSpacing: "0.14em"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2190 \u60C5\u611F \xB7 \u5FE0\u8BDA\u7EF4\u5EA6"), /*#__PURE__*/React.createElement("span", null, "\u653F\u7B56\u654F\u611F \xB7  \u7B97\u8D26"), /*#__PURE__*/React.createElement("span", null, "\u53D8\u5FC3\u503E\u5411 \xB7 \u9A91\u5899"), /*#__PURE__*/React.createElement("span", null, "\u6837\u672C\u4E0D\u8DB3 \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderTop: `3px solid ${a.color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 14,
      letterSpacing: "0.16em"
    }
  }, "FOCUS \xB7 ", a.key.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 42,
      fontWeight: 600,
      marginTop: 8
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 18,
      marginTop: 6
    }
  }, a.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-val"
  }, a.count), /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, "\u7ECF\u9500\u5546\u5BB6\u6570")), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-val",
    style: {
      color: a.color
    }
  }, a.rev, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      color: "var(--t-3)"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, "\u56DE\u6B3E\u8D21\u732E")))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u603B\u90E8\u8D44\u6E90\u5EFA\u8BAE", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "AUTO")), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 26,
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, a.recommendation), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, customerTactics(a.key).map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 14,
      fontSize: 17,
      color: "var(--t-2)",
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: a.color
    }
  }, "\u25B8"), /*#__PURE__*/React.createElement("span", null, line))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u7ADE\u54C1\u653F\u7B56\u654F\u611F\u5EA6", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "90D")), /*#__PURE__*/React.createElement(ElasticityBars, {
    active: active
  })))), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u5207\u6362\u805A\u7C7B: \u6B7B\u5FE0 / \u5229\u6DA6 / \u9A91\u5899 / \u672A\u753B\u50CF",
    right: "MAP 01 \xB7 LAST PARTICLE INGEST 14 SEC AGO"
  }));
}
function customerTactics(key) {
  switch (key) {
    case "loyal":
      return ["情感投入 · 高层走访 · 老业务员长期绑定", "新品首发优先权 · 不靠政策刺激", "保护:警惕被竞品高溢价挖角"];
    case "profit":
      return ["定向政策 · 把账算到小数点后两位", "ROI 模型对标其历史最高利润月", "避免情感话术 · 直接给数据"];
    case "fence":
      return ["立即分流: 救援队 OR 战略放弃", "救援:48 小时内大区总+品牌总裁组合拜访", "放弃:腾出资源给上升期经销商"];
    default:
      return ["加密拜访 · 6 个月内补全画像", "样本不足 · 总部不做资源决策"];
  }
}
function ElasticityBars({
  active
}) {
  const data = {
    loyal: [12, 14, 11, 13, 12, 10, 9, 11, 12, 13, 11, 10],
    profit: [22, 41, 58, 49, 33, 62, 71, 55, 48, 67, 73, 80],
    fence: [38, 52, 47, 61, 78, 88, 92, 84, 79, 86, 91, 95],
    unknown: [8, 10, 12, 11, 9, 10, 11, 12, 13, 10, 11, 12]
  }[active];
  const color = D.CUSTOMER_TYPES.find(t => t.key === active).color;
  const max = 100;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 6,
      height: 110
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${v / max * 100}%`,
      background: color,
      opacity: 0.3 + v / max * 0.7
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--t-4)",
      fontFamily: "var(--f-mono)",
      fontSize: 14,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, "JAN"), /*#__PURE__*/React.createElement("span", null, "JUN"), /*#__PURE__*/React.createElement("span", null, "DEC")), /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 14,
      marginTop: 6
    }
  }, "\u7ADE\u54C1\u4FC3\u9500\u53D1\u5E03\u540E 14 \u5929\u5185\u8FDB\u8D27\u4E0B\u6ED1 %"));
}

// shared section header
function SectionHead({
  eyebrow,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "section-sub"
  }, sub));
}
window.SceneCustomer = SceneCustomer;
window.SectionHead = SectionHead;