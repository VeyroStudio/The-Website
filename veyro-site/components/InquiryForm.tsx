"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { currentSituation, planInterest, tradeOptions, site } from "@/lib/site";
import { ArrowRight, Check, Spinner } from "./ui";

/**
 * Enquiry form.
 *
 * Posts to a form endpoint set via NEXT_PUBLIC_FORM_ENDPOINT (Web3Forms,
 * Formspree, or anything accepting a JSON POST). Until that is set the
 * form validates and says so plainly, rather than showing a success
 * state for a message nobody received.
 *
 * Kept deliberately short: a shop owner filling this in on a phone
 * between customers will abandon a long form. Name, contact, trade,
 * situation — everything else is optional.
 */

/* Web3Forms delivery, with the live values as defaults.
 *
 * These are public by design: NEXT_PUBLIC_* is compiled into the client
 * bundle, so the access key is readable in page source on any deployed
 * build. Committing it therefore changes nothing about who can see it.
 *
 * They are defaults rather than env-only because a build on a machine
 * without .env.local would otherwise ship a form that silently refuses
 * to send — which is exactly what happened on the first deploy. An env
 * var still wins if one is set, so staging can point somewhere else.
 *
 * The key routes to ethan@veyrostudio.co.uk. If it is ever abused,
 * generate a replacement at web3forms.com and change it here.
 *
 * `||` rather than `??` on purpose: an env var set to an empty string
 * must fall through to the default, not blank the form out.
 */
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://api.web3forms.com/submit";
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "110ffbb1-cf37-4d82-8234-baab334ae2a8";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "contact" | "business" | "trade", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** UK numbers, loosely — spaces, dashes and +44 all tolerated. */
const PHONE_RE = /^[+()\d][\d\s()-]{8,}$/;

