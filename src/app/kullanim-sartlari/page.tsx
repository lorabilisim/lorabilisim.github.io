import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "LoraLabs internet sitesi kullanım şartları.",
};

const sections: LegalSection[] = [
  {
    heading: "Kapsam",
    paragraphs: [
      `Bu şartlar, ${site.legalName} ("LoraLabs") tarafından işletilen lorabilisim.com internet sitesinin kullanımına ilişkindir. Siteyi kullanarak bu şartları kabul etmiş sayılırsınız.`,
    ],
  },
  {
    heading: "Fikri Mülkiyet",
    paragraphs: [
      "Sitede yer alan metinler, görseller, logolar, tasarımlar ve yazılımlar LoraLabs'a veya lisans verenlerine aittir. Bu içerikler, önceden yazılı izin alınmadan kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.",
    ],
  },
  {
    heading: "İçeriğin Niteliği",
    paragraphs: [
      "Sitedeki bilgiler genel bilgilendirme amacıyla sunulur ve önceden haber verilmeksizin değiştirilebilir. Projelere ilişkin açıklamalar Ar-Ge çalışmalarımızı tanıtmak içindir; herhangi bir taahhüt veya garanti niteliği taşımaz.",
      "Sağlık alanındaki projelerimize dair içerikler tıbbi tavsiye değildir ve tanı ya da tedavi amacıyla kullanılamaz.",
    ],
  },
  {
    heading: "Dış Bağlantılar",
    paragraphs: [
      "Site, üçüncü taraflara ait sitelere bağlantılar içerebilir. Bu sitelerin içeriği ve uygulamaları üzerinde LoraLabs'ın denetimi yoktur.",
    ],
  },
  {
    heading: "Sorumluluğun Sınırı",
    paragraphs: [
      "LoraLabs, sitenin kesintisiz veya hatasız çalışacağını taahhüt etmez. Sitenin kullanımından veya kullanılamamasından doğabilecek doğrudan ya da dolaylı zararlardan, mevzuatın izin verdiği ölçüde sorumlu tutulamaz.",
    ],
  },
  {
    heading: "Değişiklikler",
    paragraphs: [
      "Bu şartlar gerektiğinde güncellenebilir. Güncel metin bu sayfada yayımlandığı andan itibaren geçerlidir.",
    ],
  },
  {
    heading: "Uygulanacak Hukuk",
    paragraphs: ["Bu şartların yorumlanmasında ve uygulanmasında Türkiye Cumhuriyeti hukuku geçerlidir."],
  },
  {
    heading: "İletişim",
    paragraphs: [`Kullanım şartlarıyla ilgili sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Şartları"
      intro="Bu internet sitesini kullanırken geçerli olan koşullar."
      updated="Kasım 2026"
      sections={sections}
    />
  );
}
