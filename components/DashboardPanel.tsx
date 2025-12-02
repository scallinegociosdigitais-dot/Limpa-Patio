import React, { useMemo, useState } from 'react';
import { X, BarChart2, MousePointer, MessageCircle, ExternalLink, Link, Calendar } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface DashboardPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({ isOpen, onClose }) => {
  const { content } = useContent();
  const { partners, analytics } = content;
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>('all');

  // 1. Extract Available Months from Data
  const availableMonths = useMemo(() => {
    const events = analytics?.clickEvents || [];
    const months = new Set<string>();
    
    events.forEach(event => {
        const date = new Date(event.timestamp);
        // Format: "2025-01" (Sortable key)
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        months.add(key);
    });

    // Convert to array and sort descending (newest first)
    return Array.from(months).sort().reverse().map(key => {
        const [year, month] = key.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        // Capitalize first letter
        return { key, label: label.charAt(0).toUpperCase() + label.slice(1) };
    });
  }, [analytics?.clickEvents]);

  // 2. Aggregate Data based on Filter
  const stats = useMemo(() => {
    const events = analytics?.clickEvents || [];
    
    // Filter events
    const filteredEvents = selectedMonthKey === 'all' 
        ? events 
        : events.filter(e => {
            const date = new Date(e.timestamp);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            return key === selectedMonthKey;
        });

    let totalClicks = 0;
    let totalWebsite = 0;
    let totalWhatsapp = 0;

    // Calculate Partner stats from filtered events
    const partnerMap = new Map<number, { website: number, whatsapp: number }>();

    // Initialize all partners with 0
    partners.forEach(p => partnerMap.set(p.id, { website: 0, whatsapp: 0 }));

    // Tally up events
    filteredEvents.forEach(e => {
        const current = partnerMap.get(e.partnerId) || { website: 0, whatsapp: 0 };
        if (e.type === 'website') current.website++;
        if (e.type === 'whatsapp') current.whatsapp++;
        partnerMap.set(e.partnerId, current);

        totalClicks++;
        if (e.type === 'website') totalWebsite++;
        if (e.type === 'whatsapp') totalWhatsapp++;
    });

    // If "All Time" is selected, we should also include legacy data (clicks before we started tracking timestamps)
    // NOTE: For consistency in this "Pro" view, we might want to stick to the Event Log only to avoid confusion,
    // OR add legacy counts. Let's stick to the Event Log for accuracy in filtering, but fallback to total counters if events are empty and mode is 'all'.
    
    // Construct final list
    const partnerPerformance = partners.map(p => {
      const pStats = partnerMap.get(p.id) || { website: 0, whatsapp: 0 };
      
      // Fallback for Legacy Data (only if showing ALL and no events found for this partner but legacy count exists)
      // This helps if the user had data before this update.
      let finalWebsite = pStats.website;
      let finalWhatsapp = pStats.whatsapp;
      
      if (selectedMonthKey === 'all') {
          const legacyStats = analytics?.partnerClicks?.[p.id];
          // Simple logic: if event log count is significantly lower than legacy count, maybe use legacy?
          // Actually, let's just use the legacy count for "All Time" to ensure past data isn't lost visually
          if (legacyStats) {
             // We can't easily merge them because new events might be double counted if we just add.
             // Strategy: The 'analytics.partnerClicks' is the source of truth for ALL TIME totals.
             // So if mode is 'all', use that.
             finalWebsite = legacyStats.website;
             finalWhatsapp = legacyStats.whatsapp;
          }
      }

      const pTotal = finalWebsite + finalWhatsapp;
      
      // Update totals for top cards if we switched to legacy source
      if (selectedMonthKey === 'all') {
          // Recalculate global totals based on legacy to match
      }

      return {
        ...p,
        stats: {
          website: finalWebsite,
          whatsapp: finalWhatsapp,
          total: pTotal
        }
      };
    });

    // If 'all' was selected, re-sum global totals from the legacy-adjusted partner list to be accurate
    if (selectedMonthKey === 'all') {
        totalClicks = 0;
        totalWebsite = 0;
        totalWhatsapp = 0;
        partnerPerformance.forEach(p => {
            totalClicks += p.stats.total;
            totalWebsite += p.stats.website;
            totalWhatsapp += p.stats.whatsapp;
        });
    }

    // Sort by total clicks descending
    partnerPerformance.sort((a, b) => b.stats.total - a.stats.total);

    return {
      totalClicks,
      totalWebsite,
      totalWhatsapp,
      partnerPerformance
    };
  }, [partners, analytics, selectedMonthKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden animate-in fade-in duration-200">
      
      {/* Main Container */}
      <div className="w-full h-full md:max-w-[480px] md:h-[90vh] bg-[#09090b] md:rounded-[2.5rem] md:border-[8px] md:border-[#1a1a1a] shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Status Bar Fake */}
        <div className="hidden md:flex justify-between px-8 py-3 text-white text-xs font-medium bg-[#09090b] z-20">
            <span>9:41</span>
            <div className="flex gap-1">
                <div className="w-4 h-2 bg-white rounded-sm"></div>
                <div className="w-4 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 border border-white rounded-sm"></div>
            </div>
        </div>

        {/* Dynamic Island */}
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30"></div>

        {/* App Header */}
        <div className="px-6 pt-4 pb-2 z-10 bg-[#09090b]">
            <div className="flex items-center justify-between mb-6">
                <div className="bg-[#E11D2B] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,43,0.4)] w-full">
                    <div className="bg-white/20 p-1 rounded-full">
                        <BarChart2 size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-wide">Dash Pro | Analytics</span>
                </div>
                <button onClick={onClose} className="ml-4 text-gray-500 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Date Filter Dropdown */}
            <div className="bg-[#121212] rounded-xl p-3 flex items-center justify-between text-gray-400 text-xs font-medium mb-6 border border-gray-800 relative">
                <div className="flex items-center gap-2 w-full">
                    <Calendar size={16} className="text-[#E11D2B]" />
                    <select 
                        value={selectedMonthKey}
                        onChange={(e) => setSelectedMonthKey(e.target.value)}
                        className="bg-transparent text-white font-bold w-full outline-none appearance-none cursor-pointer"
                    >
                        <option value="all">Todo o Período</option>
                        {availableMonths.map(month => (
                            <option key={month.key} value={month.key}>{month.label}</option>
                        ))}
                    </select>
                </div>
                <span className="text-[#E11D2B] absolute right-4 pointer-events-none">▼</span>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6 scrollbar-hide">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
                
                {/* Total Clicks */}
                <div className="bg-[#121212] p-4 rounded-2xl border border-gray-800 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#E11D2B]/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-[#E11D2B]/20"></div>
                    <p className="text-gray-400 text-xs font-bold uppercase mb-2 border-b border-gray-800 pb-2 w-fit">Total Interações</p>
                    <div className="flex items-end gap-2">
                        <span className="text-white text-2xl font-black">{stats.totalClicks}</span>
                    </div>
                    <p className="text-[#E11D2B] text-[10px] mt-1">Cliques no Site + WhatsApp</p>
                </div>

                {/* WhatsApp Clicks */}
                <div className="bg-[#121212] p-4 rounded-2xl border border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-1 bg-green-500/50"></div>
                    <p className="text-gray-400 text-xs font-bold uppercase mb-2 border-b border-gray-800 pb-2 w-fit">WhatsApp</p>
                    <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-green-500" />
                        <span className="text-white text-2xl font-black">{stats.totalWhatsapp}</span>
                    </div>
                    <p className="text-green-500/70 text-[10px] mt-1">Leads Diretos</p>
                </div>

                {/* Website Clicks */}
                <div className="bg-[#121212] p-4 rounded-2xl border border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-1 bg-blue-500/50"></div>
                    <p className="text-gray-400 text-xs font-bold uppercase mb-2 border-b border-gray-800 pb-2 w-fit">Site da Loja</p>
                    <div className="flex items-center gap-2">
                        <ExternalLink size={16} className="text-blue-500" />
                        <span className="text-white text-2xl font-black">{stats.totalWebsite}</span>
                    </div>
                    <p className="text-blue-500/70 text-[10px] mt-1">Tráfego Enviado</p>
                </div>

                 {/* Active Partners */}
                 <div className="bg-[#121212] p-4 rounded-2xl border border-gray-800 relative overflow-hidden">
                    <p className="text-gray-400 text-xs font-bold uppercase mb-2 border-b border-gray-800 pb-2 w-fit">Parceiros</p>
                    <div className="flex items-center gap-2">
                        <span className="text-white text-2xl font-black">{stats.partnerPerformance.length}</span>
                    </div>
                    <p className="text-gray-500 text-[10px] mt-1">Lojas Ativas</p>
                </div>
            </div>

            {/* External Data Source Link Button (Read Only) */}
            {content.analytics?.externalSheetUrl && (
                 <a 
                    href={content.analytics.externalSheetUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block bg-[#1a1a1a] p-3 rounded-2xl border border-gray-800 hover:border-[#E11D2B]/50 transition-colors"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#E11D2B]">
                            <Link size={16} />
                            <span className="text-xs font-bold uppercase">Acessar Planilha Externa</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-500" />
                    </div>
                </a>
            )}

            {/* Funnel / Partner List */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">Performance por Loja</h3>
                    <div className="bg-[#1a1a1a] px-3 py-1 rounded-full border border-gray-700">
                        <span className="text-[10px] text-gray-400 uppercase">Ranking</span>
                    </div>
                </div>

                <div className="bg-[#121212] rounded-3xl border border-gray-800 overflow-hidden">
                    {stats.partnerPerformance.length === 0 || stats.totalClicks === 0 ? (
                        <div className="p-8 text-center text-gray-600 text-sm">
                            {selectedMonthKey === 'all' ? 'Nenhum dado registrado ainda.' : 'Nenhum clique registrado neste mês.'}
                        </div>
                    ) : (
                        stats.partnerPerformance.map((partner, index) => (
                            <div key={partner.id} className="p-4 border-b border-gray-800 last:border-0 hover:bg-[#1a1a1a] transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${index < 3 ? 'bg-[#E11D2B] text-white' : 'bg-gray-800 text-gray-500'}`}>
                                            {index + 1}
                                        </span>
                                        <span className="text-white font-bold text-sm">{partner.name}</span>
                                    </div>
                                    <span className="text-[#E11D2B] font-black text-lg">{partner.stats.total}</span>
                                </div>
                                
                                {/* Progress Bar Visual */}
                                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-2 overflow-hidden">
                                    <div 
                                        className="bg-[#E11D2B] h-full rounded-full" 
                                        style={{ width: `${(partner.stats.total / (stats.partnerPerformance[0].stats.total || 1)) * 100}%` }}
                                    ></div>
                                </div>

                                <div className="flex gap-4 text-[10px] text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        Whats: <span className="text-white">{partner.stats.whatsapp}</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        Site: <span className="text-white">{partner.stats.website}</span>
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {/* Bottom Safe Area */}
            <div className="h-8"></div>

        </div>
        
        {/* Footer Fake */}
        <div className="bg-[#09090b] p-4 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-600">
             <span>Atualizado em tempo real</span>
             <span>v1.0.0 Pro</span>
        </div>

      </div>
    </div>
  );
};