// =====================================================
// Scene 06 — 经销商档案 · 单家 360° 画像
// =====================================================
const DOSSIERS = [{
  id: "henan-chen",
  name: "豫北 · 陈氏贸易",
  region: "华中",
  province: "河南 · 安阳",
  revenue: "2.4亿",
  tenure: "合作 14 年",
  headcount: "82 人 · 仓 5400 m²",
  status: {
    label: "高风险 · 立即介入",
    color: "var(--red)"
  },
  customer: {
    type: "利润型",
    color: "var(--amber)",
    note: "政策敏感, 算账思维, 老业务员说\"陈总三句话不离返点\""
  },
  decision: {
    who: "老板娘 (主) / 二代 (副)",
    color: "var(--pink)",
    note: "老板病后逐步退居二线 · 一切大单要老板娘点头"
  },
  capability: {
    label: "真实强 (但被竞品压货)",
    color: "var(--green)",
    dims: [{
      k: "终端覆盖",
      v: 0.82
    }, {
      k: "仓储物流",
      v: 0.74
    }, {
      k: "动销能力",
      v: 0.78
    }, {
      k: "回款周期",
      v: 0.55
    }, {
      k: "二代意愿",
      v: 0.42
    }, {
      k: "团队厚度",
      v: 0.68
    }]
  },
  risk: {
    score: 0.86,
    label: "87% · 12 周内流失概率",
    color: "var(--red)"
  },
  network: {
    label: "豫南·赵氏 同族 · 竞品 X 双重渗透",
    color: "var(--purple)"
  },
  timeline: [{
    d: "47 天前",
    who: "李哥",
    e: "首次发现竞品业务员在场, 老板娘回避见面",
    c: "var(--amber)"
  }, {
    d: "38 天前",
    who: "李哥",
    e: "陈列位下移: 端架 → 第三层货架",
    c: "var(--amber)"
  }, {
    d: "29 天前",
    who: "孙姐",
    e: "二代询问 \"如果换品牌, 总部支持有多大\"",
    c: "var(--red)"
  }, {
    d: "22 天前",
    who: "李哥",
    e: "回款周期由 22 天延长到 34 天",
    c: "var(--red)"
  }, {
    d: "14 天前",
    who: "区域总",
    e: "陈总缺席季度沟通会, 由职业经理人代",
    c: "var(--amber)"
  }, {
    d: "9 天前",
    who: "李哥",
    e: "竞品 X 区域总两次拜访 · 共 5.5 小时",
    c: "var(--red)"
  }, {
    d: "3 天前",
    who: "李哥",
    e: "老板娘提及 \"我们也是要算账的, 你们的政策\u2026\"",
    c: "var(--red)"
  }, {
    d: "今天",
    who: "系统",
    e: "档案置信度 0.86 · 触发救援预警",
    c: "var(--amber)"
  }],
  actions: [{
    p: "P0",
    who: "陆总 / 销售总裁",
    what: "本周内主动登门 · 携带 \"老板娘专属返点 + 二代俱乐部邀请\"",
    when: "48 小时"
  }, {
    p: "P1",
    who: "市场部",
    what: "为 \"老板娘\" 准备家庭场景内容包(子女教育资源置换)",
    when: "5 天"
  }, {
    p: "P1",
    who: "供应链",
    what: "回款账期临时下调至 18 天 · 90 天内",
    when: "立即"
  }, {
    p: "P2",
    who: "区域 BD 李哥",
    what: "切断与豫南赵氏的联动信号 · 收回串货返利",
    when: "本月"
  }],
  miniNet: {
    core: "陈氏",
    links: ["豫南·赵氏(同族)", "★ 竞品 X (双向渗透)", "鄂中·吴氏(同省同盟)"]
  },
  transcript: [{
    ts: "14:22",
    who: "王哥(我方)",
    line: "陈总, 上次说的端架资源我已经申请下来了, 这周可以铺新品。",
    c: "var(--cyan)"
  }, {
    ts: "14:23",
    who: "老板娘",
    line: "新品先放着吧, 厂里这批量给我们的政策能再谈谈不?",
    c: "var(--pink)"
  }, {
    ts: "14:25",
    who: "王哥",
    line: "您是说返点的事? 我可以申请专项。",
    c: "var(--cyan)"
  }, {
    ts: "14:26",
    who: "老板娘",
    line: "X 牌的人昨天又来了, 给的条件比你们好一截。要不你回去问问。",
    c: "var(--red)"
  }, {
    ts: "14:28",
    who: "陈二代",
    line: "妈, 我想问下他们二代有没有什么交流的圈子, 上次听刘哥说\u2026",
    c: "var(--purple)"
  }, {
    ts: "14:30",
    who: "王哥",
    line: "(语音备忘) 二代主动提及交流圈, 是切入点。",
    c: "var(--amber)"
  }],
  competitor: {
    brand: "★ X 品牌",
    since: "62 天前进入视野",
    freq: "12 次拜访 / 30 天",
    offer: "首批返点高 3.2% · 账期延长 15 天 · 二代海外参访",
    sentiment: "渗透中 · 老板娘态度开放, 老板抵触, 二代倾向",
    threat: 0.78
  },
  kpis: [{
    m: "去年Q3",
    rev: 6.2,
    ar: 22,
    dist: 0.78
  }, {
    m: "去年Q4",
    rev: 6.8,
    ar: 22,
    dist: 0.80
  }, {
    m: "今年Q1",
    rev: 6.5,
    ar: 24,
    dist: 0.79
  }, {
    m: "今年Q2",
    rev: 5.4,
    ar: 28,
    dist: 0.74
  }, {
    m: "Q3 至今",
    rev: 4.2,
    ar: 34,
    dist: 0.68
  }],
  family: [{
    n: "陈父 (创始人)",
    r: "退居二线 · 健康问题",
    a: "高(已弱)",
    c: "var(--green)"
  }, {
    n: "陈母 (老板娘)",
    r: "实际决策人 · 财务/政策",
    a: "中(摇摆)",
    c: "var(--amber)"
  }, {
    n: "陈大 (长子)",
    r: "运营总监 · 接班候选",
    a: "中(算账)",
    c: "var(--amber)"
  }, {
    n: "陈二 (二代)",
    r: "海外回国 · 数字化推手",
    a: "低(对 X 牌好奇)",
    c: "var(--red)"
  }, {
    n: "李姨 (老板娘姐妹)",
    r: "区域采购 · 关联豫南赵氏",
    a: "未识别",
    c: "var(--t-3)"
  }],
  playbook: [{
    phase: "0–7 天 · 止血",
    color: "var(--red)",
    steps: ["陆总携销售总裁登门 · 与老板娘单独会谈 90 分钟", "拿出 \"老板娘专属\" 返点方案 (3.5%) · 不走标准流程", "邀请陈二代加入\"二代俱乐部\"5 月深圳活动", "供应链 24h 内将账期临时调整至 18 天"]
  }, {
    phase: "7–30 天 · 重建关系",
    color: "var(--amber)",
    steps: ["区域 BD 拜访频次由 月3次 → 每周", "市场部为老板娘定制家庭场景内容 (教育/养生)", "切断与豫南赵氏的串货返利通道", "对竞品 X 在该客户拜访行为做实时反制"]
  }, {
    phase: "30–90 天 · 锁定二代",
    color: "var(--cyan)",
    steps: ["陈二代加入二代俱乐部正式名册", "邀请二代参与新品共创 · 给舞台", "给陈氏分配高端新品华中首发权 (产品差异化)", "90 天复盘 · 重新评估画像 + 决定后续投入"]
  }]
}, {
  id: "jiangsu-zhou",
  name: "苏南 · 周氏批发",
  region: "华东",
  province: "江苏 · 无锡",
  revenue: "3.1亿",
  tenure: "合作 22 年",
  headcount: "146 人 · 仓 9200 m²",
  status: {
    label: "高风险 · 重点保护",
    color: "var(--red)"
  },
  customer: {
    type: "死忠型 → 利润型",
    color: "var(--green)",
    note: "从前是死忠, 老周接班后开始算账"
  },
  decision: {
    who: "老板娘 + 二代联合",
    color: "var(--pink)",
    note: "老周已不再亲自经营 · 二代留学回国 6 个月"
  },
  capability: {
    label: "真实强 · 标杆",
    color: "var(--green)",
    dims: [{
      k: "终端覆盖",
      v: 0.92
    }, {
      k: "仓储物流",
      v: 0.88
    }, {
      k: "动销能力",
      v: 0.85
    }, {
      k: "回款周期",
      v: 0.72
    }, {
      k: "二代意愿",
      v: 0.80
    }, {
      k: "团队厚度",
      v: 0.86
    }]
  },
  risk: {
    score: 0.81,
    label: "81% · 价盘异常 + 回款拉长",
    color: "var(--red)"
  },
  network: {
    label: "亲族簇核心 · 周氏一族 5 家联动",
    color: "var(--pink)"
  },
  timeline: [{
    d: "29 天前",
    who: "周姐",
    e: "陈列接待规格下降, 由副总接待",
    c: "var(--amber)"
  }, {
    d: "22 天前",
    who: "周姐",
    e: "老板娘询问竞品价盘 3 次",
    c: "var(--amber)"
  }, {
    d: "12 天前",
    who: "周姐",
    e: "回款周期由 22 天延长到 34 天",
    c: "var(--red)"
  }, {
    d: "5 天前",
    who: "系统",
    e: "亲族簇内 嘉兴·周氏小舅子 异常进货 +180%",
    c: "var(--red)"
  }, {
    d: "今天",
    who: "系统",
    e: "二代独立开仓信号 · 工商变更触发",
    c: "var(--red)"
  }],
  actions: [{
    p: "P0",
    who: "陆总",
    what: "亲赴无锡 · 与老周 + 二代 + 老板娘三方会谈",
    when: "本周"
  }, {
    p: "P1",
    who: "二代俱乐部",
    what: "邀请周二代加入 · 海外参访名额",
    when: "本月"
  }, {
    p: "P2",
    who: "区域 BD",
    what: "亲族簇 5 家同步走访 · 防止集体倒戈",
    when: "30 天"
  }],
  miniNet: {
    core: "周氏",
    links: ["周氏小舅子(嘉兴)", "周氏二代(上海)", "周氏堂弟(苏中)", "同乡-嘉兴"]
  },
  transcript: [{
    ts: "10:08",
    who: "周姐(我方)",
    line: "周总, 老板娘今天身体怎么样? 上回提的政策我们这边批了。",
    c: "var(--cyan)"
  }, {
    ts: "10:09",
    who: "周二代",
    line: "我妈今天不在, 我父亲让我跟你谈。",
    c: "var(--purple)"
  }, {
    ts: "10:10",
    who: "周姐",
    line: "好。听说你最近在筹划新仓?",
    c: "var(--cyan)"
  }, {
    ts: "10:12",
    who: "周二代",
    line: "对, 苏中我想自己开一家。和家里业务区分开。",
    c: "var(--red)"
  }],
  competitor: {
    brand: "★ Y 品牌 + Z 品牌联合",
    since: "44 天前异常活跃",
    freq: "8 次 / 30 天",
    offer: "二代独立创业支持包 · 30 万入仓补贴",
    sentiment: "周二代倾向, 老周抵触, 老板娘观望",
    threat: 0.74
  },
  kpis: [{
    m: "去年Q3",
    rev: 7.8,
    ar: 22,
    dist: 0.88
  }, {
    m: "去年Q4",
    rev: 8.2,
    ar: 22,
    dist: 0.89
  }, {
    m: "今年Q1",
    rev: 7.9,
    ar: 23,
    dist: 0.88
  }, {
    m: "今年Q2",
    rev: 7.4,
    ar: 28,
    dist: 0.85
  }, {
    m: "Q3 至今",
    rev: 6.0,
    ar: 34,
    dist: 0.82
  }],
  family: [{
    n: "老周 (创始人)",
    r: "已退 · 顾问角色",
    a: "高(已弱)",
    c: "var(--green)"
  }, {
    n: "周母 (老板娘)",
    r: "财务+人事大权",
    a: "高(波动)",
    c: "var(--amber)"
  }, {
    n: "周二代",
    r: "运营 · 留学派 · 想自立门户",
    a: "低(对竞品好奇)",
    c: "var(--red)"
  }, {
    n: "周小舅",
    r: "嘉兴分仓 · 异常进货",
    a: "未识别(信号警示)",
    c: "var(--red)"
  }, {
    n: "周堂弟 (苏中)",
    r: "亲族簇成员",
    a: "中",
    c: "var(--amber)"
  }],
  playbook: [{
    phase: "0–7 天 · 锁定老周",
    color: "var(--red)",
    steps: ["陆总亲赴无锡 · 与老周私下吃饭, 重提 22 年情谊", "技术总裁 + 二代沟通 · 把二代纳入数字化共创", "老板娘专属 · 教育 / 健康资源置换包", "供应链将账期临时回到 18 天 (90 天内)"]
  }, {
    phase: "7–30 天 · 二代留人",
    color: "var(--amber)",
    steps: ["二代俱乐部欧美参访名额给周二代", "邀请共建 SaaS 仓库管理模块 (给舞台)", "亲族簇 5 家同步走访 · 防止集体倒戈", "对嘉兴小舅子的异常进货流向做精细跟踪"]
  }, {
    phase: "30–90 天 · 簇内绑定",
    color: "var(--cyan)",
    steps: ["推动 \"周氏一族联合采购联盟\" 概念", "苏中新仓改为 \"我方授权\" 而非独立", "周二代上升通道 → 区域顾问委员会", "90 天复盘 · 重新评估 + 解除危险信号"]
  }]
}, {
  id: "shandong-sun",
  name: "鲁西 · 孙氏商贸",
  region: "华东",
  province: "山东 · 聊城",
  revenue: "1.6亿",
  tenure: "合作 9 年",
  headcount: "54 人 · 仓 3800 m²",
  status: {
    label: "稳定 · 标杆经销商",
    color: "var(--green)"
  },
  customer: {
    type: "死忠型",
    color: "var(--green)",
    note: "孙总信奉 \"只做一个牌子\", 团队认同度高"
  },
  decision: {
    who: "老板 (单点决策)",
    color: "var(--cyan)",
    note: "技术派出身 · 二代仍在锻炼期"
  },
  capability: {
    label: "言行一致 · 言低于行",
    color: "var(--cyan)",
    dims: [{
      k: "终端覆盖",
      v: 0.75
    }, {
      k: "仓储物流",
      v: 0.78
    }, {
      k: "动销能力",
      v: 0.80
    }, {
      k: "回款周期",
      v: 0.85
    }, {
      k: "二代意愿",
      v: 0.60
    }, {
      k: "团队厚度",
      v: 0.74
    }]
  },
  risk: {
    score: 0.12,
    label: "12% · 低风险",
    color: "var(--green)"
  },
  network: {
    label: "二代俱乐部隐性成员",
    color: "var(--green)"
  },
  timeline: [{
    d: "60 天前",
    who: "孙哥",
    e: "孙总主动询问新品试销名额",
    c: "var(--green)"
  }, {
    d: "30 天前",
    who: "孙哥",
    e: "周边 3 家经销商前来取经",
    c: "var(--green)"
  }, {
    d: "14 天前",
    who: "孙哥",
    e: "孙二代加入 \"二代俱乐部\" 招募意向",
    c: "var(--green)"
  }, {
    d: "今天",
    who: "系统",
    e: "档案保持稳定 · 6 个月无风险信号",
    c: "var(--green)"
  }],
  actions: [{
    p: "P0",
    who: "新品总监",
    what: "新品全国首发 · 优先在孙氏铺货",
    when: "下季度"
  }, {
    p: "P1",
    who: "市场部",
    what: "孙氏案例 → 标杆经销商内刊",
    when: "本月"
  }, {
    p: "P2",
    who: "二代俱乐部",
    what: "孙二代正式邀请 · 给舞台",
    when: "本月"
  }],
  miniNet: {
    core: "孙氏",
    links: ["孙二代(齐鲁)", "二代俱乐部", "鲁中·王氏(标杆同盟)"]
  },
  transcript: [{
    ts: "15:02",
    who: "孙哥(我方)",
    line: "孙总, 新品下季度全国首发, 您这边愿意做试销吗?",
    c: "var(--cyan)"
  }, {
    ts: "15:03",
    who: "孙总",
    line: "可以, 别的牌子不用谈了, 我就跟你们一家干。",
    c: "var(--green)"
  }, {
    ts: "15:05",
    who: "孙总",
    line: "另外我儿子最近常提到\"二代俱乐部\", 你们要不要也叫他?",
    c: "var(--green)"
  }],
  competitor: {
    brand: "无活跃竞品",
    since: "—",
    freq: "0 次 / 30 天",
    offer: "—",
    sentiment: "全员高度认同, 团队稳定",
    threat: 0.08
  },
  kpis: [{
    m: "去年Q3",
    rev: 3.8,
    ar: 18,
    dist: 0.74
  }, {
    m: "去年Q4",
    rev: 4.1,
    ar: 18,
    dist: 0.75
  }, {
    m: "今年Q1",
    rev: 4.0,
    ar: 17,
    dist: 0.76
  }, {
    m: "今年Q2",
    rev: 4.3,
    ar: 17,
    dist: 0.78
  }, {
    m: "Q3 至今",
    rev: 4.4,
    ar: 17,
    dist: 0.80
  }],
  family: [{
    n: "孙总 (创始人)",
    r: "事必躬亲 · 单点决策",
    a: "高",
    c: "var(--green)"
  }, {
    n: "孙太 (夫人)",
    r: "财务支持 · 不干预业务",
    a: "中",
    c: "var(--cyan)"
  }, {
    n: "孙二代",
    r: "锻炼期 · 对数字化好奇",
    a: "中(可培养)",
    c: "var(--cyan)"
  }],
  playbook: [{
    phase: "稳态运营",
    color: "var(--green)",
    steps: ["新品全国首发 · 优先孙氏铺货", "孙氏案例 → 标杆经销商内刊 + 季度交流", "孙二代加入二代俱乐部 · 培养接班", "保持当前节奏 · 不打扰运营"]
  }]
}];
function SceneDossier() {
  const [selId, setSelId] = useState(DOSSIERS[0].id);
  const dossier = DOSSIERS.find(d => d.id === selId);
  return /*#__PURE__*/React.createElement("div", {
    className: "scene fade-in"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "MAP 06 \xB7 DEALER 360\xB0 DOSSIER",
    title: "\u7ECF\u9500\u5546\u6863\u6848\u753B\u50CF",
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\u628A 5 \u5F20\u5730\u56FE\u6C47\u805A\u5230 ", /*#__PURE__*/React.createElement("b", {
      className: "t1"
    }, "\u540C\u4E00\u5BB6\u7ECF\u9500\u5546"), " \u8EAB\u4E0A\u3002", /*#__PURE__*/React.createElement("br", null), "\u8FD9\u662F ", /*#__PURE__*/React.createElement("b", {
      className: "amber"
    }, "\u4E00\u7EBF\u5927\u533A\u603B / \u603B\u88C1"), " \u8FDB\u5165\u4E00\u5BB6\u7ECF\u9500\u5546\u65F6, \u5C4F\u5E55\u4E0A\u5E94\u8BE5\u770B\u5230\u7684\u5168\u90E8\u4FE1\u606F\u3002")
  }), /*#__PURE__*/React.createElement(DossierHero, {
    dossier: dossier,
    all: DOSSIERS,
    onSelect: setSelId
  }), /*#__PURE__*/React.createElement(BlockHeader, {
    index: "01",
    title: "360\xB0 \u5FEB\u7167",
    sub: "5 \u5F20\u5730\u56FE\u5728\u8FD9\u5BB6\u7ECF\u9500\u5546\u8EAB\u4E0A\u7684\u77AC\u65F6\u5207\u7247"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr 1.05fr 0.9fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(DossierProfile, {
    d: dossier
  }), /*#__PURE__*/React.createElement(DossierTimeline, {
    d: dossier
  }), /*#__PURE__*/React.createElement(DossierActions, {
    d: dossier
  })), /*#__PURE__*/React.createElement(BlockHeader, {
    index: "02",
    title: "\u6700\u8FD1\u4E00\u6B21\u62DC\u8BBF \xB7 \u9006\u5411\u8FD8\u539F",
    sub: "\u738B\u54E5\u7684\u8BED\u97F3\u5907\u5FD8 \u2192 \u7ED3\u6784\u5316\u7C92\u5B50, \u5E76\u53D1\u73B0\u4E86\u4EC0\u4E48"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.25fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(DossierTranscript, {
    d: dossier
  }), /*#__PURE__*/React.createElement(DossierCompetitor, {
    d: dossier
  })), /*#__PURE__*/React.createElement(BlockHeader, {
    index: "03",
    title: "\u7ED3\u6784\u6027\u80CC\u666F",
    sub: "\u8FC7\u53BB 5 \u4E2A\u5B63\u5EA6\u7684\u4E1A\u52A1\u8D8B\u52BF + \u51B3\u7B56\u5708\u5173\u7CFB\u7ED3\u6784"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(DossierKPI, {
    d: dossier
  }), /*#__PURE__*/React.createElement(DossierFamily, {
    d: dossier
  })), /*#__PURE__*/React.createElement(BlockHeader, {
    index: "04",
    title: "90 \u5929\u4F5C\u6218\u624B\u518C",
    sub: "\u6309\u5468\u6B21\u7EC6\u5316\u7684\u884C\u52A8\u5305 \xB7 \u8D23\u4EFB\u4EBA \xB7 \u8D44\u6E90 \xB7 \u590D\u76D8\u8282\u70B9"
  }), /*#__PURE__*/React.createElement(DossierPlaybook, {
    d: dossier
  }), /*#__PURE__*/React.createElement(SceneFooter, {
    left: "\u8FC7\u53BB \u2014 \u4FE1\u606F\u6563\u5728 5 \u4E2A\u4EBA\u8111\u5B50\u91CC / \u73B0\u5728 \u2014 \u4E00\u4EFD\u6863\u6848, \u5B8C\u6574\u5448\u73B0\u4E00\u5BB6\u7ECF\u9500\u5546",
    right: "MAP 06 \xB7 360\xB0 SYNTHESIS \xB7 CONFIDENCE 0.74+"
  }));
}
function BlockHeader({
  index,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 24,
      marginTop: 16,
      paddingBottom: 14,
      borderBottom: "1px solid var(--border-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 18,
      letterSpacing: "0.2em",
      color: "var(--amber)"
    }
  }, "BLOCK \xB7 ", index), /*#__PURE__*/React.createElement("span", {
    className: "serif",
    style: {
      fontSize: 36,
      fontWeight: 600,
      color: "var(--t-1)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "t3",
    style: {
      fontSize: 19,
      marginLeft: "auto"
    }
  }, sub));
}

