import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Mail,
  MapPin,
  Phone,
  RadioTower,
  ScanLine,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { MobileApp } from "@/lib/apps";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { ProjectVisual } from "./project-visual";
import { ScreenshotDeck } from "./screenshot-deck";
import { Aurora, Badge, ButtonLink, GooglePlayBadge, SectionHeading } from "./ui";

export const expertise: { icon: LucideIcon; title: string; text: string; long: string }[] = [
  {
    icon: BrainCircuit,
    title: "Yapay Zeka & LLM",
    text: "SLM ve RAG mimarileri ile kurumsal yapay zeka sistemleri.",
    long: "Kurumların kendi verisiyle, kendi altyapısında çalışan dil modeli çözümleri geliştiriyoruz. Küçük dil modelleri (SLM) ve RAG mimarisiyle yanıtları kaynağa dayandırıyor, veriyi kurum içinde tutuyoruz.",
  },
  {
    icon: ScanLine,
    title: "Tıbbi Bilişim",
    text: "Medikal görüntü işleme ve segmentasyon çözümleri.",
    long: "MR ve BT gibi medikal görüntülerde derin öğrenme tabanlı segmentasyon üzerine çalışıyoruz. Hedefimiz hekimin tekrarlayan iş yükünü azaltan, karar destek niteliğinde araçlar üretmek.",
  },
  {
    icon: RadioTower,
    title: "IoT & LoRaWAN",
    text: "Uzun menzilli düşük güç tüketimli sensör ağları.",
    long: "Kapsamanın zayıf olduğu geniş alanlarda, pille uzun süre çalışabilen sensör ağları kuruyoruz. LoRaWAN sayesinde veriyi düşük enerjiyle uzak mesafelere taşıyoruz.",
  },
  {
    icon: Send,
    title: "Otonom Sistemler",
    text: "Afet müdahalesi için otonom İHA ve dron altyapıları.",
    long: "Altyapının devre dışı kaldığı anlarda sahadan bilgi taşıyabilen otonom hava araçları geliştiriyoruz. Odağımız afet müdahalesi ve haberleşmenin sürekliliği.",
  },
];

/* ---------- İç sayfa başlığı ---------- */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <Aurora />
      <div
        aria-hidden
        className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
      />
      <div className="wrapper relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/* ---------- Uzmanlık kartları ---------- */
export function ExpertiseGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {expertise.map(({ icon: Icon, title, text, long }) => (
        <StaggerItem key={title} className="h-full">
          <div className="h-full rounded-lg border border-line bg-card p-6 transition-colors duration-300 hover:border-primary/50">
            <span className="grid size-12 place-items-center rounded-md bg-gradient-to-br from-primary/25 to-accent/20 text-link ring-1 ring-primary/30">
              <Icon aria-hidden className="size-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{detailed ? long : text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------- Proje kartı ---------- */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projeler/${project.slug}`}
      prefetch
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_70px_-30px_var(--glow)]"
    >
      <ProjectVisual kind={project.visual} />
      <div className="flex flex-1 flex-col p-4 pt-6">
        <Badge className="self-start">{project.category}</Badge>
        <h3 className="mt-4 text-xl font-semibold leading-snug">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-link">
          Detaylar
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <StaggerItem key={project.slug} className="h-full">
          <ProjectCard project={project} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------- Mobil uygulama tanıtımı ---------- */
export function AppShowcase({
  app,
  reverse = false,
  headingLevel = "h3",
  showDetailLink = true,
}: {
  app: MobileApp;
  reverse?: boolean;
  headingLevel?: "h1" | "h2" | "h3";
  showDetailLink?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        <ScreenshotDeck shots={app.screenshots} name={app.name} />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="eyebrow">{app.category}</p>
        <Heading className="mt-4 text-3xl font-extrabold sm:text-4xl">
          {app.name}: <span className="text-gradient">{app.tagline}</span>
        </Heading>
        <p className="mt-5 text-lg leading-relaxed text-muted">{app.description}</p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {app.features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/12 text-link ring-1 ring-primary/25">
                <Icon aria-hidden className="size-5" />
              </span>
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <GooglePlayBadge href={app.playUrl} />
          {showDetailLink && (
            <ButtonLink href={`/uygulamalar/${app.slug}`} variant="ghost" arrow prefetch>
              Uygulamayı incele
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Staj çağrısı ---------- */
export function InternshipBand() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 via-surface to-accent/20 px-6 py-12 sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Kariyer & Gelecek</p>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Geleceğin Mühendislerini Arıyoruz
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              LoraLabs Ar-Ge merkezinde gerçek projelerle deneyim kazanın. Türkiye&apos;nin her
              yerinden, üniversitelerin 2, 3 ve 4. sınıf öğrencilerini stajyer olarak kabul ediyoruz.
            </p>
          </div>
          <ButtonLink href="/staj" arrow className="shrink-0 self-start lg:self-center">
            Staj Başvurusu
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- İletişim ---------- */
export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const rows = [
    { icon: MapPin, label: "Ofis", value: site.address, href: undefined },
    { icon: Mail, label: "E-posta", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Telefon", value: site.phone, href: site.phoneHref },
  ];
  return (
    <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <p className="eyebrow">İletişim</p>
        <Heading className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
          Geleceği Birlikte <span className="text-gradient">İnşa Edelim</span>
        </Heading>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Projelerimiz, iş birlikleri veya kariyer fırsatları için bize ulaşın.
        </p>
        <ul className="mt-10 space-y-4">
          {rows.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary/12 text-link ring-1 ring-primary/25">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {label}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold">{value}</span>
                </span>
              </>
            );
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    className="flex items-center gap-4 rounded-lg border border-line bg-card p-4 transition-colors duration-300 hover:border-primary/50"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-lg border border-line bg-card p-4">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className="min-h-[360px]">
        <div className="h-full min-h-[360px] overflow-hidden rounded-xl border border-line bg-surface">
          <iframe
            src={site.mapEmbed}
            title="LoraLabs ofis konumu — Serhat Teknopark, Iğdır"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-frame size-full min-h-[360px] border-0"
            allowFullScreen
          />
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Sayfa sonu çağrısı ---------- */
export function CtaBand({
  title,
  text,
  href = "/iletisim",
  label = "Bize Ulaşın",
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
        <Aurora />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>
          <ButtonLink href={href} arrow className="mt-8">
            {label}
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}

export { SectionHeading };
