"use client";

import { WobbleCard } from "./ui/wobble-card";

export default function Integrations() {
  return (
    <section className="bg-white py-16 md:py-28 px-5 md:px-6" id="integrations">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 md:mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">
            Why CreditRails
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Credit that works for everyone
          </h2>
          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Portable, private, and built on open standards — your credit profile
            belongs to you, not a database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 min-h-[280px] lg:min-h-[260px]"
            style={{ background: "linear-gradient(135deg, #c4bcff 0%, #998DFF 60%, #7b6de0 100%)" }}
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                CreditRails powers on-chain credit across Stellar
              </h2>
              <p className="mt-4 text-left text-base/6 text-white/80">
                With one wallet connect, users get a portable credit score that
                works across every Stellar-native app — no forms, no bank statements.
              </p>
            </div>
          </WobbleCard>

          <WobbleCard
            containerClassName="col-span-1 min-h-[260px]"
            style={{ background: "linear-gradient(135deg, #998DFF 0%, #6148d0 100%)" }}
          >
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              User-owned credentials.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-white/80">
              Your W3C Verifiable Credential lives in your wallet — not in a database. Present it to any lender, on any app, without asking CreditRails.
            </p>
          </WobbleCard>

          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 min-h-[220px]"
            style={{ background: "linear-gradient(135deg, #7b6de0 0%, #6148d0 100%)" }}
          >
            <div className="max-w-sm">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Build credit-aware apps with the CreditRails SDK
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-white/80">
                One API call returns a score, risk tier, and W3C verifiable credential — ready for any Stellar lending or payments app.
              </p>
            </div>
            <a
              href="/docs"
              className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold hover:bg-white/30 transition-colors border border-white/20"
            >
              Read the docs →
            </a>
          </WobbleCard>
        </div>
      </div>
    </section>
  );
}
