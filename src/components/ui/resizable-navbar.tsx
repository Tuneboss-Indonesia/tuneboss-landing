"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import * as React from "react";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const FlagID = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-6 h-auto rounded-[2px] shadow-[0_0_2px_rgba(255,255,255,0.5)] overflow-hidden">
    <rect fill="#fff" width="3" height="2"/>
    <rect fill="#ce1126" width="3" height="1"/>
  </svg>
);

const FlagEN = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-auto rounded-[2px] shadow-[0_0_2px_rgba(255,255,255,0.5)] overflow-hidden">
    <clipPath id="t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
    <path d="M0 0v30h60V0z" fill="#012169"/>
    <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
    <path d="M0 0l60 30m0-30L0 30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <m.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-3 md:top-10 z-[100] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </m.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <m.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex transition-colors duration-300",
        visible ? "bg-black/90 border border-white/10 backdrop-blur-md" : "bg-transparent",
        className,
      )}
    >
      {children}
    </m.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-4 text-lg font-bold text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-4",
        className,
      )}
    >
      {items.map((item) => (
        <a
          onMouseEnter={() => setHovered(item.name)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-lg font-bold text-neutral-300 transition-colors hover:text-[#e87a1e]"
          key={`link-${item.name}`}
          href={item.link}
        >
          {hovered === item.name && (
            <m.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[#e87a1e]/10 dark:bg-[#e87a1e]/20"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <m.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "2rem" : "2rem",
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden transition-colors duration-300",
        visible ? "bg-black/90 border border-white/10 backdrop-blur-md" : "bg-transparent",
        className,
      )}
    >
      {children}
    </m.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose: _onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-full mt-2 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-[2rem] bg-neutral-900 border border-white/10 px-4 py-8 shadow-2xl",
            className,
          )}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <X className="text-white hover:text-[#e87a1e] transition-colors cursor-pointer" onClick={onClick} />
  ) : (
    <Menu className="text-white hover:text-[#e87a1e] transition-colors cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      aria-label="Home"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/tuneboss-logo.png"
        alt="logo"
        width={100}
        height={47}
      />
      {/* <span className="font-medium text-black dark:text-white">Startup</span> */}
    </a>
  );
};

const NAV_STYLES = `
  .nav-btn-orange {
      background: linear-gradient(180deg, #f9a054 0%, #e87a1e 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(232,122,30,0.8), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(232,122,30,0.5), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(160,70,5,0.5);
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .nav-btn-orange:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #ffb370 0%, #f9a054 100%);
      box-shadow: 0 0 0 1px rgba(232,122,30,0.9), 0 6px 12px -2px rgba(232,122,30,0.5), 0 20px 32px -6px rgba(232,122,30,0.7), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(160,70,5,0.6);
  }
  .nav-btn-orange:active {
      transform: translateY(1px);
      background: #d86812;
      box-shadow: 0 0 0 1px rgba(232,122,30,0.5), inset 0 3px 8px rgba(160,70,5,0.8), inset 0 0 0 1px rgba(0,0,0,0.2);
  }
`;

const baseStyles =
  "px-6 py-2.5 rounded-[1rem] text-sm font-bold relative cursor-pointer inline-block text-center";

const variantStyles = {
  primary: "nav-btn-orange",
  secondary: "bg-transparent text-black shadow-none dark:text-white",
  dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
  gradient:
    "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
};

export const NavbarButton = ({
  as: Tag = "a",
  children,
  href,
  className,
  variant = "primary",
  ...props
}: {
  as?: React.ElementType;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

import { useTranslations, type Language } from "../../utils/i18n";

export function TuneBossNavbar({ lang = 'id' }: { lang?: Language }) {
  const t = useTranslations(lang);
  const navItems = [
    { name: t('home'), link: lang === 'id' ? "/" : "/en/" },
    { name: t('product'), link: lang === 'id' ? "/" : "/en/" },
    { name: t('contact'), link: lang === 'id' ? "/" : "/en/" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <style dangerouslySetInnerHTML={{ __html: NAV_STYLES }} />
      <LazyMotion features={domAnimation}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="relative z-[100] flex items-center gap-4">
            <a 
              href={lang === 'id' ? '/en/' : '/'}
              className="text-neutral-300 hover:text-[#e87a1e] transition-colors cursor-pointer flex items-center justify-center"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              data-astro-reload
            >
              {lang === 'id' ? <FlagEN /> : <FlagID />}
            </a>
            <NavbarButton href="https://tuneboss-frontend.vercel.app" target="_blank" rel="noopener noreferrer" variant="primary">
              {t('shop_now')}
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <a
                key={`mobile-link-${item.name}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white font-bold text-lg hover:text-[#e87a1e] transition-colors py-2"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <a 
                href={lang === 'id' ? '/en/' : '/'}
                className="flex items-center justify-center gap-3 text-center text-white font-bold text-lg hover:text-[#e87a1e] border border-white/20 rounded-[1.25rem] px-4 py-3 transition-colors cursor-pointer relative z-[100]"
                data-astro-reload
              >
                <span>Switch to {lang === 'id' ? 'English' : 'Bahasa Indonesia'}</span>
                {lang === 'id' ? <FlagEN /> : <FlagID />}
              </a>
              <NavbarButton
                href="https://tuneboss-frontend.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                {t('shop_now')}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      </LazyMotion>
    </div>
  );
}