export default function InquiryForm() {
  const uid = useId();
  const params = useSearchParams();

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [trade, setTrade] = useState("");
  const [failMessage, setFailMessage] = useState("");

  /* Deep links from the pricing cards preselect the plan.
     Derived rather than synced in an effect: the URL is the default and
     the user's own choice, once made, wins. */
  const planFromUrl = useMemo(() => {
    const q = params.get("plan");
    if (!q) return "";
    return (
      planInterest.find((p) => p.toLowerCase().startsWith(q.toLowerCase())) ?? ""
    );
  }, [params]);

  const [planChosen, setPlanChosen] = useState<string | null>(null);
  const plan = planChosen ?? planFromUrl;
  const setPlan = setPlanChosen;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot — real people never fill a field they cannot see. */
    if ((data.get("website_url") as string)?.trim()) {
      setStatus("success");
      return;
    }

    const name = (data.get("name") as string)?.trim() ?? "";
    const business = (data.get("business") as string)?.trim() ?? "";
    const contact = (data.get("contact") as string)?.trim() ?? "";

    const next: Errors = {};
    if (name.length < 2) next.name = "What should I call you?";
    if (business.length < 2) next.business = "What's the business called?";
    if (!EMAIL_RE.test(contact) && !PHONE_RE.test(contact))
      next.contact = "A phone number or an email address, either is fine.";
    if (!trade) next.trade = "Pick whichever is closest.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const key = Object.keys(next)[0];
      const el = form.querySelector<HTMLElement>(
        key === "trade" ? "[data-trade-group] button" : `[name="${key}"]`
      );
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    if (!ENDPOINT) {
      setStatus("error");
      setFailMessage(
        `This form isn't connected to an inbox yet — set NEXT_PUBLIC_FORM_ENDPOINT before launch. In the meantime, ring ${site.phone} or email ${site.email}.`
      );
      return;
    }

    setStatus("submitting");
    setFailMessage("");

    const payload: Record<string, unknown> = {
      name,
      business,
      contact,
      trade,
      situation: data.get("situation") || "—",
      plan: plan || "Not sure yet",
      area: (data.get("area") as string)?.trim() || "—",
      message: (data.get("message") as string)?.trim() || "—",
      subject: `New VEYRO enquiry — ${business}`,
      from_name: "VEYRO website",
      /* Where the enquiry lands. Web3Forms and Formspree both route by
         the account the key belongs to, so this is belt-and-braces — the
         key itself must be registered to this address. */
      to: site.email,
      /* If the enquirer left an email, hitting Reply goes to them rather
         than to the form provider. */
      replyto: EMAIL_RE.test(contact) ? contact : site.email,
    };
    if (ACCESS_KEY) payload.access_key = ACCESS_KEY;

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);

      setStatus("success");
      form.reset();
      setTrade("");
      setPlan("");
    } catch {
      setStatus("error");
      setFailMessage(
        `Something went wrong sending that. Please try again — or just ring me on ${site.phone}.`
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border-2 border-amber bg-white p-8 md:p-10"
        role="status"
      >
        <span className="grid size-14 place-items-center rounded-full bg-amber text-navy">
          <Check className="size-7" />
        </span>
        <h2 className="display mt-6 text-[clamp(1.6rem,4vw,2.5rem)] leading-tight text-navy">
          Got it — thanks.
        </h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          I&rsquo;ll get back to you within one working day, usually sooner.
          If it&rsquo;s urgent, ring me on{" "}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-amber-ink">
            {site.phone}
          </a>{" "}
          and you&rsquo;ll get me directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="group mt-7 inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-amber-ink"
        >
          <span className="link-sweep">Send another</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-6 md:p-8"
    >
      {/* Honeypot — hidden from sight, assistive tech and tab order. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${uid}-hp`}>Website URL (leave blank)</label>
        <input
          id={`${uid}-hp`}
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          name="name"
          label="Your name"
          autoComplete="name"
          error={errors.name}
        />
        <Field
          id={`${uid}-business`}
          name="business"
          label="Business name"
          autoComplete="organization"
          error={errors.business}
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${uid}-contact`}
          name="contact"
          label="Phone or email"
          hint="Whichever you'd rather I used."
          autoComplete="tel"
          error={errors.contact}
        />
      </div>

      {/* Trade */}
      <fieldset className="mt-7" data-trade-group>
        <legend className="mb-3 text-sm font-semibold text-navy">
          What sort of business is it?
        </legend>
        <div className="flex flex-wrap gap-2">
          {tradeOptions.map((t) => {
            const active = trade === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTrade(t);
                  setErrors((e) => ({ ...e, trade: undefined }));
                }}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 text-sm font-medium transition-colors duration-250 ${
                  active
                    ? "border-amber bg-amber text-navy"
                    : "border-line text-muted hover:border-amber hover:bg-amber/10 hover:text-navy"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        {errors.trade && <ErrorText>{errors.trade}</ErrorText>}
        <input type="hidden" name="trade" value={trade} />
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Select
          id={`${uid}-situation`}
          name="situation"
          label="What have you got at the moment?"
          options={currentSituation}
        />
        <Select
          id={`${uid}-plan`}
          name="plan"
          label="Interested in"
          options={planInterest}
          value={plan}
          onChange={setPlan}
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${uid}-area`}
          name="area"
          label="Town or area"
          placeholder="Wideopen, Gosforth, Killingworth…"
          optional
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${uid}-message`}
          className="mb-1.5 block text-sm font-semibold text-navy"
        >
          Anything else?{" "}
          <span className="font-normal text-faint">(optional)</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          placeholder="What you do, and anything you'd want on the site."
          className="field resize-y"
        />
      </div>

      <div role="alert" aria-live="assertive">
        {status === "error" && failMessage && (
          <p className="mt-6 rounded-lg border-l-4 border-danger bg-danger/8 py-3 pl-4 pr-3 text-sm leading-relaxed text-danger">
            {failMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-7 inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-amber px-8 py-3.5 text-base font-semibold tracking-tight text-navy transition-colors duration-300 hover:bg-amber-hi disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Spinner className="size-4" />
            Sending
          </>
        ) : (
          <>
            Send it over
            <span className="nudge inline-flex">
              <ArrowRight />
            </span>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-faint">
        I&rsquo;ll only use this to reply to you. No mailing list, nothing
        passed on, no follow-up sequence.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  name,
  label,
  error,
  hint,
  optional,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {optional && <span className="ml-1.5 font-normal text-faint">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={[errId, hintId].filter(Boolean).join(" ") || undefined}
        className="field"
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-faint">
          {hint}
        </p>
      )}
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined && onChange !== undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <select
        id={id}
        name={name}
        {...(controlled
          ? { value, onChange: (e) => onChange(e.target.value) }
          : { defaultValue: "" })}
        className="field cursor-pointer appearance-none pr-9"
        /* Every background longhand is set here rather than split
           between inline styles and utilities — mixing the two let the
           chevron tile. */
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23566a88' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px 16px",
        }}
      >
        <option value="">Choose one…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ErrorText({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-danger">
      {children}
    </p>
  );
}
