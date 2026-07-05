'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const items = [
  {
    id: 1,
    url: '/images/slide1.jpg',
    title: 'Slide 1',
  },
  {
    id: 2,
    url: '/images/slide2.jpg',
    title: 'Slide 2',
  },
  {
    id: 3,
    url: '/images/slide3.webp',
    title: 'Slide 3',
  },
];

export function FramerCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <div className='relative overflow-hidden w-full' ref={containerRef}>
          <motion.div className='flex w-full' style={{ x }}>
            {items.map((item) => (
              <div key={item.id} className='shrink-0 w-full aspect-video md:aspect-auto md:h-[60dvh] relative'>
                <img
                  src={item.url}
                  alt={item.title}
                  className='w-full h-full object-cover select-none pointer-events-none'
                  draggable={false}
                />
                {/* Gradient pelindung Navbar agar teks putih tetap terbaca walau gambar terang */}
                <div className="absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
              </div>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 z-20'>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-[#e87a1e]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
