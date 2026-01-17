"use client";

import { FormEvent, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  // ---------- State ----------
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // ---------- Submit handler ----------
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("leads").insert([
      { name, email, company, message },
    ]);

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    formRef.current?.reset();
  }

  // ---------- UI ----------
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-slate-900" />
            <span className="text-sm font-semibold tracking-tight">Landify</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#problem" className="hover:text-slate-900">Problem</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#case" className="hover:text-slate-900">Case study</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>

          <a
            href="#contact"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Get early access
          </a>
        </div>
      </header>

      {/* Case study */}
      <section id="case" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Case study</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          We’ll add a real example here: target market, filters used,
          number of prioritized parcels, and outcomes.
        </p>
      </section>

      {/* Contact / Form */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Get early access
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Leave your email and we’ll reach out when the product is ready.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 grid gap-3 md:grid-cols-3"
          >
            <input
              name="name"
              placeholder="Full name"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />

            <input
              name="email"
              placeholder="Work email*"
              required
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />

            <input
              name="company"
              placeholder="Company"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />

            <textarea
              name="message"
              rows={4}
              placeholder="What are you looking for? (optional)"
              className="md:col-span-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-3 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {success && (
            <p className="mt-3 text-sm text-green-600">
              Thanks! We’ll be in touch soon.
            </p>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Landify. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
