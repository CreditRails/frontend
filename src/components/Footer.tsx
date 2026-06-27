const links = {
  Protocol: [
    { label: "Overview", href: "#protocol" },
    { label: "Scoring Model", href: "#protocol" },
    { label: "Credentials", href: "#protocol" },
    { label: "API Reference", href: "/docs" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "SDK", href: "/docs" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-5 md:px-6 pt-14 md:pt-20 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4 group">
              <span
                className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-md shadow-[#998DFF]/30 transition-all group-hover:shadow-[#998DFF]/50"
                style={{ background: "linear-gradient(150deg, #c4bcff 0%, #998DFF 45%, #6148d0 100%)" }}
              >
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <path d="M8 29L13.5 4" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M24 29L18.5 4" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M9.5 25L22.5 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 16.5L20 16.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
                  <path d="M14 9L18 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
                </svg>
              </span>
              <span className="font-extrabold text-[15px] tracking-tight text-gray-900 group-hover:text-[#998DFF] transition-colors">
                CreditRails
              </span>
            </a>
            <p className="text-xs text-gray-400 leading-relaxed mb-5 max-w-[200px]">
              Portable on-chain credit infrastructure for the open economy.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-[11px] font-semibold text-gray-900 mb-4 uppercase tracking-widest">
                {section}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs text-gray-400 hover:text-[#998DFF] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-900">© 2026 CreditRails. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-900 hover:text-[#998DFF] transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-900 hover:text-[#998DFF] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
