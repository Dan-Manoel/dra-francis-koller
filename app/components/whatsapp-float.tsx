// app/components/whatsapp-float.tsx
"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./icons";
import { CONTACT_INFO } from "../constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={CONTACT_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      // CORREÇÃO: Cor ajustada para o Verde Folha (#4a6741)
      className="whatsapp-button fixed bottom-6 right-6 z-40 bg-[#4a6741] text-white p-3 md:p-4 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(74,103,65,0.4)] hover:bg-[#3b5234] cursor-pointer flex items-center justify-center transition-colors duration-300"
      
      // Animação de Entrada (Pop)
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      
      // Animação de Hover
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Ícone */}
      <WhatsAppIcon size={32} />
      
      {/* Pulso sutil com a nova cor */}
      <span className="absolute inset-0 rounded-full bg-[#4a6741] opacity-20 animate-ping pointer-events-none" />
    </motion.a>
  );
}