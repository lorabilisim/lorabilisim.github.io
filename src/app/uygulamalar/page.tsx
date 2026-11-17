import type { Metadata } from "next";
import { AppShowcase, CtaBand, PageHero } from "@/components/sections";
import { apps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Mobil Uygulamalar",
  description:
    "LoraLabs mobil uygulamaları: galeri temizliğini kolaylaştıran Sweepy ve yapay zekâ destekli sınav hazırlık arkadaşı KPSS Koç.",
};

export default function AppsPage() {
  return (
    <>
      <PageHero
        eyebrow="Mobil Portfolyo"
        title={
          <>
            Akıllı Çözümler <span className="text-gradient">Her An Yanınızda</span>
          </>
        }
        description="Akademik vizyonumuzu kullanıcı dostu mobil deneyimlerle birleştirerek hayatı kolaylaştıran uygulamalar geliştiriyoruz."
      />
      <section className="pb-24 sm:pb-32">
        <div className="wrapper space-y-28">
          {apps.map((app, i) => (
            <AppShowcase key={app.slug} app={app} reverse={i % 2 === 1} headingLevel="h2" />
          ))}
        </div>
      </section>
      <section className="pb-24">
        <div className="wrapper">
          <CtaBand
            title="Bir uygulama fikriniz mi var?"
            text="Mobil ürün geliştirme ve iş birlikleri için bizimle iletişime geçin."
          />
        </div>
      </section>
    </>
  );
}
