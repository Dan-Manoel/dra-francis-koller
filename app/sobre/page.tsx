// app/sobre/page.tsx
"use client";

import Image from "next/image";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { motion } from "framer-motion";

export default function SobrePage() {
  return (
    <div className="bg-[#f4f4f0] min-h-screen">
      <Navigation />

      <main className="pt-32 md:pt-40 pb-20 px-8 md:px-20 max-w-7xl mx-auto">
        
        {/* Header da Página */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 md:mb-24 text-center md:text-left"
        >
            <span className="uppercase tracking-[0.2em] text-xs font-medium text-[#1a2e22]/60 mb-4 block">
                Conheça a especialista
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-[#1a2e22]">
                Sobre a Dra. Francis
            </h1>
        </motion.div>

        {/* Seção 1: Imagem Principal e Texto Introdutório */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
            >
                {/* Placeholder Imagem 1 - Troque pelo arquivo real da Dra */}
                <Image 
                    src="/hero_profile_francis.jpg" 
                    alt="Dra. Francis Koller" 
                    fill 
                    className="object-cover"
                />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg text-[#1a2e22]/80"
            >
                <h3 className="text-3xl font-serif text-[#1a2e22] mb-6">Uma visão integrativa da saúde</h3>
                <p className="mb-4">
                    Com anos de experiência clínica, dedico minha carreira a entender o corpo humano não como partes isoladas, mas como um sistema complexo e interconectado.
                </p>
                <p>
                    Minha abordagem une o melhor da medicina tradicional com terapias complementares avançadas, buscando sempre tratar a causa raiz das dores e disfunções, não apenas os sintomas.
                </p>
            </motion.div>
        </div>

        {/* Seção 2: Texto Profundo e Imagens Secundárias */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Texto */}
            <div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-3xl font-serif text-[#1a2e22] mb-6">Formação e Filosofia</h3>
                <div className="prose text-[#1a2e22]/80">
                    <p className="mb-4">
                        Acredito que cada paciente é único. Por isso, meus protocolos são 100% personalizados, utilizando tecnologias como termografia e ozonioterapia aliadas a um olhar humano e acolhedor.
                    </p>
                    <p>
                        O objetivo final é devolver não apenas a mobilidade, mas a qualidade de vida e a alegria de viver sem dor.
                    </p>
                </div>
            </div>

            {/* Grid de Imagens Menores */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4 order-1 md:order-2">
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[4/5] rounded-lg overflow-hidden"
                >
                     {/* Placeholder Imagem 2 */}
                    <Image 
                        src="/services/cone.jpg" 
                        alt="Atendimento Clínico" 
                        fill 
                        className="object-cover"
                    />
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[4/5] rounded-lg overflow-hidden mt-8 md:mt-16"
                >
                     {/* Placeholder Imagem 3 */}
                    <Image 
                        src="/services/reiki.jpg" 
                        alt="Tecnologia e Cuidado" 
                        fill 
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}