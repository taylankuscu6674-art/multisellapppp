import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/app/status-badge";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getMarketplaceConfig } from "@/lib/demo-data";
import type { MarketplaceListing } from "@/types/product";

export function ListingStatusTable({ listings }: { listings: MarketplaceListing[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Marketplace</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Missing fields</TableHead>
          <TableHead>Response</TableHead>
          <TableHead>URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listings.map((listing) => {
          const config = getMarketplaceConfig(listing.platform);

          return (
            <TableRow key={listing.id}>
              <TableCell>
                <Badge className={config?.colorClass}>{config?.name}</Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={listing.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {listing.missingFields.length ? listing.missingFields.join(", ") : "None"}
              </TableCell>
              <TableCell className="max-w-72 text-muted-foreground">
                {listing.responseSummary ?? "Waiting for review"}
              </TableCell>
              <TableCell>
                {listing.listingUrl ? (
                  <Link
                    href={listing.listingUrl}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Open
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">Not published</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
