import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'manga-museum',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/%E4%BA%AC%E9%83%BD%E5%9B%BD%E9%9A%9B%E3%83%9E%E3%83%B3%E3%82%AC%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%B8%E3%82%A2%E3%83%A0.jpg/1280px-%E4%BA%AC%E9%83%BD%E5%9B%BD%E9%9A%9B%E3%83%9E%E3%83%B3%E3%82%AC%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%B8%E3%82%A2%E3%83%A0.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Kyoto_International_Manga_Museum_-_Main_Exhibit.jpg/1280px-Kyoto_International_Manga_Museum_-_Main_Exhibit.jpg',
  ],
  sources: [
    { name: 'Kyoto Int\'l Manga Museum (official)', url: 'https://kyotomm.jp/en/' },
  ],
  en: {
    intro:
      'Half library, half museum — **300,000+ manga volumes**, including international translations, in a renovated former elementary school. **Open shelves**: you can pull anything down and read it on the lawn outside. There\'s also a permanent gallery on manga history and rotating exhibitions of original art. **Adults love it, kids love it more**.',
    highlights: [
      '**Wall of Manga**: 200m of shelves, the entire history of the medium',
      'Take any book outside to the **lawn or wooden floor** to read',
      'Permanent exhibit on **manga\'s history** (English captions throughout)',
      '**Caricature artist** on site (~¥1,500 for a portrait, 20 min)',
      'A repurposed **1869 elementary school** — beautiful building in itself',
    ],
    sections: [
      {
        title: 'What kids love',
        body:
          'There\'s a **kids\' reading room** with picture books and short manga in multiple languages. Storytelling sessions happen on weekends. Most signage has English; the kids\' section has French, Korean, Chinese editions too.',
      },
      {
        title: 'For adults',
        body:
          'The temporary exhibitions are usually excellent — past shows have covered Tezuka, Studio Ghibli storyboards, shōjo manga history, etc. The **archive section** lets you flip through manga from the 1950s onward. Easy to spend 2 hours.',
      },
    ],
    tips: [
      'Hours: **10:30–17:30** (last entry 17:00)',
      'Closed **Wednesdays** + last day of each month',
      'Ticket: **¥1,200** adult, **¥400** elementary',
      '**Most manga in Japanese** but ~5,000 translated volumes (EN, FR, KR, CN, etc.)',
      'Bring a book home? No — it\'s a library, not a shop. Gift shop has merch though',
      'Closest station: **Karasuma Oike** (Tōzai / Karasuma subway)',
      'Pair with **Nishiki Market** (10 min walk south)',
    ],
  },
  tr: {
    intro:
      'Yarı kütüphane, yarı müze — eski bir ilkokul binasında **300.000+ manga cildi**, uluslararası çeviriler dahil. **Açık raflar**: istediğinizi indirip dışarıdaki çimde okuyabilirsiniz. Ayrıca manga tarihi üzerine sürekli sergi ve orijinal eserlerin rotasyon sergileri var. **Yetişkinler bayılır, çocuklar daha çok bayılır**.',
    highlights: [
      '**Manga Duvarı**: 200m raf, türün tüm tarihi',
      'Herhangi bir kitabı **çime veya ahşap zemine** götürüp okuyun',
      '**Manga tarihi** üzerine sürekli sergi (İngilizce altyazılı)',
      'Stüdyoda **karikatür sanatçısı** (portre için ~¥1.500, 20 dk)',
      'Yeniden işlevlendirilmiş **1869 ilkokulu** — bina başlı başına güzel',
    ],
    sections: [
      {
        title: 'Çocukların hoşuna gidecek',
        body:
          'Birkaç dilde resimli kitaplar ve kısa mangalar içeren bir **çocuk okuma odası** var. Hafta sonu hikaye anlatımı seansları olur. Çoğu yazı İngilizce, çocuk bölümünde Fransızca, Korece, Çince de var.',
      },
      {
        title: 'Yetişkinler için',
        body:
          'Geçici sergiler genellikle harika — geçmiş sergiler Tezuka, Studio Ghibli storyboardları, shōjo manga tarihi vb. konuları işledi. **Arşiv bölümü** 1950\'lerden itibaren mangaya göz atmanızı sağlar. Kolayca 2 saat geçirilir.',
      },
    ],
    tips: [
      'Saatler: **10:30–17:30** (son giriş 17:00)',
      'Her **Çarşamba** ve ayın son günü kapalı',
      'Bilet: yetişkin **¥1.200**, ilkokul **¥400**',
      '**Çoğu manga Japonca** ama ~5.000 çevrilmiş cilt var (EN, FR, KR, CN vb.)',
      'Kitap götürmek? Hayır — burası kütüphane, dükkan değil. Hediye dükkanında ürünler var',
      'En yakın istasyon: **Karasuma Oike** (Tōzai / Karasuma metro)',
      '**Nishiki Market** ile birleştirin (10 dk güneyde)',
    ],
  },
};

export default guide;
