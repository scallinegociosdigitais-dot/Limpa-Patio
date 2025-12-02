import React from 'react';
import { Menu, Car } from 'lucide-react';
import { useContent } from '../context/ContentContext';

// Simple WhatsApp Icon SVG
const WhatsAppIconHeader = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export const Header: React.FC = () => {
  const { content } = useContent();
  const { header } = content;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          {header.logoImage ? (
            <img 
              src={header.logoImage} 
              alt={header.logoTitle} 
              className="h-10 md:h-12 w-auto object-contain"
            />
          ) : (
            <>
              <div className="bg-brand-red p-1.5 rounded-lg text-white">
                <Car size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-brand-red tracking-tighter uppercase">{header.logoTitle}</span>
                <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase">{header.logoSubtitle}</span>
              </div>
            </>
          )}
        </div>

        {/* Desktop Nav - IDs linked specifically to the requested sections */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a 
            href="#parceiros" 
            onClick={(e) => handleScroll(e, 'parceiros')}
            className="hover:text-brand-red transition-colors cursor-pointer"
          >
            {header.navLink1}
          </a>
          <a 
            href="#mega-feirao" 
            onClick={(e) => handleScroll(e, 'mega-feirao')}
            className="hover:text-brand-red transition-colors cursor-pointer"
          >
            {header.navLink2}
          </a>
          <a 
            href="#novidades" 
            onClick={(e) => handleScroll(e, 'novidades')}
            className="hover:text-brand-red transition-colors cursor-pointer"
          >
            {header.navLink3}
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          
          {/* WhatsApp Button */}
          {header.headerWhatsapp && (
             <a 
                href={header.headerWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-[#128C7E] transition-all shadow-sm"
             >
                <WhatsAppIconHeader />
                WhatsApp
             </a>
          )}

          {/* Fale Conosco / Area Lojista */}
          <a 
            href={header.btnLojistaUrl}
            target={header.btnLojistaUrl.startsWith('#') ? '_self' : '_blank'}
            className="hidden md:block text-brand-red font-bold text-sm border-2 border-brand-red px-4 py-2 rounded-full hover:bg-brand-red hover:text-white transition-all"
          >
            {header.btnLojista}
          </a>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-700">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};