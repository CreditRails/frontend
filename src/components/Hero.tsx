function toXY(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcD(cx: number, cy: number, r: number, from: number, to: number) {
  const [sx, sy] = toXY(cx, cy, r, from);
  const [ex, ey] = toXY(cx, cy, r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

const CX = 64, CY = 54, R = 44, START = -210;
const TRACK = arcD(CX, CY, R, START, START + 240);
const FILL = arcD(CX, CY, R, START, START + 240 * (742 / 850));

function ScoreCard() {
  return (
    <div className="relative w-80 md:w-96">
      <div className="absolute inset-0 rounded-3xl bg-[#998DFF]/20 blur-3xl scale-90 translate-y-6 pointer-events-none" />

      <div className="relative rounded-3xl bg-white border border-gray-100 shadow-2xl shadow-[#998DFF]/10 p-6 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#998DFF]/30 to-transparent" />

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-xl flex items-center justify-center shadow-md shadow-[#998DFF]/30"
              style={{ background: "linear-gradient(150deg, #c4bcff 0%, #998DFF 45%, #6148d0 100%)" }}
            >
              <svg width="13" height="13" viewBox="0 0 32 32" fill="none">
                <path d="M8 29L13.5 4" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M24 29L18.5 4" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M9.5 25L22.5 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 16.5L20 16.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
              </svg>
            </span>
            <span className="text-xs font-bold text-gray-800 tracking-tight">CreditRails</span>
          </div>
          <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>

        <div className="flex justify-center mb-1">
          <svg viewBox="0 0 128 110" className="w-44 h-[140px]">
            <path d={TRACK} fill="none" stroke="#F0EEFF" strokeWidth="10" strokeLinecap="round" />
            <path d={FILL} fill="none" stroke="#998DFF" strokeWidth="10" strokeLinecap="round" />
            <path d={FILL} fill="none" stroke="#c4bcff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <text x={CX} y={CY + 2} textAnchor="middle" fontSize="16" fontWeight="800" fill="#1a1a2e" fontFamily="system-ui">742</text>
            <text x={CX} y={CY + 20} textAnchor="middle" fontSize="16" fontWeight="700" fill="#998DFF" fontFamily="system-ui">/ 850</text>
            <text x={CX} y={CY + 42} textAnchor="middle" fontSize="9" fill="#9ca3af" letterSpacing="1.5">CREDIT SCORE</text>
          </svg>
        </div>

        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
          <span className="text-sm font-semibold text-[#4ade80]">Very Good</span>
          <span className="text-xs text-gray-400">· 81st percentile</span>
        </div>

        <div className="space-y-2.5">
          {[
            { label: "Payment History", v: 96 },
            { label: "Transaction Volume", v: 82 },
            { label: "Account Age", v: 71 },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-gray-500">{f.label}</span>
                <span className="font-semibold text-gray-700">{f.v}%</span>
              </div>
              <div className="h-1.5 bg-[#F0EEFF] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${f.v}%`, background: "linear-gradient(90deg, #c4bcff, #998DFF)" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 p-3 rounded-2xl bg-[#F4F3FF] border border-[#E0DBFF]">
          <div className="w-8 h-8 rounded-xl bg-[#998DFF] flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#998DFF]/30">
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13S1 9.5 1 5.5a6 6 0 0 1 12 0C13 9.5 7 13 7 13z" />
              <path d="M4.5 5.5l1.5 1.5 3-3" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800">W3C Credential Issued</p>
            <p className="text-[10px] text-gray-400 font-mono truncate">did:stellar:GBZX…4K9P</p>
          </div>
          <svg className="ml-auto flex-shrink-0 w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16">
            <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Floating annotation chips */}
      <div className="absolute -left-14 top-14 bg-white rounded-xl border border-gray-100 shadow-lg px-3 py-2 hidden xl:flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#F0EEFF] flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" fill="none" stroke="#998DFF" strokeWidth="2" strokeLinecap="round">
            <circle cx="6.5" cy="6.5" r="5.5" /><path d="M6.5 4v3l2 1.5" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-800 leading-none">4.2s</p>
          <p className="text-[9px] text-gray-400 leading-none mt-0.5">Score update</p>
        </div>
      </div>

      <div className="absolute -right-14 bottom-20 bg-white rounded-xl border border-gray-100 shadow-lg px-3 py-2 hidden xl:flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#F0EEFF] flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" fill="none" stroke="#998DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 12S1.5 9 1.5 5.5a5 5 0 0 1 10 0C11.5 9 6.5 12 6.5 12z" /><path d="M4.5 5.5l1.5 1.5 2.5-2.5" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-800 leading-none">Self-sovereign</p>
          <p className="text-[9px] text-gray-400 leading-none mt-0.5">W3C DID</p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #ffffff 20%, #EFEFFF 55%, #D7D2FF 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(153,141,255,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 60% 55%, rgba(153,141,255,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: text */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Waitlist badge */}
            <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D7D2FF] bg-white/70 backdrop-blur-sm self-center lg:self-start">
              <span className="flex -space-x-1.5">
                {[15, 22, 33, 47].map((n) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/40?img=${n}`}
                    alt="member"
                    className="w-5 h-5 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </span>
              <span className="text-xs font-semibold text-[#7a6ee0]">1,000+ on the waitlist</span>
            </div>

            <h1 className="w-full max-w-xl tracking-tight leading-[1.06]">
              <span className="block text-4xl md:text-6xl lg:text-[58px] font-light text-gray-900 tracking-wide">
                Portable Credit
              </span>
              <span className="block text-4xl md:text-6xl lg:text-[58px] font-black text-gray-900 tracking-tight">
                Infrastructure
              </span>
              <span className="block mt-3 text-4xl md:text-6xl lg:text-[58px] font-light text-gray-900 tracking-wide">
                for the{" "}
                <span className="relative inline-block text-[#998DFF] font-black tracking-tight group cursor-default">
                  Open Economy
                  <span className="absolute left-0 -bottom-1 h-[5px] w-0 group-hover:w-full bg-[#998DFF]/25 rounded-full transition-all duration-300" />
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base md:text-lg text-gray-500 leading-relaxed">
              CreditRails reads on-chain Stellar activity and converts it into a
              verifiable credit profile — one that users carry across every
              application.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="/app"
                className="px-6 py-3 rounded-2xl bg-[#998DFF] text-white font-semibold text-sm hover:bg-[#8a7ef0] transition-colors shadow-lg shadow-[#998DFF]/30 text-center"
              >
                Get Credit Score
              </a>
              <a
                href="#protocol"
                className="px-6 py-3 rounded-2xl bg-[#F4F3FF] text-[#A398FF] font-semibold text-sm hover:bg-[#ede9ff] transition-colors text-center"
              >
                Read the Protocol
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-400 flex items-center gap-1.5 self-center lg:self-start">
              <svg width="12" height="12" fill="none" stroke="#4ade80" strokeWidth="2.5" viewBox="0 0 12 12">
                <path d="M2 6.5l2.5 2.5 5.5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              No SSN · No bank account · No credit history required
            </p>
          </div>

          {/* Right: score card */}
          <div className="flex justify-center lg:justify-end lg:pr-10">
            <ScoreCard />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 shadow-sm">
          {[
            { value: "10M+", label: "Transactions Indexed" },
            { value: "4.2s", label: "Avg Score Update" },
            { value: "W3C", label: "DID Standard" },
            { value: "0%", label: "Collateral Required" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-5 md:py-6 px-3 md:px-4 bg-white">
              <span className="text-xl md:text-2xl font-bold text-gray-900">{s.value}</span>
              <span className="mt-1 text-[11px] md:text-xs text-gray-400 text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
