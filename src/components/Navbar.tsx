"use client";

import { useState } from "react";

const navLinks = [
  { label: "Protocol", href: "#protocol" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {/* Logo */}
      <a href="/" className="flex items-center gap-3 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/creditrails-logo.png" alt="CreditRails" className="w-11 h-11 rounded-2xl flex-shrink-0 transition-all duration-200 group-hover:scale-105" />
        <span className="font-extrabold text-[17px] tracking-tight text-gray-900 group-hover:text-[#998DFF] transition-colors duration-200">
          CreditRails
        </span>
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
          href="/app"
          className="px-4 py-2 text-sm rounded-xl bg-[#998DFF] text-white font-medium hover:bg-[#8a7ef0] transition-colors shadow-sm shadow-[#998DFF]/30"
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
            <a href="/app" className="px-4 py-2 text-sm rounded-xl bg-[#998DFF] text-white font-medium">
              Launch App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
