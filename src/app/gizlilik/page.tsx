import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "LoraLabs internet sitesi gizlilik politikası.",
};

const sections: LegalSection[] = [
  {
    heading: "Kapsam",
    paragraphs: [
      `Bu politika, ${site.legalName} ("LoraLabs") tarafından işletilen lorabilisim.com internet sitesini kapsar. Mobil uygulamalarımızın gizlilik politikaları, ilgili uygulamanın Google Play sayfasında ayrıca yer alır.`,
    ],
  },
  {
    heading: "Topladığımız Bilgiler",
    paragraphs: [
      "Siteyi gezmek için hesap oluşturmanız veya kişisel bilgi paylaşmanız gerekmez. Yalnızca bizimle e-posta ya da telefonla iletişime geçtiğinizde veya staj başvuru formunu doldurduğunuzda paylaştığınız bilgiler tarafımıza ulaşır.",
    ],
  },
  {
    heading: "Çerezler ve Yerel Depolama",
    paragraphs: [
      "Site, reklam veya izleme amaçlı çerez kullanmaz. Yalnızca seçtiğiniz açık/koyu tema tercihi, bir sonraki ziyaretinizde hatırlanması için tarayıcınızın yerel depolama alanında saklanır; bu bilgi sunucularımıza gönderilmez.",
    ],
  },
  {
    heading: "Üçüncü Taraf İçerikleri",
    paragraphs: [
      "Sitede üçüncü taraflarca sağlanan gömülü içerikler bulunur. Bu içerikler görüntülendiğinde ilgili sağlayıcı kendi çerezlerini kullanabilir ve kendi gizlilik politikası geçerli olur:",
    ],
    list: [
      "İletişim bölümündeki harita: Google Haritalar",
      "Staj başvuru formu: Google Forms",
    ],
  },
  {
    heading: "Dış Bağlantılar",
    paragraphs: [
      "Sitede Google Play ve GitHub gibi dış sitelere bağlantılar yer alır. Bu sitelerin içeriğinden ve gizlilik uygulamalarından LoraLabs sorumlu değildir.",
    ],
  },
  {
    heading: "Bilgilerin Korunması",
    paragraphs: [
      "Bize ilettiğiniz bilgileri yalnızca iletilme amacı doğrultusunda kullanır, yetkisiz erişime karşı makul teknik ve idari tedbirleri alırız. Kişisel verilerin işlenmesine ilişkin ayrıntılar KVKK Aydınlatma Metni'nde yer alır.",
    ],
  },
  {
    heading: "Değişiklikler",
    paragraphs: [
      "Bu politika gerektiğinde güncellenebilir. Güncel metin her zaman bu sayfada yayımlanır.",
    ],
  },
  {
    heading: "İletişim",
    paragraphs: [`Gizlilikle ilgili sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      intro="Bu siteyi ziyaret ettiğinizde hangi bilgilerin işlendiğini ve nasıl korunduğunu açıklar."
      updated="Kasım 2026"
      sections={sections}
    />
  );
}
