import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, Database, Gauge, Layers3, LineChart, Menu, MousePointer2, Search, Settings2, ShoppingCart, Sparkles, Target, Terminal, TrendingDown, TrendingUp, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCMSPage, parseJSON } from "@/hooks/useCMSPage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { HOME_DEFAULTS } from "@/lib/sitePageDefaults";
import CTAButton from "@/components/CTAButton";

const steps = [
  ["01", "AUDIT", "Find wasted spend, broken signals and missed opportunities."],
  ["02", "ARCHITECT", "Design the account around intent, economics and customer journey."],
  ["03", "LAUNCH", "Build campaigns, tracking, audiences and testing systems."],
  ["04", "OPTIMIZE", "Turn performance data into weekly decisions and compounding gains."],
];

export default function Home() {
  const { content } = useCMSPage("home", HOME_DEFAULTS);
  const { settings } = useSiteSettings();
  const [services, setServices] = useState([]);
  const [cases, setCases] = useState([]);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    Promise.all([
      base44.entities.Service.list("display_order", 6),
      base44.entities.CaseStudy.filter({ published: true }, "display_order", 6),
      base44.entities.Industry.filter({ published: true }, "display_order", 6),
    ]).then(([s, c, i]) => { setServices(s || []); setCases(c || []); setIndustries(i || []); }).catch(() => {});
  }, []);

  const featuredSections = parseJSON(content.featured_sections, HOME_DEFAULTS.featured_sections);
  const processSteps = parseJSON(content.process_steps, steps.map(([num,title,desc]) => ({ num, title, desc })));
  const stats = [
    [settings.monthly_ad_spend || "$3.6M+", "AD SPEND MANAGED", "capital"],
    [settings.projects_count || "50+", "PROJECTS", "projects"],
    [settings.years_experience || "3+", "YEARS EXPERIENCE", "years"],
    ["78%", "CPA REDUCTION", "efficiency"],
  ];

  return <div className="retro-site">
    <section className="retro-hero">
      <div className="retro-grid" />
      <div className="retro-hero-copy">
        <div className="retro-kicker"><span className="pulse-dot" /> {content.hero_badge || "PERFORMANCE MARKETING SPECIALIST"}</div>
        <h1>{content.hero_title || "LET'S GROW YOUR BUSINESS THROUGH"}<span>{content.hero_highlight || " SMARTER DIGITAL MARKETING."}</span></h1>
        <p>{content.hero_description || "Google Ads, conversion tracking and growth strategy designed around measurable business results."}</p>
        <div className="retro-actions">
          <CTAButton to={settings.booking_url || "/contact"} size="lg">{content.hero_primary_cta || "BOOK A FREE CONSULTATION"}<ArrowUpRight /></CTAButton>
          <CTAButton to="/case-studies" variant="secondary" size="lg">{content.hero_secondary_cta || "VIEW MY WORK"}<ArrowRight /></CTAButton>
        </div>
        <div className="retro-proofline"><span>SEARCH</span><i /> <span>SHOPPING</span><i /> <span>P.MAX</span><i /> <span>GA4</span><i /> <span>GTM</span><i /> <span>CRO</span></div>
      </div>
      <div className="retro-console">
        <div className="console-bar"><span>OVJ / PERFORMANCE CONSOLE</span><b><i /> LIVE</b></div>
        <div className="console-photo">
          {content.hero_image || settings.profile_photo ? <img src={content.hero_image || settings.profile_photo} alt="Ovejite Vhowmick" /> : <div className="console-avatar">OV</div>}
          <div className="photo-label"><span>PROFILE / 01</span><strong>OV</strong></div>
          <div className="scan" />
        </div>
        <div className="console-metrics">
          <Metric label={content.hero_roas_label || "ROAS"} value={content.hero_roas || "4.8x"} icon={TrendingUp} />
          <Metric label={content.hero_conversions_label || "CONVERSIONS"} value={content.hero_conversions || "+186%"} icon={Target} />
          <Metric label={content.hero_spend_label || "MONTHLY SPEND"} value={settings.monthly_ad_spend || "$3.6M+"} icon={BarChart3} />
        </div>
        <div className="console-footer"><span>GOOGLE ADS</span><span>DATA</span><span>OPTIMIZATION</span><span>GROWTH</span></div>
      </div>
    </section>

    <section className="retro-stats">
      <div className="retro-section-label">/ THE NUMBERS</div>
      <div className="retro-stat-grid">{stats.map(([v,l,k]) => <div className="retro-stat" key={l}><strong>{v}</strong><span>{l}</span><small>{k}</small></div>)}</div>
    </section>

    <section className="retro-section dark-section">
      <div className="retro-section-label">/ THE PROBLEM</div>
      <div className="statement-grid">
        <h2>MOST BUSINESSES<br />DON&apos;T HAVE A<br /><em>TRAFFIC PROBLEM.</em></h2>
        <div><p className="big-copy">They have a measurement and optimization problem.</p><p>My job is to connect advertising, tracking, audiences, landing pages and business economics into one system—then continuously improve it.</p><a href="#services" className="arrow-link">SEE THE SYSTEM <ArrowRight /></a></div>
      </div>
    </section>

    <section id="services" className="retro-section">
      <div className="retro-section-label">/ WHAT I DO</div>
      <div className="section-title-row"><h2>THE FULL<br /><em>STACK.</em></h2><p>Every service is designed around measurable business outcomes—not just platform activity.</p></div>
      <div className="service-terminal">
        {(services.length ? services : featuredSections.slice(0,4).map((x,i) => ({ id:i, title:x.eyebrow || x.title, short_description:x.description, features:x.services }))).map((service, i) => <article key={service.id || i}>
          <div className="service-index">0{i+1}</div><div className="service-icon"><ServiceIcon index={i} /></div>
          <div className="service-main"><h3>{service.title}</h3><p>{service.short_description || service.description}</p><div className="service-tags">{(service.features || service.services || []).slice(0,4).map(t => <span key={t}>{t}</span>)}</div></div>
          <ArrowUpRight className="service-arrow" />
        </article>)}
      </div>
    </section>

    <section className="retro-section blue-section">
      <div className="retro-section-label">/ PERFORMANCE ENGINE</div>
      <div className="performance-layout">
        <div><h2>DATA IN.<br /><em>DECISIONS OUT.</em></h2><p>Campaigns are only as good as the signals feeding them. I build the measurement layer first, then use it to make smarter acquisition decisions.</p></div>
        <div className="data-board">
          <div className="board-head"><span>PERFORMANCE / SIGNAL</span><span>STATUS: HEALTHY</span></div>
          <div className="signal"><span>CONVERSION QUALITY</span><b>92%</b><div><i style={{width:"92%"}} /></div></div>
          <div className="signal"><span>TRACKING COVERAGE</span><b>98%</b><div><i style={{width:"98%"}} /></div></div>
          <div className="signal"><span>BUDGET EFFICIENCY</span><b>86%</b><div><i style={{width:"86%"}} /></div></div>
          <div className="board-foot"><Terminal /> GA4 / GTM / GOOGLE ADS / ENHANCED CONVERSIONS</div>
        </div>
      </div>
    </section>

    <section id="work" className="retro-section">
      <div className="retro-section-label">/ SELECTED WORK</div>
      <div className="section-title-row"><h2>REAL WORK.<br /><em>REAL GROWTH.</em></h2><p>Strategy, tracking and optimization behind real projects. Detailed case studies stay connected to the CMS, so your admin updates appear here automatically.</p></div>
      <div className="case-grid-retro">{cases.length ? cases.slice(0,4).map((c,i) => <CaseCard key={c.id || i} item={c} index={i} />) : <EmptyCaseCards />}</div>
      <div className="center-action"><CTAButton to="/case-studies" variant="secondary">VIEW ALL CASE STUDIES <ArrowRight /></CTAButton></div>
    </section>

    <section className="retro-section dark-section industries-section">
      <div className="retro-section-label">/ INDUSTRIES</div>
      <div className="industry-grid">{industries.length ? industries.slice(0,6).map((x,i) => <div className="industry-cell" key={x.id || i}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.description}</p><ArrowUpRight /></div>) : <><IndustryFallback title="E-COMMERCE" text="Acquisition systems built around revenue, margin and customer value."/><IndustryFallback title="LEAD GEN" text="Intent-focused campaigns with call and form tracking."/><IndustryFallback title="LOCAL SERVICES" text="Location-aware acquisition and conversion optimization."/></>}</div>
    </section>

    <section className="retro-section process-section">
      <div className="retro-section-label">/ THE PROCESS</div>
      <div className="process-grid"><div><h2>FROM DATA<br />TO <em>GROWTH.</em></h2></div><div>{processSteps.map((s,i)=><div className="process-row" key={s.num || i}><span>{s.num || `0${i+1}`}</span><div><h3>{s.title}</h3><p>{s.desc}</p></div><ChevronRight /></div>)}</div></div>
    </section>

    <section id="about" className="retro-about">
      <div className="about-terminal"><div className="console-bar"><span>ABOUT / OVEJITE VHOWMICK</span><b>ONLINE</b></div><div className="about-image">{settings.profile_photo ? <img src={settings.profile_photo} alt="Ovejite Vhowmick" /> : <div>OV</div>}<span>PERFORMANCE MARKETER / 01</span></div></div>
      <div className="about-copy"><div className="retro-section-label">/ ABOUT</div><h2>THE MARKETER<br />BEHIND THE<br /><em>NUMBERS.</em></h2><p>{settings.short_bio || "I help businesses grow through smarter advertising, accurate tracking, and continuous optimization."}</p><p>My approach connects advertising, data and conversion optimization—because growth happens when those systems work together.</p><div className="credential-list"><span><Check /> $3.6M+ AD SPEND</span><span><Check /> GOOGLE ADS</span><span><Check /> GA4 / GTM</span><span><Check /> CRO</span></div></div>
    </section>

    <section className="retro-contact" id="contact"><div className="retro-grid" /><div className="contact-inner"><div className="retro-section-label">/ HAVE A GROWTH PROBLEM?</div><h2>LET&apos;S MAKE<br /><em>IT PROFITABLE.</em></h2><p>{content.final_cta_description || "If you're looking to improve your paid advertising, fix your conversion tracking, or build a stronger growth strategy, let's start with a conversation."}</p><div className="contact-actions"><CTAButton to={settings.booking_url || "/contact"}>{content.final_cta_primary || "BOOK A CALL"}<ArrowUpRight /></CTAButton><CTAButton to="/contact" variant="secondary">SEND A MESSAGE <ArrowRight /></CTAButton></div></div></section>
  </div>;
}

