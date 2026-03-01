
"use client";

import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "../components/icons";
import { CONTACT_INFO } from "../constants";

export default function ContatoPage() {
    return (
        <div className="bg-[#f4f4f0] min-h-screen">
            <Navigation />

            <main className="pt-40 pb-20 px-8 md:px-20 max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-serif text-[#1a2e22] mb-12">
                    Contato & Localização
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Contact Information Block */}
                    <div className="flex flex-col gap-10">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif text-[#1a2e22]">Canais de Atendimento</h3>
                            <p className="text-[#1a2e22]/70 mb-6">
                                Entre em contato para agendar sua avaliação ou tirar dúvidas sobre nossos tratamentos.
                            </p>

                            <a href={CONTACT_INFO.whatsappLink} target="_blank" className="flex items-center gap-4 text-xl hover:text-[#d4a373] transition-colors group cursor-pointer">
                                <div className="bg-[#1a2e22] text-white p-3 rounded-full group-hover:bg-[#d4a373] transition-colors">
                                    <WhatsAppIcon size={24} />
                                </div>
                                <span className="font-medium">Agendar pelo WhatsApp</span>
                            </a>

                            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 text-xl hover:text-[#d4a373] transition-colors group cursor-pointer">
                                <div className="bg-[#1a2e22] text-white p-3 rounded-full group-hover:bg-[#d4a373] transition-colors">
                                    <Mail size={24} />
                                </div>
                                <span>{CONTACT_INFO.email}</span>
                            </a>

                            <div className="flex items-center gap-4 text-xl text-[#1a2e22]">
                                <div className="bg-[#1a2e22] text-white p-3 rounded-full">
                                    <Phone size={24} />
                                </div>
                                <span>{CONTACT_INFO.phoneDisplay}</span>
                            </div>
                        </div>

                        {/* Operating Hours */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-serif text-[#1a2e22] flex items-center gap-2">
                                <Clock size={24} className="text-[#d4a373]" /> Horário de Atendimento
                            </h3>
                            <ul className="text-[#1a2e22]/80 space-y-2">
                                <li className="flex justify-between border-b border-[#1a2e22]/10 pb-2">
                                    <span>Segunda a Sexta</span>
                                    <span className="font-medium">08:00 - 18:00</span>
                                </li>
                                <li className="flex justify-between border-b border-[#1a2e22]/10 pb-2">
                                    <span>Sábado</span>
                                    <span className="font-medium">08:00 - 12:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Location & Interactive Map */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-[#1a2e22]/5">
                        <h3 className="text-2xl font-serif text-[#1a2e22] mb-6 flex items-center gap-2">
                            <MapPin size={24} className="text-[#d4a373]" /> Onde estamos
                        </h3>

                        <address className="not-italic text-[#1a2e22]/80 mb-8 text-lg">
                            <strong>Consultório Dra. Francis Koller</strong><br />
                            R. Antônio Scarpa Pachêco Leite, 330 - Jardim Sao Luis,<br />
                            Sorocaba - SP
                        </address>

                        {/* Google Maps Embed */}
                        <div className="w-full h-80 rounded-lg overflow-hidden shadow-sm border border-[#1a2e22]/10">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1513.9548032615073!2d-47.4367974194675!3d-23.533010203680167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf61c240330dff%3A0xb020f23d4e307616!2sR.%20Ant%C3%B4nio%20Scarpa%20Pach%C3%AAco%20Leite%2C%20330%20-%20Jardim%20Sao%20Luis%2C%20Votorantim%20-%20SP%2C%2018112-750!5e0!3m2!1spt-BR!2sbr!4v1770864782397!5m2!1spt-BR!2sbr" // Google Maps embedded source URL
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <p className="mt-4 text-sm text-[#1a2e22]/60">
                            *Estacionamento disponível no local.
                        </p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}