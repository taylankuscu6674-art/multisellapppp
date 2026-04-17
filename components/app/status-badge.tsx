import { Badge } from "@/components/ui/badge";
import type { ListingStatus } from "@/types/marketplace";
import type { ProductStatus, StockStatus } from "@/types/product";

const labels: Record<ListingStatus | ProductStatus | StockStatus, string> = {
  draft: "Draft",
  ready: "Ready",
  published: "Published",
  failed: "Failed",
  manual_action_needed: "Manual action",
  sold: "Sold",
  archived: "Archived",
  in_stock: "In stock",
  reserved: "Reserved",
  sold_out: "Sold out"
};

export function StatusBadge({
  status
}: {
  status: ListingStatus | ProductStatus | StockStatus;
}) {
  if (status === "failed" || status === "sold_out") {
    return <Badge variant="destructive">{labels[status]}</Badge>;
  }

  if (status === "manual_action_needed" || status === "reserved") {
    return <Badge variant="warning">{labels[status]}</Badge>;
  }

  if (status === "published" || status === "ready" || status === "in_stock") {
    return <Badge>{labels[status]}</Badge>;
  }

  return <Badge variant="muted">{labels[status]}</Badge>;
}
