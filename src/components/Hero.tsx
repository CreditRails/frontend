export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ffffff 20%, #EFEFFF 55%, #D7D2FF 100%)",
      }}
    >
      {/* Subtle radial glow */}
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
      <h1 className="relative max-w-3xl text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08]">
        Portable Credit{" "}
        <span className="text-[#998DFF]">Infrastructure</span>
        <br />
        for the Open Economy
      </h1>

      <p className="relative mt-6 max-w-xl text-center text-lg text-gray-500 leading-relaxed">
        CreditRails reads on-chain Stellar activity and converts it into a
        verifiable credit profile — one that users carry across every
        application.
      </p>

      {/* CTAs */}
      <div className="relative mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href="#app"
          className="px-6 py-3 rounded-2xl bg-[#998DFF] text-white font-semibold text-sm hover:bg-[#8a7ef0] transition-colors shadow-lg shadow-[#998DFF]/30"
        >
          Get Credit Score
        </a>
        <a
          href="#protocol"
          className="px-6 py-3 rounded-2xl bg-[#F4F3FF] text-[#A398FF] font-semibold text-sm hover:bg-[#ede9ff] transition-colors"
        >
          Read the Protocol
        </a>
      </div>

      {/* Stats row */}
      <div className="relative mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/60 bg-white/30 backdrop-blur-sm w-full max-w-3xl">
        {[
          { value: "10M+", label: "Transactions Indexed" },
          { value: "4.2s", label: "Avg Score Update" },
          { value: "W3C", label: "DID Standard" },
          { value: "0%", label: "Collateral Required" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-6 px-4 bg-white/40">
            <span className="text-2xl font-bold text-gray-900">{s.value}</span>
            <span className="mt-1 text-xs text-gray-400 text-center">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
