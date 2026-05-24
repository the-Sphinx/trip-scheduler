import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'hanamikoji',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/150124_Gion_Kyoto_Japan01s3.jpg/1280px-150124_Gion_Kyoto_Japan01s3.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Gion_Higashi_Tsunemomo.jpg/1280px-Gion_Higashi_Tsunemomo.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Wooden_and_bamboo_facades_of_dwellings_with_sudare_in_a_cobbled_street_of_Gion%2C_perspective_effect_with_vanishing_point%2C_Kyoto%2C_Japan.jpg/1280px-Wooden_and_bamboo_facades_of_dwellings_with_sudare_in_a_cobbled_street_of_Gion%2C_perspective_effect_with_vanishing_point%2C_Kyoto%2C_Japan.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gion.jpg/1280px-Gion.jpg',
  ],
  sources: [
    { name: 'JNTO Gion', url: 'https://www.japan.travel/en/spot/2293/' },
  ],
  en: {
    intro:
      'The **heart of Gion** — Kyoto\'s most famous geisha district. **Hanamikōji** ("Flower-Viewing Lane") runs north–south through the district, lined with **wooden ochaya** (teahouses) where geiko and maiko still entertain guests after dark. The lane has been used as a film set hundreds of times; even *The Last Samurai* shot here.',
    highlights: [
      'Traditional **ochaya teahouses** with hanging lanterns',
      'Possible **geiko/maiko** sightings around dusk (be respectful)',
      '**Yasaka Shrine** at the eastern end, Shijō shopping at the western',
      '**Ichiriki Chaya** — the famous red-walled teahouse at the south end',
      '**Photography of geiko is banned** — heavy fines now apply',
    ],
    sections: [
      {
        title: 'Why the geiko ban?',
        body:
          'Until recently tourists harassed geiko and maiko walking to appointments — grabbing kimonos, blocking the way for selfies. In **2019** the Gion district restricted access on most private side streets and in **2024** Kyoto formally **banned tourist photography** of geiko in the area. Stay on the main lane (Hanamikōji), keep your distance, and don\'t chase anyone.',
      },
      {
        title: 'When to come',
        body:
          'Walk through during **daylight** for atmosphere without the crowds; **just after sunset** for lit-up teahouses and the chance of seeing a geiko head to an appointment. Avoid the 19:30–20:30 "rush hour" when tourist groups peak.',
      },
    ],
    tips: [
      '**Free**, public street, 24h',
      'No photography of locals/geiko — **¥10,000 fine**, enforced',
      'Most teahouses are **invitation-only** — you can\'t walk in',
      'Try a **kaiseki dinner** at one of the open restaurants if budget allows',
      'Combine with **Yasaka Shrine + Shirakawa Canal** for a full Gion loop',
      'Watch for slippery cobblestones in rain',
    ],
  },
  tr: {
    intro:
      '**Gion\'un kalbi** — Kyoto\'nun en ünlü geyşa mahallesi. **Hanamikōji** ("Çiçek Seyretme Sokağı") mahalleyi kuzey-güney boyunca keser; karanlık çöktükten sonra geyşa ve maiko\'ların hâlâ misafirlerini ağırladığı **ahşap ochaya** (çayhane) ile çevrili. Sokak yüzlerce kez film setine ev sahipliği yaptı; *Son Samuray* bile burada çekildi.',
    highlights: [
      'Asılı fenerleri olan geleneksel **ochaya çayhaneleri**',
      'Akşam üstü olası **geiko/maiko** görüşmeleri (saygılı olun)',
      'Doğu ucunda **Yasaka Tapınağı**, batı ucunda Shijō alışveriş caddesi',
      '**Ichiriki Chaya** — güney ucundaki ünlü kırmızı duvarlı çayhane',
      '**Geiko fotoğraflama yasak** — ciddi cezalar var',
    ],
    sections: [
      {
        title: 'Geiko yasağı neden?',
        body:
          'Yakın zamana kadar turistler işe giden geyşa ve maiko\'ları taciz ediyordu — kimonolarına dokunmak, selfie için yol kesmek. **2019**\'da Gion mahallesi pek çok özel ara sokağa erişimi kısıtladı, **2024**\'te ise Kyoto bölgede geiko\'ları turistlerin **fotoğraflamasını resmen yasakladı**. Ana sokağa (Hanamikōji) bağlı kalın, mesafenizi koruyun, kimseyi kovalamayın.',
      },
      {
        title: 'Ne zaman gitmeli',
        body:
          'Atmosferi kalabalıksız görmek için **gündüz** yürüyün; aydınlatılmış çayhaneleri ve randevuya giden bir geiko görme şansı için **gün batımının hemen sonrası**. 19:30–20:30 arası turist grubu "rush hour"undan kaçının.',
      },
    ],
    tips: [
      '**Ücretsiz**, kamuya açık sokak, 24 saat',
      'Yerlilerin/geiko\'ların fotoğrafı yasak — **¥10.000 para cezası**, denetleniyor',
      'Çoğu çayhane **davetli misafirlere özel** — içeri yürüyüp giremezsiniz',
      'Bütçeniz uygunsa açık restoranlardan birinde **kaiseki yemeği** deneyin',
      '**Yasaka Tapınağı + Shirakawa Kanalı** ile tam bir Gion turu',
      'Yağmurda arnavut kaldırımı kayganlaşır',
    ],
  },
};

export default guide;
