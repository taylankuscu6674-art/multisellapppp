import type {
  ConnectionResult,
  MarketplaceAdapter,
  MarketplaceCapabilities,
  MarketplaceConfig,
  MarketplaceListingInput,
  MarketplaceValidationResult,
  PublishResult
} from "@/types/marketplace";

const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  description: "Description",
  category: "Category",
  condition: "Condition",
  size: "Size",
  price: "Price",
  shippingInfo: "Shipping information",
  "shippingInfo.city": "Ship-from city",
  images: "At least one product photo"
};

export abstract class BaseMarketplaceAdapter implements MarketplaceAdapter {
  abstract id: MarketplaceConfig["id"];
  abstract name: string;
  abstract capabilities: MarketplaceCapabilities;
  protected abstract requiredFields: string[];

  async connectAccount(userId: string): Promise<ConnectionResult> {
    if (!this.capabilities.supported) {
      return {
        platform: this.id,
        supported: false,
        ok: false,
        status: "manual_only",
        message: `${this.name} is configured for compliant manual publishing.`,
        reason: this.capabilities.reason ?? "Manual publishing required"
      };
    }

    return {
      platform: this.id,
      supported: true,
      ok: true,
      status: "connected",
      message: `Connected ${this.name} for user ${userId}.`
    };
  }

  async validateListing(
    input: MarketplaceListingInput
  ): Promise<MarketplaceValidationResult> {
    const transformed = await this.transformProductData(input);
    const missingFields = this.requiredFields
      .filter((field) => this.isMissing(input, field))
      .map((field) => FIELD_LABELS[field] ?? field);

    const warnings = [];
    if (!this.capabilities.supported) {
      warnings.push(this.capabilities.reason ?? "Manual publishing required");
    }

    if (input.product.images.length > 8) {
      warnings.push("Review photo limits before publishing to this marketplace.");
    }

    return {
      platform: this.id,
      supported: this.capabilities.supported,
      ready: missingFields.length === 0 && this.capabilities.supported,
      missingFields,
      warnings,
      reason: this.capabilities.reason,
      transformed
    };
  }

  async transformProductData(input: MarketplaceListingInput) {
    const { product, override } = input;

    return {
      title: override?.title ?? product.title,
      description: override?.description ?? product.description,
      category: override?.category ?? product.category,
      condition: product.condition,
      size: product.size,
      color: product.color,
      price: override?.price ?? product.price,
      currency: product.currency,
      shipping: override?.shippingOption ?? product.shippingInfo.method,
      images: product.images.map((image) => ({
        url: image.url,
        alt: image.alt,
        isCover: image.isCover
      })),
      tags: product.tags
    };
  }

  async publishListing(input: MarketplaceListingInput): Promise<PublishResult> {
    if (!this.capabilities.supported || !this.capabilities.canPublish) {
      return this.unsupportedResult("publish");
    }

    const validation = await this.validateListing(input);
    if (!validation.ready) {
      return {
        platform: this.id,
        supported: true,
        status: "failed",
        message: `Validation failed: ${validation.missingFields.join(", ")}`,
        response: validation.transformed
      };
    }

    return {
      platform: this.id,
      supported: true,
      status: "published",
      message: `${this.name} accepted the listing through an approved integration.`,
      listingUrl: `https://example.com/${this.id}/${input.product.id}`,
      response: validation.transformed
    };
  }

  async updateListing(
    listingId: string,
    input: MarketplaceListingInput
  ): Promise<PublishResult> {
    if (!this.capabilities.supported || !this.capabilities.canUpdate) {
      return this.unsupportedResult("update");
    }

    return {
      platform: this.id,
      supported: true,
      status: "published",
      message: `${this.name} update accepted for listing ${listingId}.`,
      response: await this.transformProductData(input)
    };
  }

  async archiveListing(listingId: string): Promise<PublishResult> {
    if (!this.capabilities.supported || !this.capabilities.canArchive) {
      return this.unsupportedResult("archive");
    }

    return {
      platform: this.id,
      supported: true,
      status: "archived",
      message: `${this.name} archived listing ${listingId}.`
    };
  }

  async syncStatus(listingId: string): Promise<PublishResult> {
    if (!this.capabilities.supported || !this.capabilities.canSyncStatus) {
      return this.unsupportedResult("sync");
    }

    return {
      platform: this.id,
      supported: true,
      status: "published",
      message: `${this.name} status synced for listing ${listingId}.`
    };
  }

  protected unsupportedResult(action: string): PublishResult {
    return {
      platform: this.id,
      supported: false,
      status: "manual_action_needed",
      message: `${this.name} ${action} requires manual publishing through the platform UI.`,
      reason: this.capabilities.reason ?? "Manual publishing required"
    };
  }

  private isMissing(input: MarketplaceListingInput, field: string) {
    const { product, override } = input;

    if (field === "title") {
      return !(override?.title ?? product.title);
    }

    if (field === "description") {
      return !(override?.description ?? product.description);
    }

    if (field === "category") {
      return !(override?.category ?? product.category);
    }

    if (field === "price") {
      return !(override?.price ?? product.price);
    }

    if (field === "images") {
      return product.images.length === 0;
    }

    if (field === "shippingInfo") {
      return !product.shippingInfo?.method;
    }

    if (field === "shippingInfo.city") {
      return !product.shippingInfo?.city;
    }

    return !product[field as keyof typeof product];
  }
}
