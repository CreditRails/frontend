const integrations = [
  {
    name: "Stellar",
    desc: "Transaction indexing via Horizon API",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="16" fill="#0E1C2E"/>
        <path d="M25.5 10.3l-1.8.9a7.4 7.4 0 1 0 0 9.6l1.8.9A9.5 9.5 0 1 1 25.5 10.3z" fill="#8ADAFF"/>
        <path d="M25.9 17l-9.9-4.9-10.5 5.1.6 1.2 9.9-4.8 9.3 4.6.6-1.2z" fill="#8ADAFF"/>
      </svg>
    ),
  },
  {
    name: "Blend",
    desc: "Undercollateralized lending pools",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="16" fill="#1A0A2E"/>
        <path d="M10 8h7a5 5 0 0 1 0 10H10V8z" fill="#9B59FF"/>
        <path d="M10 18h8a5 5 0 0 1 0 10H10V18z" fill="#C89BFF" opacity=".7"/>
      </svg>
    ),
  },
  {
    name: "Bitso",
    desc: "LATAM exchange payroll & deposit signals",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="16" fill="#0A1628"/>
        <path d="M12 9h5a4 4 0 0 1 0 8h-5V9z" fill="#4A9EFF"/>
        <path d="M12 17h6a4 4 0 0 1 0 8h-6V17z" fill="#4A9EFF" opacity=".6"/>
      </svg>
    ),
  },
  {
    name: "Sava",
    desc: "Savings behavior signals",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="16" fill="#0D2210"/>
        <path d="M16 7c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 4v5l3.5 2-1 1.7L14 17v-6h2z" fill="#34D399"/>
      </svg>
    ),
  },
  {
    name: "Fiatsend",
    desc: "Remittance flow signals",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="16" fill="#1A1000"/>
        <path d="M7 16h18M19 10l6 6-6 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "MoneyGram",
    desc: "Cross-border remittance via Stellar",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="16" fill="#0D1A3A"/>
        <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#4A9EFF" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 10v6l4 2" stroke="#4A9EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Integrations() {
  return (
    <section className="bg-white py-16 md:py-28 px-5 md:px-6" id="integrations">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 md:mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            Integrations
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Built into the Stellar ecosystem
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            CreditRails plugs into the protocols where financial activity
            already happens — no new behavior required from users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {integrations.map((i) => (
            <div
              key={i.name}
              className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white/50 backdrop-blur-sm p-5 md:p-6 flex items-center gap-4 hover:border-[#D7D2FF] hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-2xl bg-gray-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                {i.logo}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{i.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-snug">{i.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          More integrations via the open CreditRails SDK →{" "}
          <a href="#docs" className="text-[#998DFF] hover:underline">Read the docs</a>
        </p>
      </div>
    </section>
  );
}
