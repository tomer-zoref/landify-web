"use client";

import type { FormEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const year = useMemo(() => new Date().getFullYear(), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!email) {
      setErrorMsg("Please enter a valid email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("leads").insert([
      {
        name: name || null,
        email,
        company: company || null,
        message: message || null,
      },
    ]);

    if (error) {
      setErrorMsg("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    formRef.current?.reset();
  }

  return (
    <main className="min-h-screen bg-[var(--sand)] text-[var(--sage)]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-black/5 bg-[var(--sand)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Landify home">
            <img src="/landify-mark.svg" alt="Landify" className="h-9 w-9" />
            <img
              src="/landify-logo.svg"
              alt="Landify"
              className="hidden h-5 sm:block"
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Main navigation">
            <a className="navlink" href="#problem">Problem</a>
            <a className="navlink" href="#how">How it works</a>
            <a className="navlink" href="#insights">Data & insights</a>
            <a className="navlink" href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="btn-primary">
            Get early access
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/35 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
              Your AI Broker for Land Search & Acquisition
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Finding land deals faster — with data, not guesswork.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:rgba(89,108,104,0.85)]">
              Landify helps you identify off-market opportunities using public signals,
              smart enrichment, and AI-driven prioritization — so you spend time on the
              right parcels.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary px-5 py-3">
                Join the waitlist
              </a>
              <a href="#how" className="btn-secondary px-5 py-3">
                See how it works
              </a>
            </div>

            <p className="mt-3 text-xs text-[color:rgba(89,108,104,0.75)]">
              Early access • No spam • Product updates only
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              <div className="metric-card">
                <p className="metric-k">Discover</p>
                <p className="metric-v">Signals</p>
              </div>
              <div className="metric-card">
                <p className="metric-k">Enrich</p>
                <p className="metric-v">Context</p>
              </div>
              <div className="metric-card">
                <p className="metric-k">Prioritize</p>
                <p className="metric-v">Leads</p>
              </div>
            </div>
          </div>

          {/* Right side card */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[color:rgba(89,108,104,0.75)]">Example</p>
              <span className="rounded-full border border-black/10 bg-white/60 px-2 py-1 text-xs">
                Austin, TX
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold">Ask in plain English</h3>

            <p className="mt-2 text-sm text-[color:rgba(89,108,104,0.85)]">
              “Show parcels likely to sell in 6–12 months, with large lots and low
              recent activity.”
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="mini-tile">
                <p className="mini-k">Ownership</p>
                <p className="mini-v">LLC / Trust</p>
              </div>
              <div className="mini-tile">
                <p className="mini-k">Activity</p>
                <p className="mini-v">Low</p>
              </div>
              <div className="mini-tile">
                <p className="mini-k">Score</p>
                <p className="mini-v">High</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4">
              <p className="text-xs font-medium text-[color:rgba(89,108,104,0.75)]">Output</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Prioritized parcels</span>
                  <span className="font-semibold">42</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Ready-to-contact owners</span>
                  <span className="font-semibold">18</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Notes + outreach pack</span>
                  <span className="font-semibold">Included</span>
                </li>
              </ul>
            </div>

            <p className="mt-4 text-xs text-[color:rgba(89,108,104,0.75)]">
              This is a preview mock — your real workflow will plug into data sources.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-7">
            <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:rgba(89,108,104,0.85)]">
              Off-market land discovery is fragmented: scattered public records, outdated
              lists, and endless manual research. The best deals get missed because
              prioritization is hard.
            </p>
          </div>

          <div className="card p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:rgba(89,108,104,0.75)]">
              What Landify changes
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="bullet"><span className="dot" />One place to explore parcels + signals</li>
              <li className="bullet"><span className="dot" />Consistent enrichment: owner, entity, risk flags</li>
              <li className="bullet"><span className="dot" />A clear ranking of “who to call first”</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-2 max-w-2xl text-sm text-[color:rgba(89,108,104,0.85)]">
              A simple pipeline: discover → enrich → prioritize → act.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-7">
            <p className="text-sm font-semibold">1) Discover</p>
            <p className="mt-2 text-sm text-[color:rgba(89,108,104,0.85)]">
              Aggregate public signals and parcel attributes into one clean view.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill">Assessor data</span>
              <span className="pill">Ownership</span>
              <span className="pill">Zoning</span>
            </div>
          </div>

          <div className="card p-7">
            <p className="text-sm font-semibold">2) Enrich</p>
            <p className="mt-2 text-sm text-[color:rgba(89,108,104,0.85)]">
              Add context: entity type, portfolio hints, and quality checks.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill">Entity graph</span>
              <span className="pill">Risk flags</span>
              <span className="pill">Context</span>
            </div>
          </div>

          <div className="card p-7">
            <p className="text-sm font-semibold">3) Act</p>
            <p className="mt-2 text-sm text-[color:rgba(89,108,104,0.85)]">
              Generate outreach lists, track outcomes, and iterate what works.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill">Lead list</span>
              <span className="pill">Notes</span>
              <span className="pill">CRM export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Insights */}
      <section id="insights" className="mx-auto max-w-6xl px-6 py-12">
        <div className="card p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Data & insights that feel explainable
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[color:rgba(89,108,104,0.85)]">
                Landify isn’t a “black box.” Every score is backed by signals you can
                understand — so you can defend decisions and refine strategies.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="mini-feature">
                  <p className="mini-feature-t">Transparent ranking</p>
                  <p className="mini-feature-d">See why a parcel is prioritized.</p>
                </div>
                <div className="mini-feature">
                  <p className="mini-feature-t">Quality checks</p>
                  <p className="mini-feature-d">Catch duplicates + bad records.</p>
                </div>
                <div className="mini-feature">
                  <p className="mini-feature-t">Saved searches</p>
                  <p className="mini-feature-d">Reusable filters for your market.</p>
                </div>
                <div className="mini-feature">
                  <p className="mini-feature-t">Exportable leads</p>
                  <p className="mini-feature-d">Hand off to your workflow.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
              <p className="text-xs font-medium text-[color:rgba(89,108,104,0.75)]">
                Example signals
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { k: "Time since last transaction", v: "High signal" },
                  { k: "Owner entity complexity", v: "Medium signal" },
                  { k: "Recent permit activity", v: "Low signal" },
                  { k: "Portfolio behavior", v: "High signal" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3"
                  >
                    <span className="text-sm">{row.k}</span>
                    <span className="text-sm font-semibold">{row.v}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-[color:rgba(89,108,104,0.75)]">
                These are examples — you’ll define what matters for your strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-14">
        <div className="card p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">Get early access</h2>
            <p className="max-w-2xl text-sm text-[color:rgba(89,108,104,0.85)]">
              Leave your email and we’ll reach out when the product is ready.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 grid gap-3 md:grid-cols-3"
          >
            <input className="input" placeholder="Full name" name="name" />
            <input className="input" placeholder="Work email*" name="email" required />
            <input className="input" placeholder="Company" name="company" />

            <textarea
              className="input md:col-span-3"
              placeholder="What are you looking for? (optional)"
              name="message"
              rows={4}
            />

            <button type="submit" disabled={loading} className="btn-primary md:col-span-3">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {success && <p className="mt-3 text-sm text-emerald-700">Thanks! We’ll be in touch soon.</p>}
          {errorMsg && <p className="mt-3 text-sm text-red-700">{errorMsg}</p>}

          <p className="mt-3 text-xs text-[color:rgba(89,108,104,0.75)]">
            We’ll only use this for product updates.
          </p>
        </div>
      </section>

      <footer className="border-t border-black/5 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-[color:rgba(89,108,104,0.75)]">
          <div className="flex items-center gap-2">
            <img src="/landify-mark.svg" alt="Landify" className="h-6 w-6" />
            <span>© {year} Landify. All rights reserved.</span>
          </div>

          <a className="navlink" href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}