function Metric({label,value,icon:Icon}) { return <div className="metric"><div><Icon /><span>{label}</span></div><strong>{value}</strong></div>; }
function ServiceIcon({index}) { const icons=[Search,ShoppingCart,Database,Gauge]; const I=icons[index%icons.length]; return <I />; }
function CaseCard({item,index}) { return <article className={`case-retro case-${index%4}`}><div className="case-top"><span>CASE / {String(index+1).padStart(2,"0")}</span><span>{item.industry || "PERFORMANCE"}</span></div><div className="case-chart"><div className="case-big">{index===0?"78%":index===1?"300%":"+186%"}</div><svg viewBox="0 0 500 150" preserveAspectRatio="none"><polyline points="0,130 60,118 110,123 160,82 215,92 265,55 320,66 365,35 420,44 470,12 500,20" fill="none" stroke="currentColor" strokeWidth="5" /></svg></div><div className="case-body"><span>{item.industry || "GOOGLE ADS"}</span><h3>{item.title}</h3><p>{item.excerpt}</p><a href={`/case-studies/${item.slug}`}>READ CASE <ArrowUpRight /></a></div></article>; }
function EmptyCaseCards(){ return <div className="empty-cases"><Sparkles /><h3>YOUR CMS CASE STUDIES APPEAR HERE</h3><p>Add or publish case studies from the admin panel and this section will populate automatically.</p></div>; }
function IndustryFallback({title,text}){return <div className="industry-cell"><span>+</span><h3>{title}</h3><p>{text}</p><ArrowUpRight /></div>}
