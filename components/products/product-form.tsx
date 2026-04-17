"use client";

import { useRef, useState, useTransition } from "react";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUploader } from "@/components/products/media-uploader";

type SaveAction = (formData: FormData) => Promise<{ ok: boolean; message: string }>;

export function ProductForm({ action }: { action: SaveAction }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  function generateDescriptions() {
    const form = formRef.current;
    const title = String(new FormData(form ?? undefined).get("title") ?? "this item");
    const brand = String(new FormData(form ?? undefined).get("brand") ?? "selected");
    const category = String(
      new FormData(form ?? undefined).get("category") ?? "second-hand"
    );

    setShortDescription(`${brand} ${title} prepared for ${category} buyers.`);
    setDescription(
      `${title} is photographed, checked, and ready for compliant marketplace publishing. The listing includes clear condition notes, shipping details, and platform-specific copy that can be reviewed before going live.`
    );
  }

  return (
    <form
      ref={formRef}
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          const result = await action(formData);
          setMessage(result.message);
        });
      }}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Vintage leather jacket" required />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Women / Outerwear / Jackets"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" placeholder="Mango" />
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition</Label>
                <select
                  id="condition"
                  name="condition"
                  className="h-10 rounded-lg border bg-background px-3 text-sm"
                  defaultValue="good"
                >
                  <option value="new_with_tags">New with tags</option>
                  <option value="like_new">Like new</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="needs_repair">Needs repair</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="size">Size</Label>
                <Input id="size" name="size" placeholder="M" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" name="color" placeholder="Black" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" min="1" placeholder="1250" required />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label htmlFor="description">Description</Label>
                <Button type="button" variant="outline" size="sm" onClick={generateDescriptions}>
                  <WandSparkles className="mr-2 h-4 w-4" />
                  Generate copy
                </Button>
              </div>
              <Input
                name="shortDescription"
                value={shortDescription}
                onChange={(event) => setShortDescription(event.target.value)}
                placeholder="Short description"
              />
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe condition, measurements, styling, and shipping notes."
                required
              />
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="shippingMethod">Shipping</Label>
                <Input
                  id="shippingMethod"
                  name="shippingMethod"
                  placeholder="Standard cargo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stockStatus">Stock status</Label>
                <select
                  id="stockStatus"
                  name="stockStatus"
                  className="h-10 rounded-lg border bg-background px-3 text-sm"
                  defaultValue="in_stock"
                >
                  <option value="in_stock">In stock</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold_out">Sold out</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" placeholder="denim, vintage, spring" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaUploader />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-5">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save draft"}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Duplicate from template
            </Button>
            {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
