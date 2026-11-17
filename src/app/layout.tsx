import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { site } from "@/lib/site";
import "./globals.css";

// latin-ext: ğ, ş, ı, İ gibi Türkçe karakterler bu alt kümede.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // Başlık ve açıklama burada tekrarlanmıyor: alt sayfalar bu nesneyi devralır ve
  // paylaşım önizlemeleri her sayfanın kendi <title>/description değerine düşer.
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#020617" };

// Kaydedilmiş tema tercihini ilk boyamadan önce uygular (koyu tema varsayılan).
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Serhat Teknopark, No: 323/2",
    addressLocality: "Iğdır",
    addressCountry: "TR",
  },
  sameAs: [site.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* JavaScript kapalıysa animasyonla gizlenen içerik görünür kalsın. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <a
            href="#icerik"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            İçeriğe geç
          </a>
          <ScrollProgress />
          <Header />
          <main id="icerik" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
