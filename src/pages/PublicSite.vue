<script setup>
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Award,
  Blocks,
  Briefcase,
  ChevronDown,
  Cpu,
  GraduationCap,
  Handshake,
  Network,
  Puzzle,
  Search,
  Shield,
  Target,
  TrendingUp,
  Trophy,
  User,
  Users,
  X
} from 'lucide-vue-next'

const navItems = [
  { label: '时代机遇', id: 'era' },
  { label: '职业介绍', id: 'career-born' },
  { label: '数据资产盒子', id: 'toolbox' },
  { label: '双百计划', id: 'dual-hundred' },
  { label: '导师阵容', id: 'instructors' },
  { label: '课程体系', id: 'curriculum' },
  { label: '金融化蓝图', id: 'finance' },
  { label: '晋升通道', id: 'promotion' },
  { label: '立即行动', id: 'action' }
]

const sectionIds = [
  'hero',
  'era',
  'divergence',
  'career-born',
  'policy',
  'career-detail',
  'youshu',
  'toolbox',
  'dual-hundred',
  'instructors',
  'curriculum',
  'transformation',
  'finance',
  'promotion',
  'action'
]

const activeSection = ref('hero')
const mobileOpen = ref(false)
const scrollProgress = ref(0)
const navScrolled = ref(false)
const animatedNumbers = ref(false)
const particles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 8) * 0.45}s`,
  duration: `${4 + (index % 5) * 0.7}s`
}))

const DataTable = (props) =>
  h('div', { class: 'table-wrap reveal-on-scroll' }, [
    h('table', { class: 'data-table' }, [
      h('thead', [
        h(
          'tr',
          props.table.headers.map((header, index) =>
            h('th', { class: props.table.headTone?.[index] || '' }, header)
          )
        )
      ]),
      h(
        'tbody',
        props.table.rows.map((row, rowIndex) =>
          h(
            'tr',
            {
              class: [
                props.table.highlightRows?.includes(rowIndex) ? 'row-highlight' : '',
                props.table.highlightStrong && props.table.highlightRows?.includes(rowIndex) ? 'row-strong' : ''
              ]
                .filter(Boolean)
                .join(' ')
            },
            row.map((cell, index) =>
              h(
                'td',
                {
                  class: [
                    props.table.lead?.includes(index) ? 'cell-lead' : '',
                    props.table.mono?.includes(index) ? 'cell-mono' : '',
                    props.table.gold?.includes(index) ? 'cell-gold' : '',
                    props.table.bright?.includes(index) ? 'cell-bright' : '',
                    props.table.columnTone?.[index] || '',
                    props.table.muted?.includes(index) ? 'cell-muted' : ''
                  ]
                    .filter(Boolean)
                    .join(' ')
                },
                cell
              )
            )
          )
        )
      )
    ])
  ])
DataTable.props = { table: { type: Object, required: true } }

const CountNumber = {
  props: {
    end: { type: Number, required: true },
    suffix: { type: String, default: '' },
    decimals: { type: Number, default: 0 }
  },
  setup(props) {
    const progress = ref(0)
    let frameId = 0
    let startTime = 0

    const formatted = computed(() => {
      const value = props.end * progress.value
      const fixed = value.toFixed(props.decimals)
      return `${fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${props.suffix || ''}`
    })

    function tick(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      progress.value = Math.min(1, elapsed / 1600)
      if (progress.value < 1) frameId = requestAnimationFrame(tick)
    }

    onMounted(() => {
      frameId = requestAnimationFrame(tick)
    })

    onBeforeUnmount(() => cancelAnimationFrame(frameId))

    return () => h('span', formatted.value)
  }
}

const heroButtons = [
  { label: '了解详情', target: 'era', variant: 'primary' },
  { label: '立即报名', target: 'action', variant: 'ghost' }
]

const eraStats = [
  { value: '13万亿', number: 13.49, suffix: '万亿', decimals: 0, label: '数字经济核心产业增加值', note: '2024年数据' },
  { value: '40.7%', number: 40.7, suffix: '%', decimals: 1, label: '同比增长率', note: '数据要素市场' },
  { value: '2000亿+', number: 2000, suffix: '亿+', decimals: 0, label: '2025年预计市场规模', note: '持续攀升' }
]

const eraAccordions = [
  {
    title: '比土地更值钱的资产正在诞生',
    body: [
      '数据已经成为超越传统资产类别的新型财富载体。与土地、黄金、石油不同，数据具有非竞争性、可无限复制、边际成本趋近于零的独特属性。',
      '数据要素市场2024年同比增长40.7%，这一增速远超房地产黄金期的增速。据权威机构预测，到2030年，中国数据要素市场规模有望突破<strong>1万亿元</strong>。',
      '<em>"这不是科幻小说。这是正在发生的现实。"</em>'
    ]
  },
  {
    title: '国家战略层面的重大转向',
    body: [
      '2022年12月，中共中央、国务院印发<strong>"数据二十条"</strong>，首次在国家层面确立了数据要素的产权框架、流通规则和收益分配制度。',
      '2023年2月，《数字中国建设整体布局规划》发布，提出了"2522"整体框架布局。',
      '2023年8月，财政部发布《企业数据资源相关会计处理暂行规定》，标志着数据资源可以正式纳入企业资产负债表。',
      '2023年10月，国家数据局正式挂牌，数据要素市场进入国家专管时代。'
    ]
  },
  {
    title: '划时代里程碑：智能体成为数据资产产品化的终极形态',
    body: [
      'AI智能体的出现，正在将数据资产推向一个全新的高度。智能体不仅是数据的消费者，更是数据的生产者和价值放大器。',
      '据工信部规划，到2026年，AI智能体在重点行业的普及率目标将达到<strong>70%</strong>。'
    ],
    image: '/smart-agent-visual.webp'
  }
]

const divergenceCards = [
  { value: '6000万', title: '青岛能源集团', desc: '招商银行低利率授信额度', note: '首批数据资产融资成功案例' },
  { value: '5800万', title: '合肥交通数据', desc: '收益法评估入表价值', note: '交通数据价值化的标杆' },
  { value: '14.17亿', title: '数据资产增信融资', desc: '截至2025年3月累计规模', note: '市场增速惊人' }
]

const listingTable = {
  headers: ['企业', '入表金额'],
  gold: [1],
  mono: [1],
  rows: [
    ['中国移动', '11.05亿元'],
    ['中国联通', '3.95亿元'],
    ['中国电信', '2.09亿元'],
    ['科大讯飞', '3.15亿元']
  ]
}

const divergenceAccordions = [
  {
    title: '第一波红利已被少数先行者占据',
    body: ['截至2025年3月，已有330家非上市公司披露数据资产入表，融资总额达14.17亿元。而在A股市场，入表金额更为惊人：'],
    table: listingTable
  },
  {
    title: '错过窗口期的代价：从蓝海到红海的警示',
    body: [
      '历史总是惊人地相似：',
      '<strong>1998年</strong> 房改启动，先知先觉者成为房地产黄金时代最大赢家',
      '<strong>2003年</strong> 淘宝诞生，首批电商卖家实现财富自由',
      '<strong>2012年</strong> 微信生态崛起，抓住自媒体红利的人改变了命运',
      '<strong>2024年</strong> 数据资产入表元年，又一个万亿级机会窗口',
      '<em>蓝海正在变红，而变红的速度可能比想象中更快。</em>'
    ]
  }
]

const assetEraTable = {
  headers: ['资产时代', '时间窗口', '代表资产', '催生的新职业', '财富逻辑'],
  highlightRows: [2],
  rows: [
    ['土地与房产时代', '1998-2015', '商品房、商业地产', '房地产评估师、房产经纪人', '地段稀缺性+杠杆放大'],
    ['互联网时代', '2005-2020', '平台股权、流量资产', '产品经理、运营总监、数据分析师', '网络效应+资本估值'],
    ['数据资产时代', '2024-?', '数据资源、智能体', '数据资产管理师', '数据复利+全链条流通']
  ]
}

const valueLayers = [
  ['第五层', '金融资产', '质押融资 / 作价入股'],
  ['第四层', '数据资产', '会计入表'],
  ['第三层', '数据产品', '封装产品'],
  ['第二层', '清洗数据', '标准化'],
  ['第一层', '原始数据', '企业运营数据']
]

const valueChainTable = {
  headers: ['层级', '形态', '核心特征', '管理要求'],
  rows: [
    ['第一层：原始数据', '企业运营中自然产生的未经加工数据记录', '量大、杂乱、价值密度低', '数据采集、分类分级、权属确认'],
    ['第二层：清洗数据', '经过去噪、标注、整合后的标准化数据集', '质量可控、场景适配', '数据治理、质量评估、安全防护'],
    ['第三层：数据产品', '封装为可交付使用的数据服务或数据集', '产品化、可定价、可复用', '产品设计、合规审查、价值评估'],
    ['第四层：数据资产', '完成会计入表、可计量的正式资产', '可入账、可抵押、可交易', '入表核算、资产登记、风险控制'],
    ['第五层：金融资产', '实现质押融资、作价入股、证券化', '资本化、流动性强、杠杆效应', '金融化运作、收益分配、退出机制']
  ]
}

const careerBornAccordions = [
  {
    title: '从房地产到互联网再到数据资产：历史规律',
    body: [
      '每一个万亿级市场的崛起，都遵循着相同的规律：政策红利释放 → 基础设施完善 → 专业人才缺口 → 高薪职业诞生 → 财富重新分配。',
      '数据资产时代正处于第一阶段到第二阶段的过渡期，政策框架已经搭好，基础设施正在完善，而专业人才极度稀缺。',
      '据麦肯锡全球研究院报告，到2025年，美国缺少数据相关人才约190万；中国数据人才缺口预计超过<strong>500万</strong>。'
    ]
  },
  {
    title: '数据资产管理师：被时代选中的角色',
    body: [
      '数据资产管理师，是数据资产时代的"房地产评估师"。他们既是数据价值的发现者，也是数据资产化全链条的操盘者。',
      '<em>这是你的"最后船票"。错过房地产时代的评估师认证，错过互联网时代的流量运营，数据资产时代，不能再错过。</em>'
    ]
  },
  { title: '五层数据价值链详解', body: [], table: valueChainTable }
]

const policyTimeline = [
  ['2022年12月', '中共中央、国务院印发"数据二十条"', '首次确立数据要素产权框架、流通规则、收益分配制度'],
  ['2023年2月', '《数字中国建设整体布局规划》发布', '"2522"整体框架布局'],
  ['2023年8月', '财政部发布《企业数据资源相关会计处理暂行规定》', '数据资源可纳入资产负债表'],
  ['2023年10月', '国家数据局正式挂牌', '数据要素市场进入国家专管时代'],
  ['2024年1月', '数据资产入表政策正式施行', '数据成为财务报表上可计量的"硬资产"'],
  ['2024年', '"数据要素×"三年行动计划推进', '推动数据要素在重点行业深度应用'],
  ['2025年', '《数据资产全过程管理试点方案》', 'AI智能体相关数据资产纳入探索']
]

const exchangeTable = {
  headers: ['交易所名称', '成立时间', '2024年交易规模', '核心定位与特色'],
  lead: [0],
  gold: [2],
  mono: [2],
  muted: [3],
  rows: [
    ['上海数据交易所', '2021年', '超50亿元', '国内领先生态型数交所，签约数商超2000家'],
    ['深圳数据交易所', '2022年', '超50亿元', '深耕粤港澳大湾区，跨境数据交易先行先试'],
    ['北京国际大数据交易所', '2021年', '爆发式增长', '依托首都科创优势，覆盖20+关键行业'],
    ['贵阳大数据交易所', '2015年', '超20亿元', '全国首家大数据交易所'],
    ['广州数据交易所', '2022年', '超25亿元', '服务华南实体经济，创新推出"交易证据链证书"'],
    ['华东江苏大数据交易中心', '2015年', '活跃度高', '上架产品交易率居全国前列']
  ]
}

const policyAccordions = [
  {
    title: '从“数据要素”到“数据资产”的政策演进',
    body: [
      '中国数据要素政策经历了从“确权-定价-交易”三大难题的初步探索，到系统性制度框架建立的过程。“数据二十条”创造性地提出了<strong>三权分置</strong>，即数据资源持有权、数据加工使用权、数据产品经营权。',
      '<em>99.9%的企业尚未行动。这意味着，率先进入的企业将获得巨大的先发优势。</em>'
    ]
  },
  {
    title: '从政策到落地的万亿市场',
    body: [
      '数据交易所是数据要素市场化的核心基础设施。从2015年贵阳大数据交易所成立，到2024年全国已成立50+家数据交易所，年交易规模快速增长。',
      '随着入表政策的落地，数据资产的交易、流通、金融化将进入加速发展期，预计到2028年数据交易市场规模将突破<strong>5000亿元</strong>。'
    ]
  },
  {
    title: '为什么现在是你入场的最佳时机',
    body: [
      '政策窗口期 + 市场空白期 + 人才稀缺期三重叠加，构成了罕见的“黄金入场点”。',
      '就像1998年房地产市场刚刚起步时拿到房地产评估师证书的人，如今已是行业领袖。数据资产管理师正处于同样的历史起点。'
    ]
  }
]

const careerRoles = [
  { title: '数据战略顾问', desc: '深入企业业务肌理，识别资产化条件', icon: Target },
  { title: '数字产品设计师', desc: '将原始数据封装成标准化数据产品', icon: Puzzle },
  { title: '金融化操盘手', desc: '将数据产品带入资本市场', icon: TrendingUp }
]

const careerAbilities = [
  { name: '数据战略分析', desc: '从企业业务中识别数据资产的价值点', icon: Target },
  { name: '场景建构与价值评估', desc: '将数据价值转化为可计量的商业模型', icon: Puzzle },
  { name: '数据金融化运作', desc: '掌握质押、证券化、RWA等金融化手段', icon: TrendingUp },
  { name: '资源链接与生态拓展', desc: '构建数据资产生态的合作网络', icon: Network },
  { name: '个人品牌与影响力', desc: '建立行业影响力，成为领域专家', icon: User }
]

const careerCompareTable = {
  headers: ['维度', '数据资产管理师', '数据分析师', '咨询顾问'],
  lead: [0],
  headTone: { 1: 'tone-gold' },
  columnTone: { 1: 'tone-gold-soft' },
  gold: [1],
  rows: [
    ['工作对象', '企业数据资源的全生命周期资产化', '数据清洗、处理、报表与可视化', '企业战略、组织、运营等管理问题'],
    ['核心能力', '商业洞察+金融运作+资源整合', '统计分析+编程+数据建模', '行业研究+框架思维+汇报呈现'],
    ['交付成果', '入表资产、融资授信、数据产品、金融方案', '数据分析报告、BI看板、预测模型', '咨询方案、PPT报告、实施建议'],
    ['收入天花板', '初级15-30万/年，高级50-100万+', '中级10-25万/年，高级30-50万', '初级15-25万/年，合伙人级80万+'],
    ['不可替代性', '极高，需同时具备数据、金融、产业三重认知', '中等，技术工具门槛持续降低', '中高，方法论可复制']
  ]
}

const incomeModeTable = {
  headers: ['维度', '服务模式', '金融模式', '合伙人模式'],
  lead: [0],
  headTone: { 1: 'tone-cyan', 2: 'tone-gold', 3: 'tone-gold-strong' },
  columnTone: { 1: 'tone-cyan-soft', 2: 'tone-gold-faint', 3: 'tone-gold-warm' },
  rows: [
    ['收入类型', '项目咨询费、培训费', '金融化分成、服务费', '年薪+股权+项目跟投'],
    ['金额区间', '单场3000-5000元/天，年15-30万', '单个项目3-10万分成，年30-80万', '年50-100万+，股权增值无上限'],
    ['适合阶段', '入行0-2年初级期', '入行2-5年成长期', '入行3年以上成熟期'],
    ['关键能力要求', '场景建构、入表执行、客户沟通', '金融产品设计、机构对接、风控判断', '生态构建、团队管理、战略决策'],
    ['可持续性', '依赖个人时间投入，线性增长', '依赖项目资源，指数增长', '依赖平台价值，复利增长']
  ]
}

const careerAccordions = [
  {
    title: '角色定义：三位一体的复合型人才',
    body: [
      '数据资产管理师不是单一技能的人才，而是<strong>数据战略顾问 + 数字产品设计师 + 金融化操盘手</strong>的三位一体。',
      '这种复合性使得数据资产管理师具有极高的不可替代性，市场上懂数据的人很多，懂金融的人也很多，但同时懂数据、懂金融、懂产业的人凤毛麟角。'
    ]
  },
  {
    title: '五维能力图谱详解',
    body: ['五维能力图谱是数据资产管理师的核心竞争力模型，每一维都代表一个关键能力域。', '入门时只需在1-2个维度上有突出优势即可，成长过程中逐步补齐。']
  },
  {
    title: '为什么数据资产管理师“贵”',
    body: ['稀缺决定价格。目前全国具备数据资产全链路操盘能力的专业人士不足<strong>5000人</strong>，而市场需求超过50万人。']
  },
  {
    title: '不需要成为技术天才',
    body: ['数据资产管理师的核心竞争力不是编程或建模能力，而是<strong>商业洞察力、金融运作能力和资源整合能力</strong>。']
  }
]

const youshuWalls = [
  { icon: Target, name: '数据场景模型', threshold: '高——覆盖30+行业的标准化场景识别与建模方法论', scarcity: '极高——无同类标准化产品', value: '将企业混沌的业务场景转化为清晰的数据资产识别清单' },
  { icon: Cpu, name: '智能估价系统', threshold: '高——AI驱动的多维估值模型', scarcity: '高——自动化估值工具寥若晨星', value: '让数据资产的价值"看得见、算得准"' },
  { icon: Handshake, name: '金融化全链路服务', threshold: '中高——需打通三大通道', scarcity: '极高——同时具备三项资源的机构凤毛麟角', value: '从评估认证到融资落地的完整通路' }
]

const serviceSteps = ['数据战略分析', '数字产品打造', '金融化申请', '评估认证', '区块链登记', '交易所挂牌']

const youshuAccordions = [
  { title: '为什么选择有数', body: ['有数科技拥有三大核心壁垒：<strong>数据场景模型</strong>、<strong>智能估价系统</strong>、<strong>金融化全链路服务</strong>。', '这三大壁垒构成了有数在数据资产领域的护城河，使其成为极少数能够真正帮助企业实现数据资产全链路落地的服务商。'] },
  { title: '三大壁垒详解', body: ['数据场景模型覆盖30+行业的标准化场景识别与建模方法论，将企业混沌的业务场景转化为清晰的数据资产识别清单。', '智能估价系统采用AI驱动的多维估值模型，让数据资产的价值"看得见、算得准"。', '金融化全链路服务打通了从评估认证到融资落地的完整通路，同时具备三项资源的机构凤毛麟角。'] },
  { title: '完整服务闭环', body: ['有数科技的服务闭环涵盖数据战略分析、数字产品打造、金融化申请、评估认证、区块链登记、交易所挂牌六大环节。', '每一个环节都有专业团队保驾护航，确保企业数据资产化全链条无缝衔接、高效落地。'] }
]

const toolboxModules = [
  { icon: Search, num: '模块一', title: '数据战略分析', desc: '覆盖30+行业的数据资源盘点清单，自动标注高价值资产' },
  { icon: Blocks, num: '模块二', title: '场景建构与价值估算', desc: '智能匹配场景模型模板，AI驱动的价值评估引擎' },
  { icon: Shield, num: '模块三', title: '确权与登记服务', desc: '区块链存证系统对接，一键生成不可篡改的数字指纹' },
  { icon: TrendingUp, num: '模块四', title: '数据资产金融化运作', desc: '质押贷款、ABS发行、海外RWA三条金融化路径' }
]

const toolboxAccordions = [
  { title: '模块一详解：数据战略分析', body: ['数据战略分析模块覆盖30+行业的数据资源盘点清单，通过标准化评估框架，自动标注企业的高价值数据资产。', '该模块帮助数据资产管理师快速识别客户企业中的数据资产金矿，为后续的资产化工作奠定基础。'] },
  { title: '模块二详解：场景建构与价值估算', body: ['场景建构模块内置了大量行业场景模型模板，能够智能匹配企业业务场景与数据资产化路径。', 'AI驱动的价值评估引擎，让数据资产的价值估算从"拍脑袋"变成"算得准"。'] },
  { title: '模块三详解：确权与登记服务', body: ['确权与登记模块对接区块链存证系统，一键生成不可篡改的数据资产数字指纹，确保数据资产的权属清晰、可追溯。', '区块链技术的引入，让数据资产的确权过程从数月缩短到数天。'] },
  { title: '模块四详解：数据资产金融化运作', body: ['金融化模块提供三条金融化路径：质押贷款、ABS发行、海外RWA架构。每条路径都有详细的操作指南和模板。', '有数科技与多家金融机构建立了战略合作，能够为数据资产管理师提供从方案设计到资金落地的全程支持。'] }
]

const criteria = [
  { num: 1, title: '行业认知与商业敏感度', desc: '对数字经济、数据要素市场有基本认知' },
  { num: 2, title: '强烈的学习意愿与行动力', desc: '敢于上战场的实干家' },
  { num: 3, title: '资源整合能力与发展潜力', desc: '有客户资源、人脉网络、团队管理经验者优先' }
]

const investTable = {
  headers: ['项目', '金额/说明'],
  mono: [1],
  highlightRows: [2, 6],
  highlightStrong: true,
  rows: [
    ['总投入', '30,000元（登记金1,000元 + 尾款29,000元）'],
    ['学成后首单项目收入', '100,000元以上（企业数据资产入表服务）'],
    ['首单即回本', '是——一单收回全部投入，净赚7万+'],
    ['年度目标收入（服务层）', '150,000–300,000元'],
    ['年度目标收入（金融层）', '300,000–800,000元'],
    ['合伙人层级收入', '500,000–1,000,000元以上'],
    ['ROI（首年保守估计）', '500%–1,000%']
  ]
}

const rightsTable = {
  headers: ['权益维度', '具体内容', '核心价值'],
  gold: [0],
  muted: [2],
  rows: [
    ['90天系统培训', '数据应用分析、个人品牌打造、数据金融化、资源拓展、超级话术五大模块', '从零到精通的能力跃迁'],
    ['数据资产盒子', '课程上完前正式交付，含30+行业模型、AI估价系统、金融化全链路工具', '独立执行业务的核心装备'],
    ['每周直播答疑', '大有老师亲自带队，实时解答实战困惑', '与顶尖导师零距离交流'],
    ['IP品牌策划', '个人品牌定位、形象包装、获客话术定制', '打造你的个人获客漏斗'],
    ['项目实战机会', '真实企业数据资产入表项目跟岗实操', '从学到用的关键一跃'],
    ['精英社群权益', '100人高质量人脉网络，跨行业资源互补协作', '终身受益的人脉资产'],
    ['晋升合伙人通道', '优秀学员可晋升为社群负责人、企业战略合伙人', '从职业到事业的身份转变']
  ]
}

const dualAccordions = [
  { title: '为什么是“百里挑一”', body: ['双百计划只招100人，不是因为我们不想招更多，而是因为我们追求的是质量而非数量。', '每一位入选的学员都将获得导师团队的全方位赋能，这种“精英式培养”决定了我们无法大规模扩张。'] },
  { title: 'ROI测算：为什么这笔投资值得', body: ['投入3万元，学成后首单项目收入10万元以上，ROI超过<strong>300%</strong>。', '而在金融化模式下，单个项目的金融化分成可达3-10万元，一年只需做成3-5个项目，收入即可达到30-80万元。'] },
  { title: '权益详解：你真正获得的是什么', body: ['双百计划的权益不仅仅是课程，而是一个完整的<strong>职业跃迁系统</strong>：能力培养 + 工具赋能 + 品牌包装 + 项目实战 + 人脉网络 + 晋升通道。'] },
  { title: '招生流程与注意事项', body: ['第一步：提交申请（扫码或点击链接，填写申请表，5分钟）', '第二步：预约面试（缴纳1000元登记金，锁定面试名额）', '第三步：通过面试（缴纳尾款29,000元，正式入学）'] }
]

const instructors = [
  {
    name: '陈双律师',
    image: '/instructor-chenshuang.webp',
    role: '北京瀛和（广州）权益合伙人 · 数据要素研究领军者',
    bullets: ['深度参与国家级数据立法与标准制定', '为央国企提供数据合规实战解析', '数据权属确认与合规审查领域权威专家', '国家级数据政策咨询核心智囊'],
    tags: ['数据立法', '合规审查', '央国企服务']
  },
  {
    name: '马欢老师',
    image: '/instructor-mahuan.webp',
    role: 'DAMA中国主席 · CDMP大师',
    bullets: ['DAMA中国主席，数据管理国际权威认证大师', '为你厘清从数据管理到数据资产的底层逻辑', '打通数据治理与资产化的必经之路', '国际数据管理最佳实践引入中国的推动者'],
    tags: ['数据管理', 'CDMP', 'DAMA中国']
  },
  {
    name: '彭国超教授',
    image: '/instructor-pengguochao.webp',
    role: '中山大学信息管理学院教授 · 博导',
    bullets: ['数据资产管理与交易领域的权威学者', '曾为广发证券、南航、广汽等世界500强提供战略咨询', '「数据三确权」理论创立者：法律确权、管理确权、技术确权', '数据跨境传输合规与全球框架对标研究先锋'],
    tags: ['学术研究', '世界500强', '数据确权']
  }
]

const curriculum = [
  {
    number: '第一階',
    title: '从数据资源到数据资产 —— 构建垄断性认知与合规基石',
    duration: '第一週 · 第一天（6学时）',
    instructor: '吴大有（垄断思维与资产理论）、彭国超（合规框架）',
    modules: [
      ['垄断思维重塑与差异化定位（约40页）', ['吴大有「量子数据资产理论」：数据价值处于「价值叠加态」', '构建「个人垄断」三模块：知识模块、资源模块、思维模块', '「差异化护城河」方法论：找到一条只有你能跑的赛道', '实战工作坊：识别自身独特优势与差异化定位']],
      ['数据资产化全流程框架（约20页）', ['从资源到资产必须跨越的七道洪沟', '资源化→产品化→资产化→价值化→场景化→金融化→合规化', '案例：浪潮云洲从设备数据到零碳数据产品的全流程实践']],
      ['全球数据合规核心框架与实战（约30页）', ['彭国超「数据三确权」理论：法律确权、管理确权、技术确权', '欧盟GDPR与中国法案深度对标', '跨境数据传输合规路径：安全评估、标准合同、认证机制']],
      ['课程总结与课后任务（约5页）', ['核心目标：建立系统性认知，掌握合规基础框架', '课后任务：《差异化垄断定位说明书》+《数据合规风险初步分析报告》']]
    ]
  },
  {
    number: '第二階',
    title: '估值炼金术与交易架构设计 —— 从数据场景到金融产品',
    duration: '第一週 · 第二天（6学时）',
    instructor: '吴大有（估值方法论）、外部金融/法律专家（交易架构）',
    modules: [
      ['数据资产估值范式革命（约35页）', ['传统估值方法的「失灵」：DCF、市场法、成本法的局限', '「量子估值」理论：价值叠加态、观测者效应、纠缠态效应', '核心心法「三维度赋值法」：场景价值密度 × 数据稀缺性指数 × 实现能力系数', '「双AI飞轮」设计法：决策AI飞轮 + 资源AI飞轮']],
      ['估值方法论实操与风险定价（约20页）', ['估值工作流程标准化', '合规风险/技术过时/场景失效/道德风险识别', '成本法、收益法、市场法/场景法改良应用']],
      ['数据交易架构设计原理与创新（约35页）', ['数据资产证券化（ABS）：平安-如皋1.3亿元ABS、宿城区100%数据资产质押ABS', '数据信托：天津公交、云南信托、深圳数据知识产权服务信托', '收益权分享协议（DRA）与NFT化交易架构', '风险矩阵与选型逻辑']],
      ['课程总结与课后任务（约5页）', ['核心目标：掌握估值方法论，了解交易架构设计核心逻辑', '课后任务：《量子估值与稀缺性分析报告》+《交易架构设计方案》']]
    ]
  },
  {
    number: '第三階',
    title: '品牌放大、系统优化与顶尖认证 —— 从专业能力到生态闭环',
    duration: '第二週 · 第三天（6学时）',
    instructor: '吴大有（个人品牌与商业设计）、孙志鹏（组织能量与系统效能）',
    modules: [
      ['构建抗AI同质化的个人品牌（约25页）', ['「核心技能 × 兴趣标签」定位法：找到化学反应点', '内容生产SOP：深度通讯→AI拆解→多平台分发', '实战工作坊：生成个人品牌内容基因图谱']],
      ['设计数据投行的商业模式（约20页）', ['混合收入模型：高客单价服务 + 中低客单价产品 + 生态合作收入', 'LTV测算模型：留存率、ACV、毛利率', '获客与增长路径：内容获客 + 生态获客']],
      ['管理液态组织与构建自动增长引擎（约25页）', ['「液态团队」理念：目标驱动、角色柔性、信息透明、快速协同', '三级火箭增长模型：市场增长→组织效能→ROI引擎', 'KPI体系设计与看板构建']],
      ['系统化复盘与顶尖认证通关辅导（约20页）', ['「保留/优化/砍掉/新增」四象限迭代模型', '「中国数据资产投行TOP50」认证逻辑', '实战工作坊：搭建《认证申报包》框架']],
      ['课程总结与毕业典礼', ['三天课程能力闭环回顾', '「大有数据资产投行联盟」启航', '课后任务：《个人品牌内容策略》+《商业化方案书》+《自动增长系统看板》+《认证申报包》']]
    ]
  }
]

const transformPhases = [
  {
    label: '30天',
    title: '筑基期——重建你对数据的认知',
    desc: '系统学习数据战略分析底层框架，完成三次真实企业数据资产诊断',
    milestone: '独立完成企业数据资产诊断报告',
    tone: 'cyan'
  },
  {
    label: '30天',
    title: '实战期——让能力长在身上',
    desc: '进入真实项目全流程，资源拓展模块同步启动',
    milestone: '完成至少一个真实项目全流程',
    tone: 'gold'
  },
  {
    label: '30天',
    title: '突破期——从学习者变为输出者',
    desc: '独立完成项目交付，启动个人品牌运营',
    milestone: '独立完成项目交付，实现首笔项目收入',
    tone: 'gold-strong'
  }
]

const coreCourses = [
  { num: 1, name: '数据应用分析', img: '/data-gold-metaphor.webp', output: '看懂数据价值的底层逻辑' },
  { num: 2, name: '数据金融化', img: '/finance-blueprint.webp', output: '从估值到资本的完整路径' },
  { num: 3, name: '资源拓展技术', img: '/data-exchange-map.webp', output: '成为生态的连接器' },
  { num: 4, name: '超级话术', img: '/smart-agent-visual.webp', output: '让专业被听懂的力量' },
  { num: 5, name: '个人品牌打造', img: '/cta-action.webp', output: '从无名到有影响力' }
]

const transformAccordions = [
  { title: '90天成长路线图', body: ['90天分为三个阶段：筑基期（Day 1-30）、实战期（Day 31-60）、突破期（Day 61-90）。', '每个阶段都有明确的学习目标、实战任务和里程碑考核，确保学员在每一个阶段都有实质性的成长。'] },
  { title: '五大课程体系详解', body: ['五大课程覆盖数据资产管理师所需的全部核心能力：数据分析、金融化运作、资源拓展、沟通表达、品牌建设。', '每一门课程都由行业专家亲自授课，理论与实战相结合。'] },
  { title: '导师阵容与学习模式', body: ['课程采用"线上录播 + 每周直播答疑 + 项目实战"的混合学习模式。', '大有老师亲自带队，每周直播解答学员实战中的困惑，确保学以致用。'] },
  { title: '考核标准与淘汰机制', body: ['每个阶段结束都有严格的考核，考核内容包括理论测试、实战项目、综合答辩。', '通过全部考核的学员，将获得有数科技认证的"数据资产管理师"证书。'] }
]

const financeRockets = [
  ['第一级火箭', '金融化启蒙', '数据知识产权质押贷款', '500万—8000万元', '1—2个月', '青岛能源集团 6000万授信'],
  ['第二级火箭', '规模化放大', '数据ABS发行', '5000万—5亿元', '3—6个月', '适合中大型数据企业'],
  ['第三级火箭', '全球化流通', '海外RWA架构', '无上限', '4—8个月', '全球流动性，国际化数据平台']
]

const financeTable = {
  headers: ['对比维度', '数据知识产权质押贷款', '数据ABS发行', '海外RWA架构'],
  lead: [0],
  headTone: { 1: 'tone-cyan', 2: 'tone-gold', 3: 'tone-gold-strong' },
  columnTone: { 1: 'tone-cyan-soft', 2: 'tone-gold-faint', 3: 'tone-gold-warm' },
  rows: [
    ['准入门槛', '较低', '较高', '高'],
    ['融资金额', '500万—8000万元', '5000万—5亿元', '无上限'],
    ['融资周期', '1—2个月', '3—6个月', '4—8个月'],
    ['适合企业', '中小企业', '中大型数据企业', '国际化数据平台'],
    ['风险等级', '中低', '中等', '中高'],
    ['有数服务能力', '全链条', '全链条', '全链条'],
    ['核心优势', '门槛低、周期短', '金额大、成本可控', '全球流动性']
  ]
}

const financeAccordions = [
  { title: '第一级火箭：数据知识产权质押贷款', body: ['数据知识产权质押贷款是数据资产金融化的入门路径，门槛低、周期短、风险可控。', '适合中小企业快速获得融资，单笔金额通常在500万-8000万元之间，周期1-2个月。'] },
  { title: '第二级火箭：数据ABS发行', body: ['数据ABS（资产证券化）发行是数据资产金融化的规模化路径，融资金额大、成本可控。', '适合拥有大量数据资产的中大型企业，单笔融资可达5000万-5亿元，周期3-6个月。'] },
  { title: '第三级火箭：海外RWA架构', body: ['海外RWA（Real World Assets）架构是数据资产金融化的全球化路径，将数据资产与全球资本市场连接。', '融资金额无上限，可获得全球流动性，适合有国际化布局的数据平台企业。'] }
]

const promotionLevels = [
  { icon: Briefcase, name: '企业战略合伙人', income: '年50-100万+', detail: '年薪+股权/期权+项目跟投收益', tone: 'gold-strong' },
  { icon: Users, name: '社群负责人', income: '年30-60万', detail: '项目服务费+社群管理津贴+团队业绩分成', tone: 'gold' },
  { icon: Award, name: '认证数据资产管理师', income: '年15-30万', detail: '项目服务费（3000-5000元/天）', tone: 'cyan' },
  { icon: GraduationCap, name: '双百计划入选学员', income: '90天系统集训', detail: '开启职业跃迁之旅', tone: 'base' }
]

const promotionTable = {
  headers: ['晋升阶段', '典型成长周期', '保守年收入', '标准年收入', '优秀年收入', '核心收入构成'],
  lead: [0],
  gold: [3, 4],
  bright: [4],
  mono: [2, 3, 4],
  muted: [5],
  rows: [
    ['双百入选学员', '0–3个月', '5–8万', '8–12万', '12–15万', '课程津贴+项目实习补贴'],
    ['认证数据资产管理师', '3–12个月', '15–20万', '20–30万', '30–40万', '项目服务费（3000–5000元/天）'],
    ['社群负责人', '1–2年', '30–40万', '40–60万', '60–80万', '项目服务费+社群管理津贴+团队业绩分成'],
    ['企业战略合伙人', '2年以上', '50–70万', '70–100万', '100万+', '年薪+股权/期权+项目跟投收益']
  ]
}

const promotionAccordions = [
  { title: '四级晋升阶梯详解', body: ['从双百计划入选学员到认证数据资产管理师，再到社群负责人，最终成为企业战略合伙人，每一步都有清晰的能力要求、考核标准和收入预期。'] },
  { title: '为什么晋升通道如此重要', body: ['大多数人选择职业时，只看起点不看终点。数据资产管理师的魅力在于，它的天花板极高，从15万/年到100万+，只需要2-3年的持续努力。'] },
  { title: '收入测算与实际案例', body: ['以上收入测算基于保守估计。实际上，在金融化模式下，优秀的数据资产管理师单年项目分成即可达到30-80万元。', '成为合伙人后，股权增值的收益更是无法估量。'] },
  { title: '如何加速晋升', body: ['加速晋升的核心是"结果导向"，项目数量、项目质量、客户满意度、团队贡献是考核的四大维度。', '有数科技为每一位学员建立清晰的成长档案，定期进行能力评估和晋升推荐。'] }
]

const actionReasons = [
  '数据资产时代已经来临，99.9%的企业尚未行动——你准备好成为那0.1%的先行者，还是继续站在岸边观望潮水？',
  '如果你不做，你的竞争对手正在做。如果你的同行率先掌握了数据资产入表、融资、交易的全链路能力，你所在的企业将付出多大的代价来追赶？',
  '一年后的你，会站在什么位置？是会感谢今天做出的这个决定，还是会因为又一次错过风口而懊恼"当初要是行动了就好了"？'
]

const actionSteps = [
  ['01', '提交申请', '扫码或点击链接，填写申请表', '5分钟时间', '无任何费用'],
  ['02', '预约面试', '缴纳1000元登记金，锁定面试名额', '1000元（可退）', '面试不通过，全额退还'],
  ['03', '开启蜕变', '通过面试，缴纳尾款29,000元', '总计3万元', '90天系统化训练+数据资产盒子']
]

const footerGroups = [
  ['产品', ['数据资产盒子', '双百计划', '90天蜕变', '金融化服务']],
  ['资源', ['政策解读', '行业报告', '案例分享']],
  ['关于', ['公司简介', '联系我们', '加入团队']]
]

function scrollToSection(id) {
  mobileOpen.value = false
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  navScrolled.value = window.scrollY > 100
  scrollProgress.value = scrollable <= 0 ? 0 : Math.min(100, (window.scrollY / scrollable) * 100)
}

let observer
let revealObserver

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target?.id) activeSection.value = visible.target.id
    },
    { threshold: [0.25, 0.45, 0.6] }
  )
  sectionIds.forEach((id) => {
    const element = document.getElementById(id)
    if (element) observer.observe(element)
  })

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          if (entry.target.hasAttribute('data-count-trigger')) animatedNumbers.value = true
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  document.querySelectorAll('.reveal-on-scroll, [data-count-trigger]').forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 0.08}s`)
    revealObserver.observe(element)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  observer?.disconnect()
  revealObserver?.disconnect()
})
</script>

