"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Mail } from "lucide-react";
import { WhatsAppIcon, TikTokIcon } from "./icons";
import { CONTACT_INFO } from "../constants";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  // Menu Links Configuration
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Terapias", href: "/terapias" },
    { label: "Sobre", href: "/sobre" },
    { label: "Depoimentos", href: "/depoimentos" },
    { label: "Contato", href: "/contato" },
  ];

  // Custom Cursor Logic
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.closest(".cursor-grab") ||
        target.closest(".cursor-grabbing");

      setIsHoveringLink(!!isInteractive);
    };

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  // Dynamic Color Theme: Dark green on light background, light on dark background
  const textColorClass = isMenuOpen ? "text-[#f4f4f0]" : "text-[#1a2e22]";

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[3px] border-[#3b2e50] rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isMenuOpen ? 2.5 : (isHoveringLink ? 0 : 1),
          opacity: isHoveringLink ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.1
        }}
      />

      {/* Fixed Navigation Header */}
      <header className="fixed top-0 w-full p-8 flex justify-between items-center z-50">

        {/* Branding & Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 group cursor-pointer"
        >
          {/* Logo Container */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Logo Dra. Francis Koller"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div>

          {/* Dynamic Brand Name */}
          <span className={`text-xl md:text-2xl font-serif font-bold tracking-tighter transition-colors duration-300 ${textColorClass}`}>
            Dra. Francis Koller
          </span>
        </Link>

        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center gap-2 group cursor-pointer transition-colors duration-300 ${textColorClass}`}
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-current group-hover:bg-[#d4a373] group-hover:text-white transition-colors">
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </div>
        </button>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#1a2e22] flex flex-col items-center justify-center overflow-hidden"
          >
            <nav className="relative z-50 flex flex-col items-center gap-6 md:gap-8 text-[#f4f4f0]">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: 0, opacity: 0, filter: "blur(10px)" }}
                  transition={{
                    delay: 0.3 + (i * 0.1),
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl md:text-8xl font-serif hover:italic hover:text-[#d4a373] transition-all cursor-pointer block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex gap-6 text-[#f4f4f0]/60"
            >
              <a href={CONTACT_INFO.instagram} target="_blank" className="hover:text-[#d4a373] transition-colors cursor-pointer"><Instagram /></a>
              <a href={CONTACT_INFO.facebook} target="_blank" className="hover:text-[#d4a373] transition-colors cursor-pointer"><Facebook /></a>
              <a href={CONTACT_INFO.tiktok} target="_blank" className="hover:text-[#d4a373] transition-colors cursor-pointer"><TikTokIcon /></a>
              <a href={CONTACT_INFO.whatsappLink} target="_blank" className="hover:text-[#d4a373] transition-colors cursor-pointer"><WhatsAppIcon /></a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#d4a373] transition-colors cursor-pointer"><Mail /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}