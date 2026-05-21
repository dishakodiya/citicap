import type { Metadata } from "next";
import Image from "next/image";
import { Target, Users, Zap } from "lucide-react";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${COMPANY_NAME} — your trusted partner for quality capacitors.`,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
            About <span className="text-gradient">{COMPANY_NAME}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600">
            Delivering reliable capacitor solutions for the electronics and
            electrical industry since day one.
          </p>
        </div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="glass relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/logo.png"
              alt="Citicap Capacitor"
              fill
              className="object-contain p-12"
            />
          </div>
          <div className="space-y-4 leading-relaxed text-slate-600">
            <p>
              <strong className="text-slate-900">{COMPANY_NAME}</strong> is a
              specialized supplier of capacitors for electronics manufacturers,
              repair shops, educational institutions, and electrical contractors.
            </p>
            <p>
              We stock a comprehensive range including ceramic, electrolytic,
              polyester film, SMD, paper dielectric, and heavy-duty industrial
              capacitors — each selected for performance and durability.
            </p>
            <p>
              Our mission is to make quality components accessible with expert
              guidance, competitive pricing, and responsive customer support via
              WhatsApp and direct inquiry.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "Provide dependable capacitor solutions that power innovation in electronics.",
            },
            {
              icon: Zap,
              title: "Our Vision",
              desc: "Become India's most trusted name in capacitor distribution and technical support.",
            },
            {
              icon: Users,
              title: "Our Values",
              desc: "Quality, transparency, and customer-first service in every transaction.",
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <item.icon size={24} />
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
