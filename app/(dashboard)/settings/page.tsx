import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Prepare storage, image processing, team roles, and integration controls for production deployment."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site and app links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <div className="rounded-lg border bg-muted/35 p-4">
              <p className="font-semibold">Website</p>
              <Link href={siteConfig.siteUrl} className="mt-1 block text-primary">
                {siteConfig.siteUrl}
              </Link>
            </div>
            <div className="rounded-lg border bg-muted/35 p-4">
              <p className="font-semibold">Installable app</p>
              <Link href={siteConfig.appUrl} className="mt-1 block text-primary">
                {siteConfig.appUrl}
              </Link>
            </div>
            <div className="rounded-lg border bg-muted/35 p-4">
              <p className="font-semibold">GitHub repository</p>
              {siteConfig.githubUrl ? (
                <Link href={siteConfig.githubUrl} className="mt-1 block text-primary">
                  {siteConfig.githubUrl}
                </Link>
              ) : (
                <p className="mt-1 text-muted-foreground">
                  Add NEXT_PUBLIC_GITHUB_REPO_URL after the repo is created.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workspace profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Workspace name</Label>
              <Input defaultValue="Listiq Demo Studio" />
            </div>
            <div className="grid gap-2">
              <Label>Default currency</Label>
              <Input defaultValue="TRY" />
            </div>
            <Button>Save settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media and storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span>S3-compatible uploads</span>
              <Badge>Ready</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span>Resize, compress, square preview</span>
              <Badge>Sharp service</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span>AI background cleanup</span>
              <Badge variant="muted">Placeholder</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles and scalability</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/35 p-4">
              User and ownership fields are modeled now, so team roles can be added with
              workspace membership tables later.
            </div>
            <div className="rounded-lg border bg-muted/35 p-4">
              Marketplace adapters are isolated by platform and can be swapped for real
              approved integrations without changing product screens.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/35 p-4">
              Platform support is opt-in. Adapters default to supported:false and return
              Manual publishing required.
            </div>
            <div className="rounded-lg border bg-muted/35 p-4">
              Publish logs record every attempt, response, and validation issue before status
              changes are applied.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
