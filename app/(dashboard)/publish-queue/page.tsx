import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { PublishRunner } from "@/components/marketplace/publish-runner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  demoProducts,
  getMarketplaceConfig,
  marketplaceListings,
  publishJobs
} from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { publishEverywherePossible } from "@/server/actions/publish";

export default function PublishQueuePage() {
  const queuedListings = marketplaceListings.filter(
    (listing) => listing.status === "manual_action_needed" || listing.status === "failed"
  );

  return (
    <div>
      <PageHeader
        eyebrow="Publish flow"
        title="Publish queue"
        description="Review every platform result before publishing. Unsupported marketplaces are clearly marked as manual action required."
      />

      <PublishRunner action={publishEverywherePossible} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Manual and failed actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Required next step</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queuedListings.map((listing) => {
                  const product = demoProducts.find((item) => item.id === listing.productId);
                  const config = getMarketplaceConfig(listing.platform);

                  return (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <Link href={`/products/${listing.productId}`} className="font-semibold">
                          {product?.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">{product?.category}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={config?.accentClass}>{config?.name}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={listing.status} />
                      </TableCell>
                      <TableCell className="max-w-80 text-muted-foreground">
                        {listing.responseSummary}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Manual review
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publish history</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {publishJobs.map((job) => {
              const product = demoProducts.find((item) => item.id === job.productId);
              const config = getMarketplaceConfig(job.platform);

              return (
                <div key={job.id} className="rounded-lg border bg-muted/35 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{product?.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.action} - {formatDate(job.createdAt)}
                      </p>
                    </div>
                    <Badge className={config?.accentClass}>{config?.name}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{job.response}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
