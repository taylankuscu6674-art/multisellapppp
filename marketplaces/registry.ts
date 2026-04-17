import { DolapAdapter } from "@/marketplaces/dolap";
import { GardropsAdapter } from "@/marketplaces/gardrops";
import { LetgoAdapter } from "@/marketplaces/letgo";
import type { MarketplaceAdapter, MarketplaceId } from "@/types/marketplace";

export const marketplaceAdapters: Record<MarketplaceId, MarketplaceAdapter> = {
  dolap: new DolapAdapter(),
  gardrops: new GardropsAdapter(),
  letgo: new LetgoAdapter()
};

export function getMarketplaceAdapter(platform: MarketplaceId) {
  return marketplaceAdapters[platform];
}

export function getAllMarketplaceAdapters() {
  return Object.values(marketplaceAdapters);
}
