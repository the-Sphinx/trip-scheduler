import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'fushimi-inari',
  intro:
    'The head shrine of Inari, deity of rice, sake and prosperity — but you come for the torii. Roughly 10,000 vermillion gates form glowing tunnels that wind up the wooded slopes of Mount Inari. Free, open 24 hours, and best very early or after dark when the crowds thin.',
  highlights: [
    'Senbon Torii: the dense double-row tunnel just past the main shrine',
    'The fox (kitsune) statues — messengers of Inari, often holding a key or rice sheaf',
    'The hike to the summit (233m): ~2 hours round trip, view of Kyoto halfway up',
    'Yotsutsuji intersection: the panoramic stop most day-trippers turn back at',
    'Tiny sub-shrines and stone foxes wrapped in red bibs along the climb',
  ],
  sections: [
    {
      title: 'A bit of history',
      body:
        'Founded in 711 — making it one of Japan\'s oldest shrines — Fushimi Inari predates Kyoto itself. The torii gates were donated by individuals and businesses praying for success; the names and dates are inked on the back of each gate. The custom is still going: large gates cost over a million yen, smaller ones start around ¥175,000.',
    },
    {
      title: 'How far to walk',
      body:
        'You don\'t need to summit to "see" the place. The dense Senbon Torii section near the bottom is the famous view and takes 15–20 minutes. To reach Yotsutsuji (the viewpoint with the Kyoto panorama) is another 30–40 minutes uphill. Going all the way to the summit takes about an hour from there. The path is paved but steep in places — proper shoes help.',
    },
  ],
  tips: [
    'Arrive by 7:00 for empty torii photos — by 9:00 it\'s very busy',
    'Or come after 19:00 for a quieter, lantern-lit climb (paths are dimly lit)',
    'Free entry, no closing time',
    'Bring water — vending machines exist on the trail but at "temple prices"',
    'It\'s a working shrine: clap twice and bow once at the main hall if you wish',
    'The little fox-face ema (wooden wish plaques) make a unique souvenir',
  ],
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/1280px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Fushimi_Inari-taisha_%2851278456416%29.jpg/1280px-Fushimi_Inari-taisha_%2851278456416%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Fushimi-Inari-Taisha_%2820100527-DSC04524%29.jpg/1280px-Fushimi-Inari-Taisha_%2820100527-DSC04524%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Fushimi_Inari_Taisha_Shrine_-_Romon_Gate.jpg/1280px-Fushimi_Inari_Taisha_Shrine_-_Romon_Gate.jpg',
  ],
  sources: [
    { name: 'Fushimi Inari Taisha (official, EN)', url: 'https://inari.jp/en/' },
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/1161/' },
  ],
};

export default guide;
