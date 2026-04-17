import Image from "next/image";
import type { ProductImage } from "@/types/product";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const cover = images.find((image) => image.isCover) ?? images[0];
  const rest = images.filter((image) => image.id !== cover?.id);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border bg-muted">
        <Image src={cover.url} alt={cover.alt} fill className="object-cover" priority />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {rest.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
          >
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
