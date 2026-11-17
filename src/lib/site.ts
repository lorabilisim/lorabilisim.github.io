export const site = {
  name: "LoraLabs",
  legalName: "LoraLabs Bilişim Yazılım Teknolojileri",
  url: "https://lorabilisim.com",
  title: "LoraLabs | Akademik Vizyon, İleri Teknoloji",
  description:
    "Yapay zekâ, tıbbi görüntü segmentasyonu, otonom dronlar ve LoRaWAN çözümleriyle bilimsel araştırmaları sahada çalışan Ar-Ge projelerine dönüştürüyoruz.",
  tagline:
    "Akademik bilgi birikimini yenilikçi teknolojilerle birleştirerek geleceğin akıllı sistemlerini inşa ediyoruz.",
  email: "bilge@lorabilisim.com",
  phone: "+90 537 475 90 42",
  phoneHref: "tel:+905374759042",
  address: "Serhat Teknopark, No: 323/2, Iğdır",
  github: "https://github.com/lorabilisim",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98072.27064853944!2d43.99946464945454!3d39.8124095617356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406b2fab2a184fc9%3A0x3221cb3bac043e25!2sLoraLabs%20Bili%C5%9Fim%20Yaz%C4%B1l%C4%B1m%20Teknolojileri!5e0!3m2!1str!2str!4v1763994127459!5m2!1str!2str",
  internshipForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSdcYJRujt6v40eCYJiWm5z-cQEYG4D8cRHhelIKvxmygboyog/viewform?usp=dialog",
  year: 2026,
} as const;

export const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/projeler", label: "Projeler" },
  { href: "/uygulamalar", label: "Mobil Uygulamalar" },
  { href: "/staj", label: "Staj" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const legalNav = [
  { href: "/kvkk", label: "KVKK Aydınlatma" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
] as const;
