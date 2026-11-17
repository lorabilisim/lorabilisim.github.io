import type { Metadata } from "next";
import { BrainCircuit, ExternalLink, GraduationCap, Info, MapPinned, RadioTower } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Staj Başvurusu",
  description:
    "LoraLabs Ar-Ge merkezinde gerçek projelerle deneyim kazanın. Üniversitelerin 2, 3 ve 4. sınıf öğrencileri için staj programı ve başvuru formu.",
};

const facts = [
  {
    icon: GraduationCap,
    title: "Kimler başvurabilir?",
    text: "Üniversitelerin 2, 3 ve 4. sınıf öğrencileri.",
  },
  {
    icon: MapPinned,
    title: "Nereden?",
    text: "Türkiye'nin her yerinden stajyer kabul ediyoruz.",
  },
  {
    icon: BrainCircuit,
    title: "Hangi alanlarda?",
    text: "RAG, yapay zekâ ve IoT projelerinde.",
  },
  {
    icon: RadioTower,
    title: "Ne kazanırsınız?",
    text: "Gerçek Ar-Ge projelerinde uygulamalı deneyim.",
  },
];

export default function InternshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Kariyer & Gelecek"
        title="Staj Olanakları ve Başvuru"
        description="LoraLabs Ar-Ge merkezinde gerçek projelerle deneyim kazanarak geleceğin teknolojilerine yön verin."
      />

      <section className="pb-16">
        <div className="wrapper">
          <Reveal>
            <div className="rounded-xl border border-line bg-card p-6 sm:p-10">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Geleceğin Mühendislerini Arıyoruz
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
                Türkiye&apos;nin her yerinden stajyer kabul ediyoruz. Üniversitelerin 2, 3 ve 4.
                sınıflarına yönelik bu programı kaçırmayın. Gerçek projelerde deneyim kazanmak,
                akademik bilgilerinizi RAG, AI ve IoT projelerinde hayata geçirmek için aşağıdaki
                formu doldurarak başvurunuzu bize iletebilirsiniz.
              </p>
              <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map(({ icon: Icon, title, text }) => (
                  <StaggerItem key={title} className="h-full">
                    <div className="h-full rounded-lg border border-line bg-surface/60 p-5">
                      <Icon aria-hidden className="size-6 text-link" />
                      <h3 className="mt-4 font-semibold">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="basvuru" className="pb-24">
        <div className="wrapper">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-3 text-sm text-muted">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
                Başvuru için Google hesabınızla giriş yapmanız gerekmektedir.
              </p>
              <a
                href={site.internshipForm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-link hover:underline"
              >
                Formu yeni sekmede aç
                <ExternalLink aria-hidden className="size-4" />
              </a>
            </div>
            {/* Google Forms kendi açık temasıyla gelir; çerçeve bu yüzden her temada beyaz. */}
            <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-soft">
              <iframe
                src={site.internshipForm}
                title="LoraLabs staj başvuru formu"
                loading="lazy"
                className="block h-[1640px] w-full border-0"
              >
                Yükleniyor…
              </iframe>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
