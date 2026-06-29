"use client";

import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "authentication", label: "Authentication" },
  { id: "api", label: "API Reference" },
  { id: "errors", label: "Error Codes" },
  { id: "integrations", label: "Integrations" },
  { id: "credentials", label: "DID Credentials" },
  { id: "roadmap", label: "Roadmap" },
];

const endpoints = [
  {
    method: "GET",
    path: "/score/{wallet}",
    desc: "Returns credit score, risk tier, and loan eligibility for a Stellar wallet.",
    params: [
      { name: "wallet", in: "path", required: true, type: "string", desc: "Stellar public key (G…)" },
      { name: "include_factors", in: "query", required: false, type: "boolean", desc: "Include factor breakdown in response (default: false)" },
    ],
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
    "account_age": 71,
    "credit_diversity": 64,
    "recent_inquiries": 90
  },
  "updated_at": "2026-06-19T12:44:01Z"
}`,
  },
  {
    method: "GET",
    path: "/credential/{wallet}",
    desc: "Returns the latest W3C Verifiable Credential for a wallet.",
    params: [
      { name: "wallet", in: "path", required: true, type: "string", desc: "Stellar public key (G…)" },
      { name: "format", in: "query", required: false, type: "string", desc: "Response format: json (default) or jwt" },
    ],
    response: `{
  "credential_id": "cred-stellar-742-20260619",
  "type": "CreditScoreCredential",
  "issuer": "did:creditrails:protocol",
  "issued_at": "2026-06-19T00:00:00Z",
  "expires_at": "2027-06-19T00:00:00Z",
  "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
}`,
  },
  {
    method: "POST",
    path: "/verify",
    desc: "Verifies a user-submitted credential without contacting the original wallet.",
    params: [
      { name: "jwt", in: "body", required: true, type: "string", desc: "Signed JWT credential string" },
      { name: "check_expiry", in: "body", required: false, type: "boolean", desc: "Reject expired credentials (default: true)" },
    ],
    response: `{
  "valid": true,
  "score": 742,
  "risk_tier": "B",
  "loan_eligible": true,
  "issuer_verified": true,
  "expires_at": "2027-06-19T00:00:00Z"
}`,
  },
  {
    method: "GET",
    path: "/history/{wallet}",
    desc: "Returns a 12-month credit score time series for charting and trend analysis.",
    params: [
      { name: "wallet", in: "path", required: true, type: "string", desc: "Stellar public key (G…)" },
      { name: "months", in: "query", required: false, type: "number", desc: "Number of months to return (1–24, default: 12)" },
    ],
    response: `{
  "wallet": "GBZXFMN7AJ4K9PQRST...",
  "history": [
    { "month": "2025-07", "score": 680 },
    { "month": "2025-08", "score": 690 },
    { "month": "2026-06", "score": 742 }
  ]
}`,
  },
];

const errorCodes = [
  { code: 400, name: "bad_request", desc: "Missing or malformed request parameters." },
  { code: 401, name: "unauthorized", desc: "API key is missing or invalid." },
  { code: 403, name: "forbidden", desc: "API key does not have access to this resource." },
  { code: 404, name: "wallet_not_found", desc: "The Stellar wallet has no indexed history yet." },
  { code: 409, name: "credential_expired", desc: "The submitted credential has passed its expiration date." },
  { code: 429, name: "rate_limit_exceeded", desc: "Too many requests. See rate limit headers for reset time." },
  { code: 500, name: "internal_error", desc: "Unexpected server error. Contact support if this persists." },
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
        className="absolute top-2 right-2 px-2 py-1 rounded-md bg-gray-200 text-gray-700 text-[10px] hover:bg-gray-300 transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

const quickStartExamples = {
  cURL: `# Get a credit score
curl -H "Authorization: Bearer sk_live_..." \\
  https://api.creditrails.xyz/v1/score/GBZXFMN7AJ4K9PQRST...

# Verify a credential
curl -X POST \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"jwt": "eyJhbGciOiJFZERTQSIs..."}' \\
  https://api.creditrails.xyz/v1/verify`,
  JavaScript: `import { CreditRailsSDK } from '@creditrails/sdk';

const cr = new CreditRailsSDK({ apiKey: 'sk_live_...' });

// Get score
const profile = await cr.score.get('GBZXFMN7AJ4K9PQRST...');
console.log(profile.score); // 742

// Verify a credential
const result = await cr.credentials.verify(jwt);
console.log(result.valid); // true`,
  Python: `from creditrails import CreditRailsSDK

cr = CreditRailsSDK(api_key="sk_live_...")

# Get score
profile = cr.score.get("GBZXFMN7AJ4K9PQRST...")
print(profile["score"])  # 742

# Verify a credential
result = cr.credentials.verify(jwt=jwt_string)
print(result["valid"])  # True`,
};

