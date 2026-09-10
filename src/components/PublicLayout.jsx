import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import AnalyticsScripts from "./AnalyticsScripts";

export default function PublicLayout() {
  return <div className="public-shell">
    <AnalyticsScripts />
    <Navbar />
    <main><Outlet /></main>
    <Footer />
    <WhatsAppButton />
  </div>;
}