// ============================================================
function DossierHero({
  dossier,
  all,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 32,
      alignItems: "center",
      padding: "22px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono t3",
    style: {
      fontSize: 16,
      letterSpacing: "0.16em"
    }
  }, "DEALER \xB7 ", dossier.region), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 50,
      fontWeight: 600,
      lineHeight: 1.05
    }
  }, dossier.name), /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 17,
      marginTop: 4
    }
  }, dossier.province, " \xB7 ", dossier.tenure, " \xB7 ", dossier.headcount)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 30,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(KV, {
    v: dossier.revenue,
    l: "\u5E74\u56DE\u6B3E",
    big: true
  }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(KV, {
    v: dossier.customer.type,
    l: "\u5BA2\u6237\u7C7B\u578B",
    color: dossier.customer.color
  }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(KV, {
    v: dossier.decision.who.split(" ")[0],
    l: "\u51B3\u7B56\u4EBA",
    color: dossier.decision.color
  }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(KV, {
    v: Math.round(dossier.risk.score * 100) + "%",
    l: "\u6D41\u5931\u6982\u7387",
    color: dossier.risk.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px",
      border: `1px solid ${dossier.status.color}`,
      color: dossier.status.color,
      fontFamily: "var(--f-mono)",
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: "0.1em",
      whiteSpace: "nowrap"
    }
  }, dossier.status.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, all.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    onClick: () => onSelect(o.id),
    style: {
      background: o.id === dossier.id ? "var(--bg-3)" : "transparent",
      border: "1px solid " + (o.id === dossier.id ? "var(--amber)" : "var(--border-1)"),
      color: o.id === dossier.id ? "var(--amber)" : "var(--t-2)",
      padding: "10px 16px",
      fontSize: 16,
      fontFamily: "var(--f-mono)",
      cursor: "pointer",
      letterSpacing: "0.06em"
    }
  }, o.name.split(" · ")[0])))));
}
function KV({
  v,
  l,
  big,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minWidth: 130
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: big ? "mono" : "serif",
    style: {
      fontSize: big ? 44 : 30,
      fontWeight: 600,
      color: color || "var(--t-1)",
      lineHeight: 1
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "t3",
    style: {
      fontSize: 16,
      letterSpacing: "0.04em"
    }
  }, l));
}
function Sep() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: "var(--border-1)"
    }
  });
}

