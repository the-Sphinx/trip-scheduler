import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'yasaka-shrine',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Yasaka_Shrine_01.jpg/1280px-Yasaka_Shrine_01.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Yasaka_Shrine_Kyoto.png/1280px-Yasaka_Shrine_Kyoto.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/YasakaShrine1.jpg/1280px-YasakaShrine1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/YasakaShrine2.jpg/1280px-YasakaShrine2.jpg',
  ],
  sources: [
    { name: 'Yasaka Jinja (official)', url: 'https://www.yasaka-jinja.or.jp/en/' },
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/1164/' },
  ],
  en: {
    intro:
      'Kyoto\'s **patron Shinto shrine**, watching over Gion since **656 AD**. The bright **vermillion gate** at the east end of Shijō Street is the shrine\'s most famous face. Inside, the **main hall is lit by hundreds of paper lanterns** every night — each donated and inscribed by a local business. Free, open 24 hours, and one of the loveliest places in Kyoto after dark.',
    highlights: [
      '**Vermillion two-story gate (Rōmon)** at Shijō — the iconic photo',
      '**Hundreds of lanterns** strung over the dance stage, lit nightly',
      '**Free entry**, **always open** — no walls, you can come at 3am',
      '**Maruyama Park** behind the shrine — Kyoto\'s most famous cherry-blossom spot',
      'Host of **Gion Matsuri** in July — one of Japan\'s three biggest festivals',
    ],
    sections: [
      {
        title: 'A bit of history',
        body:
          'Founded in **656**, Yasaka was dedicated to **Susano-o** (the Shinto storm god) to ward off the plagues that ravaged early Kyoto. When an epidemic hit in **869**, the emperor ordered a procession of 66 portable shrines (one per province) to ask the god\'s help — that ritual evolved into the **Gion Matsuri**, still held every July with massive floats.\n\nThe current main hall is a **National Treasure** built in **1654**, in the unique *Gion-zukuri* architectural style.',
      },
      {
        title: 'What to do here',
        body:
          'Walk through the Rōmon gate, wash hands at the **temizuya**, and approach the main hall. Toss a coin, ring the bell, clap **twice**, bow once. Buy an **omikuji** (fortune slip) for ¥200. Behind the main hall the lanterns and the dance stage make for great evening photos.',
      },
    ],
    tips: [
      'Always **free**, **24/7** access — no gates close',
      '**Lantern lighting** every evening at sunset',
      'Best photos: **sunset to 21:00** when the lanterns are lit',
      'Combine with **Hanamikōji walk** and **Maruyama Park** (just behind)',
      'Major festival: **Gion Matsuri** — July, expect huge crowds',
      'Lockers at the Shijō entrance if you\'re carrying shopping',
    ],
  },
  tr: {
    intro:
      'Kyoto\'nun **koruyucu Şinto tapınağı**, **MS 656**\'dan beri Gion\'u gözetiyor. Shijō Caddesi\'nin doğu ucundaki parlak **kırmızı kapı**, tapınağın en ünlü yüzü. İçeride **ana salon her gece yüzlerce kağıt fenerle aydınlanır** — her biri yerel bir işletme tarafından bağışlanmış ve adı yazılmış. Ücretsiz, 24 saat açık ve karanlık çöktükten sonra Kyoto\'nun en güzel yerlerinden.',
    highlights: [
      'Shijō\'daki **iki katlı kırmızı kapı (Rōmon)** — ikonik fotoğraf',
      'Dans sahnesinin üzerinde **yüzlerce fener**, her gece yanar',
      '**Ücretsiz giriş**, **her zaman açık** — duvar yok, gece 3\'te bile gelebilirsiniz',
      'Tapınağın arkasındaki **Maruyama Parkı** — Kyoto\'nun en ünlü kiraz çiçeği noktası',
      'Temmuzdaki **Gion Matsuri**\'ye ev sahipliği yapar — Japonya\'nın en büyük 3 festivalinden',
    ],
    sections: [
      {
        title: 'Kısa tarihçe',
        body:
          '**656**\'da kurulan Yasaka, erken Kyoto\'yu kasıp kavuran salgınlara karşı **Susano-o**\'ya (Şinto fırtına tanrısı) adandı. **869**\'da bir salgın patlak verince imparator, tanrının yardımını istemek için 66 taşınabilir tapınakla (her vilayet için bir) tören düzenledi — bu ritüel günümüzde her temmuz dev arabalarla yapılan **Gion Matsuri**\'ye dönüştü.\n\nBugünkü ana salon **1654**\'te inşa edilen, eşsiz *Gion-zukuri* mimari tarzında bir **Milli Hazine**.',
      },
      {
        title: 'Burada ne yapılır',
        body:
          'Rōmon kapısından geçin, **temizuya**\'da ellerinizi yıkayın, ana salona yaklaşın. Madeni para atın, çanı çalın, **iki kez** alkışlayın, bir kez eğilin. ¥200\'e **omikuji** (fal kağıdı) alın. Ana salonun arkasındaki fenerler ve dans sahnesi akşam fotoğrafları için harika.',
      },
    ],
    tips: [
      'Her zaman **ücretsiz**, **24 saat** erişim — kapı yok',
      'Her akşam gün batımında **fener yakma**',
      'En iyi fotoğraflar: **gün batımı - 21:00** arası fenerler yandığında',
      '**Hanamikōji yürüyüşü** ve hemen arkadaki **Maruyama Parkı** ile birleştirin',
      'Büyük festival: **Gion Matsuri** — temmuz, büyük kalabalıklar bekleyin',
      'Alışveriş torbalarınız varsa Shijō girişinde dolaplar var',
    ],
  },
};

export default guide;
