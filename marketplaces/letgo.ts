import { BaseMarketplaceAdapter } from "@/marketplaces/base";
import type {
  MarketplaceCapabilities,
  MarketplaceListingInput
} from "@/types/marketplace";

export class LetgoAdapter extends BaseMarketplaceAdapter {
  id = "letgo" as const;
  name = "Letgo";

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
    "price",
    "shippingInfo.city",
    "images"
  ];

  async transformProductData(input: MarketplaceListingInput) {
    const base = await super.transformProductData(input);

    return {
      ...base,
      location: input.product.shippingInfo.city,
      marketplaceNote:
        "Letgo listings stay in a manual queue unless a permitted integration path is configured."
    };
  }
}
