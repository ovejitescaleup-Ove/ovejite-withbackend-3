import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Code2,
  Crosshair,
  Gauge,
  Globe2,
  Layers3,
  LineChart,
  Menu,
  MousePointer2,
  Play,
  Radio,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  X,
} from "lucide-react";

const stats = [
  ["$3.6M+", "Google Ads spend managed"],
  ["78%", "cost per conversion reduction"],
  ["300%", "near-term ROAS growth"],
  ["1,858+", "lead growth in a major rebuild"],
];

const services = [
  {
    num: "01",
    icon: Search,
    title: "Google Ads",
    text: "Search, Shopping and Performance Max systems built around profitable intent—not vanity traffic.",
    tags: ["Search", "Shopping", "PMax"],
  },
  {
    num: "02",
    icon: LineChart,
    title: "Performance Optimization",
    text: "Continuous bid, budget, query, audience and creative decisions based on real business signals.",
    tags: ["Bids", "Budgets", "Testing"],
  },
  {
    num: "03",
    icon: Layers3,
    title: "Tracking & Measurement",
    text: "GA4, GTM, Google Ads conversions, enhanced conversions and Consent Mode V2 connected into one measurement layer.",
    tags: ["GA4", "GTM", "CAPI-ready"],
  },
  {
    num: "04",
    icon: ShoppingBag,
    title: "E-commerce Growth",
    text: "Full-funnel acquisition for stores: Shopping, PMax, Search, Demand Gen and advanced retargeting.",
    tags: ["E-commerce", "Feeds", "CRO"],
  },
];

const cases = [
  {
    id: "CASE / 01",
    title: "From $382 CPA to $85",
    label: "Lead generation restructure",
    result: "78% lower cost / conversion",
    details: [
      "Audited a bloated Google Ads account",
      "Rebuilt the funnel across 21 campaigns",
      "Connected call + form conversion tracking",
      "Reallocated budget toward proven intent",
    ],
  },
  {
    id: "CASE / 02",
    title: "A 360° E-commerce Sales Engine",
    label: "Search + Shopping + PMax",
    result: "Nearly 300% ROAS",
    details: [
      "Built the acquisition funnel from the ground up",
      "Combined Search, Shopping and Performance Max",
      "Added Demand Gen + advanced retargeting",
      "Scaled around revenue quality and margin",
    ],
  },
  {
    id: "CASE / 03",
    title: "Measurement That Can Actually Scale",
    label: "Tracking & privacy",
    result: "Cleaner conversion signals",
    details: [
      "Implemented cookie consent architecture",
      "Google Consent Mode V2",
      "GA4 + GTM lead and e-commerce events",
      "Google Ads conversion tracking + enhanced conversions",
    ],
  },
];

const workflow = [
  ["01", "AUDIT", "Find wasted spend, broken signals and missed opportunities."],
  ["02", "ARCHITECT", "Design the account around intent, economics and customer journey."],
  ["03", "LAUNCH", "Build campaigns, tracking, audiences and testing systems."],
  ["04", "OPTIMIZE", "Turn performance data into weekly decisions and compounding gains."],
];

function Noise() {
  return <div className="noise" aria-hidden="true" />;
}

function Grid() {
  return <div className="grid-bg" aria-hidden="true" />;
}

