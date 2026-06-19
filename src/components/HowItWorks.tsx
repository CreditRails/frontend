const steps = [
  {
    number: "01",
    title: "Connect Wallet",
    description:
      "Link your Stellar wallet. CreditRails reads your on-chain history — no personal data required.",
  },
  {
    number: "02",
    title: "Index Activity",
    description:
      "Our indexer streams your payroll, remittances, savings patterns, and payment frequency from Horizon.",
  },
  {
    number: "03",
    title: "Score Generated",
    description:
      "The scoring engine weighs behavioral signals and produces a credit score with a risk tier.",
  },
  {
    number: "04",
    title: "Credential Issued",
    description:
      "A W3C Verifiable Credential is signed to your wallet. You own it. Share it anywhere, anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-28 px-5 md:px-6" id="protocol">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Four steps to your credit profile
          </h2>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl md:rounded-3xl border border-gray-100 bg-white/50 p-6 md:p-8 hover:border-[#D7D2FF] transition-colors backdrop-blur-sm overflow-hidden"
            >
              {/* Watermark number — always visible */}
              <span className="absolute -top-3 -right-1 text-8xl font-black text-[#EFEFFF] select-none">
                {step.number}
              </span>

              <span className="text-sm font-bold text-[#998DFF]">{step.number}</span>
              <h3 className="mt-3 text-lg md:text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