// ============================================================
function DossierProfile({
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderLeft: `3px solid ${d.customer.color}`,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      marginBottom: 10
    }
  }, "\u5BA2\u6237\u7C7B\u578B", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "MAP 01")), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 34,
      fontWeight: 600,
      color: d.customer.color,
      lineHeight: 1.1
    }
  }, d.customer.type), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 18,
      marginTop: 10,
      lineHeight: 1.5
    }
  }, d.customer.note)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderLeft: `3px solid ${d.decision.color}`,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      marginBottom: 10
    }
  }, "\u51B3\u7B56\u4EBA", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "MAP 03")), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: d.decision.color,
      lineHeight: 1.2
    }
  }, d.decision.who), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 18,
      marginTop: 10,
      lineHeight: 1.5
    }
  }, d.decision.note)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderLeft: `3px solid ${d.capability.color}`,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      marginBottom: 10
    }
  }, "\u80FD\u529B\u8BC4\u4F30 \xB7 6 \u7EF4", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "MAP 05")), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: d.capability.color,
      lineHeight: 1.2
    }
  }, d.capability.label), /*#__PURE__*/React.createElement(CapabilityRadar, {
    dims: d.capability.dims,
    color: d.capability.color
  })));
}
function CapabilityRadar({
  dims,
  color
}) {
  const cx = 175,
    cy = 165,
    R = 115;
  const n = dims.length;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + i / n * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const poly = dims.map((d, i) => pt(i, R * d.v).join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 350 360",
    style: {
      width: "100%",
      marginTop: 12
    }
  }, rings.map((r, i) => /*#__PURE__*/React.createElement("polygon", {
    key: i,
    points: dims.map((_, j) => pt(j, R * r).join(",")).join(" "),
    fill: "none",
    stroke: "var(--border-1)",
    strokeDasharray: i === rings.length - 1 ? "0" : "2 3"
  })), dims.map((d, i) => {
    const [px, py] = pt(i, R);
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: cx,
      y1: cy,
      x2: px,
      y2: py,
      stroke: "var(--border-1)",
      strokeDasharray: "2 4"
    });
  }), /*#__PURE__*/React.createElement("polygon", {
    points: poly,
    fill: color,
    fillOpacity: "0.20",
    stroke: color,
    strokeWidth: "2.5"
  }), dims.map((d, i) => {
    const [px, py] = pt(i, R * d.v);
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: px,
      cy: py,
      r: "5",
      fill: color
    });
  }), dims.map((d, i) => {
    const [px, py] = pt(i, R + 32);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("text", {
      x: px,
      y: py,
      textAnchor: "middle",
      style: {
        fill: "var(--t-2)",
        fontSize: 17,
        fontFamily: "var(--f-sans)",
        fontWeight: 500
      }
    }, d.k), /*#__PURE__*/React.createElement("text", {
      x: px,
      y: py + 18,
      textAnchor: "middle",
      style: {
        fill: color,
        fontSize: 14,
        fontFamily: "var(--f-mono)",
        fontWeight: 600
      }
    }, Math.round(d.v * 100)));
  }));
}

