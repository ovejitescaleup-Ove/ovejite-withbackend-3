import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LayoutDashboard, Users, FileText, BookOpen, Wrench, Briefcase, Settings, LogOut, ExternalLink, Menu, X, Activity, Terminal } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/case-studies", label: "Case Studies", icon: FileText },
  { to: "/admin/resources", label: "Resources", icon: BookOpen },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/industries", label: "Industries", icon: Briefcase },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/pages", label: "Page CMS", icon: Terminal },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null); const [checking, setChecking] = useState(true); const [sidebarOpen, setSidebarOpen] = useState(false); const navigate = useNavigate();
  useEffect(() => { (async()=>{ try { setUser(await base44.auth.me()); } catch { setUser(null); } finally { setChecking(false); } })(); }, []);
  const handleLogout = async()=>{ await base44.auth.logout(); navigate("/login"); };
  if (checking) return <div className="admin-loading"><Activity className="animate-pulse" /><span>VERIFYING ADMIN SESSION...</span></div>;
  if (!user || user.app_metadata?.role !== "admin") return <div className="admin-denied"><Terminal /><h1>ACCESS DENIED</h1><p>Admin privileges are required.</p><Link to="/">← RETURN TO SITE</Link></div>;
  return <div className="admin-app">
    <aside className={`admin-sidebar ${sidebarOpen?"open":""}`}>
      <div className="admin-brand"><Link to="/"><strong>OVEJITE<span>.</span></strong><small>CONTROL ROOM</small></Link><button onClick={()=>setSidebarOpen(false)}><X /></button></div>
      <div className="admin-status"><i /> SYSTEM ONLINE <span>v2.0</span></div>
      <nav>{NAV.map(({to,label,icon:Icon,end})=><NavLink key={to} to={to} end={end} onClick={()=>setSidebarOpen(false)} className={({isActive})=>isActive?"active":undefined}><Icon /> <span>{label}</span><b>↗</b></NavLink>)}</nav>
      <div className="admin-bottom"><Link to="/"><ExternalLink /> VIEW LIVE SITE</Link><button onClick={handleLogout}><LogOut /> SIGN OUT</button></div>
    </aside>
    {sidebarOpen && <div className="admin-overlay" onClick={()=>setSidebarOpen(false)} />}
    <div className="admin-main"><header className="admin-topbar"><button className="admin-menu" onClick={()=>setSidebarOpen(true)}><Menu /></button><div><span>ADMIN /</span> {window.location.pathname.replace("/admin","") || "overview"}</div><div className="admin-user"><i /> {user.email || "ADMIN"}</div></header><main><Outlet /></main></div>
  </div>;
}
