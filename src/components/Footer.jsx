import { Link } from "react-router-dom";
import { Mail, MessageCircle, Linkedin, Twitter, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { useSiteSettings, buildWhatsAppUrl } from "@/hooks/useSiteSettings";
import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { FALLBACK_SERVICES } from "@/lib/siteData";

export default function Footer() {
  const { settings } = useSiteSettings();
  const [services, setServices] = useState(FALLBACK_SERVICES);
  useEffect(() => { base44.entities.Service.list("display_order", 5).then((rows) => rows?.length && setServices(rows)).catch(() => {}); }, []);
  const socials = [
    [Linkedin, settings.linkedin, "LinkedIn"], [Twitter, settings.twitter, "Twitter"],
    [Instagram, settings.instagram, "Instagram"], [Facebook, settings.facebook, "Facebook"],
  ].filter((x) => x[1]);
  const whatsapp = buildWhatsAppUrl(settings.whatsapp_number, settings.whatsapp_message);

  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand">
        <Link to="/" className="brand footer-logo"><span>Ovejite</span><b>.me</b></Link>
        <p>{settings.footer_description || "Performance marketing built around better data, smarter acquisition and measurable business growth."}</p>
        <div className="socials">{socials.map(([Icon, url, label]) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}><Icon size={17} /></a>)}</div>
      </div>
      <FooterColumn title="Explore" links={[["About","/about"],["Services","/services"],["Industries","/industries"],["Case Studies","/case-studies"],["Resources","/resources"],["Contact","/contact"]]} />
      <FooterColumn title="Services" links={services.slice(0,5).map((s) => [s.title, `/services/${s.slug}`])} />
      <div className="footer-contact">
        <span className="footer-label">Start a conversation</span>
        <h3>Have a growth problem to solve?</h3>
        <Link to={settings.booking_url || "/contact"} className="footer-cta">Book a free consultation <ArrowUpRight size={16} /></Link>
        {settings.email && <a href={`mailto:${settings.email}`}><Mail size={15} />{settings.email}</a>}
        {settings.whatsapp_number && <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} />WhatsApp</a>}
      </div>
    </div>
    <div className="footer-bottom">
      <span>{(settings.copyright_text || "© {year} Ovejite.me — All rights reserved.").replace("{year}", new Date().getFullYear())}</span>
      <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
    </div>
  </footer>;
}

function FooterColumn({ title, links }) {
  return <div className="footer-column"><span className="footer-label">{title}</span>{links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div>;
}
