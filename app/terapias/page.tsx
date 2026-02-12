"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { SERVICES_DATA } from "../data/services-data";
import { CONTACT_INFO } from "../constants";

export default function TerapiasPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSchedule = () => {
    const selectedNames = SERVICES_DATA
      .filter((s) => selectedItems.includes(s.id))
      .map((s) => s.title)
      .join(", ");

    const message = `Olá, Dra. Francis. Vim pelo site e gostaria de agendar uma consulta para: ${selectedNames}.`;
    const encodedMessage = encodeURIComponent(message);
    const phone = CONTACT_INFO.whatsappLink.split("wa.me/")[1].split("?")[0];
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-[#f4f4f0] min-h-screen cursor-none">
      <Navigation />

      <div className="pt-40 pb-12 px-8 md:px-20 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#1a2e22]/60 hover:text-[#1a2e22] mb-8 cursor-pointer transition-colors">
          <ArrowLeft size={18} /> Voltar para Home
        </Link>
        <h1 className="text-4xl md:text-7xl font-serif text-[#1a2e22] mb-6">
          Menu de Terapias
        </h1>
        <p className="text-lg text-[#1a2e22]/70 max-w-2xl">
          Selecione os tratamentos abaixo e agende sua consulta personalizada.
        </p>
      </div>

      <div className="px-8 md:px-20 pb-40 max-w-6xl mx-auto flex flex-col gap-12">
        {SERVICES_DATA.map((service, index) => {
          const isSelected = selectedItems.includes(service.id);

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.6, delay: 0 }}
              className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${
                isSelected ? "border-[#d4a373]" : "border-transparent"
              }`}
            >
              {/* --- 1. IMAGEM DE FUNDO (Cobre tudo) --- */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-100"
                />
              </div>

              {/* --- 2. DEGRADÊ (Para leitura do texto) --- */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none" />

              {/* OVERLAY DE SELEÇÃO (Check Dourado) */}
              <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#d4a373]/20 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none"
                    >
                      <div className="bg-[#d4a373] text-white p-3 rounded-full shadow-lg">
                        <Check size={32} />
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>

              {/* --- 3. CONTEÚDO (Texto sobreposto) --- */}
              {/* pb-32 para garantir que o texto não desça demais sobre a imagem no fundo */}
              <div className="relative z-10 p-8 md:p-12 pb-32 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                     <h3 className="text-2xl md:text-4xl font-serif text-[#1a2e22] max-w-2xl">{service.title}</h3>
                     {isSelected && <span className="text-xs font-bold text-[#d4a373] uppercase tracking-widest border border-[#d4a373] px-2 py-1 rounded bg-white">Selecionado</span>}
                  </div>
                  
                  <div className="prose prose-lg text-[#1a2e22]/80 leading-relaxed max-w-3xl">
                    <p className="font-medium mb-4 text-[#1a2e22]">{service.description}</p>
                    <p className="text-sm md:text-base text-[#1a2e22]/70 whitespace-pre-wrap">
                        {service.details}
                    </p>
                  </div>
                </div>

                {/* BOTÃO E PREÇO NO RODAPÉ DO CARD */}
                {/* CORREÇÃO: Removi o box (bg-white/50, rounded, etc) e mantive apenas a borda superior (border-t) */}
                <div className="flex justify-between items-end border-t border-[#1a2e22]/10 pt-6 mt-8">
                   
                   {/* PREÇO */}
                   <div>
                        <span className="block text-[10px] uppercase tracking-widest text-[#1a2e22]/60 font-bold mb-1">Valor da Sessão</span>
                        <span className="text-2xl md:text-3xl font-serif text-[#1a2e22]">
                            R$ {service.price}
                        </span>
                   </div>

                   {/* BOTÃO */}
                   <button
                    onClick={() => toggleSelection(service.id)}
                    className={`px-6 py-3 md:px-8 md:py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                      isSelected
                        ? "bg-[#1a2e22] text-[#f4f4f0] hover:bg-[#2a4535]"
                        : "bg-white border border-[#1a2e22] text-[#1a2e22] hover:bg-[#1a2e22] hover:text-[#f4f4f0]"
                    }`}
                  >
                    {isSelected ? <>Remover</> : <>Selecionar <Plus size={14} /></>}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full bg-[#1a2e22] text-[#f4f4f0] z-50 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-lg md:text-xl font-serif">
                  <span className="font-bold text-[#d4a373]">{selectedItems.length}</span> {selectedItems.length === 1 ? "selecionado" : "selecionados"}
                </p>
              </div>
              <button
                onClick={handleSchedule}
                className="bg-[#f4f4f0] text-[#1a2e22] px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#d4a373] hover:text-white transition-colors cursor-pointer shadow-lg whitespace-nowrap"
              >
                Agendar WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}