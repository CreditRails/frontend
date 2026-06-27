const steps = [
  {
    number: "01",
    title: "Connect Wallet",
    description: "Link your Stellar wallet. CreditRails reads your on-chain history — no personal data required.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M16 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="currentColor" stroke="none" opacity=".5" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Index Activity",
    description: "Our indexer streams your payroll, remittances, savings patterns, and payment frequency from Horizon.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 12h3l3-7 4 14 3-7h5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Score Generated",
    description: "The scoring engine weighs behavioral signals and produces a credit score with a risk tier.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 12l4-4" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Credential Issued",
    description: "A W3C Verifiable Credential is signed to your wallet. You own it. Share it anywhere, anytime.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-28 px-5 md:px-6" id="protocol">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 md:mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Four steps to your credit profile
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base max-w-md mx-auto">
            From wallet connection to a portable W3C credential in seconds.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#EFEFFF] via-[#D7D2FF] to-[#EFEFFF]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center md:items-center">
                {/* Numbered circle — sits on top of the line */}
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-[#998DFF]/30 ring-4 ring-white mb-5"
                  style={{ background: "linear-gradient(135deg, #c4bcff 0%, #998DFF 100%)" }}
                >
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="w-11 h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center text-[#998DFF] mb-4">
                  {step.icon}
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical connector hint */}
        <style>{`
          @media (max-width: 767px) {
            .step-connector { display: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
