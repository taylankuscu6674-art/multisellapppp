import type {
  ConnectionStatus,
  IntegrationMode,
  ListingStatus,
  MarketplaceId
} from "@/types/marketplace";

export type ProductStatus = "draft" | "ready" | "published" | "sold" | "archived";
export type StockStatus = "in_stock" | "reserved" | "sold_out";

export type ProductCondition =
  | "new_with_tags"
  | "like_new"
  | "good"
  | "fair"
  | "needs_repair";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isCover: boolean;
  width: number;
  height: number;
}

export interface ShippingInfo {
  payer: "seller" | "buyer";
  method: string;
  weightGrams: number;
  city: string;
}

export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  brand: string;
  condition: ProductCondition;
  size?: string;
  color?: string;
  price: number;
  currency: "TRY";
  shippingInfo: ShippingInfo;
  stockStatus: StockStatus;
  status: ProductStatus;
  tags: string[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ConnectedAccount {
  id: string;
  platform: MarketplaceId;
  displayName: string;
  status: ConnectionStatus;
  integrationMode: IntegrationMode;
  supported: boolean;
  reason?: string;
  lastCheckedAt: string;
  expiresAt?: string;
  scopes: string[];
}

export interface MarketplaceListing {
  id: string;
  productId: string;
  platform: MarketplaceId;
  status: ListingStatus;
  platformListingId?: string;
  listingUrl?: string;
  lastSyncedAt?: string;
  missingFields: string[];
  priceOverride?: number;
  titleOverride?: string;
  descriptionOverride?: string;
  categoryOverride?: string;
  responseSummary?: string;
}

export interface PublishJob {
  id: string;
  productId: string;
  platform: MarketplaceId;
  status: ListingStatus;
  action: "publish" | "update" | "archive" | "sync";
  createdAt: string;
  completedAt?: string;
  response: string;
}

export interface ActivityLog {
  id: string;
  type:
    | "product_created"
    | "product_updated"
    | "publish_attempt"
    | "manual_action"
    | "account_health"
    | "sync"
    | "error";
  title: string;
  description: string;
  platform?: MarketplaceId;
  productId?: string;
  createdAt: string;
  severity: "info" | "success" | "warning" | "error";
}

export interface PlatformFieldOverride {
  id: string;
  productId: string;
  platform: MarketplaceId;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  shippingOption?: string;
}
