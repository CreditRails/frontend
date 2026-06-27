"use client";

import { useState, useEffect } from "react";
import { connectWallet as freighterConnect, getWalletAddress, shortenAddress } from "@/lib/wallet";

const SCORE = 742;
const MAX_SCORE = 850;

const navGroups = [
  {
    label: "Main",
    items: [
      { id: "overview", label: "Overview", icon: SquaresIcon },
      { id: "score", label: "Credit Score", icon: GaugeIcon },
      { id: "transactions", label: "Transactions", icon: ListIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "credentials", label: "DID Credentials", icon: BadgeIcon },
      { id: "settings", label: "Settings", icon: GearIcon },
    ],
  },
];

const transactions = [
  { id: "1", hash: "GBZX…4K9P", type: "Payment", amount: "+1,200 XLM", date: "Jun 19, 2026", status: "Confirmed", score_impact: "+3" },
  { id: "2", hash: "GABC…7F2Q", type: "Swap", amount: "500 XLM → USDC", date: "Jun 17, 2026", status: "Confirmed", score_impact: "+1" },
  { id: "3", hash: "GD9T…0MNR", type: "Loan Repay", amount: "250 USDC", date: "Jun 14, 2026", status: "Confirmed", score_impact: "+8" },
  { id: "4", hash: "GCXY…3BLS", type: "Deposit", amount: "+4,500 XLM", date: "Jun 10, 2026", status: "Confirmed", score_impact: "+5" },
  { id: "5", hash: "GFMZ…1TKR", type: "Payment", amount: "-180 USDC", date: "Jun 6, 2026", status: "Confirmed", score_impact: "+2" },
  { id: "6", hash: "GKAB…9QLW", type: "Missed Payment", amount: "-50 USDC", date: "May 28, 2026", status: "Late", score_impact: "-12" },
];

const scoreFactors = [
  { label: "Payment History", value: 96, weight: "35%", color: "#998DFF" },
  { label: "Transaction Volume", value: 82, weight: "25%", color: "#7EC8E3" },
  { label: "Account Age", value: 71, weight: "20%", color: "#A8E6CF" },
  { label: "Credit Diversity", value: 64, weight: "12%", color: "#FFD3B6" },
  { label: "Recent Inquiries", value: 90, weight: "8%", color: "#FFEAA7" },
];

const credentials = [
  { id: "cred-1", type: "CreditScoreCredential", issuer: "CreditRails Protocol", issued: "Jun 19, 2026", expires: "Jun 19, 2027", score: 742, status: "Active" },
  { id: "cred-2", type: "StellarIdentityCredential", issuer: "CreditRails Protocol", issued: "Jan 5, 2026", expires: "Jan 5, 2027", score: null, status: "Active" },
  { id: "cred-3", type: "LoanEligibilityCredential", issuer: "Blend Finance", issued: "May 12, 2026", expires: "Nov 12, 2026", score: null, status: "Active" },
];

const insights = [
  { title: "Maintain on-time payments", desc: "30 consecutive on-time payments will push your payment history score above 98%.", pts: "+15", color: "#998DFF" },
  { title: "Increase transaction volume", desc: "Your volume score is at 82%. Adding 2–3 regular transactions per month closes the gap.", pts: "+8", color: "#7EC8E3" },
  { title: "Diversify credit types", desc: "Adding a savings signal via Sava would improve your diversity factor from 64% to ~76%.", pts: "+12", color: "#A8E6CF" },
];

const scoreHistory = [680, 690, 695, 700, 708, 714, 718, 722, 728, 733, 738, 742];
const scoreMonths = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const txTypeColors: Record<string, string> = {
  Payment: "bg-purple-50 text-purple-600",
  Swap: "bg-blue-50 text-blue-600",
  "Loan Repay": "bg-green-50 text-green-600",
  Deposit: "bg-teal-50 text-teal-600",
  "Missed Payment": "bg-red-50 text-red-500",
};

// ─── SVG utility ───────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const s = polar(cx, cy, from, r);
  const e = polar(cx, cy, to, r);
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
function SquaresIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3"/></svg>;
}
function GaugeIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M5 9a3 3 0 0 1 4.8-2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="9" r="1.5" fill="currentColor"/></svg>;
}
function ListIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function BadgeIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10 4.4 12l.7-4L2.2 5.2l4-.6L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>;
}
function GearIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function WalletIcon() {
  return <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" fill="currentColor" stroke="none"/><path d="M2 10h20"/><path d="M6 6V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/></svg>;
}

