import type { MarketplaceConfig, MarketplaceId } from "@/types/marketplace";
import type {
  ActivityLog,
  ConnectedAccount,
  MarketplaceListing,
  Product,
  PublishJob
} from "@/types/product";

export const marketplaceConfigs: MarketplaceConfig[] = [
  {
    id: "dolap",
    name: "Dolap",
    description: "Manual queue until an approved partner API or import flow is available.",
    colorClass: "bg-emerald-600 text-white",
    accentClass: "border-emerald-200 bg-emerald-50 text-emerald-800",
    requiredFields: [
      "title",
      "description",
      "category",
      "condition",
      "price",
      "shippingInfo",
      "images"
    ],
    capabilities: {
      supported: false,
      integrationMode: "manual",
      reason: "Manual publishing required",
      canPublish: false,
      canUpdate: false,
      canArchive: false,
      canSyncStatus: false,
      supportsAnalytics: false
    }
  },
  {
    id: "gardrops",
    name: "Gardrops",
    description: "Manual review flow with per-platform copy and category mapping.",
    colorClass: "bg-rose-600 text-white",
    accentClass: "border-rose-200 bg-rose-50 text-rose-800",
    requiredFields: [
      "title",
      "description",
      "category",
      "condition",
      "size",
      "price",
      "images"
    ],
    capabilities: {
      supported: false,
      integrationMode: "manual",
      reason: "Manual publishing required",
      canPublish: false,
      canUpdate: false,
      canArchive: false,
      canSyncStatus: false,
      supportsAnalytics: false
    }
  },
  {
    id: "letgo",
    name: "Letgo",
    description: "Manual publish queue for local marketplace listing workflows.",
    colorClass: "bg-amber-500 text-stone-950",
    accentClass: "border-amber-200 bg-amber-50 text-amber-900",
    requiredFields: [
      "title",
      "description",
      "category",
      "condition",
      "price",
      "shippingInfo.city",
      "images"
    ],
    capabilities: {
      supported: false,
      integrationMode: "manual",
      reason: "Manual publishing required",
      canPublish: false,
      canUpdate: false,
      canArchive: false,
      canSyncStatus: false,
      supportsAnalytics: false
    }
  }
];

export const marketplaceIds = marketplaceConfigs.map((marketplace) => marketplace.id);

