import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getMarketplaceConfig, marketplaceConfigs } from "@/lib/demo-data";
import type { MarketplaceValidationResult } from "@/types/marketplace";
import type { Product } from "@/types/product";

export function PlatformCustomizationTabs({
  product,
  readiness
}: {
  product: Product;
  readiness: MarketplaceValidationResult[];
}) {
  return (
    <Tabs defaultValue={marketplaceConfigs[0].id}>
      <TabsList className="w-full justify-start overflow-x-auto">
        {marketplaceConfigs.map((marketplace) => (
          <TabsTrigger key={marketplace.id} value={marketplace.id}>
            {marketplace.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {readiness.map((result) => {
        const config = getMarketplaceConfig(result.platform);

        return (
          <TabsContent key={result.platform} value={result.platform}>
            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Platform title</Label>
                  <Input defaultValue={String(result.transformed?.title ?? product.title)} />
                </div>
                <div className="grid gap-2">
                  <Label>Platform description</Label>
                  <Textarea
                    defaultValue={String(result.transformed?.description ?? product.description)}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label>Category mapping</Label>
                    <Input defaultValue={String(result.transformed?.category ?? product.category)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Price override</Label>
                    <Input type="number" defaultValue={product.price} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Shipping option</Label>
                    <Input defaultValue={String(result.transformed?.shipping ?? product.shippingInfo.method)} />
                  </div>
                </div>
                <Button type="button" variant="outline">
                  Save platform override
                </Button>
              </div>
              <aside className="rounded-lg border bg-muted/35 p-4">
                <Badge className={config?.accentClass}>
                  {result.supported ? "Integration ready" : "Manual publish required"}
                </Badge>
                <div className="mt-4 space-y-3 text-sm">
                  {result.missingFields.length ? (
                    <div className="flex gap-2 text-destructive">
                      <AlertTriangle className="mt-0.5 h-4 w-4" />
                      <span>{result.missingFields.join(", ")} missing</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 text-primary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                      <span>Required product fields are complete.</span>
                    </div>
                  )}
                  <p className="leading-6 text-muted-foreground">
                    {result.reason ??
                      "Approved integration methods can publish after review."}
                  </p>
                </div>
              </aside>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
