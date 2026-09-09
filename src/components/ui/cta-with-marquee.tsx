"use client";

import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function Marquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const images = [
  "/images/produk1.webp",
  "/images/produk2.jpeg",
  "/images/produk3.jpeg",
];

const images2 = [
  "/images/produk4.jpeg",
  "/images/produk5.jpeg",
  "/images/produk6.jpeg",
];



const texts = {
  id: {
    title: "UPGRADE PERFORMA",
    titleSpan: "MOTORMU",
    subtitle: "TuneBoss ECU",
    desc: "Temukan produk unggulan kami sekarang juga di marketplace kesayangan Anda.",
    btn: "BELI PRODUK",
  },
  en: {
    title: "UPGRADE YOUR BIKE'S",
    titleSpan: "PERFORMANCE",
    subtitle: "TuneBoss ECU",
    desc: "Discover our premium products right now on your favorite marketplace.",
    btn: "BUY NOW",
  },
};

export function HeroWithMarquee({ lang = "id" }: { lang?: "id" | "en" }) {
  const t = texts[lang];

  return (
    <div className="py-10 md:py-20 bg-black text-white flex items-center overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 min-w-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sqr text-white break-words">
              {t.title} <span className="text-orange-matte">{t.titleSpan}</span>
            </h1>
            <div className="space-y-2 text-gray-400 font-futura tracking-wide">
              <p className="text-xl font-medium text-white">{t.subtitle}</p>
              <p className="text-lg font-normal">{t.desc}</p>
            </div>
            <div className="pt-6">
              <a
                href="https://marketplace.tuneboss.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-orange inline-flex items-center justify-center gap-3 px-10 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-[#e87a1e] focus:ring-offset-2 focus:ring-offset-black font-bold uppercase tracking-widest text-white w-fit font-sqr"
              >
                {t.btn}
              </a>
            </div>
          </div>

          {/* Right Marquee Grid */}
          <div className="space-y-4 overflow-hidden">
            <Marquee speed={30} reverse className="[--gap:1rem]">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10"
                >
                  <img
                    src={src}
                    alt={`Produk ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={30} className="[--gap:1rem]">
              {images2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10"
                >
                  <img
                    src={src}
                    alt={`Produk ${idx + 4}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
