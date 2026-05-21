import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
             <div className="mb-4">
  <Image
    src="/logo.png"
    alt="Citicap Logo"
    width={150}
    height={45}
    className="object-contain"
  />
</div>
              {/* <span className="font-bold text-brand-blue">{COMPANY_NAME}</span> */}
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Premium capacitors for electronics and electrical applications.
              Trusted quality for industries, manufacturers, and hobbyists.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-cyan-600 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="transition-colors hover:text-cyan-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-cyan-600"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-cyan-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-cyan-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-cyan-600 uppercase">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-600" />
                {COMPANY_PHONE}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-600" />
                {COMPANY_EMAIL}
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-600" />
                India — Serving clients nationwide
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
