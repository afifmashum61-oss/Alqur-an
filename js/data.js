// Data Store: Media Pembelajaran Interaktif Al-Qur'an Hadits MTs (KMA 183 Tahun 2019)
// Dilengkapi Referensi Murottal Syaikh Misyari Rasyid Al-Afasy (Mishary Rashid Alafasy)

const APP_DATA = {
  // Profil Qari Utama
  activeReciter: {
    id: "alafasy",
    name: "Syaikh Misyari Rasyid Al-Afasy",
    title: "Qari Internasional (Kuwait)",
    avatar: "🎙️"
  },

  // 1. Peta Kurikulum KMA No. 183 Tahun 2019
  curriculum: {
    title: "Peta Kompetensi Inti & Kompetensi Dasar (KMA No. 183 Tahun 2019)",
    subject: "Al-Qur'an Hadits Madrasah Tsanawiyah (MTs)",
    levels: [
      {
        grade: "Kelas VII",
        semesters: [
          {
            semester: "Semester Ganjil",
            ki: [
              "KI-1: Menghargai dan menghayati ajaran agama Islam.",
              "KI-2: Menunjukkan perilaku jujur, disiplin, santun, percaya diri, peduli, dan bertanggung jawab.",
              "KI-3: Memahami pengetahuan faktual, konseptual, dan prosedural dalam ilmu Al-Qur'an Hadits.",
              "KI-4: Mencoba, mengolah, dan menyaji dalam ranah konkret dan abstrak."
            ],
            kd: [
              "KD 1.1: Menerima Al-Qur'an dan hadits sebagai pedoman hidup.",
              "KD 3.1: Memahami kedudukan dan fungsi Al-Qur'an dan hadits dalam kehidupan.",
              "KD 3.2: Memahami ketentuan hukum bacaan Mad Thabi'i agar terbiasa membaca Al-Qur'an dengan benar.",
              "KD 4.1: Mendemonstrasikan pelafalan hukum bacaan Mad Thabi'i sesuai makharijul huruf."
            ]
          },
          {
            semester: "Semester Genap",
            kd: [
              "KD 3.3: Memahami isi kandungan QS. Asy-Syams (91) dan QS. Al-Lail (92) tentang sifat murah hati.",
              "KD 3.4: Menganalisis keterkaitan etos berbagi dengan keberkahan rezeki.",
              "KD 4.2: Membaca dan menghafal matan hadits tentang keutamaan sedekah."
            ]
          }
        ]
      },
      {
        grade: "Kelas VIII",
        semesters: [
          {
            semester: "Semester Ganjil",
            ki: [
              "KI-1: Menghayati nilai-nilai keagamaan melalui pembiasaan tilawah dan pemahaman hadits.",
              "KI-2: Menumbuhkan integritas pribadi, empati sosial, dan etos kerja Islami.",
              "KI-3: Menganalisis kaidah ilmu tajwid dan kandungan ayat-hadits secara kritis (HOTS).",
              "KI-4: Mengembangkan keterampilan membaca tartil dan memecahkan dilema moral kontekstual."
            ],
            kd: [
              "KD 3.1: Memahami hukum bacaan Mad 'Iwadh, Mad Layyin, dan Mad 'Aridh Lissukun dalam Al-Qur'an.",
              "KD 4.1: Mempraktikkan bacaan Mad 'Iwadh, Mad Layyin, dan Mad 'Aridh Lissukun dengan ketukan yang tepat.",
              "KD 3.2: Menganalisis isi kandungan QS. Al-Fajr: 15-18 tentang ujian kelapangan dan kesempitan rezeki.",
              "KD 4.2: Mensimulasikan sikap adil dan dermawan dalam kehidupan sosial remaja madrasah."
            ]
          },
          {
            semester: "Semester Genap",
            kd: [
              "KD 3.3: Menganalisis isi kandungan QS. Al-Baqarah: 254 dan 261 tentang menyegerakan infak di jalan Allah.",
              "KD 3.4: Memahami hadits riwayat Bukhari Muslim dari Abdullah bin Umar tentang keutamaan 'Tangan di Atas' (tangan yang memberi lebih mulia daripada tangan yang meminta).",
              "KD 4.3: Menampilkan karakter mandiri, produktif, dan menjauhi mental meminta-minta."
            ]
          }
        ]
      },
      {
        grade: "Kelas IX",
        semesters: [
          {
            semester: "Semester Ganjil & Genap",
            ki: [
              "KI-3: Memahami kaidah bacaan Gharib dalam Al-Qur'an riwayat Imam Ashim jalur Hafs.",
              "KI-4: Melafalkan bacaan-bacaan Gharib secara fasih sesuai kaidah talaqqi."
            ],
            kd: [
              "KD 3.1: Memahami macam-macam bacaan Gharib (Imalah, Isymam, Tashil, Naql, dan Saktah).",
              "KD 4.1: Mempraktikkan bacaan Imalah pada QS. Hud: 41, Isymam pada QS. Yusuf: 11, Tashil pada QS. Fussilat: 44, Naql pada QS. Al-Hujurat: 11, dan 4 titik Saktah.",
              "KD 3.2: Menganalisis hadits tentang menuntut ilmu, etos integritas, dan kelestarian alam."
            ]
          }
        ]
      }
    ]
  },

  // 2. Data Lab Tajwid & Gharib
  tajwid: {
    mad: [
      {
        id: "mad_iwadh_1",
        title: "Mad 'Iwadh",
        subtitle: "QS. An-Naba: 6–7",
        hukumKey: "iwadh",
        hukumName: "Mad 'Iwadh",
        surah: 78,
        ayahs: [
          { surah: 78, ayah: 6 },
          { surah: 78, ayah: 7 }
        ],
        surahName: "QS. An-Naba'",
        ayahRange: "Ayat 6–7",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        ketukan: 2,
        beatsText: "2 Harakat (1 Alif)",
        ruleGuide: "Mad 'Iwadh terjadi saat fathan/tanwin fathah berada di akhir kata dan diwaqafkan (berhenti). Tanwin diganti menjadi mad berharakat fathah panjang 2 ketukan.",
        mission: "Klik kata yang mengandung hukum bacaan Mad 'Iwadh pada akhir ayat!",
        verseTokens: [
          { word: "أَلَمْ", isTarget: false, reason: "Bukan akhir ayat dan tidak bertanwin fathah" },
          { word: "نَجْعَلِ", isTarget: false, reason: "Kata kerja berharakat kasrah" },
          { word: "الْأَرْضَ", isTarget: false, reason: "Hukum Al-Qamariyah, fathah biasa" },
          { word: "مِهَٰدًا", isTarget: true, reason: "Mad 'Iwadh: huruf dal bertanwin fathah (دًا) di akhir waqaf, dibaca 'Mihadaa' (2 harakat)" },
          { word: "وَالْجِبَالَ", isTarget: false, reason: "Hukum Al-Qamariyah dan Mad Thabi'i" },
          { word: "أَوْتَادًا", isTarget: true, reason: "Mad 'Iwadh: tanwin fathah pada huruf dal (دًا) di akhir waqaf, dibaca 'Awtaadaa' (2 harakat)" }
        ],
        fullArabic: "أَلَمْ نَجْعَلِ الْأَرْضَ مِهَٰدًا ۝ وَالْجِبَالَ أَوْتَادًا",
        translation: "Bukankah Kami telah menjadikan bumi sebagai hamparan, dan gunung-gunung sebagai pasak?",
        audioPhonetic: "Alam naj'alil ardha mihaadaa, wal jibaala awtaadaa"
      },
      {
        id: "mad_layyin_1",
        title: "Mad Layyin",
        subtitle: "QS. Quraisy: 1–4",
        hukumKey: "layyin",
        hukumName: "Mad Layyin (Lin)",
        surah: 106,
        ayahs: [
          { surah: 106, ayah: 1 },
          { surah: 106, ayah: 2 },
          { surah: 106, ayah: 3 },
          { surah: 106, ayah: 4 }
        ],
        surahName: "QS. Quraisy",
        ayahRange: "Ayat 1–4",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        ketukan: 4,
        beatsText: "2, 4, atau 6 Harakat (Utama 4 Ketukan)",
        ruleGuide: "Mad Layyin terjadi bila huruf Wawu sukun (وْ) atau Ya' sukun (يْ) didahului harakat fathah, dan berada sebelum huruf hidup yang disukunkan karena waqaf.",
        mission: "Klik kata yang mengandung hukum bacaan Mad Layyin!",
        verseTokens: [
          { word: "لِإِيلَافِ", isTarget: false, reason: "Mad Badal dan Mad Thabi'i" },
          { word: "قُرَيْشٍ", isTarget: true, reason: "Mad Layyin: Ya' sukun didahului huruf ro' berharakat fathah (رَيْ), lalu huruf syin disukunkan saat waqaf" },
          { word: "وَآمَنَهُم", isTarget: false, reason: "Mad Badal dan Idzhar Syafawi" },
          { word: "مِّنْ", isTarget: false, reason: "Idgham Mimi / Ghunnah" },
          { word: "خَوْفٍ", isTarget: true, reason: "Mad Layyin: Wawu sukun didahului kho' berharakat fathah (خَوْ), diwaqafkan pada fa'" }
        ],
        fullArabic: "لِإِيلَافِ قُرَيْشٍ ۝ ... وَآمَنَهُم مِّنْ خَوْفٍ",
        translation: "Karena kebiasaan orang-orang Quraisy... dan mengamankan mereka dari rasa ketakutan.",
        audioPhonetic: "Li'iilaafi quraisy... Wa aamanahum min khauf"
      },
      {
        id: "mad_aridh_1",
        title: "Mad 'Aridh Lissukun",
        subtitle: "QS. Al-Fatihah: 2 & QS. Al-Baqarah: 3",
        hukumKey: "aridh",
        hukumName: "Mad 'Aridh Lissukun",
        surah: 1,
        ayahs: [
          { surah: 1, ayah: 2 },
          { surah: 2, ayah: 3 }
        ],
        surahName: "QS. Al-Fatihah & Al-Baqarah",
        ayahRange: "Al-Fatihah: 2 & Al-Baqarah: 3",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        ketukan: 6,
        beatsText: "2, 4, atau 6 Harakat (Tawasuth 4 / Thul 6)",
        ruleGuide: "Mad 'Aridh Lissukun terjadi apabila Mad Thabi'i (Alif, Wawu, Ya') bertemu huruf berharakat di akhir kalimat yang diwaqafkan (disukunkan karena henti).",
        mission: "Klik kata yang mengandung hukum Mad 'Aridh Lissukun!",
        verseTokens: [
          { word: "الْحَمْدُ", isTarget: false, reason: "Hukum Al-Qamariyah dan Idzhar Syafawi" },
          { word: "لِلَّهِ", isTarget: false, reason: "Lam Jalalah Tarqiq" },
          { word: "رَبِّ", isTarget: false, reason: "Huruf berharakat biasa bertasydid" },
          { word: "الْعَالَمِينَ", isTarget: true, reason: "Mad 'Aridh Lissukun: Ya' mad bertemu huruf nun hidup di akhir ayat yang diwaqafkan (dibaca 2, 4, atau 6 harakat)" },
          { word: "يُنفِقُونَ", isTarget: true, reason: "Mad 'Aridh Lissukun: Wawu mad bertemu nun hidup di akhir waqaf ayat" }
        ],
        fullArabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
        translation: "Segala puji bagi Allah, Tuhan semesta alam... dan sebagian rezeki yang Kami anugerahkan, mereka infakkan.",
        audioPhonetic: "Alhamdulillahi rabbil 'aalamiin... Wa mimmaa razaqnaahum yunfiquun"
      }
    ],

    gharib: [
      {
        id: "imalah_1",
        title: "Imalah (إِمَالَة)",
        surah: 11,
        ayahs: [{ surah: 11, ayah: 41 }],
        surahName: "QS. Hud",
        ayahRange: "Ayat 41",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        type: "imalah",
        hukumName: "Imalah Kubra",
        ketukan: 2,
        beatsText: "2 Harakat (Bunyi Vokal 'e')",
        ruleGuide: "Imalah menurut bahasa artinya memiringkan/mencondongkan. Menurut istilah: mencondongkan bunyi fathah ke arah kasrah, atau bunyi alif ke arah ya' (terdengar seperti huruf 'e' pada kata 'sate' atau 'ember'). Dalam qira'ah Imam Ashim riwayat Hafs hanya ada 1 tempat, yaitu QS. Hud ayat 41.",
        mouthGuide: "Posisi mulut semi-terbuka: bukan 'A' bulat dan bukan 'I' senyum rapat, melainkan vokal 'e' sedang yang halus.",
        mission: "Klik lafadz yang WAJIB dibaca dengan hukum Imalah!",
        verseTokens: [
          { word: "وَقَالَ", isTarget: false, reason: "Mad Thabi'i biasa" },
          { word: "ارْكَبُوا", isTarget: false, reason: "Hamzah washol & Mad Thabi'i" },
          { word: "فِيهَا", isTarget: false, reason: "Mad Thabi'i" },
          { word: "بِسْمِ", isTarget: false, reason: "Kasrah biasa" },
          { word: "اللَّهِ", isTarget: false, reason: "Lam Jalalah Tarqiq" },
          { word: "مَجْرَىٰهَا", isTarget: true, reason: "IMALAH KUBRA: Huruf ro' dibaca 'Maj-ree-haa' (mencondongkan bunyi ra ke re seperti pada kata 'sate') dengan tanda wajik/elips." },
          { word: "وَمُرْسَاهَا", isTarget: false, reason: "Mad Thabi'i biasa tanpa imalah" }
        ],
        fullArabic: "وَقَالَ ارْكَبُوا فِيهَا بِسْمِ اللَّهِ مَجْرَىٰهَا وَمُرْسَاهَا ۚ إِنَّ رَبِّي لَغَفُورٌ رَّحِيمٌ",
        targetLafadz: "مَجْرَىٰهَا (Majreehaa)",
        translation: "Dan dia berkata: 'Naiklah kamu semua ke dalamnya dengan (menyebut) nama Allah pada waktu berlayar dan berlabuhnya.' Sesungguhnya Tuhanku Maha Pengampun, Maha Penyayang.",
        audioPhonetic: "Wa qaalar kabuu fiihaa bismillaahi majreehaa wa mursaahaa"
      },
      {
        id: "isymam_1",
        title: "Isymam (إِشْمَام)",
        surah: 12,
        ayahs: [{ surah: 12, ayah: 11 }],
        surahName: "QS. Yusuf",
        ayahRange: "Ayat 11",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        type: "isymam",
        hukumName: "Isymam",
        ketukan: 2,
        beatsText: "Gerakan Bibir saat Ghunnah",
        ruleGuide: "Isymam adalah memonyongkan (mencucukan) kedua bibir ke depan tanpa mengeluarkan suara dhommah sesaat setelah mensukunkan huruf mim bertasydid (pada saat mendengung/ghunnah). Gerakan bibir ini sebagai isyarat visual bahwa bentuk asal kata adalah 'laa ta'manuna' (ada dhommah yang diidghamkan).",
        mouthGuide: "Visual Posisi Bibir: Saat melafalkan 'ta'man...', kedua bibir langsung dicucukan/dimonyongkan ke depan ke arah huruf 'O/U' tanpa mengeluarkan suara dhommah, lalu ditarik kembali saat membuka na.",
        mission: "Klik lafadz yang mengandung hukum Isymam pada kisah Nabi Yusuf!",
        verseTokens: [
          { word: "قَالُوا", isTarget: false, reason: "Mad Thabi'i" },
          { word: "يَا أَبَانَا", isTarget: false, reason: "Mad Jaiz Munfashil" },
          { word: "مَا لَكَ", isTarget: false, reason: "Mad Thabi'i" },
          { word: "لَا تَأْمَنَّا", isTarget: true, reason: "ISYMAM: Asal katanya 'laa ta'manuna'. Kedua bibir dimonyongkan ke depan tanpa suara di sela ghunnah huruf nun bertasydid." },
          { word: "عَلَىٰ", isTarget: false, reason: "Mad Thabi'i" },
          { word: "يُوسُفَ", isTarget: false, reason: "Mad Thabi'i" }
        ],
        fullArabic: "قَالُوا يَا أَبَانَا مَا لَكَ لَا تَأْمَنَّا عَلَىٰ يُوسُفَ وَإِنَّا لَهُ لَنَاصِحُونَ",
        targetLafadz: "لَا تَأْمَنَّا",
        translation: "Mereka berkata: 'Wahai ayah kami, apa sebabnya engkau tidak mempercayai kami terhadap Yusuf, padahal sesungguhnya kami tulus menginginkan kebaikan baginya.'",
        audioPhonetic: "Qooluu yaa abaanaa maa laka laa ta'manna 'alaa yuusuf"
      },
      {
        id: "tashil_1",
        title: "Tashil (تَسْهِيل)",
        surah: 41,
        ayahs: [{ surah: 41, ayah: 44 }],
        surahName: "QS. Fussilat",
        ayahRange: "Ayat 44",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        type: "tashil",
        hukumName: "Tashil",
        ketukan: 2,
        beatsText: "Alif Lembut Antara Hamzah & Alif",
        ruleGuide: "Tashil secara bahasa berarti memberi kemudahan atau meringankan. Menurut istilah tajwid: membaca hamzah kedua dengan suara samar antara hamzah qath'i (tahqiq) dan huruf alif mad, tanpa diseret dan tidak berlebihan.",
        mouthGuide: "Pita suara melemas saat hamzah kedua: 'Aa'ajjamiyy' - hamzah pertama tegas 'A', hamzah kedua meluncur lembut tanpa sentakan tenggorokan.",
        mission: "Klik lafadz yang dibaca dengan cara Tashil!",
        verseTokens: [
          { word: "وَلَوْ", isTarget: false, reason: "Huruf lin biasa" },
          { word: "جَعَلْنَاهُ", isTarget: false, reason: "Mad Thabi'i" },
          { word: "قُرْآنًا", isTarget: false, reason: "Mad Badal & tanwin" },
          { word: "ءَ۬اعْجَمِيٌّ", isTarget: true, reason: "TASHIL: Hamzah pertama tahqiq jelas, hamzah kedua dibaca tashil (meringankan hamzah di antara bunyi 'a' dan alif mad lembut)." },
          { word: "وَعَرَبِيٌّ", isTarget: false, reason: "Idgham bighunnah" }
        ],
        fullArabic: "وَلَوْ جَعَلْنَاهُ قُرْآنًا أَعْجَمِيًّا لَّقَالُوا لَوْلَا فُصِّلَتْ آيَاتُهُ ۖ ءَ۬اعْجَمِيٌّ وَعَرَبِيٌّ",
        targetLafadz: "ءَ۬اعْجَمِيٌّ (Aa'jamiyyun)",
        translation: "Dan sekiranya Al-Qur'an Kami jadikan berbahasa asing, tentulah mereka berkata: 'Mengapa tidak dijelaskan ayat-ayatnya? Apakah patut (Al-Qur'an) berbahasa asing sedang rasul orang Arab?'",
        audioPhonetic: "Walaw ja'alnaahu qur-aanan a'jamiyyan... A-a'jamiyyuw wa 'arabiyy"
      },
      {
        id: "naql_1",
        title: "Naql (نَقْل)",
        surah: 49,
        ayahs: [{ surah: 49, ayah: 11 }],
        surahName: "QS. Al-Hujurat",
        ayahRange: "Ayat 11",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        type: "naql",
        hukumName: "Naql",
        ketukan: 2,
        beatsText: "Pindah Harakat (Bi'salismu)",
        ruleGuide: "Naql berarti memindahkan. Dalam istilah tajwid: memindahkan harakat kasrah dari hamzah washol pada kata 'Al-Ismu' ke huruf mati sebelumnya yaitu Lam sukun, sehingga hamzah tidak lagi dibaca dan dibaca menjadi 'Bi'sa-lismu'.",
        mouthGuide: "Sambungan langsung: dari huruf Sin berharakat fathah (sa) langsung mengalir ke Lam berharakat kasrah (li) -> 'Bi'sa lis-mu'.",
        mission: "Klik lafadz yang mengalami pemindahan harakat (Naql)!",
        verseTokens: [
          { word: "بِئْسَ", isTarget: false, reason: "Lafadz kata kerja celaan" },
          { word: "الاِسْمُ", isTarget: true, reason: "NAQL: Harakat kasrah hamzah dipindah ke huruf lam sukun sehingga dilafalkan 'Bi'salismu'." },
          { word: "الْفُسُوقُ", isTarget: false, reason: "Al-Qamariyah dan Mad Thabi'i" },
          { word: "بَعْدَ", isTarget: false, reason: "Fathah biasa" },
          { word: "الْإِيمَانِ", isTarget: false, reason: "Mad Badal & Mad 'Aridh" }
        ],
        fullArabic: "بِئْسَ الاِسْمُ الْفُسُوقُ بَعْدَ الْإِيمَانِ ۚ وَمَن لَّمْ يَتُبْ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ",
        targetLafadz: "بِئْسَ الاِسْمُ (Dibaca: Bi'salismu)",
        translation: "Seburuk-buruk panggilan adalah (panggilan) yang buruk (fasik) setelah beriman. Dan barangsiapa tidak bertobat, maka mereka itulah orang-orang yang zalim.",
        audioPhonetic: "Bi'salismul fusuuqu ba'dal iimaan"
      },
      {
        id: "saktah_1",
        title: "Saktah (سَكْتَة)",
        surah: 83,
        ayahs: [{ surah: 83, ayah: 14 }],
        surahName: "QS. Al-Muthaffifin",
        ayahRange: "Ayat 14",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        type: "saktah",
        hukumName: "Saktah Lathifah",
        ketukan: 2,
        beatsText: "Diam 2 Harakat Tanpa Nafas",
        ruleGuide: "Saktah menurut bahasa artinya menahan/diam. Menurut istilah: berhenti sejenak tanpa bernafas selama kurang lebih 2 harakat (1 alif), lalu langsung melanjutkan bacaan berikutnya. Ada 4 tempat wajib saktah riwayat Imam Ashim: QS. Al-Kahfi: 1-2, QS. Ya-Sin: 52, QS. Al-Qiyamah: 27, dan QS. Al-Muthaffifin: 14.",
        mouthGuide: "Tahan aliran nafas tepat di tenggorokan selama 2 ketukan, jangan mengambil nafas baru!",
        mission: "Klik lafadz yang memiliki tanda Saktah (berhenti 2 ketukan tanpa nafas)!",
        verseTokens: [
          { word: "كَلَّا", isTarget: false, reason: "Mad Thabi'i" },
          { word: "بَلْ ۜ", isTarget: true, reason: "SAKTAH pada 'Bal': berhenti sejenak 2 harakat tanpa nafas sebelum menyambung ke kata 'Raana'." },
          { word: "رَانَ", isTarget: false, reason: "Mad Thabi'i" },
          { word: "عَلَىٰ", isTarget: false, reason: "Mad Thabi'i" },
          { word: "قُلُوبِهِم", isTarget: false, reason: "Mad Thabi'i & Idzhar Syafawi" }
        ],
        fullArabic: "كَلَّا ۖ بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ",
        targetLafadz: "بَلْ ۜ رَانَ (Bal [Saktah 2 ketukan] Raana)",
        translation: "Sekali-kali tidak! Bahkan apa yang mereka telah usahakan itu menutupi hati mereka.",
        audioPhonetic: "Kallaa... bal... [saktah]... raana 'alaa quluubihim maa kaanuu yaksibuun"
      }
    ]
  },

  // 3. Data Arena Tahfidz & Mufradat
  tahfidz: {
    matchingSets: [
      {
        id: "set_fajr",
        name: "QS. Al-Fajr: 15–18 (Ujian Rezeki)",
        surah: 89,
        ayahs: [
          { surah: 89, ayah: 15 },
          { surah: 89, ayah: 16 },
          { surah: 89, ayah: 17 },
          { surah: 89, ayah: 18 }
        ],
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        pairs: [
          { id: 1, ar: "ابْتَلَاهُ", id_txt: "Mengujinya / Mencobanya" },
          { id: 2, ar: "فَأَكْرَمَهُ", id_txt: "Lalu Dia memuliakannya" },
          { id: 3, ar: "نَعَّمَهُ", id_txt: "Dan memberinya kenikmatan" },
          { id: 4, ar: "قَدَرَ عَلَيْهِ", id_txt: "Membatasi baginya" },
          { id: 5, ar: "رِزْقَهُ", id_txt: "Rezekinya" },
          { id: 6, ar: "أَهَانَنِ", id_txt: "Telah menghinakanku" }
        ]
      },
      {
        id: "set_baqarah",
        name: "QS. Al-Baqarah: 254 & 261 (Infak)",
        surah: 2,
        ayahs: [
          { surah: 2, ayah: 254 },
          { surah: 2, ayah: 261 }
        ],
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        pairs: [
          { id: 7, ar: "أَنفِقُوا", id_txt: "Infakkanlah / Belanjakanlah" },
          { id: 8, ar: "خُلَّةٌ", id_txt: "Persahabatan yang erat" },
          { id: 9, ar: "شَفَاعَةٌ", id_txt: "Syafa'at (pertolongan)" },
          { id: 10, ar: "كَمَثَلِ حَبَّةٍ", id_txt: "Seperti sebutir biji" },
          { id: 11, ar: "سَبْعَ سَنَابِلَ", id_txt: "Tujuh butir tangkai" },
          { id: 12, ar: "يُضَاعِفُ", id_txt: "Melipatgandakan pahala" }
        ]
      },
      {
        id: "set_hadits",
        name: "Hadits Etos Kerja & Kedermawanan",
        pairs: [
          { id: 13, ar: "الْيَدُ الْعُلْيَا", id_txt: "Tangan yang di atas (pemberi)" },
          { id: 14, ar: "الْيَدِ السُّفْلَى", id_txt: "Tangan yang di bawah (peminta)" },
          { id: 15, ar: "الْمُنْفِقَةُ", id_txt: "Yang menafkahkan hartanya" },
          { id: 16, ar: "السَّائِلَةُ", id_txt: "Yang meminta-minta belas kasihan" },
          { id: 17, ar: "ابْدَأْ بِمَنْ تَعُولُ", id_txt: "Mulailah dari tanggungan keluargamu" },
          { id: 18, ar: "خَيْرٌ مِنَ", id_txt: "Lebih mulia daripada" }
        ]
      }
    ],

    puzzles: [
      {
        id: "puz_1",
        title: "Tantangan 1: Matan Hadits Tangan di Atas (HR. Bukhari-Muslim)",
        translation: "Terjemahan: 'Tangan yang di atas lebih baik daripada tangan yang di bawah.'",
        correctSequence: [
          "الْيَدُ الْعُلْيَا",
          "خَيْرٌ مِنَ",
          "الْيَدِ السُّفْلَى"
        ],
        wordsScrambled: [
          "الْيَدِ السُّفْلَى",
          "الْيَدُ الْعُلْيَا",
          "خَيْرٌ مِنَ"
        ],
        hukumNotes: "Hadits dari Abdullah bin Umar ra. Menegaskan etos kerja keras, kemandirian, dan kemuliaan berbagi dibanding mental peminta.",
        audioPhonetic: "Al-yadul 'ulyaa khairun minal yadis suflaa"
      },
      {
        id: "puz_2",
        title: "Tantangan 2: QS. Al-Baqarah: 261 (Pahala Menafkahkan Harta)",
        translation: "Terjemahan: 'Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai.'",
        surah: 2,
        ayahs: [{ surah: 2, ayah: 261 }],
        surahName: "QS. Al-Baqarah: 261",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        correctSequence: [
          "مَثَلُ الَّذِينَ يُنفِقُونَ",
          "أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ",
          "كَمَثَلِ حَبَّةٍ",
          "أَنبَتَتْ سَبْعَ سَنَابِلَ"
        ],
        wordsScrambled: [
          "كَمَثَلِ حَبَّةٍ",
          "أَنبَتَتْ سَبْعَ سَنَابِلَ",
          "مَثَلُ الَّذِينَ يُنفِقُونَ",
          "أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ"
        ],
        hukumNotes: "Menjelaskan kelipatan ganjaran infak yang ikhlas hingga 700 kali lipat bahkan tak terhingga bagi hamba yang bertakwa.",
        audioPhonetic: "Matsalulladziina yunfiquuna amwaalahum fii sabiilillaahi kamatsali habbatin ambatat sab'a sanaabila"
      },
      {
        id: "puz_3",
        title: "Tantangan 3: QS. An-Naba: 6–7 (Penerapan Mad 'Iwadh)",
        translation: "Terjemahan: 'Bukankah Kami telah menjadikan bumi sebagai hamparan, dan gunung-gunung sebagai pasak?'",
        surah: 78,
        ayahs: [
          { surah: 78, ayah: 6 },
          { surah: 78, ayah: 7 }
        ],
        surahName: "QS. An-Naba': 6–7",
        reciter: "Syaikh Misyari Rasyid Al-Afasy",
        correctSequence: [
          "أَلَمْ نَجْعَلِ",
          "الْأَرْضَ مِهَٰدًا",
          "وَالْجِبَالَ",
          "أَوْتَادًا"
        ],
        wordsScrambled: [
          "وَالْجِبَالَ",
          "الْأَرْضَ مِهَٰدًا",
          "أَوْتَادًا",
          "أَلَمْ نَجْعَلِ"
        ],
        hukumNotes: "Kata 'Mihadaa' dan 'Awtaadaa' merupakan contoh nyata hukum bacaan Mad 'Iwadh dengan panjang 2 ketukan harakat.",
        audioPhonetic: "Alam naj'alil ardha mihaadaa, wal jibaala awtaadaa"
      }
    ],

    classmates: [
      { name: "Ahmad Fathoni", grade: "VIII-A", score: 420, avatar: "👨‍🎓", badge: "Hafidz Cilik" },
      { name: "Siti Fatimah Azzahra", grade: "VIII-B", score: 395, avatar: "🧕", badge: "Ahli Tajwid" },
      { name: "Raihan Al-Ghifari", grade: "VIII-A", score: 370, avatar: "👦", badge: "Pejuang HOTS" },
      { name: "Nabila Zahra", grade: "VIII-C", score: 340, avatar: "👩‍🎓", badge: "Duta Mufradat" },
      { name: "Zaidan Al-Ayyubi", grade: "VIII-B", score: 310, avatar: "🧑", badge: "Murid Rajin" },
      { name: "Aisyah Humaira", grade: "VIII-A", score: 280, avatar: "🧕", badge: "Aktif Bertanya" },
      { name: "M. Farhan", grade: "VIII-C", score: 250, avatar: "👦", badge: "Santri Teladan" },
      { name: "Khadijah Putri", grade: "VIII-B", score: 220, avatar: "👧", badge: "Penghafal Baru" }
    ]
  },

  // 4. Data Simulator Kontekstual AI (HOTS)
  scenarios: [
    {
      id: "scen_1",
      title: "Skenario 1: Ujian Kelapangan & Kesempitan Rezeki",
      dalilRef: "QS. Al-Fajr: 15–18",
      surah: 89,
      ayahs: [
        { surah: 89, ayah: 15 },
        { surah: 89, ayah: 16 },
        { surah: 89, ayah: 17 },
        { surah: 89, ayah: 18 }
      ],
      surahName: "QS. Al-Fajr: 15–18",
      reciter: "Syaikh Misyari Rasyid Al-Afasy",
      arabicDalil: "فَأَمَّا الْإِنسَانُ إِذَا مَا ابْتَلَاهُ رَبُّهُ فَأَكْرَمَهُ وَنَعَّمَهُ فَيَقُولُ رَبِّي أَكْرَمَنِ ۝ وَأَمَّا إِذَا مَا ابْتَلَاهُ فَقَدَرَ عَلَيْهِ رِزْقَهُ فَيَقُولُ رَبِّي أَهَانَنِ",
      background: "Di kelas VIII MTs, ada dua orang siswa: Fikri yang baru saja dibelikan smartphone flagship terbaru oleh orang tuanya dan membanggakannya di depan teman-teman seolah ia anak paling disayangi Tuhan, serta Danu yang terdiam murung karena seragamnya sudah lusuh dan ayahnya baru terkena pengurangan jam kerja pabrik sehingga uang sakunya pas-pasan. Fikri sempat melontarkan gurauan: 'Makanya rajin ibadah biar rezekinya lancar kayak gue!'.",
      question: "Sebagai ketua kelas atau sahabat Danu dan Fikri yang mempelajari QS. Al-Fajr ayat 15-18, bagaimana sikap dan tindakan terbaikmu?",
      options: [
        {
          key: "A",
          title: "Pilihan A (Kurang Tepat / Keliru)",
          text: "Mendukung perkataan Fikri karena kenyataannya orang kaya memang lebih dimuliakan Allah, dan menyuruh Danu bersabar saja menerima takdir tanpa perlu dinasihati Fikrinya."
        },
        {
          key: "B",
          title: "Pilihan B (Solusi HOTS & Berakhlak Qur'ani - Ideal)",
          text: "Mengajak Fikri berbicara secara empatik dan privat, mengingatkannya dengan QS. Al-Fajr 15-18 bahwa kekayaan maupun kemiskinan keduanya adalah 'ujian' (Ibtila'), bukan tolok ukur kemuliaan di mata Allah. Kemudian merangkul Danu, memberikan semangat, serta menginisiasi kepedulian sosial bersama tanpa merendahkan harga dirinya."
        },
        {
          key: "C",
          title: "Pilihan C (Pasif / Menghindar)",
          text: "Memilih diam saja dan tidak ikut campur urusan teman agar tidak menimbulkan pertengkaran, biarkan guru BP yang menyelesaikan jika Danu menangis."
        }
      ],
      idealAnswer: "Pilihan B adalah keputusan yang paling selaras dengan QS. Al-Fajr: 15-18. Dalam ayat tersebut, Allah mengecam kekeliruan persepsi manusia yang menganggap bahwa ketika dilapangkan rezeki (akramahu wa na'amahu) berarti Allah memuliakannya, dan ketika disempitkan rezeki (qadara 'alaihi rizqahu) berarti Allah menghinakannya. Padahal keduanya adalah sarana ujian (Ibtila'). Rezeki melimpah menguji apakah kita bersyukur dan menyantuni anak yatim serta fakir miskin (QS. Al-Fajr: 17-18), sedangkan kesempitan rezeki menguji kesabaran dan tawakal. Sikap menasihati Fikri dengan santun akan mengikis bibit kesombongan, sementara merangkul Danu merupakan wujud nyata ukhuwah Islamiyah dan keadilan sosial di lingkungan madrasah.",
      keywords: ["al-fajr", "15", "18", "ujian", "ibtila", "syukur", "sabar", "kesombongan", "kemuliaan", "takwa", "merangkul", "empati", "bukan ukuran", "miskin", "kaya"]
    },
    {
      id: "scen_2",
      title: "Skenario 2: Menyegerakan Infak vs Godaan Konsumtif & FOMO Remaja",
      dalilRef: "QS. Al-Baqarah: 254 & 261",
      surah: 2,
      ayahs: [
        { surah: 2, ayah: 254 },
        { surah: 2, ayah: 261 }
      ],
      surahName: "QS. Al-Baqarah: 254 & 261",
      reciter: "Syaikh Misyari Rasyid Al-Afasy",
      arabicDalil: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِمَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ يَوْمٌ لَّا بَيْعٌ فِيهِ وَلَا خُلَّةٌ وَلَا شَفَاعَةٌ",
      background: "Kamu berhasil menabung uang saku sebesar Rp 150.000 selama dua bulan untuk membeli skin game edisi terbatas yang sedang tren di kalangan teman-teman satu geng madrasahmu. Tiba-tiba di hari itu, pihak OSIM mengumumkan penggalangan dana darurat untuk biaya operasi adik kelas yatim piatu yang mengalami kecelakaan berat dan membutuhkan bantuan dana tunai hari ini juga sebelum tindakan medis dilakukan.",
      question: "Bagaimana kamu memprioritaskan penggunaan uang tabungan tersebut berdasarkan pemahaman QS. Al-Baqarah: 254 dan 261?",
      options: [
        {
          key: "A",
          title: "Pilihan A (Menunda Kebaikan)",
          text: "Tetap membeli skin game karena itu hasil menabung sendiri dengan susah payah, dan berniat menyumbang uang receh sisa jajan saja besok jika ada kembalian."
        },
        {
          key: "B",
          title: "Pilihan B (Memprioritaskan Infak & Menghidupkan Jiwa Sosial - Ideal)",
          text: "Mendahulukan menyisihkan sebagian besar atau seluruh tabungan untuk infak darurat operasi adik kelas tersebut, meyakini janji Allah dalam QS. Al-Baqarah: 261 bahwa harta infak tidak akan berkurang melainkan dilipatgandakan pahalanya seperti sebutir biji menumbuhkan tujuh tangkai, serta menyadari peringatan QS. Al-Baqarah: 254 tentang pentingnya berinfak sebelum datang hari perhitungan."
        },
        {
          key: "C",
          title: "Pilihan C (Riya' / Mengharap Pujian)",
          text: "Menyumbang seluruh uang tetapi dengan syarat nama dan nominalnya diumumkan di depan apel bendera madrasah agar dipuji teman-teman dan guru sebagai siswa terdermawan."
        }
      ],
      idealAnswer: "Pilihan B merupakan cerminan keimanan yang kokoh sesuai tuntunan QS. Al-Baqarah: 254 dan 261. Ayat 254 mengingatkan kita agar menyegerakan infak dari rezeki yang Allah anugerahkan sebelum datang hari kiamat di mana tidak ada lagi jual beli, persahabatan, maupun pertolongan selain amal shalih. Menyelamatkan nyawa manusia (adik kelas yatim) adalah fardhu kifayah dan kebutuhan darurat hakiki, sedangkan skin game hanyalah keinginan konsumtif sesaat (syahwat duniawi). Sesuai ayat 261, Allah mengibaratkan orang yang berinfak ikhlas di jalan-Nya seperti menanam sebutir benih yang menumbuhkan 7 tangkai dan tiap tangkai menghasilkan 100 biji (kelipatan 700 kali lipat kebaikan). Infak ini melatih remaja madrasah mengendalikan gaya hidup hedonisme dan mengasah kepekaan kemanusiaan.",
      keywords: ["al-baqarah", "254", "261", "infak", "sedekah", "biji", "tujuh tangkai", "700", "darurat", "yatim", "menunda", "ikhlas", "menabung", "kebaikan", "akhirat"]
    },
    {
      id: "scen_3",
      title: "Skenario 3: Etos Kemandirian 'Tangan di Atas'",
      dalilRef: "HR. Bukhari-Muslim dari Abdullah bin Umar ra.",
      arabicDalil: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى فَالْيَدُ الْعُلْيَا هِيَ الْمُنْفِقَةُ وَالسُّفْلَى هِيَ السَّائِلَةُ",
      background: "Madrasahmu menyelenggarakan Proyek Penguatan Profil Pelajar Rahmatan lil 'Alamin (P5-PPRA) bertema Kewirausahaan Kreatif. Kelompokmu beranggotakan 4 orang. Salah satu anggota bernama Dimas selalu beralasan tidak punya kuota, malas mengerjakan tugas infografis, dan berkata: 'Kalian saja yang selesaikan, kan kalian pintar-pintar, nanti nama gue tolong cantumin ya biar sama-sama dapat nilai A. Kasihanilah gue'.",
      question: "Berdasarkan matan hadits 'Al-Yadul 'Ulya Khairun minal Yadis Sufla' (Tangan di atas lebih baik dari tangan di bawah), tindakan edukatif apa yang harus kamu ambil?",
      options: [
        {
          key: "A",
          title: "Pilihan A (Membiarkan Mental Ketergantungan)",
          text: "Menuruti permintaan Dimas dan tetap mencantumkan namanya tanpa kontribusi apapun karena takut dianggap teman yang jahat atau tidak solider."
        },
        {
          key: "B",
          title: "Pilihan B (Membimbing Kemandirian & Integritas Islami - Ideal)",
          text: "Menolak bersikap kompromistis terhadap mental gratisan, lalu mengajaknya berdiskusi secara bijak. Menjelaskan hadits Nabi SAW bahwa seorang muslim harus memiliki etos 'Tangan di Atas' (pemberi manfaat, produktif, mandiri) dan tidak membiasakan diri menjadi 'Tangan di Bawah' (peminta-minta/parasit). Kemudian membagi tugas teknis yang Dimas sanggupi (misalnya wawancara pembeli atau merapikan kemasan) dan mendampinginya sampai selesai."
        },
        {
          key: "C",
          title: "Pilihan C (Mencaci & Menghakimi di Depan Umum)",
          text: "Langsung melaporkan Dimas ke wali kelas di depan semua teman sekelas, mencoret namanya secara kasar, dan menyuruh teman-teman lain untuk memusuhinya."
        }
      ],
      idealAnswer: "Pilihan B adalah manifestasi dari etos hadits riwayat Bukhari dan Muslim: 'Al-Yadul 'Ulya Khairun minal Yadis Sufla' (Tangan di atas lebih baik daripada tangan di bawah). Tangan di atas tidak hanya bermakna orang yang berinfak harta, tetapi juga orang yang memproduksi karya, mandiri, dan berkontribusi memberi kemanfaatan kepada orang lain. Sebaliknya, meminta nilai gratisan tanpa berusaha adalah analogi modern dari mental 'tangan di bawah' (peminta-minta yang merendahkan martabat dirinya). Pendekatan solutif adalah membimbing dan mendampingi Dimas agar menemukan peran kerjanya dalam kelompok, sehingga ia terlatih menjadi pribadi muslim yang berintegritas, mandiri, dan bertanggung jawab.",
      keywords: ["tangan di atas", "tangan di bawah", "al-yadul 'ulya", "sufla", "kemandirian", "bukhari", "muslim", "etos kerja", "tanggung jawab", "integritas", "meminta-minta", "kontribusi", "produktif", "manfaat"]
    }
  ],

  // 5. Daftar Surah Pokok Bahasan KMA 183 untuk Beranda (Dengan Murottal Syaikh Misyari Rasyid)
  surahList: [
    {
      id: "surah_fatihah",
      num: 1,
      title: "Al-Fatihah",
      arabic: "الفاتحة",
      subtitle: "Makkiyah • 7 Ayat • Mad 'Aridh Lissukun",
      surah: 1,
      ayahs: [
        { surah: 1, ayah: 1 },
        { surah: 1, ayah: 2 },
        { surah: 1, ayah: 3 },
        { surah: 1, ayah: 4 },
        { surah: 1, ayah: 5 },
        { surah: 1, ayah: 6 },
        { surah: 1, ayah: 7 }
      ],
      reciter: "Syaikh Misyari Rasyid Al-Afasy",
      targetTab: "tajwid"
    },
    {
      id: "surah_baqarah",
      num: 2,
      title: "QS. Al-Baqarah: 254 & 261",
      arabic: "البقرة",
      subtitle: "Madaniyah • Keutamaan Infak & Sedekah",
      surah: 2,
      ayahs: [
        { surah: 2, ayah: 254 },
        { surah: 2, ayah: 261 }
      ],
      reciter: "Syaikh Misyari Rasyid Al-Afasy",
      targetTab: "tahfidz"
    },
    {
      id: "surah_fajr",
      num: 3,
      title: "QS. Al-Fajr: 15–18",
      arabic: "الفجر",
      subtitle: "Makkiyah • Ujian Kelapangan & Kesempitan Rezeki",
      surah: 89,
      ayahs: [
        { surah: 89, ayah: 15 },
        { surah: 89, ayah: 16 },
        { surah: 89, ayah: 17 },
        { surah: 89, ayah: 18 }
      ],
      reciter: "Syaikh Misyari Rasyid Al-Afasy",
      targetTab: "ai_simulator"
    },
    {
      id: "surah_naba",
      num: 4,
      title: "QS. An-Naba: 6–7",
      arabic: "النبأ",
      subtitle: "Makkiyah • Penerapan Kaidah Mad 'Iwadh",
      surah: 78,
      ayahs: [
        { surah: 78, ayah: 6 },
        { surah: 78, ayah: 7 }
      ],
      reciter: "Syaikh Misyari Rasyid Al-Afasy",
      targetTab: "tajwid"
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.APP_DATA = APP_DATA;
}
