import React, { useState, useEffect } from 'react';
import { Settings, X, Save, RotateCcw, Plus, Trash2, Upload, Image as ImageIcon, Lock, LogIn, LogOut, Database, Wifi } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Partner, BenefitItem, AboutFeatureCard, TeaserItem } from '../types';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { content, updateContent, resetContent, clearAnalyticsData } = useContent();
  const [activeTab, setActiveTab] = useState<'geral' | 'vitrine' | 'parceiros' | 'teaser' | 'mega' | 'beneficios' | 'rodape' | 'scripts'>('geral');
  const [formData, setFormData] = useState(content);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Data Management State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sync internal form state when content changes externally (or reset)
  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'exclusivelabs' && password === 'Feirao2026#') {
        setIsAuthenticated(true);
        setError('');
    } else {
        setError('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleSave = () => {
    updateContent(formData);
    alert('Conteúdo salvo com sucesso!');
  };

  const handleTestConnection = async () => {
    try {
        const start = performance.now();
        // Tenta buscar a configuração geral
        const { data, error } = await supabase.from('site_general').select('id').limit(1);
        
        const end = performance.now();
        const ping = Math.round(end - start);

        if (error) throw error;

        alert(`Conexão com Supabase: SUCESSO! ✅\n\nTempo de resposta: ${ping}ms\nTabelas encontradas.`);
    } catch (e: any) {
        console.error(e);
        let msg = "Erro desconhecido";
        if (e.message) msg = e.message;
        if (e.code === '42P01') msg = "Tabelas não encontradas (Erro 42P01). Você rodou o script SQL?";
        
        alert(`FALHA NA CONEXÃO ❌\n\nDetalhe: ${msg}`);
    }
  };

  const handleClearData = async () => {
    if (!startDate || !endDate) {
        alert("Por favor, selecione as datas de início e fim.");
        return;
    }
    if (window.confirm(`TEM CERTEZA? \n\nVocê está prestes a apagar permanentemente todos os dados de cliques entre ${startDate} e ${endDate}.\n\nEsta ação não pode ser desfeita.`)) {
        await clearAnalyticsData(startDate, endDate);
    }
  };

  const handleChange = (section: keyof typeof content, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePartnerChange = (index: number, field: keyof Partner, value: any) => {
    const newPartners = [...formData.partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setFormData(prev => ({ ...prev, partners: newPartners }));
  };
  
  const togglePartnerAutoHighlight = (value: boolean) => {
    setFormData(prev => ({ 
        ...prev, 
        partnersConfig: { 
            ...prev.partnersConfig, 
            autoHighlight: value 
        } 
    }));
  };

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now(),
      name: "Nova Loja",
      location: "Cidade, UF",
      image: "https://picsum.photos/400/300",
      stockCount: 0,
      websiteUrl: "#",
      whatsappUrl: "#"
    };
    setFormData(prev => ({ ...prev, partners: [...prev.partners, newPartner] }));
  };

  const removePartner = (index: number) => {
    const newPartners = formData.partners.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, partners: newPartners }));
  };
  
  const handleBenefitChange = (index: number, field: keyof BenefitItem, value: any) => {
    const newItems = [...formData.benefits.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({
        ...prev,
        benefits: {
            ...prev.benefits,
            items: newItems
        }
    }));
  };

  const handleAboutCardChange = (index: number, field: keyof AboutFeatureCard, value: any) => {
    const newCards = [...(formData.about.featureCards || [])];
    newCards[index] = { ...newCards[index], [field]: value };
    setFormData(prev => ({
        ...prev,
        about: {
            ...prev.about,
            featureCards: newCards
        }
    }));
  };

  // Teaser Handlers
  const handleTeaserItemChange = (index: number, field: keyof TeaserItem, value: any) => {
    const newItems = [...(formData.teaser?.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({
        ...prev,
        teaser: {
            ...(prev.teaser || { sectionTitle: '', items: [] }),
            items: newItems
        }
    }));
  };

  const addTeaserItem = () => {
      const newItem: TeaserItem = {
          image: "https://picsum.photos/300/200",
          tag: "Oferta",
          conditionText: "CONDIÇÃO IMPERDÍVEL", // Default value
          pricePlaceholder: "R$ 00.000",
          buttonText: "Descubra em 17/03"
      };
      setFormData(prev => ({
          ...prev,
          teaser: {
              ...(prev.teaser || { sectionTitle: '', items: [] }),
              items: [...(prev.teaser?.items || []), newItem]
          }
      }));
  };

  const removeTeaserItem = (index: number) => {
      const newItems = (formData.teaser?.items || []).filter((_, i) => i !== index);
      setFormData(prev => ({
          ...prev,
          teaser: {
              ...(prev.teaser || { sectionTitle: '', items: [] }),
              items: newItems
          }
      }));
  };
  
  const handleScriptChange = (field: string, value: string) => {
      setFormData(prev => ({
          ...prev,
          scripts: {
              ...(prev.scripts || { facebookPixel: '', gtmHead: '', gtmBody: '', googleAnalytics: '' }),
              [field]: value
          }
      }));
  };

  const handleAnalyticsChange = (field: string, value: string) => {
    setFormData(prev => ({
        ...prev,
        analytics: {
            ...(prev.analytics || { partnerClicks: {} }),
            [field]: value
        }
    }));
  };

  if (!isOpen) return null;

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                
                <div className="bg-brand-red p-8 text-center">
                    <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                        <Lock size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Área Restrita</h2>
                    <p className="text-white/80 text-sm">Configurações do Sistema</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center font-medium border border-red-100">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Usuário</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Digite o usuário..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Senha</label>
                        <input 
                            type="password" 
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Digite a senha..."
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg"
                    >
                        <LogIn size={18} /> Acessar Painel
                    </button>
                </form>
            </div>
        </div>
    );
  }

  // ADMIN CONTENT
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex justify-end">
        <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
                <Settings size={20} /> 
                <div>
                <h2 className="text-xl font-bold leading-none">Painel Administrativo</h2>
                <span className="text-xs text-gray-400">Modo de Edição</span>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button 
                    onClick={handleLogout}
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-200 px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-2 mr-2 border border-red-500/30"
                >
                    <LogOut size={14} /> Sair
                </button>
                <button onClick={onClose} className="hover:bg-gray-700 p-2 rounded text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-gray-100 border-b p-2 gap-2 shrink-0">
            {[
            { id: 'geral', label: 'Menu Principal' },
            { id: 'vitrine', label: 'Vitrine' },
            { id: 'teaser', label: 'Ofertas Teaser' }, // Added Teaser Tab
            { id: 'parceiros', label: 'Parceiros' },
            { id: 'mega', label: 'Mega Feirão' },
            { id: 'beneficios', label: 'Carros e Motos' },
            { id: 'rodape', label: 'Rodapé' },
            { id: 'scripts', label: 'Trackeamento' },
            ].map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'bg-brand-red text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
            >
                {tab.label}
            </button>
            ))}
        </div>

        {/* Content Container */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {activeTab === 'geral' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">Menu Principal</h3>
                    
                    {/* Favicon e Logo */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded border">
                            <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Logo do Site</h4>
                            <ImageUploader 
                                currentImage={formData.header.logoImage} 
                                onImageChange={v => handleChange('header', 'logoImage', v)} 
                                placeholder="Carregar Logo"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 rounded border">
                            <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Favicon (Ícone Aba)</h4>
                            <ImageUploader 
                                currentImage={formData.header.favicon} 
                                onImageChange={v => handleChange('header', 'favicon', v)} 
                                placeholder="Carregar Favicon"
                            />
                        </div>
                    </div>

                    <Input label="Título Logo" value={formData.header.logoTitle} onChange={v => handleChange('header', 'logoTitle', v)} />
                    <Input label="Subtítulo Logo" value={formData.header.logoSubtitle} onChange={v => handleChange('header', 'logoSubtitle', v)} />
                    
                    <div className="grid grid-cols-2 gap-4">
                    <Input label="Link 1" value={formData.header.navLink1} onChange={v => handleChange('header', 'navLink1', v)} />
                    <Input label="Link 2" value={formData.header.navLink2} onChange={v => handleChange('header', 'navLink2', v)} />
                    <Input label="Link 3" value={formData.header.navLink3} onChange={v => handleChange('header', 'navLink3', v)} />
                    </div>

                    <div className="border-t pt-4 mt-2">
                        <h4 className="font-bold text-sm mb-3">Botões de Ação (CTA)</h4>
                        <div className="grid grid-cols-2 gap-4">
                        <Input label="Texto Botão" value={formData.header.btnLojista} onChange={v => handleChange('header', 'btnLojista', v)} />
                        <Input label="Link Botão" value={formData.header.btnLojistaUrl} onChange={v => handleChange('header', 'btnLojistaUrl', v)} />
                        <div className="col-span-2">
                            <Input label="Link do WhatsApp" value={formData.header.headerWhatsapp} onChange={v => handleChange('header', 'headerWhatsapp', v)} />
                        </div>
                        </div>
                    </div>
                </div>
                )}

                {activeTab === 'vitrine' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">Sua Maior Vitrine</h3>
                    <div className="bg-gray-50 p-4 rounded border mb-4">
                    <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Imagem de Fundo</h4>
                    <ImageUploader 
                        currentImage={formData.hero.backgroundImage} 
                        onImageChange={v => handleChange('hero', 'backgroundImage', v)} 
                    />
                    </div>
                    <TextArea label="Título Principal" value={formData.hero.title} onChange={v => handleChange('hero', 'title', v)} />
                    <TextArea label="Subtítulo" value={formData.hero.subtitle} onChange={v => handleChange('hero', 'subtitle', v)} />
                    <Input label="Link YouTube" value={formData.hero.videoId} onChange={v => handleChange('hero', 'videoId', v)} />
                    <Input label="Texto Botão CTA" value={formData.hero.ctaText} onChange={v => handleChange('hero', 'ctaText', v)} />
                    <Input label="Subtexto do Botão" value={formData.hero.ctaSubtext} onChange={v => handleChange('hero', 'ctaSubtext', v)} />
                </div>
                )}

                {activeTab === 'teaser' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold">Ofertas Teaser</h3>
                        <button onClick={addTeaserItem} className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            <Plus size={16} /> Adicionar Card
                        </button>
                    </div>

                    <Input 
                        label="Título da Seção" 
                        value={formData.teaser?.sectionTitle || ''} 
                        onChange={v => handleChange('teaser', 'sectionTitle', v)} 
                    />

                    {formData.teaser?.items.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border relative">
                            <button onClick={() => removeTeaserItem(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                <Trash2 size={18} />
                            </button>
                            <h4 className="font-bold text-gray-400 text-xs uppercase mb-3">Card #{index + 1}</h4>
                            
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Imagem do Carro</label>
                                <ImageUploader 
                                    currentImage={item.image} 
                                    onImageChange={v => handleTeaserItemChange(index, 'image', v)} 
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <Input label="Tag (Ex: Hatch)" value={item.tag} onChange={v => handleTeaserItemChange(index, 'tag', v)} />
                                <Input 
                                    label="Texto Condição" 
                                    value={item.conditionText || ''} 
                                    onChange={v => handleTeaserItemChange(index, 'conditionText', v)} 
                                    placeholder="CONDIÇÃO IMPERDÍVEL"
                                />
                                <Input label="Preço (Borrado)" value={item.pricePlaceholder} onChange={v => handleTeaserItemChange(index, 'pricePlaceholder', v)} />
                                <Input label="Texto do Botão" value={item.buttonText} onChange={v => handleTeaserItemChange(index, 'buttonText', v)} />
                            </div>
                        </div>
                    ))}
                    
                    {(!formData.teaser?.items || formData.teaser.items.length === 0) && (
                        <p className="text-gray-500 text-sm text-center italic py-4">Nenhum card adicionado.</p>
                    )}
                </div>
                )}

                {activeTab === 'parceiros' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-bold">Nossas Lojas Parceiras</h3>
                    <button onClick={addPartner} className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        <Plus size={16} /> Adicionar Loja
                    </button>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded border border-yellow-200 flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-yellow-800">Destaque Automático (Random 60%)</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={formData.partnersConfig?.autoHighlight ?? false}
                            onChange={(e) => togglePartnerAutoHighlight(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:bg-yellow-500"></div>
                    </label>
                    </div>
                    
                    {formData.partners.map((partner, index) => (
                    <div key={partner.id} className="bg-gray-50 p-4 rounded-lg border relative">
                        <button onClick={() => removePartner(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                        </button>
                        <h4 className="font-bold text-gray-400 text-xs uppercase mb-3">Loja #{index + 1}</h4>
                        <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Imagem</label>
                        <ImageUploader 
                            currentImage={partner.image} 
                            onImageChange={v => handlePartnerChange(index, 'image', v)} 
                        />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                        <Input label="Nome" value={partner.name} onChange={v => handlePartnerChange(index, 'name', v)} />
                        <Input label="Local" value={partner.location} onChange={v => handlePartnerChange(index, 'location', v)} />
                        <Input type="number" label="Estoque" value={partner.stockCount} onChange={v => handlePartnerChange(index, 'stockCount', v)} />
                        <Input label="Site" value={partner.websiteUrl} onChange={v => handlePartnerChange(index, 'websiteUrl', v)} />
                        <Input label="WhatsApp" value={partner.whatsappUrl} onChange={v => handlePartnerChange(index, 'whatsappUrl', v)} />
                        <div className="flex items-center gap-2 mt-4">
                            <input 
                                type="checkbox" 
                                checked={partner.featured} 
                                onChange={e => handlePartnerChange(index, 'featured', e.target.checked)}
                                disabled={formData.partnersConfig?.autoHighlight}
                            />
                            <span className="text-sm">Destaque Manual</span>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}

                {activeTab === 'mega' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">Bloco: Mega Feirão</h3>
                    <div className="bg-gray-50 p-4 rounded border mb-4">
                    <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Imagem do Topo</h4>
                    <ImageUploader 
                        currentImage={formData.about.topImage} 
                        onImageChange={v => handleChange('about', 'topImage', v)} 
                    />
                    </div>
                    <Input label="Título Principal" value={formData.about.mainTitle} onChange={v => handleChange('about', 'mainTitle', v)} />
                    <TextArea label="Manchete" value={formData.about.heading} onChange={v => handleChange('about', 'heading', v)} />
                    <TextArea label="Parágrafo 1" value={formData.about.descriptionP1} onChange={v => handleChange('about', 'descriptionP1', v)} rows={5} />
                    <TextArea label="Parágrafo 2" value={formData.about.descriptionP2} onChange={v => handleChange('about', 'descriptionP2', v)} rows={3} />
                    
                    <h4 className="font-bold text-sm text-gray-900 uppercase mt-6 border-t pt-4">Cards de Destaque</h4>
                    {formData.about.featureCards?.map((card, index) => (
                        <div key={index} className="bg-blue-50 p-4 rounded border border-blue-100 mt-2">
                            <Input label="Título" value={card.title} onChange={v => handleAboutCardChange(index, 'title', v)} />
                            <Input label="Subtítulo" value={card.subtitle} onChange={v => handleAboutCardChange(index, 'subtitle', v)} />
                            <div className="my-2">
                            <ImageUploader currentImage={card.image} onImageChange={v => handleAboutCardChange(index, 'image', v)} />
                            </div>
                            <Input label="Link" value={card.linkUrl} onChange={v => handleAboutCardChange(index, 'linkUrl', v)} />
                            <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" checked={card.badge} onChange={e => handleAboutCardChange(index, 'badge', e.target.checked)} />
                            <span className="text-xs">Exibir Badge</span>
                            </div>
                        </div>
                    ))}
                </div>
                )}

                {activeTab === 'beneficios' && (
                <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2">Bloco: Carros e Motos</h3>
                    <div className="space-y-4 mb-6">
                    <Input label="Texto Banner" value={formData.benefits.bannerText} onChange={v => handleChange('benefits', 'bannerText', v)} />
                    <Input label="Link Banner" value={formData.benefits.bannerLink || ''} onChange={v => handleChange('benefits', 'bannerLink', v)} />
                    <TextArea label="Título" value={formData.benefits.mainTitle} onChange={v => handleChange('benefits', 'mainTitle', v)} />
                    <Input label="Subtítulo" value={formData.benefits.subTitle} onChange={v => handleChange('benefits', 'subTitle', v)} />
                    <Input label="URL Imagem" value={formData.benefits.mainImage} onChange={v => handleChange('benefits', 'mainImage', v)} />
                    </div>
                    
                    <h4 className="font-bold text-sm text-gray-500 uppercase">Cards</h4>
                    {formData.benefits.items.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded border mb-2">
                                <Input label="Título" value={item.title} onChange={v => handleBenefitChange(index, 'title', v)} />
                                <Input label="Descrição" value={item.description} onChange={v => handleBenefitChange(index, 'description', v)} />
                                <div className="my-2">
                                <ImageUploader currentImage={item.image} onImageChange={v => handleBenefitChange(index, 'image', v)} />
                                </div>
                                <Input label="Link" value={item.linkUrl || ''} onChange={v => handleBenefitChange(index, 'linkUrl', v)} />
                        </div>
                    ))}
                </div>
                )}

                {activeTab === 'rodape' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold border-b pb-2">Rodapé</h3>
                    <div className="bg-gray-50 p-4 rounded border mb-4">
                    <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Imagem Esquerda</h4>
                    <ImageUploader 
                        currentImage={formData.footer.leftImage} 
                        onImageChange={v => handleChange('footer', 'leftImage', v)} 
                    />
                    </div>
                    <Input label="Email" value={formData.footer.contactEmail} onChange={v => handleChange('footer', 'contactEmail', v)} />
                    <Input label="Telefone" value={formData.footer.contactPhone} onChange={v => handleChange('footer', 'contactPhone', v)} />
                    <Input label="Copyright" value={formData.footer.copyrightText} onChange={v => handleChange('footer', 'copyrightText', v)} />
                    <Input label="Desenvolvedor" value={formData.footer.developerText} onChange={v => handleChange('footer', 'developerText', v)} />
                </div>
                )}
                
                {activeTab === 'scripts' && (
                <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2">Trackeamento</h3>
                    <TextArea label="Facebook Pixel" value={formData.scripts?.facebookPixel || ''} onChange={v => handleScriptChange('facebookPixel', v)} rows={4} />
                    <TextArea label="Google Analytics" value={formData.scripts?.googleAnalytics || ''} onChange={v => handleScriptChange('googleAnalytics', v)} rows={4} />
                    <TextArea label="GTM Head" value={formData.scripts?.gtmHead || ''} onChange={v => handleScriptChange('gtmHead', v)} rows={4} />
                    <TextArea label="GTM Body" value={formData.scripts?.gtmBody || ''} onChange={v => handleScriptChange('gtmBody', v)} rows={4} />
                    
                    <div className="pt-4 border-t mt-4">
                        <h4 className="font-bold text-sm mb-2 text-gray-700">Analytics Dashboard</h4>
                        <Input label="Link da Tabela Externa (Google Sheets)" value={formData.analytics?.externalSheetUrl || ''} onChange={v => handleAnalyticsChange('externalSheetUrl', v)} />
                    </div>

                    <div className="pt-4 border-t mt-4">
                        <h4 className="font-bold text-sm mb-2 text-gray-700">Gerenciamento de Dados</h4>
                        <div className="bg-red-50 p-4 rounded border border-red-100">
                            <p className="text-xs text-red-600 mb-3 font-medium">
                                ATENÇÃO: A exclusão de dados é irreversível.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Data Início</label>
                                    <input 
                                        type="date" 
                                        className="w-full border rounded p-2 text-sm"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Data Fim</label>
                                    <input 
                                        type="date" 
                                        className="w-full border rounded p-2 text-sm"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleClearData}
                                className="w-full bg-red-600 text-white font-bold py-2 rounded text-xs hover:bg-red-700 flex items-center justify-center gap-2"
                            >
                                <Trash2 size={14} /> Excluir Registros do Período
                            </button>
                        </div>
                    </div>
                </div>
                )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-100 p-4 border-t flex justify-between items-center shrink-0">
            <div className="flex gap-2">
                <button 
                onClick={() => {
                    if(window.confirm('Restaurar padrões?')) {
                        resetContent();
                    }
                }}
                className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-3 py-2 rounded text-sm"
                title="Restaurar padrões do sistema"
                >
                <RotateCcw size={16} /> Restaurar
                </button>
                <button 
                    onClick={handleTestConnection}
                    className="flex items-center gap-2 text-gray-600 font-bold hover:bg-gray-200 px-3 py-2 rounded text-sm"
                    title="Verificar conexão com banco de dados"
                >
                    <Wifi size={16} /> Testar Conexão
                </button>
            </div>
            
            <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-brand-red text-white font-bold px-6 py-2 rounded hover:bg-red-700 shadow-lg"
            >
            <Save size={18} /> Salvar
            </button>
        </div>

        </div>
    </div>
  );
};

// Helper Components (reused)
const Input = ({ label, value, onChange, type = "text", placeholder }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
    <input 
      type={type}
      className="w-full border rounded p-2 text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const TextArea = ({ label, value, onChange, rows = 2 }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
    <textarea 
      rows={rows}
      className="w-full border rounded p-2 text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none font-mono text-xs"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const ImageUploader = ({ currentImage, onImageChange, placeholder = "Carregar Imagem" }: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Imagem muito grande (Max 2MB).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center overflow-hidden shrink-0">
        {currentImage ? (
          <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="text-gray-400" />
        )}
      </div>
      <div className="flex-grow">
        <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-50 flex items-center w-fit gap-2">
          <Upload size={14} />
          {placeholder}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
        {currentImage && (
          <button onClick={() => onImageChange('')} className="text-xs text-red-500 hover:underline mt-1 ml-1">
            Remover
          </button>
        )}
      </div>
    </div>
  );
};