import type { AttractionGuide } from './types';

const guide: AttractionGuide = {
  slug: 'tokyo-gov-building',
  gallery: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Tokyo_Metropolitan_Government_Building_2024.jpg/1280px-Tokyo_Metropolitan_Government_Building_2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/2024_Tokyo_Metropolitan_Government_Building_No.1.jpg/1280px-2024_Tokyo_Metropolitan_Government_Building_No.1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Tokyo_Metropolitan_Government_Building_No.2_2009.jpg/1280px-Tokyo_Metropolitan_Government_Building_No.2_2009.jpg',
  ],
  sources: [
    { name: 'Tokyo Metropolitan Government', url: 'https://www.yokoso.metro.tokyo.lg.jp/eng/' },
  ],
  en: {
    intro:
      'The **243-meter twin-tower city hall** of Tokyo, with **two free public observation decks on the 45th floor** (about 202m up). Built in **1991**, designed by Kenzō Tange to look like a Gothic cathedral. The decks are **free**, open late, and on a clear day you can see **Mt. Fuji** to the southwest.',
    highlights: [
      '**Free 45F observation deck** — both North and South Towers',
      '**Mt. Fuji** visible on clear winter mornings (Nov–Feb best)',
      '**Open until 22:00** in the South Tower — Tokyo at night',
      '**Projection mapping show** on the building exterior every night (~19:00 onward)',
      'A **café and gift shop** at the top — not overpriced for an observation deck',
      'No timed entry, no queue most weekdays',
    ],
    sections: [
      {
        title: 'North or South Tower?',
        body:
          'Both decks are at the same height, but:\n\n- **North Tower** closes at **17:30**, daytime views, faces toward Shinjuku skyline\n- **South Tower** closes at **22:00**, **the better one for night views**, faces toward Mt. Fuji direction\n\nMost visitors go **South Tower at dusk**: arrive ~17:30, see daylight, watch sunset, then night skyline — all from one spot.',
      },
      {
        title: 'The projection mapping show',
        body:
          'Every night the building\'s façade hosts a free **projection-mapping show** — a 12-minute animated piece by changing artists (recently Godzilla, Hokusai, anime tie-ins). Shows start ~19:00, run every 20–30 min until 21:30. Best viewing spot: the plaza in front of the South Tower.',
      },
    ],
    tips: [
      '**Free**, no ticket needed',
      'North Tower: **09:30–17:30**, South Tower: **09:30–22:00**',
      '**Closed days**: 1st & 3rd Tue (N), 1st & 3rd Mon (S), Dec 29–Jan 3',
      'Best **Mt. Fuji visibility**: clear winter mornings (Nov–Feb)',
      '**No tripods** at the windows, **no flash** photography',
      'Closest station: **Tochōmae** (Ōedo line) — direct underground access',
      'Or **Shinjuku Station** west exit, then 10 min walk through skyscrapers',
    ],
  },
  tr: {
    intro:
      'Tokyo\'nun **243 metrelik ikiz kuleli belediye binası**, **45. katta iki ücretsiz halka açık gözlem terası** (yaklaşık 202m yüksekte). **1991**\'de inşa edildi, Kenzō Tange tarafından bir Gotik katedrali andıracak şekilde tasarlandı. Teraslar **ücretsiz**, geç saate kadar açık ve havanın iyi olduğu bir günde güneybatıda **Fuji Dağı**\'nı görebilirsiniz.',
    highlights: [
      '**Ücretsiz 45. kat gözlem terası** — hem Kuzey hem Güney Kule',
      'Açık kış sabahlarında görünen **Fuji Dağı** (en iyisi Kas-Şub)',
      'Güney Kule\'de **22:00\'a kadar açık** — gece Tokyo',
      'Her gece bina dışında **projeksiyon mapping şovu** (~19:00\'dan itibaren)',
      'Tepede bir **kafe ve hediye dükkanı** — gözlem terası için aşırı pahalı değil',
      'Çoğu hafta içi: zaman damgalı giriş yok, kuyruk yok',
    ],
    sections: [
      {
        title: 'Kuzey mi Güney mi?',
        body:
          'İki teras da aynı yükseklikte, ama:\n\n- **Kuzey Kule** **17:30**\'da kapanır, gündüz manzaraları, Shinjuku silüetine bakar\n- **Güney Kule** **22:00**\'da kapanır, **gece manzaraları için daha iyisi**, Fuji Dağı yönüne bakar\n\nÇoğu ziyaretçi alacakaranlıkta **Güney Kule**\'ye gider: ~17:30 varış, gün ışığı, gün batımı izlemek, sonra gece silüeti — hepsi tek noktadan.',
      },
      {
        title: 'Projeksiyon mapping şovu',
        body:
          'Her gece binanın cephesinde ücretsiz **projeksiyon mapping şovu** var — sanatçısı değişen 12 dakikalık animasyon parçası (yakın zamanda Godzilla, Hokusai, anime iş birlikleri). Şovlar ~19:00\'da başlar, 21:30\'a kadar her 20–30 dk\'da bir tekrarlanır. En iyi izleme noktası: Güney Kule\'nin önündeki plaza.',
      },
    ],
    tips: [
      '**Ücretsiz**, bilet gerekmez',
      'Kuzey Kule: **09:30–17:30**, Güney Kule: **09:30–22:00**',
      '**Kapalı günler**: 1. ve 3. Salı (K), 1. ve 3. Pzt (G), 29 Ara–3 Oca',
      'En iyi **Fuji Dağı görünürlüğü**: açık kış sabahları (Kas–Şub)',
      'Camlarda **tripod yok**, **flaşlı fotoğraf yok**',
      'En yakın istasyon: **Tochōmae** (Ōedo hattı) — direkt yer altı erişimi',
      'Veya **Shinjuku İstasyonu** batı çıkışı, sonra gökdelenler arasında 10 dk yürüyüş',
    ],
  },
};

export default guide;
