import { SiteContent } from './types';

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    logoTitle: "MEGA FEIRÃO",
    logoSubtitle: "Ofertas Premium",
    logoImage: "", 
    navLink1: "Nossas Lojas Parceiras",
    navLink2: "O Feirão",
    navLink3: "Novidade",
    btnLojista: "Fale Conosco",
    btnLojistaUrl: "#", 
    headerWhatsapp: "https://wa.me/" 
  },
  hero: {
    title: "SUA MAIOR VITRINE <br/> DIGITAL DE OFERTAS",
    subtitle: "Mais de 10.000 carros e motos com taxas a partir de 0,99% a.m.",
    videoId: "LXb3EKWsInQ", 
    backgroundImage: "", 
    ctaText: "QUERO VER AS OFERTAS",
    ctaSubtext: "Ofertas válidas até 30/11"
  },
  partners: [
    {
      id: 1,
      name: "Autovia Motors",
      location: "São Paulo, SP - Zona Sul",
      image: "https://picsum.photos/id/111/400/300",
      stockCount: 145,
      websiteUrl: "https://example.com",
      whatsappUrl: "https://wa.me/5511999999999",
      featured: true
    },
    {
      id: 2,
      name: "Premium Cars",
      location: "Belo Horizonte, MG",
      image: "https://picsum.photos/id/133/400/300",
      stockCount: 82,
      websiteUrl: "https://example.com",
      whatsappUrl: "https://wa.me/5531999999999"
    },
    {
      id: 3,
      name: "Mega Seminovos",
      location: "Curitiba, PR",
      image: "https://picsum.photos/id/183/400/300",
      stockCount: 320,
      websiteUrl: "https://example.com",
      whatsappUrl: "https://wa.me/5541999999999"
    },
    {
      id: 4,
      name: "Rota 66 Veículos",
      location: "Campinas, SP",
      image: "https://picsum.photos/id/85/400/300",
      stockCount: 56,
      websiteUrl: "https://example.com",
      whatsappUrl: "https://wa.me/5519999999999"
    },
    {
      id: 5,
      name: "Elite Automóveis",
      location: "Rio de Janeiro, RJ",
      image: "https://picsum.photos/id/65/400/300",
      stockCount: 110,
      websiteUrl: "https://example.com",
      whatsappUrl: "https://wa.me/5521999999999",
      featured: true
    },
    {
      id: 6,
      name: "Nacional Multimarcas",
      location: "Porto Alegre, RS",
      image: "https://picsum.photos/id/234/400/300",
      stockCount: 200,
      websiteUrl: "https://example.com",
      whatsappUrl: "https://wa.me/5551999999999"
    }
  ],
  partnersConfig: {
    autoHighlight: true
  },
  about: {
    mainTitle: "MEGA FEIRÃO",
    webmotorsBadgeText: "webmotors",
    heading: "Todo o ano acontece o feirão de carros online mais famoso do país!",
    descriptionP1: "O Feirão de carros da Webmotors é o nosso evento online feito para você comprar ou trocar o seu veículo com toda a segurança e rapidez. Durante o Mega Feirão Webmotors teremos ofertas relâmpago abaixo da tabela Fipe, taxas e condições especiais para você que busca um carro ou moto. Além disso, você também encontra facilidades para financiar e contratar o Seguro Auto com o Santander, tudo isso em um ambiente exclusivo e 100% online e fácil.",
    descriptionP2: "A Webmotors é a maior plataforma automotiva do país e é a única que pode fazer um feirão de carros online com vantagens de verdade para você. Você pode pesquisar todas as ofertas online no site ou no nosso aplicativo Webmotors.",
    topImage: "",
    featureCards: [
      {
        title: "OFERTAS O ANO TODO",
        subtitle: "SUV, hatch, picape, sedan",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&q=80&w=400",
        linkUrl: "#",
        badge: false
      },
      {
        title: "FEIRÃO WEBMOTORS",
        subtitle: "Online, no site e no App",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400",
        linkUrl: "#",
        badge: true
      },
      {
        title: "TAXA IMPERDÍVEL",
        subtitle: "Financiamento com o Santander",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=400",
        linkUrl: "#",
        badge: false
      },
      {
        title: "SUA LOJA NO MEGA FEIRÃO",
        subtitle: "Adquira e participe aqui",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
        linkUrl: "#",
        badge: false
      }
    ]
  },
  benefits: {
    bannerText: "Carros e Motos Receba as melhores ofertas da Web",
    bannerLink: "#",
    mainTitle: "Benefícios do Mega<br /> Feirão Webmotors",
    subTitle: "Feirão de carros 100% online para você aproveitar.",
    mainImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        title: "Mais de 6 mil lojas participantes",
        description: "Carros usados e seminovos <strong>perto de você</strong>",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=200&h=150",
        linkUrl: "#"
      },
      {
        title: "Carros com preço abaixo da tabela",
        description: "Carros e motos com preços abaixo da <strong>tabela Webmotors e Fipe</strong>",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=200&h=150",
        linkUrl: "#"
      },
      {
        title: "Condições especiais",
        description: "Feirão de carros <strong>com taxas imperdíveis</strong>",
        tag: "EXCLUSIVO SANTANDER",
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=200&h=150",
        linkUrl: "#"
      },
      {
        title: "Carros e motos selecionadas",
        description: "Os melhores veículos para você escolher <strong>sem medo e fazer sempre um bom negócio</strong>",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=200&h=150",
        linkUrl: "#"
      }
    ]
  },
  footer: {
    contactEmail: "contact@mysite.com",
    contactPhone: "55 92 98255-7255",
    copyrightText: "Limpa Pátio - Todos os Direitos Reservados",
    developerText: "Desenvolvido por iBusiness Brasil",
    leftImage: "" 
  },
  scripts: {
    facebookPixel: "",
    gtmHead: "",
    gtmBody: "",
    googleAnalytics: ""
  }
};