// =====================================================
// Scene 02 — 决策人地图
// =====================================================
function SceneDecision() {
  const [active, setActive] = useState("wife");
  const dms = D.DECISION_MAKERS;
  const total = dms.reduce((s, d) => s + d.count, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in",
    style: {
      gridTemplateRows: "auto 1fr auto",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "MAP 03 \xB7 TRUE DECISION-MAKER MAP",
    title: "\u51B3\u7B56\u4EBA\u5730\u56FE",
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u591A\u5C11\u5BB6\u7ECF\u9500\u5546\u7684\u771F\u6B63\u51B3\u7B56\u4EBA, ", /*#__PURE__*/React.createElement("b", {
      className: "t1"
    }, "\u4E0D\u662F\u5408\u540C\u4E0A\u7684\u8001\u677F?"), " \u2014 \u7B2C\u4E00\u6B21\u6709\u4E86\u7B54\u6848\u3002")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 28,
      minHeight: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u5168\u96C6\u56E2 \xB7 \u771F\u5B9E\u51B3\u7B56\u4EBA\u6784\u6210", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "N = ", total.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 108,
      border: "1px solid var(--border-1)"
    }
  }, dms.map((d, i) => /*#__PURE__*/React.createElement("button", {
    key: d.key,
    onClick: () => setActive(d.key),
    style: {
      flex: d.count,
      background: active === d.key ? d.color : "transparent",
      color: active === d.key ? "var(--bg-0)" : "var(--t-1)",
      border: "none",
      borderRight: i < dms.length - 1 ? "1px solid var(--border-1)" : "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "background .2s, color .2s",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 32,
      fontWeight: 600
    }
  }, Math.round(d.count / total * 100), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      marginTop: 4
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 13,
      letterSpacing: "0.12em",
      color: active === d.key ? "var(--bg-0)" : "var(--t-4)",
      marginTop: 4
    }
  }, d.count.toLocaleString(), " \u5BB6")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      color: "var(--t-3)",
      fontSize: 16,
      lineHeight: 1.6
    }
  }, "\u203B \u7531\u4E1A\u52A1\u5458\u62DC\u8BBF\u4FE1\u53F7\u81EA\u52A8\u8403\u53D6 \xB7 \u7ECF ", /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, "3 \u6B21\u4EE5\u4E0A"), "\u591A\u6E90\u9A8C\u8BC1 \xB7 \u7F6E\u4FE1\u5EA6 ", /*#__PURE__*/React.createElement("b", {
    className: "amber mono"
  }, "\u2265 0.72"))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u62BD\u6837 200 \u5BB6\u7ECF\u9500\u5546 \xB7 \u51B3\u7B56\u4EBA\u6307\u7EB9", /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "CLICK CELLS")), /*#__PURE__*/React.createElement(DealerGrid, {
    active: active,
    setActive: setActive
  }))), /*#__PURE__*/React.createElement(PersonaCard, {
    d: dms.find(d => d.key === active)
  })), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u603B\u90E8\u7B2C\u4E00\u6B21\u80FD\u533A\u5206: \u8DDF\u8C01\u8C08, \u8C08\u4EC0\u4E48, \u7528\u4EC0\u4E48\u8BDD\u672F",
    right: "MAP 03 \xB7 IDENTITY CONFIDENCE 0.72+"
  }));
}
function DealerGrid({
  active,
  setActive
}) {
  const cells = useMemo(() => {
    const dms = D.DECISION_MAKERS;
    const cells = [];
    dms.forEach(d => {
      const n = Math.round(200 * d.count / D.DECISION_MAKERS.reduce((s, x) => s + x.count, 0));
      for (let i = 0; i < n; i++) cells.push(d);
    });
    // shuffle
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor((i * 1664525 + 1013904223) % 0xffffffff / 0xffffffff * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    return cells.slice(0, 200);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(20, 1fr)",
      gap: 4,
      flex: 1,
      alignContent: "start"
    }
  }, cells.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => setActive(c.key),
    style: {
      aspectRatio: "1",
      background: c.color,
      opacity: active === c.key ? 1 : 0.18,
      cursor: "pointer",
      transition: "opacity .2s",
      border: active === c.key ? "1px solid var(--t-1)" : "1px solid transparent"
    },
    title: c.name
  })));
}
function PersonaCard({
  d
}) {
  if (!d) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "col gap-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderTop: `3px solid ${d.color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 14,
      letterSpacing: "0.16em"
    }
  }, "FOCUS \xB7 DECISION MAKER"), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 54,
      fontWeight: 600,
      marginTop: 8,
      color: d.color
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 19,
      marginTop: 6
    }
  }, d.persona), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12,
      marginTop: 24,
      borderTop: "1px solid var(--border-1)",
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "metric-val",
    style: {
      fontSize: 42
    }
  }, d.count.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, "\u5BB6\u6570")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "metric-val",
    style: {
      fontSize: 42,
      color: d.color
    }
  }, d.weight, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, "\u56DE\u6B3E\u5F71\u54CD")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "metric-val",
    style: {
      fontSize: 42
    }
  }, "0.", Math.round(72 + Math.random() * 20)), /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, "\u753B\u50CF\u7F6E\u4FE1\u5EA6")))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u5EFA\u8BAE\u7B56\u7565 \xB7 \u603B\u90E8"), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 26,
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, d.tactic), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, tactics(d.key).map((t, i) => /*#__PURE__*/React.createElement("div", {
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
      color: d.color
    }
  }, "\u25B8"), /*#__PURE__*/React.createElement("span", null, t))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u65B0\u7EF4\u5EA6 \xB7 \u603B\u90E8\u80FD\u505A\u7684\u4E8B"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      fontSize: 17,
      color: "var(--t-2)",
      lineHeight: 1.5
    }
  }, strategicLevers(d.key).map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono amber",
    style: {
      marginRight: 8
    }
  }, "0", i + 1, "."), s)))));
}
function tactics(key) {
  switch (key) {
    case "boss":
      return ["标准 BD 话术包 · 政策为主轴", "数据透明 · 不绕弯子", "经营案例对标(同区域同体量)"];
    case "wife":
      return ["专属内容包 · 家庭场景 · 子女教育", "邀请进 \"老板娘联盟\" 私域社群", "话术避免 \"硬指标\" · 强调 \"家\""];
    case "second":
      return ["二代俱乐部 · 名校私董 · 数字化共创", "RFM + 大数据培训 · 双向赋能", "新品 / 新渠道首发权 · 给舞台"];
    case "pro":
      return ["KPI 导向 · 月度对账可视化", "联动 SKU 利润矩阵 · 透明返利", "经销商内部数据共享(经过授权)"];
    default:
      return ["持续观察 · 不动用资源", "派遣高级 BD 重新画像 · 90 天内出结论"];
  }
}
function strategicLevers(key) {
  switch (key) {
    case "boss":
      return ["新品全国上市 · 优先在此群体内启动", "经营案例对标:释放老板的对标欲", "政策颗粒度可粗一些 · 重点是节奏"];
    case "wife":
      return ["市场部专门设计 \"打动老板娘\" 内容矩阵", "面销培训补充家庭沟通话术", "节日礼盒走 \"家人路线\" 而非 \"客户路线\""];
    case "second":
      return ["总部成立 \"二代经销商联盟\" 私董组织", "联合海外参访 · 加深品牌认同", "提供 SaaS 工具 · 把品牌嵌进他们的系统"];
    case "pro":
      return ["数据接口对齐 · 双向开放", "考核口径与品牌指标绑定 · 利益对齐", "可作为 \"模板经销商\" 输出最佳实践"];
    default:
      return ["暂不归类 · 90 天观察期", "样本完整后再纳入资源分配模型"];
  }
}
window.SceneDecision = SceneDecision;