import sharp from "sharp";

export async function prepareMarketplaceImage(input: Buffer) {
  const base = sharp(input).rotate();
  const metadata = await base.metadata();

  const resized = await base
    .resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: 82,
      mozjpeg: true
    })
    .toBuffer();

  const squarePreview = await sharp(input)
    .rotate()
    .resize(800, 800, {
      fit: "cover"
    })
    .webp({
      quality: 80
    })
    .toBuffer();

  return {
    original: metadata,
    resized,
    squarePreview
  };
}
