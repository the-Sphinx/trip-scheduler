import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'senso-ji',
  intro:
    "Tokyo's oldest temple — founded in 645 — and its most-visited religious site. The approach is as famous as the destination: the giant red Kaminarimon gate, the bustling Nakamise shopping street, and finally the Hōzōmon gate and Five-Story Pagoda framing the main hall. Free, open day and night, and atmospherically lit after sunset.",
  highlights: [
    'Kaminarimon ("Thunder Gate"): the 11.7m-tall paper lantern is the photo',
    'Nakamise-dōri: 250m of food stalls and souvenir shops — try ningyō-yaki',
    'Hōzōmon Gate and the Five-Story Pagoda from the courtyard',
    'The incense cauldron — waft the smoke over yourself for good health',
    'Omikuji fortune slips (¥100) — tie the bad ones to the rack',
  ],
  sections: [
    {
      title: 'The legend',
      body:
        'In 628, two brothers fished a small gold statue of Kannon (the bodhisattva of compassion) from the Sumida River. Their village headman recognized it, became a monk, and turned his house into a shrine. The current temple was completed in 645. The main hall was destroyed in WWII firebombing in 1945 and rebuilt by 1958 in concrete — symbolic of post-war recovery.',
    },
    {
      title: 'What to do here',
      body:
        'Walk slowly down Nakamise — it\'s 250m of family-run stalls selling crackers, sweet bean cakes, fans, and folk crafts. Try ningyō-yaki (small cake filled with red bean paste, baked in molds), age-manjū (fried bun), or melonpan from the bakery on the side street. Wash your hands at the temizuya, waft incense smoke for good health, toss a coin, clap once, bow. After dark the gates are floodlit and the crowds disappear.',
    },
  ],
  tips: [
    'Free entry to the temple grounds, 24/7',
    'Main hall hours: 06:00–17:00 (06:30 in winter)',
    'Nakamise shops open ~10:00, close ~17:00–18:00',
    'Best photos: just before 09:00 (before crowds) or after 19:00 (lights on)',
    'No tripods allowed inside the main hall area',
    'Pair with Kappabashi Kitchen Town (10 min walk west) and Asakusa local food',
  ],
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sensoji_2023.jpg/1280px-Sensoji_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Kaminarimon_Asakusa_Tokyo_-_panoramio.jpg/1280px-Kaminarimon_Asakusa_Tokyo_-_panoramio.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nakamise-dori_at_Sens%C5%8D-ji.jpg/1280px-Nakamise-dori_at_Sens%C5%8D-ji.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Senso-ji_Pagoda_and_Hozomon.jpg/1280px-Senso-ji_Pagoda_and_Hozomon.jpg',
  ],
  sources: [
    { name: 'Sensō-ji (official, EN)', url: 'https://www.senso-ji.jp/about/index_e.html' },
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/1990/' },
    { name: 'GoTokyo (TCVB)', url: 'https://www.gotokyo.org/en/spot/29/index.html' },
  ],
};

export default guide;
