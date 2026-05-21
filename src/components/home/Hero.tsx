"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Button from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="grid-pattern absolute inset-0 opacity-50" />
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-medium text-cyan-700">
              <Cpu size={14} />
              Premium Electronic Components
            </span>

            <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Power Your Circuits with{" "}
              <span className="text-gradient">Quality Capacitors</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
              Citicap Capacitor supplies ceramic, electrolytic, SMD, polyester,
              paper, and industrial capacitors for electronics manufacturers,
              repair professionals, and electrical projects across India.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="/products">
                Browse Products
                <ArrowRight size={18} />
              </Button>
              <Button href={getWhatsAppUrl()} variant="whatsapp">
                Contact on WhatsApp
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="glass glow-cyan animate-float relative aspect-square max-w-md rounded-3xl p-8">
              <div className="absolute inset-4 rounded-2xl border border-cyan-200" />
              <div className="flex h-full flex-col items-center justify-center gap-6">
                <div className="grid grid-cols-3 gap-3">
                  {["Ceramic", "Electrolytic", "SMD", "Polyester", "Paper", "Industrial"].map(
                    (cat) => (
                      <div
                        key={cat}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs text-slate-600"
                      >
                        {cat}
                      </div>
                    )
                  )}
                </div>
                <p className="text-center text-sm text-slate-500">
                  6 capacitor categories • Bulk & retail orders
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
