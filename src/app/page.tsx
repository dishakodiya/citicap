import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { getWhatsAppUrl } from "@/lib/constants";
import type { ProductDTO } from "@/types/product";
export const runtime = "nodejs";

export const dynamic = "force-dynamic";


export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const displayProducts =
    featuredProducts.length > 0
      ? featuredProducts
      : await prisma.product.findMany({ take: 6, orderBy: { createdAt: "desc" } });

  const products: ProductDTO[] = displayProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    voltage: p.voltage,
    capacity: p.capacity,
    category: p.category,
    imageUrl: p.imageUrl,
    featured: p.featured,
    createdAt: p.createdAt.toISOString() ,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <>
      <Hero />
      <IntroSection />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold">
                Featured <span className="text-gradient">Products</span>
              </h2>
              <p className="text-slate-500">
                Explore our range of high-quality capacitors
              </p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-500"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center text-slate-500">
              Products coming soon. Contact us on WhatsApp for inquiries.
            </p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="glass glow-cyan rounded-3xl p-10">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Need Capacitors for Your Project?
            </h2>
            <p className="mb-6 text-slate-600">
              Get instant support on WhatsApp. Share your requirements and we
              will help you find the right components.
            </p>
            <Button href={getWhatsAppUrl()} variant="whatsapp">
              Contact on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
