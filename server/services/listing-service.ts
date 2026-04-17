import {
  activityLogs,
  demoProducts,
  marketplaceListings,
  publishJobs
} from "@/lib/demo-data";
import { getAllMarketplaceAdapters } from "@/marketplaces/registry";
import type { MarketplaceValidationResult } from "@/types/marketplace";
import type { Product } from "@/types/product";

export async function getReadinessForProduct(
  product: Product
): Promise<MarketplaceValidationResult[]> {
  return Promise.all(
    getAllMarketplaceAdapters().map((adapter) =>
      adapter.validateListing({
        product
      })
    )
  );
}

export async function getPublishPreview(product: Product) {
  const readiness = await getReadinessForProduct(product);

  return readiness.map((result) => ({
    ...result,
    destination:
      result.supported && result.ready ? "Approved integration" : "Manual queue"
  }));
}

export function getDashboardMetrics() {
  const totalProducts = demoProducts.length;
  const publishedListings = marketplaceListings.filter(
    (listing) => listing.status === "published"
  ).length;
  const manualQueue = marketplaceListings.filter(
    (listing) => listing.status === "manual_action_needed"
  ).length;
  const failedJobs = publishJobs.filter((job) => job.status === "failed").length;
  const soldItems = marketplaceListings.filter((listing) => listing.status === "sold")
    .length;
  const revenue = demoProducts
    .filter((product) =>
      marketplaceListings.some(
        (listing) => listing.productId === product.id && listing.status === "sold"
      )
    )
    .reduce((sum, product) => sum + product.price, 0);

  return {
    totalProducts,
    publishedListings,
    manualQueue,
    failedJobs,
    soldItems,
    revenue,
    latestActivity: activityLogs.slice(0, 4)
  };
}
