# LoraLabs Web Sitesi

[lorabilisim.com](https://lorabilisim.com) için Next.js (App Router) + Tailwind CSS + Motion ile yazılmış kurumsal site.

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi
npm run start   # derlenmiş siteyi çalıştırır
```

## İçerik nerede?

| Ne | Dosya |
| --- | --- |
| İletişim bilgileri, menü, harita ve staj formu adresleri | `src/lib/site.ts` |
| Ar-Ge projeleri (liste ve detay sayfaları) | `src/lib/projects.ts` |
| Mobil uygulamalar | `src/lib/apps.ts` |
| Uzmanlık alanları | `src/components/sections.tsx` (`expertise`) |
| KVKK / gizlilik / kullanım şartları metinleri | `src/app/kvkk`, `src/app/gizlilik`, `src/app/kullanim-sartlari` |
| Renkler ve tema | `src/app/globals.css` |

Yeni bir proje eklemek için `projects.ts` dizisine bir kayıt eklemek yeterli; `/projeler/<slug>` sayfası
kendiliğinden oluşur. Projenin çizimi `src/components/project-visual.tsx` içindeki SVG'lerden seçilir
(`visual` alanı); yeni bir çizim gerekiyorsa oraya eklenir.

Uygulama görselleri `public/apps/` klasöründedir.

## Notlar

- Koyu tema varsayılandır; ziyaretçinin seçimi tarayıcıda (`localStorage`) saklanır.
- Eski `/staj.html` adresi `/staj` sayfasına kalıcı olarak yönlenir (`next.config.ts`).
- Bu Next.js sürümünde bazı API'ler eski sürümlerden farklıdır; değişiklik yapmadan önce
  `node_modules/next/dist/docs/` altındaki dokümanlara bakın (bkz. `AGENTS.md`).