// ─── Score arc ─────────────────────────────────────────────────────────────────
function ScoreArc({ score }: { score: number }) {
  const cx = 110, cy = 108, r = 82;
  const start = -210;
  const track = arcPath(cx, cy, r, start, start + 240);
  const fill = arcPath(cx, cy, r, start, start + 240 * (score / MAX_SCORE));
  return (
    <svg viewBox="0 0 220 185" className="w-full max-w-[230px]">
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c4bcff" />
          <stop offset="100%" stopColor="#6148d0" />
        </linearGradient>
      </defs>
      <path d={track} fill="none" stroke="#F0EEFF" strokeWidth="14" strokeLinecap="round" />
      <path d={fill} fill="none" stroke="url(#scoreGrad)" strokeWidth="14" strokeLinecap="round" />
      <path d={fill} fill="none" stroke="#c4bcff" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="42" fontWeight="800" fill="#0f0a1e" fontFamily="var(--font-geist-sans)">{score}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="13" fill="#998DFF" fontFamily="var(--font-geist-sans)" fontWeight="600">/ {MAX_SCORE}</text>
      <text x={cx} y={cy + 40} textAnchor="middle" fontSize="11" fill="#9ca3af" fontFamily="var(--font-geist-sans)" letterSpacing="1.5">CREDIT SCORE</text>
    </svg>
  );
}

// ─── Score band ────────────────────────────────────────────────────────────────
function ScoreBand({ score }: { score: number }) {
  const bands = [
    { label: "Poor", min: 300, max: 579, color: "#f87171" },
    { label: "Fair", min: 580, max: 669, color: "#fb923c" },
    { label: "Good", min: 670, max: 739, color: "#facc15" },
    { label: "Very Good", min: 740, max: 799, color: "#4ade80" },
    { label: "Excellent", min: 800, max: 850, color: "#22c55e" },
  ];
  const active = bands.find((b) => score >= b.min && score <= b.max) ?? bands[3];
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: active.color }} />
      <span className="text-sm font-semibold" style={{ color: active.color }}>{active.label}</span>
    </div>
  );
}

