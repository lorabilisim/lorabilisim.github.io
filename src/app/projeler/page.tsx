import type { Metadata } from "next";
import { CtaBand, PageHero, ProjectGrid } from "@/components/sections";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "LoraLabs Ar-Ge projeleri: MediSeg tıbbi görüntü segmentasyonu, Kurumsal Hafıza Asistanı ve SkyLink LoRaWAN haberleşmeli otonom dron.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="İnovasyon Portfolyosu"
        title="Öne Çıkan Ar-Ge Projelerimiz"
        description="Akademik araştırmayı sahada çalışan çözümlere dönüştürdüğümüz projeler. Her biri gerçek bir problemden yola çıkıyor."
      />
      <section className="pb-24">
        <div className="wrapper">
          <ProjectGrid projects={projects} />
        </div>
      </section>
      <section className="pb-24">
        <div className="wrapper">
          <CtaBand
            title="Birlikte çalışalım"
            text="Benzer bir problem üzerinde çalışıyorsanız ya da ortak bir Ar-Ge projesi düşünüyorsanız konuşalım."
          />
        </div>
      </section>
    </>
  );
}
