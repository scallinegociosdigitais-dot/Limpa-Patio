import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Partner, AnalyticsData, ClickEvent, ContentContextType } from '../types';
import { DEFAULT_CONTENT } from '../constants';
import { supabase } from '../lib/supabase';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA FROM SUPABASE
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // 1. Fetch General Config
      const { data: generalData, error: generalError } = await supabase
        .from('site_general')
        .select('*')
        .eq('id', 1)
        .single();

      if (generalError && generalError.code !== 'PGRST116') {
         console.error('Error fetching general:', generalError);
      }

      // 2. Fetch Partners
      const { data: partnersData, error: partnersError } = await supabase
        .from('partners')
        .select('*');

      if (partnersError) console.error('Error fetching partners:', partnersError);

      // 3. Fetch Analytics Events
      const { data: eventsData, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*');

      if (eventsError) console.error('Error fetching analytics:', eventsError);

      // MERGE DATA WITH DEFAULT STRUCTURE
      // This ensures if DB fields are empty, we fallback to defaults so the UI doesn't break
      const newContent: SiteContent = {
        ...DEFAULT_CONTENT,
        header: { ...DEFAULT_CONTENT.header, ...(generalData?.header || {}) },
        hero: { ...DEFAULT_CONTENT.hero, ...(generalData?.hero || {}) },
        teaser: { ...DEFAULT_CONTENT.teaser, ...(generalData?.teaser || {}) }, // ADDED TEASER
        about: { ...DEFAULT_CONTENT.about, ...(generalData?.about || {}) },
        benefits: { ...DEFAULT_CONTENT.benefits, ...(generalData?.benefits || {}) },
        footer: { ...DEFAULT_CONTENT.footer, ...(generalData?.footer || {}) },
        scripts: { ...DEFAULT_CONTENT.scripts, ...(generalData?.scripts || {}) },
        partnersConfig: { ...DEFAULT_CONTENT.partnersConfig, ...(generalData?.partners_config || {}) },
        partners: (partnersData || []).map((p: any) => ({
            id: Number(p.id),
            name: p.name,
            location: p.location,
            image: p.image,
            stockCount: p.stock_count,
            websiteUrl: p.website_url,
            whatsappUrl: p.whatsapp_url,
            featured: p.featured
        })),
        analytics: processAnalytics(eventsData || [])
      };

      setContent(newContent);

    } catch (error) {
      console.error("Critical error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to transform raw event rows into the Analytics Data structure expected by Dashboard
  const processAnalytics = (events: any[]): AnalyticsData => {
      const partnerClicks: Record<number, { website: number, whatsapp: number }> = {};
      const clickEvents: ClickEvent[] = [];

      events.forEach(e => {
          // Add to Log
          clickEvents.push({
              partnerId: Number(e.partner_id),
              type: e.type as 'website' | 'whatsapp',
              timestamp: Number(e.timestamp)
          });

          // Aggregate Totals
          const pid = Number(e.partner_id);
          if (!partnerClicks[pid]) partnerClicks[pid] = { website: 0, whatsapp: 0 };
          
          if (e.type === 'website') partnerClicks[pid].website++;
          if (e.type === 'whatsapp') partnerClicks[pid].whatsapp++;
      });

      return {
          partnerClicks,
          clickEvents,
          externalSheetUrl: '' // This would come from general config if we moved it there, for now keeping local or default
      };
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SAVE DATA TO SUPABASE
  const updateContent = async (newContent: SiteContent) => {
    try {
        // Optimistic UI Update
        setContent(newContent);

        // 1. Update General Settings
        const { error: generalError } = await supabase
            .from('site_general')
            .update({
                header: newContent.header,
                hero: newContent.hero,
                teaser: newContent.teaser, // ADDED TEASER
                about: newContent.about,
                benefits: newContent.benefits,
                footer: newContent.footer,
                scripts: newContent.scripts,
                partners_config: newContent.partnersConfig
            })
            .eq('id', 1);

        if (generalError) throw generalError;

        // 2. Sync Partners (Upsert & Delete)
        // A. Upsert all current partners
        const partnersPayload = newContent.partners.map(p => ({
            id: p.id,
            name: p.name,
            location: p.location,
            image: p.image,
            stock_count: p.stockCount,
            website_url: p.websiteUrl,
            whatsapp_url: p.whatsappUrl,
            featured: p.featured
        }));

        const { error: upsertError } = await supabase.from('partners').upsert(partnersPayload);
        if (upsertError) throw upsertError;

        // B. Delete removed partners
        // We fetch current IDs from DB, compare with new list, and delete missing
        const { data: currentDbPartners } = await supabase.from('partners').select('id');
        if (currentDbPartners) {
            const newIds = new Set(newContent.partners.map(p => p.id));
            const idsToDelete = currentDbPartners
                .map(p => p.id)
                .filter(id => !newIds.has(Number(id)));

            if (idsToDelete.length > 0) {
                await supabase.from('partners').delete().in('id', idsToDelete);
            }
        }

    } catch (e) {
        console.error("Error saving content:", e);
        alert("Erro ao salvar no banco de dados. Verifique o console.");
    }
  };

  const resetContent = async () => {
    // For safety, 'Reset' in a database environment usually just reloads defaults locally
    // If you want to wipe the DB, we would run delete/update queries here.
    // For now, let's just reset the local view and ask to save.
    if(window.confirm("Isso carregará os padrões na tela. Clique em SALVAR para aplicar no Banco de Dados.")) {
        setContent({ ...DEFAULT_CONTENT, analytics: { partnerClicks: {}, clickEvents: [] } });
    }
  };

  const trackPartnerClick = async (partnerId: number, type: 'website' | 'whatsapp') => {
    const timestamp = Date.now();

    // 1. Optimistic Update Local State (for instant UI feedback if needed)
    setContent(prev => {
        const currentAnalytics = prev.analytics || { partnerClicks: {}, clickEvents: [] };
        const partnerData = currentAnalytics.partnerClicks[partnerId] || { website: 0, whatsapp: 0 };
        
        const newPartnerClicks = {
            ...currentAnalytics.partnerClicks,
            [partnerId]: {
                ...partnerData,
                [type]: partnerData[type] + 1
            }
        };

        const newClickEvents = [...(currentAnalytics.clickEvents || []), { partnerId, type, timestamp }];

        return {
            ...prev,
            analytics: {
                ...currentAnalytics,
                partnerClicks: newPartnerClicks,
                clickEvents: newClickEvents
            }
        };
    });

    // 2. Insert into Supabase
    try {
        await supabase.from('analytics_events').insert({
            partner_id: partnerId,
            type,
            timestamp
        });
    } catch (e) {
        console.error("Error tracking click:", e);
    }
  };

  // Function to delete analytics data within a date range
  const clearAnalyticsData = async (startDate: string, endDate: string) => {
    try {
        // Manual parsing to avoid timezone issues. 
        // We assume the user wants to delete based on the date strings provided (YYYY-MM-DD).
        
        // Start Date: YYYY-MM-DD 00:00:00 Local
        const [sYear, sMonth, sDay] = startDate.split('-').map(Number);
        const start = new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0).getTime();

        // End Date: YYYY-MM-DD 23:59:59 Local
        const [eYear, eMonth, eDay] = endDate.split('-').map(Number);
        const end = new Date(eYear, eMonth - 1, eDay, 23, 59, 59, 999).getTime();

        if (isNaN(start) || isNaN(end)) {
            alert("Datas inválidas.");
            return;
        }

        setIsLoading(true);

        const { error, count } = await supabase
            .from('analytics_events')
            .delete({ count: 'exact' })
            .gte('timestamp', start)
            .lte('timestamp', end);

        if (error) throw error;

        alert(`Sucesso! ${count} registros de cliques foram excluídos neste período.`);
        
        // Refresh data
        await fetchData();

    } catch (e) {
        console.error("Error clearing analytics:", e);
        alert("Erro ao limpar dados. Verifique o console.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, trackPartnerClick, clearAnalyticsData, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};