<template>
  <header class="site-nav" :class="{ 'nav-open': mobileOpen, 'nav-scrolled': navScrolled }">
    <button class="brand" type="button" @click="scrollToSection('hero')">有数科技</button>
    <nav class="desktop-nav" aria-label="主导航">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        :class="{ active: activeSection === item.id }"
        @click="scrollToSection(item.id)"
      >
        {{ item.label }}
      </button>
    </nav>
    <button class="nav-cta" type="button" @click="scrollToSection('action')">立即行动</button>
    <button
      class="menu-button"
      type="button"
      :aria-expanded="mobileOpen"
      :aria-label="mobileOpen ? '关闭导航菜单' : '打开导航菜单'"
      @click="mobileOpen = !mobileOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <div v-if="mobileOpen" class="mobile-menu">
    <button class="mobile-close" type="button" aria-label="关闭导航菜单" @click="mobileOpen = false">
      <X :size="28" />
    </button>
    <button v-for="item in navItems" :key="item.id" type="button" @click="scrollToSection(item.id)">
      {{ item.label }}
    </button>
    <button class="mobile-cta" type="button" @click="scrollToSection('action')">立即行动</button>
  </div>

  <aside class="scroll-indicator" aria-hidden="true">
    <div class="scroll-indicator-fill" :style="{ height: `${scrollProgress}%` }"></div>
    <button
      v-for="id in sectionIds"
      :key="id"
      type="button"
      :class="{ active: activeSection === id }"
      @click="scrollToSection(id)"
    ></button>
  </aside>

  <main>
    <section id="hero" class="hero-section">
      <img class="hero-bg" src="/hero-bg.webp" alt="" />
      <div class="hero-overlay"></div>
      <span
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration }"
      ></span>
      <div class="hero-content">
        <p class="eyebrow">万亿数据资产时代</p>
        <h1>数据资产管理师<br />成功之路</h1>
        <div class="hero-rule"></div>
        <p class="hero-subtitle">双百计划精英手册 · 有数科技重磅出品</p>
        <div class="hero-actions">
          <button
            v-for="button in heroButtons"
            :key="button.label"
            :class="['button', button.variant]"
            type="button"
            @click="scrollToSection(button.target)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
      <button class="scroll-cue" type="button" @click="scrollToSection('era')">
        <span>向下滚动探索</span>
        <ChevronDown :size="20" class="chevron" />
      </button>
    </section>

    <section id="era" class="content-section">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">01 / 震撼开篇</p>
        <h2 class="reveal-on-scroll">当数据成为<span>"新黄金"</span></h2>
        <div class="section-rule reveal-on-scroll"></div>
        <div class="image-band reveal-on-scroll">
          <img src="/data-gold-metaphor.webp" alt="数字黄金概念" loading="lazy" />
        </div>
        <p class="lead centered reveal-on-scroll">
          <span
            v-html="'一组数字，足以让任何对财富敏感的人屏住呼吸。2024年，中国数字经济核心产业增加值达到<strong>13.49万亿元</strong>，占GDP比重约10%。从2017年到2023年，中国数字经济总量从27.2万亿元扩张至53.9万亿元，六年翻了一番。数据要素市场本身——这条刚刚被政策唤醒的赛道——2024年同比增长<strong>40.7%</strong>，预计2025年整体规模将突破<strong>2000亿元</strong>。IDC的预测更为惊人：到2028年，全球数据总量将达到393.8ZB。一个比土地更值钱、比黄金更流动、比石油更持久的全新资产类别，正在以指数级速度膨胀。'"
          ></span>
        </p>
        <div class="stats-grid" data-count-trigger>
          <article v-for="stat in eraStats" :key="stat.label" class="metric-card reveal-on-scroll">
            <strong>
              <CountNumber v-if="animatedNumbers" :end="stat.number" :suffix="stat.suffix" :decimals="stat.decimals" />
              <span v-else>0{{ stat.suffix }}</span>
            </strong>
            <span>{{ stat.label }}</span>
            <small>{{ stat.note }}</small>
          </article>
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in eraAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
              <img v-if="item.image" :src="item.image" alt="" loading="lazy" />
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="divergence" class="content-section section-alt">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">02 / 分化警示</p>
        <h2 class="reveal-on-scroll">看不见的分化正在发生</h2>
        <p class="lead quote-line reveal-on-scroll">
          当大多数人还在问"数据资产是什么"的时候，第一波先行者已经完成了从"原始数据"到"融资授信"的全链条闭环。
        </p>
        <div class="stats-grid">
          <article v-for="card in divergenceCards" :key="card.title" class="highlight-card reveal-on-scroll">
            <strong>{{ card.value }}</strong>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
            <small>{{ card.note }}</small>
          </article>
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in divergenceAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
              <DataTable v-if="item.table" :table="item.table" />
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="career-born" class="content-section">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">03 / 新职业诞生</p>
        <h2 class="reveal-on-scroll">每一个万亿级市场的诞生，都会催生一个新职业</h2>
        <DataTable :table="assetEraTable" />
        <div class="value-chain reveal-on-scroll">
          <h3>五层数据价值链</h3>
          <div class="layer-stack">
            <article
              v-for="(layer, index) in valueLayers"
              :key="layer[0]"
              :class="{ highlight: index < 2 }"
              :style="{ marginLeft: `${index * 12}px`, marginRight: `${(valueLayers.length - 1 - index) * 12}px` }"
            >
              <strong>{{ layer[0] }}</strong>
              <span>{{ layer[1] }}</span>
              <small>{{ layer[2] }}</small>
            </article>
          </div>
          <p>价值递增 →</p>
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in careerBornAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
              <DataTable v-if="item.table" :table="item.table" />
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="policy" class="content-section section-alt policy-section">
      <img class="policy-bg" src="/policy-timeline-bg.webp" alt="" loading="lazy" />
      <div class="container">
        <p class="chapter-label reveal-on-scroll">04 / 政策东风</p>
        <h2 class="reveal-on-scroll">政策东风：国家战略下的历史性机遇</h2>
        <div class="timeline">
          <article v-for="(event, index) in policyTimeline" :key="event[0]" :class="['reveal-on-scroll', { reverse: index % 2 }]">
            <span class="dot"></span>
            <div>
              <small>{{ event[0] }}</small>
              <h3>{{ event[1] }}</h3>
              <p>{{ event[2] }}</p>
            </div>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">中国主要数据交易所一览</h3>
        <DataTable :table="exchangeTable" />
        <div class="image-band narrow reveal-on-scroll">
          <img src="/data-exchange-map.webp" alt="数据交易所分布" loading="lazy" />
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in policyAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="career-detail" class="content-section">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">05 / 职业详解</p>
        <h2 class="reveal-on-scroll">数据资产管理师：新职业的崛起与价值</h2>
        <div class="card-grid three">
          <article v-for="role in careerRoles" :key="role.title" class="feature-card career-role-card reveal-on-scroll">
            <component :is="role.icon" class="role-icon" :size="48" stroke-width="2" />
            <h3>{{ role.title }}</h3>
            <p>{{ role.desc }}</p>
          </article>
        </div>
        <div class="two-column reveal-on-scroll">
          <img class="rounded-image" src="/career-five-dimensions.webp" alt="五维能力图谱" loading="lazy" />
          <div>
            <h3 class="subheading">五维能力图谱</h3>
            <article v-for="ability in careerAbilities" :key="ability.name" class="ability-row">
              <component :is="ability.icon" class="ability-icon" :size="24" stroke-width="2" />
              <div>
                <strong>{{ ability.name }}</strong>
                <span>{{ ability.desc }}</span>
              </div>
            </article>
          </div>
        </div>
        <h3 class="subheading reveal-on-scroll">职业对比</h3>
        <DataTable :table="careerCompareTable" />
        <h3 class="subheading reveal-on-scroll">三种收入模式对比</h3>
        <DataTable :table="incomeModeTable" />
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in careerAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="youshu" class="content-section section-alt">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">06 / 有数科技</p>
        <h2 class="reveal-on-scroll">有数科技：数据资产领域的专业领航者</h2>
        <div class="two-column reveal-on-scroll">
          <div>
            <p class="lead">
              广州有数数字科技有限公司，这个名字正被越来越多企业和金融机构提及，不是因为声量最大，而是因为它在行业最核心的环节上，扎下了最深的根。
            </p>
            <p class="body-copy">
              有数的定位是<strong>数据资产全链路服务商</strong>，培训只是生态的一环，真正的内核是帮助企业完成从数据资源盘点、场景建模、价值评估、合规确权到金融化变现的完整闭环。
            </p>
          </div>
          <img class="rounded-image" src="/youshu-office.webp" alt="有数科技办公环境" loading="lazy" />
        </div>
        <h3 class="subheading reveal-on-scroll">三大核心壁垒</h3>
        <div class="card-grid three">
          <article v-for="wall in youshuWalls" :key="wall.name" class="highlight-card small-text wall-card reveal-on-scroll">
            <component :is="wall.icon" class="wall-icon" :size="40" stroke-width="2" />
            <h3>{{ wall.name }}</h3>
            <p><span>技术门槛：</span>{{ wall.threshold }}</p>
            <p><span>市场稀缺性：</span><strong>{{ wall.scarcity }}</strong></p>
            <p><span>核心价值：</span>{{ wall.value }}</p>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">完整服务闭环</h3>
        <div class="service-flow reveal-on-scroll">
          <template v-for="(step, index) in serviceSteps" :key="step">
            <span>{{ step }}</span>
            <b v-if="index < serviceSteps.length - 1">→</b>
          </template>
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in youshuAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="toolbox" class="content-section">
      <div class="container centered-block">
        <p class="chapter-label reveal-on-scroll">07 / 数据资产盒子</p>
        <h2 class="reveal-on-scroll">数据资产盒子：从咨询到金融化的完整工具链</h2>
        <img class="toolbox-image reveal-on-scroll" src="/data-asset-box.webp" alt="数据资产盒子" loading="lazy" />
        <div class="quote-block reveal-on-scroll">
          <div></div>
          <p class="gold-quote">盒子装进去的是企业沉睡的数据，<br />拿出来的是真金白银的资本</p>
          <div></div>
        </div>
        <div class="card-grid two">
          <article v-for="module in toolboxModules" :key="module.num" class="feature-card toolbox-module reveal-on-scroll">
            <div>
              <component :is="module.icon" :size="32" stroke-width="2" />
              <small>{{ module.num }}</small>
            </div>
            <h3>{{ module.title }}</h3>
            <p>{{ module.desc }}</p>
          </article>
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in toolboxAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="dual-hundred" class="content-section section-alt">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">08 / 双百计划</p>
        <h2 class="reveal-on-scroll">双百计划：百人精英招募令</h2>
        <p class="gold-quote left reveal-on-scroll">招的不是学生，是战友</p>
        <div class="card-grid two">
          <article class="plan-card cyan reveal-on-scroll">
            <Trophy :size="40" class="plan-icon cyan" />
            <h3>第一"百"——百里挑一的面试筛选制</h3>
            <p>只招100人，面试通过后才有资格获得入场券。这不是饥饿营销，而是对每一个学员负责。</p>
            <strong>面试不通过，1000元登记金全额退还</strong>
          </article>
          <article class="plan-card gold reveal-on-scroll">
            <Network :size="40" class="plan-icon gold" />
            <h3>第二"百"——百亿级生态资源赋能</h3>
            <p>30+行业模型、AI估价系统、金融化全链路通道，全部向学员开放。</p>
            <strong>你拿到的不只是一套工具，而是一个成熟商业体系的全部火力支援</strong>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">筛选标准</h3>
        <div class="card-grid three">
          <article v-for="item in criteria" :key="item.num" class="feature-card numbered reveal-on-scroll">
            <strong>{{ item.num }}</strong>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">投入与回报</h3>
        <DataTable :table="investTable" />
        <h3 class="subheading reveal-on-scroll">权益矩阵</h3>
        <DataTable :table="rightsTable" />
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in dualAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="instructors" class="content-section">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">CHAPTER 06</p>
        <h2 class="reveal-on-scroll">顶尖导师阵容</h2>
        <p class="body-copy reveal-on-scroll">来自立法前沿、学术巅峰与行业实战的顶级智囊团</p>
        <div class="card-grid three instructor-grid">
          <article v-for="teacher in instructors" :key="teacher.name" class="instructor-card reveal-on-scroll">
            <div class="instructor-line"></div>
            <div class="instructor-photo">
              <img :src="teacher.image" :alt="teacher.name" loading="lazy" />
            </div>
            <div class="instructor-content">
              <h3>{{ teacher.name }}</h3>
              <p class="role">{{ teacher.role }}</p>
              <div class="instructor-divider"></div>
              <ul>
                <li v-for="bullet in teacher.bullets" :key="bullet">
                  <span></span>
                  <b>{{ bullet }}</b>
                </li>
              </ul>
              <div class="tags">
                <span v-for="tag in teacher.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="curriculum" class="content-section section-alt">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">CHAPTER 07</p>
        <h2 class="reveal-on-scroll">数据资产投行四阶课程体系</h2>
        <p class="body-copy reveal-on-scroll">三天制课程 · 从认知破局到商业放大的完整闭环</p>
        <div class="curriculum-list">
          <article v-for="stage in curriculum" :key="stage.number" class="curriculum-card reveal-on-scroll">
            <div class="curriculum-inner">
              <aside class="curriculum-aside">
                <div class="curriculum-bar"></div>
                <p>{{ stage.number }}</p>
              </aside>
              <div class="curriculum-body">
              <h3>{{ stage.title }}</h3>
              <div class="course-meta">
                <span class="duration">{{ stage.duration }}</span>
                <b>{{ stage.instructor }}</b>
              </div>
              <div class="module-grid">
                <div v-for="module in stage.modules" :key="module[0]" class="module-card">
                  <h4>{{ module[0] }}</h4>
                  <ul>
                    <li v-for="point in module[1]" :key="point">
                      <span></span>
                      <b>{{ point }}</b>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="transformation" class="content-section">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">09 / 90天蜕变</p>
        <h2 class="reveal-on-scroll">90天蜕变计划：系统化成长路径</h2>
        <div class="phase-grid">
          <article v-for="(phase, index) in transformPhases" :key="phase.title" :class="['reveal-on-scroll', phase.tone]">
            <div class="phase-head">
              <strong>{{ phase.label }}</strong>
              <span v-if="index < transformPhases.length - 1">→</span>
            </div>
            <h3>{{ phase.title }}</h3>
            <p>{{ phase.desc }}</p>
            <small>里程碑：{{ phase.milestone }}</small>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">五大核心课程</h3>
        <div class="core-course-grid reveal-on-scroll">
          <article v-for="course in coreCourses" :key="course.num" class="core-course-card">
            <div>
              <img :src="course.img" :alt="course.name" loading="lazy" />
            </div>
            <section>
              <span>{{ String(course.num).padStart(2, '0') }}</span>
              <h4>{{ course.name }}</h4>
              <p>{{ course.output }}</p>
            </section>
          </article>
        </div>
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in transformAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="finance" class="content-section section-alt">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">10 / 金融化蓝图</p>
        <h2 class="reveal-on-scroll">金融化蓝图：数据资产的资本化路径</h2>
        <p class="finance-quote reveal-on-scroll">"数据金融化的本质，是让沉默的数据开口说话，说的还是全球通用的资本语言。"</p>
        <div class="image-band narrow reveal-on-scroll">
          <img src="/finance-blueprint.webp" alt="金融化蓝图" loading="lazy" />
        </div>
        <div class="rocket-stack">
          <article v-for="(rocket, index) in financeRockets" :key="rocket[0]" :class="['reveal-on-scroll', `rocket-${index + 1}`]">
            <small>{{ rocket[0] }} · {{ rocket[1] }}</small>
            <h3>{{ rocket[2] }}</h3>
            <div>
              <span>融资金额：<strong>{{ rocket[3] }}</strong></span>
              <span>融资周期：{{ rocket[4] }}</span>
            </div>
            <span>{{ rocket[5] }}</span>
            <b v-if="index < financeRockets.length - 1">↑</b>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">三种方式对比</h3>
        <DataTable :table="financeTable" />
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in financeAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="promotion" class="content-section">
      <div class="container">
        <p class="chapter-label reveal-on-scroll">11 / 晋升通道</p>
        <h2 class="reveal-on-scroll">从学员到合伙人：无限可能的晋升通道</h2>
        <p class="gold-quote left reveal-on-scroll">证书不是终点，而是事业的起点</p>
        <div class="promotion-stack">
          <article v-for="(level, index) in promotionLevels" :key="level.name" :class="['reveal-on-scroll', level.tone]">
            <div>
              <component :is="level.icon" :size="28" stroke-width="2" />
            </div>
            <section>
              <h3>{{ level.name }}</h3>
              <p><strong>{{ level.income }}</strong><span>{{ level.detail }}</span></p>
            </section>
            <b v-if="index < promotionLevels.length - 1">↑</b>
          </article>
        </div>
        <h3 class="subheading reveal-on-scroll">收入测算表</h3>
        <DataTable :table="promotionTable" />
        <div class="accordion-list reveal-on-scroll">
          <details v-for="item in promotionAccordions" :key="item.title" class="accordion">
            <summary>{{ item.title }}</summary>
            <div class="accordion-body">
              <p v-for="paragraph in item.body" :key="paragraph" v-html="paragraph"></p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="action" class="action-section">
      <img src="/cta-action.webp" alt="" loading="lazy" />
      <div class="action-overlay"></div>
      <div class="container action-content">
        <p class="chapter-label reveal-on-scroll">12 / 立即行动</p>
        <h2 class="reveal-on-scroll">立即行动：你的第一步</h2>
        <div class="reason-list">
          <article v-for="(reason, index) in actionReasons" :key="reason" class="reveal-on-scroll">
            <strong>{{ index + 1 }}</strong>
            <p>{{ reason }}</p>
          </article>
        </div>
        <div class="card-grid three">
          <article v-for="(step, index) in actionSteps" :key="step[0]" :class="['action-card', 'reveal-on-scroll', { featured: index === 2 }]">
            <small>{{ step[0] }}</small>
            <h3>{{ step[1] }}</h3>
            <p>{{ step[2] }}</p>
            <strong>{{ step[3] }}</strong>
            <span>{{ step[4] }}</span>
          </article>
        </div>
        <div class="action-cta reveal-on-scroll">
          <button class="button primary large" type="button">立即报名，锁定席位</button>
        </div>
        <div class="closing reveal-on-scroll">
          <div></div>
          <p>这不是一次普通的职业选择，<br />这是一张通往新资产时代的船票。<br />而船，正在鸣笛。</p>
          <div></div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>有数科技</h3>
          <p>数据资产全链路服务商</p>
          <small>广州有数数字科技有限公司</small>
        </div>
        <div v-for="group in footerGroups" :key="group[0]">
          <h4>{{ group[0] }}</h4>
          <span v-for="item in group[1]" :key="item">{{ item }}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 广州有数数字科技有限公司</span>
        <span>数据资产管理师成功之路</span>
      </div>
    </div>
  </footer>
</template>
