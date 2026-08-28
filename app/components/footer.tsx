// app/components/footer.tsx
import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "./icons";
import { CONTACT_INFO } from "../constants";

export function Footer() {
  return (
    <footer id="contato" className="relative z-10 bg-[#1a2e22] text-[#f4f4f0] py-12 px-8 md:px-20 border-t border-[#f4f4f0]/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Esquerda: Identidade + Contato */}
        <div className="text-left">
          <h3 className="text-2xl font-serif mb-2">Dra. Francis Koller</h3>
          
          {/* Nova Localização */}
          <p className="flex items-center gap-2 text-[#d4a373] text-sm mb-4 font-medium tracking-wide">
             <MapPin size={16} /> Atendimento em Sorocaba-SP e região
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-[#f4f4f0]/70">
            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#d4a373] transition-colors flex items-center justify-start gap-2">
              <Mail size={14}/> {CONTACT_INFO.email}
            </a>
            <a href={CONTACT_INFO.whatsappLink} className="hover:text-[#d4a373] transition-colors flex items-center justify-start gap-2">
              <Phone size={14}/> {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Direita: Redes Sociais */}
        <div className="flex gap-5">
            <a href={CONTACT_INFO.instagram} target="_blank" className="text-[#f4f4f0]/60 hover:text-[#d4a373] hover:scale-110 transition-all"><Instagram size={20} /></a>
            <a href={CONTACT_INFO.facebook} target="_blank" className="text-[#f4f4f0]/60 hover:text-[#d4a373] hover:scale-110 transition-all"><Facebook size={20} /></a>
            <a href={CONTACT_INFO.tiktok} target="_blank" className="text-[#f4f4f0]/60 hover:text-[#d4a373] hover:scale-110 transition-all"><TikTokIcon size={20} /></a>
            <a href={CONTACT_INFO.whatsappLink} target="_blank" className="text-[#f4f4f0]/60 hover:text-[#d4a373] hover:scale-110 transition-all"><WhatsAppIcon size={20} /></a>
        </div>
      </div>

            {/* Crédito Mindsite */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <div className="flex items-center gap-1.5 font-brand text-sm tracking-wider">
                <span>Desenvolvido por</span>
                <a
                  href="https://www.mindsite.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-koko-light/80 hover:text-koko-sun transition-colors duration-300 cursor-pointer"
                >
                  Mindsite
                </a>
              </div>
              <a
                href="https://www.mindsite.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] md:text-xs text-koko-light/40 hover:text-koko-light/80 transition-colors duration-300 italic cursor-pointer"
              >
                Faça o seu trabalho se destacar no mundo digital. Conheça.
              </a>
            </div>
    </footer>
  );
}