function MultiCodeBlock({ examples }: { examples: Record<string, string> }) {
  const langs = Object.keys(examples);
  const [active, setActive] = useState(langs[0]);
  return (
    <div>
      <div className="flex gap-1 mb-2">
        {langs.map((lang) => (
          <button
            key={lang}
            onClick={() => setActive(lang)}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              active === lang ? "bg-[#998DFF] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <CodeBlock code={examples[active]} />
    </div>
  );
}

function ParamsTable({ params }: { params: typeof endpoints[0]["params"] }) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden text-xs">
      <div className="grid grid-cols-[100px_60px_60px_1fr] bg-gray-50 border-b border-gray-100 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-600">
        <span>Name</span>
        <span>In</span>
        <span>Type</span>
        <span>Description</span>
      </div>
      {params.map((p) => (
        <div key={p.name} className="grid grid-cols-[100px_60px_60px_1fr] px-4 py-2.5 border-b border-gray-50 last:border-0 items-start">
          <span className="font-mono text-[#998DFF] font-semibold">{p.name}{p.required && <span className="text-red-400">*</span>}</span>
          <span className="text-gray-600">{p.in}</span>
          <span className="text-gray-600">{p.type}</span>
          <span className="text-gray-700">{p.desc}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ type, children }: { type: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: "bg-[#F4F3FF] border-[#D7D2FF] text-[#7a6ee0]",
    warning: "bg-amber-50 border-amber-200 text-amber-700",
    tip: "bg-green-50 border-green-200 text-green-700",
  };
  const labels = { info: "Note", warning: "Warning", tip: "Tip" };
  return (
    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${styles[type]}`}>
      <span className="font-bold mr-1">{labels[type]}:</span>
      {children}
    </div>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className={`${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40 h-full md:h-auto flex flex-col w-56 shrink-0 border-r border-gray-100 pt-8 pb-8 md:sticky md:top-0 md:h-screen bg-white transition-transform duration-200`}>
        <a href="/" className="flex items-center gap-2 px-6 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/creditrails-logo.png" alt="CreditRails" className="w-8 h-8 rounded-xl flex-shrink-0" />
          <span className="font-extrabold text-sm text-gray-900">CreditRails</span>
        </a>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 flex-shrink-0"><circle cx="5" cy="5" r="4"/><path d="M9 9l2.5 2.5" strokeLinecap="round"/></svg>
            <input
              placeholder="Search docs..."
              className="bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none flex-1 w-full"
              readOnly
            />
            <kbd className="text-[9px] text-gray-300 border border-gray-200 rounded px-1">⌘K</kbd>
          </div>
        </div>

        <p className="px-6 text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-2">Docs</p>
        <nav className="px-3 space-y-0.5 flex-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActive(s.id); setMobileNavOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                active === s.id
                  ? "bg-[#F4F3FF] text-[#998DFF] font-medium"
                  : "text-gray-700 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 px-4">
          <a
            href="/app"
            className="block w-full text-center px-3 py-2 rounded-xl bg-[#998DFF] text-white text-xs font-semibold hover:bg-[#8a7ef0] transition-colors"
          >
            Launch Dashboard →
          </a>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 mb-6 md:hidden">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 4h12M2 8h12M2 12h12"/></svg>
          </button>
          <span className="text-sm font-semibold text-gray-700">
            {sections.find((s) => s.id === active)?.label}
          </span>
        </div>

        {/* ── Overview ── */}
        {active === "overview" && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#998DFF]">Documentation</span>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What is CreditRails?</h1>
              <p className="mt-4 text-gray-700 text-base leading-relaxed">
                CreditRails reads on-chain Stellar financial activity and converts it into a verifiable credit profile — one users carry across every application, without exposing raw transaction history.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Portable", desc: "Score lives in a user-owned W3C Verifiable Credential, not locked in a database" },
                { title: "User-controlled", desc: "Credential lives in the user's wallet — they present it, revoke it, and own it" },
                { title: "Real-time", desc: "Every confirmed Stellar ledger event can update the credit score in 4.2s" },
                { title: "Verifiable", desc: "Any party can verify a credential without contacting CreditRails servers" },
              ].map((card) => (
                <div key={card.title} className="p-5 rounded-2xl border border-gray-100 bg-[#F6F7F4]">
                  <p className="font-semibold text-gray-900 text-sm">{card.title}</p>
                  <p className="mt-1 text-xs text-gray-700 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Start</h2>
              <MultiCodeBlock examples={quickStartExamples} />
            </div>

            <Callout type="info">
              All API responses are JSON. Dates follow ISO 8601. Amounts are in their native asset denomination unless otherwise noted.
            </Callout>
          </div>
        )}

        {/* ── How It Works ── */}
        {active === "how-it-works" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">How It Works</h1>
              <p className="mt-3 text-gray-700">Five steps from wallet to verified credit credential.</p>
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
                  <span className="text-2xl font-black text-[#E8E4FF] font-mono leading-none mt-0.5 flex-shrink-0">{step.n}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                    <p className="mt-1 text-xs text-gray-700 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scoring model weights */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Scoring Model Weights</h2>
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                {[
                  { factor: "Payment History", weight: 35, desc: "On-time repayments, missed payments, late fees" },
                  { factor: "Transaction Volume", weight: 25, desc: "Frequency and size of transactions over time" },
                  { factor: "Account Age", weight: 20, desc: "Age of the wallet and oldest activity" },
                  { factor: "Credit Diversity", weight: 12, desc: "Mix of payments, savings, swaps, loans" },
                  { factor: "Recent Inquiries", weight: 8, desc: "New lending activity in the last 90 days" },
                ].map((row) => (
                  <div key={row.factor} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 last:border-0">
                    <span className="w-28 text-xs font-semibold text-gray-700">{row.factor}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#998DFF] rounded-full" style={{ width: `${row.weight * 2.5}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#998DFF] w-8 text-right">{row.weight}%</span>
                    <span className="text-xs text-gray-600 hidden md:block flex-1">{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Authentication ── */}
        {active === "authentication" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Authentication</h1>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                CreditRails uses API keys for all requests. Keys are scoped to your project and can be rotated at any time from the dashboard.
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Using your API key</h2>
              <p className="text-sm text-gray-700 mb-3">Pass the key as a Bearer token in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header on every request.</p>
              <CodeBlock code={`Authorization: Bearer sk_live_EXAMPLE_KEY_REDACTED`} />
            </div>

            <Callout type="warning">
              Never expose your API key in client-side code or version control. Use environment variables and call the API from your backend.
            </Callout>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Key types</h2>
              <div className="space-y-3">
                {[
                  { prefix: "sk_live_", label: "Live key", desc: "Reads live Stellar mainnet data. Billed usage." },
                  { prefix: "sk_test_", label: "Test key", desc: "Reads testnet data. Always free, never billed." },
                ].map((k) => (
                  <div key={k.prefix} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                    <code className="text-xs font-mono text-[#998DFF] bg-[#F4F3FF] px-2 py-1 rounded whitespace-nowrap">{k.prefix}…</code>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{k.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{k.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Rate limits</h2>
              <div className="p-5 rounded-2xl bg-[#F4F3FF] border border-[#E0DBFF]">
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  {[["Free", "10 req/min", "$0"], ["Developer", "100 req/min", "$49/mo"], ["Enterprise", "Unlimited", "Custom"]].map(([plan, rate, price]) => (
                    <div key={plan} className="bg-white rounded-xl p-3">
                      <p className="font-bold text-gray-900">{plan}</p>
                      <p className="text-gray-600 mt-0.5">{rate}</p>
                      <p className="text-[#998DFF] font-semibold mt-0.5">{price}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#7a6ee0] mt-3">Rate limit headers: <code className="font-mono">X-RateLimit-Limit</code>, <code className="font-mono">X-RateLimit-Remaining</code>, <code className="font-mono">X-RateLimit-Reset</code></p>
              </div>
            </div>
          </div>
        )}

        {/* ── API Reference ── */}
        {active === "api" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">API Reference</h1>
              <p className="mt-2 text-gray-700 text-sm">Base URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">https://api.creditrails.xyz/v1</code></p>
              <p className="mt-1 text-gray-700 text-sm">Auth: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Authorization: Bearer &lt;api_key&gt;</code></p>
            </div>

            {endpoints.map((ep) => (
              <div key={ep.path} className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-100">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${ep.method === "GET" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono font-semibold text-gray-800">{ep.path}</code>
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-sm text-gray-700">{ep.desc}</p>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Parameters</p>
                    <ParamsTable params={ep.params} />
                    <p className="text-[10px] text-gray-600 mt-1"><span className="text-red-400">*</span> required</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Response</p>
                    <CodeBlock code={ep.response} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error Codes ── */}
        {active === "errors" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Error Codes</h1>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                All errors return a JSON body with a <code className="bg-gray-100 px-1 rounded text-xs font-mono">code</code> and <code className="bg-gray-100 px-1 rounded text-xs font-mono">message</code> field.
              </p>
            </div>

            <CodeBlock code={`// Example error response
{
  "error": {
    "code": "wallet_not_found",
    "message": "No indexed history found for this wallet address.",
    "status": 404
  }
}`} />

            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-[64px_180px_1fr] bg-gray-50 border-b border-gray-100 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                <span>Status</span>
                <span>Code</span>
                <span>Description</span>
              </div>
              {errorCodes.map((e) => (
                <div key={e.code} className="grid grid-cols-[64px_180px_1fr] px-5 py-3.5 border-b border-gray-50 last:border-0 items-start text-sm">
                  <span className={`font-bold font-mono text-xs ${e.code < 500 ? "text-amber-500" : "text-red-500"}`}>{e.code}</span>
                  <code className="text-xs font-mono text-[#998DFF]">{e.name}</code>
                  <span className="text-xs text-gray-700">{e.desc}</span>
                </div>
              ))}
            </div>

            <Callout type="tip">
              On <code className="font-mono text-xs">429</code> responses, back off and retry after the <code className="font-mono text-xs">X-RateLimit-Reset</code> timestamp. Use exponential backoff for transient <code className="font-mono text-xs">500</code> errors.
            </Callout>
          </div>
        )}

        {/* ── Integrations ── */}
        {active === "integrations" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Integrations</h1>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
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
                        i.status === "Live" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}>{i.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">{i.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Submit a custom signal</h2>
              <p className="text-xs text-gray-700 mb-3">Any app can push financial events to CreditRails for inclusion in the scoring model.</p>
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

            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Supported signal types</h2>
              <div className="rounded-xl border border-gray-100 overflow-hidden text-xs">
                {[
                  { type: "payroll_deposit", desc: "Regular employment income deposit" },
                  { type: "savings_deposit", desc: "Deposit to a savings or staking account" },
                  { type: "loan_repayment", desc: "Repayment of a loan principal or interest" },
                  { type: "remittance_inflow", desc: "Cross-border remittance received" },
                  { type: "swap", desc: "Asset swap / exchange" },
                ].map((s) => (
                  <div key={s.type} className="flex items-center gap-4 px-4 py-3 border-b border-gray-50 last:border-0">
                    <code className="text-[#998DFF] font-mono font-semibold w-44">{s.type}</code>
                    <span className="text-gray-700">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DID Credentials ── */}
        {active === "credentials" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">DID Credentials</h1>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
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

              <h2 className="text-base font-bold text-gray-900">Credential Types</h2>
              <div className="space-y-3">
                {[
                  { type: "CreditScoreCredential", desc: "Contains the current score, risk tier, and loan eligibility. Refreshed on each scoring cycle.", issuer: "CreditRails Protocol" },
                  { type: "StellarIdentityCredential", desc: "Binds a Stellar public key to a W3C DID. Issued once per wallet.", issuer: "CreditRails Protocol" },
                  { type: "LoanEligibilityCredential", desc: "Attests eligibility for a specific lender's loan product. Issued by the lender.", issuer: "Lending partner (e.g. Blend)" },
                ].map((c) => (
                  <div key={c.type} className="p-4 rounded-xl border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{c.type}</p>
                    <p className="text-xs text-gray-600 mt-0.5">Issued by <span className="text-[#998DFF] font-medium">{c.issuer}</span></p>
                    <p className="text-xs text-gray-700 mt-1">{c.desc}</p>
                  </div>
                ))}
              </div>

              <Callout type="info">
                Credentials are verifiable by any party using the CreditRails public DID document — no round-trip to our servers required.
              </Callout>
            </div>
          </div>
        )}

        {/* ── Roadmap ── */}
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "done" ? "bg-green-200 text-green-800" : p.status === "active" ? "bg-[#998DFF] text-white" : "bg-gray-100 text-gray-600"}`}>
                      {p.status === "done" ? "Complete" : p.status === "active" ? "In Progress" : "Planned"}
                    </span>
                    <span className="text-[11px] text-gray-600 font-mono">{p.phase}</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-2">{p.title}</p>
                  <ul className="space-y-1">
                    {p.items.map((item) => (
                      <li key={item} className="text-xs text-gray-700 flex items-center gap-1.5">
                        <span className={p.status === "done" ? "text-green-500" : p.status === "active" ? "text-[#998DFF]" : "text-gray-300"}>
                          {p.status === "done" ? "✓" : p.status === "active" ? "◆" : "○"}
                        </span>
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
