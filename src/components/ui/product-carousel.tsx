"use client";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type CarouselItem = {
  image: string;
  name: string;
};

type PropType = {
  items: CarouselItem[];
  options?: EmblaOptionsType;
};

export const ProductCarousel: React.FC<PropType> = (props) => {
  const { items, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".parallax-layer") as HTMLElement;
    });
  }, []);

  const applyTween = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    
    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];
      
      slidesInSnap.forEach((slideIndex) => {
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              diffToTarget = diffToTarget + sign * 1; 
            }
          });
        }
      });

      const tweenValue = diffToTarget * 100 * 0.8; 

      const node = tweenNodes.current[snapIndex];
      if (node) {
        node.style.transform = `translateX(${tweenValue}%)`;
      }
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    applyTween(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", applyTween)
      .on("scroll", applyTween);

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", applyTween)
        .off("scroll", applyTween);
    };
  }, [emblaApi, setTweenNodes, applyTween]);

  return (
    <div className="relative w-full py-10">
      <div className="overflow-hidden" ref={emblaRef}>
        {/* PENTING: Embla memiliki bug jika menggunakan CSS 'gap' pada mode loop. 
            Solusinya: Gunakan padding (px) pada masing-masing item, jangan gunakan gap di container! */}
        <div className="flex touch-pan-y touch-pinch-zoom">
          {items.map((item) => (
            <div 
              key={item.name}
              className="flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_55%] lg:flex-[0_0_45%] px-10 md:px-16 flex flex-col justify-center items-center"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full h-48 md:h-64 lg:h-80 relative flex justify-center items-center overflow-hidden">
                  <div className="parallax-layer absolute inset-0 w-full h-full flex justify-center items-center">
                    <img 
                      src={item.image} 
                      className="object-contain h-[95%] w-[95%] absolute drop-shadow-2xl" 
                      alt={item.name} 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <h3 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-bold font-sqr text-orange-matte uppercase tracking-widest text-center">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