// ============================================================
function DossierTimeline({
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      display: "flex",
      flexDirection: "column",
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u4FE1\u53F7\u7C92\u5B50 \xB7 \u8FD1 60 \u5929", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, d.timeline.length, " EVENTS")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      paddingLeft: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 9,
      top: 8,
      bottom: 8,
      width: 2,
      background: "var(--border-1)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, d.timeline.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -26,
      top: 6,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "var(--bg-1)",
      border: `3px solid ${t.c}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "baseline",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 17,
      color: t.c,
      fontWeight: 600,
      minWidth: 78
    }
  }, t.d), /*#__PURE__*/React.createElement("span", {
    className: "t4 mono",
    style: {
      fontSize: 15,
      letterSpacing: "0.06em"
    }
  }, t.who)), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 19,
      lineHeight: 1.45
    }
  }, t.e))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-1)",
      paddingTop: 14,
      marginTop: 18,
      display: "flex",
      justifyContent: "space-between",
      color: "var(--t-4)",
      fontFamily: "var(--f-mono)",
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u203B \u7531\u4E1A\u52A1\u5458\u62DC\u8BBF\u4FE1\u53F7 + \u4E1A\u52A1\u7ED3\u679C\u4EA4\u53C9\u9A8C\u8BC1"), /*#__PURE__*/React.createElement("span", null, "+0.18 \u5468\u4E00\u65B0\u589E")));
}

// ============================================================
function DossierActions({
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col",
    style: {
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderLeft: `3px solid ${d.risk.color}`,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      marginBottom: 10
    }
  }, "\u98CE\u9669\u8BC4\u4F30", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "MAP 04")), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 56,
      color: d.risk.color,
      fontWeight: 600,
      lineHeight: 1
    }
  }, Math.round(d.risk.score * 100), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      color: "var(--t-3)"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 17,
      marginTop: 10,
      lineHeight: 1.45
    }
  }, d.risk.label)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderLeft: `3px solid ${d.network.color}`,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      marginBottom: 10
    }
  }, "\u5173\u7CFB\u7F51\u7EDC\u4F4D\u7F6E", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "MAP 02")), /*#__PURE__*/React.createElement(MiniNetwork, {
    core: d.miniNet.core,
    links: d.miniNet.links,
    color: d.network.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 17,
      marginTop: 8,
      lineHeight: 1.45
    }
  }, d.network.label)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u603B\u90E8 \xB7 \u5EFA\u8BAE\u884C\u52A8", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "AUTO-GEN")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, d.actions.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 16,
      padding: "14px 16px",
      background: "var(--bg-2)",
      borderLeft: `3px solid ${a.p === "P0" ? "var(--red)" : a.p === "P1" ? "var(--amber)" : "var(--cyan)"}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 58
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 20,
      fontWeight: 600,
      color: a.p === "P0" ? "var(--red)" : a.p === "P1" ? "var(--amber)" : "var(--cyan)"
    }
  }, a.p), /*#__PURE__*/React.createElement("span", {
    className: "mono t4",
    style: {
      fontSize: 13,
      marginTop: 4
    }
  }, a.when)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono t3",
    style: {
      fontSize: 14,
      letterSpacing: "0.08em",
      marginBottom: 4
    }
  }, a.who), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 17,
      lineHeight: 1.45
    }
  }, a.what))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginTop: 18,
      width: "100%",
      justifyContent: "center",
      padding: "16px 24px",
      fontSize: 19
    }
  }, "\u2192 \u4E00\u952E\u6D3E\u53D1 \u5DE5\u5355 / \u90AE\u4EF6 / \u65E5\u5386")));
}
function MiniNetwork({
  core,
  links,
  color
}) {
  const cx = 170,
    cy = 80;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 340 180",
    style: {
      width: "100%",
      height: 180
    }
  }, links.map((_, i) => {
    const a = i / links.length * Math.PI - Math.PI / 2;
    const ex = cx + Math.cos(a) * 115;
    const ey = cy + Math.sin(a) * 60 + 30;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: cx,
      y1: cy,
      x2: ex,
      y2: ey,
      stroke: color,
      strokeOpacity: "0.5",
      strokeWidth: "1.5"
    });
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "28",
    fill: color
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 7,
    textAnchor: "middle",
    style: {
      fill: "var(--bg-0)",
      fontSize: 19,
      fontWeight: 700
    }
  }, core), links.map((l, i) => {
    const a = i / links.length * Math.PI - Math.PI / 2;
    const ex = cx + Math.cos(a) * 115;
    const ey = cy + Math.sin(a) * 60 + 30;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: ex,
      cy: ey,
      r: "8",
      fill: "var(--bg-2)",
      stroke: color,
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: ex,
      y: ey + 22,
      textAnchor: "middle",
      style: {
        fill: "var(--t-2)",
        fontSize: 14,
        fontFamily: "var(--f-mono)"
      }
    }, l));
  }));
}

