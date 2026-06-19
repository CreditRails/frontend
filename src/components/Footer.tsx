const links = {
  Protocol: ["Overview", "Scoring Model", "Credentials", "API Reference"],
  Ecosystem: ["Stellar", "Blend", "Blockroll", "Sava"],
  Developers: ["Documentation", "SDK", "GitHub", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-5 md:px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#998DFF] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 15L9 3L14 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 11h6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M4.8 14h8.4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="font-semibold text-sm text-gray-900">CreditRails</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Portable on-chain credit infrastructure for the open economy.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-semibold text-gray-900 mb-3 md:mb-4 uppercase tracking-widest">
                {section}
              </p>
              <ul className="space-y-2 md:space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-14 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-300">© 2025 CreditRails. All rights reserved.</p>
          <p className="text-xs text-gray-300">
            Built on{" "}
            <span className="text-[#998DFF] font-medium">Stellar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
