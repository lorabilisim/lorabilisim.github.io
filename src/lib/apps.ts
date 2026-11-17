import {
  Bot,
  ChartPie,
  Layers,
  Lock,
  Medal,
  Timer,
  Video,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type MobileApp = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  lead: string;
  features: { icon: LucideIcon; title: string; text: string }[];
  steps: { title: string; text: string }[];
  screenshots: { src: string; width: number; height: number; alt: string }[];
  playUrl: string;
};

export const apps: MobileApp[] = [
  {
    slug: "sweepy",
    name: "Sweepy",
    tagline: "Zahmetsiz Düzen",
    category: "Yardımcı Araçlar",
    description:
      "Telefonunuzda yer kalmadı mı? Sweepy, galeri temizliğini eğlenceli bir oyuna dönüştürerek GB'larca alanı saniyeler içinde geri kazanmanızı sağlar.",
    lead: "Binlerce fotoğraf ve video arasında kaybolmadan galerinizi toparlayın. Sweepy, ayıklama işini tek parmakla yapılan hızlı bir kaydırma hareketine indirir.",
    features: [
      {
        icon: WandSparkles,
        title: "Akıllı Ayıklama",
        text: "Sağa kaydır sakla, sola kaydır sil. Hızlı ve sezgisel.",
      },
      {
        icon: Layers,
        title: "Dosya Yöneticisi",
        text: "Sadece silmez, albümlerinizi de kolayca düzenler.",
      },
      {
        icon: Video,
        title: "Video Kompresör",
        text: "Kaliteyi bozmadan videoları %90'a kadar küçültür.",
      },
      {
        icon: Lock,
        title: "Gizli Kasa",
        text: "Özel dosyalarınız için şifreli, çevrimdışı güvenlik.",
      },
    ],
    steps: [
      { title: "Galerini aç", text: "Sweepy fotoğraf ve videolarını sırayla önüne getirir." },
      { title: "Kaydırarak ayıkla", text: "Saklamak için sağa, silmek için sola kaydır." },
      { title: "Alanı geri kazan", text: "Gereksizleri sil, büyük videoları sıkıştır." },
    ],
    screenshots: [
      {
        src: "/apps/sweepy1.png",
        width: 404,
        height: 718,
        alt: "Sweepy video sıkıştırma tanıtım görseli: 1 GB video 100 MB'a iniyor",
      },
      { src: "/apps/sweepy2.png", width: 404, height: 718, alt: "Sweepy tanıtım görseli 2" },
      { src: "/apps/sweepy3.png", width: 404, height: 718, alt: "Sweepy tanıtım görseli 3" },
    ],
    playUrl: "https://play.google.com/store/apps/details?id=com.loraapps.sweepit",
  },
  {
    slug: "kpss-koc",
    name: "KPSS Koç",
    tagline: "Dijital Mentor",
    category: "Eğitim Teknolojileri",
    description:
      "Sınav hazırlık sürecini yapay zeka ile kişiselleştirin. Akıllı zaman takibi ve analizlerle rakiplerinizin önüne geçin.",
    lead: "KPSS Koç, çalışma sürenizi takip eden, sorularınızı yanıtlayan ve eksiklerinizi gösteren kişisel bir hazırlık arkadaşıdır.",
    features: [
      {
        icon: Bot,
        title: "AI Asistan",
        text: "7/24 yanınızda olan, sorularınızı yanıtlayan yapay zeka.",
      },
      {
        icon: Timer,
        title: "Arka Plan Sayaç",
        text: "Uygulama kapalıyken bile kesintisiz çalışma takibi.",
      },
      {
        icon: Medal,
        title: "XP & Seviye",
        text: "Çalışmayı bir oyuna dönüştüren motivasyon sistemi.",
      },
      {
        icon: ChartPie,
        title: "Derin Analiz",
        text: "Gelişmiş istatistiklerle eksiklerinizi anında görün.",
      },
    ],
    steps: [
      { title: "Çalışmaya başla", text: "Sayacı başlat; süren arka planda da işlemeye devam eder." },
      { title: "Takıldığında sor", text: "AI asistan sorularını istediğin an yanıtlar." },
      { title: "Eksiğini gör", text: "İstatistikler hangi konuya ağırlık vermen gerektiğini gösterir." },
    ],
    screenshots: [
      {
        src: "/apps/kpsskoc1.png",
        width: 321,
        height: 716,
        alt: "KPSS Koç tanıtım görseli: hap bilgiler, soru kartları ve AI destekli pratik",
      },
      { src: "/apps/kpsskoc2.png", width: 321, height: 716, alt: "KPSS Koç tanıtım görseli 2" },
      { src: "/apps/kpsskoc0.png", width: 321, height: 716, alt: "KPSS Koç tanıtım görseli 3" },
    ],
    playUrl: "https://play.google.com/store/apps/details?id=com.loraapps.kpss",
  },
];

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug);
}
