// app/sobre/page.tsx
"use client";

import Image from "next/image";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { motion } from "framer-motion";

export default function SobrePage() {
  // Lista de Formações
  const formacoes = [
    "Graduada em Fisioterapia - UNIP",
    "Reabilitação a Pacientes Neurológicos e de Alta Complexidade – Instituto Pesquisa ALBERT EINSTEIN",
    "Pós-graduada em Acupuntura e Terapias Naturais - CETN",
    "Extensão em Acupuntura Aplicada na Neurologia - EBRAMEC",
    "Pós-graduada em Pesquisa da Neurociência nas Doenças do Envelhecimento - FAVENI",
    "Mestrando em Neurociência aplicada à Saúde – FUNIBER",
    "Osteopatia Estrutural e Postural e Terapia Manual – Instituto Francês DOCUSSE",
    "Auriculoterapia Clínica – Escola Francesa Raphael Nogier",
    "Instrutora Pilates Clínico na Dor Crônica – Instituto Krion",
    "Terapias Regenerativas, Biofísica, Ozonioterapia e Suplementação Avançada – UNICER/ Einstein",
    "Terapeuta Floral Especialista em Família Multiespécie – Instituto Florescer Integrativa",
    "Terapia Assistida por Animais Hospital Dante Pazzanese",
    "Arte, Cognição e Comunicação Suplementar e Alternativa - AACD",
    "Terapeuta Integrativa Xamânica – ESA",
    "Resgate de Alma – ESA",
    "Mestre Florais Etéricos Xamânicos e Canalizadora Florais Etéricos de Bach",
    "Mestre em Reiki Xamanico Ma “He”a e reikiana em outras linhagens",
    "Positive Coaching Transpessoal - MEDA",
    "Empower Thyself - Escola Moderna de Mistérios",
    "Naturopatia – Instituto Naturopatia Ponto de Luz",
  ];

  return (
    <div className="bg-[#f4f4f0] min-h-screen">
      <Navigation />

      <main className="pt-32 md:pt-40 pb-20 px-8 md:px-20 max-w-7xl mx-auto">
        
        {/* Header da Página */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 md:mb-20 text-center md:text-left"
        >
            <span className="uppercase tracking-[0.2em] text-xs font-medium text-[#1a2e22]/60 mb-4 block">
                Conheça a especialista
            </span>
            <h1 className="text-4xl md:text-7xl font-serif text-[#1a2e22]">
                Dra. Francis Marione Koller
            </h1>
        </motion.div>

        {/* Seção 1: Bio Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-32">
            
            {/* COLUNA ESQUERDA: Imagem + Texto "Tamboreira" */}
            <div className="flex flex-col gap-8">
                {/* Imagem */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl"
                >
                    <Image 
                        src="/hero_profile_francis.jpg" 
                        alt="Dra. Francis Koller" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-serif text-[#1a2e22] mb-2 leading-tight italic">
                    Fisioterapeuta Especialista em Dor, Neuroreabilitação e Saúde Integrativa
                </h3>
                
            </div>

            {/* COLUNA DIREITA: Texto Bio Principal */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg text-[#1a2e22]/80"
            >
                {/* Subtítulo de Cargos */}


                <div className="space-y-6 text-base md:text-lg leading-relaxed text-justify md:text-left">
                    <p>
                        <strong className="text-[#1a2e22]">Tragetória</strong> — Há mais de duas décadas caminhei pela ciência da Neuro Reabilitação, atuando com a prática clínica onde aprendi que cada corpo-mente possui uma linguagem própria e que cada ser tem um ritmo único de autocura.
                    </p>
                    <p>
                        Com o tempo, também na minha missão na Área da Dor e das Doenças Crônicas Degenerativas, fui integrando técnicas modernas, terapias regenerativas e práticas de cuidado humanizado. Percebi que a dor — física ou emocional — não é um inimigo, mas um mensageiro ancestral, convidando-nos a reconhecer o que precisa ser restaurado.
                    </p>
                    <p>
                        Minha busca constante por aperfeiçoamento me levou a unir ciência, terapias integrativas e conhecimento ancestral, desenvolvendo métodos de cuidado profundo, sensível e efetivo dentro da tricotomia <em>“corpo, alma (sede das emoções) e espírito”</em>.
                    </p>
                    <p>
                        Trabalho para que cada pessoa encontre não apenas alívio, mas reconexão consigo mesma, com sua força vital e com o propósito que a move.
                    </p>
                    <p>
                        Como facilitadora, pesquisadora e terapeuta, trago ao meu trabalho uma visão ampla: corpo, mente, emoções e espírito como expressões interligadas de uma mesma inteligência vital. Minha trajetória profissional nasceu de um chamado profundo: compreender a dor humana em todas as suas camadas — do corpo físico às memórias emocionais, do sistema nervoso às raízes ancestrais que moldam nossa percepção de mundo.
                    </p>
                    {/* O parágrafo da Tamboreira foi removido daqui */}
                    {/* Texto Movido para cá (Legenda da foto) */}
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="border-l-4 border-[#d4a373] pl-4 italic text-[#1a2e22] text-sm md:text-base leading-relaxed"
                >
                    Terapeuta Bioxamânica há mais de 12 anos, entre Círculos de Mulheres e de pessoas que buscam o autoconhecimento, também busco favorecer esse processo de autocura em atendimentos individuais através das terapias bioxamânicas.
                </motion.p>
                </div>
            </motion.div>
        </div>

        {/* Seção 2: Formação e Filosofia */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 border-t border-[#1a2e22]/10 pt-20">
            
            {/* Coluna da Esquerda: Texto de Filosofia + Lista de Formação */}
            <div className="md:col-span-7 order-2 md:order-1">
                
                {/* Bloco Filosofia */}
                <div className="mb-12">
                    <h3 className="text-3xl font-serif text-[#1a2e22] mb-6">Filosofia de Atendimento</h3>
                    <p className="text-lg text-[#1a2e22]/80 leading-relaxed text-justify md:text-left">
                        Acredito que cada paciente é único. Por isso, meus protocolos são 100% personalizados, utilizando tecnologias como termografia e ozonioterapia aliadas a um olhar humano e acolhedor. O objetivo final é devolver não apenas a mobilidade, mas a qualidade de vida e a alegria de viver sem dor.
                    </p>
                </div>

                {/* Lista de Formações Formatada */}
                <div>
                    <h4 className="text-sm font-bold tracking-widest text-[#1a2e22]/60 uppercase mb-6 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-[#d4a373]"></span> Formação Acadêmica & Técnica
                    </h4>
                    
                    <ul className="grid grid-cols-1 gap-3">
                        {formacoes.map((item, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 text-sm md:text-base text-[#1a2e22]/70"
                            >
                                <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-[#d4a373] shrink-0" />
                                <span>{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Coluna da Direita: Imagens Harmonizadas */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4 order-1 md:order-2 self-start">
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg mt-0 md:mt-12"
                >
                     <Image 
                        src="/services/cone.jpg" 
                        alt="Atendimento Clínico" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                    />
                </motion.div>
                
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg"
                >
                     <Image 
                        src="/services/reiki.jpg" 
                        alt="Tecnologia e Cuidado" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                    />
                </motion.div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}