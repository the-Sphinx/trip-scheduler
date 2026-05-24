import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'pokemon-center',
  gallery: [],
  sources: [
    { name: 'Pokémon Center Mega Tokyo (official)', url: 'https://www.pokemon.co.jp/shop/pokecen/megatokyo/' },
  ],
  en: {
    intro:
      'The **largest Pokémon Center in central Tokyo** — a single floor inside Sunshine City alpa in Ikebukuro packed with **thousands of items**: plushies, cards, apparel, the famous **giant Mewtwo statue**, and a separate **Pokémon Cafe** next door (reservation only). Smaller than the Mega Center in Shibuya, but more centrally located and easier to combine with other Ikebukuro stops.',
    highlights: [
      'Massive **plush wall** — every Pokémon you remember (and many you don\'t)',
      '**Trading cards** including Japan-only sets and special boosters',
      '**Limited Mega Tokyo exclusives** with the local mascot Pokémon',
      'Photo op with the **giant Mewtwo statue** at the entrance',
      '**Pokémon Cafe** next door — themed dishes, table reservations open monthly',
      'Around the corner: **J-World Tokyo** (anime + Shonen Jump arcade)',
    ],
    sections: [
      {
        title: 'Pokémon Cafe reservations',
        body:
          'The Pokémon Cafe is **reservation-only**, opened **31 days in advance at exactly 18:00 JST**. Sells out within **minutes** of opening. Same-day walk-ins basically never available. If you really want it, set an alarm.\n\nMenu items are designed dishes (Pikachu pancakes, Snorlax bento) with a small **collectible plate** included. Around **¥2,000–¥3,500** per person.',
      },
      {
        title: 'Card-collecting note',
        body:
          'Japanese Pokémon card releases are **separate from English** ones and often appear **months earlier** with different art. Best place to find **booster boxes** (sealed sets) — but expect strict purchase limits per customer to prevent reselling.',
      },
    ],
    tips: [
      'Store hours: **10:00–20:00** (Sunshine City closing time)',
      '**Tax-free** with passport for purchases >¥5,000',
      'Smaller and less crowded than the **Mega Center Shibuya** (DM Shibuya Parco)',
      'Cafe reservation opens **18:00 JST exactly**, 31 days ahead — set an alarm',
      'Closest station: **Ikebukuro** (JR Yamanote, Marunouchi, Yūrakuchō, Fukutoshin)',
      'Pair with **Sunshine 60 observation deck** (same building)',
    ],
  },
  tr: {
    intro:
      '**Merkez Tokyo\'daki en büyük Pokémon Center** — Ikebukuro\'daki Sunshine City alpa içinde **binlerce ürünle** dolu tek katlı: peluş, kartlar, kıyafet, ünlü **dev Mewtwo heykeli** ve yan tarafta ayrı bir **Pokémon Cafe** (yalnızca rezervasyonla). Shibuya\'daki Mega Center\'dan daha küçük ama daha merkezi ve diğer Ikebukuro durakalarıyla birleştirmesi daha kolay.',
    highlights: [
      'Devasa **peluş duvarı** — hatırladığınız her Pokémon (ve birçok hatırlamadığınız)',
      'Japonya\'ya özel setler ve özel boosterlar dahil **ticaret kartları**',
      'Yerel maskot Pokémon ile **sınırlı Mega Tokyo özel ürünleri**',
      'Girişteki **dev Mewtwo heykeli** ile fotoğraf fırsatı',
      'Yan tarafta **Pokémon Cafe** — temalı yemekler, masa rezervasyonları aylık açılır',
      'Köşede: **J-World Tokyo** (anime + Shonen Jump atari)',
    ],
    sections: [
      {
        title: 'Pokémon Cafe rezervasyonları',
        body:
          'Pokémon Cafe **yalnızca rezervasyonla**, **31 gün önceden tam 18:00 JST**\'de açılır. Açıldıktan **dakikalar içinde** tükenir. Aynı gün yürüyüş içeri neredeyse hiç olmaz. Gerçekten istiyorsanız alarm kurun.\n\nMenü öğeleri tasarlanmış yemeklerdir (Pikachu pancake, Snorlax bento) ve küçük bir **koleksiyon tabağı** dahildir. Kişi başı yaklaşık **¥2.000–¥3.500**.',
      },
      {
        title: 'Kart koleksiyon notu',
        body:
          'Japonca Pokémon kart sürümleri İngilizcelerden **ayrıdır** ve genellikle farklı tasarımla **aylar önce** çıkar. **Booster kutuları** (mühürlü setler) bulmak için en iyi yer — ama yeniden satışı önlemek için müşteri başına sıkı satın alma sınırları bekleyin.',
      },
    ],
    tips: [
      'Mağaza saatleri: **10:00–20:00** (Sunshine City kapanış saati)',
      'Pasaportla ¥5.000 üzeri **vergisiz**',
      '**Mega Center Shibuya**\'dan (DM Shibuya Parco) daha küçük ve daha az kalabalık',
      'Kafe rezervasyonu 31 gün önceden **tam 18:00 JST**\'de açılır — alarm kurun',
      'En yakın istasyon: **Ikebukuro** (JR Yamanote, Marunouchi, Yūrakuchō, Fukutoshin)',
      'Aynı binadaki **Sunshine 60 gözlem terası** ile birleştirin',
    ],
  },
};

export default guide;
