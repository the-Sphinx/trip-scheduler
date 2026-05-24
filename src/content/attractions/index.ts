// Registry of attraction guides. Guides are lazy-loaded so we only bundle
// what's actually opened. Add a new entry here for each new guide file.

import type { AttractionGuide } from './types';

const loaders: Record<string, () => Promise<{ default: AttractionGuide }>> = {
  // Kyoto
  'kiyomizu-dera': () => import('./kiyomizu-dera'),
  'yasaka-pagoda': () => import('./yasaka-pagoda'),
  'ninenzaka': () => import('./ninenzaka'),
  'ishibei-koji': () => import('./ishibei-koji'),
  'hanamikoji': () => import('./hanamikoji'),
  'yasaka-shrine': () => import('./yasaka-shrine'),
  'shirakawa-canal': () => import('./shirakawa-canal'),
  'arashiyama-bamboo-grove': () => import('./arashiyama-bamboo-grove'),
  'tenryu-ji': () => import('./tenryu-ji'),
  'togetsukyo-bridge': () => import('./togetsukyo-bridge'),
  'nishiki-market': () => import('./nishiki-market'),
  'fushimi-inari': () => import('./fushimi-inari'),
  'nijo-castle': () => import('./nijo-castle'),
  'chopstick-workshop': () => import('./chopstick-workshop'),
  'kintsugi-workshop': () => import('./kintsugi-workshop'),
  'manga-museum': () => import('./manga-museum'),
  // Uji
  'nintendo-museum': () => import('./nintendo-museum'),
  'tea-street': () => import('./tea-street'),
  'uji-river': () => import('./uji-river'),
  // Osaka
  'osaka-castle': () => import('./osaka-castle'),
  'kuromon-market': () => import('./kuromon-market'),
  'dotonbori': () => import('./dotonbori'),
  'shinsaibashi': () => import('./shinsaibashi'),
  'shinsekai': () => import('./shinsekai'),
  // Tokyo
  'senso-ji': () => import('./senso-ji'),
  'kappabashi': () => import('./kappabashi'),
  'hokusai-graphic': () => import('./hokusai-graphic'),
  'akihabara': () => import('./akihabara'),
  'tokyo-disneyland': () => import('./tokyo-disneyland'),
  'teamlab-borderless': () => import('./teamlab-borderless'),
  'gundam-base': () => import('./gundam-base'),
  'shibuya': () => import('./shibuya'),
  'pokemon-center': () => import('./pokemon-center'),
  'one-piece-shop': () => import('./one-piece-shop'),
  'tokyo-gov-building': () => import('./tokyo-gov-building'),
  'shinjuku': () => import('./shinjuku'),
};

export function hasGuide(slug: string): boolean {
  return slug in loaders;
}

export async function loadGuide(slug: string): Promise<AttractionGuide | null> {
  const loader = loaders[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
