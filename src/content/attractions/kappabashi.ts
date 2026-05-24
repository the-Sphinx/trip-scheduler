import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'kappabashi',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Kappabashi-dori_streetcorner_%28Kitchen_town_-_southern_end%29_Tokyo_Japan.jpg/1280px-Kappabashi-dori_streetcorner_%28Kitchen_town_-_southern_end%29_Tokyo_Japan.jpg',
  ],
  sources: [
    { name: 'Kappabashi Shopping Street Assoc.', url: 'https://www.kappabashi.or.jp/en/' },
  ],
  en: {
    intro:
      'A **800-meter shopping street** known as **"Kitchen Town"** — the wholesale supply district where every Tokyo restaurant buys its tools. **170+ specialty shops** for knives, ceramics, lacquerware, plastic food samples, signage, uniforms, espresso machines, and more. **Locals shop here; visitors discover the world\'s best kitchen souvenir hunting**.',
    highlights: [
      '**Hand-forged Japanese knives** at **Kamata Hakensha**, **Kama-Asa** and others',
      'Buy the **plastic food samples** (*sampuru*) you see in restaurant windows',
      'Real **lacquerware, ceramics**, kitchen tools you can\'t find at home',
      '**Coffee/espresso supply** street within the street',
      'The **giant chef\'s head** atop the Niimi store — the unofficial mascot',
    ],
    sections: [
      {
        title: 'For knife shopping',
        body:
          'Most shops let you handle knives. The best chains for tourists are **Kama-Asa** (English-speaking staff, will engrave your knife free, ships internationally), **Kamata Hakensha** (knife specialists, deep range), and **Tsubaya** (older shop, top-end). Budget: a great **gyuto** (chef\'s knife) starts at **¥10,000**, jumps to ¥30,000+ for handmade.\n\nAsk for **single-bevel** vs **double-bevel** — single is sharper but harder to maintain. Most home cooks should get double-bevel.\n\n**Watch out**: knives need to be **declared at airport** in checked baggage, not carry-on.',
      },
      {
        title: 'For other shopping',
        body:
          'Plastic food samples (the realistic fake food in restaurant windows) make incredible gifts — about **¥1,000–¥5,000** for a small sushi or noodle bowl, and they last forever. The shop **Maizuru** sells them.\n\n**Kappabashi Coffee & Bar** at the corner is also a respected coffee-supply street, with shops carrying everything from grinders to specialty beans.',
      },
    ],
    tips: [
      'Most shops open **~09:00–17:00**, **closed Sundays**',
      'Wednesday afternoon many shops also close',
      '**Knives**: ask for free engraving (it\'s standard, not a favor)',
      '**Tax-free shopping** at most stores for purchases >¥5,000 with passport',
      'Closest station: **Tawaramachi** (Ginza line) or **Asakusa** (10 min walk)',
      'Pair with **Sensō-ji** — same neighborhood, 10 min walk apart',
      'Carry plenty of **cash** — many small specialty shops are cash-only',
    ],
  },
  tr: {
    intro:
      '**"Mutfak Kasabası"** olarak bilinen **800 metrelik alışveriş sokağı** — her Tokyo restoranının aletlerini aldığı toptan tedarik bölgesi. Bıçaklar, seramikler, lake, plastik yemek örnekleri, tabela, üniforma, espresso makinesi vb. **170+ uzman dükkan**. **Yerliler buradan alır; ziyaretçiler dünyanın en iyi mutfak hediyelik avını keşfeder**.',
    highlights: [
      '**El dövmesi Japon bıçakları** **Kamata Hakensha**, **Kama-Asa** vd.',
      'Restoran vitrinlerinde gördüğünüz **plastik yemek örneklerini** (*sampuru*) satın alın',
      'Evde bulamayacağınız gerçek **lake, seramik**, mutfak aletleri',
      'Sokak içinde **kahve/espresso tedarik** sokağı',
      'Niimi mağazasının tepesindeki **dev şef başı** — gayri resmi maskot',
    ],
    sections: [
      {
        title: 'Bıçak alışverişi için',
        body:
          'Çoğu dükkan bıçakları elinize almanıza izin verir. Turistler için en iyi zincirler: **Kama-Asa** (İngilizce konuşan personel, bıçağınızı ücretsiz kazırlar, yurtdışına gönderiler), **Kamata Hakensha** (bıçak uzmanları, geniş yelpaze) ve **Tsubaya** (eski dükkan, üst seviye). Bütçe: harika bir **gyuto** (şef bıçağı) **¥10.000**\'den başlar, el yapımı ¥30.000+\'a çıkar.\n\n**Tek tarafı keskin** ve **iki tarafı keskin** arasından sorun — tek tarafı daha keskin ama bakımı zor. Çoğu ev kullanıcısı iki taraflı almalı.\n\n**Dikkat**: bıçaklar havalimanında **kargo bagajda beyan edilmeli**, kabin bagajında değil.',
      },
      {
        title: 'Diğer alışverişler için',
        body:
          'Plastik yemek örnekleri (restoran vitrinlerindeki gerçekçi sahte yemekler) inanılmaz hediyeler — küçük bir suşi veya erişte kâsesi için yaklaşık **¥1.000–¥5.000**, sonsuza dek dayanır. **Maizuru** dükkanı satıyor.\n\nKöşedeki **Kappabashi Coffee & Bar** ayrıca saygın bir kahve tedarik sokağıdır; öğütücüden özel çekirdeklere kadar her şey.',
    },
    ],
    tips: [
      'Çoğu dükkan **~09:00–17:00**, **Pazar kapalı**',
      'Çarşamba öğleden sonra da bazıları kapanır',
      '**Bıçaklar**: ücretsiz kazıma isteyin (standart, lütuf değil)',
      'Çoğu mağazada pasaportla ¥5.000\'in üzeri alışverişte **vergisiz**',
      'En yakın istasyon: **Tawaramachi** (Ginza hattı) veya **Asakusa** (10 dk)',
      '**Sensō-ji** ile birleştirin — aynı mahalle, 10 dk yürüme',
      'Bol **nakit** taşıyın — birçok küçük uzman dükkan yalnızca nakit',
    ],
  },
};

export default guide;
