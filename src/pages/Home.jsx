import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, Database, Gauge, LineChart, Search, ShoppingCart, Sparkles, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useCMSPage, parseJSON } from "@/hooks/useCMSPage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { HOME_DEFAULTS } from "@/lib/sitePageDefaults";
import CTAButton from "@/components/CTAButton";

const fallbackSteps = [
  ["01", "Audit", "Find wasted spend, broken signals and missed opportunities."],
  ["02", "Build", "Design campaigns, tracking and landing-page journeys around intent."],
  ["03", "Optimize", "Turn performance data into clear weekly decisions and improvements."],
  ["04", "Scale", "Increase what works while protecting efficiency and profitability."],
];

const fallbackServices = [
  { title: "Google Ads", eyebrow: "Paid acquisition", description: "Search, Shopping and Performance Max campaigns built around qualified demand.", features: ["Search", "PMax", "Shopping", "Remarketing"], icon: Search },
  { title: "Conversion Tracking", eyebrow: "Measurement", description: "GA4, GTM and conversion systems that make marketing performance measurable.", features: ["GA4", "GTM", "Enhanced Conversions", "CRM"], icon: Database },
  { title: "Meta Ads", eyebrow: "Social acquisition", description: "Audience, creative and funnel strategy designed to turn attention into leads or sales.", features: ["Prospecting", "Retargeting", "Creative Testing", "CAPI"], icon: Target },
  { title: "Growth Strategy", eyebrow: "Optimization", description: "A connected plan across advertising, tracking, landing pages and business economics.", features: ["Audits", "CRO", "Funnels", "Scaling"], icon: Gauge },
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
    ]).then(([s, c, i]) => {
      setServices(s || []); setCases(c || []); setIndustries(i || []);
    }).catch(() => {});
  }, []);

  const steps = parseJSON(content.process_steps, fallbackSteps.map(([num, title, desc]) => ({ num, title, desc })));
  const image = content.hero_image || settings.profile_photo || "";
  const stats = [
    [settings.monthly_ad_spend || "$3.6M+", "ad spend managed"],
    [settings.projects_count || "50+", "projects supported"],
    [settings.years_experience || "3+", "years experience"],
    ["78%", "CPA reduction*"],
  ];
  const cmsServices = services.length ? services.slice(0, 4).map((s, i) => ({ ...s, icon: [Search, Database, Target, Gauge][i] })) : fallbackServices;

  return <div className="home-page">
    <section className="hero-section">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> {content.hero_badge || "Performance marketing specialist"}</div>
          <h1>{content.hero_title || "Grow smarter."}<span>{content.hero_highlight || "Scale with confidence."}</span></h1>
          <p className="hero-lead">{content.hero_description || "Google Ads, Meta Ads, conversion tracking and growth strategy built around measurable business results."}</p>
          <div className="hero-actions">
            <CTAButton to={settings.booking_url || "/contact"} size="lg" eventName="consultation_click" eventParams={{ location: "hero" }}>{content.hero_primary_cta || "Book a free consultation"}<ArrowUpRight size={18} /></CTAButton>
            <CTAButton to="/case-studies" variant="secondary" size="lg" eventName="view_work_click" eventParams={{ location: "hero" }}>{content.hero_secondary_cta || "View case studies"}<ArrowRight size={18} /></CTAButton>
          </div>
          <div className="platform-line"><span>GOOGLE ADS</span><i /><span>META</span><i /><span>GA4</span><i /><span>GTM</span><i /><span>CRO</span></div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-main">
            {image ? <img src={image} alt="Ovejite Vhowmick — performance marketing specialist" /> : <div className="hero-avatar">OV</div>}
            <div className="hero-image-overlay"><span>OV / PERFORMANCE MARKETING</span><strong>01</strong></div>
          </div>
          <div className="metric-float metric-roas"><span><TrendingUp size={14} /> {content.hero_roas_label || "ROAS"}</span><strong>{content.hero_roas || "4.8x"}</strong><small>growth signal</small></div>
          <div className="metric-float metric-conv"><span><Target size={14} /> {content.hero_conversions_label || "Conversions"}</span><strong>{content.hero_conversions || "+186%"}</strong><small>vs. previous period</small></div>
          <div className="hero-grid-label">MEASURE → OPTIMIZE → SCALE</div>
        </div>
      </div>
      <div className="container trust-strip"><span>Built around outcomes, not platform activity.</span><div><b>Acquisition</b><b>Measurement</b><b>Optimization</b><b>Growth</b></div></div>
    </section>

    <section className="stats-section">
      <div className="container stats-grid">{stats.map(([value, label]) => <div className="stat-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <div className="container stat-note">*Selected case-study result. Performance varies by account, market and offer.</div>
    </section>

    <section className="section problem-section">
      <div className="container split-grid">
        <div><span className="section-kicker">01 / The approach</span><h2>More traffic is not always the answer.</h2></div>
        <div className="copy-column"><p className="large-copy">The real opportunity is usually in the system behind the traffic.</p><p>I connect advertising, tracking, landing pages, audiences and business economics so you can see what is working, fix what is not, and scale with better information.</p><Link className="text-link" to="/about">See how I work <ArrowRight size={16} /></Link></div>
      </div>
    </section>

    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading"><div><span className="section-kicker">02 / Services</span><h2>Everything needed to build a stronger acquisition engine.</h2></div><p>Strategy and execution across the parts of performance marketing that directly influence growth.</p></div>
        <div className="service-grid">{cmsServices.map((service, i) => { const Icon = service.icon || [Search, ShoppingCart, Database, Gauge][i]; return <article className="service-card" key={service.id || service.title}><div className="service-top"><span>0{i + 1}</span><Icon size={20} /></div><span className="service-eyebrow">{service.eyebrow || "Performance marketing"}</span><h3>{service.title}</h3><p>{service.short_description || service.description}</p><div className="tag-list">{(service.features || service.services || []).slice(0, 4).map((x) => <span key={x}>{x}</span>)}</div><Link to={service.slug ? `/services/${service.slug}` : "/services"} className="card-link">Explore service <ArrowUpRight size={16} /></Link></article>; })}</div>
      </div>
    </section>

    <section className="section performance-section">
      <div className="container performance-grid">
        <div><span className="section-kicker light">03 / Measurement</span><h2>Better decisions start with better signals.</h2><p>Before scaling media, I look at the measurement layer: conversion quality, tracking coverage, attribution and the economics behind each acquisition channel.</p><div className="check-list"><span><Check size={16} /> GA4 + GTM architecture</span><span><Check size={16} /> Enhanced conversion tracking</span><span><Check size={16} /> CRM and lead-quality feedback</span><span><Check size={16} /> Weekly optimization decisions</span></div></div>
        <div className="dashboard-card"><div className="dashboard-top"><span>PERFORMANCE / LIVE VIEW</span><b>HEALTHY</b></div><Signal label="Conversion quality" value="92%" width="92%" /><Signal label="Tracking coverage" value="98%" width="98%" /><Signal label="Budget efficiency" value="86%" width="86%" /><div className="dashboard-bottom"><LineChart size={16} /> GA4 / GTM / ADS / CRM</div></div>
      </div>
    </section>

    <section className="section work-section" id="work">
      <div className="container">
        <div className="section-heading"><div><span className="section-kicker">04 / Selected work</span><h2>Proof beats promises.</h2></div><p>Explore the strategy, tracking and optimization behind real projects. Your CMS case studies will appear here automatically.</p></div>
        <div className="case-grid">{cases.length ? cases.slice(0, 4).map((item, i) => <CaseCard item={item} index={i} key={item.id || i} />) : <div className="empty-state"><Sparkles size={24} /><h3>Case studies are ready for your CMS.</h3><p>Add and publish projects from the admin panel and they will appear here.</p></div>}</div>
        <div className="center-button"><CTAButton to="/case-studies" variant="secondary">View all case studies <ArrowRight size={17} /></CTAButton></div>
      </div>
    </section>

    <section className="section industries-section">
      <div className="container"><div className="section-heading"><div><span className="section-kicker">05 / Industries</span><h2>Different businesses need different growth systems.</h2></div><p>Strategies are adapted to customer intent, sales cycles, geography, margins and the way your business actually makes money.</p></div>
        <div className="industry-grid">{industries.length ? industries.slice(0, 6).map((item, i) => <Link to={`/industries/${item.slug}`} className="industry-card" key={item.id || i}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight size={18} /></Link>) : ["E-commerce", "Healthcare", "Home Services", "Local Business", "Professional Services", "B2B"].map((x, i) => <div className="industry-card" key={x}><span>0{i + 1}</span><h3>{x}</h3><p>Performance systems shaped around the buying journey and business model.</p><ArrowUpRight size={18} /></div>)}</div>
      </div>
    </section>

    <section className="section process-section">
      <div className="container split-grid process-grid"><div><span className="section-kicker">06 / Process</span><h2>A clear path from data to growth.</h2><p className="process-intro">No black box. Every engagement starts with understanding the business and ends with a repeatable optimization loop.</p></div><div className="process-list">{steps.map((step, i) => <div className="process-item" key={step.num || i}><span>{step.num || `0${i + 1}`}</span><div><h3>{step.title}</h3><p>{step.desc}</p></div><ChevronRight size={18} /></div>)}</div></div>
    </section>

    <section className="section about-section" id="about">
      <div className="container about-grid"><div className="about-photo">{settings.profile_photo ? <img src={settings.profile_photo} alt="Ovejite Vhowmick" /> : image ? <img src={image} alt="Ovejite Vhowmick" /> : <div>OV</div>}<span>Performance marketer / Ovejite</span></div><div className="about-copy"><span className="section-kicker">07 / About</span><h2>The marketer behind the numbers.</h2><p>{settings.short_bio || "I help businesses grow through smarter advertising, accurate tracking and continuous optimization."}</p><p>My focus is simple: connect paid media with reliable measurement and conversion strategy so marketing decisions are based on business outcomes, not vanity metrics.</p><div className="credential-row"><span><Check size={15} /> Google Ads</span><span><Check size={15} /> GA4 / GTM</span><span><Check size={15} /> Meta Ads</span><span><Check size={15} /> CRO</span></div><Link to="/about" className="text-link">More about Ovejite <ArrowRight size={16} /></Link></div></div>
    </section>

    <section className="final-cta-section"><div className="cta-pattern" /><div className="container final-cta"><span className="section-kicker light">08 / Start here</span><h2>{content.final_cta_title || "Let's build a growth system that performs."}</h2><p>{content.final_cta_description || "If you're looking to improve paid advertising, fix conversion tracking or build a stronger growth strategy, let's start with a conversation."}</p><div className="hero-actions"><CTAButton to={settings.booking_url || "/contact"} variant="white" size="lg">{content.final_cta_primary || "Book a free consultation"}<ArrowUpRight size={18} /></CTAButton><CTAButton to="/contact" variant="ghostLight" size="lg">Send a message <ArrowRight size={18} /></CTAButton></div></div></section>
  </div>;
}

function Signal({ label, value, width }) { return <div className="signal-row"><div><span>{label}</span><b>{value}</b></div><div className="signal-track"><i style={{ width }} /></div></div>; }

function CaseCard({ item, index }) {
  const accents = ["case-orange", "case-blue", "case-green", "case-purple"];
  return <article className={`case-card ${accents[index % accents.length]}`}>
    <div className="case-visual"><span>CASE / {String(index + 1).padStart(2, "0")}</span><strong>{index === 0 ? "78%" : index === 1 ? "300%" : "+186%"}</strong><div className="chart-line"><i /><i /><i /><i /><i /><i /></div></div>
    <div className="case-content"><span className="case-label">{item.industry || "Performance marketing"}</span><h3>{item.title}</h3><p>{item.excerpt || item.description || "A strategy-led performance marketing engagement focused on measurable growth."}</p><Link to={`/case-studies/${item.slug}`} className="card-link">Read case study <ArrowUpRight size={16} /></Link></div>
  </article>;
}
