import { PageHeader } from "@/components/app/page-header";
import { ProductExplorer } from "@/components/products/product-explorer";
import { demoProducts } from "@/lib/demo-data";

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        description="Search, filter, duplicate, and manage reusable product records before mapping them to marketplaces."
      />
      <ProductExplorer products={demoProducts} />
    </div>
  );
}
