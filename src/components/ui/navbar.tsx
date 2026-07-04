"use client";

import React, { useState } from 'react';

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface NavbarProps {
    logoUrl?: string;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
    logoUrl = "/tuneboss-logo.png",
    navLinks = [
        { label: "Home", href: "/", isActive: true },
        { label: "Marketplace", href: "#" },
        { label: "Kategori", href: "#" },
        { label: "Tentang Kami", href: "#" }
    ],
    ctaButtonText = "Mulai Belanja",
    ctaButtonHref = "#",
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-[100] xl:top-4">
            <div className="mx-6">
                <div className="flex items-center justify-between pt-4">
                    <a
                        href="/"
                        aria-label="Home"
                        className="inline-flex items-center justify-center bg-center w-[120px] h-[40px] bg-contain bg-no-repeat rounded"
                        style={{ backgroundImage: `url(${logoUrl})` }}
                    />

                    <nav className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`relative py-2 text-base font-medium font-futura transition-colors ${link.isActive ? 'text-tuneboss-orange' : 'text-white/80 hover:text-white'
                                        } group`}
                                >
                                    {link.label}
                                    <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-tuneboss-orange transition-transform duration-300 origin-left ${link.isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                </a>
                            ))}
                            <a
                                href={ctaButtonHref}
                                className="ml-4 inline-flex items-center gap-2 rounded-full bg-tuneboss-orange px-5 py-2.5 text-sm font-medium text-white hover:bg-tuneboss-orange/90 font-futura transition-all hover:scale-105 active:scale-95"
                            >
                                {ctaButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                </svg>
                            </a>
                        </div>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
                            <path d="M4 5h16" />
                            <path d="M4 12h16" />
                            <path d="M4 19h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full px-6 mt-2">
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-md rounded-2xl ring-1 ring-white/10 p-4 flex flex-col gap-2 shadow-2xl">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`px-4 py-3 text-base font-medium rounded-xl transition-colors font-sans ${link.isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={ctaButtonHref}
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-base font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors w-full"
                        >
                            {ctaButtonText}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
