import React from 'react';
import { ExternalLink, MapPin, Car } from 'lucide-react';
import { Partner } from '../types';
import { useContent } from '../context/ContentContext';

// Whatsapp icon as an SVG component for brand color accuracy
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface PartnerCardProps {
  partner: Partner;
  index: number;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner, index }) => {
  const { trackPartnerClick } = useContent();

  // Calculate a unique delay for each card to create a wave/staggered effect
  // We use modulo to cycle the delay so it doesn't get too long for items far down the list
  const delay = `${(index % 5) * 1.5}s`;

  return (
    <>
      <style>
        {`
          @keyframes neon-pulse {
            0%, 100% {
              box-shadow: 0 0 0 rgba(225, 29, 43, 0);
              border-color: rgba(243, 244, 246, 1); /* gray-100 */
            }
            50% {
              box-shadow: 0 0 15px rgba(225, 29, 43, 0.25);
              border-color: rgba(225, 29, 43, 0.4);
            }
          }
          .animate-neon-pulse {
            animation: neon-pulse 4s ease-in-out infinite;
          }
        `}
      </style>

      <div 
        className="bg-white rounded-xl transition-all duration-300 overflow-hidden flex flex-col h-full border group animate-neon-pulse"
        style={{ animationDelay: delay }}
      >
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
          <img 
            src={partner.image} 
            alt={partner.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          {partner.featured && (
            <div className="absolute top-3 left-3 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
              DESTAQUE
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white text-xl font-bold truncate">{partner.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin size={16} className="mr-1 text-brand-red" />
              <span className="line-clamp-1">{partner.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 bg-gray-50 p-2 rounded-lg w-fit">
            <Car size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">{partner.stockCount} ofertas disponíveis</span>
          </div>

          {/* Buttons - Pushing to bottom */}
          <div className="mt-auto grid grid-cols-2 gap-3">
            <a 
              href={partner.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackPartnerClick(partner.id, 'website')}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-brand-red text-brand-red font-bold rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              Site da Loja
              <ExternalLink size={16} />
            </a>
            
            <a 
              href={partner.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackPartnerClick(partner.id, 'whatsapp')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#128C7E] transition-colors shadow-sm text-sm"
            >
              WhatsApp
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};