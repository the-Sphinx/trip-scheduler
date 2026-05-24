import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'osaka-castle',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/1280px-Osaka_Castle_03bs3200.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Osaka_Castle_Aerial_photograph_2017.jpg/1280px-Osaka_Castle_Aerial_photograph_2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Osakajo_ramparts_and_moat.jpg/1280px-Osakajo_ramparts_and_moat.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Osaka_Castle_Keep_Tower_in_201504_016.JPG/1280px-Osaka_Castle_Keep_Tower_in_201504_016.JPG',
  ],
  sources: [
    { name: 'Osaka Castle (official, EN)', url: 'https://www.osakacastle.net/english/' },
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/636/' },
  ],
  en: {
    intro:
      'The **symbol of Osaka** — a 5-story, **gold-trimmed castle** rising 55m above wide moats and lawns. The current keep is a **1931 concrete reconstruction** of the 1583 original built by **Toyotomi Hideyoshi**, the warlord who unified Japan. The **grounds are the highlight**; the interior is a museum which most travelers can skip if they\'ve seen Nijō Castle in Kyoto.',
    highlights: [
      '**Tenshukaku (main keep)** — gold leaf, tiger reliefs, photogenic from any side',
      '**Inner moat** with stone walls up to 32m tall — some of the largest in Japan',
      '**Nishinomaru Garden** — best skyline view of the castle (¥200 entry)',
      '**Sakura Park** — 600 cherry trees, mid-April peak',
      'Look up at the **golden roof shachi (mythical fish)** — they\'re the originals from 1931',
      'A walking-only zone — **plenty of grass and benches** for a picnic',
    ],
    sections: [
      {
        title: 'A bit of history',
        body:
          'In **1583**, **Toyotomi Hideyoshi** — the second of Japan\'s "three great unifiers" — built Osaka Castle as the largest castle in the country, a statement of his absolute power. After his death the Tokugawa family besieged it twice (1614 and 1615) and finally destroyed it, replacing it with their own fort.\n\nThe current concrete keep was built in **1931** thanks to citizen donations — pre-WWII tech but very robust. It survived the WWII firebombing of Osaka unscathed (although the surrounding wooden buildings burned). A **2016 renovation** modernized the interior museum.',
      },
      {
        title: 'Should I go inside?',
        body:
          'The interior is a **museum about Hideyoshi and the castle\'s history**, with displays in Japanese + English. If you\'re a samurai-history enthusiast, **yes — pay the ¥600**, especially for the top-floor observation deck.\n\nIf you\'ve already done **Nijō Castle in Kyoto** and seen plenty of Japanese temples, the interior here is reconstruction-on-concrete and not the same authenticity. The **grounds are the experience** for most visitors — gardens, moats, photos, picnic, walk through, leave.',
      },
    ],
    tips: [
      '**Grounds free, 24h**',
      '**Interior**: 09:00–17:00, **¥600** adult',
      'Closest station: **Tanimachi 4-chōme** (Tanimachi/Chuo subway) — 10 min walk',
      'Or **Osakajōkōen** (JR Osaka Loop) — 15 min through the park',
      'Allow **1.5–2 hours** for grounds-only visit',
      'Best castle photo: from the **east side near Toyokuni Shrine** or **Nishinomaru Garden**',
      'Combine with **Kuromon Market** for lunch (15 min south by subway)',
    ],
  },
  tr: {
    intro:
      '**Osaka\'nın sembolü** — geniş hendeklerin ve çimenliklerin 55m üzerinde yükselen 5 katlı, **altın süslemeli kale**. Bugünkü kule, Japonya\'yı birleştiren savaş ağası **Toyotomi Hideyoshi**\'nin 1583\'te yaptırdığı orijinalin **1931 beton yeniden yapımı**. **Asıl güzelliği bahçeleri**; iç müzeyi, Kyoto\'da Nijō Kalesi\'ni görmüş gezginler atlayabilir.',
    highlights: [
      '**Tenshukaku (ana kule)** — altın varak, kaplan kabartmaları, her yönden fotojenik',
      'Bazıları 32m\'ye varan taş duvarlı **iç hendek** — Japonya\'nın en büyüklerinden',
      '**Nishinomaru Bahçesi** — kalenin en iyi silüet manzarası (¥200 giriş)',
      '**Sakura Parkı** — 600 kiraz ağacı, Nisan ortası en güzel zamanı',
      '**Altın çatı shachi**\'lerine (mitolojik balık) yukarı bakın — 1931\'den orijinal',
      'Sadece yürüyüş bölgesi — piknik için **bol çim ve bank**',
    ],
    sections: [
      {
        title: 'Kısa tarihçe',
        body:
          '**1583**\'te Japonya\'nın "üç büyük birleştiricisinden" ikincisi olan **Toyotomi Hideyoshi**, mutlak gücünün bir göstergesi olarak ülkenin en büyük kalesini inşa etti. Ölümünden sonra Tokugawa ailesi kaleyi iki kez (1614 ve 1615) kuşattı ve sonunda yıkıp yerine kendi kalesini koydu.\n\nBugünkü beton kule, vatandaş bağışlarıyla **1931**\'de inşa edildi — savaş öncesi teknoloji ama çok sağlam. II. Dünya Savaşı\'nın Osaka bombalamalarını hasarsız atlattı (etrafındaki ahşap binalar yansa da). **2016 restorasyonu** iç müzeyi modernize etti.',
      },
      {
        title: 'İçeri girmeli miyim?',
        body:
          'İç mekan, Japonca + İngilizce sergilerle **Hideyoshi ve kalenin tarihi** üzerine bir müze. Samuray tarihi meraklısıysanız **evet — ¥600 ödeyin**, özellikle üst kat gözlem terası için.\n\nKyoto\'da **Nijō Kalesi**\'ni yaptıysanız ve birçok Japon tapınağı gördüyseniz, buradaki iç beton üzerine yeniden yapımdır ve aynı özgünlüğü taşımaz. Çoğu ziyaretçi için **deneyim bahçelerdir** — bahçe, hendek, fotoğraf, piknik, dolaş, çık.',
      },
    ],
    tips: [
      '**Bahçeler ücretsiz, 24 saat**',
      '**İç mekan**: 09:00–17:00, yetişkin **¥600**',
      'En yakın istasyon: **Tanimachi 4-chōme** (Tanimachi/Chuo metro) — 10 dk yürüyüş',
      'Veya **Osakajōkōen** (JR Osaka Loop) — parktan 15 dk',
      'Yalnızca bahçe ziyareti için **1.5–2 saat** ayırın',
      'En iyi kale fotoğrafı: **Toyokuni Tapınağı yakınında doğu tarafı** veya **Nishinomaru Bahçesi**',
      'Öğle yemeği için **Kuromon Pazarı** ile birleştirin (15 dk güneyde metro)',
    ],
  },
};

export default guide;
