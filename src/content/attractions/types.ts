// Schema for an attraction guide page. Each text field is provided in both
// English and Turkish; the page picks the active language. Within any text
// field, **double asterisks** mark emphasized terms (rendered bold + colored).

export type Lang = 'en' | 'tr';

export interface GuideSection {
  title: string;
  body: string;
}

export interface GuideLocale {
  intro: string;
  highlights: string[];
  sections?: GuideSection[];
  tips?: string[];
}

export interface GuideSource {
  name: string;
  url: string;
}

export interface AttractionGuide {
  slug: string;
  // Shared across languages
  gallery: string[]; // high-res URLs, first is the hero
  sources?: GuideSource[];
  // Per-language content
  en: GuideLocale;
  tr: GuideLocale;
}
