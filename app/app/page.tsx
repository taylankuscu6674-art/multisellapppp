import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Layers3,
  MonitorSmartphone,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Web App",
  description: `Open the ${siteConfig.name} dashboard or download the project package from the app landing page.`
};

const appHighlights = [
  "Unified listing dashboard",
  "Manual publish queue",
  "Marketplace adapter layer",
  "Audit logs and product media flow"
];

export default function AppLaunchPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
              MS
            </span>
            <span className="font-semibold">{siteConfig.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/">Website</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <Badge variant="warning">Web app version</Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal sm:text-6xl">
              Run {siteConfig.name} from the browser, manage every listing in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Use the web app to create products, review marketplace readiness, manage
              manual publish actions, and keep compliant platform operations organized.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={siteConfig.dashboardPath}>
                  Open web app
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={siteConfig.downloadUrl}>
                  <Download className="mr-2 h-4 w-4" />
                  Download source package
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Download link points to the latest GitHub source package for this app.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">App status</p>
                  <p className="mt-1 text-2xl font-semibold">Ready to launch</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <MonitorSmartphone className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="grid gap-3">
                {appHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border p-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/35 p-4">
                  <Layers3 className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold">Dashboard route</p>
                  <p className="mt-1 text-sm text-muted-foreground">/dashboard</p>
                </div>
                <div className="rounded-lg border bg-muted/35 p-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold">Safe integrations</p>
                  <p className="mt-1 text-sm text-muted-foreground">Manual fallback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
