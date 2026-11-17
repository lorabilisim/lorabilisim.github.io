import type { Metadata } from "next";
import { Aurora, ButtonLink } from "@/components/ui";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28 pb-20">
      <Aurora />
      <div className="wrapper relative text-center">
        <p className="text-gradient font-display text-[clamp(5rem,20vw,11rem)] font-extrabold leading-none">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Sinyal bulunamadı</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" arrow>
            Anasayfaya dön
          </ButtonLink>
          <ButtonLink href="/projeler" variant="ghost">
            Projelerimiz
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