// ─── Trend badge ───────────────────────────────────────────────────────────────
function TrendBadge({ value }: { value: string }) {
  const pos = value.startsWith("+");
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${pos ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
      {pos ? "▲" : "▼"} {value}
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [txFilter, setTxFilter] = useState("All");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    getWalletAddress().then((addr) => { if (addr) setWalletAddress(addr); });
  }, []);

  async function handleConnectWallet() {
    setWalletError(null);
    setConnecting(true);
    try {
      const addr = await freighterConnect();
      setWalletAddress(addr);
    } catch (err) {
      setWalletError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  }

  function disconnectWallet() { setWalletAddress(null); setWalletError(null); }

  const shortAddress = walletAddress ? shortenAddress(walletAddress) : null;
  const allNavItems = navGroups.flatMap((g) => g.items);
  const activeLabel = allNavItems.find((n) => n.id === activeNav)?.label ?? "";
  const txTypes = ["All", "Payment", "Swap", "Loan Repay", "Deposit", "Missed Payment"];
  const filteredTx = txFilter === "All" ? transactions : transactions.filter((t) => t.type === txFilter);
  const milestonePct = Math.min(((SCORE - 740) / (800 - 740)) * 100, 100);

  // ── Sidebar ──────────────────────────────────────────────────────────────────
  const sidebar = (
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40 h-full w-64 flex flex-col transition-transform duration-200 flex-shrink-0 bg-white border-r border-gray-100`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 px-5 h-16 border-b border-gray-100 group flex-shrink-0">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-[#998DFF]/30 flex-shrink-0"
          style={{ background: "linear-gradient(150deg, #c4bcff 0%, #998DFF 45%, #6148d0 100%)" }}
        >
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <path d="M8 29L13.5 4" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M24 29L18.5 4" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M9.5 25L22.5 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 16.5L20 16.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
            <path d="M14 9L18 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
          </svg>
        </span>
        <span className="font-bold text-[15px] tracking-tight text-gray-900">CreditRails</span>
      </a>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeNav === id
                      ? "bg-[#F4F3FF] text-[#6148d0] border border-[#E0DBFF]"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className={activeNav === id ? "text-[#998DFF]" : "text-gray-400"}><Icon /></span>
                  {label}
                  {activeNav === id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#998DFF]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Wallet section */}
      <div className="px-3 pb-4 space-y-2 flex-shrink-0 border-t border-gray-100 pt-3">
        {walletAddress ? (
          <div className="p-3 rounded-xl border border-[#E0DBFF] bg-[#F4F3FF]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs text-white" style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}>
                {walletAddress[1]?.toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 font-medium">Connected</p>
                <p className="text-xs font-mono text-gray-700 truncate">{shortAddress}</p>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            </div>
            <button onClick={disconnectWallet} className="mt-2 w-full text-center text-[10px] text-gray-400 hover:text-red-400 transition-colors">
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectWallet}
            disabled={connecting}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}
          >
            {connecting ? "Connecting…" : "Connect Freighter"}
          </button>
        )}
        {walletError && <p className="text-[10px] text-red-500 px-1">{walletError}</p>}

        {/* Network badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF] animate-pulse" />
          <span className="text-[10px] text-gray-400 font-medium">Stellar Testnet</span>
          <span className="ml-auto text-[10px] text-gray-300 font-mono">#9.2M</span>
        </div>
      </div>
    </aside>
  );

  // ── Empty state (not connected) ───────────────────────────────────────────────
  if (!walletAddress) {
    return (
      <div className="flex h-screen overflow-hidden">
        {sidebar}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F7FF]">
          <header className="h-16 bg-white border-b border-gray-100 flex items-center px-5 md:hidden flex-shrink-0">
            <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 5h14M2 9h14M2 13h14"/></svg>
            </button>
          </header>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-sm">
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-[#F4F3FF] flex items-center justify-center text-[#998DFF] shadow-sm">
                <WalletIcon />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect your wallet</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-7">
                Link your Stellar wallet to view your credit score, W3C credentials, and full transaction history.
              </p>
              <button
                onClick={handleConnectWallet}
                disabled={connecting}
                className="px-6 py-3 rounded-2xl text-sm font-semibold text-white shadow-lg shadow-[#998DFF]/30 hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}
              >
                {connecting ? "Connecting…" : "Connect Freighter Wallet"}
              </button>
              {walletError && <p className="mt-3 text-xs text-red-500">{walletError}</p>}
              <p className="mt-4 text-xs text-gray-300">No account required · Read-only access</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Full dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden">
      {sidebar}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F7FF]">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 md:px-7 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 5h14M2 9h14M2 13h14"/></svg>
            </button>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">{activeLabel}</h1>
              <p className="text-[11px] text-gray-400">Updated just now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 rounded-xl bg-[#F4F3FF] text-[#998DFF] text-xs font-semibold hover:bg-[#ede9ff] transition-colors">
              Export PDF
            </button>
            <button
              className="px-3.5 py-1.5 rounded-xl text-white text-xs font-semibold shadow-sm shadow-[#998DFF]/30 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}
            >
              Share Credential
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ml-1 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}
            >
              {walletAddress[1]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7">

          {/* ── Overview ── */}
          {activeNav === "overview" && (
            <div className="space-y-5">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Credit Score", value: "742", sub: "Very Good", subColor: "#4ade80", trend: "+28", icon: "M12 2l2.4 4.8 5.3.8L16 11.2l.9 5.3L12 14l-4.9 2.5.9-5.3L4.3 7.6l5.3-.8L12 2z", iconBg: "bg-[#F4F3FF]", iconColor: "#998DFF" },
                  { label: "Percentile", value: "81st", sub: "Top 19%", subColor: "#60a5fa", trend: "+4", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", iconBg: "bg-blue-50", iconColor: "#3b82f6" },
                  { label: "Loan Eligibility", value: "$12,500", sub: "Max USDC", subColor: "#34d399", trend: null, icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", iconBg: "bg-green-50", iconColor: "#10b981" },
                  { label: "DID Credentials", value: "3", sub: "W3C verified", subColor: "#f59e0b", trend: null, icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", iconBg: "bg-amber-50", iconColor: "#f59e0b" },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-[#EDEDFF] shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                        <svg width="16" height="16" fill="none" stroke={card.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d={card.icon} />
                        </svg>
                      </div>
                      {card.trend && <TrendBadge value={`+${card.trend}`} />}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: card.subColor }}>{card.sub}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{card.label}</p>
                  </div>
                ))}
              </div>

              {/* Score + Factors */}
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-1">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Score Overview</p>
                    <ScoreBand score={SCORE} />
                  </div>
                  <ScoreArc score={SCORE} />
                  <div className="mt-2 w-full grid grid-cols-3 gap-2 text-center border-t border-[#F4F3FF] pt-4">
                    {[{ label: "Low", val: "300" }, { label: "Target", val: "800" }, { label: "Max", val: "850" }].map((s) => (
                      <div key={s.label}>
                        <p className="text-[10px] text-gray-400">{s.label}</p>
                        <p className="text-xs font-bold text-gray-600">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5">Score Factors</p>
                  <div className="space-y-5">
                    {scoreFactors.map((f) => (
                      <div key={f.label}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                            <span className="text-sm font-medium text-gray-700">{f.label}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded font-medium">{f.weight}</span>
                            <span className="text-sm font-bold text-gray-900 w-8 text-right">{f.value}%</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.value}%`, background: f.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom row: Milestone + Insights */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Next Milestone</p>
                    <span className="text-xs font-bold text-[#998DFF] bg-[#F4F3FF] px-2.5 py-1 rounded-full">{800 - SCORE} pts away</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2.5">
                    <span className="text-gray-600 font-medium">Very Good → <span className="text-[#22c55e] font-semibold">Excellent</span></span>
                    <span className="text-xs text-gray-400 font-mono">{SCORE} / 800</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${milestonePct}%`, background: "linear-gradient(90deg, #998DFF, #22c55e)" }} />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed">Reach 800 to unlock Excellent tier and access premium lending rates.</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Insights</p>
                  <div className="space-y-3">
                    {insights.map((insight) => (
                      <div key={insight.title} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: insight.color }} />
                        <p className="text-xs text-gray-600 flex-1 leading-snug">{insight.title}</p>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">{insight.pts} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent transactions */}
              <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Recent Transactions</p>
                  <button onClick={() => setActiveNav("transactions")} className="text-xs text-[#998DFF] font-semibold hover:underline">View all →</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {transactions.slice(0, 4).map((tx) => (
                    <div key={tx.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${txTypeColors[tx.type] ?? "bg-gray-50 text-gray-500"}`}>
                        {tx.type}
                      </span>
                      <span className="font-mono text-xs text-gray-400 flex-shrink-0">{tx.hash}</span>
                      <span className="text-sm text-gray-700 flex-1">{tx.amount}</span>
                      <span className="text-xs text-gray-400">{tx.date}</span>
                      <span className={`text-sm font-bold flex-shrink-0 ${tx.score_impact.startsWith("+") ? "text-green-500" : "text-red-400"}`}>{tx.score_impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Credit Score tab ── */}
          {activeNav === "score" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Credit Score", value: "742", sub: "Very Good", color: "#4ade80" },
                  { label: "Percentile", value: "81st", sub: "Top 19% globally", color: "#60a5fa" },
                  { label: "Score Change", value: "+28", sub: "Last 30 days", color: "#34d399" },
                  { label: "Risk Tier", value: "B", sub: "Moderate-Low", color: "#f59e0b" },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-[#EDEDFF] shadow-sm">
                    <p className="text-[10px] text-gray-400 font-medium mb-2">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs font-medium mt-1" style={{ color: card.color }}>{card.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-1">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Score Gauge</p>
                    <ScoreBand score={SCORE} />
                  </div>
                  <ScoreArc score={SCORE} />
                  <div className="mt-2 w-full space-y-1.5">
                    {[
                      { label: "Poor", range: "300–579", color: "#f87171" },
                      { label: "Fair", range: "580–669", color: "#fb923c" },
                      { label: "Good", range: "670–739", color: "#facc15" },
                      { label: "Very Good", range: "740–799", color: "#4ade80", active: true },
                      { label: "Excellent", range: "800–850", color: "#22c55e" },
                    ].map((b) => (
                      <div key={b.label} className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs ${b.active ? "bg-[#F4F3FF]" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                          <span className={b.active ? "text-gray-800 font-semibold" : "text-gray-500"}>{b.label}</span>
                        </div>
                        <span className="font-mono text-gray-400">{b.range}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 space-y-4">
                  <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5">Factor Breakdown</p>
                    <div className="space-y-5">
                      {scoreFactors.map((f) => (
                        <div key={f.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-gray-700">{f.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded">{f.weight}</span>
                              <span className="text-sm font-bold text-gray-900">{f.value}%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${f.value}%`, background: f.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">12-Month History</p>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">+62 pts this year</span>
                    </div>
                    <div className="flex items-end gap-1 h-20">
                      {scoreHistory.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                          <div
                            className="w-full rounded-t-sm transition-all"
                            style={{
                              height: `${((val - 650) / 200) * 100}%`,
                              background: i === scoreHistory.length - 1 ? "linear-gradient(180deg, #998DFF, #6148d0)" : "#EDE9FF",
                            }}
                          />
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-2">
                      {scoreMonths.map((m, i) => (
                        <span key={i} className="flex-1 text-center text-[9px] text-gray-300">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Transactions tab ── */}
          {activeNav === "transactions" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1">Filter</span>
                {txTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTxFilter(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      txFilter === type
                        ? "text-white shadow-sm shadow-[#998DFF]/30"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-[#998DFF]/50 hover:text-[#998DFF]"
                    }`}
                    style={txFilter === type ? { background: "linear-gradient(135deg, #998DFF, #6148d0)" } : {}}
                  >
                    {type}
                  </button>
                ))}
                <span className="ml-auto text-xs text-gray-400">{filteredTx.length} record{filteredTx.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-50 bg-gray-50/50">
                        {["Tx Hash", "Type", "Amount", "Date", "Status", "Score Impact"].map((h) => (
                          <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredTx.map((tx) => (
                        <tr key={tx.id} className="hover:bg-[#F8F7FF] transition-colors">
                          <td className="px-5 py-4 font-mono text-xs text-gray-400">{tx.hash}</td>
                          <td className="px-5 py-4">
                            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${txTypeColors[tx.type] ?? "bg-gray-50 text-gray-500"}`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-700 font-medium">{tx.amount}</td>
                          <td className="px-5 py-4 text-gray-400 text-xs">{tx.date}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              tx.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${tx.status === "Confirmed" ? "bg-green-400" : "bg-red-400"}`} />
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-sm font-bold ${tx.score_impact.startsWith("+") ? "text-green-500" : "text-red-400"}`}>
                              {tx.score_impact}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredTx.length === 0 && (
                    <div className="text-center py-14 text-gray-400 text-sm">No transactions match this filter.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Credentials tab ── */}
          {activeNav === "credentials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">W3C DID Credentials</p>
                <button
                  className="px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-sm shadow-[#998DFF]/30 hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}
                >
                  Issue New
                </button>
              </div>
              {credentials.map((cred) => (
                <div key={cred.id} className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F4F3FF, #E8E4FF)" }}>
                        <svg width="18" height="18" fill="none" stroke="#998DFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{cred.type}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Issued by <span className="text-[#998DFF] font-medium">{cred.issuer}</span></p>
                        <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-xs">
                          <div><span className="text-gray-400">Issued: </span><span className="text-gray-700 font-medium">{cred.issued}</span></div>
                          <div><span className="text-gray-400">Expires: </span><span className="text-gray-700 font-medium">{cred.expires}</span></div>
                          {cred.score && <div><span className="text-gray-400">Score: </span><span className="text-[#998DFF] font-bold">{cred.score}</span></div>}
                          <div className="col-span-2"><span className="text-gray-400">DID: </span><span className="font-mono text-gray-500 text-[10px]">did:stellar:{cred.id}</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />{cred.status}
                      </span>
                      <button className="text-xs text-[#998DFF] font-medium hover:underline">View JWT</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-2xl border border-[#E0DBFF] bg-[#F4F3FF] text-xs text-[#7a6ee0] leading-relaxed">
                Credentials are signed W3C Verifiable Credentials anchored to Stellar. Any application can verify them without contacting CreditRails.
              </div>
            </div>
          )}

          {/* ── Settings tab ── */}
          {activeNav === "settings" && (
            <div className="max-w-lg space-y-4">
              <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Connected Wallet</p>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F7FF] border border-[#EDEDFF]">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}>
                    {walletAddress[1]?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 font-mono truncate">{walletAddress.slice(0, 14)}…{walletAddress.slice(-6)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Stellar Testnet · Freighter</p>
                  </div>
                  <button onClick={disconnectWallet} className="ml-auto text-xs text-red-400 hover:text-red-600 font-semibold flex-shrink-0 transition-colors">
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Notifications</p>
                <div className="space-y-4">
                  {["Score change alerts", "New credential issued", "Loan eligibility updates"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item}</span>
                      <button className="w-10 h-6 rounded-full relative transition-all" style={{ background: "linear-gradient(135deg, #998DFF, #6148d0)" }}>
                        <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#EDEDFF] shadow-sm p-6">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Data Sharing</p>
                <p className="text-xs text-gray-400 mb-4">Control which apps can read your credit credential.</p>
                {["Blend Finance", "StellarX", "MoneyGram"].map((app) => (
                  <div key={app} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F4F3FF] flex items-center justify-center text-[10px] font-bold text-[#998DFF]">
                        {app[0]}
                      </div>
                      <span className="text-sm text-gray-700">{app}</span>
                    </div>
                    <button className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">Revoke</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
