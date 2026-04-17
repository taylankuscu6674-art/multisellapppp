import { PageHeader } from "@/components/app/page-header";
import { ProductForm } from "@/components/products/product-form";
import { saveProductDraft } from "@/server/actions/products";

export default function NewProductPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Create"
        title="New product"
        description="Upload photos once, add reusable product details, generate copy, and save a draft for marketplace review."
      />
      <ProductForm action={saveProductDraft} />
    </div>
  );
}
