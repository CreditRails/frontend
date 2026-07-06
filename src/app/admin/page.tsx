"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_URL ?? "http://localhost:4000";

interface Signals {
  txCount: number;
  accountAgeDays: number;
  txPerWeek: number;
  inflowUsd: number;
  outflowUsd: number;
  largeEvents: { kind: string; usd: number; at: string }[];
  distinctAssets: number;
  distinctCounterparties: number;
  recurringCounterpartyCount: number;
  hasRegularRecurrence: boolean;
}

interface Factors {
  paymentHistory: number;
  transactionVolume: number;
  accountAge: number;
  savingsTrend: number;
  remittanceRegularity: number;
  diversity: number;
}

interface ScoreResponse {
  wallet: string;
  signals: Signals;
  factors: Factors;
  score: number;
  tier: string;
  percentile: number;
  coldStart: boolean;
  txUrl?: string;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState<"fetch" | "commit" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreResponse | null>(null);

  async function call(path: string, method: "GET" | "POST") {
    setError(null);
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { "x-admin-token": token },
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body?.message ?? body?.error ?? `HTTP ${res.status}`);
    return body as ScoreResponse;
  }

  async function handleFetch() {
    setLoading("fetch");
    try {
      setResult(await call(`/api/score/${encodeURIComponent(wallet)}`, "GET"));
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    } finally {
      setLoading(null);
    }
  }

  async function handleCommit() {
    setLoading("commit");
    try {
      setResult(await call(`/api/score/${encodeURIComponent(wallet)}/commit`, "POST"));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-neutral-900">CreditRails Admin</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Score a wallet from real testnet Horizon history and optionally commit it to the{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5">credit_score</code> contract.
        </p>

        <div className="mt-8 space-y-4 rounded-xl border border-neutral-200 bg-white p-6">
          <div>
            <label className="block text-xs font-medium text-neutral-600">Admin token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="x-admin-token"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600">Wallet address</label>
            <input
              value={wallet}
              onChange={(e) => setWallet(e.target.value.trim())}
              placeholder="G..."
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm font-mono"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleFetch}
              disabled={!token || !wallet || loading !== null}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {loading === "fetch" ? "Fetching..." : "Fetch & score (dry run)"}
            </button>
            <button
              onClick={handleCommit}
              disabled={!token || !wallet || loading !== null || !result}
              className="rounded-lg bg-[#7C6AEF] px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {loading === "commit" ? "Committing..." : "Commit on-chain"}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-neutral-900">{result.score}</span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                  Tier {result.tier}
                </span>
                <span className="text-sm text-neutral-500">{result.percentile}th percentile</span>
                {result.coldStart && (
                  <span className="text-sm text-amber-600">cold start — insufficient history</span>
                )}
              </div>
              {result.txUrl && (
                <a
                  href={result.txUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-[#7C6AEF] underline"
                >
                  View commit transaction ↗
                </a>
              )}
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Factor breakdown</h2>
              <div className="mt-3 space-y-2">
                {Object.entries(result.factors).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="w-40 text-xs text-neutral-500">{name}</span>
                    <div className="h-2 flex-1 rounded-full bg-neutral-100">
                      <div
                        className="h-2 rounded-full bg-[#7C6AEF]"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs text-neutral-600">
                      {value.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Raw signals</h2>
              <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm sm:grid-cols-3">
                <Stat label="Tx count" value={result.signals.txCount} />
                <Stat label="Account age (days)" value={result.signals.accountAgeDays.toFixed(1)} />
                <Stat label="Tx / week" value={result.signals.txPerWeek.toFixed(2)} />
                <Stat label="Inflow (USD)" value={`$${result.signals.inflowUsd.toFixed(2)}`} />
                <Stat label="Outflow (USD)" value={`$${result.signals.outflowUsd.toFixed(2)}`} />
                <Stat label="Large events (≥$500)" value={result.signals.largeEvents.length} />
                <Stat label="Distinct assets" value={result.signals.distinctAssets} />
                <Stat label="Distinct counterparties" value={result.signals.distinctCounterparties} />
                <Stat
                  label="Recurring counterparties"
                  value={`${result.signals.recurringCounterpartyCount} (${result.signals.hasRegularRecurrence ? "regular" : "irregular"})`}
                />
              </dl>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs text-neutral-400">{label}</dt>
      <dd className="font-medium text-neutral-900">{value}</dd>
    </div>
  );
}
