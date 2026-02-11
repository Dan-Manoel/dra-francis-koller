"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Methodology() {
  return (
    <section className="relative z-10 py-32 px-8 md:px-20">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div>
            <h2 className="text-5xl font-serif text-[#1a2e22] mb-6">A Natureza do Movimento</h2>
            <p className="text-[#1a2e22]/70 text-lg leading-relaxed mb-8">
               Assim como a folha da Costela de Adão se adapta à luz, nosso corpo busca constantemente o equilíbrio. Meu trabalho é guiar essa adaptação, removendo bloqueios e permitindo que a cura flua naturalmente.
            </p>
            <button className="px-8 py-4 bg-[#1a2e22] text-[#f4f4f0] rounded-full hover:bg-[#4a6741] transition-colors cursor-none">
               Conheça minha metodologia
            </button>
         </div>
         <div className="relative h-[600px] w-full bg-[#f4f4f0] overflow-hidden rounded-lg group shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center text-[#1a2e22]/20 font-serif text-4xl italic">
               Imagem Conceitual
            </div>
            
            <motion.div 
               animate={{ y: [0, -20, 0] }} 
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-10 right-10 w-48 h-48 opacity-80 mix-blend-multiply"
            >
               <Image 
                  src="/efeitos/palmleaf.jpg" 
                  alt="folha decorativa" 
                  width={200} 
                  height={200} 
                  className="object-contain"
                />
            </motion.div>
         </div>
      </div>
    </section>
  );
}