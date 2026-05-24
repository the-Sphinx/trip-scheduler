import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'ninenzaka',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pedestrian_road_with_pavements_and_paper_umbrellas%2C_Higashiyama-ku%2C_Kyoto%2C_Japan%2C_early_morning.jpg/1280px-Pedestrian_road_with_pavements_and_paper_umbrellas%2C_Higashiyama-ku%2C_Kyoto%2C_Japan%2C_early_morning.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Ninenzaka.jpg/1280px-Ninenzaka.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg/1280px-Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg',
  ],
  sources: [
    { name: 'JNTO Kyoto', url: 'https://www.japan.travel/en/destinations/kansai/kyoto/' },
  ],
  en: {
    intro:
      'A **preserved cobblestone slope** in Higashiyama, lined with **Edo-period merchant houses** that now hold cafés, sweet shops, and craft stores. Together with the upper **Sannenzaka** ("three-year slope"), this is the postcard walk between Kiyomizu-dera and Yasaka Shrine — a protected historic preservation district since **1976**.',
    highlights: [
      '**Wooden machiya** townhouses with sloped tile roofs and lattice fronts',
      '**Starbucks Ninenzaka** — a flagship store inside a traditional house (worth peeking in)',
      'View of the **Yasaka Pagoda** down the lower slope',
      '**Matcha and yatsuhashi sweet shops** all along the street',
      'Best photo time: **before 08:00** — by 10:00 it\'s wall-to-wall',
    ],
    sections: [
      {
        title: 'Why "two-year slope"?',
        body:
          'The name literally means *"two-year slope"*. Local superstition warns: **if you trip and fall here, bad luck for two years.** A few steps up is **Sannenzaka** ("three-year slope") with the same legend but worse stakes. So watch your step — especially in rain.\n\nThe story is older than the name itself: these slopes were once the main pilgrimage route to Kiyomizu-dera. Pilgrims were said to be in a hurry to reach the temple and would stumble.',
      },
      {
        title: 'How long to spend',
        body:
          'You can walk the full slope in **10 minutes**. With café/shop stops, allow **45 minutes to an hour**. The street is fully pedestrianized.',
      },
    ],
    tips: [
      'No cars, fully **walkable** at any hour',
      'Most shops open ~**10:00**, close ~17:00',
      '**Yatsuhashi** (cinnamon mochi triangle) is the local sweet — sample free at most shops',
      'Stairs are uneven — careful with rolling luggage',
      'The Starbucks here has a **tatami floor** upstairs — order downstairs, sit upstairs',
      'Pair with **Yasaka Pagoda + Kiyomizu-dera** as a single Higashiyama morning',
    ],
  },
  tr: {
    intro:
      'Higashiyama\'da **korunmuş arnavut kaldırımı yokuş**, **Edo dönemi tüccar evleriyle** çevrili; bugün bunlar kafe, tatlıcı ve el sanatları dükkanı. Üstteki **Sannenzaka** ("üç yıl yokuşu") ile birlikte Kiyomizu-dera ile Yasaka Tapınağı arasındaki kartpostal yürüyüşü — **1976**\'dan beri korunan tarihi bölge.',
    highlights: [
      'Eğimli kiremit çatılı ve kafesli cepheli **ahşap machiya** evler',
      '**Ninenzaka Starbucks** — geleneksel bir evin içinde özel mağaza (girip görmeye değer)',
      'Yokuşun aşağısında **Yasaka Pagoda** manzarası',
      'Sokak boyunca **matcha ve yatsuhashi tatlıcıları**',
      'En iyi fotoğraf vakti: **08:00\'dan önce** — 10:00\'da insan kaynar',
    ],
    sections: [
      {
        title: 'Neden "iki yıl yokuşu"?',
        body:
          'Adı kelime anlamıyla *"iki yıl yokuşu"*. Yerel bir batıl inanış uyarıyor: **buradayken düşerseniz iki yıl boyunca kötü şans.** Birkaç adım yukarıdaki **Sannenzaka** ("üç yıl yokuşu") için aynı efsane, daha yüksek bedel. Adımınıza dikkat — özellikle yağmurda.\n\nHikaye adından eski: bu yokuşlar bir zamanlar Kiyomizu-dera\'ya giden ana hac yoluydu. Hacıların tapınağa varma telaşıyla tökezlediği anlatılırdı.',
      },
      {
        title: 'Ne kadar sürer',
        body:
          'Yokuşun tamamını **10 dakikada** yürürsünüz. Kafe/dükkan duraklarıyla **45 dakika - 1 saat** ayırın. Sokak tamamen yayalaştırılmış.',
      },
    ],
    tips: [
      'Araç yok, her saatte **yürünebilir**',
      'Çoğu dükkan ~**10:00**\'da açılır, ~17:00\'da kapanır',
      '**Yatsuhashi** (tarçınlı üçgen mochi) yerel tatlı — çoğu dükkan ücretsiz tattırır',
      'Basamaklar düzensiz — tekerlekli valizle dikkat',
      'Buradaki Starbucks\'ın üst katında **tatami zemin** var — aşağıda sipariş, yukarıda otur',
      '**Yasaka Pagoda + Kiyomizu-dera** ile tek bir Higashiyama sabahında birleştirin',
    ],
  },
};

export default guide;
