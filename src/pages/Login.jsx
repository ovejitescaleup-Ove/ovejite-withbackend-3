import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowUpRight, LockKeyhole, Terminal } from "lucide-react";

export default function Login(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const navigate=useNavigate(); const location=useLocation();
  const submit=async(e)=>{e.preventDefault();setError("");setLoading(true);try{await base44.auth.loginViaEmailPassword(email,password);const params=new URLSearchParams(location.search);const target=params.get("returnTo")||"/admin";window.location.href=target;}catch(err){setError(err?.message||"Login failed. Check your credentials.");}finally{setLoading(false)}};
  return <div className="auth-terminal"><div className="auth-grid" /><div className="auth-window"><div className="auth-top"><Link to="/"><b>OVEJITE<span>.</span></b></Link><span>SECURE / ADMIN</span></div><div className="auth-body"><div className="auth-mark"><Terminal /><span>CONTROL ROOM</span></div><h1>SIGN IN<span>_</span></h1><p>Access your portfolio CMS and inbound lead system.</p>{error&&<div className="auth-error">ERROR: {error}</div>}<form onSubmit={submit}><label>EMAIL<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@example.com" /></label><label>PASSWORD<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" /></label><button disabled={loading}>{loading?"AUTHENTICATING...":"ENTER CONTROL ROOM"}<ArrowUpRight /></button></form><Link className="forgot" to="/forgot-password">Forgot password?</Link></div><div className="auth-foot"><span>OVJ / PRIVATE ACCESS</span><span>ENCRYPTED SESSION</span></div></div></div>;
}
