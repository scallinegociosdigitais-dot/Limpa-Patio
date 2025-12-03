import { SiteContent } from './types';

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    logoTitle: "",
    logoSubtitle: "",
    logoImage: "", 
    favicon: "", // Initialize Favicon
    navLink1: "",
    navLink2: "",
    navLink3: "",
    btnLojista: "",
    btnLojistaUrl: "", 
    headerWhatsapp: "" 
  },
  hero: {
    title: "",
    subtitle: "",
    videoId: "", 
    backgroundImage: "", 
    ctaText: "",
    ctaSubtext: ""
  },
  // Initialize Teaser with default structure
  teaser: {
    sectionTitle: "Carros e motos com condições imperdíveis",
    items: [] 
  },
  partners: [],
  partnersConfig: {
    autoHighlight: true
  },
  about: {
    mainTitle: "",
    webmotorsBadgeText: "",
    heading: "",
    descriptionP1: "",
    descriptionP2: "",
    topImage: "",
    featureCards: []
  },
  benefits: {
    bannerText: "",
    bannerLink: "",
    mainTitle: "",
    subTitle: "",
    mainImage: "",
    items: []
  },
  footer: {
    contactEmail: "",
    contactPhone: "",
    copyrightText: "",
    developerText: "",
    leftImage: "" 
  },
  scripts: {
    facebookPixel: "",
    gtmHead: "",
    gtmBody: "",
    googleAnalytics: ""
  }
};