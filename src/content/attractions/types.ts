// Schema for an attraction guide page. Keep it structured (not free-form
// markdown) so every guide renders with a consistent mobile-friendly layout.

export interface GuideSection {
  title: string;
  body: string; // 1-3 short paragraphs, plain text
}

export interface GuideSource {
  name: string;
  url: string;
}

export interface AttractionGuide {
  slug: string;
  // 1-paragraph hook shown at the top
  intro: string;
  // Quick bullets — what makes this place worth visiting
  highlights: string[];
  // Optional structured body sections (history, what to see, etc.)
  sections?: GuideSection[];
  // Practical, in-the-moment tips
  tips?: string[];
  // High-res image URLs (1000-1600px ideal). First image is the hero.
  gallery: string[];
  // Where information was sourced for credibility & follow-up reading
  sources?: GuideSource[];
}
