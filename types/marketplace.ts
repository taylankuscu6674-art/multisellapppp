import type { Product } from "@/types/product";

export type MarketplaceId = "dolap" | "gardrops" | "letgo";
export type IntegrationMode = "official_api" | "partner_api" | "import_export" | "manual";

export type ListingStatus =
  | "draft"
  | "ready"
  | "published"
  | "failed"
  | "manual_action_needed"
  | "sold"
  | "archived";

export type ConnectionStatus =
  | "connected"
  | "needs_review"
  | "expired"
  | "manual_only"
  | "disconnected";

export interface MarketplaceCapabilities {
  supported: boolean;
  integrationMode: IntegrationMode;
  reason?: string;
  canPublish: boolean;
  canUpdate: boolean;
  canArchive: boolean;
  canSyncStatus: boolean;
  supportsAnalytics: boolean;
}

export interface MarketplaceConfig {
  id: MarketplaceId;
  name: string;
  description: string;
  colorClass: string;
  accentClass: string;
  requiredFields: string[];
  capabilities: MarketplaceCapabilities;
}

export interface MarketplaceFieldOverride {
  platform: MarketplaceId;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  shippingOption?: string;
}

export interface MarketplaceListingInput {
  product: Product;
  override?: MarketplaceFieldOverride;
  accountId?: string;
}

export interface MarketplaceValidationResult {
  platform: MarketplaceId;
  supported: boolean;
  ready: boolean;
  missingFields: string[];
  warnings: string[];
  reason?: string;
  transformed?: Record<string, unknown>;
}

export interface PublishResult {
  platform: MarketplaceId;
  supported: boolean;
  status: ListingStatus;
  message: string;
  listingUrl?: string;
  response?: Record<string, unknown>;
  reason?: string;
}

export interface ConnectionResult {
  platform: MarketplaceId;
  supported: boolean;
  ok: boolean;
  status: ConnectionStatus;
  message: string;
  reason?: string;
}

export interface MarketplaceAdapter {
  id: MarketplaceId;
  name: string;
  capabilities: MarketplaceCapabilities;
  connectAccount(
    userId: string,
    credentials?: Record<string, string>
  ): Promise<ConnectionResult>;
  validateListing(input: MarketplaceListingInput): Promise<MarketplaceValidationResult>;
  transformProductData(input: MarketplaceListingInput): Promise<Record<string, unknown>>;
  publishListing(input: MarketplaceListingInput): Promise<PublishResult>;
  updateListing(
    listingId: string,
    input: MarketplaceListingInput
  ): Promise<PublishResult>;
  archiveListing(listingId: string): Promise<PublishResult>;
  syncStatus(listingId: string): Promise<PublishResult>;
}
