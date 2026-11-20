import { ChevronDown } from "lucide-react";
import { HeroNetwork } from "@/components/hero-network";
import { Reveal } from "@/components/motion";
import { ProcessSteps } from "@/components/process";
import {
  AppShowcase,
  ContactSection,
  ExpertiseGrid,
  InternshipBand,
  ProjectGrid,
  expertise,
} from "@/components/sections";
import { Aurora, ButtonLink, SectionHeading } from "@/components/ui";
import { apps } from "@/lib/apps";
import { projects } from "@/lib/projects";

const marquee = [
  "LoRaWAN",
  "RAG",
  "Küçük Dil Modelleri",
  "Derin Öğrenme",
  "Tıbbi Görüntü Segmentasyonu",
  "Otonom İHA",
  "IoT Sensör Ağları",
  "Private Cloud",
  "Görüntü İşleme",
  "Mobil Uygulama",
];

const process = [
  {
    title: "Araştırma",
    text: "Problemi literatür ve saha verisiyle birlikte ele alır, neyin gerçekten çözülmesi gerektiğini netleştiririz.",
  },
  {
    title: "Prototip",
    text: "Fikri hızla çalışan bir prototipe dönüştürür, varsayımlarımızı erkenden sınarız.",
  },
  {
    title: "Saha Testi",
    text: "Çözümü gerçek koşullarda dener, ölçer ve aldığımız sonuçlara göre iyileştiririz.",
  },
  {
    title: "Ürün",
    text: "Doğrulanan çözümü sürdürülebilir, kullanılabilir bir ürüne taşırız.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24">
        <Aurora />
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_65%_40%,black_5%,transparent_70%)]"
        />
        <HeroNetwork className="absolute inset-0 size-full opacity-70 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:opacity-100 lg:[mask-image:radial-gradient(ellipse_75%_85%_at_68%_45%,black_35%,transparent_100%)]" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
        />

        <div className="wrapper relative">
          <div className="max-w-3xl">
            <p className="eyebrow inline-flex items-center gap-3">
              <span aria-hidden className="inline-flex size-2 rounded-full bg-cyan" />
              Teknoloji Ar-Ge Merkezi
            </p>

            <h1 className="mt-6 text-[clamp(2.7rem,8vw,5.5rem)] font-extrabold leading-[1.02]">
              <span className="block">Akademik Vizyon,</span>
              <span className="block">
                <span className="text-gradient">İleri Teknoloji</span>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Yapay Zekâ, Tıbbi Segmentasyon, Otonom Dronlar ve LoRaWAN çözümleriyle bilimsel
              araştırmaları sahada çalışan Ar-Ge projelerine dönüştürüyoruz.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/iletisim" arrow>
                Bize Ulaşın
              </ButtonLink>
              <ButtonLink href="/projeler" variant="ghost">
                Projelerimiz
              </ButtonLink>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {expertise.map(({ icon: Icon, title }) => (
                <li key={title} className="inline-flex items-center gap-2">
                  <Icon aria-hidden className="size-4 text-link" />
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#hakkimizda"
          aria-label="Aşağı kaydır"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-fg sm:block"
        >
          <ChevronDown aria-hidden className="size-6" />
        </a>
      </section>

      {/* ---------- Teknoloji şeridi ---------- */}
      <div
        aria-hidden
        className="overflow-hidden border-y border-line bg-surface/50 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted"
            >
              {item}
              <span className="size-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Hakkımızda ---------- */}
      <section id="hakkimizda" className="py-24 sm:py-32">
        <div className="wrapper grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Hakkımızda"
              title={
                <>
                  Akademik Derinlik, <span className="text-gradient">Endüstriyel Güç</span>
                </>
              }
              description="LoraLabs Bilişim, standart çözümlerin ötesine geçerek akademik araştırmaları gerçek hayat problemlerine uygulayan bir Ar-Ge merkezidir."
            />
            <ButtonLink href="/hakkimizda" variant="ghost" arrow className="mt-8">
              Bizi tanıyın
            </ButtonLink>
          </Reveal>
          <ExpertiseGrid />
        </div>
      </section>

      {/* ---------- Projeler ---------- */}
      <section id="projeler" className="relative border-y border-line bg-surface/40 py-24 sm:py-32">
        <div className="wrapper">
          <Reveal>
            <SectionHeading
              eyebrow="İnovasyon Portfolyosu"
              title="Öne Çıkan Ar-Ge Projelerimiz"
              description="Sağlıktan afet yönetimine, kurumsal yapay zekâdan sensör ağlarına uzanan çalışmalarımız."
            />
          </Reveal>
          <div className="mt-14">
            <ProjectGrid projects={projects} />
          </div>
        </div>
      </section>

      {/* ---------- Yaklaşım ---------- */}
      <section className="py-24 sm:py-32">
        <div className="wrapper">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Nasıl Çalışıyoruz"
              title={
                <>
                  Araştırmadan <span className="text-gradient">Sahaya</span>
                </>
              }
              description="Her proje aynı yolu izler: akademik bir soruyla başlar, sahada çalışan bir çözümle biter."
            />
          </Reveal>
          <div className="mt-16">
            <ProcessSteps steps={process} />
          </div>
        </div>
      </section>

      {/* ---------- Mobil uygulamalar ---------- */}
      <section id="uygulamalar" className="relative overflow-hidden border-y border-line bg-surface/40 py-24 sm:py-32">
        <Aurora className="opacity-60" />
        <div className="wrapper relative">
          <Reveal>
            <SectionHeading
              eyebrow="Mobil Portfolyo"
              title={
                <>
                  Akıllı Çözümler <span className="text-gradient">Her An Yanınızda</span>
                </>
              }
              description="Akademik vizyonumuzu kullanıcı dostu mobil deneyimlerle birleştirerek hayatı kolaylaştıran uygulamalar geliştiriyoruz."
            />
          </Reveal>
          <div className="mt-20 space-y-28">
            {apps.map((app, i) => (
              <AppShowcase key={app.slug} app={app} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Staj ---------- */}
      <section className="py-24">
        <div className="wrapper">
          <InternshipBand />
        </div>
      </section>

      {/* ---------- İletişim ---------- */}
      <section id="iletisim" className="border-t border-line bg-surface/40 py-24 sm:py-32">
        <div className="wrapper">
          <ContactSection />
        </div>
      </section>
    </>
  );
}
