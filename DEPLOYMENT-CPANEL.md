# Deploy ke cPanel via SSH/rsync

Panduan ini untuk repo `tuneboss-landing`.

## Struktur Repo

- Astro frontend saja

## Target Deploy

- hasil build Astro dari folder `dist/` ke folder target cPanel

## Secret GitHub

Tambahkan secret ini:

- `CPANEL_SSH_HOST`
- `CPANEL_SSH_USER`
- `CPANEL_SSH_KEY`
- `CPANEL_SSH_PORT` optional
- `CPANEL_FRONTEND_DIR`

## Contoh Path

```text
CPANEL_FRONTEND_DIR=/home/cpaneluser/public_html
```

## Alur Workflow

Saat push ke `main`, workflow akan:

1. install dependency
2. jalankan typecheck
3. build Astro ke `dist/`
4. sync folder `dist/` ke server via SSH/rsync

## Catatan Penting

- `.env` tidak ikut dikirim
- pastikan `PUBLIC_SITE_URL` atau env produksi lain sudah diset saat build jika dibutuhkan
- folder target harus sesuai document root cPanel
