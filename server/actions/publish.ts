"use server";

import { revalidatePath } from "next/cache";
import { demoProducts } from "@/lib/demo-data";
import { getAllMarketplaceAdapters } from "@/marketplaces/registry";
import type { PublishResult } from "@/types/marketplace";

export async function publishEverywherePossible(): Promise<PublishResult[]> {
  const results: PublishResult[] = [];

  for (const product of demoProducts) {
    for (const adapter of getAllMarketplaceAdapters()) {
      const result = await adapter.publishListing({ product });
      results.push(result);
    }
  }

  revalidatePath("/publish-queue");
  revalidatePath("/activity");
  revalidatePath("/dashboard");

  return results;
}

export async function markManualActionComplete(productId: string, platform: string) {
  // In production, persist manual completion, listing URL, response details, and actor ID.
  revalidatePath("/publish-queue");

  return {
    ok: true,
    message: `${platform} manual action recorded for ${productId}.`
  };
}
