"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Mail } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { CONTACT_INFO } from "../constants";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Lógica do Cursor
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-[3px] border-[#3b2e50] rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isMenuOpen ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />

      {/* Header Button */}
      <header className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-exclusion text-[#f4f4f0]">
        <div className="text-2xl font-serif font-bold tracking-tighter mix-blend-difference">
          Dra. Francis Koller
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 group cursor-none mix-blend-difference"
        >
          <span className="uppercase text-xs tracking-[0.2em] font-medium group-hover:mr-2 transition-all">
           
          </span>
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-current group-hover:bg-[#f4f4f0] group-hover:text-[#1a2e22] transition-colors">
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </div>
        </button>
      </header>

      {/* Fullscreen Menu */}
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
              {["A Clínica", "Terapias", "Sobre a Dra.", "Contato"].map((item, i) => (
                <motion.a
                  href={item === "Contato" ? "#contato" : "#"}
                  onClick={() => setIsMenuOpen(false)}
                  key={item}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: 0, opacity: 0, filter: "blur(10px)" }}
                  transition={{ 
                    delay: 0.3 + (i * 0.1),
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="text-5xl md:text-8xl font-serif hover:italic hover:text-[#d4a373] transition-all cursor-none"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex gap-6 text-[#f4f4f0]/60"
            >
                <a href={CONTACT_INFO.instagram} target="_blank" className="hover:text-[#d4a373] transition-colors cursor-none"><Instagram /></a>
                <a href={CONTACT_INFO.whatsappLink} target="_blank" className="hover:text-[#d4a373] transition-colors cursor-none"><WhatsAppIcon /></a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#d4a373] transition-colors cursor-none"><Mail /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}