// ============================================================
// BLOCK 02 · Visit transcript
function DossierTranscript({
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u8FD1\u4E00\u6B21\u62DC\u8BBF \xB7 \u5BF9\u8BDD\u539F\u6587", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "VOICE \u2192 STRUCTURED")), /*#__PURE__*/React.createElement("div", {
    className: "t3",
    style: {
      fontSize: 15,
      fontFamily: "var(--f-mono)",
      letterSpacing: "0.1em",
      marginBottom: 18
    }
  }, "VISIT-#84217 \xB7 2026-05-21 14:22 \xB7 \u62DC\u8BBF\u65F6\u957F 12'04\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, d.transcript.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "60px 130px 1fr",
      gap: 16,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono t4",
    style: {
      fontSize: 15
    }
  }, t.ts), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 16,
      color: t.c,
      fontWeight: 600
    }
  }, t.who), /*#__PURE__*/React.createElement("span", {
    className: "t1",
    style: {
      fontSize: 19,
      lineHeight: 1.5
    }
  }, "\u201C", t.line, "\u201D")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      padding: "16px 18px",
      background: "var(--bg-2)",
      borderLeft: "3px solid var(--amber)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 14,
      color: "var(--amber)",
      letterSpacing: "0.16em",
      marginBottom: 6
    }
  }, "SIGNAL EXTRACTION \xB7 5 PARTICLES"), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 18,
      lineHeight: 1.6
    }
  }, "\u2460 \u5BA2\u6237\u7C7B\u578B\uFF1A\u8001\u677F\u5A18\u4E3B\u52A8\u7B97\u8D26 \u2192 ", /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, "\u5229\u6DA6\u578B"), "(\u7F6E\u4FE1 0.92) \xB7 \u2461 \u51B3\u7B56\u4EBA\uFF1A\u8001\u677F\u4E0D\u5728\u573A, \u8001\u677F\u5A18\u4E3B\u8C08 \u2192 ", /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, "\u8001\u677F\u5A18 \u4E3B"), " \xB7 \u2462 \u80FD\u529B\uFF1A\u80FD\u8BF4\u51FA\u5177\u4F53\u8FD4\u70B9\u5FC3\u7406\u4EF7 \u2192 ", /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, "\u771F\u5B9E\u5F3A"), " \xB7 \u2463 \u98CE\u9669\uFF1A\u63D0\u53CA \u201CX \u724C\u6761\u4EF6\u597D\u4E00\u622A\u201D \u2192 ", /*#__PURE__*/React.createElement("b", {
    className: "red"
  }, "\u9AD8\u98CE\u9669\u4FE1\u53F7"), " \xB7 \u2464 \u5173\u7CFB\uFF1A\u4E8C\u4EE3\u8BE2\u95EE\u4EA4\u6D41\u5708 \u2192 ", /*#__PURE__*/React.createElement("b", {
    className: "amber"
  }, "\u5207\u5165\u70B9"))));
}

