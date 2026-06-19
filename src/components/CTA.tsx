export default function CTA() {
  return (
    <section
      className="py-16 md:py-28 px-5 md:px-6"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #ffffff 15%, #EFEFFF 50%, #D7D2FF 100%)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="rounded-2xl md:rounded-3xl px-6 md:px-10 py-12 md:py-16 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #EFEFFF 0%, #D7D2FF 100%)",
          }}
        >
          {/* Glow blob */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(153,141,255,0.25) 0%, transparent 70%)",
            }}
          />

          <span className="relative text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            Get Started
          </span>
          <h2 className="relative mt-4 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Your credit profile,
            <br />
            <span className="text-[#998DFF]">on-chain and yours.</span>
          </h2>
          <p className="relative mt-4 md:mt-5 text-sm md:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Connect your Stellar wallet and get a verifiable credit score in
            seconds — no documents, no banks, no gatekeepers.
          </p>
          <div className="relative mt-7 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="#app"
              className="px-7 py-3 rounded-2xl bg-[#998DFF] text-white font-semibold text-sm hover:bg-[#8a7ef0] transition-colors shadow-lg shadow-[#998DFF]/30 text-center"
            >
              Launch App
            </a>
            <a
              href="#docs"
              className="px-7 py-3 rounded-2xl bg-white/70 backdrop-blur-sm text-[#A398FF] font-semibold text-sm hover:bg-white transition-colors border border-white/60 text-center"
            >
              Read Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
