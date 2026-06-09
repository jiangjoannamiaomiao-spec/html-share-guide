// =====================================================
// 集团生意大脑 · 合成数据
// =====================================================
window.AppData = (function () {
  const REGIONS = [
    "华北", "华东", "华南", "华中", "西南", "西北", "东北",
  ];
  const PROVINCES = [
    { r: "华北", name: "北京" }, { r: "华北", name: "天津" }, { r: "华北", name: "河北" }, { r: "华北", name: "山西" }, { r: "华北", name: "内蒙古" },
    { r: "东北", name: "辽宁" }, { r: "东北", name: "吉林" }, { r: "东北", name: "黑龙江" },
    { r: "华东", name: "上海" }, { r: "华东", name: "江苏" }, { r: "华东", name: "浙江" }, { r: "华东", name: "安徽" }, { r: "华东", name: "福建" }, { r: "华东", name: "山东" }, { r: "华东", name: "江西" },
    { r: "华中", name: "河南" }, { r: "华中", name: "湖北" }, { r: "华中", name: "湖南" },
    { r: "华南", name: "广东" }, { r: "华南", name: "广西" }, { r: "华南", name: "海南" },
    { r: "西南", name: "重庆" }, { r: "西南", name: "四川" }, { r: "西南", name: "贵州" }, { r: "西南", name: "云南" }, { r: "西南", name: "西藏" },
    { r: "西北", name: "陕西" }, { r: "西北", name: "甘肃" }, { r: "西北", name: "青海" }, { r: "西北", name: "宁夏" }, { r: "西北", name: "新疆" },
  ];

  // Top-line numbers (kept the same across all maps for narrative continuity)
  const TOTAL_DEALERS = 2847;
  const ANNUAL_VISITS = 96420;
  const PARTICLES_PER_VISIT = 5;
  const TOTAL_PARTICLES = ANNUAL_VISITS * PARTICLES_PER_VISIT;
  const ACTIVE_FIELD_REPS = 2014;

  // ---- Map 1: customer type ----
  const CUSTOMER_TYPES = [
    { key: "loyal", name: "死忠型", count: 612, rev: 38, color: "var(--green)", note: "情感驱动 · 抗政策波动", recommendation: "投入情感资源, 减少政策依赖" },
    { key: "profit", name: "利润型", count: 1248, rev: 42, color: "var(--amber)", note: "政策敏感 · 算账思维", recommendation: "定向政策, 算清账面" },
    { key: "fence", name: "骑墙型", count: 716, rev: 16, color: "var(--purple)", note: "正在被竞品挖角", recommendation: "立即分流: 救 / 放" },
    { key: "unknown", name: "未画像", count: 271, rev: 4, color: "var(--t-4)", note: "新签或样本不足", recommendation: "加密拜访 6 个月内补全" },
  ];

  // ---- Map 2: decision maker ----
  const DECISION_MAKERS = [
    { key: "boss", name: "老板", count: 1582, color: "var(--cyan)", weight: 56, persona: "技术派 / 经营派", tactic: "标准 BD 话术 + 政策" },
    { key: "wife", name: "老板娘", count: 614, color: "var(--pink)", weight: 22, persona: "财务实权 / 家庭权威", tactic: "专属内容包 · 家庭场景" },
    { key: "second", name: "二代", count: 327, color: "var(--purple)", weight: 12, persona: "数字原住民 / 留学派", tactic: "二代俱乐部 + 数字化共创" },
    { key: "pro", name: "职业经理人", count: 248, color: "var(--amber)", weight: 9, persona: "KPI 驱动 / 多渠道操盘", tactic: "数据驱动 · 透明结算" },
    { key: "uncertain", name: "未识别", count: 76, color: "var(--t-4)", weight: 1, persona: "决策结构复杂", tactic: "持续观察 · 不动用资源" },
  ];

  // ---- Map 3: risk – generate dealers ----
  function rnd(seed) {
    let s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }
  const R = rnd(42);
  const RISK_DEALERS = [];
  PROVINCES.forEach((p, idx) => {
    const n = Math.round(3 + R() * 6);
    for (let i = 0; i < n; i++) {
      const score = R();
      let level = "green";
      if (score < 0.10) level = "red";
      else if (score < 0.28) level = "amber";
      else if (score < 0.50) level = "yellow";
      RISK_DEALERS.push({
        id: `${p.name}-${i}`,
        province: p.name,
        region: p.r,
        score,
        level,
        name: ["陈氏", "李氏", "王氏", "张氏", "刘氏", "黄氏", "周氏", "吴氏"][Math.floor(R() * 8)] + "贸易",
        x: idx,
        y: i,
      });
    }
  });
  // a few hand-crafted top-risk dealers (named)
  const TOP_RISK = [
    { name: "豫北-陈氏贸易", region: "华中", province: "河南", revenue: "2.4亿", signals: ["竞品业务员频访(月7次↑)", "我方陈列位下移", "二代质疑当前合作"], lead: "李哥 / 区域 BD", since: "47 天", confidence: 0.86 },
    { name: "苏南-周氏批发", region: "华东", province: "江苏", revenue: "3.1亿", signals: ["拜访接待规格下降", "老板询问竞品价盘 3 次", "回款周期由 22→34 天"], lead: "周姐 / 区域 BD", since: "29 天", confidence: 0.81 },
    { name: "粤东-黄氏物流", region: "华南", province: "广东", revenue: "1.8亿", signals: ["仓内竞品占比 12%→31%", "二代接班 80 天", "对促销政策抱怨↑"], lead: "罗哥 / 大区", since: "62 天", confidence: 0.79 },
    { name: "川中-王氏商贸", region: "西南", province: "四川", revenue: "1.2亿", signals: ["老板娘生病住院 3 周", "决策真空期", "竞品趁机拜访 5 次"], lead: "杨姐 / 区域 BD", since: "21 天", confidence: 0.74 },
    { name: "辽南-刘氏副食", region: "东北", province: "辽宁", revenue: "0.9亿", signals: ["家族分家信号", "弟弟自立门户传闻", "进货节奏波动"], lead: "孙哥 / 区域 BD", since: "55 天", confidence: 0.71 },
  ];

  // ---- Map 4: capability – scatter ----
  const CAPABILITY = [];
  for (let i = 0; i < 220; i++) {
    const claimed = 0.2 + R() * 0.75;
    const noise = (R() - 0.5) * 0.45;
    const actual = Math.max(0.05, Math.min(0.95, claimed + noise));
    CAPABILITY.push({ claimed, actual, rev: 0.2 + R() * 3 });
  }
  // labeled outliers
  const CAP_LABELS = [
    { claimed: 0.88, actual: 0.38, name: "豫南-赵氏(自称分销, 实为仓储)" },
    { claimed: 0.32, actual: 0.78, name: "浙北-钱氏(低调实力派)" },
    { claimed: 0.74, actual: 0.74, name: "鲁西-孙氏(言行一致, 标杆)" },
    { claimed: 0.91, actual: 0.55, name: "湘中-陈氏(强压货 · 弱动销)" },
  ];

  // ---- Map 5: relationship network ----
  // nodes pre-positioned in 1100x620 svg
  const NET_NODES = [
    // cluster A – 亲族(华东)
    { id: "a1", x: 220, y: 160, r: 22, label: "苏南·周氏", type: "core", revenue: "3.1亿" },
    { id: "a2", x: 130, y: 250, r: 14, label: "周氏小舅子", type: "kin" },
    { id: "a3", x: 300, y: 90,  r: 14, label: "周氏二代-上海", type: "kin" },
    { id: "a4", x: 330, y: 230, r: 14, label: "周氏堂弟-苏中", type: "kin" },
    { id: "a5", x: 200, y: 70,  r: 12, label: "同乡-嘉兴", type: "town" },

    // cluster B – 利益(华南)
    { id: "b1", x: 880, y: 200, r: 22, label: "粤东·黄氏", type: "core", revenue: "1.8亿" },
    { id: "b2", x: 980, y: 140, r: 14, label: "粤西·李氏", type: "interest", note: "暗中分货 · 月 240 万" },
    { id: "b3", x: 970, y: 280, r: 14, label: "粤北·梁氏", type: "interest" },
    { id: "b4", x: 800, y: 290, r: 12, label: "同一金主-港资", type: "money" },

    // cluster C – 竞品挖角(华中)
    { id: "c1", x: 520, y: 480, r: 22, label: "豫北·陈氏", type: "core", revenue: "2.4亿" },
    { id: "c2", x: 420, y: 540, r: 14, label: "豫南·赵氏", type: "rival", note: "竞品同步挖角" },
    { id: "c3", x: 620, y: 540, r: 14, label: "鄂中·吴氏", type: "rival" },
    { id: "c4", x: 520, y: 580, r: 18, label: "★ 竞品 · X 品牌", type: "competitor" },

    // cluster D – 窜货(西南)
    { id: "d1", x: 240, y: 470, r: 18, label: "川中·王氏", type: "core", revenue: "1.2亿" },
    { id: "d2", x: 130, y: 510, r: 14, label: "渝北·杨氏", type: "smuggle", note: "窜货流向" },
    { id: "d3", x: 340, y: 540, r: 12, label: "黔东·罗氏", type: "smuggle" },

    // cluster E – 二代俱乐部(隐性)
    { id: "e1", x: 760, y: 480, r: 16, label: "鲁西·孙二代", type: "second" },
    { id: "e2", x: 850, y: 540, r: 14, label: "浙南·吴二代", type: "second" },
    { id: "e3", x: 690, y: 560, r: 14, label: "闽东·林二代", type: "second" },
  ];
  const NET_EDGES = [
    // kin
    { a: "a1", b: "a2", type: "kin" }, { a: "a1", b: "a3", type: "kin" }, { a: "a1", b: "a4", type: "kin" }, { a: "a1", b: "a5", type: "town" },
    // interest
    { a: "b1", b: "b2", type: "interest" }, { a: "b1", b: "b3", type: "interest" }, { a: "b1", b: "b4", type: "money" }, { a: "b2", b: "b4", type: "money" }, { a: "b3", b: "b4", type: "money" },
    // rival
    { a: "c1", b: "c4", type: "rival" }, { a: "c2", b: "c4", type: "rival" }, { a: "c3", b: "c4", type: "rival" }, { a: "c1", b: "c2", type: "kin" },
    // smuggle
    { a: "d1", b: "d2", type: "smuggle" }, { a: "d1", b: "d3", type: "smuggle" },
    // second-gen
    { a: "e1", b: "e2", type: "second" }, { a: "e2", b: "e3", type: "second" }, { a: "e1", b: "e3", type: "second" },
  ];

  return {
    REGIONS, PROVINCES,
    TOTAL_DEALERS, ANNUAL_VISITS, PARTICLES_PER_VISIT, TOTAL_PARTICLES, ACTIVE_FIELD_REPS,
    CUSTOMER_TYPES, DECISION_MAKERS,
    RISK_DEALERS, TOP_RISK,
    CAPABILITY, CAP_LABELS,
    NET_NODES, NET_EDGES,
  };
})();
