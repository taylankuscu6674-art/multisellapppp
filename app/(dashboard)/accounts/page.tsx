import { PageHeader } from "@/components/app/page-header";
import { ConnectionCard } from "@/components/marketplace/connection-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectedAccounts } from "@/lib/demo-data";

export default function AccountsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Connections"
        title="Connected accounts"
        description="Manage marketplace connection health, token handling, reconnect flows, and manual publishing status."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {connectedAccounts.map((account) => (
          <ConnectionCard account={account} key={account.id} />
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Security posture</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <div className="rounded-lg border bg-muted/35 p-4">
            Credentials are stored encrypted when official OAuth or token-based integrations
            exist.
          </div>
          <div className="rounded-lg border bg-muted/35 p-4">
            Missing permissions and expired credentials are surfaced before publish attempts.
          </div>
          <div className="rounded-lg border bg-muted/35 p-4">
            Manual-only platforms never run stealth browser automation or bypass flows.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
