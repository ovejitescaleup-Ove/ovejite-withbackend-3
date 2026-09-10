import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { FALLBACK_SERVICES, FALLBACK_INDUSTRIES } from "@/lib/siteData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import CTAButton from "./CTAButton";

const FALLBACK_S = FALLBACK_SERVICES.map((x) => ({ label: x.title, slug: x.slug }));
const FALLBACK_I = FALLBACK_INDUSTRIES.map((x) => ({ label: x.title, slug: x.slug }));

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [services, setServices] = useState(FALLBACK_S);
  const [industries, setIndustries] = useState(FALLBACK_I);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    Promise.all([
      base44.entities.Service.list("display_order", 50),
      base44.entities.Industry.list("display_order", 50),
    ]).then(([s, i]) => {
      if (s?.length) setServices(s.map((x) => ({ label: x.title, slug: x.slug })));
      if (i?.length) setIndustries(i.map((x) => ({ label: x.title, slug: x.slug })));
    }).catch(() => {});
  }, []);

  const close = () => { setMobileOpen(false); setOpen(null); };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={close} aria-label="Ovejite home">
          <span>Ovejite</span><b>.me</b>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/about">About</Link>
          <NavDropdown label="Services" items={services} basePath="/services" open={open === "services"} onOpen={() => setOpen("services")} onClose={() => setOpen(null)} />
          <NavDropdown label="Industries" items={industries} basePath="/industries" open={open === "industries"} onOpen={() => setOpen("industries")} onClose={() => setOpen(null)} />
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="nav-actions">
          <CTAButton to={settings.booking_url || "/contact"} size="sm" eventName="consultation_click" eventParams={{ location: "navbar" }}>
            Book a consultation <ArrowUpRight size={15} />
          </CTAButton>
          <button className="mobile-toggle" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-panel">
          <Link to="/about" onClick={close}>About</Link>
          <MobileGroup label="Services" items={services} basePath="/services" close={close} />
          <MobileGroup label="Industries" items={industries} basePath="/industries" close={close} />
          <Link to="/case-studies" onClick={close}>Case Studies</Link>
          <Link to="/resources" onClick={close}>Resources</Link>
          <Link to="/contact" onClick={close}>Contact</Link>
          <CTAButton to={settings.booking_url || "/contact"} size="md" className="mobile-cta" onClick={close}>Book a consultation <ArrowUpRight size={17} /></CTAButton>
        </div>
      )}
    </header>
  );
}

function NavDropdown({ label, items, basePath, open, onOpen, onClose }) {
  return (
    <div className="nav-dropdown" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button onClick={onOpen} aria-expanded={open}>{label}<ChevronDown size={15} className={open ? "rotate" : ""} /></button>
      {open && <div className="dropdown-menu">
        {items.slice(0, 8).map((item) => <Link key={item.slug} to={`${basePath}/${item.slug}`} onClick={onClose}>{item.label}<ArrowUpRight size={14} /></Link>)}
        <Link className="dropdown-all" to={basePath} onClick={onClose}>View all {label.toLowerCase()} <ArrowUpRight size={14} /></Link>
      </div>}
    </div>
  );
}

function MobileGroup({ label, items, basePath, close }) {
  const [open, setOpen] = useState(false);
  return <div className="mobile-group">
    <button onClick={() => setOpen((v) => !v)}>{label}<ChevronDown size={18} className={open ? "rotate" : ""} /></button>
    {open && <div className="mobile-subnav">{items.slice(0, 8).map((item) => <Link key={item.slug} to={`${basePath}/${item.slug}`} onClick={close}>{item.label}</Link>)}</div>}
  </div>;
}
