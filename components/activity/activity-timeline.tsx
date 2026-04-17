import { AlertTriangle, CheckCircle2, CircleDot, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getMarketplaceConfig, getProductTitle } from "@/lib/demo-data";
import type { ActivityLog } from "@/types/product";

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: CircleDot
};

export function ActivityTimeline({ logs }: { logs: ActivityLog[] }) {
  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const Icon = icons[log.severity];
        const marketplace = log.platform ? getMarketplaceConfig(log.platform) : null;

        return (
          <div key={log.id} className="rounded-lg border bg-white p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{log.title}</p>
                    {marketplace ? (
                      <Badge className={marketplace.accentClass}>{marketplace.name}</Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {log.description}
                  </p>
                  {log.productId ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Product: {getProductTitle(log.productId)}
                    </p>
                  ) : null}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(log.createdAt)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
