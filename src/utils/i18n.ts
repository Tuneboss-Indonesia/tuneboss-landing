export type Language = 'id' | 'en';

export const dictionary = {
  id: {
    // Navbar & Footer
    home: "Beranda",
    product: "Produk",
    contact: "Kontak",
    shop_now: "Mulai Belanja",
    copyright: "© 2026 TuneBoss ID Hak cipta dilindungi.",

    // TuneBoss Features
    performance_ecu: "ECU Motor Berperforma Tinggi",
    feat_para1: "Dirancang untuk pengendara harian, penghobi, dan tim balap, TuneBoss ECU memungkinkan penyetelan mesin yang detail. Ini menghasilkan performa terbaik dan mencegah kerusakan mesin setelah dimodifikasi. Unit Kontrol Mesin (ECU) canggih berteknologi plug-and-play untuk sepeda motor injeksi berkapasitas kecil (Yamaha, Honda, Suzuki, dll).",
    feat_para2: "Setel motor Anda secara nirkabel (Bluetooth) dengan Aplikasi Android atau iPhone kami agar sesuai dengan kebutuhan Anda tanpa perlu pergi ke bengkel. Didesain dan Dibuat di Malaysia dengan lebih dari 50.000 unit terjual di seluruh dunia. Kesulitan menanjak? Tarikan berat setelah melambat? Butuh tenaga ekstra untuk menyalip kemacetan?",
    feat_para3_strong: "Ucapkan selamat tinggal pada tarikan awal yang lambat.",
    feat_para3: " Hilangkan batasan performa ECU pabrikan dengan otak yang lebih pintar untuk motor Anda.",
    feat_para4_strong: "Tenaga instan.",
    feat_para4: " Buka peningkatan performa hingga 15% sejak pemasangan baru. Kebebasan untuk menyetel motor Anda sendiri. Sesuaikan pengaturan Anda sendiri atau unduh peta preset langsung dari aplikasi TuneBoss Android & iPhone. Ganti ECU pabrik Anda dengan TuneBoss dalam 5 menit tanpa perlu menghabiskan lebih banyak uang untuk peningkatan lainnya.",

    // Download CTA
    unlock_power: "Buka Kekuatan Sejati,",
    right_from_phone: "Langsung dari HP Anda.",
    download_app: "Unduh Aplikasi TuneBoss",
    join_riders: "Bergabunglah dengan lebih dari 50.000 pengendara di seluruh dunia dan kendalikan performa motor Anda secara nirkabel hari ini.",
    get_it_on_play: "Dapatkan di",
    get_it_on_apple: "Unduh di",
  },
  en: {
    // Navbar & Footer
    home: "Home",
    product: "Product",
    contact: "Contact",
    shop_now: "Shop Now",
    copyright: "© 2026 TuneBoss ID. All rights reserved.",

    // TuneBoss Features
    performance_ecu: "Performance Motorcycle ECU",
    feat_para1: "Designed for daily commuters, hobbyists and race teams, TuneBoss ECU enables detailed engine tuning. This extracts the best performance and prevents engine damage after modifications. Advanced plug-and-play Engine Control Unit (ECU) for small displacement electronic fuel injection motorcycles (Yamaha, Honda, Suzuki etc).",
    feat_para2: "Tune your motorcycle wirelessly (Bluetooth) with our Android or iPhone App to match your needs without going to the tuners. Designed and Made in Malaysia with over 50,000 units sold worldwide. Struggling to climb hills? Such a drag to accelerate after slowing down? Want extra power to avoid traffic?",
    feat_para3_strong: "Say goodbye to sluggish starts.",
    feat_para3: " Remove factory ECU performance limits with a smarter brain for your motorcycle.",
    feat_para4_strong: "Instant power.",
    feat_para4: " Unlock up to 15% more performance from new installation. Freedom to tune your own bike. Customize your own settings or download preset maps right from TuneBoss Android & iPhone app. Swap your factory ECU with TuneBoss in 5 minutes without spending more money for other upgrades.",

    // Download CTA
    unlock_power: "Unlock True Power,",
    right_from_phone: "Right from your phone.",
    download_app: "Download TuneBoss App",
    join_riders: "Join over 50,000 riders globally and take full control of your motorcycle's performance wirelessly today.",
    get_it_on_play: "Get it on",
    get_it_on_apple: "Download on the",
  }
};

export function useTranslations(lang: Language) {
  return function t(key: keyof typeof dictionary['id']) {
    return dictionary[lang][key] || dictionary['id'][key];
  }
}
