'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .text-3d-matte {
      color: #FFFFFF;
      text-shadow: 
          0 10px 30px rgba(255,255,255, 0.2), 
          0 2px 4px rgba(255,255,255, 0.1);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); 
      filter: drop-shadow(0px 10px 20px rgba(255,255,255,0.15));
  }

  .text-orange-matte {
      background: linear-gradient(180deg, #f9a054 0%, #e87a1e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); 
      filter: drop-shadow(0px 10px 20px rgba(232,122,30,0.3));
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  /* Orange Tactile Button */
  .btn-modern-orange {
      background: linear-gradient(180deg, #f9a054 0%, #e87a1e 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(232,122,30,0.8), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(232,122,30,0.5), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(160,70,5,0.5);
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-orange:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #ffb370 0%, #f9a054 100%);
      box-shadow: 0 0 0 1px rgba(232,122,30,0.9), 0 6px 12px -2px rgba(232,122,30,0.5), 0 20px 32px -6px rgba(232,122,30,0.7), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(160,70,5,0.6);
  }
  .btn-modern-orange:active {
      transform: translateY(1px);
      background: #d86812;
      box-shadow: 0 0 0 1px rgba(232,122,30,0.5), inset 0 3px 8px rgba(160,70,5,0.8), inset 0 0 0 1px rgba(0,0,0,0.2);
  }
`;

import { useTranslations, type Language } from "../../utils/i18n";

export function DownloadCTA({ lang = 'id', className }: { lang?: Language, className?: string }) {
  const t = useTranslations(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // 2. Intro Animation (Triggers when scrolled into view)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => {
          const introTl = gsap.timeline();
          introTl
            .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
            .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");
        },
        once: true
      });

      // 3. Pinned Scroll Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500", // Distance to scroll while pinned
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Zoom and blur out the first text
        .to(".hero-text-wrapper", { scale: 1.15, filter: "blur(20px)", autoAlpha: 0, ease: "power2.inOut", duration: 2 }, 0)
        // Bring in the CTA section
        .to(".cta-wrapper", { autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={"relative w-full h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden z-20 " + (className || "")} style={{ perspective: "1500px" }}>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      
      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center text-center w-full px-4 will-change-transform transform-style-3d">
        <h1 
          className="text-track text-3d-matte text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight mb-2 leading-tight"
          aria-label={t('unlock_power')}
        >
          {t('unlock_power')}
        </h1>
        <h1 
          className="text-days text-orange-matte text-4xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-tight"
          aria-label={t('right_from_phone')}
        >
          {t('right_from_phone')}
        </h1>
      </div>

      {/* CTA Buttons Section */}
      <div className="cta-wrapper absolute inset-0 z-20 flex flex-col items-center justify-center text-center w-full px-4 pointer-events-auto will-change-transform">
        <h2 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-orange-matte"
          aria-label={t('download_app')}
        >
          {t('download_app')}
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {t('join_riders')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
            <a href="https://apps.apple.com/my/app/tuneboss-ecu/id1593810669" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" className="btn-modern-orange flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[#e87a1e] focus:ring-offset-2 focus:ring-offset-black">
              <svg className="w-11 h-11 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="5" fill="#007AFF" />
                <g transform="translate(3, 3) scale(0.75)">
                  <path fill="#ffffff" d="M8.81 14.92l6.11-11.04c0.08-0.15.17-0.30.24-0.46.07-0.14.13-0.29.16-0.44.08-0.33.06-0.67-0.07-0.98-0.12-0.31-0.34-0.57-0.62-0.74a1.42 1.42 0 0 0-0.92-0.19c-0.32.04-0.61.19-0.84.43-0.11.11-0.20.24-0.28.37-.92.15-0.17.30-0.26.45l-0.39.70-0.39-0.70c-0.08-0.15-0.17-0.30-0.26-0.45-0.08-0.13-0.17-0.26-0.28-0.37-0.23-0.24-0.52-0.39-0.84-0.43a1.42 1.42 0 0 0-0.92.19c-0.28.17-0.50.43-0.62.74-0.12.31-0.15.65-.66.98.38.16.96.30.16.44.75.16.16.31.24.46l1.25 2.25-4.86 8.78H2.03c-0.17 0-0.34-0.00-0.50.01-0.15.01-0.30.03-0.45.07-0.31.09-0.58.28-0.78.55-0.20.27-0.30.59-0.30.93 0 0.34.11.66.30.93.20.27.47.46.78.55.15.43.30.62.45.72.17.1.33.9.50.01h13.10c0.02-0.36.06-0.13.1-0.27.41-1.42-0.62-2.84-2.03-2.84zM3.11 18.54l-0.79 1.50c-0.82.16-0.16.31-0.24.47-.67.15-0.12.29-0.16.45-0.79.33-0.58.68.06 1.0.12.32.33.58.61.75.27.17.59.24.90.20.31-.44.60-0.20.83-0.44.11-0.11.20-0.24.28-0.38.09-0.15.17-0.31.25-0.46L6 19.46c-0.09-0.15-0.95-1.47-2.89-0.92m20.59-3.01a1.47 1.47 0 0 0-0.78-0.54c-0.15-0.04-0.30-0.06-0.45-0.07-0.17-0.01-0.34-0.01-0.50-0.01H18.65l-4.39-7.82c-0.67.70-0.96 1.49-1.08 2.20-0.17 1.3.04 2.9.55 3.00l5.27 9.39c.84.15.17.30.26.44.84.13.17.25.28.36.23.23.52.38.84.42.32.4.64-0.24.92-0.19.28-0.17.50-0.42.62-0.73.12-0.31.15-0.64.07-0.96-0.04-0.15-0.10-0.29-0.17-0.43-0.08-0.15-0.16-0.30-0.24-0.45l-1.22-2.17h1.60c0.17 0 0.34.0.50-.9.15-.9.30-.28.45-0.07a1.47 1.47 0 0 0 0.78-0.54A1.54 1.54 0 0 0 24 16.45a1.54 1.54 0 0 0-0.30-0.92Z" />
                </g>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-wider font-semibold opacity-80 group-hover:opacity-100 transition-opacity">{t('get_it_on_apple')}</span>
                <span className="text-xl font-bold tracking-tight">App Store</span>
              </div>
            </a>

            <a href="https://play.google.com/store/apps/details?id=com.fsrtech.fl.tuneboss.mngr" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" className="btn-modern-orange flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[#e87a1e] focus:ring-offset-2 focus:ring-offset-black">
              <svg className="w-11 h-11 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 512 512">
                 <path fill="#34A853" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                 <path fill="#4285F4" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                 <path fill="#FBBC05" d="m425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"/>
                 <path fill="#EA4335" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-wider font-semibold opacity-80 group-hover:opacity-100 transition-opacity">{t('get_it_on_play')}</span>
                <span className="text-xl font-bold tracking-tight">Google Play</span>
              </div>
            </a>
        </div>
      </div>
    </section>
  );
}
