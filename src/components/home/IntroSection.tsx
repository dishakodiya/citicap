"use client";

import { motion } from "framer-motion";
import { Award, Package, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Wide Range",
    desc: "Ceramic, electrolytic, SMD, polyester, paper & industrial capacitors.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "Components tested for reliability in demanding electronic applications.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Quick dispatch across India for bulk and individual orders.",
  },
  {
    icon: Award,
    title: "Expert Support",
    desc: "Technical guidance to help you choose the right capacitor specs.",
  },
];

export default function IntroSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Your Trusted <span className="text-gradient">Capacitor Partner</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            At Citicap Capacitor, we specialize in supplying high-quality
            capacitors for consumer electronics, industrial machinery, power
            systems, and DIY projects. Whether you need a single component or
            bulk inventory, we deliver with precision and care.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center transition-colors hover:border-cyan-300"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <item.icon size={24} />
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
