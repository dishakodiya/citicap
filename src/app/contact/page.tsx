import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Button from "@/components/ui/Button";
import {
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE,
  getWhatsAppUrl,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${COMPANY_NAME} for capacitor inquiries via form, WhatsApp, or email.`,
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="mx-auto max-w-xl text-slate-600">
            Have questions about our capacitors? Reach out via the form below or
            connect instantly on WhatsApp.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-6 text-lg font-semibold">Get in Touch</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">WhatsApp</p>
                    <p className="font-medium">{COMPANY_PHONE}</p>
                    <Button
                      href={getWhatsAppUrl()}
                      variant="whatsapp"
                      className="mt-3 px-4 py-2 text-xs"
                    >
                      Chat on WhatsApp
                    </Button>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium">{COMPANY_PHONE}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="font-medium text-cyan-600 hover:underline"
                    >
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="mb-2 font-semibold">Business Hours</h3>
              <p className="text-sm text-slate-500">
                Monday – Saturday: 9:00 AM – 7:00 PM IST
              </p>
              <p className="mt-1 text-sm text-slate-500">
                WhatsApp inquiries answered promptly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
