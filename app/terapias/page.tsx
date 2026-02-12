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
              // CORREÇÃO DE PERFORMANCE: Carrega 200px ANTES de entrar na tela
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.6, delay: 0 }} // Tirei o delay para ser instantâneo ao rolar
              className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row border-2 ${
                isSelected ? "border-[#d4a373]" : "border-transparent"
              }`}
            >
              <div className="relative h-64 md:h-auto md:w-1/3 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#d4a373]/30 backdrop-blur-[2px] z-10 flex items-center justify-center"
                    >
                      <div className="bg-[#d4a373] text-white p-3 rounded-full shadow-lg">
                        <Check size={32} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-8 md:p-10 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-2xl md:text-3xl font-serif text-[#1a2e22]">{service.title}</h3>
                     {isSelected && <span className="text-xs font-bold text-[#d4a373] uppercase tracking-widest border border-[#d4a373] px-2 py-1 rounded">Selecionado</span>}
                  </div>
                  
                  <p className="text-[#1a2e22]/80 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <p className="text-[#1a2e22]/70 text-sm leading-relaxed mb-8">
                    {service.details}
                  </p>
                </div>

                <div className="flex justify-end">
                   <button
                    onClick={() => toggleSelection(service.id)}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#1a2e22] text-[#f4f4f0] hover:bg-[#2a4535]"
                        : "border border-[#1a2e22] text-[#1a2e22] hover:bg-[#1a2e22] hover:text-[#f4f4f0]"
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