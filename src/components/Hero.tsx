export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-20 md:pb-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ffffff 20%, #EFEFFF 55%, #D7D2FF 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(153,141,255,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Pill badge */}
      <div className="relative mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D7D2FF] bg-white/60 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-[#998DFF] animate-pulse" />
        <span className="text-xs font-medium text-[#998DFF]">Now live on Stellar Testnet</span>
      </div>

      {/* Headline */}
      <h1 className="relative w-full max-w-3xl text-center tracking-tight leading-[1.06]">
        <span className="block text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-wide">
          Portable Credit
        </span>
        <span className="block text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight">
          Infrastructure
        </span>
        <span className="block mt-3 text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-wide">
          for the{" "}
          <span className="relative inline-block text-[#998DFF] font-black tracking-tight">
            Open Economy
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 10"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 6 Q 75 2, 150 6 Q 225 10, 296 5"
                stroke="#998DFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </span>
      </h1>

      <p className="relative mt-6 max-w-md text-center text-base md:text-lg text-gray-500 leading-relaxed px-2">
        CreditRails reads on-chain Stellar activity and converts it into a
        verifiable credit profile — one that users carry across every
        application.
      </p>

      {/* CTAs */}
      <div className="relative mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
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

      {/* Stats row */}
      <div className="relative mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 bg-gray-100 w-full max-w-3xl shadow-sm">
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
    </section>
  );
}
