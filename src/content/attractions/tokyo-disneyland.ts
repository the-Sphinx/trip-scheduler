import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'tokyo-disneyland',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Tokyo_Disneyland_Cinderella_Castle_2023-07-02.jpg/1280px-Tokyo_Disneyland_Cinderella_Castle_2023-07-02.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/World_Bazaar%2C_Tokyo_Disneyland_%289409949418%29.jpg/1280px-World_Bazaar%2C_Tokyo_Disneyland_%289409949418%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/TDL_Polynesian_Terrace_Restaurant.jpg/1280px-TDL_Polynesian_Terrace_Restaurant.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Tokyo_Disneyland_inside.JPG/1280px-Tokyo_Disneyland_inside.JPG',
  ],
  sources: [
    { name: 'Tokyo Disney Resort (official)', url: 'https://www.tokyodisneyresort.jp/en/tdl/' },
  ],
  en: {
    intro:
      'The **first Disney park built outside the United States** (opened **1983**), and widely regarded as one of the **best-run** in the world. Cleaner, smoother queues, more polite cast members, and a few rides you can\'t experience anywhere else. The **MyDisney app** is essential — use it to pre-book stand-by passes and order food.',
    highlights: [
      '**Pooh\'s Hunny Hunt** — the unique trackless ride, queue early',
      '**Beauty and the Beast: Enchanted Tale** — opened 2020, lines stay long',
      '**Big Thunder Mountain**, **Space Mountain**, **Splash Mountain** — classics',
      '**Cinderella Castle Mystery Tour** — Japan-exclusive walkthrough',
      '**Tokyo Disney Sea** next door (separate ticket) — even more popular with locals',
      'Parades twice daily; the **night Electrical Parade** is a must',
    ],
    sections: [
      {
        title: 'How to ride strategy',
        body:
          'There are no longer **free FastPasses**. Two systems matter:\n\n**Standby Pass** (free, via app): reserves a time slot for specific busy rides. You **can\'t walk up** to certain rides without one. Released in batches — refresh the app constantly from park opening.\n\n**Premier Access** (paid, ¥1,500–¥2,500/ride/person): skip-the-line, available on the app. **Worth it for Pooh\'s Hunny Hunt and Beauty and the Beast** if your time is limited.\n\nDownload the **Tokyo Disney Resort app** before arrival and link payment. Setup at the gate wastes 30 min.',
      },
      {
        title: 'Food + souvenirs',
        body:
          '**Order food on the app** — pickup at counter, no line. Park-exclusive popcorn flavors (curry, milk-tea, soy-sauce-butter — yes really) are a thing; buckets are reusable across visits. The **gift shops on Main Street stay open ~30 min after park close** — better photo time and shorter checkout queues.',
      },
    ],
    tips: [
      'Park hours **vary daily** — check the official site for your date',
      'Tickets: **¥7,900–¥10,900** depending on day (weekday/weekend, season)',
      'Download the **Tokyo Disney Resort app** **before** the day — gate setup wastes time',
      '**Arrive 45 min before opening** for a chance at Pooh\'s Hunny Hunt standby',
      'Restaurants take **mobile order** via the app — skip the lunch lines',
      '**Closest station**: Maihama (JR Keiyō line, ~20 min from Tokyo Station)',
      'Lockers at the gate and inside the park; bring cash for them',
    ],
  },
  tr: {
    intro:
      'ABD dışında inşa edilen **ilk Disney parkı** (**1983** açılışı) ve dünyada **en iyi işletilen**lerden biri olarak kabul ediliyor. Daha temiz, daha akıcı kuyruklar, daha kibar personel ve başka hiçbir yerde olmayan birkaç oyuncak. **MyDisney uygulaması** şart — bekleme paso\'larını önceden ayırtmak ve yemek sipariş etmek için kullanın.',
    highlights: [
      '**Pooh\'s Hunny Hunt** — eşsiz raysız oyuncak, erken sıraya girin',
      '**Beauty and the Beast: Enchanted Tale** — 2020\'de açıldı, sıralar uzun kalır',
      '**Big Thunder Mountain**, **Space Mountain**, **Splash Mountain** — klasikler',
      '**Cinderella Castle Mystery Tour** — Japonya\'ya özel yürüyüş turu',
      'Yan tarafta **Tokyo Disney Sea** (ayrı bilet) — yerliler arasında daha da popüler',
      'Günde iki kez geçit; **gece Elektrik Geçidi** kaçırılmaz',
    ],
    sections: [
      {
        title: 'Oyuncak stratejisi',
        body:
          'Artık **ücretsiz FastPass yok**. İki sistem önemli:\n\n**Standby Pass** (ücretsiz, uygulamadan): belirli yoğun oyuncaklar için zaman dilimi ayırır. Bazı oyuncaklara **bunsuz yaklaşamazsınız**. Partiler halinde yayınlanır — park açılışından itibaren uygulamayı sürekli yenileyin.\n\n**Premier Access** (ücretli, ¥1.500–¥2.500/oyuncak/kişi): sıra atlama, uygulamada mevcut. Zamanınız kısıtlıysa **Pooh\'s Hunny Hunt ve Beauty and the Beast için değer**.\n\nVarıştan önce **Tokyo Disney Resort uygulamasını** indirin ve ödemeyi bağlayın. Kapıda ayarlamak 30 dk harcatır.',
      },
      {
        title: 'Yemek + hediyelikler',
        body:
          '**Yemeği uygulamadan sipariş edin** — gişeden al, sıra yok. Parka özel patlamış mısır aromaları (köri, sütlü çay, soya-tereyağı — evet gerçekten) var; kovalar ziyaretler arasında tekrar kullanılabilir. **Main Street\'teki hediye dükkanları park kapanışından sonra ~30 dk açık kalır** — daha iyi fotoğraf zamanı ve daha kısa ödeme sıraları.',
      },
    ],
    tips: [
      'Park saatleri **günlük değişir** — tarihiniz için resmi siteyi kontrol edin',
      'Biletler: güne göre **¥7.900–¥10.900** (hafta içi/sonu, sezon)',
      '**Tokyo Disney Resort uygulamasını** günden **önce** indirin — kapıda zaman kaybetmeyin',
      'Pooh\'s Hunny Hunt standby şansı için **açılıştan 45 dk önce** gelin',
      'Restoranlar uygulamadan **mobil sipariş** alır — öğle kuyruklarını atlayın',
      '**En yakın istasyon**: Maihama (JR Keiyō hattı, Tokyo İstasyonu\'ndan ~20 dk)',
      'Kapıda ve park içinde dolaplar var; nakit getirin',
    ],
  },
};

export default guide;
