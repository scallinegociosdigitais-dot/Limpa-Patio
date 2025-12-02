import React from 'react';
import { Mail, Phone, Lock, BarChart2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenDashboard }) => {
  const { content } = useContent();
  const { footer } = content;

  return (
    <footer className="bg-[#e22446] text-white pt-12 pb-8 overflow-hidden relative font-sans">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Section - Brand or Image */}
        <div className="flex flex-col items-center mb-8 md:mb-0 relative">
          
          {footer.leftImage ? (
             <div className="relative z-10 hover:scale-105 transition-transform duration-300">
                <img 
                    src={footer.leftImage} 
                    alt="Destaque Rodapé" 
                    className="max-w-[200px] md:max-w-[280px] h-auto object-contain drop-shadow-2xl"
                />
             </div>
          ) : (
            <>
              {/* Sticker Effect Container */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 z-10 group cursor-default">
                {/* Sticker Body */}
                <div className="absolute inset-0 bg-[#E11D2B] rounded-full border-[4px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="border-2 border-white/20 rounded-full w-[90%] h-[90%] flex flex-col items-center justify-center p-4">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-center drop-shadow-md" style={{ fontFamily: 'Impact, sans-serif' }}>
                            LIMPA<br/>PÁTIO
                        </h2>
                    </div>
                </div>
                
                {/* Peel Effect (Simulated) */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/30 to-transparent rounded-bl-[3rem] pointer-events-none border-b border-l border-white/10"></div>
              </div>

              {/* Cars Overlay */}
              <div className="flex items-end justify-center -mt-12 md:-mt-16 space-x-[-30px] z-20 relative w-full max-w-xs pointer-events-none">
                <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=300&q=80" className="w-20 md:w-28 h-auto object-contain drop-shadow-lg transform -rotate-6 translate-y-2 grayscale-[10%] hover:grayscale-0 transition-all" alt="Car 1" />
                <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=300&q=80" className="w-28 md:w-36 h-auto object-contain drop-shadow-2xl z-10 hover:scale-105 transition-transform" alt="Car 2" />
                <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" className="w-20 md:w-28 h-auto object-contain drop-shadow-lg transform rotate-6 translate-y-2 grayscale-[10%] hover:grayscale-0 transition-all" alt="Car 3" />
              </div>
            </>
          )}

        </div>

        {/* Right Section - Contact & Info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4 md:pl-10 max-w-xl">
           
           <div>
              <h3 className="text-lg font-bold mb-2">Contato</h3>
              <div className="flex flex-col gap-2 items-center md:items-end text-[12px]">
                 <a href={`mailto:${footer.contactEmail}`} className="flex items-center gap-2 hover:text-red-100 transition-colors group">
                    <Mail size={16} fill="currentColor" className="text-white group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Email: {footer.contactEmail}</span>
                 </a>
                 <a href={`tel:${footer.contactPhone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-red-100 transition-colors group">
                    <Phone size={16} fill="currentColor" className="text-white group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Fone: {footer.contactPhone}</span>
                 </a>
              </div>
           </div>

           <div className="text-[12px] opacity-90 border-t border-white/20 pt-4 w-full md:w-auto flex flex-col md:items-end items-center">
              <p>{footer.copyrightText}</p>
              <div className="mt-1 flex items-center gap-2">
                 <span>{footer.developerText}</span>
                 {/* Botão secreto para Admin */}
                 <button 
                    onClick={onOpenAdmin} 
                    className="opacity-10 hover:opacity-100 transition-opacity p-1 cursor-pointer text-white"
                    title="Acesso Restrito"
                 >
                    <Lock size={10} />
                 </button>
                 {/* Botão secreto para Dashboard */}
                 <button 
                    onClick={onOpenDashboard} 
                    className="opacity-10 hover:opacity-100 transition-opacity p-1 cursor-pointer text-white"
                    title="Dashboard Analytics"
                 >
                    <BarChart2 size={10} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};