"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { StatusBadge } from "@/components/app/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductExplorer({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category.split("/")[0].trim()))),
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = [product.title, product.brand, product.category, product.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = status === "all" || product.status === status;
      const matchesCategory =
        category === "all" || product.category.toLowerCase().startsWith(category.toLowerCase());

      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [category, products, query, status]);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="grid gap-3 p-4 lg:grid-cols-[1fr_180px_180px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, brand, category, or tag"
              className="pl-9"
            />
          </div>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="published">Published</option>
            <option value="sold">Sold</option>
          </select>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <Button asChild>
            <Link href="/products/new">New product</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => {
              const cover = product.images.find((image) => image.isCover) ?? product.images[0];

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Link href={`/products/${product.id}`} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-muted">
                        <Image src={cover.url} alt={cover.alt} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-56 truncate text-muted-foreground">
                    {product.category}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.stockStatus} />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(product.price)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <Badge variant="muted">No matches</Badge>
            <p className="mt-3 text-sm text-muted-foreground">
              Try a different search, status, or category filter.
            </p>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
