'use client'

import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

import { useTranslations, type Language } from "../../utils/i18n"

export default function TuneBossFeatures({ lang = 'id' }: { lang?: Language }) {
  const t = useTranslations(lang);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure GSAP knows about the new DOM state after Astro View Transitions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // Hero reveal animation
      const heroReveal = gsap.utils.toArray('.hero-reveal') as HTMLElement[]
      heroReveal.forEach((element) => {
        const heroHeadings = element.querySelectorAll('.hero-reveal_split_item')
        const contentEl = element.querySelector('.hero-reveal__content')



        // Content scroll up (restored from snippet)
        const contentTl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top top',
              end: '+=1600',
              scrub: true
            }
          })
          
        contentTl.fromTo(contentEl, { y: '50%' }, { y: '0%', ease: 'power2.out', duration: 1 })
        contentTl.to({}, { duration: 0.5 }) // Extra reading time

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top top',
            end: '+=1600',
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 1 // FIX: Ensures this pin spacer is calculated before DownloadCTA
          }
        })

        // 1. Flying Bike Animation (starts immediately at 0)
        const bike = element.querySelector('.hero-reveal__bike')
        if (bike) {
          tl.fromTo(
            bike,
            { x: '-100vw', yPercent: -50 },
            { x: '150vw', yPercent: -50, ease: 'power1.inOut', duration: 1 },
            0
          )
        }

        // 2. Main split animation (slides the doors apart)
        if (heroHeadings.length >= 2) {
          tl.fromTo(
            heroHeadings[0],
            { y: '0%' },
            { y: '-100%', ease: 'power4.inOut', duration: 0.5 },
            0.4
          )
          tl.fromTo(
            heroHeadings[1],
            { y: '0%' },
            { y: '100%', ease: 'power4.inOut', duration: 0.5 },
            0.4
          )
        }

        // Add dummy space at the end of the timeline so it stays pinned while reading
        tl.to({}, { duration: 0.5 })

        // 4. Parallax Images (Matching Hero Parallax Style)
        const hp = element.querySelector('.hero-reveal__parallax-hp')
        const produk = element.querySelector('.hero-reveal__parallax-produk')

        if (hp) {
          contentTl.fromTo(hp, { y: '10vh' }, { y: '-80vh', ease: 'none', duration: 1.5 }, 0)
        }
        if (produk) {
          contentTl.fromTo(produk, { y: '10vh' }, { y: '-100vh', ease: 'none', duration: 1.5 }, 0)
        }
      })
    }, sectionRef)

    // Cleanup function
    return () => {
      ctx.revert();
    }
  }, [])

  return (
    <div ref={sectionRef}>
      <section className="hero-reveal relative w-full bg-black text-white overflow-hidden">
        <article className="relative w-full">
          
          {/* Flying Motorcycle */}
          <img 
            src="/images/bike.png" 
            loading="lazy"
            decoding="async"
            alt="TuneBoss Bike" 
            className="hero-reveal__bike absolute top-[50vh] left-[calc(50%-175px)] md:left-0 w-[350px] md:w-[600px] z-[60] pointer-events-none"
          />

        {/* Header (The Orange Box that splits) */}
        <header className="hero-reveal__header absolute top-0 left-0 w-full h-screen z-20 overflow-hidden pointer-events-none">
          
          {/* Top Door */}
          <div className="hero-reveal_split_item absolute top-0 left-0 w-full bg-[#e87a1e] z-10" style={{ height: '50%' }}>
            <p className="absolute bottom-0 left-0 w-full text-center pb-1 text-xl md:text-3xl font-bold tracking-widest text-silver-matte uppercase">{t('performance_ecu')}</p>
          </div>

          {/* Bottom Door */}
          <div className="hero-reveal_split_item absolute bottom-0 left-0 w-full bg-[#e87a1e] z-10" aria-hidden="true" style={{ height: '50%' }}>
            <p className="absolute top-0 left-0 w-full text-center pt-1 c-wide-text text-[9vw] md:text-[6vw] font-bold uppercase tracking-widest text-3d-matte font-sqr leading-none m-0">TUNEBOSS ECU</p>
          </div>
          
        </header>

        {/* Content (The text and images revealed behind the split) */}
        <div className="hero-reveal__content relative z-10 w-full min-h-screen flex items-center justify-center">
          <div className="hero-reveal__content-inner max-w-7xl w-full mx-auto px-4 py-24 relative flex items-center justify-center min-h-screen">
            
            {/* Parallax Images */}
            <div className="hero-reveal__parallax absolute inset-0 pointer-events-none z-[50] overflow-hidden">
              <img 
                src="/images/produk.webp" 
                loading="lazy"
                decoding="async"
                alt="TuneBoss ECU" 
                className="hero-reveal__parallax-produk absolute top-[75%] md:top-[80%] right-[-2%] sm:right-[0%] lg:right-[5%] w-[100px] sm:w-[180px] md:w-[240px] lg:w-[350px]" 
              />
              <img 
                src="/images/hp.png" 
                loading="lazy"
                decoding="async"
                alt="TuneBoss App" 
                className="hero-reveal__parallax-hp absolute bottom-[-10%] md:bottom-[-20%] lg:bottom-[-30%] left-[-2%] sm:left-[0%] lg:left-[5%] w-[90px] sm:w-[160px] md:w-[220px] lg:w-[320px]" 
              />
            </div>

            {/* Text Copy */}
            <div className="hero-reveal__content-p relative z-10 max-w-3xl text-lg md:text-xl leading-relaxed text-gray-200 space-y-6 backdrop-blur-xl bg-white/5 p-8 md:p-14 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(232,122,30,0.1)] text-center">
              <p>
                {t('feat_para1')}
              </p>
              <p>
                {t('feat_para2')}
              </p>
              <p>
                <strong className="text-[#e87a1e]">{t('feat_para3_strong')}</strong>{t('feat_para3')}
              </p>
              <p>
                <strong className="text-[#e87a1e]">{t('feat_para4_strong')}</strong>{t('feat_para4')}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
    </div>
  )
}
