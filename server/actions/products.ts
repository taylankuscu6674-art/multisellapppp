"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const productDraftSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  brand: z.string().optional(),
  condition: z.string().min(2),
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.coerce.number().positive(),
  shippingMethod: z.string().min(2),
  stockStatus: z.string().min(2),
  tags: z.string().optional()
});

export async function saveProductDraft(formData: FormData) {
  const parsed = productDraftSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please complete the required product fields before saving."
    };
  }

  // Replace this demo write with prisma.product.create once DATABASE_URL is configured.
  revalidatePath("/products");
  revalidatePath("/dashboard");

  return {
    ok: true,
    message: `${parsed.data.title} saved as a compliant draft.`
  };
}

export async function duplicateProduct(productId: string) {
  // Replace with a transactional copy of Product, ProductImage, and PlatformFieldOverride.
  revalidatePath("/products");

  return {
    ok: true,
    message: `Product ${productId} duplicated as a new draft.`
  };
}
