import type { Metadata } from "next";
import { ContactSection, InternshipBand } from "@/components/sections";
import { Aurora } from "@/components/ui";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "LoraLabs ile iletişime geçin: Serhat Teknopark, Iğdır. Projeler, iş birlikleri ve kariyer fırsatları için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
        <Aurora />
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
        />
        <div className="wrapper relative">
          <ContactSection headingLevel="h1" />
        </div>
      </section>
      <section className="pb-24">
        <div className="wrapper">
          <InternshipBand />
        </div>
      </section>
    </>
  );
}
