"use client";

import Image from "next/image";
import { Zap, Battery } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductDTO } from "@/types/product";
import { formatCategory, getWhatsAppUrl } from "@/lib/constants";
import Button from "@/components/ui/Button";

type ProductCardProps = {
  product: ProductDTO;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const inquiryMessage = `Hello, I want information about "${product.name}" (${product.voltage}, ${product.capacity}).`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 p-3 sm:p-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain object-center p-1 transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="p-3 sm:p-4">
        <span className="mb-2 inline-block rounded-md border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-medium text-cyan-700 sm:text-xs">
          {formatCategory(product.category)}
        </span>

        <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-cyan-600 sm:text-base">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs text-slate-500 sm:text-sm">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <span className="flex items-center gap-1 text-slate-600">
              <Zap size={12} className="shrink-0 text-cyan-600" />
              {product.voltage}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Battery size={12} className="shrink-0 text-cyan-600" />
              {product.capacity}
            </span>
          </div>

          <Button
            href={getWhatsAppUrl(inquiryMessage)}
            variant="secondary"
            className="shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-medium sm:text-xs"
          >
            Inquiry
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
