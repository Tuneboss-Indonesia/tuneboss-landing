# TuneBoss Landing

Landing page untuk ekosistem produk TuneBoss Indonesia dengan arsitektur web modern, animasi interaktif, SEO optimal, serta dukungan dwibahasa (Bilingual ID/EN).

## Stack

- Astro
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lucide React
- Zod
- Astro Sitemap untuk SEO

## Getting Started

Direkomendasikan menggunakan pnpm untuk manajemen dependensi.

```bash
pnpm install
pnpm run dev
```

## Scripts

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| Dev | `npm run dev` | Jalankan development server |
| Build | `npm run build` | Build production bundle |
| Preview | `npm run preview` | Preview hasil build |
| Lint | `npm run lint` | Jalankan ESLint |
| Doctor | `npm run doctor` | Cek kesehatan React config |
| Astro Doctor | `npm run astro-doctor` | Cek kesehatan Astro config |
| Typecheck | `npm run typecheck` | Cek TypeScript types |
| Check All | `npm run check-all` | Jalankan seluruh skrip pengecekan otomatis |

## Quality Check

Jalankan semua pengecekan berikut sebelum deploy secara otomatis menggunakan node script terpadu:

```bash
node check-all.js
# atau
npm run check-all
```

Atau jalankan secara manual satu per satu:

```bash
# 1. Lint - cek code style & error
npm run lint

# 2. React Doctor - cek kesehatan config React
npm run doctor

# 3. Astro Doctor - diagnosa masalah Astro
npm run astro-doctor

# 4. Astro Check - validasi komponen Astro
npx astro check

# 5. TypeScript - cek type errors
npm run typecheck

# 6. Build - pastikan production build berhasil
npm run build
```

## SEO & Bilingual

Bilingual (ID/EN) didukung penuh melalui parameter lang dan rute /en/ yang terintegrasi langsung dengan hreflang meta tags. Sitemap aktif lewat `@astrojs/sitemap`.

Set domain produksi dengan env:

```bash
PUBLIC_SITE_URL=https://tuneboss.id
```