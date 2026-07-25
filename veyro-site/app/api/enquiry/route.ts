import { site } from "@/lib/site";

/**
 * Supplies the enquiry form's delivery config at runtime.
 *
 * Web3Forms' free tier rejects server-to-server submissions outright —
 * "Use our API in client side ... (Pro plan is required)", HTTP 403 — so
 * the browser has to be the one that posts the message. That rules out
 * relaying it through here.
 *
 * What this route does instead is hand the browser the access key, read
 * from the environment when the request arrives. The practical effect is
 * the one that was wanted: the key lives in hPanel → Node.js app →
 * Environment Variables as `WEB3FORMS_KEY`, and changing it takes effect
 * on the next page load, with no rebuild and no redeploy.
 *
 * It does not hide the key — with Web3Forms free it necessarily reaches
 * the browser either way. The literal below is a fallback so the form
 * keeps working if the variable is ever unset or mistyped.
 */

const FALLBACK_KEY = "110ffbb1-cf37-4d82-8234-baab334ae2a8";

/* Must be evaluated per request, or the build would freeze whatever the
   environment looked like at build time — the exact trap this avoids. */
export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.WEB3FORMS_KEY?.trim() || FALLBACK_KEY;

  return Response.json(
    {
      endpoint: "https://api.web3forms.com/submit",
      accessKey: key,
      deliverTo: site.email,
      /* Lets us confirm from the outside whether the panel is actually
         driving this, without exposing which key is in play. */
      source: process.env.WEB3FORMS_KEY?.trim() ? "environment" : "fallback",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
