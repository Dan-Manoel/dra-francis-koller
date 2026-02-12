"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// --- DADOS ---
const SERVICES_TOP_RAW = [
  { id: 1, title: "Ortopedia Integrativa", description: "Tratamento da causa raiz conectando corpo e metabolismo.", image: "/services/cone.jpg" },
  { id: 2, title: "Terapia da Dor", description: "Tecnologia avançada para alívio de dores crônicas.", image: "/services/florais.jpg" },
  { id: 3, title: "Infiltração Guiada", description: "Precisão máxima no tratamento articular.", image: "/services/reiki.jpg" },
  { id: 4, title: "Protocolos de Coluna", description: "Recuperação de mobilidade sem cirurgia agressiva.", image: "/services/servico-4.jpg" },
  { id: 5, title: "Saúde Óssea", description: "Prevenção e tratamento avançado de osteoporose.", image: "/services/servico-1.jpg" },
];

const SERVICES_BOTTOM_RAW = [
  { id: 6, title: "Medicina Regenerativa", description: "Estimulo à cura natural dos tecidos biológicos.", image: "/services/servico-2.jpg" },
  { id: 7, title: "Performance Longevidade", description: "Otimização da saúde para viver mais e melhor.", image: "/services/servico-3.jpg" },
  { id: 8, title: "Saúde Metabólica", description: "Equilíbrio químico para fortalecer a estrutura física.", image: "/services/servico-4.jpg" },
  { id: 9, title: "Reabilitação Acelerada", description: "Tecnologias para retorno rápido ao esporte.", image: "/services/servico-1.jpg" },
  { id: 10, title: "Avaliação Biomecânica", description: "Análise detalhada do movimento humano.", image: "/services/servico-2.jpg" },
];

// Quadruplicando dados para buffer infinito
const SERVICES_TOP = [...SERVICES_TOP_RAW, ...SERVICES_TOP_RAW, ...SERVICES_TOP_RAW, ...SERVICES_TOP_RAW];
const SERVICES_BOTTOM = [...SERVICES_BOTTOM_RAW, ...SERVICES_BOTTOM_RAW, ...SERVICES_BOTTOM_RAW, ...SERVICES_BOTTOM_RAW];

export function Services() {
  return (
    <section className="relative z-10 py-24 bg-[#f4f4f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-20 mb-16 text-center">
        <span className="uppercase tracking-[0.2em] text-xs font-medium text-[#1a2e22]/60 mb-4 block">
          Nossas Especialidades
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-[#1a2e22]">
          Protocolos Exclusivos
        </h2>
      </div>

      <div className="flex flex-col gap-16">
        <ScrollableRow data={SERVICES_TOP} direction="left" speed={0.6} />
        <ScrollableRow data={SERVICES_BOTTOM} direction="right" speed={0.6} />
      </div>
    </section>
  );
}

function ScrollableRow({ data, direction, speed }: { data: any[], direction: "left" | "right", speed: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Variáveis para o cálculo do Drag Desktop
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Inicialização
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

  // 2. Loop Principal (Core Logic)
  useEffect(() => {
    if (!isInitialized) return;

    let animationFrameId: number;
    const container = containerRef.current;

    const autoScroll = () => {
      if (container) {
        
        // --- CENÁRIO 1: AUTO-SCROLL ATIVO (Ninguém mexendo) ---
        if (!isPaused && !isDragging) {
          if (direction === "left") {
            scrollAccumulator.current += speed;
          } else {
            scrollAccumulator.current -= speed;
          }

          // Loop Infinito (Teletransporte)
          const maxScroll = container.scrollWidth - container.clientWidth;
          const buffer = 50;

          if (scrollAccumulator.current >= maxScroll - buffer) {
            scrollAccumulator.current = maxScroll / 2;
          } else if (scrollAccumulator.current <= buffer) {
            scrollAccumulator.current = maxScroll / 2;
          }

          container.scrollLeft = scrollAccumulator.current;
        } 
        
        // --- CENÁRIO 2: PAUSADO/ARRASTANDO (CORREÇÃO DO BUG) ---
        // Se estiver pausado (dedo no mobile, mouse dragging, ou timer de espera),
        // precisamos atualizar o acumulador para a posição REAL da tela.
        // Assim, quando o timer acabar, ele retoma exatamente de onde está.
        else {
          scrollAccumulator.current = container.scrollLeft;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInitialized, isPaused, isDragging, direction, speed]);

  // 3. Eventos Unificados

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
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
    const walk = (x - startX.current) * 1.5; // Velocidade do arrasto
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    // Timer de 2 segundos para voltar a andar
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Cursor Logic
  const handleMouseEnterSection = () => document.body.classList.add("grabbing-mode");
  const handleMouseLeaveSection = () => {
    document.body.classList.remove("grabbing-mode");
    handleMouseUpOrLeave();
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnterSection}
      onMouseLeave={handleMouseLeaveSection}
    >
      <div 
        ref={containerRef}
        // Desktop Drag
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        // Mobile Touch (Nativo)
        onTouchStart={() => { 
            setIsPaused(true); 
            if (timerRef.current) clearTimeout(timerRef.current); 
        }}
        onTouchEnd={() => { 
            timerRef.current = setTimeout(() => setIsPaused(false), 2000); 
        }}
        
        className={`
          flex gap-8 overflow-x-auto pb-8 px-8 md:px-20
          /* Cursor do Sistema */
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          
          /* Scrollbar Styling */
          scrollbar-thin scrollbar-track-[#1a2e22]/5 scrollbar-thumb-[#1a2e22]/40 hover:scrollbar-thumb-[#4a6741]
          [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-[#1a2e22]/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#1a2e22]/40 [&::-webkit-scrollbar-thumb]:rounded-full
        `}
      >
        {data.map((service, index) => (
          <ServiceCard key={`${service.id}-${index}`} service={service} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: any }) {
  return (
    <div className="relative group overflow-hidden rounded-lg w-[300px] md:w-[600px] aspect-[16/9] md:aspect-[4/3] shrink-0 select-none">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent opacity-90 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex justify-between items-end pointer-events-none">
        <div className="max-w-[85%]">
          <h3 className="text-2xl md:text-3xl font-serif text-[#1a2e22] mb-2">{service.title}</h3>
          <p className="text-sm md:text-base text-[#1a2e22]/80 font-medium leading-relaxed">{service.description}</p>
        </div>
        <div className="bg-[#1a2e22] text-[#f4f4f0] p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
           <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
  );
}