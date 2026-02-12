"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "../data/services-data";

// --- PREPARAÇÃO DOS DADOS ---
const half = Math.ceil(SERVICES_DATA.length / 2);
const topRaw = SERVICES_DATA.slice(0, half);
const botRaw = SERVICES_DATA.slice(half);
const SERVICES_TOP = [...topRaw, ...topRaw, ...topRaw, ...topRaw];
const SERVICES_BOTTOM = [...botRaw, ...botRaw, ...botRaw, ...botRaw];

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- LÓGICA DE TRAVAMENTO (LENIS COMPATIBLE) ---
  useEffect(() => {
    if (selectedService) {
      document.documentElement.classList.add("has-modal-open");
      document.body.classList.add("has-modal-open"); 
    } else {
      document.documentElement.classList.remove("has-modal-open");
      document.body.classList.remove("has-modal-open"); 
    }
    return () => { 
      document.documentElement.classList.remove("has-modal-open");
      document.body.classList.remove("has-modal-open");
    };
  }, [selectedService]);

  return (
    <section className="relative z-10 py-24 bg-[#f4f4f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-20 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-[#1a2e22]">
          Protocolos Exclusivos
        </h2>
      </div>

      <div className="flex flex-col gap-16">
        <ScrollableRow data={SERVICES_TOP} direction="left" speed={0.6} onSelect={setSelectedService} />
        <ScrollableRow data={SERVICES_BOTTOM} direction="right" speed={0.6} onSelect={setSelectedService} />
      </div>

      {/* --- MODAL COM PORTAL --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-[#1a2e22]/90 backdrop-blur-md cursor-auto"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl h-[85vh] md:h-[600px] bg-[#f4f4f0] rounded-lg overflow-hidden shadow-2xl flex flex-col"
              >
                {/* --- IMAGEM DE FUNDO DESKTOP --- */}
                <div className="hidden md:block absolute inset-0 z-0">
                  <Image 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    fill 
                    className="object-cover opacity-20 md:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f4f4f0] via-[#f4f4f0]/95 to-transparent md:bg-gradient-to-r md:from-[#f4f4f0] md:via-[#f4f4f0]/95 md:to-transparent" />
                </div>

                {/* --- IMAGEM DE FUNDO MOBILE (RODAPÉ) --- */}
                <div className="md:hidden absolute bottom-0 left-0 w-full h-[40%] z-0 pointer-events-none">
                   <Image 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    fill 
                    className="object-cover opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f0] via-[#f4f4f0]/60 to-transparent" />
                </div>

                {/* Botão Fechar */}
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-[#1a2e22] text-[#f4f4f0] rounded-full hover:bg-[#4a6741] transition-all cursor-pointer shadow-lg"
                >
                  <X size={20} />
                </button>

                {/* Conteúdo Textual */}
                <div className="relative z-10 w-full md:w-2/3 h-full flex flex-col">
                  
                  {/* 1. CABEÇALHO FIXO */}
                  <div className="pt-8 px-6 md:pt-12 md:px-12 pb-2 shrink-0">
                    <h3 className="text-3xl md:text-5xl font-serif text-[#1a2e22] leading-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                  
                  {/* 2. CORPO (Texto com Rolagem) */}
                  <div 
                    className="modal-scroll-content flex-1 overflow-y-auto px-6 md:px-12 py-2 scrollbar-thin scrollbar-thumb-[#1a2e22]/20 scrollbar-track-transparent"
                    data-lenis-prevent="true"
                  >
                    <div className="prose prose-lg text-[#1a2e22]/80 leading-relaxed">
                      <p className="mb-4 font-medium">{selectedService.description}</p>
                      <p className="whitespace-pre-wrap">{selectedService.details}</p>
                    </div>
                  </div>

                  {/* 3. RODAPÉ FIXO (Botão + Preço) */}
                  <div className="pb-8 px-6 md:pb-12 md:px-12 pt-6 shrink-0 md:bg-transparent flex items-center justify-between gap-4">
                    
                    <Link 
                      href="/terapias" 
                      className="inline-flex items-center gap-2 bg-[#1a2e22] text-[#f4f4f0] px-6 py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:bg-[#4a6741] transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Ver Catálogo
                      <ArrowUpRight size={16} />
                    </Link>

                    {/* PREÇO */}
                    <div className="text-right">
                        <span className="text-2xl font-serif text-[#1a2e22]">
                            R$ {selectedService.price}
                        </span>
                    </div>

                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// --- COMPONENTES AUXILIARES ---

function ScrollableRow({ data, direction, speed, onSelect }: { data: any[], direction: "left" | "right", speed: number, onSelect: (s: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Controle de "arrasto" vs "clique"
  const didMove = useRef(false);
  // Controle de "Primeiro Clique (Parar)" vs "Segundo Clique (Abrir)"
  const [hasStopped, setHasStopped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        const middle = (container.scrollWidth - container.clientWidth) / 2;
        container.scrollLeft = middle;
        scrollAccumulator.current = middle;
        setIsInitialized(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    let animationFrameId: number;
    const container = containerRef.current;
    const autoScroll = () => {
      if (container) {
        if (!isPaused && !isDragging) {
          if (direction === "left") scrollAccumulator.current += speed;
          else scrollAccumulator.current -= speed;
          const maxScroll = container.scrollWidth - container.clientWidth;
          const buffer = 50;
          if (scrollAccumulator.current >= maxScroll - buffer) scrollAccumulator.current = maxScroll / 2;
          else if (scrollAccumulator.current <= buffer) scrollAccumulator.current = maxScroll / 2;
          container.scrollLeft = scrollAccumulator.current;
        } else {
          scrollAccumulator.current = container.scrollLeft;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInitialized, isPaused, isDragging, direction, speed]);

  // Função centralizada para retomar o scroll e resetar o estado de clique
  const startResumeTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
      setHasStopped(false); // Reseta: o próximo clique terá que parar novamente
    }, 3000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setIsPaused(true);
    didMove.current = false; 
    
    if (timerRef.current) clearTimeout(timerRef.current);
    if (containerRef.current) {
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeftStart.current = containerRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;

    if (Math.abs(x - startX.current) > 5) {
      didMove.current = true;
    }
  };
  
  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startResumeTimer(); // Usa a função centralizada
    }
  };

  const handleCardClick = (service: any) => {
    if (didMove.current) return;

    // LÓGICA DO CLIQUE DUPLO:
    // 1. Se ainda não paramos o carrossel (hasStopped = false), o clique serve para PARAR.
    if (!hasStopped) {
      setHasStopped(true);
      setIsPaused(true);
      if (timerRef.current) clearTimeout(timerRef.current); // Cancela o resume automático imediato, mantendo pausado
      return; 
    }

    // 2. Se já estava parado (hasStopped = true), o clique ABRE o modal.
    onSelect(service);
  };

  const handleMouseEnterSection = () => document.body.classList.add("grabbing-mode");
  const handleMouseLeaveSection = () => {
    document.body.classList.remove("grabbing-mode");
    handleMouseUpOrLeave();
  };

  return (
    <div className="relative w-full" onMouseEnter={handleMouseEnterSection} onMouseLeave={handleMouseLeaveSection}>
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={() => { setIsPaused(true); if (timerRef.current) clearTimeout(timerRef.current); }}
        onTouchEnd={() => { startResumeTimer(); }} // Usa a função centralizada
        className={`flex gap-8 overflow-x-auto pb-8 px-8 md:px-20 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} scrollbar-thin scrollbar-track-[#1a2e22]/5 scrollbar-thumb-[#1a2e22]/40 hover:scrollbar-thumb-[#4a6741] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-[#1a2e22]/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#1a2e22]/40 [&::-webkit-scrollbar-thumb]:rounded-full`}
      >
        {data.map((service, index) => (
          <ServiceCard key={`${service.id}-${index}`} service={service} onCardClick={() => handleCardClick(service)} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service, onCardClick }: { service: any, onCardClick: () => void }) {
  return (
    <div 
      onClick={onCardClick}
      className="relative group overflow-hidden rounded-lg w-[300px] md:w-[600px] aspect-[16/9] md:aspect-[4/3] shrink-0 select-none cursor-pointer"
    >
      <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/0 to-transparent opacity-20 pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex justify-between items-end pointer-events-none">
        <div className="max-w-[85%]">
          <h3 className="text-2xl md:text-3xl font-serif text-[#1a2e22] mb-2">{service.title}</h3>
          <p className="text-sm md:text-base text-[#1a2e22]/80 font-medium leading-relaxed">{service.description}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onCardClick(); }}
          className="bg-[#1a2e22] text-[#f4f4f0] p-3 rounded-full translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg pointer-events-auto cursor-pointer hover:bg-[#4a6741] hover:scale-110"
        >
           <ArrowUpRight size={20} />
        </button>
      </div>
    </div>
  );
}