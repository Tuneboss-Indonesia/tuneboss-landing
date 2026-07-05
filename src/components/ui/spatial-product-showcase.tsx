'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Battery,
  Sliders,
  ChevronRight,
  Zap,
  Bluetooth,
  Wifi,
  Music,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'ecu';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: string | LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string; // Display name for the switcher
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string; // Tailwind gradient classes
    glow: string;     // Tailwind color class for accents
    ring: string;     // Tailwind border color for rings
  };
  stats: {
    connectionStatus: string;
    batteryLevel: number;
  };
  features: FeatureMetric[];
}

const TEXTS = {
  id: {
    title: 'Stand-alone ECU',
    description: 'Unit kontrol mesin performa tinggi dengan fitur tuning canggih, dual band, dan Bluetooth bawaan untuk konektivitas tanpa batas.',
    features: [
      { label: 'Peningkatan Performa', value: 98, icon: '/images/perf.webp' },
      { label: 'Presisi Tuning', value: 95, icon: '/images/tuning.webp' },
    ],
  },
  en: {
    title: 'Stand-alone ECU',
    description: 'High-performance engine control unit with advanced tuning features, dual band, and built-in Bluetooth for seamless connectivity.',
    features: [
      { label: 'Performance Gain', value: 98, icon: '/images/perf.webp' },
      { label: 'Tuning Precision', value: 95, icon: '/images/tuning.webp' },
    ],
  }
};

// Default Data (Easy to Modify Here)
const PRODUCT_DATA: Record<ProductId, ProductData> = {
  ecu: {
    id: 'ecu',
    label: 'TuneBoss',
    title: 'Stand-alone ECU',
    description: 'Unit kontrol mesin performa tinggi dengan fitur tuning canggih, dual band, dan Bluetooth bawaan untuk konektivitas tanpa batas.',
    image: '/images/produk.webp',
    colors: {
      gradient: 'from-orange-600 to-red-900',
      glow: 'bg-orange-500',
      ring: 'border-l-orange-500/50',
    },
    stats: { connectionStatus: 'Bluetooth Connected', batteryLevel: 100 },
    features: [
      { label: 'Placeholder', value: 0, icon: '/images/perf.webp' },
      { label: 'Placeholder', value: 0, icon: '/images/tuning.webp' },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(15px)',
      rotate: isLeft ? -30 : 30,
      x: isLeft ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 4. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      animate={{
        background: 'radial-gradient(circle at 0% 50%, rgba(232, 122, 30, 0.15), transparent 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductVisual = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0">
    {/* Animated Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-20%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-40`}
    />

    {/* Image Container */}
    <div className="relative h-80 w-80 md:h-[450px] md:w-[450px] rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={`${data.title}`}
            variants={ANIMATIONS.image(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </AnimatePresence>
      </motion.div>
    </div>

  </motion.div>
);

const ProductDetails = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isLeft ? 'left-0 bg-orange-500' : 'right-0 bg-emerald-500';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
        {data.label} ECU
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-sqr">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-zinc-400 mb-8 max-w-sm leading-relaxed ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
              <div className={`flex items-center gap-3 ${feature.value > 50 ? 'text-zinc-200' : 'text-zinc-400'}`}>
                {typeof feature.icon === 'string' ? (
                  <img 
                    src={feature.icon} 
                    alt={feature.label} 
                    className="w-5 h-5 object-contain" 
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <feature.icon size={16} />
                )}
                <span>{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-500">{feature.value}%</span>
            </div>
            <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${barColorClass} opacity-80`}
              />
            </div>
          </div>
        ))}


      </motion.div>

    </motion.div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function SpatialProductShowcase({ lang = 'id' }: { lang?: 'id' | 'en' }) {
  const activeSide = 'ecu';
  
  const baseData = PRODUCT_DATA[activeSide];
  const localizedData = TEXTS[lang];
  const currentData = {
    ...baseData,
    title: localizedData.title,
    description: localizedData.description,
    features: localizedData.features
  };

  const isLeft = true;

  return (
    <div className="relative w-full bg-transparent text-zinc-100 overflow-hidden selection:bg-zinc-800 flex flex-col items-center justify-center py-12 md:py-20">
      
      <BackgroundGradient isLeft={isLeft} />

      <main className="relative z-10 w-full px-6 flex flex-col justify-center max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 lg:gap-48 w-full ${
            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Left Column: Visuals */}
          <ProductVisual data={currentData} isLeft={isLeft} />

          {/* Right Column: Content */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProductDetails 
                key={activeSide} // Key forces re-render for animation
                data={currentData} 
                isLeft={isLeft} 
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
