import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, ExternalLink, Gauge, LineChart, Search, ShoppingCart, Target, TrendingUp } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCMSPage, parseJSON } from "@/hooks/useCMSPage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { HOME_DEFAULTS } from "@/lib/sitePageDefaults";
import CTAButton from "@/components/CTAButton";
import { FALLBACK_CASE_STUDIES, FALLBACK_SERVICES } from "@/lib/siteData";

const defaultSteps = [
  ["01", "Understand", "Audit the account, tracking, offer and customer journey."],
  ["02", "Build", "Create the campaign and measurement structure around the business goal."],
  ["03", "Optimize", "Use real performance data to improve efficiency and conversion quality."],
  ["04", "Scale", "Increase what works without losing control of cost or lead quality."],
];

const skillGroups = [
  { icon: Search, title: "Google Ads", text: "Search, Performance Max, Shopping, remarketing and account strategy." },
  { icon: Target, title: "Paid Social", text: "Meta campaign strategy, lead generation and performance creative testing." },
  { icon: BarChart3, title: "Measurement", text: "GA4, GTM, enhanced conversions, attribution and conversion-quality tracking." },
  { icon: Gauge, title: "Optimization", text: "Landing-page insights, CRO, budget allocation, bidding and ongoing testing." },
];

export default function Home() {
  const { content } = useCMSPage("home", HOME_DEFAULTS);
  const { settings } = useSiteSettings();
  const [cases, setCases] = useState(FALLBACK_CASE_STUDIES);
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    Promise.all([
      base44.entities.CaseStudy.filter({ published: true }, "display_order", 6),
      base44.entities.Service.list("display_order", 6),
    ]).then(([c, s]) => {
      if (c?.length) setCases(c);
      if (s?.length) setServices(s);
    }).catch(() => {});
  }, []);

  const steps = parseJSON(content.process_steps, defaultSteps.map(([num, title, desc]) => ({ num, title, desc })));
  const profile = content.hero_image || settings.profile_photo;
  const name = settings.site_name || "Ovejite Vhowmick";

  return (
    <div className="portfolio-site">
      <section className="portfolio-hero">
        <div className="portfolio-container portfolio-hero-grid">
          <div className="portfolio-hero-copy">
            <div className="portfolio-eyebrow"><span className="status-dot" /> {content.hero_badge || "Performance Marketing Specialist"}</div>
            <h1>{content.hero_title || "I build paid media systems that turn clicks into"} <span>{content.hero_highlight || "measurable growth."}</span></h1>
            <p>{content.hero_description || "Google Ads, Meta Ads, conversion tracking and growth strategy built around the numbers that actually matter to your business."}</p>
            <div className="portfolio-actions">
              <CTAButton to={settings.booking_url || "/contact"} size="lg">Book a Free Consultation <ArrowUpRight /></CTAButton>
              <CTAButton to="/case-studies" variant="secondary" size="lg">View My Work <ArrowRight /></CTAButton>
            </div>
            <div className="hero-note"><span>Google Ads</span><span>Meta Ads</span><span>GA4 + GTM</span><span>CRO</span></div>
          </div>

          <div className="portfolio-hero-visual">
            <div className="profile-card">
              <div className="profile-card-top"><span>OV</span><span>Dhaka · Bangladesh</span></div>
              <div className="profile-image-wrap">
                {profile ? <img src={profile} alt={name} /> : <div className="profile-placeholder">OV</div>}
              </div>
              <div className="profile-card-bottom">
                <div><strong>{name}</strong><span>Google Ads &amp; Performance Marketing</span></div>
                <span className="profile-arrow"><ArrowUpRight /></span>
              </div>
            </div>
            <div className="floating-result result-one"><span>ROAS</span><strong>{content.hero_roas || "4.8x"}</strong><small>Performance snapshot</small></div>
            <div className="floating-result result-two"><span>CPA</span><strong>{content.hero_conversions || "−65%"}</strong><small>Optimization impact</small></div>
          </div>
        </div>
      </section>

      <section className="portfolio-intro">
        <div className="portfolio-container intro-grid">
          <p className="section-kicker">A performance marketer, not just an ad operator.</p>
          <div>
            <h2>I connect <em>media, measurement and business goals.</em></h2>
            <p className="lead">Good campaigns need more than clicks. I work across advertising, tracking and conversion strategy so every optimization has a reason behind it.</p>
          </div>
        </div>
      </section>

      <section className="portfolio-results">
        <div className="portfolio-container">
          <div className="section-heading-row">
            <div><span className="section-kicker">Selected results</span><h2>Numbers that tell the story.</h2></div>
            <p>Examples from projects where campaign structure, tracking and optimization worked together.</p>
          </div>
          <div className="result-grid">
            <Result value={settings.monthly_ad_spend || "$3.6M+"} label="Ad spend managed" />
            <Result value={settings.projects_count || "50+"} label="Projects delivered" />
            <Result value="1,440+" label="Calls generated in one dental project" />
            <Result value="300%" label="ROAS on a recent ecommerce project" />
          </div>
        </div>
      </section>

      <section className="portfolio-work">
        <div className="portfolio-container">
          <div className="section-heading-row work-heading">
            <div><span className="section-kicker">Selected work</span><h2>Campaigns, problems, solutions.</h2></div>
            <CTAButton to="/case-studies" variant="secondary">Explore all work <ArrowRight /></CTAButton>
          </div>
          <div className="case-list">
            {cases.slice(0, 4).map((item, index) => (
              <article className="portfolio-case" key={item.id || item.slug || index}>
                <div className="case-number">0{index + 1}</div>
                <div className="case-main">
                  <div className="case-meta"><span>{item.industry || "Performance Marketing"}</span><span>{item.client || "Selected project"}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt || item.challenge || "Campaign strategy, tracking and optimization focused on measurable business outcomes."}</p>
                  <a href={`/case-studies/${item.slug}`} className="case-link">Read case study <ArrowUpRight /></a>
                </div>
                <div className="case-metric">
                  <strong>{index === 0 ? "−65%" : index === 1 ? "300%" : index === 2 ? "15x" : "+186%"}</strong>
                  <span>Featured outcome</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-expertise">
        <div className="portfolio-container expertise-grid">
          <div className="expertise-copy"><span className="section-kicker">What I work on</span><h2>From campaign setup to <em>the measurement layer.</em></h2><p>I can step into an existing account, rebuild a weak setup, or build the acquisition and tracking system from the ground up.</p><CTAButton to="/services" variant="dark">See services <ArrowRight /></CTAButton></div>
          <div className="skill-grid">
            {skillGroups.map(({ icon: Icon, title, text }) => <div className="skill-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="portfolio-process">
        <div className="portfolio-container">
          <div className="section-heading-row"><div><span className="section-kicker">My approach</span><h2>Simple process. Serious attention to detail.</h2></div></div>
          <div className="process-grid">
            {steps.slice(0, 4).map((step, index) => <div className="process-card" key={step.num || index}><span>{step.num || `0${index + 1}`}</span><ChevronRight /><h3>{step.title}</h3><p>{step.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="portfolio-about">
        <div className="portfolio-container about-grid">
          <div className="about-photo"><div className="about-photo-inner">{settings.profile_photo ? <img src={settings.profile_photo} alt={name} /> : <span>OV</span>}</div></div>
          <div className="about-copy"><span className="section-kicker">About me</span><h2>Hi, I’m Ovejite.</h2><p>{settings.short_bio || "I’m a performance marketer focused on Google Ads, paid acquisition, conversion tracking and practical growth strategy."}</p><p>I care about clean account structure, reliable data and decisions that can be explained in business terms—not vanity metrics.</p><div className="about-points"><span><Check /> Google Ads &amp; SEM</span><span><Check /> GA4 / GTM</span><span><Check /> Meta Ads</span><span><Check /> Conversion Optimization</span></div><CTAButton to="/about" variant="secondary">More about me <ArrowRight /></CTAButton></div>
        </div>
      </section>

      <section className="portfolio-contact">
        <div className="portfolio-container contact-panel">
          <div><span className="section-kicker">Have a project in mind?</span><h2>Let’s talk about what you’re trying to improve.</h2><p>{content.final_cta_description || "Whether you need a campaign audit, a tracking fix or ongoing performance management, start with a conversation."}</p></div>
          <div className="contact-buttons"><CTAButton to={settings.booking_url || "/contact"} size="lg">Book a Consultation <ArrowUpRight /></CTAButton><CTAButton to="/contact" variant="white" size="lg">Send a Message <ArrowRight /></CTAButton></div>
        </div>
      </section>
    </div>
  );
}

function Result({ value, label }) { return <div className="result-item"><strong>{value}</strong><span>{label}</span></div>; }
