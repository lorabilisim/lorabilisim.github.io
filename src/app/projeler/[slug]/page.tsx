import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { FadeIn, Reveal, RisingLines, Spotlight, Stagger, StaggerItem } from "@/components/motion";
import { ProcessSteps } from "@/components/process";
import { ProjectVisual } from "@/components/project-visual";
import { CtaBand } from "@/components/sections";
import { Aurora, Badge, ButtonLink, SectionHeading } from "@/components/ui";
import { getProject, projects } from "@/lib/projects";

// Sayfalar derleme anında üretilir; slug sunucuda çözülür. Bağlantılardaki prefetch
// sayfayı önceden indirdiği için geçiş yine anlıktır.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projeler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projeler/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* ---------- Başlık ---------- */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <Aurora />
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]"
        />
        <div className="wrapper relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeIn>
              <Link
                href="/projeler"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Tüm projeler
              </Link>
              <div className="mt-6">
                <Badge>{project.category}</Badge>
              </div>
            </FadeIn>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl">
              <RisingLines lines={[project.title]} delay={0.05} />
            </h1>
            <FadeIn delay={0.25}>
              <p className="mt-6 text-lg leading-relaxed text-muted">{project.lead}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-fg/[0.04] px-3 py-1 text-xs font-medium text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} y={32}>
            <ProjectVisual kind={project.visual} className="shadow-soft" />
          </FadeIn>
        </div>
      </section>

      {/* ---------- Problem / Yaklaşım ---------- */}
      <section className="border-y border-line bg-surface/40 py-20 sm:py-24">
        <div className="wrapper grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Problem</p>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">Neyi çözüyoruz?</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{project.problem}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Yaklaşım</p>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">Nasıl çözüyoruz?</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{project.approach}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Öne çıkanlar ---------- */}
      <section className="py-20 sm:py-28">
        <div className="wrapper">
          <Reveal>
            <SectionHeading align="left" eyebrow="Öne Çıkanlar" title={`${project.name} neler sunuyor?`} />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.capabilities.map((item, i) => (
              <StaggerItem key={item.title} className="h-full">
                <Spotlight className="h-full rounded-lg border border-line bg-card p-6 transition-colors duration-300 hover:border-primary/50">
                  <span className="font-display text-sm font-bold text-link">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </Spotlight>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- İş akışı ---------- */}
      <section className="border-y border-line bg-surface/40 py-20 sm:py-28">
        <div className="wrapper">
          <Reveal>
            <SectionHeading align="left" eyebrow="İş Akışı" title="Adım adım nasıl işliyor?" />
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={project.flow} />
          </div>
        </div>
      </section>

      {/* ---------- Kullanım alanları ---------- */}
      <section className="py-20 sm:py-28">
        <div className="wrapper grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Kullanım Alanları"
              title="Nerede işe yarar?"
              description="Projenin hedeflediği başlıca senaryolar."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {project.useCases.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-lg border border-line bg-card px-5 py-4 font-display text-lg font-semibold"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/15 text-link">
                    <Check aria-hidden className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {project.note && (
              <p className="mt-6 flex gap-3 rounded-lg border border-line bg-surface/60 p-4 text-sm leading-relaxed text-muted">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-link" />
                {project.note}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- Sonraki proje + çağrı ---------- */}
      <section className="pb-24">
        <div className="wrapper space-y-8">
          <Reveal>
            <Link
              href={`/projeler/${next.slug}`}
              prefetch
              className="group flex items-center justify-between gap-6 rounded-xl border border-line bg-card px-6 py-8 transition-colors duration-300 hover:border-primary/50 sm:px-10"
            >
              <span>
                <span className="eyebrow">Sıradaki Proje</span>
                <span className="mt-3 block font-display text-2xl font-extrabold sm:text-3xl">
                  {next.title}
                </span>
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-lg border border-line-strong transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                <ArrowRight aria-hidden className="size-6" />
              </span>
            </Link>
          </Reveal>
          <CtaBand
            title={`${project.name} hakkında konuşalım`}
            text="Proje hakkında daha fazla bilgi almak ya da iş birliği olanaklarını görüşmek için bize yazın."
          />
          <div className="text-center">
            <ButtonLink href="/projeler" variant="ghost" size="sm">
              Tüm projelere dön
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
