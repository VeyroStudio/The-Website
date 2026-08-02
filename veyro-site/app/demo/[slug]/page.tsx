import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GrowthHome from "@/components/demo/GrowthHome";
import ProHome from "@/components/demo/ProHome";
import StarterHome from "@/components/demo/StarterHome";
import { getDemo } from "@/lib/demos";
import { site } from "@/lib/site";

/**
 * Demo home, dispatched by plan. Each price point gets a genuinely
 * different home page — a Starter prospect sees the whole one-page
 * site here; Growth and Pro see the front door of a bigger one.
 */

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "Not found" };
  return {
    title: { absolute: `${demo.business} — ${demo.town} (demo preview)` },
    description: `Private demo preview built by ${site.name}.`,
  };
}

export default async function DemoHome({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  switch (demo.plan) {
    case "starter":
      return <StarterHome demo={demo} />;
    case "growth":
      return <GrowthHome demo={demo} />;
    case "pro":
      return <ProHome demo={demo} />;
  }
}
