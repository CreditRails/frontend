"use client";

import { useState, useEffect } from "react";
import { connectWallet as freighterConnect, getWalletAddress, shortenAddress } from "@/lib/wallet";

const SCORE = 742;
const MAX_SCORE = 850;

const navItems = [
  { id: "overview", label: "Overview", icon: SquaresIcon },
  { id: "score", label: "Credit Score", icon: GaugeIcon },
  { id: "transactions", label: "Transactions", icon: ListIcon },
  { id: "credentials", label: "DID Credentials", icon: BadgeIcon },
  { id: "settings", label: "Settings", icon: GearIcon },
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
  {
    title: "Maintain on-time payments",
    desc: "30 consecutive on-time payments will push your payment history score above 98%.",
    pts: "+15",
    color: "#998DFF",
  },
  {
    title: "Increase transaction volume",
    desc: "Your volume score is at 82%. Adding 2–3 regular transactions per month closes the gap.",
    pts: "+8",
    color: "#7EC8E3",
  },
  {
    title: "Diversify credit types",
    desc: "Adding a savings signal via Sava would improve your diversity factor from 64% to ~76%.",
    pts: "+12",
    color: "#A8E6CF",
  },
];

const scoreHistory = [680, 690, 695, 700, 708, 714, 718, 722, 728, 733, 738, 742];
const scoreMonths = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function ScoreArc({ score }: { score: number }) {
  const pct = score / MAX_SCORE;
  const r = 80;
  const cx = 110;
  const cy = 110;
  const startAngle = -210;
  const sweepAngle = 240;

  function polar(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(start: number, end: number, radius: number) {
    const s = polar(start, radius);
    const e = polar(end, radius);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  }

  const endAngle = startAngle + sweepAngle * pct;

  return (
    <svg viewBox="0 0 220 180" className="w-full max-w-[220px]">
      <path d={arcPath(startAngle, startAngle + sweepAngle, r)} fill="none" stroke="#F0EEFF" strokeWidth="14" strokeLinecap="round" />
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#998DFF" strokeWidth="14" strokeLinecap="round" />
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#C4BCFF" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="38" fontWeight="800" fill="#1a1a2e" fontFamily="var(--font-geist-sans)">{score}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="12" fill="#998DFF" fontFamily="var(--font-geist-sans)" fontWeight="600">/ {MAX_SCORE}</text>
      <text x={cx} y={cy + 38} textAnchor="middle" fontSize="11" fill="#9ca3af" fontFamily="var(--font-geist-sans)">CREDIT SCORE</text>
    </svg>
  );
}

function SquaresIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".8"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3"/></svg>;
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
      <span className="w-2 h-2 rounded-full" style={{ background: active.color }} />
      <span className="text-sm font-semibold" style={{ color: active.color }}>{active.label}</span>
    </div>
  );
}

