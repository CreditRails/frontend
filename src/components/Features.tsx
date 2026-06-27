const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    tag: "Indexer",
    title: "Real-Time Stellar Indexing",
    description:
      "Every transaction on your Stellar wallet is streamed, parsed, and categorized — payroll, savings, remittances, and payments — feeding a continuously updated financial model.",
    highlight: "Every ledger event captured.",
    wide: true,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    tag: "Scoring Engine",
    title: "Behavioral Credit Scoring",
    description:
      "A weighted model analyzes payment consistency, remittance regularity, savings growth, and wallet age. The result: a credit score, risk tier, and lending eligibility flag.",
    highlight: "No FICO. No SSN. Just behavior.",
    wide: false,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tag: "Credential",
    title: "W3C Verifiable Credentials",
    description:
      "A signed W3C Verifiable Credential is issued to your Stellar wallet DID. You control it — present it to any lender, revoke it at any time.",
    highlight: "You own your credit identity.",
    wide: false,
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="#998DFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    tag: "API",
    title: "Open Credit API",
    description:
      "Drop-in credit layer for any Stellar app. Key-authenticated endpoints return scores, credentials, and verification results with sub-second latency.",
    highlight: "Drop-in credit layer for any app.",
    wide: true,
    code: true,
  },
];

function CodeBlock() {
  return (
    <div className="mt-5 rounded-xl bg-[#0f1117] border border-gray-800 overflow-hidden text-[11px] font-mono leading-relaxed">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-gray-500 text-[10px]">GET /v1/score/:wallet</span>
      </div>
      <div className="px-4 py-3 space-y-0.5">
        <p><span className="text-gray-500">{"{"}</span></p>
        <p className="pl-4"><span className="text-[#7dd3fc]">&quot;score&quot;</span><span className="text-gray-400">: </span><span className="text-[#86efac]">742</span><span className="text-gray-500">,</span></p>
        <p className="pl-4"><span className="text-[#7dd3fc]">&quot;tier&quot;</span><span className="text-gray-400">: </span><span className="text-[#fca5a5]">&quot;B&quot;</span><span className="text-gray-500">,</span></p>
        <p className="pl-4"><span className="text-[#7dd3fc]">&quot;eligible&quot;</span><span className="text-gray-400">: </span><span className="text-[#c4bcff]">true</span><span className="text-gray-500">,</span></p>
        <p className="pl-4"><span className="text-[#7dd3fc]">&quot;credential_url&quot;</span><span className="text-gray-400">: </span><span className="text-[#fca5a5]">&quot;did:stellar:GBZX…&quot;</span></p>
        <p><span className="text-gray-500">{"}"}</span></p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      className="relative py-16 md:py-28 px-5 md:px-6"
      id="developers"
      style={{ background: "linear-gradient(180deg, #EFEFFF 0%, #D7D2FF 100%)" }}
    >
      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(153,141,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
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

        {/* Asymmetric grid: 2-col rows where some cards span 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Row 1: wide (2/3) + narrow (1/3) */}
          <div className="md:col-span-2 rounded-2xl md:rounded-3xl bg-white p-6 md:p-8 border border-gray-100 hover:border-[#D7D2FF] transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center">
                {features[0].icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#998DFF] uppercase tracking-widest">{features[0].tag}</span>
                <h3 className="mt-1.5 text-base md:text-lg font-semibold text-gray-900">{features[0].title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{features[0].description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF]" />
              <span className="text-sm font-medium text-[#998DFF]">{features[0].highlight}</span>
            </div>
          </div>

          <div className="md:col-span-1 rounded-2xl md:rounded-3xl bg-white p-6 md:p-8 border border-gray-100 hover:border-[#D7D2FF] transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center">
                {features[1].icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#998DFF] uppercase tracking-widest">{features[1].tag}</span>
                <h3 className="mt-1.5 text-base md:text-lg font-semibold text-gray-900">{features[1].title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{features[1].description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF]" />
              <span className="text-sm font-medium text-[#998DFF]">{features[1].highlight}</span>
            </div>
          </div>

          {/* Row 2: narrow (1/3) + wide (2/3 with code block) */}
          <div className="md:col-span-1 rounded-2xl md:rounded-3xl bg-white p-6 md:p-8 border border-gray-100 hover:border-[#D7D2FF] transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center">
                {features[2].icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#998DFF] uppercase tracking-widest">{features[2].tag}</span>
                <h3 className="mt-1.5 text-base md:text-lg font-semibold text-gray-900">{features[2].title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{features[2].description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#998DFF]" />
              <span className="text-sm font-medium text-[#998DFF]">{features[2].highlight}</span>
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl md:rounded-3xl bg-white p-6 md:p-8 border border-gray-100 hover:border-[#D7D2FF] transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center">
                {features[3].icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#998DFF] uppercase tracking-widest">{features[3].tag}</span>
                <h3 className="mt-1.5 text-base md:text-lg font-semibold text-gray-900">{features[3].title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{features[3].description}</p>
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
