import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'yasaka-pagoda',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg/1280px-Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pedestrian_road_with_pavements_and_paper_umbrellas%2C_Higashiyama-ku%2C_Kyoto%2C_Japan%2C_early_morning.jpg/1280px-Pedestrian_road_with_pavements_and_paper_umbrellas%2C_Higashiyama-ku%2C_Kyoto%2C_Japan%2C_early_morning.jpg',
  ],
  sources: [
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/2270/' },
  ],
  en: {
    intro:
      'Officially **Hōkan-ji Temple**, but everyone calls it **Yasaka Pagoda** — the **five-story tower** that dominates the Higashiyama skyline. At **46 meters tall**, it\'s the only original structure left of an 8th-century temple complex. The current pagoda dates to **1440**. You can\'t enter (most days) but the view from the sloped street below is one of Kyoto\'s defining images.',
    highlights: [
      '**Five-story pagoda** from the Edo era — the photograph everyone wants',
      'Best view from **Yasaka-dōri** looking up the slope',
      'Magical at **dawn** when the light hits and there are no people',
      'Surrounded by **preserved wooden townhouses** (machiya)',
      'A 2-minute walk to **Ninenzaka** and the Kiyomizu approach',
    ],
    sections: [
      {
        title: 'Quick history',
        body:
          'Founded in **589** by Prince Shōtoku, the temple originally had a full complex. Everything except the pagoda was destroyed by fires over the centuries. The pagoda you see was rebuilt in **1440** by shogun Ashikaga Yoshinori after the previous one was struck by lightning. It has survived earthquakes and the WWII bombings of Kyoto\'s nearby districts.',
      },
      {
        title: 'Where to stand',
        body:
          'The iconic photo is taken from **Yasaka-dōri** (or Yasaka Tower Slope), looking south-east up toward the pagoda. Come at **sunrise** for empty streets and golden light. The slope is steep — wear shoes that grip.',
      },
    ],
    tips: [
      'Always **free** to view from outside (24h)',
      'Interior rarely open — occasional special openings, **¥400** when allowed',
      'No photo restrictions on the street',
      'Combine with **Sannenzaka → Ninenzaka → Kiyomizu-dera** as one walk',
      'Café *% Arabica Kyoto* nearby — beautiful coffee, but expect a queue',
    ],
  },
  tr: {
    intro:
      'Resmi adı **Hōkan-ji Tapınağı** ama herkes ona **Yasaka Pagoda** der — Higashiyama silüetine hâkim **beş katlı kule**. **46 metre** boyuyla, 8. yüzyıldan kalma tapınak kompleksinin geriye kalan tek orijinal yapısı. Bugünkü pagoda **1440** yılına ait. İçeri girilemiyor (çoğunlukla) ama aşağıdaki yokuştan görünen manzara Kyoto\'nun en simgesel görüntülerinden.',
    highlights: [
      'Edo döneminden kalma **beş katlı pagoda** — herkesin istediği fotoğraf',
      'En iyi açı **Yasaka-dōri**\'den yokuş yukarı bakarken',
      'Şafak vakti, ışık vurduğunda ve kimse yokken büyüleyici',
      'Etrafı korunmuş **ahşap geleneksel evlerle (machiya)** çevrili',
      '**Ninenzaka** ve Kiyomizu yoluna 2 dakika yürüyüş',
    ],
    sections: [
      {
        title: 'Kısa tarihçe',
        body:
          '**589** yılında Prens Shōtoku tarafından kuruldu; tapınağın aslen tam bir kompleksi vardı. Yüzyıllar içinde pagoda dışında her şey yangınlarda yok oldu. Bugünkü pagoda, önceki yapı yıldırım çarpmasıyla yandıktan sonra şogun Ashikaga Yoshinori tarafından **1440**\'ta yeniden inşa edildi. Depremleri ve II. Dünya Savaşı bombalamalarını atlatmış.',
      },
      {
        title: 'Nereden bakmalı',
        body:
          'İkonik fotoğraf, **Yasaka-dōri**\'den (veya Yasaka Kule Yokuşu) pagodaya doğru güneydoğuya bakarak çekilir. **Gün doğumunda** gelin: boş sokaklar ve altın ışık. Yokuş diktir — tutunan ayakkabı giyin.',
      },
    ],
    tips: [
      'Dışarıdan görmek her zaman **ücretsiz** (24 saat)',
      'İç mekan nadiren açık — özel günlerde, izin verildiğinde **¥400**',
      'Sokakta fotoğraf yasağı yok',
      '**Sannenzaka → Ninenzaka → Kiyomizu-dera** ile tek yürüyüşte birleştirin',
      'Yakındaki *% Arabica Kyoto* kafesi güzel ama kuyruğa hazır olun',
    ],
  },
};

export default guide;
