const integrations = [
  { name: "Stellar", desc: "Transaction indexing via Horizon API", logo: "S" },
  { name: "Blend", desc: "Undercollateralized lending pools", logo: "B" },
  { name: "Blockroll", desc: "Payroll signal ingestion", logo: "Br" },
  { name: "Sava", desc: "Savings behavior signals", logo: "Sv" },
  { name: "Fiatsend", desc: "Remittance flow signals", logo: "F" },
  { name: "VANK", desc: "Cross-border payment signals", logo: "V" },
];

export default function Integrations() {
  return (
    <section className="bg-white py-28 px-6" id="integrations">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            Integrations
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Built into the Stellar ecosystem
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-base">
            CreditRails plugs into the protocols where financial activity
            already happens — no new behavior required from users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {integrations.map((i) => (
            <div
              key={i.name}
              className="rounded-3xl border border-gray-100 bg-white/50 backdrop-blur-sm p-6 flex items-center gap-4 hover:border-[#D7D2FF] transition-colors"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#F4F3FF] flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#998DFF]">{i.logo}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{i.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{i.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
