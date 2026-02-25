"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useMotionValueEvent } from "framer-motion";
import { SERVICES_DATA } from "../data/services-data";

// --- DATA PREPARATION ---
const half = Math.ceil(SERVICES_DATA.length / 2);
const SERVICES_TOP = SERVICES_DATA.slice(0, half);
const SERVICES_BOTTOM = SERVICES_DATA.slice(half);

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES_DATA[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- LENIS-COMPATIBLE SCROLL LOCK LOGIC ---
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
    <section className="relative z-10 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-20 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-[#1a2e22]">
          Protocolos Exclusivos
        </h2>
      </div>

      <div className="flex flex-col gap-16">
        <ScrollableRow data={SERVICES_TOP} direction="left" speed={0.3} onSelect={setSelectedService} isModalOpen={!!selectedService} />
        <ScrollableRow data={SERVICES_BOTTOM} direction="right" speed={0.3} onSelect={setSelectedService} isModalOpen={!!selectedService} />
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
                      href={`/terapias#service-${selectedService.id}`}
                      className="inline-flex items-center gap-2 bg-[#1a2e22] text-[#f4f4f0] px-6 py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:bg-[#4a6741] transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Ver Catálogo
                      <ArrowUpRight size={16} />
                    </Link>



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

// --- AUXILIARY COMPONENTS ---

function ScrollableRow({ data, direction, speed, onSelect, isModalOpen = false }: { data: any[], direction: "left" | "right", speed: number, onSelect: (s: any) => void, isModalOpen?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const pauseTimer = useRef<NodeJS.Timeout | null>(null);

  // Tracks pointer down coordinates to distinguish between click events and drag actions.
  const pointerDownPos = useRef({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const isInitialized = useRef(false);
  const isFirstPlay = useRef(true);

  // Measures the width of a single set of content for infinite looping math
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const measuredWidth = containerRef.current.scrollWidth / 2;
        setContentWidth(measuredWidth);

        // Applies an initial offset to misalign the rows visually on first load
        if (!isInitialized.current && measuredWidth > 0) {
          isInitialized.current = true;
          if (direction === "right") {
            x.set(-measuredWidth / 2.5);
          }
        }
      }
    };
    measure();
    setTimeout(measure, 500); // Wait for fonts and images to load before final measurement
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [data]);

  // Wraps the x value seamlessly to create an infinite loop effect
  useMotionValueEvent(x, "change", (latest) => {
    if (contentWidth === 0) return;
    if (latest <= -contentWidth) {
      x.jump(latest + contentWidth);
    } else if (latest >= 0) {
      x.jump(latest - contentWidth);
    }
  });

  const startPauseTimer = () => {
    setIsManuallyPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      setIsManuallyPaused(false);
    }, 3000);
  };

  useEffect(() => {
    if (!isModalOpen && contentWidth > 0) {
      if (isFirstPlay.current) {
        // Starts animating instantly on the first render
        setIsManuallyPaused(false);
        isFirstPlay.current = false;
      } else {
        startPauseTimer();
      }
    } else {
      setIsManuallyPaused(true);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, contentWidth]);

  useAnimationFrame((time, delta) => {
    if (isManuallyPaused || isModalOpen || isDragging || contentWidth === 0) return;
    // Reduced speed to roughly 30% of the normal delta for smoother UX
    const moveBy = direction === "left" ? -speed * (delta / 8) : speed * (delta / 8);
    x.set(x.get() + moveBy);
  });

  const handleCardClick = (service: any, e: React.MouseEvent) => {
    // Distinguishes between drag and click by calculating the distance traveled
    const distX = Math.abs(e.clientX - pointerDownPos.current.x);
    const distY = Math.abs(e.clientY - pointerDownPos.current.y);

    // If dragged more than 5px, ignore the click event
    if (distX > 5 || distY > 5) return;

    if (!isManuallyPaused && !isModalOpen) {
      // First click: pause the carousel
      startPauseTimer();
    } else {
      // Second click: open the details modal
      onSelect(service);
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div
        ref={containerRef}
        className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }} // Free space for continuous dragging
        dragElastic={0} // Disables rubber-banding for a more solid drag feel
        dragMomentum={false} // Disables momentum to ensure controlled stopping
        onPointerDown={(e) => {
          pointerDownPos.current = { x: e.clientX, y: e.clientY };
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          startPauseTimer();
        }}
      >
        {/* Renders 2 blocks of the row to establish an endless loop */}
        {[0, 1].map((setIndex) => (
          <div key={`set-${setIndex}`} className="flex gap-8 items-center shrink-0">
            {/* Logo Marker 30% do tamanho (aprox 45px/75px) */}
            <div className="w-[45px] md:w-[75px] shrink-0 flex items-center justify-center opacity-50 px-2 mx-4 md:mx-8 pointer-events-none select-none">
              <Image src="/logo.png" alt="Marker" width={75} height={75} className="object-contain" draggable={false} />
            </div>

            {data.map((service, index) => (
              <ServiceCard
                key={`${service.id}-${index}-${setIndex}`}
                service={service}
                isPaused={isManuallyPaused || isModalOpen}
                onCardClick={(e) => handleCardClick(service, e)}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ServiceCard({ service, isPaused, onCardClick }: { service: any, isPaused: boolean, onCardClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      onClick={onCardClick}
      className={`relative group overflow-hidden rounded-lg w-[300px] md:w-[600px] aspect-[16/9] md:aspect-[4/3] shrink-0 select-none cursor-pointer ${isPaused ? "grayscale-0" : ""}`}
    >
      <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 pointer-events-none" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/0 to-transparent opacity-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex justify-between items-end pointer-events-none">
        <div className="max-w-[85%]">
          <h3 className="text-2xl md:text-3xl font-serif text-[#1a2e22] mb-2">{service.title}</h3>
          <p className="text-sm md:text-base text-[#1a2e22]/80 font-medium leading-relaxed">{service.description}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onCardClick(e); }}
          className={`bg-[#1a2e22] text-[#f4f4f0] p-3 rounded-full transition-all duration-300 shadow-lg pointer-events-auto cursor-pointer hover:bg-[#4a6741] hover:scale-110 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${isPaused
            ? "translate-y-0 opacity-100 md:translate-y-4 md:opacity-0"
            : "translate-y-4 opacity-0"
            }`}
        >
          <ArrowUpRight size={20} />
        </button>
      </div>
    </div>
  );
}