function TrendBadge({ value }: { value: string }) {
  const positive = value.startsWith("+");
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
      {positive ? "▲" : "▼"} {value}
    </span>
  );
}

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

  function disconnectWallet() {
    setWalletAddress(null);
    setWalletError(null);
  }

  const shortAddress = walletAddress ? shortenAddress(walletAddress) : null;

  const txTypes = ["All", "Payment", "Swap", "Loan Repay", "Deposit", "Missed Payment"];
  const filteredTx = txFilter === "All" ? transactions : transactions.filter((t) => t.type === txFilter);

  const milestoneTarget = 800;
  const milestonePct = Math.min(((SCORE - 740) / (milestoneTarget - 740)) * 100, 100);

  return (
    <div className="flex h-screen bg-[#F6F7F4] overflow-hidden font-[var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40 h-full w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200`}>
        <a href="/" className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-[#998DFF]/30 flex-shrink-0"
            style={{ background: "linear-gradient(150deg, #c4bcff 0%, #998DFF 45%, #6148d0 100%)" }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M8 29L13.5 4" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
              <path d="M24 29L18.5 4" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
              <path d="M9.5 25L22.5 25" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M12 16.5L20 16.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"/>
              <path d="M14 9L18 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
            </svg>
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-gray-900">CreditRails</span>
        </a>

        <div className="mx-4 mt-5 mb-2">
          {walletAddress ? (
            <div className="px-3 py-2.5 rounded-xl bg-[#F4F3FF] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#998DFF] flex items-center justify-center text-white text-xs font-bold">
                {walletAddress[0]}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400">Connected wallet</p>
                <p className="text-xs font-mono font-semibold text-gray-700 truncate">{shortAddress}</p>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              disabled={connecting}
              className="w-full px-3 py-2.5 rounded-xl bg-[#998DFF] text-white text-xs font-semibold hover:bg-[#8a7ef0] transition-colors disabled:opacity-60"
            >
              {connecting ? "Connecting…" : "Connect Freighter"}
            </button>
          )}
          {walletError && (
            <p className="mt-1.5 text-[10px] text-red-500 leading-tight px-1">{walletError}</p>
          )}
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeNav === id
                  ? "bg-[#998DFF] text-white shadow-sm shadow-[#998DFF]/30"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF] animate-pulse" />
            Stellar Testnet · Block #9,241,887
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 md:px-8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 5h14M2 9h14M2 13h14"/></svg>
            </button>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm leading-tight">
                {navItems.find((n) => n.id === activeNav)?.label}
              </h1>
              <p className="text-[11px] text-gray-400">Last updated 4.2s ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-xl bg-[#F4F3FF] text-[#998DFF] text-xs font-semibold hover:bg-[#ede9ff] transition-colors">
              Export PDF
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-[#998DFF] text-white text-xs font-semibold hover:bg-[#8a7ef0] transition-colors shadow-sm shadow-[#998DFF]/30">
              Share Credential
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8">

          {/* ── Overview tab ── */}
          {activeNav === "overview" && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Credit Score", value: "742", sub: "Very Good", subColor: "#4ade80", trend: "+28 this mo." },
                  { label: "Percentile", value: "81st", sub: "Top 19% of users", subColor: "#998DFF", trend: "+4 this mo." },
                  { label: "Loan Eligibility", value: "$12,500", sub: "Max USDC credit", subColor: "#7EC8E3", trend: null },
                  { label: "Active Credentials", value: "3", sub: "W3C DID verified", subColor: "#facc15", trend: null },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium mb-1">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <p className="text-xs font-medium" style={{ color: card.subColor }}>{card.sub}</p>
                      {card.trend && <TrendBadge value={`+${card.trend.split("+")[1]}`} />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score arc + factors */}
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Score Overview</p>
                  <ScoreArc score={SCORE} />
                  <ScoreBand score={SCORE} />
                  <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center">
                    {[{ label: "Low", val: "300" }, { label: "Target", val: "800" }, { label: "High", val: "850" }].map((s) => (
                      <div key={s.label}>
                        <p className="text-[11px] text-gray-400">{s.label}</p>
                        <p className="text-xs font-bold text-gray-600">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Score Factors</p>
                  <div className="space-y-4">
                    {scoreFactors.map((f) => (
                      <div key={f.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700">{f.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400">{f.weight}</span>
                            <span className="text-sm font-bold text-gray-900">{f.value}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.value}%`, background: f.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next milestone */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Milestone</p>
                  <span className="text-xs font-bold text-[#998DFF]">{milestoneTarget - SCORE} pts away</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Very Good → <span className="text-[#22c55e] font-semibold">Excellent</span></span>
                  <span className="text-xs text-gray-400">{SCORE} / {milestoneTarget}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#998DFF] to-[#22c55e] transition-all duration-700" style={{ width: `${milestonePct}%` }} />
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Reach 800 to unlock Excellent tier and access premium loan rates.</p>
              </div>

              {/* Insights */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Score Insights</p>
                <div className="space-y-3">
                  {insights.map((insight) => (
                    <div key={insight.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#F6F7F4] hover:bg-[#F0EEFF] transition-colors">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: insight.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800">{insight.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{insight.desc}</p>
                      </div>
                      <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">{insight.pts} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Score tab ── */}
          {activeNav === "score" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Credit Score", value: "742", sub: "Very Good", subColor: "#4ade80" },
                  { label: "Percentile", value: "81st", sub: "Top 19% globally", subColor: "#998DFF" },
                  { label: "Score Change", value: "+28", sub: "Last 30 days", subColor: "#7EC8E3" },
                  { label: "Risk Tier", value: "B", sub: "Moderate-Low risk", subColor: "#facc15" },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium mb-1">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs font-medium mt-1" style={{ color: card.subColor }}>{card.sub}</p>
                  </div>
                ))}
              </div>

              {/* Score arc + band breakdown */}
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Score Gauge</p>
                  <ScoreArc score={SCORE} />
                  <ScoreBand score={SCORE} />
                  <div className="mt-5 w-full space-y-1.5">
                    {[
                      { label: "Poor", range: "300–579", color: "#f87171" },
                      { label: "Fair", range: "580–669", color: "#fb923c" },
                      { label: "Good", range: "670–739", color: "#facc15" },
                      { label: "Very Good", range: "740–799", color: "#4ade80", active: true },
                      { label: "Excellent", range: "800–850", color: "#22c55e" },
                    ].map((b) => (
                      <div key={b.label} className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs ${b.active ? "bg-[#F4F3FF] font-semibold" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
                          <span className="text-gray-700">{b.label}</span>
                        </div>
                        <span className="text-gray-400 font-mono">{b.range}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Factor Breakdown</p>
                  <div className="space-y-5">
                    {scoreFactors.map((f) => (
                      <div key={f.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700">{f.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{f.weight} weight</span>
                            <span className="text-sm font-bold text-gray-900">{f.value}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${f.value}%`, background: f.color }} />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {f.value >= 90 ? "Excellent — keep it up" : f.value >= 75 ? "Good — small improvements possible" : "Fair — focus here to gain the most points"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score history */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">12-Month History</p>
                  <span className="text-xs text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full">+62 pts this year</span>
                </div>
                <div className="flex items-end gap-1 h-24">
                  {scoreHistory.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div
                        className="w-full rounded-t-sm transition-all"
                        style={{
                          height: `${((val - 650) / 200) * 100}%`,
                          background: i === scoreHistory.length - 1 ? "#998DFF" : "#E8E4FF",
                        }}
                      />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {scoreMonths.map((m, i) => (
                    <span key={i} className="flex-1 text-center text-[9px] text-gray-400">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Transactions tab ── */}
          {activeNav === "transactions" && (
            <div className="space-y-4">
              {/* Filter bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-400 mr-1">Filter:</span>
                {txTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTxFilter(type)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      txFilter === type
                        ? "bg-[#998DFF] text-white"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-[#998DFF] hover:text-[#998DFF]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
                <span className="ml-auto text-xs text-gray-400">{filteredTx.length} record{filteredTx.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["Tx Hash", "Type", "Amount", "Date", "Status", "Score Impact"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTx.map((tx) => (
                        <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{tx.hash}</td>
                          <td className="px-5 py-3.5 text-gray-700 font-medium">{tx.type}</td>
                          <td className="px-5 py-3.5 text-gray-600">{tx.amount}</td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs">{tx.date}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              tx.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-sm font-bold ${tx.score_impact.startsWith("+") ? "text-green-500" : "text-red-400"}`}>
                              {tx.score_impact}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredTx.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">No transactions match this filter.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Credentials tab ── */}
          {activeNav === "credentials" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">W3C DID Credentials</p>
                <button className="px-3 py-1.5 rounded-xl bg-[#998DFF] text-white text-xs font-semibold hover:bg-[#8a7ef0] transition-colors">
                  Issue New
                </button>
              </div>
              {credentials.map((cred) => (
                <div key={cred.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F4F3FF] flex items-center justify-center flex-shrink-0 text-[#998DFF]">
                        <BadgeIcon />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{cred.type}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Issued by <span className="text-[#998DFF] font-medium">{cred.issuer}</span></p>
                        <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                          <div><span className="text-gray-400">Issued:</span> <span className="text-gray-700 font-medium">{cred.issued}</span></div>
                          <div><span className="text-gray-400">Expires:</span> <span className="text-gray-700 font-medium">{cred.expires}</span></div>
                          {cred.score && <div><span className="text-gray-400">Score:</span> <span className="text-[#998DFF] font-bold">{cred.score}</span></div>}
                          <div><span className="text-gray-400">DID:</span> <span className="font-mono text-gray-500">did:stellar:{cred.id}</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> {cred.status}
                      </span>
                      <button className="text-xs text-[#998DFF] font-medium hover:underline">View JWT</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2 p-4 rounded-xl bg-[#F4F3FF] border border-[#E0DBFF] text-xs text-[#7a6ee0]">
                Credentials are signed W3C Verifiable Credentials stored on the Stellar blockchain. Any application can verify them without contacting CreditRails.
              </div>
            </div>
          )}

          {/* ── Settings tab ── */}
          {activeNav === "settings" && (
            <div className="space-y-4 max-w-xl">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Wallet</p>
                {walletAddress ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <span className="w-9 h-9 rounded-full bg-[#998DFF] flex items-center justify-center text-white text-sm font-bold">
                      {walletAddress[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 font-mono truncate">{walletAddress.slice(0, 12)}…{walletAddress.slice(-6)}</p>
                      <p className="text-xs text-gray-400">Stellar Testnet · Freighter</p>
                    </div>
                    <button onClick={disconnectWallet} className="ml-auto text-xs text-red-400 hover:text-red-600 font-medium flex-shrink-0">Disconnect</button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-500">No wallet connected.</p>
                    <button
                      onClick={handleConnectWallet}
                      disabled={connecting}
                      className="self-start px-4 py-2 rounded-xl bg-[#998DFF] text-white text-xs font-semibold hover:bg-[#8a7ef0] transition-colors disabled:opacity-60"
                    >
                      {connecting ? "Connecting…" : "Connect Freighter"}
                    </button>
                    {walletError && <p className="text-xs text-red-500">{walletError}</p>}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Notifications</p>
                <div className="space-y-3">
                  {["Score change alerts", "New credential issued", "Loan eligibility updates"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item}</span>
                      <div className="w-9 h-5 rounded-full bg-[#998DFF] relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Data Sharing</p>
                <p className="text-xs text-gray-500 mb-3">Control which apps can read your credit credential</p>
                {["Blend Finance", "StellarX", "MoneyGram"].map((app) => (
                  <div key={app} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700 font-medium">{app}</span>
                    <button className="text-xs text-red-400 hover:text-red-600 font-medium">Revoke</button>
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
