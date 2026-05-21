import type { Metadata } from "next";
import ProductsClient from "@/components/products/ProductsClient";
import { prisma } from "@/lib/prisma";
import type { ProductDTO } from "@/types/product";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse ceramic, electrolytic, SMD, polyester, paper, and industrial capacitors from Citicap Capacitor.",
};

export default async function ProductsPage() {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const products: ProductDTO[] = rows.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    voltage: p.voltage,
    capacity: p.capacity,
    category: p.category,
    imageUrl: p.imageUrl,
    featured: p.featured,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            Our <span className="text-gradient">Capacitor Products</span>
          </h1>
          <p className="max-w-2xl text-slate-600">
            Search and filter by category to find the right capacitor for your
            electronics or electrical application.
          </p>
        </div>

        <ProductsClient initialProducts={products} />
      </div>
    </div>
  );
}
