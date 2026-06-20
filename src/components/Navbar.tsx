"use client";

import { useState } from "react";

const navLinks = [
  { label: "Protocol", href: "#protocol" },
  { label: "Developers", href: "#developers" },
  { label: "Integrations", href: "#integrations" },
  { label: "Governance", href: "#governance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-[#998DFF] flex items-center justify-center shadow-sm shadow-[#998DFF]/40">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {/* Two rails converging upward */}
            <path d="M4 15L9 3L14 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Cross ties */}
            <path d="M6 11h6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M4.8 14h8.4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="font-semibold text-[15px] tracking-tight text-gray-900">CreditRails</span>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-7">
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="/docs"
          className="px-4 py-2 text-sm rounded-xl bg-[#F4F3FF] text-[#A398FF] font-medium hover:bg-[#ede9ff] transition-colors"
        >
          Documentation
        </a>
        <a
          href="/app"
          className="px-4 py-2 text-sm rounded-xl bg-[#998DFF] text-white font-medium hover:bg-[#8a7ef0] transition-colors"
        >
          Launch App
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-gray-500"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <path d="M4 4l12 12M16 4L4 16" />
            </>
          ) : (
            <>
              <path d="M3 6h14M3 10h14M3 14h14" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-gray-600">
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="/docs" className="px-4 py-2 text-sm rounded-xl bg-[#F4F3FF] text-[#A398FF] font-medium">
              Documentation
            </a>
            <a href="/app" className="px-4 py-2 text-sm rounded-xl bg-[#998DFF] text-white font-medium">
              Launch App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
