

export interface Partner {
  id: number;
  name: string;
  location: string;
  image: string;
  stockCount: number;
  websiteUrl: string;
  whatsappUrl: string;
  featured?: boolean;
}

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface HeaderContent {
  logoTitle: string;
  logoSubtitle: string;
  logoImage?: string; 
  navLink1: string;
  navLink2: string;
  navLink3: string;
  btnLojista: string;
  btnLojistaUrl: string; // New field for button link
  headerWhatsapp: string; // New field for WhatsApp link
}

export interface HeroContent {
  title: string;
  subtitle: string;
  videoId: string;
  backgroundImage?: string; 
  ctaText: string;
  ctaSubtext: string;
}

// New interface for the cards inside About section
export interface AboutFeatureCard {
  title: string;
  subtitle: string;
  image: string;
  linkUrl?: string;
  badge?: boolean;
}

export interface AboutContent {
  mainTitle: string;
  webmotorsBadgeText: string;
  heading: string;
  descriptionP1: string;
  descriptionP2: string;
  topImage?: string; 
  featureCards: AboutFeatureCard[]; // Added array of cards
}

export interface BenefitItem {
  title: string;
  description: string;
  image: string;
  tag?: string;
  linkUrl?: string; // New field for button link
}

export interface BenefitsContent {
  bannerText: string;
  bannerLink?: string; // New field for banner button link
  mainTitle: string;
  subTitle: string;
  mainImage: string;
  items: BenefitItem[];
}

export interface FooterContent {
  contactEmail: string;
  contactPhone: string;
  copyrightText: string;
  developerText: string;
  leftImage?: string; 
}

export interface PartnersConfig {
  autoHighlight: boolean;
}

export interface ScriptsContent {
  facebookPixel: string;
  gtmHead: string;
  gtmBody: string;
  googleAnalytics: string; // New field for GA4
}

// Analytics Types
export interface PartnerClicks {
  website: number;
  whatsapp: number;
}

export interface ClickEvent {
  partnerId: number;
  type: 'website' | 'whatsapp';
  timestamp: number;
}

export interface AnalyticsData {
  partnerClicks: Record<number, PartnerClicks>; // Key is Partner ID (Legacy/Fast Lookup)
  clickEvents?: ClickEvent[]; // New: Detailed event log for filtering
  externalSheetUrl?: string;
}

export interface SiteContent {
  header: HeaderContent;
  hero: HeroContent;
  partners: Partner[];
  partnersConfig?: PartnersConfig;
  about: AboutContent;
  benefits: BenefitsContent;
  footer: FooterContent;
  scripts?: ScriptsContent;
  analytics?: AnalyticsData; // Added Analytics
}