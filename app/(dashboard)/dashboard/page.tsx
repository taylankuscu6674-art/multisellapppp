import Link from "next/link";
import { BarChart3, Boxes, CircleDollarSign, ListChecks, Store } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { StatCard } from "@/components/dashboard/stat-card";
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
  activityLogs,
  connectedAccounts,
  demoProducts,
  listingActivity,
  marketplaceListings
} from "@/lib/demo-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getDashboardMetrics } from "@/server/services/listing-service";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const recentProducts = demoProducts.slice(0, 3);
  const queue = marketplaceListings
    .filter((listing) => listing.status === "manual_action_needed" || listing.status === "failed")
    .slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Control every listing from one dashboard."
        description="Track products, publishing readiness, manual actions, marketplace health, and recent operations without violating platform rules."
        action={
          <Button asChild>
            <Link href="/products/new">Create product</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Products"
          value={String(metrics.totalProducts)}
          detail="Demo catalog records"
          icon={Boxes}
        />
        <StatCard
          label="Published"
          value={String(metrics.publishedListings)}
          detail="Tracked platform URLs"
          icon={Store}
        />
        <StatCard
          label="Manual queue"
          value={String(metrics.manualQueue)}
          detail="Unsupported integrations"
          icon={ListChecks}
        />
        <StatCard
          label="Sold items"
          value={String(metrics.soldItems)}
          detail="Central sold state"
          icon={BarChart3}
        />
        <StatCard
          label="Revenue"
          value={formatCurrency(metrics.revenue)}
          detail="Tracked sold value"
          icon={CircleDollarSign}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader>
            <CardTitle>Listing activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityChart data={listingActivity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border bg-muted/35 p-3"
              >
                <div>
                  <p className="font-semibold capitalize">{account.platform}</p>
                  <p className="text-xs text-muted-foreground">{account.reason}</p>
                </div>
                <Badge variant="warning">Manual</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent products</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/products">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link href={`/products/${product.id}`} className="font-semibold">
                        {product.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={product.status} />
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(product.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Publish queue</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/publish-queue">Review</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {queue.map((listing) => {
              const product = demoProducts.find((item) => item.id === listing.productId);
              return (
                <div key={listing.id} className="rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{product?.title}</p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {listing.platform} - {listing.responseSummary}
                      </p>
                    </div>
                    <StatusBadge status={listing.status} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Latest activity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {activityLogs.slice(0, 3).map((log) => (
            <div key={log.id} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-semibold">{log.title}</p>
                <p className="text-sm text-muted-foreground">{log.description}</p>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(log.createdAt)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
