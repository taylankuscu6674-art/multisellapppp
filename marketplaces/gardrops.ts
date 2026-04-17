import { BaseMarketplaceAdapter } from "@/marketplaces/base";
import type {
  MarketplaceCapabilities,
  MarketplaceListingInput
} from "@/types/marketplace";

export class GardropsAdapter extends BaseMarketplaceAdapter {
  id = "gardrops" as const;
  name = "Gardrops";

  capabilities: MarketplaceCapabilities = {
    supported: false,
    integrationMode: "manual",
    reason: "Manual publishing required",
    canPublish: false,
    canUpdate: false,
    canArchive: false,
    canSyncStatus: false,
    supportsAnalytics: false
  };

  protected requiredFields = [
    "title",
    "description",
    "category",
    "condition",
    "size",
    "price",
    "images"
  ];

  async transformProductData(input: MarketplaceListingInput) {
    const base = await super.transformProductData(input);

    return {
      ...base,
      title: String(base.title).slice(0, 65),
      categoryPath: input.override?.category ?? input.product.category,
      marketplaceNote:
        "This adapter exports reviewed copy for manual publishing until an approved integration exists."
    };
  }
}
