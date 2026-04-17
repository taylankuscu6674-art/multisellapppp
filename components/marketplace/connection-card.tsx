import { CheckCircle2, Clock3, LockKeyhole, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getMarketplaceConfig } from "@/lib/demo-data";
import type { ConnectedAccount } from "@/types/product";

export function ConnectionCard({ account }: { account: ConnectedAccount }) {
  const config = getMarketplaceConfig(account.platform);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{config?.name}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">{account.displayName}</p>
        </div>
        <Badge className={config?.accentClass}>
          {account.supported ? "Connected" : "Manual only"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <LockKeyhole className="h-4 w-4" />
            Tokens encrypted when official credentials are available
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            Last health check {formatDate(account.lastCheckedAt)}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Scopes: {account.scopes.join(", ")}
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          {account.reason ??
            "Credentials are healthy and the adapter can publish through approved methods."}
        </div>
        <Button variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Recheck connection
        </Button>
      </CardContent>
    </Card>
  );
}