// ============================================================
// BLOCK 02 · Competitor card
function DossierCompetitor({
  d
}) {
  const c = d.competitor;
  const threatPct = Math.round(c.threat * 100);
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      borderTop: "3px solid var(--red)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u7ADE\u54C1\u6E17\u900F\u60C5\u62A5", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "COMPETITIVE INTEL")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 32,
      fontWeight: 600,
      color: "var(--red)"
    }
  }, c.brand), /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 15,
      marginTop: 4
    }
  }, c.since)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 48,
      color: "var(--red)",
      fontWeight: 600,
      lineHeight: 1
    }
  }, threatPct, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      color: "var(--t-3)"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "t3",
    style: {
      fontSize: 14,
      marginTop: 4
    }
  }, "\u7ADE\u4E89\u538B\u529B\u6307\u6570"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "var(--bg-3)",
      marginTop: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: threatPct + "%",
      height: "100%",
      background: "var(--red)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "110px 1fr",
      gap: "12px 18px",
      fontSize: 17
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t3"
  }, "\u62DC\u8BBF\u9891\u6B21"), " ", /*#__PURE__*/React.createElement("span", {
    className: "t1"
  }, c.freq), /*#__PURE__*/React.createElement("span", {
    className: "t3"
  }, "\u6253\u51FA\u6761\u4EF6"), " ", /*#__PURE__*/React.createElement("span", {
    className: "t1"
  }, c.offer), /*#__PURE__*/React.createElement("span", {
    className: "t3"
  }, "\u5185\u90E8\u6001\u5EA6"), " ", /*#__PURE__*/React.createElement("span", {
    className: "t1"
  }, c.sentiment)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      padding: "16px 18px",
      background: "var(--bg-2)",
      borderLeft: "3px solid var(--cyan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 14,
      color: "var(--cyan)",
      letterSpacing: "0.16em",
      marginBottom: 8
    }
  }, "OUR COUNTER \xB7 \u53CD\u5236\u601D\u8DEF"), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 19,
      lineHeight: 1.6
    }
  }, "\u4E0D\u8DDF\u4EF7 \xB7 \u4E0D\u8DDF\u8D26\u671F. ", /*#__PURE__*/React.createElement("b", {
    className: "cyan"
  }, "\u7528\u4EBA (\u4E8C\u4EE3\u4FF1\u4E50\u90E8) + \u7ED3\u6784 (\u8001\u677F\u5A18\u4E13\u5C5E\u8D44\u6E90)"), " \u53CD\u51FB \xB7 \u53D6\u6D88\u4EF7\u683C\u6218\u7EF4\u5EA6\u3002")));
}

