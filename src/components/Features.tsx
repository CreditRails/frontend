const features = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    tag: "Indexer",
    title: "Real-Time Stellar Indexing",
    description:
      "Every transaction on your Stellar wallet is streamed, parsed, and categorized — payroll, savings, remittances, and payments — feeding a continuously updated financial model.",
    highlight: "Every ledger event captured.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    tag: "Scoring Engine",
    title: "Behavioral Credit Scoring",
    description:
      "A weighted model analyzes payment consistency, remittance regularity, savings growth, and wallet age. The result: a credit score, risk tier, and lending eligibility flag.",
    highlight: "No FICO. No SSN. Just behavior.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tag: "Credential",
    title: "W3C Verifiable Credentials",
    description:
      "A signed W3C Verifiable Credential is issued to your Stellar wallet DID. It contains your score, risk tier, and eligibility. You control it — present it to any lender, revoke it at any time.",
    highlight: "You own your credit identity.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    tag: "API",
    title: "Open Credit API",
    description:
      "Lenders and protocols query credit profiles via REST. Rate-limited, key-authenticated endpoints return scores, credentials, and verification results with sub-second latency.",
    highlight: "Drop-in credit layer for any app.",
  },
];

export default function Features() {
  return (
    <section
      className="py-16 md:py-28 px-5 md:px-6"
      id="developers"
      style={{ background: "linear-gradient(180deg, #EFEFFF 0%, #D7D2FF 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            Core Infrastructure
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Everything lenders need.{" "}
            <span className="text-[#998DFF]">Nothing they shouldn&apos;t.</span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed">
            CreditRails is built as modular infrastructure. Each layer is
            independently useful and composable together.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((f) => (
            <div
              key={f.tag}
              className="rounded-2xl md:rounded-3xl bg-white p-6 md:p-8 border border-gray-100 hover:border-[#D7D2FF] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#998DFF] uppercase tracking-widest">
                    {f.tag}
                  </span>
                  <h3 className="mt-1.5 text-base md:text-lg font-semibold text-gray-900">{f.title}</h3>
                </div>
              </div>
              <p className="mt-4 md:mt-5 text-sm text-gray-500 leading-relaxed">{f.description}</p>
              <div className="mt-4 md:mt-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF]" />
                <span className="text-sm font-medium text-[#998DFF]">{f.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
