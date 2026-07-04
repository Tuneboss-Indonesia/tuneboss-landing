import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { type Language } from "../../utils/i18n";

const bikeStyles: React.CSSProperties = {
  objectFit: "contain",
  bottom: "15%",
  height: "55vh",
  width: "100%",
  left: "0",
  right: "0",
  margin: "0 auto",
  zIndex: 40
};

export function ParallaxComponent({ lang: _lang = 'id' }: { lang?: Language }) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

      if (triggerElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        tl.to('[data-parallax-layer="1"]', { y: "70vh", ease: "none" }, 0);
        tl.to('[data-parallax-layer="2"]', { y: "50vh", ease: "none" }, 0);
        tl.to('[data-parallax-layer="3"]', { y: "30vh", ease: "none" }, 0);
        tl.to('[data-parallax-layer="4"]', { y: "-15vh", ease: "none" }, 0);
      }
    }, parallaxRef);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img 
              src="/images/tuneboss_layer1.png?v=9" 
              loading="eager"
              decoding="async"
              width="800" 
              data-parallax-layer="1" 
              alt="Background Layer 1" 
              className="parallax__layer-img" 
            />
            
            <img 
              src="/images/tuneboss_layer2.png?v=9" 
              loading="eager"
              decoding="async"
              width="800" 
              data-parallax-layer="2" 
              alt="Background Layer 2" 
              className="parallax__layer-img" 
            />

            {/* Layer 3: Title */}
            <div data-parallax-layer="3" className="parallax__layer-title" style={{ top: "-15vh" }}>
              <h2 className="parallax__title text-orange-matte" aria-label="TuneBoss ID">TuneBoss ID</h2>
            </div>

            {/* Layer 4: Foreground Image (Bike) */}
            <img 
              src="/images/bike.png" 
              loading="eager"
              decoding="async"
              data-parallax-layer="4" 
              alt="TuneBoss Bike" 
              className="parallax__layer-img" 
              style={bikeStyles}
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
    </div>
  );
}