// ============================================================
// BLOCK 03 · KPI quarterly trend
function DossierKPI({
  d
}) {
  const maxRev = Math.max(...d.kpis.map(k => k.rev));
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u4E1A\u52A1 KPI \xB7 \u8FD1 5 \u4E2A\u5B63\u5EA6", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, "REVENUE / AR / DISTRIBUTION")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 24,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(KPISummary, {
    label: "\u5B63\u5EA6\u56DE\u6B3E (\u4EBF)",
    series: d.kpis.map(k => k.rev),
    color: "var(--amber)",
    fmt: v => v.toFixed(1)
  }), /*#__PURE__*/React.createElement(KPISummary, {
    label: "\u8D26\u671F (\u5929)",
    series: d.kpis.map(k => k.ar),
    color: "var(--red)",
    higherIsBad: true,
    fmt: v => v.toFixed(0)
  }), /*#__PURE__*/React.createElement(KPISummary, {
    label: "\u5206\u9500\u5E7F\u5EA6",
    series: d.kpis.map(k => k.dist),
    color: "var(--cyan)",
    fmt: v => Math.round(v * 100) + "%"
  })), /*#__PURE__*/React.createElement(KPIBars, {
    data: d.kpis,
    maxRev: maxRev
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      padding: "14px 18px",
      background: "var(--bg-2)",
      borderLeft: "3px solid var(--amber)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 14,
      color: "var(--amber)",
      letterSpacing: "0.16em",
      marginBottom: 6
    }
  }, "READING"), /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 18,
      lineHeight: 1.6
    }
  }, "\u56DE\u6B3E\u4ECE ", /*#__PURE__*/React.createElement("b", null, "6.8 \u2192 4.2 \u4EBF"), " \xB7 \u8D26\u671F\u4ECE ", /*#__PURE__*/React.createElement("b", null, "22 \u2192 34 \u5929"), " \xB7 \u5206\u9500\u5E7F\u5EA6 ", /*#__PURE__*/React.createElement("b", null, "-10 pp"), "\u3002\u4E09\u9879\u6307\u6807\u540C\u6B65\u6076\u5316, \u4E0E \u201C\u62DC\u8BBF\u4FE1\u53F7\u53D8\u5DEE\u201D \u7684\u65F6\u95F4\u7EBF ", /*#__PURE__*/React.createElement("b", {
    className: "red"
  }, "\u9AD8\u5EA6\u91CD\u53E0"), "\u3002")));
}
function KPISummary({
  label,
  series,
  color,
  fmt,
  higherIsBad
}) {
  const last = series[series.length - 1];
  const prev = series[series.length - 2] || last;
  const delta = last - prev;
  const isBad = higherIsBad ? delta > 0 : delta < 0;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t3 mono",
    style: {
      fontSize: 14,
      letterSpacing: "0.1em"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 36,
      color,
      fontWeight: 600,
      lineHeight: 1
    }
  }, fmt(last)), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 16,
      color: isBad ? "var(--red)" : "var(--green)"
    }
  }, delta > 0 ? "▲" : "▼", " ", fmt(Math.abs(delta)))));
}
function KPIBars({
  data,
  maxRev
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 18,
      height: 160
    }
  }, data.map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: i === data.length - 1 ? "var(--red)" : "var(--amber)",
      height: `${k.rev / maxRev * 100}%`,
      opacity: i === data.length - 1 ? 1 : 0.65,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      position: "absolute",
      top: -22,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "var(--t-1)",
      fontSize: 15,
      fontWeight: 600
    }
  }, k.rev.toFixed(1)))), /*#__PURE__*/React.createElement("div", {
    className: "mono t3",
    style: {
      fontSize: 14
    }
  }, k.m)))), /*#__PURE__*/React.createElement("div", {
    className: "t4 mono",
    style: {
      fontSize: 13,
      marginTop: 8,
      textAlign: "right"
    }
  }, "\u67F1: \u5B63\u5EA6\u56DE\u6B3E (\u4EBF)"));
}

