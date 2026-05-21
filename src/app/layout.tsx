import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SessionProvider from "@/components/providers/SessionProvider";
import { COMPANY_NAME } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Premium Capacitors Supplier`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Citicap Capacitor supplies ceramic, electrolytic, SMD, polyester, paper, and industrial capacitors for electronics and electrical products across India.",
  keywords: [
    "capacitors",
    "ceramic capacitors",
    "electrolytic capacitors",
    "SMD capacitors",
    "electronics components",
    "Citicap",
  ],
  openGraph: {
    title: `${COMPANY_NAME} | Premium Capacitors Supplier`,
    description:
      "Quality capacitors for electronics and electrical applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SessionProvider>
      </body>
    </html>
  );
}
