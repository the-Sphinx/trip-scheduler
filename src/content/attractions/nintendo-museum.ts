import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'nintendo-museum',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nintendo_Museum_Entrance.jpg/1280px-Nintendo_Museum_Entrance.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Headquarters_of_Nintendo_Co.%2C_Ltd.jpg/1280px-Headquarters_of_Nintendo_Co.%2C_Ltd.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nintendo_1889.jpg/1280px-Nintendo_1889.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/NintendoCards.jpg/1280px-NintendoCards.jpg',
  ],
  sources: [
    { name: 'Nintendo Museum (official)', url: 'https://museum.nintendo.com/' },
  ],
  en: {
    intro:
      'Opened in **October 2024** in a renovated Nintendo Uji factory, this is the company\'s **official museum** — a hands-on, interactive tour of **135 years of toys, cards and consoles**. From hanafuda playing cards (1889) to every Nintendo console ever made, plus giant playable versions of classic games. **Advance tickets only**, allocated by lottery.',
    highlights: [
      '**135 years of Nintendo** in one place — even pre-video-game toys',
      'Play **giant versions** of the original Famicom and Game Boy',
      'See **every console ever**, including unreleased prototypes',
      'Make **your own hanafuda card** at the workshop downstairs (¥2,200)',
      'Exclusive **gift shop merch** not sold anywhere else',
      'Eat at the **Hatena Burger** café (build-your-own meal-as-a-game)',
    ],
    sections: [
      {
        title: 'How tickets work',
        body:
          'Tickets are **lottery-only**, with **monthly draws ~3 months in advance**. You apply via the official website, pick a time slot, and learn if you\'re selected. **No walk-ins**, no day-of tickets. If selected, the actual ticket arrives by email a week before.\n\nPrices: **Adult ¥3,300 · Youth ¥2,200 · Child ¥1,100**, fixed entry time, ~**3-hour visit** expected.',
      },
      {
        title: 'What\'s inside',
        body:
          'Two floors: the **upper floor** is the chronological history museum (no photography in most areas), the **lower floor** is hands-on play with oversized versions of classic Nintendo games. The play uses **special coins** included in your ticket — you spend them to play each activity.\n\nThe **shop and burger café** are accessible **without a ticket** during operating hours (separate queue), but lines can be long.',
      },
    ],
    tips: [
      'Hours: **10:00–18:00**, **closed Tuesdays**',
      'Tickets: **lottery only**, apply at **museum.nintendo.com**',
      'Visit takes ~**3 hours**; arrive 15 min before your slot',
      '**Most exhibits = no photography** (the play zone allows it)',
      'Shop has **museum-exclusive merch** — bring extra luggage room',
      '**Hatena Burger** café accepts walk-ins but expect a wait',
      'Closest station: **Ogura** on the Keihan line (5 min walk)',
      'Combine with **Byōdō-in / Tea Street** for a full Uji day',
    ],
  },
  tr: {
    intro:
      '**Ekim 2024**\'te yenilenmiş bir Nintendo Uji fabrikasında açılan bu yer, şirketin **resmi müzesi** — **135 yıllık oyuncak, kart ve konsolların** uygulamalı, interaktif turu. Hanafuda oyun kartlarından (1889) yapılan her Nintendo konsoluna, artı klasik oyunların oynanabilir dev versiyonları. **Önceden bilet zorunlu**, kura ile dağıtılıyor.',
    highlights: [
      '**135 yıllık Nintendo** tek yerde — video oyunu öncesi oyuncaklar dahil',
      'Orijinal Famicom ve Game Boy\'un **dev versiyonlarını** oynayın',
      'Yayınlanmamış prototipler dahil **şimdiye kadarki her konsolu** görün',
      'Alt kattaki atölyede **kendi hanafuda kartınızı** yapın (¥2.200)',
      'Başka yerde satılmayan **özel hediye dükkanı ürünleri**',
      '**Hatena Burger** kafesinde (yapayım-yiyim-oyun) yemek',
    ],
    sections: [
      {
        title: 'Biletler nasıl çalışır',
        body:
          'Biletler **yalnızca kura** ile, **3 ay önceden aylık çekilişlerle**. Resmi siteden başvurursunuz, zaman dilimi seçersiniz ve seçilip seçilmediğinizi öğrenirsiniz. **Yürüyüş içeri yok**, gün biletleri yok. Seçildiyseniz gerçek bilet bir hafta önce e-posta ile gelir.\n\nFiyatlar: **Yetişkin ¥3.300 · Genç ¥2.200 · Çocuk ¥1.100**, sabit giriş saati, ~**3 saatlik** ziyaret beklentisi.',
      },
      {
        title: 'İçeride ne var',
        body:
          'İki kat: **üst kat** kronolojik tarih müzesi (çoğu alanda fotoğraf yasak), **alt kat** klasik Nintendo oyunlarının büyük versiyonlarıyla uygulamalı oyun. Oyunda biletinize dahil **özel jetonlar** kullanırsınız — her etkinlikte harcarsınız.\n\n**Dükkan ve burger kafesi** çalışma saatlerinde **biletsiz** erişilebilir (ayrı kuyruk), ama kuyruklar uzun olabilir.',
      },
    ],
    tips: [
      'Saatler: **10:00–18:00**, **Salı kapalı**',
      'Biletler: yalnızca **kura**, **museum.nintendo.com**\'dan başvurun',
      'Ziyaret ~**3 saat**; saatinizden 15 dk önce gidin',
      '**Çoğu sergide fotoğraf yasak** (oyun bölgesinde izin var)',
      'Dükkanda **müzeye özel ürünler** — bavulda yer ayırın',
      '**Hatena Burger** kafesi sıraya kabul eder ama beklemeye hazır olun',
      'En yakın istasyon: **Ogura**, Keihan hattı (5 dk yürüyüş)',
      'Tam bir Uji günü için **Byōdō-in / Tea Street** ile birleştirin',
    ],
  },
};

export default guide;
