"use client";

import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "api", label: "API Reference" },
  { id: "integrations", label: "Integrations" },
  { id: "credentials", label: "DID Credentials" },
  { id: "roadmap", label: "Roadmap" },
];

const endpoints = [
  {
    method: "GET",
    path: "/score/{wallet}",
    desc: "Returns credit score, risk tier, and loan eligibility for a Stellar wallet.",
    response: `{
  "wallet": "GBZXFMN7AJ4K9PQRST...",
  "score": 742,
  "risk_tier": "B",
  "loan_eligible": true,
  "max_loan_usdc": 12500,
  "percentile": 81,
  "factors": {
    "payment_history": 96,
    "transaction_volume": 82,
    "account_age": 71
  }
}`,
  },
  {
    method: "GET",
    path: "/credential/{wallet}",
    desc: "Returns the latest W3C Verifiable Credential for a wallet.",
    response: `{
  "credential_id": "cred-stellar-742-20260619",
  "type": "CreditScoreCredential",
  "issuer": "did:creditrails:protocol",
  "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
}`,
  },
  {
    method: "POST",
    path: "/verify",
    desc: "Verifies a user-submitted credential without contacting the original wallet.",
    response: `{
  "valid": true,
  "score": 742,
  "risk_tier": "B",
  "loan_eligible": true,
  "issuer_verified": true
}`,
  },
];

