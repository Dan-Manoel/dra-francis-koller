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

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#f4f4f0]/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#f4f4f0]/30">
         <p>© {new Date().getFullYear()} Dra. Francis Koller. Todos os direitos reservados.</p>
         <a href="https://abovedigital.com.br/" target="_blank" className="hover:text-[#d4a373] transition-colors flex items-center gap-1">
           Desenvolvido por <span className="font-semibold tracking-wide">AboveDigital</span>
         </a>
      </div>
    </footer>
  );
}