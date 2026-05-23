import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'fushimi-inari',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/1280px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Nobu3withfoxy_IMG_0155_%2814564801685%29.jpg/1280px-Nobu3withfoxy_IMG_0155_%2814564801685%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Fushimi-Inari-Shrine-Senbon-Torii-2018-Luka-Peternel.jpg/1280px-Fushimi-Inari-Shrine-Senbon-Torii-2018-Luka-Peternel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg/1280px-Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg',
  ],
  sources: [
    { name: 'Fushimi Inari Taisha (official, EN)', url: 'https://inari.jp/en/' },
    { name: 'JNTO', url: 'https://www.japan.travel/en/spot/1161/' },
  ],
  en: {
    intro:
      'The head shrine of Inari — deity of rice, sake and prosperity — but you come for the **torii**. Roughly **10,000 vermillion gates** form glowing tunnels that wind up the wooded slopes of **Mount Inari (233m)**. Free, open 24 hours, best very early morning or after dark when the crowds thin.',
    highlights: [
      '**Senbon Torii**: the dense double-row tunnel just past the main shrine',
      '**Kitsune (fox) statues** — messengers of Inari, often holding a *key* or *rice sheaf*',
      'The full hike to the summit: ~2 hours round trip, viewpoint of Kyoto halfway up',
      '**Yotsutsuji intersection**: the panoramic stop most day-trippers turn back at',
      'Tiny sub-shrines wrapped in red bibs along the climb — each donated by a family or business',
      '**Fox-face ema** (wish plaques) — one of the best souvenirs in Kyoto',
    ],
    sections: [
      {
        title: 'A bit of history',
        body:
          'Founded in **711 AD** — making it one of Japan\'s oldest shrines, predating Kyoto itself by 83 years. Fushimi Inari is the head of about **30,000 Inari shrines** across Japan.\n\nThe torii gates were donated by individuals and businesses praying for success in commerce; the names of donors and dates are inked on the back of each gate. The custom is still going strong: large gates cost **over ¥1,000,000**, smaller ones start around **¥175,000**. You\'ll see new gates being raised next to weathered century-old ones.',
      },
      {
        title: 'How far should I go?',
        body:
          'You don\'t need to summit to "see" Fushimi Inari. The dense **Senbon Torii** section near the bottom is the famous view and takes 15–20 minutes to walk through.\n\nTo reach **Yotsutsuji** (the viewpoint with the Kyoto panorama) takes another 30–40 minutes uphill. From there, the full summit loop is about another hour. The path is paved but steep in places — proper shoes help, especially in rain.\n\nThe gates thin out higher up and the atmosphere becomes more mountain-shrine than tourist-attraction. If you have time and energy, the top half is where the *real* Fushimi Inari lives.',
      },
      {
        title: 'Foxes everywhere — why?',
        body:
          'The fox (**kitsune**) is Inari\'s sacred messenger. You\'ll see hundreds of them, in stone, ceramic and wood, often holding a key in their mouth (the key to the rice granary) or a golden ball (a wish-fulfilling jewel). The fox has long been associated with rice farmers — they ate field mice that threatened the crops.',
      },
    ],
    tips: [
      'Arrive by **07:00** for empty torii photos — by 09:00 it\'s very busy',
      'Or come after 19:00 for a quieter, lantern-lit climb (paths are dimly lit)',
      'Free entry, no closing time',
      'Bring water — vending machines exist on the trail but at *temple prices* (¥200+)',
      'It\'s a working shrine: clap twice, bow once at the main hall if you wish',
      'Don\'t miss the **fox-face ema** — paint your own face on it for ¥800',
      'Skip the food stalls outside the main gate — overpriced; eat in Kyoto proper',
    ],
  },
  tr: {
    intro:
      'Pirinç, sake ve refah tanrısı Inari\'nin ana tapınağı — ama buraya **toriiler** için gelinir. **Inari Dağı (233m)** yamaçlarında ormanlık alanı saran yaklaşık **10.000 kırmızı kapı** ışıltılı tüneller oluşturur. Ücretsiz, 24 saat açık, en iyi zaman sabah çok erken veya akşam geç saatler.',
    highlights: [
      '**Senbon Torii**: ana tapınağın hemen ardındaki yoğun çift sıra tünel',
      '**Kitsune (tilki) heykelleri** — Inari\'nin habercileri, çoğunlukla *anahtar* veya *pirinç demeti* tutar',
      'Zirveye kadar tam yürüyüş: ~2 saat gidiş-dönüş, yarı yolda Kyoto manzarası',
      '**Yotsutsuji kavşağı**: günlük ziyaretçilerin çoğu burada geri döner',
      'Yol boyunca kırmızı önlüklü küçük tapınakçıklar — her biri bir aile veya işletme tarafından bağışlanmış',
      '**Tilki yüzlü ema** dilek tabelaları — Kyoto\'nun en güzel hediyeliklerinden',
    ],
    sections: [
      {
        title: 'Kısa tarihçe',
        body:
          '**MS 711** yılında kurulmuş — Kyoto\'dan bile 83 yıl daha eski olan Japonya\'nın en eski tapınaklarından. Fushimi Inari, Japonya genelindeki yaklaşık **30.000 Inari tapınağının** başıdır.\n\nTorii kapıları, ticarette başarı için dua eden kişiler ve işletmeler tarafından bağışlandı; her kapının arkasında bağışçının adı ve tarihi yazılıdır. Gelenek hâlâ canlı: büyük kapılar **¥1.000.000\'dan** fazlaya mal olur, küçükleri **¥175.000\'den** başlar. Yüzyıllık eski kapıların yanına yenisinin dikildiğini görebilirsiniz.',
      },
      {
        title: 'Ne kadar yürümeliyim?',
        body:
          'Fushimi Inari\'yi "görmek" için zirveye çıkmanıza gerek yok. Aşağıdaki yoğun **Senbon Torii** bölümü ünlü manzarayı sunar, 15–20 dakikada geçilir.\n\n**Yotsutsuji**\'ye (Kyoto manzaralı bakış noktası) çıkmak yokuş yukarı 30–40 dakika daha alır. Oradan tam zirve turu yaklaşık bir saat daha. Yol kaplı ama yer yer dik — rahat ayakkabı önemli, özellikle yağışlı havada.\n\nYukarıya çıktıkça kapılar seyrekleşir, ortam turistik bir mekândan çok *gerçek bir dağ tapınağına* dönüşür. Vakit ve enerjiniz varsa, asıl Fushimi Inari yukarıdadır.',
      },
      {
        title: 'Neden bu kadar tilki var?',
        body:
          'Tilki (**kitsune**), Inari\'nin kutsal habercisidir. Yüzlercesini taş, seramik ve ahşaptan göreceksiniz; çoğunlukla ağzında anahtar (pirinç ambarının anahtarı) veya altın bir top (dilek tutan mücevher) tutarlar. Tilki uzun zamandır pirinç çiftçileriyle özdeşleşmiştir — ekinleri tehdit eden tarla farelerini yedikleri için.',
      },
    ],
    tips: [
      'Boş torii fotoğrafları için **07:00**\'da varın — 09:00\'da çok kalabalık olur',
      'Veya 19:00\'dan sonra gelin, daha sakin ve fenerle aydınlatılmış yürüyüş (yollar loş)',
      'Ücretsiz giriş, kapanış saati yok',
      'Su getirin — patikada otomatlar var ama *tapınak fiyatlarıyla* (¥200+)',
      'Aktif bir tapınak: ana salonda iki kez alkışlayın, bir kez eğilin',
      '**Tilki yüzlü ema**\'yı kaçırmayın — kendi yüzünüzü çizebilirsiniz (¥800)',
      'Ana kapının dışındaki yiyecek tezgahlarını geçin — pahalı; asıl Kyoto\'da yiyin',
    ],
  },
};

export default guide;