const integrations = [
  { name: "Stellar", status: "Live", desc: "Full ledger history via Horizon API — payments, swaps, deposits" },
  { name: "Blend", status: "Live", desc: "Loan repayment signals from undercollateralized lending pools" },
  { name: "Bitso", status: "Planned", desc: "LATAM exchange — payroll deposit and savings signals" },
  { name: "Sava", status: "Planned", desc: "Savings account growth and consistency signals" },
  { name: "Fiatsend", status: "Planned", desc: "Recurring remittance inflow signals" },
  { name: "MoneyGram", status: "Planned", desc: "Cross-border remittance flow signals via Stellar" },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="bg-[#F6F7F4] text-gray-700 rounded-xl p-4 text-xs leading-relaxed overflow-x-auto font-mono border border-gray-200">
        {code}
      </pre>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="absolute top-2 right-2 px-2 py-1 rounded-md bg-gray-200 text-gray-500 text-[10px] hover:bg-gray-300 transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState("overview");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-gray-100 pt-8 pb-8 sticky top-0 h-screen">
        <a href="/" className="flex items-center gap-2 px-6 mb-8">
          <span className="w-7 h-7 rounded-lg bg-[#998DFF] flex items-center justify-center shadow-sm shadow-[#998DFF]/40">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M4 15L9 3L14 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 11h6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M4.8 14h8.4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-semibold text-sm text-gray-900">CreditRails</span>
        </a>

        <p className="px-6 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Docs</p>
        <nav className="px-3 space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                active === s.id
                  ? "bg-[#F4F3FF] text-[#998DFF] font-medium"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto px-6">
          <a
            href="/app"
            className="block w-full text-center px-3 py-2 rounded-xl bg-[#998DFF] text-white text-xs font-semibold hover:bg-[#8a7ef0] transition-colors"
          >
            Launch Dashboard →
          </a>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 md:px-12 py-12">
        {/* Overview */}
        {active === "overview" && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">Documentation</span>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What is CreditRails?</h1>
              <p className="mt-4 text-gray-500 text-base leading-relaxed">
                CreditRails reads on-chain Stellar financial activity and converts it into a verifiable credit profile — one users carry across every application, without exposing raw transaction history.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Portable", desc: "Score lives in a user-owned W3C Verifiable Credential, not locked in a database" },
                { title: "Privacy-preserving", desc: "Lenders see the score + tier, never the underlying transactions" },
                { title: "Real-time", desc: "Every confirmed Stellar ledger event can update the credit score in 4.2s" },
                { title: "Verifiable", desc: "Any party can verify a credential without contacting CreditRails servers" },
              ].map((card) => (
                <div key={card.title} className="p-5 rounded-2xl border border-gray-100 bg-[#F6F7F4]">
                  <p className="font-semibold text-gray-900 text-sm">{card.title}</p>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Start</h2>
              <CodeBlock code={`# Get a credit score
curl -H "Authorization: Bearer sk_live_..." \\
  https://api.creditrails.xyz/v1/score/GBZXFMN7AJ4K9PQRST...

# Verify a credential
curl -X POST \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"jwt": "eyJhbGciOiJFZERTQSIs..."}' \\
  https://api.creditrails.xyz/v1/verify`} />
            </div>
          </div>
        )}

        {/* How It Works */}
        {active === "how-it-works" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">How It Works</h1>
              <p className="mt-3 text-gray-500">Five steps from wallet to verified credit credential.</p>
            </div>
            <div className="space-y-4">
              {[
                { n: "01", title: "Connect Wallet", desc: "User connects their Stellar wallet. No personal data required — the wallet address is the identity." },
                { n: "02", title: "Index Transactions", desc: "The CreditRails indexer reads full ledger history via Stellar Horizon API — payments, savings, payroll, remittances, loan repayments." },
                { n: "03", title: "Score Computation", desc: "A weighted behavioral model scores the history across 5 factors: payment history, transaction volume, account age, credit diversity, and recent inquiries." },
                { n: "04", title: "Issue Credential", desc: "A signed W3C Verifiable Credential is issued to the user's DID. It contains the score and eligibility — not raw data." },
                { n: "05", title: "Share with Lenders", desc: "The user presents their credential to any lender. The lender calls /verify to confirm authenticity. CreditRails is not in the loop for every transaction." },
              ].map((step) => (
                <div key={step.n} className="flex gap-5 p-5 rounded-2xl border border-gray-100 hover:border-[#D7D2FF] transition-colors">
                  <span className="text-2xl font-black text-[#E8E4FF] font-mono leading-none mt-0.5">{step.n}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Reference */}
        {active === "api" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">API Reference</h1>
              <p className="mt-2 text-gray-500 text-sm">Base URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">https://api.creditrails.xyz/v1</code></p>
              <p className="mt-1 text-gray-500 text-sm">Auth: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Authorization: Bearer &lt;api_key&gt;</code></p>
            </div>
            {endpoints.map((ep) => (
              <div key={ep.path} className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-100">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${ep.method === "GET" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono font-semibold text-gray-800">{ep.path}</code>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-sm text-gray-500">{ep.desc}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Response</p>
                  <CodeBlock code={ep.response} />
                </div>
              </div>
            ))}
            <div className="p-5 rounded-2xl bg-[#F4F3FF] border border-[#E0DBFF]">
              <p className="text-xs font-semibold text-[#7a6ee0] mb-2">Rate Limits</p>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                {[["Free", "10 req/min", "$0"], ["Developer", "100 req/min", "$49/mo"], ["Enterprise", "Unlimited", "Custom"]].map(([plan, rate, price]) => (
                  <div key={plan} className="bg-white rounded-xl p-3">
                    <p className="font-bold text-gray-900">{plan}</p>
                    <p className="text-gray-400 mt-0.5">{rate}</p>
                    <p className="text-[#998DFF] font-semibold mt-0.5">{price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Integrations */}
        {active === "integrations" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Integrations</h1>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                CreditRails ingests financial signals from Stellar-native apps. Each integration adds a weighted signal to the scoring model.
              </p>
            </div>
            <div className="space-y-3">
              {integrations.map((i) => (
                <div key={i.name} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#D7D2FF] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{i.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        i.status === "Live" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>{i.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{i.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50">
              <p className="text-sm font-semibold text-gray-900 mb-2">Add your app as a signal source</p>
              <CodeBlock code={`import { CreditRailsSDK } from '@creditrails/sdk';

const cr = new CreditRailsSDK({ apiKey: 'sk_live_...' });

await cr.signals.submit({
  wallet: 'GBZX...4K9P',
  type: 'payroll_deposit',
  amount_usdc: 1200,
  timestamp: new Date().toISOString(),
  source: 'your-app-id',
});`} />
            </div>
          </div>
        )}

        {/* Credentials */}
        {active === "credentials" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">DID Credentials</h1>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                CreditRails issues W3C Verifiable Credentials (VCs) tied to Stellar wallet DIDs. Users own and control their credentials.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-900">Credential Structure</h2>
              <CodeBlock code={`{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://creditrails.xyz/context/v1"
  ],
  "type": ["VerifiableCredential", "CreditScoreCredential"],
  "issuer": "did:creditrails:protocol",
  "issuanceDate": "2026-06-19T00:00:00Z",
  "expirationDate": "2027-06-19T00:00:00Z",
  "credentialSubject": {
    "id": "did:stellar:GBZXFMN7AJ4K9PQRST...",
    "creditScore": 742,
    "riskTier": "B",
    "loanEligible": true,
    "maxLoanUsdc": 12500
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "verificationMethod": "did:creditrails:protocol#key-1",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..."
  }
}`} />
              <div className="p-4 rounded-xl bg-[#F4F3FF] border border-[#E0DBFF] text-xs text-[#7a6ee0]">
                Credentials are verifiable by any party using the CreditRails public DID document — no round-trip to our servers required.
              </div>
            </div>
          </div>
        )}

        {/* Roadmap */}
        {active === "roadmap" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Roadmap</h1>
            <div className="space-y-3">
              {[
                { phase: "Phase 1", title: "Scoring Foundation", status: "done", items: ["Stellar Horizon indexer on testnet", "Behavioral scoring engine (300–850)", "Credit score dashboard", "Internal REST API"] },
                { phase: "Phase 2", title: "Credential Issuance", status: "active", items: ["W3C DID credential issuance", "User credential dashboard", "Lender verification endpoint", "Share credential flow"] },
                { phase: "Phase 3", title: "Blend Integration", status: "planned", items: ["Risk API → Blend lending pools", "Undercollateralized loan flow", "Dynamic loan terms by score tier"] },
                { phase: "Phase 4", title: "Signal Expansion", status: "planned", items: ["Blockroll payroll signals", "Sava savings signals", "Fiatsend + VANK remittance signals", "Updated scoring weights"] },
                { phase: "Phase 5", title: "Mainnet + SDK", status: "planned", items: ["Indexer + scoring on mainnet", "Open-source SDK for integrations", "First live loan originations"] },
              ].map((p) => (
                <div key={p.phase} className={`p-5 rounded-2xl border ${p.status === "done" ? "border-green-200 bg-green-50" : p.status === "active" ? "border-[#D7D2FF] bg-[#F4F3FF]" : "border-gray-100"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "done" ? "bg-green-200 text-green-800" : p.status === "active" ? "bg-[#998DFF] text-white" : "bg-gray-100 text-gray-400"}`}>
                      {p.status === "done" ? "✓ Complete" : p.status === "active" ? "In Progress" : "Planned"}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">{p.phase}</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-2">{p.title}</p>
                  <ul className="space-y-1">
                    {p.items.map((item) => (
                      <li key={item} className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className={p.status === "done" ? "text-green-500" : "text-gray-300"}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
