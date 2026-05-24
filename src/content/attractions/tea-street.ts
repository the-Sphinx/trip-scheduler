import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'tea-street',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Phoenix_Hall%2C_Byodo-in%2C_November_2016_-01.jpg/1280px-Phoenix_Hall%2C_Byodo-in%2C_November_2016_-01.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Byodo-in_in_Uji.jpg/1280px-Byodo-in_in_Uji.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Byodoin-PhoenixHall-M1264.jpg/1280px-Byodoin-PhoenixHall-M1264.jpg',
  ],
  sources: [
    { name: 'Uji City Tourism', url: 'https://www.kyoto.travel/en/area/uji/' },
  ],
  en: {
    intro:
      'A **300-meter approach street** leading from Uji Station to the entrance of Byōdō-in temple — but the real point isn\'t the temple. It\'s the **matcha**. **Uji is the most prestigious tea-growing region in Japan**, and every shop on this street pushes its own century-old version of green-tea soft-serve, sweets, soba, and even matcha beer.',
    highlights: [
      '**Matcha soft-serve** at literally every shop — try **Itohkyuemon** or **Masuda Tea**',
      'Hot or cold **matcha lattes** stronger than anything outside Japan',
      'Real **matcha noodles** (the green soba), best at **Tsuen Tea** (1160 AD, world\'s oldest teahouse)',
      'Souvenir-grade **matcha powder** — bring some home',
      'Ends at **Byōdō-in** — the temple on the ¥10 coin',
    ],
    sections: [
      {
        title: 'What to actually try',
        body:
          'Don\'t order the first matcha soft-serve you see. Each shop blends differently. The **intense, bitter** versions are at **Itohkyuemon** and **Nakamura Tōkichi**. The **mellow, sweet** versions are at **Masuda Tea** and supermarkets. Try **two** for comparison.\n\nIf you have time, sit down for a proper **matcha + wagashi sweet** at **Mitsuboshi-en Kanbayashi Sannyuu** — the family-name behind a 600-year tea producer. About ¥1,500 and worth every yen.',
      },
      {
        title: 'Why Uji?',
        body:
          'Tea was brought to Uji by Buddhist monks in the **1200s**. The combination of river mist, well-drained soil, and cool nights made Uji\'s tea so prized that **the shogun reserved entire fields for himself**. Today the region still produces the matcha used in most Kyoto tea ceremonies.',
      },
    ],
    tips: [
      'Allow **45–60 minutes**, more if you want a sit-down',
      'Most shops open **~09:00–18:00**',
      'Carry **cash** — many small stalls don\'t take cards',
      'Soft-serve is **¥400–¥600**, lattes ¥600–¥900',
      'A small cup of **good matcha powder** is **¥1,500–¥3,000** — keep it sealed and use it within 3 months',
      'Combine with **Byōdō-in temple** (at the end of the street) for the full Uji loop',
    ],
  },
  tr: {
    intro:
      'Uji İstasyonu\'ndan Byōdō-in tapınağı girişine kadar uzanan **300 metrelik yaklaşım sokağı** — ama asıl konu tapınak değil. Asıl konu **matcha**. **Uji Japonya\'nın en prestijli çay yetiştiren bölgesi**, ve sokaktaki her dükkan kendi asırlık yeşil çay soft serve, tatlı, soba ve hatta matcha biralarını sunar.',
    highlights: [
      'Kelimenin tam anlamıyla her dükkanda **matcha soft serve** — **Itohkyuemon** veya **Masuda Tea** deneyin',
      'Japonya dışında bulamayacağınız kadar yoğun sıcak veya soğuk **matcha latte**\'ler',
      'Gerçek **matcha eriştesi** (yeşil soba), **Tsuen Tea**\'de en iyisi (MS 1160, dünyanın en eski çayhanesi)',
      'Hediyelik kalitesinde **matcha tozu** — biraz alıp götürün',
      '**Byōdō-in**\'de biter — ¥10 madeni parasındaki tapınak',
    ],
    sections: [
      {
        title: 'Aslında ne deneyin',
        body:
          'Gördüğünüz ilk matcha soft serve\'i almayın. Her dükkanın harmanı farklı. **Yoğun ve acı** versiyonlar **Itohkyuemon** ve **Nakamura Tōkichi**\'de. **Yumuşak ve tatlı** versiyonlar **Masuda Tea** ve marketlerde. Karşılaştırma için **iki** tane deneyin.\n\nVaktiniz varsa **Mitsuboshi-en Kanbayashi Sannyuu**\'da düzgün bir **matcha + wagashi tatlı** servisi için oturun — 600 yıllık çay üreticisi ailenin adı. Yaklaşık ¥1.500, her yenine değer.',
      },
      {
        title: 'Neden Uji?',
        body:
          'Çay, Uji\'ye **1200\'lerde** Budist rahipler tarafından getirildi. Nehir sisi, iyi drene olan toprak ve serin geceler Uji çayını o kadar değerli kıldı ki **şogun bütün tarlaları kendine ayırdı**. Bugün hâlâ çoğu Kyoto çay töreninde kullanılan matcha bu bölgeden gelir.',
      },
    ],
    tips: [
      '**45–60 dakika** ayırın, oturmak isterseniz daha fazla',
      'Çoğu dükkan **~09:00–18:00**',
      '**Nakit** taşıyın — birçok küçük tezgah kart kabul etmez',
      'Soft serve **¥400–¥600**, latte ¥600–¥900',
      'Küçük bir kap **iyi matcha tozu** **¥1.500–¥3.000** — kapalı tutun ve 3 ay içinde kullanın',
      'Tam Uji turu için sokağın sonundaki **Byōdō-in tapınağı** ile birleştirin',
    ],
  },
};

export default guide;
