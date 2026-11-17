import { FadeIn } from "./motion";
import { PageHero } from "./sections";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

/** KVKK, gizlilik ve kullanım şartları sayfalarının ortak düzeni. */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Kurumsal" title={title} description={intro} />
      <section className="pb-24">
        <FadeIn delay={0.3} className="wrapper">
          <article className="max-w-3xl">
            <p className="text-sm text-muted">Son güncelleme: {updated}</p>
            {sections.map((section, i) => (
              <section key={section.heading} className="mt-10">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {i + 1}. {section.heading}
                </h2>
                {section.paragraphs?.map((text) => (
                  <p key={text} className="mt-4 leading-relaxed text-muted">
                    {text}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-primary">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </FadeIn>
      </section>
    </>
  );
}
