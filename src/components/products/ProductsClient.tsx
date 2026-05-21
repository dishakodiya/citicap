"use client";

import { useMemo, useState } from "react";
import type { ProductDTO } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

type ProductsClientProps = {
  initialProducts: ProductDTO[];
};

export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return initialProducts.filter((p) => {
      const matchesCategory = !category || p.category === category;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.voltage.toLowerCase().includes(q) ||
        p.capacity.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, search, category]);

  return (
    <>
      <ProductFilters
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <p className="mb-6 text-sm text-slate-400">
        Showing {filtered.length} of {initialProducts.length} products
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl py-16 text-center">
          <p className="text-slate-500">No products match your search.</p>
        </div>
      )}
    </>
  );
}
