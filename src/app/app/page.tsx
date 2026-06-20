"use client";

import { useState } from "react";

const SCORE = 742;
const MAX_SCORE = 850;
const SCORE_PCT = Math.round((SCORE / MAX_SCORE) * 100);

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
      {/* Track */}
      <path d={arcPath(startAngle, startAngle + sweepAngle, r)} fill="none" stroke="#F0EEFF" strokeWidth="14" strokeLinecap="round" />
      {/* Fill */}
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#998DFF" strokeWidth="14" strokeLinecap="round" />
      {/* Glow overlay */}
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#C4BCFF" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      {/* Score text */}
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

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F6F7F4] overflow-hidden font-[var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40 h-full w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <span className="w-8 h-8 rounded-xl bg-[#998DFF] flex items-center justify-center shadow-sm shadow-[#998DFF]/40">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 15L9 3L14 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 11h6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M4.8 14h8.4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-gray-900">CreditRails</span>
        </a>

        {/* Wallet pill */}
        <div className="mx-4 mt-5 mb-2 px-3 py-2.5 rounded-xl bg-[#F4F3FF] flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#998DFF] flex items-center justify-center text-white text-xs font-bold">A</span>
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400">Connected wallet</p>
            <p className="text-xs font-mono font-semibold text-gray-700 truncate">GBZX…4K9P</p>
          </div>
          <span className="ml-auto w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        </div>

        {/* Nav */}
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

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF] animate-pulse" />
            Stellar Testnet · Block #9,241,887
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 md:px-8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
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
          {/* Overview & Score tab */}
          {(activeNav === "overview" || activeNav === "score") && (
            <div className="space-y-6">
              {/* Top stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Credit Score", value: "742", sub: "Very Good", subColor: "#4ade80" },
                  { label: "Percentile", value: "81st", sub: "Top 19% of users", subColor: "#998DFF" },
                  { label: "Loan Eligibility", value: "$12,500", sub: "Max USDC credit", subColor: "#7EC8E3" },
                  { label: "Active Credentials", value: "3", sub: "W3C DID verified", subColor: "#facc15" },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-medium mb-1">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-xs font-medium mt-1" style={{ color: card.subColor }}>{card.sub}</p>
                  </div>
                ))}
              </div>

              {/* Score + factors */}
              <div className="grid md:grid-cols-5 gap-4">
                {/* Arc meter */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Score Overview</p>
                  <ScoreArc score={SCORE} />
                  <ScoreBand score={SCORE} />
                  <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "Low", val: "300" },
                      { label: "Target", val: "800" },
                      { label: "High", val: "850" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-[11px] text-gray-400">{s.label}</p>
                        <p className="text-xs font-bold text-gray-600">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score factors */}
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
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${f.value}%`, background: f.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score history mini chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Score History</p>
                  <span className="text-xs text-green-500 font-semibold">+28 pts this month</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[680, 690, 695, 700, 708, 714, 718, 722, 728, 733, 738, 742].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm transition-all"
                        style={{
                          height: `${((val - 650) / 200) * 100}%`,
                          background: i === 11 ? "#998DFF" : "#E8E4FF",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                  <span>Jun 2025</span>
                  <span>Jun 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* Transactions tab */}
          {activeNav === "transactions" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Transactions</p>
                <span className="text-xs text-gray-400">{transactions.length} records</span>
              </div>
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
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{tx.hash}</td>
                        <td className="px-5 py-3.5 text-gray-700 font-medium">{tx.type}</td>
                        <td className="px-5 py-3.5 text-gray-600">{tx.amount}</td>
                        <td className="px-5 py-3.5 text-gray-400 text-xs">{tx.date}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            tx.status === "Confirmed"
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-500"
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-bold ${
                            tx.score_impact.startsWith("+") ? "text-green-500" : "text-red-400"
                          }`}>
                            {tx.score_impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Credentials tab */}
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
                      <div className="w-10 h-10 rounded-xl bg-[#F4F3FF] flex items-center justify-center flex-shrink-0">
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

          {/* Settings tab */}
          {activeNav === "settings" && (
            <div className="space-y-4 max-w-xl">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Wallet</p>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <span className="w-9 h-9 rounded-full bg-[#998DFF] flex items-center justify-center text-white text-sm font-bold">A</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">GBZXFMN7AJ4K9PQRST…</p>
                    <p className="text-xs text-gray-400">Stellar Testnet</p>
                  </div>
                  <button className="ml-auto text-xs text-[#998DFF] font-medium hover:underline">Disconnect</button>
                </div>
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