export const demoProducts: Product[] = [
  {
    id: "prod-denim-jacket",
    title: "Oversized Denim Jacket",
    shortDescription: "Structured vintage denim jacket in excellent condition.",
    description:
      "A relaxed oversized denim jacket with clean seams, intact buttons, and a gently worn vintage wash. Works well over dresses, knitwear, or simple basics.",
    category: "Women / Outerwear / Denim Jackets",
    brand: "Mango",
    condition: "like_new",
    size: "M",
    color: "Blue",
    price: 1250,
    currency: "TRY",
    shippingInfo: {
      payer: "buyer",
      method: "Standard cargo",
      weightGrams: 780,
      city: "Istanbul"
    },
    stockStatus: "in_stock",
    status: "ready",
    tags: ["denim", "outerwear", "vintage", "spring"],
    images: [
      {
        id: "img-denim-1",
        url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
        alt: "Denim jacket on clothing rack",
        order: 1,
        isCover: true,
        width: 900,
        height: 1200
      },
      {
        id: "img-denim-2",
        url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=80",
        alt: "Curated second hand clothing rack",
        order: 2,
        isCover: false,
        width: 900,
        height: 1200
      }
    ],
    createdAt: "2026-04-14T08:45:00.000Z",
    updatedAt: "2026-04-17T06:20:00.000Z"
  },
  {
    id: "prod-crossbody-bag",
    title: "Leather Crossbody Bag",
    shortDescription: "Compact black leather crossbody with clean hardware.",
    description:
      "Minimal black leather bag with adjustable strap, zipped interior pocket, and polished silver hardware. The leather is soft with light signs of careful use.",
    category: "Accessories / Bags / Crossbody",
    brand: "Derimod",
    condition: "good",
    size: "One Size",
    color: "Black",
    price: 1850,
    currency: "TRY",
    shippingInfo: {
      payer: "seller",
      method: "Protected cargo",
      weightGrams: 520,
      city: "Izmir"
    },
    stockStatus: "reserved",
    status: "published",
    tags: ["leather", "bag", "minimal", "black"],
    images: [
      {
        id: "img-bag-1",
        url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
        alt: "Black leather crossbody bag",
        order: 1,
        isCover: true,
        width: 900,
        height: 1200
      }
    ],
    createdAt: "2026-04-11T11:10:00.000Z",
    updatedAt: "2026-04-16T13:40:00.000Z"
  },
  {
    id: "prod-nike-sneakers",
    title: "Vintage Nike Sneakers",
    shortDescription: "Clean white sneakers with soft wear and original laces.",
    description:
      "A pair of vintage Nike sneakers with a classic white silhouette, original laces, and comfortable sole. Minor creasing is visible, but the pair is freshly cleaned.",
    category: "Men / Shoes / Sneakers",
    brand: "Nike",
    condition: "good",
    size: "42",
    color: "White",
    price: 2400,
    currency: "TRY",
    shippingInfo: {
      payer: "buyer",
      method: "Standard cargo",
      weightGrams: 950,
      city: "Ankara"
    },
    stockStatus: "in_stock",
    status: "ready",
    tags: ["sneakers", "nike", "streetwear", "white"],
    images: [
      {
        id: "img-shoes-1",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        alt: "White and red sneakers",
        order: 1,
        isCover: true,
        width: 900,
        height: 1200
      }
    ],
    createdAt: "2026-04-09T09:00:00.000Z",
    updatedAt: "2026-04-15T09:35:00.000Z"
  },
  {
    id: "prod-ceramic-set",
    title: "Ceramic Coffee Cup Set",
    shortDescription: "Four-piece ceramic set with warm glaze and saucers.",
    description:
      "A carefully packed four-piece coffee cup set with matching saucers. No cracks, no chips, and a warm handmade-style glaze.",
    category: "Home / Kitchen / Drinkware",
    brand: "Pasabahce",
    condition: "like_new",
    color: "Green",
    price: 690,
    currency: "TRY",
    shippingInfo: {
      payer: "seller",
      method: "Fragile cargo",
      weightGrams: 1150,
      city: "Istanbul"
    },
    stockStatus: "in_stock",
    status: "draft",
    tags: ["home", "ceramic", "coffee", "gift"],
    images: [
      {
        id: "img-ceramic-1",
        url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
        alt: "Ceramic coffee cups on a table",
        order: 1,
        isCover: true,
        width: 900,
        height: 1200
      }
    ],
    createdAt: "2026-04-06T15:25:00.000Z",
    updatedAt: "2026-04-12T12:05:00.000Z"
  }
];

export const connectedAccounts: ConnectedAccount[] = [
  {
    id: "acct-dolap",
    platform: "dolap",
    displayName: "Dolap manual workspace",
    status: "manual_only",
    integrationMode: "manual",
    supported: false,
    reason: "Manual publishing required",
    lastCheckedAt: "2026-04-17T06:05:00.000Z",
    scopes: ["manual_review", "copy_export"]
  },
  {
    id: "acct-gardrops",
    platform: "gardrops",
    displayName: "Gardrops checklist",
    status: "manual_only",
    integrationMode: "manual",
    supported: false,
    reason: "Manual publishing required",
    lastCheckedAt: "2026-04-17T06:02:00.000Z",
    scopes: ["manual_review", "asset_export"]
  },
  {
    id: "acct-letgo",
    platform: "letgo",
    displayName: "Letgo local queue",
    status: "manual_only",
    integrationMode: "manual",
    supported: false,
    reason: "Manual publishing required",
    lastCheckedAt: "2026-04-17T06:01:00.000Z",
    scopes: ["manual_review"]
  }
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "listing-denim-dolap",
    productId: "prod-denim-jacket",
    platform: "dolap",
    status: "manual_action_needed",
    missingFields: [],
    responseSummary: "Ready for manual copy and photo upload."
  },
  {
    id: "listing-denim-gardrops",
    productId: "prod-denim-jacket",
    platform: "gardrops",
    status: "manual_action_needed",
    titleOverride: "Mango Oversize Kot Ceket",
    priceOverride: 1320,
    missingFields: [],
    responseSummary: "Manual publishing required."
  },
  {
    id: "listing-denim-letgo",
    productId: "prod-denim-jacket",
    platform: "letgo",
    status: "manual_action_needed",
    missingFields: [],
    responseSummary: "Local marketplace manual listing."
  },
  {
    id: "listing-bag-dolap",
    productId: "prod-crossbody-bag",
    platform: "dolap",
    status: "published",
    platformListingId: "manual-dolap-2301",
    listingUrl: "https://example.com/manual/dolap/leather-crossbody-bag",
    lastSyncedAt: "2026-04-16T13:35:00.000Z",
    missingFields: [],
    responseSummary: "Published manually and tracked centrally."
  },
  {
    id: "listing-bag-gardrops",
    productId: "prod-crossbody-bag",
    platform: "gardrops",
    status: "sold",
    platformListingId: "manual-gardrops-814",
    listingUrl: "https://example.com/manual/gardrops/leather-crossbody-bag",
    lastSyncedAt: "2026-04-16T13:38:00.000Z",
    missingFields: [],
    responseSummary: "Sold and marked centrally."
  },
  {
    id: "listing-shoes-dolap",
    productId: "prod-nike-sneakers",
    platform: "dolap",
    status: "manual_action_needed",
    missingFields: [],
    responseSummary: "Ready for manual publishing."
  },
  {
    id: "listing-ceramic-gardrops",
    productId: "prod-ceramic-set",
    platform: "gardrops",
    status: "failed",
    missingFields: ["size"],
    responseSummary: "Gardrops requires a size or one-size value."
  }
];

