
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
)

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.3 5.3 3.1 4.5 4 3.5 5.1 3.5 5.6 3.4 8.7 3.2 12 3.2 12 3.2s3.3 0 6.4.2c.5.1 1.6.1 2.5 1.1.8.8 1 2.6 1 2.6s.2 2.1.2 4.2v1.8c0 2.1-.2 4.2-.2 4.2s-.2 1.8-1 2.6c-.9 1-2.1 1-2.7 1.1-3.6.3-6.6.2-6.6.2s-3.3 0-6.4-.2c-.5-.1-1.6-.1-2.5-1.1-.8-.8-1-2.6-1-2.6s-.2-2.1-.2-4.2V11.3c0-2.1.2-4.2.2-4.2z"/><path d="M9.7 15.6L16 12 9.7 8.4z"/></svg>
)

const TiktokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
)

import { useTranslations, type Language } from "../../utils/i18n";

export function StackedCircularFooter({ lang = 'id' }: { lang?: Language }) {
  const t = useTranslations(lang);
  return (
    <footer className="bg-black py-12 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 p-4">
            <img src="/tuneboss-logo.png" loading="lazy" decoding="async" alt="TuneBoss Logo" className="w-48 object-contain" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6 font-futura text-gray-300">
            <a href={lang === 'id' ? "/" : "/en/"} className="hover:text-[#e87a1e] transition-colors">{t('home')}</a>
            <a href={lang === 'id' ? "/" : "/en/"} className="hover:text-[#e87a1e] transition-colors">{t('product')}</a>
            <a href={lang === 'id' ? "/" : "/en/"} className="hover:text-[#e87a1e] transition-colors">{t('contact')}</a>
            <a href="https://tuneboss-frontend.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#e87a1e] transition-colors">{t('shop_now')}</a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <a href="https://www.facebook.com/tunebossid" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform">
              <FacebookIcon />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/tuneboss.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:scale-110 transition-transform">
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@tuneboss.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#69C9D0] text-white hover:scale-110 transition-transform">
              <TiktokIcon />
              <span className="sr-only">TikTok</span>
            </a>
            <a href="https://www.youtube.com/@tunebossid" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF0000] text-white hover:scale-110 transition-transform">
              <YoutubeIcon />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 font-futura">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
