import Link from "next/link";
import { notFound } from "next/navigation";
import { Archive, Copy, Send } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { ListingStatusTable } from "@/components/products/listing-status-table";
import { PlatformCustomizationTabs } from "@/components/products/platform-customization-tabs";
import { ProductGallery } from "@/components/products/product-gallery";
import { ActivityTimeline } from "@/components/activity/activity-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  activityLogs,
  getListingsForProduct,
  getProductById
} from "@/lib/demo-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getReadinessForProduct } from "@/server/services/listing-service";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const readiness = await getReadinessForProduct(product);
  const listings = getListingsForProduct(product.id);
  const productActivity = activityLogs.filter((log) => log.productId === product.id);

  return (
    <div>
      <PageHeader
        eyebrow="Product detail"
        title={product.title}
        description={product.shortDescription}
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
            <Button asChild>
              <Link href="/publish-queue">
                <Send className="mr-2 h-4 w-4" />
                Publish
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-6">
          <ProductGallery images={product.images} />
          <Card>
            <CardHeader>
              <CardTitle>Main information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={product.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Stock</span>
                <StatusBadge status={product.stockStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-semibold">{product.brand}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{formatDate(product.updatedAt)}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform-specific customization</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformCustomizationTabs product={product} readiness={readiness} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publish status by platform</CardTitle>
            </CardHeader>
            <CardContent>
              <ListingStatusTable listings={listings} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity history</CardTitle>
            </CardHeader>
            <CardContent>
              {productActivity.length ? (
                <ActivityTimeline logs={productActivity} />
              ) : (
                <div className="rounded-lg border bg-muted/40 p-5 text-sm text-muted-foreground">
                  No activity has been recorded for this product yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
