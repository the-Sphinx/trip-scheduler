import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'uji-river',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kagesue%2C_Takatsuna_and_Shigetada_crossing_the_Uji_river.jpg/1280px-Kagesue%2C_Takatsuna_and_Shigetada_crossing_the_Uji_river.jpg',
  ],
  sources: [
    { name: 'Uji City Tourism', url: 'https://www.kyoto.travel/en/area/uji/' },
  ],
  en: {
    intro:
      'The river that **defines Uji** — wide, fast, ancient — runs right through town. A short **walking path on both banks**, a couple of pretty bridges, two small **islands in the middle**, and almost no tourists despite being a 5-minute walk from Tea Street. The most underrated stop in Uji and **especially nice around sunset**.',
    highlights: [
      'Cross the **Asagiri-bashi** bridge to the central island',
      'Walk to the **13-tier stone pagoda** (1286 AD) on the island — Japan\'s tallest',
      'Sunset light hits the river around **18:30 in summer**',
      'Working **cormorant fishing** boats here in summer evenings',
      '**Tea Street + Byōdō-in + this walk** = full Uji loop in 2 hours',
    ],
    sections: [
      {
        title: 'A bit of history',
        body:
          'The Uji river was once a strategic **military crossing point** between Kyoto and the south. The **1180 Battle of Uji Bridge** is a famous moment in the Genpei wars; centuries later the river is also the setting for the final ten chapters of *The Tale of Genji* (1010 AD, the world\'s first novel) — known as the **"Uji Chapters"**. A small park near the bridge has a Genji statue.',
      },
    ],
    tips: [
      '**Free**, **24h**, no closing',
      'Best: **late afternoon to sunset** (~17:30–19:00)',
      'Bring a **light layer** — it gets cool at the water even in summer',
      'Watch for **cormorant fishing displays** in July–August evenings (paid tickets sold riverside)',
      'A relaxed 20–30 minute walk; **no climbing**',
    ],
  },
  tr: {
    intro:
      '**Uji\'yi tanımlayan** nehir — geniş, hızlı, kadim — kasabanın tam ortasından geçer. **Her iki kıyıda kısa yürüyüş yolu**, birkaç güzel köprü, ortada **iki küçük ada** ve Tea Street\'ten 5 dakika yürüyüşte olmasına rağmen neredeyse hiç turist yok. Uji\'nin en yetersiz değerlendirilen durağı ve **özellikle gün batımı civarında** çok güzel.',
    highlights: [
      'Merkezi adaya **Asagiri-bashi** köprüsünden geçin',
      'Adadaki **13 katlı taş pagodaya** (MS 1286) yürüyün — Japonya\'nın en yükseği',
      'Yazın yaklaşık **18:30**\'da gün batımı ışığı nehre vurur',
      'Yaz akşamları burada çalışan **karabatak balıkçılığı** tekneleri',
      '**Tea Street + Byōdō-in + bu yürüyüş** = 2 saatte tam Uji turu',
    ],
    sections: [
      {
        title: 'Kısa tarihçe',
        body:
          'Uji nehri bir zamanlar Kyoto ile güney arasında stratejik bir **askeri geçit noktası**ydı. **1180 Uji Köprüsü Savaşı**, Genpei savaşlarının ünlü anlarından; yüzyıllar sonra nehir, *Genji\'nin Hikayesi* (MS 1010, dünyanın ilk romanı) son on bölümünün de geçtiği yer — **"Uji Bölümleri"** olarak bilinir. Köprünün yanındaki küçük parkta bir Genji heykeli var.',
      },
    ],
    tips: [
      '**Ücretsiz**, **24 saat**, kapanış yok',
      'En iyi zaman: **öğleden sonra geç saatler - gün batımı** (~17:30–19:00)',
      'Yazın bile suya yakın serindir, **hafif bir katman** getirin',
      'Temmuz–Ağustos akşamları **karabatak balıkçılığı gösterileri** (nehir kenarında bilet satılır)',
      'Rahat 20–30 dakikalık yürüyüş; **tırmanış yok**',
    ],
  },
};

export default guide;
