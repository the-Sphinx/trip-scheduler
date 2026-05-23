// Registry of attraction guides. Guides are lazy-loaded so we only bundle
// what's actually opened. Add a new entry here for each new guide file.

import type { AttractionGuide } from './types';

const loaders: Record<string, () => Promise<{ default: AttractionGuide }>> = {
  'kiyomizu-dera': () => import('./kiyomizu-dera'),
  'fushimi-inari': () => import('./fushimi-inari'),
  'senso-ji': () => import('./senso-ji'),
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
