"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    // <header className="fixed top-0 z-50 w-full overflow-visible border-b border-slate-200 bg-white/90 backdrop-blur-xl">
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
  <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3">
        {/* <span className="relative inline-flex h-10 w-[100px] shrink-0 items-center"> */}
        <span className="flex items-center shrink-0">
          {/* <Image
              src="/logo.png"
              alt="Citicap Capacitor Logo"
              width={100}
              height={100}
              className="absolute top-1/2 left-0 size-[100px] -translate-y-1/2 object-contain object-left"
              priority
            /> */}
          <Image
            src="/logo.png"
            alt="Citicap Capacitor Logo"
            width={160}
            height={45}
            className="object-contain"
            priority
          />
        </span>
        {/* <div className="hidden sm:block">
            <span className="text-sm font-bold tracking-wide text-brand-blue sm:text-base">
              citicap
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-slate-500 uppercase">
              capacitor
            </span>
          </div> */}
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-cyan-600 ${pathname === link.href ? "text-cyan-600" : "text-slate-600"
              }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/admin/login"
          className="text-xs text-slate-400 transition-colors hover:text-slate-600"
        >
          Admin
        </Link>
      </div>

      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${pathname === link.href
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
