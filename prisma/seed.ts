import { Prisma, PrismaClient } from "@prisma/client";
import {
  activityLogs,
  connectedAccounts,
  demoProducts,
  marketplaceListings,
  publishJobs
} from "../lib/demo-data";

const prisma = new PrismaClient();

const platformMap = {
  dolap: "DOLAP",
  gardrops: "GARDROPS",
  letgo: "LETGO"
} as const;

const listingStatusMap = {
  draft: "DRAFT",
  ready: "READY",
  published: "PUBLISHED",
  failed: "FAILED",
  manual_action_needed: "MANUAL_ACTION_NEEDED",
  sold: "SOLD",
  archived: "ARCHIVED"
} as const;

const productStatusMap = {
  draft: "DRAFT",
  ready: "READY",
  published: "PUBLISHED",
  sold: "SOLD",
  archived: "ARCHIVED"
} as const;

const stockStatusMap = {
  in_stock: "IN_STOCK",
  reserved: "RESERVED",
  sold_out: "SOLD_OUT"
} as const;

const accountStatusMap = {
  connected: "CONNECTED",
  needs_review: "NEEDS_REVIEW",
  expired: "EXPIRED",
  manual_only: "MANUAL_ONLY",
  disconnected: "DISCONNECTED"
} as const;

async function main() {
  await prisma.activityLog.deleteMany();
  await prisma.publishJob.deleteMany();
  await prisma.platformFieldOverride.deleteMany();
  await prisma.marketplaceListing.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.connectedAccount.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      id: "demo-user",
      name: "MultiSELLER Demo",
      email: "admin@multiseller.com",
      role: "owner"
    }
  });

  for (const account of connectedAccounts) {
    await prisma.connectedAccount.create({
      data: {
        id: account.id,
        userId: user.id,
        platform: platformMap[account.platform],
        displayName: account.displayName,
        status: accountStatusMap[account.status],
        integrationMode: "MANUAL",
        supported: account.supported,
        scopes: account.scopes,
        metadata: {
          reason: account.reason
        },
        lastHealthCheck: new Date(account.lastCheckedAt),
        expiresAt: account.expiresAt ? new Date(account.expiresAt) : undefined
      }
    });
  }

  for (const product of demoProducts) {
    await prisma.product.create({
      data: {
        id: product.id,
        userId: user.id,
        title: product.title,
        shortDescription: product.shortDescription,
        description: product.description,
        category: product.category,
        brand: product.brand,
        condition: product.condition,
        size: product.size,
        color: product.color,
        price: product.price,
        currency: product.currency,
        shippingInfo: product.shippingInfo as unknown as Prisma.InputJsonValue,
        stockStatus: stockStatusMap[product.stockStatus],
        status: productStatusMap[product.status],
        tags: product.tags,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
        images: {
          create: product.images.map((image) => ({
            id: image.id,
            url: image.url,
            alt: image.alt,
            order: image.order,
            isCover: image.isCover,
            width: image.width,
            height: image.height
          }))
        }
      }
    });
  }

  for (const listing of marketplaceListings) {
    await prisma.marketplaceListing.create({
      data: {
        id: listing.id,
        productId: listing.productId,
        connectedAccountId: `acct-${listing.platform}`,
        platform: platformMap[listing.platform],
        status: listingStatusMap[listing.status],
        platformListingId: listing.platformListingId,
        listingUrl: listing.listingUrl,
        lastSyncedAt: listing.lastSyncedAt ? new Date(listing.lastSyncedAt) : undefined,
        missingFields: listing.missingFields,
        responseDetails: {
          summary: listing.responseSummary
        }
      }
    });
  }

  for (const job of publishJobs) {
    await prisma.publishJob.create({
      data: {
        id: job.id,
        productId: job.productId,
        connectedAccountId: `acct-${job.platform}`,
        platform: platformMap[job.platform],
        action: job.action.toUpperCase() as "PUBLISH" | "UPDATE" | "ARCHIVE" | "SYNC",
        status: listingStatusMap[job.status],
        responsePayload: {
          summary: job.response
        },
        createdAt: new Date(job.createdAt),
        completedAt: job.completedAt ? new Date(job.completedAt) : undefined
      }
    });
  }

  for (const log of activityLogs) {
    await prisma.activityLog.create({
      data: {
        id: log.id,
        userId: user.id,
        productId: log.productId,
        platform: log.platform ? platformMap[log.platform] : undefined,
        type: log.type,
        title: log.title,
        description: log.description,
        severity: log.severity.toUpperCase() as "INFO" | "SUCCESS" | "WARNING" | "ERROR",
        createdAt: new Date(log.createdAt)
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
