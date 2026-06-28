"use client";

import { WobbleCard } from "./ui/wobble-card";

/* ─── Card 1: Scrolling transaction feed ─────────────────── */
const txns = [
  { sign: "+", amount: "450 XLM", label: "Payroll" },
  { sign: "-", amount: "12.5 XLM", label: "Payment" },
  { sign: "+", amount: "1,200 XLM", label: "Remittance" },
  { sign: "-", amount: "38 XLM", label: "DeFi swap" },
  { sign: "+", amount: "90 XLM", label: "Savings" },
  { sign: "-", amount: "5 XLM", label: "Fee" },
  { sign: "+", amount: "750 XLM", label: "Payroll" },
  { sign: "+", amount: "200 XLM", label: "Transfer" },
];

function TxnFeed() {
  const txnItem = (t: (typeof txns)[0], i: number) => (
    <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 flex-shrink-0">
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{
          background: t.sign === "+" ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)",
          color:      t.sign === "+" ? "#4ade80"              : "#f87171",
        }}
      >
        {t.sign}
      </span>
      <div className="min-w-0">
        <p className="text-white text-[11px] font-semibold leading-none">{t.amount}</p>
        <p className="text-white/50 text-[9px] leading-none mt-1">{t.label}</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes cr-txnScroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes cr-txnScrollX {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cr-txn-scroll  { animation: cr-txnScroll  9s linear infinite; }
        .cr-txn-scrollx { animation: cr-txnScrollX 12s linear infinite; }
      `}</style>

      {/* Mobile: horizontal scrolling strip */}
      <div className="lg:hidden mt-5 overflow-hidden rounded-2xl bg-[#0d0d12] border border-white/10 py-2">
        <div className="flex gap-2 px-2 cr-txn-scrollx" style={{ width: "max-content" }}>
          {[...txns, ...txns].map((t, i) => txnItem(t, i))}
        </div>
      </div>

      {/* Desktop: vertical floating panel */}
      <div className="absolute right-5 top-5 bottom-5 w-44 overflow-hidden hidden lg:block rounded-2xl bg-[#0d0d12] border border-white/10">
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,18,0.95) 0%, transparent 18%, transparent 82%, rgba(13,13,18,0.95) 100%)" }} />
        <div className="cr-txn-scroll flex flex-col gap-2 pt-1">
          {[...txns, ...txns].map((t, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 mx-1">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: t.sign === "+" ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)",
                  color:      t.sign === "+" ? "#4ade80"              : "#f87171",
                }}
              >
                {t.sign}
              </span>
              <div className="min-w-0">
                <p className="text-white text-[11px] font-semibold leading-none">{t.amount}</p>
                <p className="text-white/50 text-[9px] leading-none mt-1">{t.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Card 2: Credential badge ───────────────────────────── */
function CredentialBadge() {
  return (
    <>
      <style>{`
        @keyframes cr-spinRing { to { transform: rotate(360deg); } }
        @keyframes cr-pulseDot {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.35); }
        }
        .cr-spin-ring  { animation: cr-spinRing 5s linear infinite; }
        .cr-pulse-dot  { animation: cr-pulseDot 2s ease-in-out infinite; }
      `}</style>
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
          {/* spinning shield */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <div
              className="cr-spin-ring absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
                padding: "1.5px",
              }}
            >
              <div className="w-full h-full rounded-full"
                style={{ background: "linear-gradient(135deg, #7b6de0, #4e36b0)" }} />
            </div>
            <div className="absolute inset-1.5 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">W3C Credential</p>
            <p className="text-white/60 text-[10px] font-mono">did:stellar:GBZX…4K9P</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 self-start">
          <span className="cr-pulse-dot w-2 h-2 rounded-full bg-[#4ade80] inline-block" />
          <span className="text-white/80 text-xs font-medium">Self-sovereign</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 self-start">
          <span className="w-2 h-2 rounded-full bg-[#7dd3fc] inline-block" />
          <span className="text-white/70 text-xs font-medium">Revokable anytime</span>
        </div>
      </div>
    </>
  );
}

/* ─── Card 3: Animated API response ─────────────────────── */
type ApiLine =
  | { type: "cmd" | "bracket"; content: string }
  | { type: "kv"; key: string; val: string; vColor: string };

const apiLines: ApiLine[] = [
  { type: "cmd",     content: "$ GET /v1/score/:wallet" },
  { type: "bracket", content: "{" },
  { type: "kv", key: '"score"',      val: "742",                  vColor: "#86efac" },
  { type: "kv", key: '"tier"',       val: '"B+"',                 vColor: "#fca5a5" },
  { type: "kv", key: '"eligible"',   val: "true",                 vColor: "#c4bcff" },
  { type: "kv", key: '"credential"', val: '"did:stellar:GBZX…"', vColor: "#fbbf24" },
  { type: "bracket", content: "}" },
];

function CodeBlock({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`relative rounded-2xl bg-[#0f1117]/80 border border-white/10 overflow-hidden text-[11px] font-mono ${mobile ? "w-full mt-5" : "w-full mr-6 ml-2"}`}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-gray-500 text-[10px]">creditrails · live</span>
        <span className="ml-auto flex items-center gap-1 text-[9px] text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          200 OK
        </span>
      </div>
      <div className="relative px-4 py-4 space-y-1.5 overflow-hidden">
        <div className="cr-scan-bar absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(153,141,255,0.9), transparent)" }} />
        {apiLines.map((line, i) => (
          <div key={i} className="cr-api-line" style={{ animationDelay: `${0.3 + i * 0.22}s` }}>
            {line.type === "cmd" && <span className="text-gray-500">{line.content}</span>}
            {line.type === "bracket" && <span className="text-gray-400">{line.content}</span>}
            {line.type === "kv" && (
              <span className="pl-4">
                <span className="text-[#7dd3fc]">{line.key}</span>
                <span className="text-gray-500">: </span>
                <span style={{ color: line.vColor }}>{line.val}</span>
                {i < apiLines.length - 2 && <span className="text-gray-600">,</span>}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveCode() {
  return (
    <>
      <style>{`
        @keyframes cr-lineIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cr-scan {
          0%   { top: 0%;   opacity: 0.8; }
          85%  { top: 100%; opacity: 0;   }
          100% { top: 100%; opacity: 0;   }
        }
        .cr-api-line { opacity: 0; animation: cr-lineIn 0.3s ease forwards; }
        .cr-scan-bar { animation: cr-scan 3s ease-in 2s infinite; }
      `}</style>

      {/* Mobile: code block below text */}
      <div className="lg:hidden">
        <CodeBlock mobile />
      </div>

      {/* Desktop: absolute right panel */}
      <div className="absolute right-0 top-0 bottom-0 w-72 hidden lg:flex items-center">
        <CodeBlock />
      </div>
    </>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function Integrations() {
  return (
    <section className="bg-white py-16 md:py-28 px-5 md:px-6" id="integrations">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 md:mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            Why CreditRails
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Credit that works for everyone
          </h2>
          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Portable, private, and built on open standards — your credit profile
            belongs to you, not a database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">

          {/* Card 1 – wide with live tx feed */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 min-h-[280px] lg:min-h-[260px]"
            style={{ background: "linear-gradient(135deg, #c4bcff 0%, #998DFF 60%, #7b6de0 100%)" }}
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                CreditRails powers on-chain credit across Stellar
              </h2>
              <p className="mt-4 text-left text-base/6 text-white/80">
                With one wallet connect, users get a portable credit score that
                works across every Stellar-native app — no forms, no bank statements.
              </p>
            </div>
            <TxnFeed />
          </WobbleCard>

          {/* Card 2 – narrow with credential badge */}
          <WobbleCard
            containerClassName="col-span-1 min-h-[260px]"
            style={{ background: "linear-gradient(135deg, #998DFF 0%, #6148d0 100%)" }}
          >
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              User-owned credentials.
            </h2>
            <CredentialBadge />
          </WobbleCard>

          {/* Card 3 – full-width with live API code */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 min-h-[240px]"
            style={{ background: "linear-gradient(135deg, #7b6de0 0%, #6148d0 100%)" }}
          >
            <div className="w-full lg:max-w-[38%]">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Build credit-aware apps with the CreditRails SDK
              </h2>
              <p className="mt-4 text-left text-base/6 text-white/80">
                One API call returns a score, risk tier, and W3C verifiable credential — ready for any Stellar lending or payments app.
              </p>
              <a
                href="/docs"
                className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold hover:bg-white/30 transition-colors border border-white/20"
              >
                Read the docs →
              </a>
            </div>
            <LiveCode />
          </WobbleCard>

        </div>
      </div>
    </section>
  );
}
