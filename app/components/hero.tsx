"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef(null);
  
  // Configuração do Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- PARALLAX ---
  // A imagem desce suavemente
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // O texto sobe levemente
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <main ref={containerRef} className="relative z-10 pt-32 px-8 md:px-20 max-w-7xl mx-auto h-screen flex flex-col justify-center">
        
        {/* --- IMAGEM DA DRA. FRANCIS (Abstrata) --- */}
        <motion.div 
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          // AJUSTE FINO DE POSIÇÃO:
          // md:-top-[5%] -> Sobe apenas um pouco para fora do alinhamento (elegante)
          // md:-right-[5%] -> Desloca levemente para a direita
          className="absolute right-0 md:-right-[5%] top-[15%] md:-top-[-10%] w-[60vw] md:w-[40vw] max-w-[550px] aspect-[4/5] -z-10"
        >
            <div className="relative w-full h-full overflow-hidden rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-2xl shadow-[#1a2e22]/10">
               <Image 
                 src="/hero_profile_francis.jpg" 
                 alt="Dra. Francis Koller" 
                 fill
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 priority
               />
               <div className="absolute inset-0 bg-[#1a2e22]/10 mix-blend-multiply" />
            </div>
        </motion.div>

        {/* Wrapper do Texto com Parallax */}
        <motion.div style={{ y: yText }} className="relative z-10">
            
            {/* TEXTO HERO 1 */}
            {/* AJUSTE: py-4 evita cortes | text-[11vw] mantém grandioso sem estourar */}
            <div className="overflow-hidden py-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="text-[12vw] md:text-[11vw] leading-[1.1] font-serif text-[#1a2e22]"
              >
                Terapia
              </motion.h1>
            </div>

            {/* TEXTO HERO 2 */}
            {/* AJUSTE: py-4 evita cortes | Margem negativa controlada */}
            <div className="overflow-hidden py-4 -mt-4 md:-mt-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="text-[12vw] md:text-[11vw] leading-[1.1] font-serif italic text-[#4a6741] ml-16 md:ml-32 xl:text-[150px]"
                
              >
                Integrativa
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 flex flex-col md:flex-row justify-between items-end max-w-4xl"
            >
              <p className="font-sans text-lg md:text-xl text-[#1a2e22]/80 max-w-sm leading-relaxed backdrop-blur-sm">
                Restaurando a harmonia natural do corpo através de uma abordagem que une ortopedia avançada e terapias holísticas.
              </p>
              
              <a href="#contato" className="mt-8 md:mt-0 group flex items-center gap-4 border-b border-[#1a2e22] pb-2 cursor-none">
                <span className="uppercase tracking-widest text-sm font-semibold">Agendar Consulta</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
              </a>
            </motion.div>

        </motion.div>
      </main>
  );
}