// ============================================================
// BLOCK 03 · Family / Org tree
function DossierFamily({
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u51B3\u7B56\u5708 \xB7 \u5BB6\u65CF / \u7EC4\u7EC7\u7ED3\u6784", /*#__PURE__*/React.createElement("span", {
    className: "badge mono"
  }, d.family.length, " PEOPLE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, d.family.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "180px 1fr 180px",
      gap: 18,
      padding: "14px 16px",
      background: "var(--bg-2)",
      borderLeft: `3px solid ${f.c}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t1",
    style: {
      fontSize: 19,
      fontWeight: 600
    }
  }, f.n), /*#__PURE__*/React.createElement("div", {
    className: "t2",
    style: {
      fontSize: 16,
      lineHeight: 1.4
    }
  }, f.r), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 15,
      color: f.c,
      textAlign: "right"
    }
  }, "\u8BA4\u540C\u5EA6 \xB7 ", f.a)))));
}

// ============================================================
// BLOCK 04 · 90-day playbook
function DossierPlaybook({
  d
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${d.playbook.length}, 1fr)`,
      gap: 24
    }
  }, d.playbook.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "card",
    style: {
      borderTop: `3px solid ${p.color}`,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 14,
      color: p.color,
      letterSpacing: "0.16em"
    }
  }, "PHASE ", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "serif",
    style: {
      fontSize: 28,
      fontWeight: 600,
      marginTop: 6,
      color: "var(--t-1)"
    }
  }, p.phase), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-1)",
      margin: "16px 0 18px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, p.steps.map((s, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 15,
      color: p.color,
      fontWeight: 600,
      minWidth: 24
    }
  }, String(j + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "t1",
    style: {
      fontSize: 18,
      lineHeight: 1.5
    }
  }, s)))))));
}
window.SceneDossier = SceneDossier;