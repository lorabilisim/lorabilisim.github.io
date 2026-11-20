import type { Metadata } from "next";
import { FlaskConical, GraduationCap, MapPin, Mountain, ShieldCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CtaBand, ExpertiseGrid, InternshipBand, PageHero } from "@/components/sections";
import { SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "LoraLabs Bilişim, akademik araştırmaları gerçek hayat problemlerine uygulayan, Iğdır Serhat Teknopark merkezli bir teknoloji Ar-Ge merkezidir.",
};

const values = [
  {
    icon: FlaskConical,
    title: "Bilimsel titizlik",
    text: "Kararlarımızı varsayıma değil, ölçüme ve literatüre dayandırırız.",
  },
  {
    icon: Mountain,
    title: "Saha odağı",
    text: "Bir çözümü ancak gerçek koşullarda çalıştığında tamamlanmış sayarız.",
  },
  {
    icon: ShieldCheck,
    title: "Veri gizliliği",
    text: "Sağlık ve kurum verisinde gizliliği tasarımın ilk adımından itibaren gözetiriz.",
  },
  {
    icon: GraduationCap,
    title: "Yetenek geliştirme",
    text: "Staj programımızla öğrencileri gerçek Ar-Ge projelerine dahil ederiz.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={
          <>
            Akademik Derinlik, <span className="text-gradient">Endüstriyel Güç</span>
          </>
        }
        description="LoraLabs Bilişim, standart çözümlerin ötesine geçerek akademik araştırmaları gerçek hayat problemlerine uygulayan bir Ar-Ge merkezidir."
      />

      {/* ---------- Hikâye ---------- */}
      <section className="pb-24">
        <div className="wrapper grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              <strong className="font-semibold text-fg">LoraLabs</strong>, Iğdır Serhat
              Teknopark&apos;ta faaliyet gösteren bir teknoloji Ar-Ge merkezidir. Çıkış noktamız
              basit: akademide üretilen bilgi, sahada bir problemi çözdüğünde değer kazanır.
            </p>
            <p>
              Bu yüzden çalışmalarımızı laboratuvarda bırakmıyoruz. Yapay zekâdan tıbbi
              görüntülemeye, sensör ağlarından otonom hava araçlarına kadar her projede bilimsel
              yöntemi, çalışan bir ürüne ulaşana kadar izliyoruz.
            </p>
            <p>
              Aynı yaklaşımı günlük hayata da taşıyoruz: geliştirdiğimiz mobil uygulamalar, aynı
              mühendislik disiplinini herkesin kullanabileceği sade deneyimlere dönüştürüyor.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-line bg-card p-8">
              <span className="grid size-12 place-items-center rounded-md bg-primary/12 text-link ring-1 ring-primary/25">
                <MapPin aria-hidden className="size-6" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold">Iğdır&apos;dan, her yere</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Ofisimiz Serhat Teknopark&apos;ta. Projelerimizi buradan yürütüyor, Türkiye&apos;nin
                her yerinden stajyer ve iş ortaklarıyla çalışıyoruz.
              </p>
              <p className="mt-6 border-t border-line pt-6 font-display font-semibold">
                {site.address}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Uzmanlık ---------- */}
      <section className="border-y border-line bg-surface/40 py-24 sm:py-28">
        <div className="wrapper">
          <Reveal>
            <SectionHeading
              eyebrow="Uzmanlık Alanları"
              title="Dört alanda derinleşiyoruz"
              description="Birbirini besleyen dört başlık: veriyi anlayan modeller, onu taşıyan ağlar ve sahaya ulaştıran sistemler."
            />
          </Reveal>
          <div className="mt-14">
            <ExpertiseGrid detailed />
          </div>
        </div>
      </section>

      {/* ---------- Değerler ---------- */}
      <section className="py-24 sm:py-28">
        <div className="wrapper">
          <Reveal>
            <SectionHeading align="left" eyebrow="Değerlerimiz" title="Nasıl çalıştığımızı belirleyen ilkeler" />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="h-full">
                <div className="h-full rounded-lg border border-line bg-card p-6">
                  <Icon aria-hidden className="size-7 text-link" />
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-12">
        <div className="wrapper">
          <InternshipBand />
        </div>
      </section>

      <section className="pb-24">
        <div className="wrapper">
          <CtaBand
            title="Birlikte üretelim"
            text="Ortak Ar-Ge projeleri, akademik iş birlikleri ve çözüm ortaklıkları için kapımız açık."
          />
        </div>
      </section>
    </>
  );
}
