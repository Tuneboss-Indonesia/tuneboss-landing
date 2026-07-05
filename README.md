# TuneBoss Landing

Landing page untuk ekosistem TuneBoss.

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

```bash
npm install
npm run dev
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

## Quality Check

Jalankan semua pengecekan berikut sebelum deploy:

```bash
# 1. Lint — cek code style & error
npm run lint

# 2. React Doctor — cek kesehatan config React
npm run doctor

# 3. Astro Doctor — diagnosa masalah Astro
npx @santi020k/astro-doctor

# 4. Astro Check — validasi komponen Astro
npx astro check

# 5. TypeScript — cek type errors
npm run typecheck

# 6. Build — pastikan production build berhasil
npm run build
```

## SEO

Sitemap aktif lewat `@astrojs/sitemap`.

Set domain produksi dengan env:

```bash
PUBLIC_SITE_URL=https://domain-tuneboss.com
```