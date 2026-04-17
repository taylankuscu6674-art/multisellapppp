import { BaseMarketplaceAdapter } from "@/marketplaces/base";
import type {
  MarketplaceCapabilities,
  MarketplaceListingInput
} from "@/types/marketplace";

export class DolapAdapter extends BaseMarketplaceAdapter {
  id = "dolap" as const;
  name = "Dolap";

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
    "shippingInfo",
    "images"
  ];

  async transformProductData(input: MarketplaceListingInput) {
    const base = await super.transformProductData(input);

    return {
      ...base,
      title: String(base.title).slice(0, 70),
      marketplaceNote:
        "Enable API publishing only after Dolap provides an official or approved integration."
    };
  }
}
