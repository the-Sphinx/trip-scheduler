import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'kiyomizu-dera',
  intro:
    'A 1,200-year-old Buddhist temple perched on the Higashiyama hillside, famous for its wooden stage jutting out 13 meters above the forest. Its name — "Pure Water Temple" — comes from the Otowa waterfall flowing beneath the main hall. One of Kyoto\'s most beloved sights and a UNESCO World Heritage Site.',
  highlights: [
    'Hondō (Main Hall): the iconic wooden stage with no nails in its construction',
    'Otowa Waterfall: three streams — long life, success, love — drink from one (not all)',
    'Jishu Shrine: two "love stones" 18m apart; walk between with eyes closed for a wish',
    'Sannenzaka & Ninenzaka: preserved approach streets, perfect for the walk down',
    'Best at sunrise or just before closing — crowds peak 10:00–15:00',
  ],
  sections: [
    {
      title: 'A bit of history',
      body:
        'Founded in 778 by the monk Enchin near a clear spring, the temple has burned and been rebuilt many times. The current hall dates to 1633, commissioned by the third Tokugawa shogun, Iemitsu. The famous phrase "to jump off the stage of Kiyomizu" (a Japanese version of "take the plunge") refers to an Edo-period legend that wishes were granted if one survived the leap — 234 people are recorded as having tried.',
    },
    {
      title: 'What to look for',
      body:
        'The wooden veranda is held up by 168 zelkova pillars locked together without a single nail. Look for the heart-shaped love stones at Jishu Shrine, the pagoda silhouette against the city below, and the kanji "音羽の滝" above the waterfall. The temple is especially striking during cherry blossom and autumn leaf seasons, when it\'s often lit up at night.',
    },
  ],
  tips: [
    'Open from 06:00 — go early to beat tour buses',
    'Ticket: ¥500 (cash preferred at the gate)',
    'Allow 60–90 minutes for the temple + Otowa waterfall',
    'Bring water and a hat in summer — the climb up the slope is exposed',
    'Modest clothing is appreciated but not enforced',
    'Combine with Ninenzaka → Yasaka Pagoda walk going down',
  ],
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kiyomizu.jpg/1280px-Kiyomizu.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-09.jpg/1280px-Kiyomizu-dera%2C_Kyoto%2C_November_2016_-09.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Otowa_no_Taki_Waterfall_at_Kiyomizu-dera_in_Kyoto.jpg/1280px-Otowa_no_Taki_Waterfall_at_Kiyomizu-dera_in_Kyoto.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Kiyomizu-dera_in_Kyoto-r.jpg/1280px-Kiyomizu-dera_in_Kyoto-r.jpg',
  ],
  sources: [
    { name: 'Kiyomizu-dera (official, EN)', url: 'https://www.kiyomizudera.or.jp/en/' },
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/1163/' },
    { name: 'UNESCO Historic Monuments of Ancient Kyoto', url: 'https://whc.unesco.org/en/list/688/' },
  ],
};

export default guide;
