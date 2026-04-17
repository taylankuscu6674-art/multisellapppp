import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Github,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

const comparison = [
  {
    label: "Approved API publishing",
    manual: "Platform by platform",
    listiq: "Central review and logs"
  },
  {
    label: "Unsupported marketplaces",
    manual: "Scattered notes",
    listiq: "Manual queue with required fields"
  },
  {
    label: "Product photos",
    manual: "Repeated uploads",
    listiq: "Resize, order, and cover control"
  },
  {
    label: "Audit trail",
    manual: "Hard to reconstruct",
    listiq: "Every attempt tracked"
  }
];

export default function LandingPage() {
  return (
    <main className="bg-background">
      <section className="relative flex min-h-[86svh] overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=80"
          alt="Second-hand fashion sellers preparing listings"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-foreground">
                LQ
              </span>
              <span className="font-semibold">Listiq</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link href="/login">Start Listing</Link>
              </Button>
              <Button asChild className="bg-white text-foreground hover:bg-white/90">
                <Link href="/app">View Dashboard</Link>
              </Button>
            </div>
          </nav>
          <div className="flex flex-1 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-1 text-sm">
                <ShieldCheck className="h-4 w-4" />
                Compliance-first marketplace operations
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
                List once. Review clearly. Publish only where allowed.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Create second-hand product listings in one place, map the fields for each
                marketplace, and keep unsupported platforms in a clean manual queue.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                  <Link href="/login">
                    Start Listing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                  <Link href="/app">View Dashboard</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <Link
                  href={siteConfig.siteUrl}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 font-semibold text-white hover:bg-white/20"
                >
                  <MonitorSmartphone className="h-4 w-4" />
                  Site link
                </Link>
                <Link
                  href={siteConfig.appUrl}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 font-semibold text-white hover:bg-white/20"
                >
                  <MonitorSmartphone className="h-4 w-4" />
                  App link
                </Link>
                {siteConfig.githubUrl ? (
                  <Link
                    href={siteConfig.githubUrl}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 font-semibold text-white hover:bg-white/20"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {[
            {
              icon: Workflow,
              title: "One product record",
              copy: "Photos, descriptions, condition, shipping, tags, and stock stay together."
            },
            {
              icon: Sparkles,
              title: "Platform-ready copy",
              copy: "Per-marketplace titles, descriptions, price overrides, and category mappings."
            },
            {
              icon: ShieldCheck,
              title: "No bypass logic",
              copy: "Adapters return manual actions when an official publishing method is missing."
            }
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold">{feature.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.copy}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-primary">Comparison</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">
              Built for sellers who need control, not shortcuts.
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border bg-white">
            <div className="grid grid-cols-3 border-b bg-muted/45 p-4 text-sm font-semibold">
              <span>Workflow</span>
              <span>Manual spreadsheet</span>
              <span>Listiq</span>
            </div>
            {comparison.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-3 border-b p-4 text-sm last:border-b-0"
              >
                <span className="font-medium">{row.label}</span>
                <span className="text-muted-foreground">{row.manual}</span>
                <span className="flex items-center gap-2 font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  {row.listiq}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
