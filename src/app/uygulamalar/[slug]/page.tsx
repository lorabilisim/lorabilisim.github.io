import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProcessSteps } from "@/components/process";
import { AppShowcase } from "@/components/sections";
import { Aurora, GooglePlayBadge, SectionHeading } from "@/components/ui";
import { apps, getApp } from "@/lib/apps";

// Sayfalar derleme anında üretilir; slug sunucuda çözülür. Bağlantılardaki prefetch
// sayfayı önceden indirdiği için geçiş yine anlıktır.
export const instant = false;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/uygulamalar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return { title: `${app.name}: ${app.tagline}`, description: app.description };
}

export default async function AppPage({ params }: PageProps<"/uygulamalar/[slug]">) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const other = apps.find((item) => item.slug !== app.slug);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Aurora />
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
        />
        <div className="wrapper relative">
          <FadeIn>
            <Link
              href="/uygulamalar"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft aria-hidden className="size-4" />
              Tüm uygulamalar
            </Link>
          </FadeIn>
          <AppShowcase app={app} headingLevel="h1" showDetailLink={false} />
        </div>
      </section>

      <section className="border-y border-line bg-surface/40 py-20 sm:py-28">
        <div className="wrapper">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Nasıl Çalışır"
              title="Üç adımda"
              description={app.lead}
            />
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={app.steps} />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="wrapper">
          <Reveal>
            <SectionHeading eyebrow="Görseller" title={`${app.name} yakından`} />
          </Reveal>
          <Stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {app.screenshots.map((shot) => (
              <StaggerItem key={shot.src}>
                <div className="mx-auto max-w-[260px] overflow-hidden rounded-xl border border-line-strong shadow-soft transition-transform duration-500 hover:-translate-y-2">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 640px) 260px, 280px"
                    className="h-auto w-full"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-14 flex justify-center">
            <GooglePlayBadge href={app.playUrl} />
          </Reveal>
        </div>
      </section>

      {other && (
        <section className="pb-24">
          <div className="wrapper">
            <Reveal>
              <Link
                href={`/uygulamalar/${other.slug}`}
                prefetch
                className="group block rounded-xl border border-line bg-card px-6 py-8 transition-colors duration-300 hover:border-primary/50 sm:px-10"
              >
                <span className="eyebrow">Diğer Uygulamamız</span>
                <span className="mt-3 block font-display text-2xl font-extrabold sm:text-3xl">
                  {other.name}: <span className="text-gradient">{other.tagline}</span>
                </span>
                <span className="mt-3 block max-w-2xl text-muted">{other.description}</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