export const publishJobs: PublishJob[] = [
  {
    id: "job-001",
    productId: "prod-denim-jacket",
    platform: "dolap",
    action: "publish",
    status: "manual_action_needed",
    createdAt: "2026-04-17T06:22:00.000Z",
    completedAt: "2026-04-17T06:22:05.000Z",
    response: "Adapter returned supported:false. Added to manual publish queue."
  },
  {
    id: "job-002",
    productId: "prod-crossbody-bag",
    platform: "gardrops",
    action: "sync",
    status: "sold",
    createdAt: "2026-04-16T13:40:00.000Z",
    completedAt: "2026-04-16T13:42:00.000Z",
    response: "Manual sync confirmed sold state."
  },
  {
    id: "job-003",
    productId: "prod-ceramic-set",
    platform: "gardrops",
    action: "publish",
    status: "failed",
    createdAt: "2026-04-15T10:18:00.000Z",
    completedAt: "2026-04-15T10:18:04.000Z",
    response: "Validation failed: size is required for this platform."
  }
];

export const activityLogs: ActivityLog[] = [
  {
    id: "activity-001",
    type: "publish_attempt",
    title: "Denim jacket queued for Dolap",
    description: "No approved publishing API is configured, so the item moved to manual action.",
    platform: "dolap",
    productId: "prod-denim-jacket",
    createdAt: "2026-04-17T06:22:05.000Z",
    severity: "warning"
  },
  {
    id: "activity-002",
    type: "sync",
    title: "Crossbody bag marked sold",
    description: "Gardrops manual sync confirmed the sold state and paused remaining actions.",
    platform: "gardrops",
    productId: "prod-crossbody-bag",
    createdAt: "2026-04-16T13:42:00.000Z",
    severity: "success"
  },
  {
    id: "activity-003",
    type: "product_updated",
    title: "Nike sneakers price adjusted",
    description: "Central product price changed from 2600 TRY to 2400 TRY.",
    productId: "prod-nike-sneakers",
    createdAt: "2026-04-15T09:35:00.000Z",
    severity: "info"
  },
  {
    id: "activity-004",
    type: "error",
    title: "Ceramic set missing platform field",
    description: "Gardrops validation needs a size or one-size value before manual publish.",
    platform: "gardrops",
    productId: "prod-ceramic-set",
    createdAt: "2026-04-15T10:18:04.000Z",
    severity: "error"
  }
];

export const listingActivity = [
  { day: "Apr 11", created: 4, ready: 3, manual: 2, sold: 0 },
  { day: "Apr 12", created: 5, ready: 4, manual: 2, sold: 1 },
  { day: "Apr 13", created: 7, ready: 6, manual: 4, sold: 1 },
  { day: "Apr 14", created: 8, ready: 7, manual: 5, sold: 2 },
  { day: "Apr 15", created: 11, ready: 9, manual: 7, sold: 2 },
  { day: "Apr 16", created: 12, ready: 10, manual: 8, sold: 3 },
  { day: "Apr 17", created: 14, ready: 11, manual: 9, sold: 4 }
];

export function getMarketplaceConfig(platform: MarketplaceId) {
  return marketplaceConfigs.find((marketplace) => marketplace.id === platform);
}

export function getProductById(id: string) {
  return demoProducts.find((product) => product.id === id);
}

export function getListingsForProduct(productId: string) {
  return marketplaceListings.filter((listing) => listing.productId === productId);
}

export function getProductTitle(productId: string) {
  return getProductById(productId)?.title ?? "Unknown product";
}
