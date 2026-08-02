"use client";

import { useState, type FormEvent } from "react";

/**
 * The demo's booking form. Looks and behaves like the real thing —
 * validation, loading state, animated confirmation — but sends
 * nothing anywhere, and says so under the button. In a demo shown to
 * a prospect, a form that PRETENDED to send would be a lie about
 * their customers' messages; one that visibly works and honestly says
 * "disabled in the demo" sells the same thing without the lie.
 */
export default function BookForm({
  services,
  accent,
}: {
  services: string[];
  accent: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    /* Simulated round-trip so the prospect sees the full flow. */
    setTimeout(() => setStatus("done"), 900);
  }

  if (status === "done") {
    return (
      <div
        className="demo-page-enter rounded-xl border-2 p-8 text-center"
        style={{ borderColor: accent }}
        role="status"
      >
        <svg viewBox="0 0 24 24" className="mx-auto size-12" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m4 12.5 5 5L20 6.5" />
        </svg>
        <p className="mt-4 text-2xl font-semibold">Request sent</p>
        <p className="mt-2 text-white/60">
          On the real site, this lands straight in the shop&rsquo;s phone and
          they text you back to confirm.
        </p>
        <p className="mt-4 text-sm text-white/40">
          (Demo — nothing was actually sent.)
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold"
          style={{ color: accent }}
        >
          Try it again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/80">Your name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base outline-none transition-colors focus:border-[var(--accent)]"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/80">Phone</span>
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base outline-none transition-colors focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/80">What are you after?</span>
          <select
            name="service"
            className="w-full cursor-pointer rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base outline-none transition-colors focus:border-[var(--accent)] [&>option]:bg-[#101114]"
          >
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-white/80">When suits?</span>
          <input
            name="when"
            placeholder="e.g. Saturday morning"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base outline-none transition-colors placeholder:text-white/30 focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full px-7 text-base font-bold text-black transition-opacity hover:opacity-85 disabled:opacity-60 sm:w-auto"
        style={{ background: accent }}
      >
        {status === "sending" ? "Sending…" : "Request a slot"}
      </button>

      <p className="text-sm text-white/40">
        Demo form — submissions are disabled. On the real site this goes
        straight to the shop&rsquo;s phone.
      </p>
    </form>
  );
}
