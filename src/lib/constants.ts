import { Category } from "@prisma/client";

export const WHATSAPP_NUMBER = "918511131666";
export const WHATSAPP_MESSAGE =
  "Hello, I want information about your capacitor products.";
export const COMPANY_EMAIL = "info@citicapcapacitor.com";
export const COMPANY_PHONE = "+91 85111 31666";
export const COMPANY_NAME = "Citicap Capacitor";

export const CATEGORY_LABELS: Record<Category, string> = {
  CERAMIC: "Ceramic Capacitors",
  ELECTROLYTIC: "Electrolytic Capacitors",
  POLYESTER: "Polyester Capacitors",
  SMD: "SMD Capacitors",
  PAPER: "Paper Capacitors",
  INDUSTRIAL: "Industrial Capacitors",
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message ?? WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function formatCategory(category: Category) {
  return CATEGORY_LABELS[category];
}