export default function Home() {
  return (
    <main>
      <Noise />
      <header className="nav">
        <a className="brand" href="#top" aria-label="Ovejite home">
          OVEJITE<span>.</span>
        </a>
        <nav className="desktop-nav">
          <a href="#work">WORK</a>
          <a href="#services">SERVICES</a>
          <a href="#system">SYSTEM</a>
          <a href="#about">ABOUT</a>
        </nav>
        <a className="nav-cta" href="#contact">LET&apos;S TALK <ArrowUpRight size={15} /></a>
        <button className="mobile-menu" aria-label="Open navigation"><Menu /></button>
      </header>

      <section id="top" className="hero">
        <Grid />
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> PERFORMANCE MARKETING / 2026</div>
          <h1>
            I BUILD
            <br />
            <em>GROWTH</em>
            <br />
            SYSTEMS.
          </h1>
          <p className="hero-lead">
            Google Ads Team Lead &amp; Performance Marketer focused on scalable,
            ROI-driven growth for e-commerce and lead generation businesses.
          </p>
          <div className="hero-actions">
            <a className="btn btn-dark" href="#work">VIEW SELECTED WORK <ArrowUpRight size={18} /></a>
            <a className="text-link" href="#contact">START A PROJECT <span>↗</span></a>
          </div>
        </div>

        <div className="hero-console" aria-label="Performance console">
          <div className="console-head">
            <span>OVJ / PERFORMANCE CONSOLE</span>
            <span>LIVE <i /></span>
          </div>
          <div className="console-main">
            <div className="console-avatar">
              <div className="avatar-ring" />
              <div className="monogram">OV</div>
              <span className="scan-line" />
            </div>
            <div className="console-data">
              <div className="data-row"><span>ROLE</span><b>GOOGLE ADS / PPC</b></div>
              <div className="data-row"><span>MODE</span><b>ROI FIRST</b></div>
              <div className="data-row"><span>MARKETS</span><b>US / EU / AU / NZ</b></div>
              <div className="mini-chart">
                <div className="chart-label"><span>GROWTH INDEX</span><strong>+186%</strong></div>
                <svg viewBox="0 0 420 100" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points="0,78 45,65 82,71 125,42 165,51 210,31 253,40 298,18 340,26 382,8 420,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="console-foot">
            <span>SEARCH</span><span>SHOPPING</span><span>P.MAX</span><span>GA4</span><span>GTM</span><span>CRO</span>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Specialties">
        <div>GOOGLE ADS <span>✦</span> PERFORMANCE MARKETING <span>✦</span> CRO <span>✦</span> GA4 / GTM <span>✦</span> E-COMMERCE <span>✦</span> LEAD GENERATION <span>✦</span></div>
      </section>

      <section className="stats-section">
        <div className="section-kicker">/ THE NUMBERS</div>
        <div className="stats-grid">
          {stats.map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="work section">
        <div className="section-head">
          <div>
            <div className="section-kicker">/ SELECTED WORK</div>
            <h2>LESS NOISE.<br /><em>MORE SIGNAL.</em></h2>
          </div>
          <p>Real account restructures, measurement systems and growth engines built around one thing: better business outcomes.</p>
        </div>
        <div className="case-grid">
          {cases.map((item, index) => (
            <article className={`case-card case-${index + 1}`} key={item.id}>
              <div className="case-top"><span>{item.id}</span><ArrowUpRight size={20} /></div>
              <div className="case-visual">
                <div className="case-orbit" />
                <div className="case-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="case-wave">
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                    <polyline points="0,125 48,108 92,116 138,75 186,87 231,52 276,66 324,29 370,43 421,14 500,2" fill="none" stroke="currentColor" strokeWidth="5" />
                  </svg>
                </div>
              </div>
              <div className="case-content">
                <div className="case-label">{item.label}</div>
                <h3>{item.title}</h3>
                <div className="result">{item.result}</div>
                <ul>{item.details.map((d) => <li key={d}><Check size={15} />{d}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="services section">
        <div className="section-kicker">/ WHAT I DO</div>
        <div className="service-layout">
          <h2>THE FULL<br /><em>STACK.</em></h2>
          <div className="service-list">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service" key={service.num}>
                  <div className="service-icon"><Icon size={22} /></div>
                  <div className="service-num">{service.num}</div>
                  <div className="service-body">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <div className="tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <ArrowUpRight className="service-arrow" size={22} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="system" className="system">
        <div className="system-grid">
          <div className="system-intro">
            <div className="section-kicker">/ MY OPERATING SYSTEM</div>
            <h2>DATA →<br /><em>DECISION</em><br />→ GROWTH</h2>
            <p>Most businesses don&apos;t have a traffic problem. They have a measurement and optimization problem.</p>
          </div>
          <div className="workflow">
            {workflow.map(([num, title, text]) => (
              <div className="workflow-row" key={num}>
                <span>{num}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <ArrowUpRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about section">
        <div className="about-card">
          <div className="about-photo">
            <div className="portrait-placeholder">
              <div className="portrait-grid" />
              <span>OV</span>
              <small>PORTRAIT / DROP IMAGE HERE</small>
            </div>
          </div>
          <div className="about-copy">
            <div className="section-kicker">/ ABOUT OVEJITE</div>
            <h2>THE PERSON<br />BEHIND THE<br /><em>NUMBERS.</em></h2>
            <p>
              Ovejite (Vee) Vhowmick is a Google Ads Team Lead and Performance
              Marketer focused on scalable, ROI-driven growth.
            </p>
            <p>
              He builds and optimizes Search, Shopping and Performance Max campaigns,
              connects GA4/GTM and improves the funnel through tracking, audience
              refinement and conversion-rate optimization.
            </p>
            <div className="credentials">
              <span><Check size={14} /> $3.6M+ AD SPEND</span>
              <span><Check size={14} /> AI-POWERED ADS</span>
              <span><Check size={14} /> CRO</span>
              <span><Check size={14} /> SERVER-SIDE TRACKING</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <Grid />
        <div className="contact-inner">
          <div className="section-kicker">/ HAVE A GROWTH PROBLEM?</div>
          <h2>LET&apos;S MAKE<br /><em>IT PROFITABLE.</em></h2>
          <p>Tell me what you&apos;re selling, where the account is stuck and what success looks like. I&apos;ll tell you what I&apos;d fix first.</p>
          <a className="btn btn-light" href="mailto:hello@ovejite.me">START THE CONVERSATION <ArrowUpRight size={19} /></a>
        </div>
        <div className="contact-corner">OVJ / 2026</div>
      </section>

      <footer>
        <span>© 2026 OVEJITE VHOWMICK</span>
        <span>GOOGLE ADS / PERFORMANCE MARKETING</span>
        <span>OVJ—01</span>
      </footer>
    </main>
  );
}
