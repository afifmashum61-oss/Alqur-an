// ==========================================================================
// MEDIA PEMBELAJARAN INTERAKTIF AL-QUR'AN HADITS MTs (KMA 183 TAHUN 2019)
// CORE APPLICATION LOGIC & SPA CONTROLLER
// ==========================================================================

class QuranApp {
  constructor() {
    this.student = {
      name: "Fatih Al-Ayyubi",
      grade: "Kelas VIII-A MTs",
      score: 185,
      tajwidScore: 60,
      tahfidzScore: 50,
      hotsScore: 75,
      assessments: [
        {
          id: 1,
          date: new Date().toLocaleDateString('id-ID'),
          module: "Lab Tajwid - Mad 'Iwadh",
          score: 60,
          notes: "Tuntas mengidentifikasi hukum Mad 'Iwadh"
        },
        {
          id: 2,
          date: new Date().toLocaleDateString('id-ID'),
          module: "Arena Tahfidz - Matan Hadits",
          score: 50,
          notes: "Menyusun puzzle hadits Tangan di Atas dengan tepat"
        },
        {
          id: 3,
          date: new Date().toLocaleDateString('id-ID'),
          module: "Simulator AI - Ujian Rezeki",
          score: 75,
          notes: "Refleksi HOTS QS. Al-Fajr: 15-18 Sangat Baik"
        }
      ]
    };

    // Active UI states
    this.activeTab = "beranda";
    this.activeTajwidSub = "mad";
    this.activeTajwidTopicIndex = 0;
    this.activeGharibTopicIndex = 0;
    this.isWidescreen = false;
    
    // Metronome state
    this.metronomeInterval = null;
    this.metronomeBeats = 2;
    this.metronomeCurrentStep = 0;
    this.isMetronomeRunning = false;

    // Speed Match Game state
    this.activeMatchSetIndex = 0;
    this.selectedArabCard = null;
    this.selectedIndoCard = null;
    this.matchTimerInterval = null;
    this.matchTimeLeft = 60;
    this.matchedPairsCount = 0;

    // Puzzle State
    this.activePuzzleIndex = 0;
    this.puzzleAnswerList = [];
    this.puzzlePoolList = [];

    // AI Simulator State
    this.activeScenarioIndex = 0;
    this.selectedDecisionKey = null;

    // Load persisted state if exists
    this.loadState();

    // DOM Ready initialization
    document.addEventListener("DOMContentLoaded", () => {
      this.initDOMElements();
      this.bindEvents();
      this.renderAll();
    });
  }

  // State Persistence
  loadState() {
    try {
      const saved = localStorage.getItem("alquran_app_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.student) this.student = parsed.student;
      }
    } catch (e) {
      console.warn("Could not load local state", e);
    }
  }

  saveState() {
    try {
      localStorage.setItem("alquran_app_state", JSON.stringify({
        student: this.student
      }));
    } catch (e) {
      console.warn("Could not save state", e);
    }
  }

  addPoints(category, amount, reason) {
    this.student.score += amount;
    if (category === "tajwid") this.student.tajwidScore += amount;
    else if (category === "tahfidz") this.student.tahfidzScore += amount;
    else if (category === "hots") this.student.hotsScore += amount;

    this.student.assessments.push({
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID') + " " + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      module: reason,
      score: amount,
      notes: `Penambahan skor ${amount} poin pada modul ${category}`
    });

    this.saveState();
    this.updateHeaderStats();
    this.renderLeaderboard();
    this.renderTeacherPanel();
  }

  initDOMElements() {
    // Navigation tabs
    this.navTabBtns = document.querySelectorAll(".nav-tab-btn");
    this.tabPanes = document.querySelectorAll(".tab-pane");

    // Header elements
    this.totalScoreElem = document.getElementById("headerTotalScore");
    this.studentNameElem = document.getElementById("headerStudentName");
    this.studentClassElem = document.getElementById("headerStudentClass");

    // Tajwid elements
    this.tajwidSubTabBtns = document.querySelectorAll(".tajwid-sub-btn");
    this.tajwidTopicsContainer = document.getElementById("tajwidTopicsPills");
    this.verseTokensContainer = document.getElementById("verseTokensContainer");
    this.verseTitleElem = document.getElementById("verseTitle");
    this.verseSubtitleElem = document.getElementById("verseSubtitle");
    this.verseMissionElem = document.getElementById("verseMission");
    this.verseTranslationElem = document.getElementById("verseTranslation");
    this.versePhoneticElem = document.getElementById("versePhonetic");
    this.fullVerseArabicText = document.getElementById("fullVerseArabicText");
    this.fullVerseSurahRef = document.getElementById("fullVerseSurahRef");
    this.fullVersePhonetic = document.getElementById("fullVersePhonetic");
    this.fullVerseTranslation = document.getElementById("fullVerseTranslation");
    this.explanationCard = document.getElementById("tajwidExplanationCard");
    this.explanationTitle = document.getElementById("explanationTitle");
    this.explanationContent = document.getElementById("explanationContent");

    // Metronome elements
    this.beatButtons = document.querySelectorAll(".beat-btn");
    this.beadContainer = document.getElementById("metronomeBeads");
    this.btnToggleMetronome = document.getElementById("btnToggleMetronome");

    // Gharib Guide elements
    this.gharibGuideCard = document.getElementById("gharibGuideCard");
    this.gharibGuideTitle = document.getElementById("gharibGuideTitle");
    this.gharibGuideRule = document.getElementById("gharibGuideRule");
    this.gharibGuideMouth = document.getElementById("gharibGuideMouth");

    // Audio Recorder elements
    this.recordCanvas = document.getElementById("audioWaveCanvas");
    this.btnStartRecord = document.getElementById("btnStartRecord");
    this.btnStopRecord = document.getElementById("btnStopRecord");
    this.recDot = document.getElementById("recDot");
    this.recStatusText = document.getElementById("recStatusText");
    this.userAudioPlayer = document.getElementById("userAudioPlayer");
    this.btnSaveSelfEval = document.getElementById("btnSaveSelfEval");

    // Tahfidz Matching elements
    this.matchSetSelect = document.getElementById("matchSetSelect");
    this.matchArabCol = document.getElementById("matchArabCol");
    this.matchIndoCol = document.getElementById("matchIndoCol");
    this.matchTimerElem = document.getElementById("matchTimer");
    this.matchScoreElem = document.getElementById("matchScore");
    this.btnRestartMatch = document.getElementById("btnRestartMatch");

    // Puzzle elements
    this.puzzleLevelSelect = document.getElementById("puzzleLevelSelect");
    this.puzzleClueText = document.getElementById("puzzleClueText");
    this.puzzleAnswerBox = document.getElementById("puzzleAnswerBox");
    this.puzzlePoolBox = document.getElementById("puzzlePoolBox");
    this.btnCheckPuzzle = document.getElementById("btnCheckPuzzle");
    this.btnResetPuzzle = document.getElementById("btnResetPuzzle");

    // Leaderboard elements
    this.leaderboardBody = document.getElementById("leaderboardBody");

    // AI Simulator elements
    this.scenarioCards = document.querySelectorAll(".scenario-card-select");
    this.scenarioDalilRef = document.getElementById("scenarioDalilRef");
    this.scenarioArabicDalil = document.getElementById("scenarioArabicDalil");
    this.scenarioNarrative = document.getElementById("scenarioNarrative");
    this.scenarioQuestion = document.getElementById("scenarioQuestion");
    this.decisionOptionsContainer = document.getElementById("decisionOptionsContainer");
    this.argumentTextarea = document.getElementById("argumentTextarea");
    this.btnFillIdeal = document.getElementById("btnFillIdeal");
    this.btnSubmitAi = document.getElementById("btnSubmitAi");
    this.aiResultCard = document.getElementById("aiResultCard");

    // Teacher Panel elements
    this.teacherStudentName = document.getElementById("teacherStudentName");
    this.teacherStudentClass = document.getElementById("teacherStudentClass");
    this.teacherTotalScore = document.getElementById("teacherTotalScore");
    this.teacherPredikat = document.getElementById("teacherPredikat");
    this.teacherTajwidScore = document.getElementById("teacherTajwidScore");
    this.teacherTahfidzScore = document.getElementById("teacherTahfidzScore");
    this.teacherHotsScore = document.getElementById("teacherHotsScore");
    this.teacherAssessmentsBody = document.getElementById("teacherAssessmentsBody");
    this.btnDownloadCsv = document.getElementById("btnDownloadCsv");
    this.apiKeyInput = document.getElementById("apiKeyInput");
    this.btnSaveApiKey = document.getElementById("btnSaveApiKey");
    this.btnTestApiKey = document.getElementById("btnTestApiKey");
    this.apiStatusBadge = document.getElementById("apiStatusBadge");
    this.btnResetSession = document.getElementById("btnResetSession");

    // Modals
    this.curriculumModal = document.getElementById("curriculumModal");
    this.profileModal = document.getElementById("profileModal");
    this.modalInputName = document.getElementById("modalInputName");
    this.modalInputClass = document.getElementById("modalInputClass");
  }

  bindEvents() {
    // Header Menu button -> Open curriculum
    const btnHeaderMenu = document.getElementById("btnHeaderMenu");
    if (btnHeaderMenu) {
      btnHeaderMenu.addEventListener("click", () => this.openCurriculumModal());
    }

    // Navigation Tabs & Bottom Nav Items
    this.navTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });

    document.querySelectorAll(".nav-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const navTarget = btn.getAttribute("data-nav");
        if (navTarget) this.switchTab(navTarget);
      });
    });

    // Desktop Header Navigation Buttons
    document.querySelectorAll(".desktop-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const navTarget = btn.getAttribute("data-nav");
        if (navTarget) this.switchTab(navTarget);
      });
    });

    // Profile Trigger
    const profileTrigger = document.getElementById("profileTrigger");
    if (profileTrigger) {
      profileTrigger.addEventListener("click", () => this.openProfileModal());
    }

    // Modal Close buttons
    document.querySelectorAll(".modal-close-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        this.closeModals();
      });
    });

    // Curriculum Modal button
    const btnOpenCurriculum = document.getElementById("btnOpenCurriculum");
    if (btnOpenCurriculum) {
      btnOpenCurriculum.addEventListener("click", () => {
        this.openCurriculumModal();
      });
    }

    // Save Profile button
    const btnSaveProfile = document.getElementById("btnSaveProfile");
    if (btnSaveProfile) {
      btnSaveProfile.addEventListener("click", () => {
        const newName = this.modalInputName.value.trim();
        const newClass = this.modalInputClass.value.trim();
        if (newName) this.student.name = newName;
        if (newClass) this.student.grade = newClass;
        this.saveState();
        this.updateHeaderStats();
        this.renderLeaderboard();
        this.renderTeacherPanel();
        this.closeModals();
        this.showToast("Profil siswa berhasil diperbarui!", "success");
      });
    }

    // Tajwid Sub-tab switch
    this.tajwidSubTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.tajwidSubTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTajwidSub = btn.getAttribute("data-sub");
        this.renderTajwidTopics();
      });
    });

    // Metronome Beat Buttons
    this.beatButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.beatButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.metronomeBeats = parseInt(btn.getAttribute("data-beats"));
        this.resetMetronomeBeads();
      });
    });

    // Metronome Start/Stop
    if (this.btnToggleMetronome) {
      this.btnToggleMetronome.addEventListener("click", () => {
        this.toggleMetronome();
      });
    }

    // Audio Recorder
    if (this.btnStartRecord) {
      this.btnStartRecord.addEventListener("click", () => this.startAudioRecord());
    }
    if (this.btnStopRecord) {
      this.btnStopRecord.addEventListener("click", () => this.stopAudioRecord());
    }
    if (this.btnSaveSelfEval) {
      this.btnSaveSelfEval.addEventListener("click", () => {
        const checks = document.querySelectorAll(".eval-check:checked");
        if (checks.length === 0) {
          this.showToast("Pilih minimal 1 kriteria evaluasi diri terlebih dahulu.", "error");
          return;
        }
        window.audioManager.playCelebrate();
        this.addPoints("tajwid", 10, "Evaluasi Mandiri Studio Rekaman");
        this.showToast(`✨ Luar biasa! +10 Poin evaluasi mandiri berhasil dicatat!`, "gold");
      });
    }

    // Speed Match Restart & Set Change
    if (this.matchSetSelect) {
      this.matchSetSelect.addEventListener("change", (e) => {
        this.activeMatchSetIndex = parseInt(e.target.value);
        this.startSpeedMatchGame();
      });
    }
    if (this.btnRestartMatch) {
      this.btnRestartMatch.addEventListener("click", () => {
        this.startSpeedMatchGame();
      });
    }

    // Puzzle Level Change & Actions
    if (this.puzzleLevelSelect) {
      this.puzzleLevelSelect.addEventListener("change", (e) => {
        this.activePuzzleIndex = parseInt(e.target.value);
        this.setupPuzzle();
      });
    }
    if (this.btnCheckPuzzle) {
      this.btnCheckPuzzle.addEventListener("click", () => this.checkPuzzleAnswer());
    }
    if (this.btnResetPuzzle) {
      this.btnResetPuzzle.addEventListener("click", () => this.setupPuzzle());
    }

    // AI Simulator Scenarios
    this.scenarioCards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        this.scenarioCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.activeScenarioIndex = idx;
        this.renderActiveScenario();
      });
    });

    // Fill Ideal Answer button
    if (this.btnFillIdeal) {
      this.btnFillIdeal.addEventListener("click", () => {
        this.fillIdealHotsAnswer();
      });
    }

    // Submit AI Evaluation button
    if (this.btnSubmitAi) {
      this.btnSubmitAi.addEventListener("click", () => {
        this.evaluateHotsAnswer();
      });
    }

    // Teacher Panel CSV Download
    if (this.btnDownloadCsv) {
      this.btnDownloadCsv.addEventListener("click", () => {
        this.exportCsv();
      });
    }

    // API Key Save & Test
    if (this.btnSaveApiKey) {
      this.btnSaveApiKey.addEventListener("click", () => {
        const key = this.apiKeyInput.value.trim();
        localStorage.setItem("gemini_api_key", key);
        this.updateApiStatus();
        this.showToast("API Key berhasil disimpan di peramban!", "success");
      });
    }
    if (this.btnTestApiKey) {
      this.btnTestApiKey.addEventListener("click", () => {
        this.testGeminiConnection();
      });
    }

    // Reset Session
    if (this.btnResetSession) {
      this.btnResetSession.addEventListener("click", () => {
        if (confirm("Reset seluruh data sesi siswa saat ini untuk memulai demonstrasi baru?")) {
          this.student = {
            name: "Siswa Baru MTs",
            grade: "Kelas VIII MTs",
            score: 0,
            tajwidScore: 0,
            tahfidzScore: 0,
            hotsScore: 0,
            assessments: []
          };
          this.saveState();
          this.updateHeaderStats();
          this.renderLeaderboard();
          this.renderTeacherPanel();
          this.showToast("Sesi berhasil direset!", "success");
        }
      });
    }

    // ==========================================================================
    // SYAIKH MISYARI RASYID AL-AFASY AUDIO HANDLERS
    // ==========================================================================

    // 1. Audio Play Full Verse in Lab Tajwid
    const btnPlayFullVerse = document.getElementById("btnPlayFullVerse");
    if (btnPlayFullVerse) {
      btnPlayFullVerse.addEventListener("click", () => {
        const item = this.getCurrentTajwidItem();
        if (item) {
          if (window.audioManager.isQuranPlaying) {
            window.audioManager.toggleQuranPlay();
          } else {
            if (item.ayahs && item.ayahs.length) {
              window.audioManager.playQuranAyahs(item.ayahs, {
                title: item.title,
                subtitle: `${item.subtitle || item.surahName || ''} • Syaikh Misyari Rasyid`
              });
              this.showToast(`🎙️ Memutar Murottal Syaikh Misyari Rasyid (${item.subtitle || item.title})`, "gold");
            } else {
              window.audioManager.speakArabic(item.fullArabic);
              this.showToast("🔊 Memutar pelafalan tartil...", "success");
            }
          }
        }
      });
    }

    // Quick Play Full Verse button
    const btnListenAyatQuick = document.getElementById("btnListenAyatQuick");
    if (btnListenAyatQuick) {
      btnListenAyatQuick.addEventListener("click", () => {
        const item = this.getCurrentTajwidItem();
        if (item) {
          if (window.audioManager.isQuranPlaying) {
            window.audioManager.toggleQuranPlay();
          } else {
            if (item.ayahs && item.ayahs.length) {
              window.audioManager.playQuranAyahs(item.ayahs, {
                title: item.title,
                subtitle: `${item.subtitle || item.surahName || ''} • Syaikh Misyari Rasyid`
              });
              this.showToast(`🎙️ Memutar Tartil: ${item.subtitle || item.title}`, "gold");
            } else {
              window.audioManager.speakArabic(item.fullArabic);
              this.showToast("🔊 Memutar pelafalan tartil...", "success");
            }
          }
        }
      });
    }

    // Copy Full Verse button
    const btnCopyAyat = document.getElementById("btnCopyAyat");
    if (btnCopyAyat) {
      btnCopyAyat.addEventListener("click", () => {
        const item = this.getCurrentTajwidItem();
        if (item) {
          const textToCopy = `${item.fullArabic}\n\n"${item.translation}"\n(${item.subtitle || item.title})`;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              this.showToast("📋 Ayat & terjemahan berhasil disalin!", "success");
            }).catch(() => {
              this.showToast("📋 Berhasil memilih teks ayat", "success");
            });
          }
        }
      });
    }

    // 2. Play Last Read (QS. Al-Fajr: 15) on Home
    const btnPlayLastRead = document.getElementById("btnPlayLastRead");
    if (btnPlayLastRead) {
      btnPlayLastRead.addEventListener("click", (e) => {
        e.stopPropagation();
        window.audioManager.playQuranAyahs([{ surah: 89, ayah: 15 }], {
          title: "QS. Al-Fajr: 15",
          subtitle: "Mad 'Iwadh & Ujian Rezeki • Syaikh Misyari Rasyid"
        });
        this.showToast("🎙️ Memutar QS. Al-Fajr: 15 (Syaikh Misyari Rasyid)", "gold");
      });
    }

    // 3. Play Scenario Dalil on AI Simulator
    const btnPlayScenarioDalil = document.getElementById("btnPlayScenarioDalil");
    if (btnPlayScenarioDalil) {
      btnPlayScenarioDalil.addEventListener("click", () => {
        const scen = window.APP_DATA.scenarios[this.activeScenarioIndex];
        if (scen && scen.ayahs && scen.ayahs.length) {
          window.audioManager.playQuranAyahs(scen.ayahs, {
            title: scen.dalilRef,
            subtitle: `${scen.surahName || scen.title} • Syaikh Misyari Rasyid`
          });
          this.showToast(`🎙️ Memutar Dalil: ${scen.dalilRef} (Syaikh Misyari Rasyid)`, "gold");
        } else if (scen && scen.arabicDalil) {
          window.audioManager.speakArabic(scen.arabicDalil);
          this.showToast("🔊 Memutar matan dalil...", "success");
        }
      });
    }

    // 4. Play Tahfidz Puzzle Audio
    const btnListenPuzzleAudio = document.getElementById("btnListenPuzzleAudio");
    if (btnListenPuzzleAudio) {
      btnListenPuzzleAudio.addEventListener("click", () => {
        const curPuz = window.APP_DATA.tahfidz.puzzles[this.activePuzzleIndex];
        if (curPuz && curPuz.ayahs && curPuz.ayahs.length) {
          window.audioManager.playQuranAyahs(curPuz.ayahs, {
            title: curPuz.title,
            subtitle: `${curPuz.surahName || ''} • Syaikh Misyari Rasyid`
          });
          this.showToast(`🎙️ Memutar Tartil Syaikh Misyari Rasyid`, "gold");
        } else if (curPuz && curPuz.correctSequence) {
          window.audioManager.speakArabic(curPuz.correctSequence.join(" "));
          this.showToast("🔊 Memutar pelafalan matan...", "success");
        }
      });
    }

    // 5. Global Floating Player Bar Controls
    const gapBtnPlayPause = document.getElementById("gapBtnPlayPause");
    if (gapBtnPlayPause) {
      gapBtnPlayPause.addEventListener("click", () => {
        window.audioManager.toggleQuranPlay();
      });
    }

    const gapBtnRepeat = document.getElementById("gapBtnRepeat");
    if (gapBtnRepeat) {
      gapBtnRepeat.addEventListener("click", () => {
        const isRepeat = window.audioManager.toggleRepeat();
        gapBtnRepeat.classList.toggle("active", isRepeat);
        this.showToast(isRepeat ? "🔁 Pengulangan aktif (Repeat On)" : "➡️ Pengulangan nonaktif", "success");
      });
    }

    const gapBtnStop = document.getElementById("gapBtnStop");
    if (gapBtnStop) {
      gapBtnStop.addEventListener("click", () => {
        window.audioManager.stopQuranAudio();
      });
    }

    const gapProgressBar = document.getElementById("gapProgressBar");
    if (gapProgressBar) {
      gapProgressBar.addEventListener("click", (e) => {
        const rect = gapProgressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        window.audioManager.seekQuranAudio(pct);
      });
    }

    // 6. Global Quran Audio Event Listener
    window.addEventListener("quran-audio-event", (e) => {
      this.handleQuranAudioStateChange(e.detail);
    });
  }

  // ==========================================================================
  // SPA ROUTING & RENDERING
  // ==========================================================================
  switchTab(tabId) {
    this.activeTab = tabId;

    this.navTabBtns.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update bottom nav items
    document.querySelectorAll(".nav-item-btn").forEach(btn => {
      if (btn.getAttribute("data-nav") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update desktop header nav items
    document.querySelectorAll(".desktop-nav-btn").forEach(btn => {
      if (btn.getAttribute("data-nav") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.tabPanes.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    const bodyEl = document.querySelector(".app-content-body");
    if (bodyEl) bodyEl.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh tab-specific states
    if (tabId === "tajwid") {
      this.renderTajwidTopics();
    } else if (tabId === "tahfidz") {
      this.startSpeedMatchGame();
      this.setupPuzzle();
      this.renderLeaderboard();
    } else if (tabId === "ai_simulator") {
      this.renderActiveScenario();
    } else if (tabId === "guru") {
      this.renderTeacherPanel();
    }
  }

  switchTajwidSub(subKey) {
    this.activeTajwidSub = subKey;
    document.querySelectorAll(".tajwid-sub-btn").forEach(btn => {
      if (btn.getAttribute("data-sub") === subKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    this.renderTajwidTopics();
  }

  renderAll() {
    this.updateHeaderStats();
    this.renderTajwidTopics();
    this.resetMetronomeBeads();
    this.startSpeedMatchGame();
    this.setupPuzzle();
    this.renderLeaderboard();
    this.renderActiveScenario();
    this.renderTeacherPanel();
    this.updateApiStatus();
  }

  updateHeaderStats() {
    if (this.totalScoreElem) {
      this.totalScoreElem.textContent = this.student.score;
    }
    if (this.studentNameElem) {
      this.studentNameElem.textContent = this.student.name;
    }
    if (this.studentClassElem) {
      this.studentClassElem.textContent = this.student.grade;
    }
  }

  // ==========================================================================
  // MENU 1: LAB TAJWID & GHARIB
  // ==========================================================================
  renderTajwidTopics() {
    if (!this.tajwidTopicsContainer) return;
    this.tajwidTopicsContainer.innerHTML = "";

    const isMad = this.activeTajwidSub === "mad";
    const topics = isMad ? window.APP_DATA.tajwid.mad : window.APP_DATA.tajwid.gharib;
    const activeIdx = isMad ? this.activeTajwidTopicIndex : this.activeGharibTopicIndex;

    topics.forEach((item, idx) => {
      const pill = document.createElement("button");
      pill.className = `topic-pill ${idx === activeIdx ? "active" : ""}`;
      pill.innerHTML = `<span class="pill-dot"></span><span>${item.title}</span>`;
      pill.addEventListener("click", () => {
        if (isMad) this.activeTajwidTopicIndex = idx;
        else this.activeGharibTopicIndex = idx;
        this.renderTajwidTopics();
      });
      this.tajwidTopicsContainer.appendChild(pill);
    });

    this.renderActiveTajwidItem();
  }

  getCurrentTajwidItem() {
    const isMad = this.activeTajwidSub === "mad";
    const topics = isMad ? window.APP_DATA.tajwid.mad : window.APP_DATA.tajwid.gharib;
    const idx = isMad ? this.activeTajwidTopicIndex : this.activeGharibTopicIndex;
    return topics[idx] || topics[0];
  }

  renderActiveTajwidItem() {
    const item = this.getCurrentTajwidItem();
    if (!item) return;

    // Header & metadata
    if (this.verseTitleElem) this.verseTitleElem.textContent = item.title;
    if (this.verseSubtitleElem) this.verseSubtitleElem.textContent = item.subtitle || item.surah;
    if (this.verseMissionElem) this.verseMissionElem.textContent = item.mission;
    if (this.verseTranslationElem) this.verseTranslationElem.textContent = `"${item.translation}"`;
    if (this.versePhoneticElem) this.versePhoneticElem.textContent = `Pelafalan: ${item.audioPhonetic}`;

    // Full Continuous Verse Card Display
    if (this.fullVerseArabicText) this.fullVerseArabicText.textContent = item.fullArabic;
    if (this.fullVerseSurahRef) this.fullVerseSurahRef.textContent = item.subtitle || item.surahName || item.title;
    if (this.fullVersePhonetic) this.fullVersePhonetic.textContent = item.audioPhonetic || "";
    if (this.fullVerseTranslation) this.fullVerseTranslation.textContent = `"${item.translation}"`;

    // Hide previous explanation
    if (this.explanationCard) {
      this.explanationCard.classList.remove("active");
    }

    // Set metronome beats to match rule
    this.metronomeBeats = item.ketukan || 2;
    this.beatButtons.forEach(btn => {
      if (parseInt(btn.getAttribute("data-beats")) === this.metronomeBeats) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    this.resetMetronomeBeads();

    // Gharib Guide visibility
    if (this.gharibGuideCard) {
      if (this.activeTajwidSub === "gharib") {
        this.gharibGuideCard.style.display = "block";
        if (this.gharibGuideTitle) this.gharibGuideTitle.textContent = `Panduan Cara Baca: ${item.hukumName}`;
        if (this.gharibGuideRule) this.gharibGuideRule.textContent = item.ruleGuide;
        if (this.gharibGuideMouth) this.gharibGuideMouth.textContent = item.mouthGuide;
      } else {
        this.gharibGuideCard.style.display = "none";
      }
    }

    // Render Clickable Verse Tokens (Bedah Ayat)
    if (!this.verseTokensContainer) return;
    this.verseTokensContainer.innerHTML = "";

    item.verseTokens.forEach((token, index) => {
      const tokenBtn = document.createElement("button");
      tokenBtn.className = "word-token-btn";
      tokenBtn.textContent = token.word;
      tokenBtn.setAttribute("data-index", index);

      tokenBtn.addEventListener("click", () => {
        this.handleVerseTokenClick(token, tokenBtn, item);
      });

      this.verseTokensContainer.appendChild(tokenBtn);
    });
  }

  handleVerseTokenClick(token, buttonElement, currentItem) {
    if (buttonElement.classList.contains("correct-identified")) {
      // Re-play audio if clicked again
      window.audioManager.speakArabic(token.word);
      return;
    }

    if (token.isTarget) {
      // SUCCESS! Correct word identified
      buttonElement.classList.add("correct-identified");
      window.audioManager.playSuccess();
      window.audioManager.speakArabic(token.word);

      this.addPoints("tajwid", 20, `Bedah Ayat: ${currentItem.title} (${token.word})`);
      this.showToast(`🎯 Benar! +20 Poin! Anda menemukan hukum ${currentItem.hukumName}`, "gold");

      // Show Detailed Explanation
      if (this.explanationCard) {
        this.explanationCard.classList.add("active");
        if (this.explanationTitle) {
          this.explanationTitle.innerHTML = `<span>✅ Analisis Kaidah:</span> <strong>${token.word}</strong>`;
        }
        if (this.explanationContent) {
          this.explanationContent.innerHTML = `
            <p><strong>Hukum Tajwid:</strong> ${currentItem.hukumName} (${currentItem.beatsText})</p>
            <p style="margin-top: 0.35rem;"><strong>Alasan / Sebab:</strong> ${token.reason}</p>
            <p style="margin-top: 0.35rem; color: var(--primary-light);"><strong>Kaidah KMA 183:</strong> ${currentItem.ruleGuide}</p>
          `;
        }
      }
    } else {
      // INCORRECT!
      buttonElement.classList.add("wrong-shake");
      window.audioManager.playError();
      this.showToast(`Bukan kata ini. ${token.reason}`, "error");

      setTimeout(() => {
        buttonElement.classList.remove("wrong-shake");
      }, 500);
    }
  }

  // Metronome / Visualizer Ketukan
  resetMetronomeBeads() {
    if (!this.beadContainer) return;
    this.beadContainer.innerHTML = "";
    for (let i = 0; i < this.metronomeBeats; i++) {
      const bead = document.createElement("div");
      bead.className = "beat-bead";
      bead.id = `bead-${i}`;
      this.beadContainer.appendChild(bead);
    }
  }

  toggleMetronome() {
    if (this.isMetronomeRunning) {
      this.stopMetronome();
    } else {
      this.startMetronome();
    }
  }

  startMetronome() {
    this.isMetronomeRunning = true;
    this.metronomeCurrentStep = 0;
    if (this.btnToggleMetronome) {
      this.btnToggleMetronome.innerHTML = `<span>⏹</span> Hentikan Ketukan`;
      this.btnToggleMetronome.classList.add("btn-subtle");
      this.btnToggleMetronome.classList.remove("btn-primary");
    }

    const intervalMs = 600; // Tartil rhythm
    this.metronomeInterval = setInterval(() => {
      // Clear all active beads
      const beads = this.beadContainer.querySelectorAll(".beat-bead");
      beads.forEach(b => b.classList.remove("active"));

      const activeBead = document.getElementById(`bead-${this.metronomeCurrentStep}`);
      if (activeBead) {
        activeBead.classList.add("active");
      }

      const isAccent = this.metronomeCurrentStep === 0;
      window.audioManager.playMetronomeTick(isAccent);

      this.metronomeCurrentStep = (this.metronomeCurrentStep + 1) % this.metronomeBeats;
    }, intervalMs);
  }

  stopMetronome() {
    this.isMetronomeRunning = false;
    if (this.metronomeInterval) {
      clearInterval(this.metronomeInterval);
      this.metronomeInterval = null;
    }
    const beads = this.beadContainer ? this.beadContainer.querySelectorAll(".beat-bead") : [];
    beads.forEach(b => b.classList.remove("active"));

    if (this.btnToggleMetronome) {
      this.btnToggleMetronome.innerHTML = `<span>▶</span> Mulai Ketukan Visualizer`;
      this.btnToggleMetronome.classList.remove("btn-subtle");
      this.btnToggleMetronome.classList.add("btn-primary");
    }
  }

  // Studio Rekam Suara Mandiri
  async startAudioRecord() {
    if (this.btnStartRecord) this.btnStartRecord.disabled = true;
    if (this.btnStopRecord) this.btnStopRecord.disabled = false;
    if (this.recDot) this.recDot.classList.add("active");
    if (this.recStatusText) this.recStatusText.textContent = "Merekam Suara Tilawah...";

    window.audioManager.playTap();
    await window.audioManager.startRecording(this.recordCanvas, (audioUrl) => {
      if (this.userAudioPlayer) {
        this.userAudioPlayer.src = audioUrl;
        this.userAudioPlayer.style.display = "block";
      }
      this.showToast("Rekaman selesai! Anda dapat memutar ulang tilawah Anda.", "success");
    });
  }

  stopAudioRecord() {
    if (this.btnStartRecord) this.btnStartRecord.disabled = false;
    if (this.btnStopRecord) this.btnStopRecord.disabled = true;
    if (this.recDot) this.recDot.classList.remove("active");
    if (this.recStatusText) this.recStatusText.textContent = "Rekaman Disimpan. Silakan Evaluasi Diri.";

    window.audioManager.stopRecording();
    window.audioManager.playTap();
  }

  // ==========================================================================
  // MENU 2: ARENA TAHFIDZ & MUFRADAT
  // ==========================================================================
  startSpeedMatchGame() {
    const currentSet = window.APP_DATA.tahfidz.matchingSets[this.activeMatchSetIndex] || window.APP_DATA.tahfidz.matchingSets[0];
    this.selectedArabCard = null;
    this.selectedIndoCard = null;
    this.matchedPairsCount = 0;
    this.matchTimeLeft = 60;

    if (this.matchScoreElem) this.matchScoreElem.textContent = "0/6";
    if (this.matchTimerElem) this.matchTimerElem.textContent = `${this.matchTimeLeft}s`;

    if (this.matchTimerInterval) clearInterval(this.matchTimerInterval);

    // Shuffle cards
    const arabCards = [...currentSet.pairs];
    const indoCards = [...currentSet.pairs].sort(() => Math.random() - 0.5);

    if (this.matchArabCol) {
      this.matchArabCol.innerHTML = "";
      arabCards.forEach(pair => {
        const card = document.createElement("div");
        card.className = "match-card arabic-card";
        card.textContent = pair.ar;
        card.setAttribute("data-pair-id", pair.id);
        card.addEventListener("click", () => this.handleMatchCardClick(card, "arab", pair));
        this.matchArabCol.appendChild(card);
      });
    }

    if (this.matchIndoCol) {
      this.matchIndoCol.innerHTML = "";
      indoCards.forEach(pair => {
        const card = document.createElement("div");
        card.className = "match-card";
        card.textContent = pair.id_txt;
        card.setAttribute("data-pair-id", pair.id);
        card.addEventListener("click", () => this.handleMatchCardClick(card, "indo", pair));
        this.matchIndoCol.appendChild(card);
      });
    }

    // Start countdown
    this.matchTimerInterval = setInterval(() => {
      this.matchTimeLeft--;
      if (this.matchTimerElem) this.matchTimerElem.textContent = `${this.matchTimeLeft}s`;

      if (this.matchTimeLeft <= 0) {
        clearInterval(this.matchTimerInterval);
        this.showToast("Waktu habis! Coba lagi untuk melatih kecepatan hafalanmu.", "error");
      }
    }, 1000);
  }

  handleMatchCardClick(cardElement, colType, pairData) {
    if (cardElement.classList.contains("matched")) return;
    window.audioManager.playTap();

    if (colType === "arab") {
      if (this.selectedArabCard) this.selectedArabCard.elem.classList.remove("selected");
      this.selectedArabCard = { elem: cardElement, pairId: pairData.id, arText: pairData.ar };
      cardElement.classList.add("selected");
      window.audioManager.speakArabic(pairData.ar);
    } else {
      if (this.selectedIndoCard) this.selectedIndoCard.elem.classList.remove("selected");
      this.selectedIndoCard = { elem: cardElement, pairId: pairData.id };
      cardElement.classList.add("selected");
    }

    // Check if both selected
    if (this.selectedArabCard && this.selectedIndoCard) {
      if (this.selectedArabCard.pairId === this.selectedIndoCard.pairId) {
        // MATCH!
        this.selectedArabCard.elem.classList.add("matched");
        this.selectedIndoCard.elem.classList.add("matched");
        this.selectedArabCard.elem.classList.remove("selected");
        this.selectedIndoCard.elem.classList.remove("selected");

        window.audioManager.playSuccess();
        this.matchedPairsCount++;
        this.addPoints("tahfidz", 15, `Pasangkan Mufradat: ${this.selectedArabCard.arText}`);

        if (this.matchScoreElem) this.matchScoreElem.textContent = `${this.matchedPairsCount}/6`;

        this.selectedArabCard = null;
        this.selectedIndoCard = null;

        if (this.matchedPairsCount === 6) {
          clearInterval(this.matchTimerInterval);
          window.audioManager.playCelebrate();
          const bonus = Math.max(10, Math.floor(this.matchTimeLeft / 2));
          this.addPoints("tahfidz", bonus, `Bonus Kecepatan Matching Game`);
          this.showToast(`🎉 Sempurna! Semua mufradat cocok! +${bonus} Poin Bonus Waktu!`, "gold");
        }
      } else {
        // MISMATCH
        window.audioManager.playError();
        const arabEl = this.selectedArabCard.elem;
        const indoEl = this.selectedIndoCard.elem;

        setTimeout(() => {
          arabEl.classList.remove("selected");
          indoEl.classList.remove("selected");
        }, 350);

        this.selectedArabCard = null;
        this.selectedIndoCard = null;
      }
    }
  }

  // Puzzle Susun Ayat & Matan Hadits
  setupPuzzle() {
    const currentPuzzle = window.APP_DATA.tahfidz.puzzles[this.activePuzzleIndex] || window.APP_DATA.tahfidz.puzzles[0];
    this.puzzleAnswerList = [];
    this.puzzlePoolList = [...currentPuzzle.wordsScrambled];

    if (this.puzzleClueText) this.puzzleClueText.textContent = currentPuzzle.translation;
    this.renderPuzzleBoxes();
  }

  renderPuzzleBoxes() {
    if (!this.puzzleAnswerBox || !this.puzzlePoolBox) return;

    // Render Answer Container (RTL sequence)
    this.puzzleAnswerBox.innerHTML = "";
    if (this.puzzleAnswerList.length === 0) {
      this.puzzleAnswerBox.innerHTML = `<span style="color: var(--text-light); font-size: 0.9rem; font-style: italic;">Klik kata di bawah untuk menyusun di sini...</span>`;
    } else {
      this.puzzleAnswerList.forEach((word, idx) => {
        const chip = document.createElement("button");
        chip.className = "puzzle-chip in-answer";
        chip.textContent = word;
        chip.addEventListener("click", () => {
          // Return word to pool
          this.puzzleAnswerList.splice(idx, 1);
          this.puzzlePoolList.push(word);
          window.audioManager.playTap();
          this.renderPuzzleBoxes();
        });
        this.puzzleAnswerBox.appendChild(chip);
      });
    }

    // Render Pool Container
    this.puzzlePoolBox.innerHTML = "";
    this.puzzlePoolList.forEach((word, idx) => {
      const chip = document.createElement("button");
      chip.className = "puzzle-chip";
      chip.textContent = word;
      chip.addEventListener("click", () => {
        // Move word to answer
        this.puzzlePoolList.splice(idx, 1);
        this.puzzleAnswerList.push(word);
        window.audioManager.speakArabic(word);
        window.audioManager.playTap();
        this.renderPuzzleBoxes();
      });
      this.puzzlePoolBox.appendChild(chip);
    });
  }

  checkPuzzleAnswer() {
    const currentPuzzle = window.APP_DATA.tahfidz.puzzles[this.activePuzzleIndex] || window.APP_DATA.tahfidz.puzzles[0];
    const correctSeq = currentPuzzle.correctSequence;

    if (this.puzzleAnswerList.length !== correctSeq.length) {
      this.showToast("Susun seluruh potongan kata terlebih dahulu sebelum memeriksa.", "error");
      window.audioManager.playError();
      return;
    }

    let isCorrect = true;
    for (let i = 0; i < correctSeq.length; i++) {
      if (this.puzzleAnswerList[i] !== correctSeq[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      window.audioManager.playCelebrate();
      if (currentPuzzle.ayahs && currentPuzzle.ayahs.length) {
        window.audioManager.playQuranAyahs(currentPuzzle.ayahs, {
          title: currentPuzzle.title,
          subtitle: `${currentPuzzle.surahName || ''} • Syaikh Misyari Rasyid`
        });
        this.showToast(`🏆 Tepat Sekali! Murottal Syaikh Misyari Rasyid diputar (+25 Poin)`, "gold");
      } else {
        window.audioManager.speakArabic(correctSeq.join(" "));
        this.showToast(`🏆 Masya Allah, Tepat Sekali! Susunan lafadz benar (+25 Poin)`, "gold");
      }
      this.addPoints("tahfidz", 25, `Puzzle Susun: ${currentPuzzle.title}`);
    } else {
      window.audioManager.playError();
      this.showToast("Susunan kata belum tepat. Perhatikan kaidah urutan artinya.", "error");
    }
  }

  // Live Leaderboard
  renderLeaderboard() {
    if (!this.leaderboardBody) return;
    this.leaderboardBody.innerHTML = "";

    // Merge simulated classmates with active student
    const allStudents = [
      ...window.APP_DATA.tahfidz.classmates,
      {
        name: `${this.student.name} (Kamu)`,
        grade: this.student.grade,
        score: this.student.score,
        avatar: "⭐",
        badge: "Peserta Aktif",
        isUser: true
      }
    ];

    allStudents.sort((a, b) => b.score - a.score);

    allStudents.forEach((st, idx) => {
      const tr = document.createElement("tr");
      if (st.isUser) tr.className = "current-user-row";

      let rankHtml = `<span class="rank-badge">${idx + 1}</span>`;
      if (idx === 0) rankHtml = `<span class="rank-badge rank-1">🥇</span>`;
      else if (idx === 1) rankHtml = `<span class="rank-badge rank-2">🥈</span>`;
      else if (idx === 2) rankHtml = `<span class="rank-badge rank-3">🥉</span>`;

      tr.innerHTML = `
        <td>${rankHtml}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.25rem;">${st.avatar}</span>
            <div>
              <div style="font-weight: 700; color: ${st.isUser ? 'var(--primary-dark)' : 'inherit'};">${st.name}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${st.grade}</div>
            </div>
          </div>
        </td>
        <td><span style="font-size: 0.75rem; background: var(--surface-subtle); padding: 0.2rem 0.5rem; border-radius: 4px;">${st.badge}</span></td>
        <td style="font-weight: 800; color: var(--gold-600); text-align: right;">${st.score} XP</td>
      `;

      this.leaderboardBody.appendChild(tr);
    });
  }

  // ==========================================================================
  // MENU 3: SIMULATOR KONTEKSTUAL AI (HOTS)
  // ==========================================================================
  renderActiveScenario() {
    const scen = window.APP_DATA.scenarios[this.activeScenarioIndex] || window.APP_DATA.scenarios[0];
    this.selectedDecisionKey = null;

    if (this.scenarioDalilRef) this.scenarioDalilRef.textContent = `Landasan Dalil: ${scen.dalilRef}`;
    if (this.scenarioArabicDalil) this.scenarioArabicDalil.textContent = scen.arabicDalil;
    if (this.scenarioNarrative) this.scenarioNarrative.textContent = scen.background;
    if (this.scenarioQuestion) this.scenarioQuestion.textContent = scen.question;

    if (this.argumentTextarea) this.argumentTextarea.value = "";
    if (this.aiResultCard) this.aiResultCard.classList.remove("active");

    // Render Options A, B, C
    if (this.decisionOptionsContainer) {
      this.decisionOptionsContainer.innerHTML = "";
      scen.options.forEach(opt => {
        const optCard = document.createElement("div");
        optCard.className = "option-radio-card";
        optCard.innerHTML = `
          <input type="radio" name="scenarioOption" id="opt_${opt.key}" value="${opt.key}">
          <div class="option-text-content">
            <h5>${opt.title}</h5>
            <p>${opt.text}</p>
          </div>
        `;

        optCard.addEventListener("click", () => {
          this.decisionOptionsContainer.querySelectorAll(".option-radio-card").forEach(c => c.classList.remove("selected"));
          optCard.classList.add("selected");
          optCard.querySelector("input").checked = true;
          this.selectedDecisionKey = opt.key;
          window.audioManager.playTap();
        });

        this.decisionOptionsContainer.appendChild(optCard);
      });
    }
  }

  fillIdealHotsAnswer() {
    const scen = window.APP_DATA.scenarios[this.activeScenarioIndex] || window.APP_DATA.scenarios[0];
    
    // Auto-select Option B (Ideal)
    const optBCard = this.decisionOptionsContainer.querySelector("input[value='B']")?.closest(".option-radio-card");
    if (optBCard) {
      this.decisionOptionsContainer.querySelectorAll(".option-radio-card").forEach(c => c.classList.remove("selected"));
      optBCard.classList.add("selected");
      optBCard.querySelector("input").checked = true;
      this.selectedDecisionKey = "B";
    }

    if (this.argumentTextarea) {
      this.argumentTextarea.value = scen.idealAnswer;
    }

    window.audioManager.playTap();
    this.showToast("✨ Contoh Jawaban Ideal Berbasis Dalil Berhasil Dimuat!", "gold");
  }

  async evaluateHotsAnswer() {
    const scen = window.APP_DATA.scenarios[this.activeScenarioIndex] || window.APP_DATA.scenarios[0];
    const argumentText = this.argumentTextarea ? this.argumentTextarea.value.trim() : "";

    if (!this.selectedDecisionKey) {
      this.showToast("Silakan pilih opsi keputusan tindakan (A, B, atau C) terlebih dahulu.", "error");
      window.audioManager.playError();
      return;
    }

    if (argumentText.length < 15) {
      this.showToast("Tuliskan argumen dan dalil pendukung lebih lengkap (minimal 15 karakter).", "error");
      window.audioManager.playError();
      return;
    }

    // Set loading state
    if (this.btnSubmitAi) {
      this.btnSubmitAi.disabled = true;
      this.btnSubmitAi.innerHTML = `<span>⏳</span> Menganalisis dengan AI...`;
    }

    const apiKey = localStorage.getItem("gemini_api_key")?.trim();

    try {
      let evaluationResult = null;

      if (apiKey) {
        // Attempt Gemini API call
        try {
          evaluationResult = await this.callGeminiApi(apiKey, scen, this.selectedDecisionKey, argumentText);
        } catch (apiErr) {
          console.warn("Gemini API call failed, falling back to smart heuristic evaluator:", apiErr);
          evaluationResult = this.runSmartHeuristicEvaluator(scen, this.selectedDecisionKey, argumentText);
        }
      } else {
        // Smart Heuristic Evaluator fallback
        await new Promise(r => setTimeout(r, 700)); // Natural thinking delay
        evaluationResult = this.runSmartHeuristicEvaluator(scen, this.selectedDecisionKey, argumentText);
      }

      this.displayAiEvaluationResult(evaluationResult);
    } catch (e) {
      console.error(e);
      this.showToast("Terjadi kendala analisis, mencoba evaluasi cerdas lokal...", "warning");
      const fallback = this.runSmartHeuristicEvaluator(scen, this.selectedDecisionKey, argumentText);
      this.displayAiEvaluationResult(fallback);
    } finally {
      if (this.btnSubmitAi) {
        this.btnSubmitAi.disabled = false;
        this.btnSubmitAi.innerHTML = `<span>🤖</span> Kirim & Analisis dengan AI`;
      }
    }
  }

  // Google Gemini API Integration (gemini-2.5-flash)
  async callGeminiApi(apiKey, scenario, decisionKey, userArgument) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `Anda adalah seorang Ustadz Penilai dan Pakar Kurikulum Al-Qur'an Hadits MTs (berdasarkan KMA No. 183 Tahun 2019).
Evaluasilah respons penalaran HOTS dan sikap afektif siswa MTs terhadap studi kasus nyata berikut:
Skenario: ${scenario.title} (${scenario.dalilRef})
Pilihan Keputusan Siswa: Pilihan ${decisionKey}
Argumen & Dalil Siswa: "${userArgument}"

Berikan evaluasi dalam format JSON murni tanpa markdown blok kode tambahan dengan skema:
{
  "score": number (0-100),
  "attitudeEvaluation": string (penilaian sikap siswa: Sangat Baik / Baik / Cukup),
  "dalilEvaluation": string (analisis kekuatan dalil dan pemahamannya terhadap ayat/hadits),
  "hotsReflection": string (analisis kedalaman refleksi penalaran tingkat tinggi/HOTS),
  "ustadzFeedback": string (pesan apresiasi dan bimbingan akhlak dari Ustadz AI)
}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error("Empty response from Gemini");

    // Clean JSON markdown if wrapped
    const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson);
  }

  // Smart Heuristic Evaluator (Guaranteed 100% offline & foolproof fallback)
  runSmartHeuristicEvaluator(scenario, decisionKey, userArgument) {
    let score = 0;
    const lowerArg = userArgument.toLowerCase();

    // 1. Decision choice evaluation (Option B is ideal)
    if (decisionKey === "B") {
      score += 50;
    } else {
      score += 20;
    }

    // 2. Argument length & depth
    if (userArgument.length > 250) score += 20;
    else if (userArgument.length > 100) score += 12;
    else score += 6;

    // 3. Keyword matching based on scenario dalil criteria
    let matchedKeywords = 0;
    scenario.keywords.forEach(kw => {
      if (lowerArg.includes(kw.toLowerCase())) {
        matchedKeywords++;
      }
    });

    score += Math.min(30, matchedKeywords * 6);
    score = Math.min(100, Math.max(40, score));

    // Dynamic feedback generation
    let attitudeEvaluation = "Baik";
    let dalilEvaluation = "Relevan dan Cukup Mendalam";
    let hotsReflection = "Menunjukkan Penalaran Konseptual yang Baik";
    let ustadzFeedback = "Alhamdulillah, pemahaman antum terhadap kandungan ayat/hadits sudah terarah. Terus amalkan nilai kemuliaan dan kepedulian sosial ini dalam keseharian madrasah.";

    if (score >= 85) {
      attitudeEvaluation = "Sangat Baik (Mumtaz - Berkarakter Qur'ani)";
      dalilEvaluation = `Sangat Kuat: Mengaitkan hikmah ${scenario.dalilRef} secara tepat dan kontekstual.`;
      hotsReflection = "Penalaran HOTS Unggul: Mampu membedakan orientasi duniawi sesaat dengan nilai ukhrawi serta keadilan sosial.";
      ustadzFeedback = `Barakallahu fiik, ananda! Argumen antum mencerminkan akhlak mulia dan penalaran kritis yang matang. Pilihan antum selaras dengan ruh KMA 183 Tahun 2019.`;
    } else if (score < 70) {
      attitudeEvaluation = "Cukup (Perlu Bimbingan Penguatan Sikap)";
      dalilEvaluation = `Masih Perlu Penguatan: Hubungkan argumen dengan teks firman Allah dalam ${scenario.dalilRef}.`;
      hotsReflection = "Perlu memperdalam refleksi agar tidak terpancing keputusan instan yang pasif atau konsumtif.";
      ustadzFeedback = `Terus semangat belajar, ananda. Coba baca kembali terjemahan dan asbabun nuzul dalil di atas agar keputusannya semakin mantap.`;
    }

    return {
      score,
      attitudeEvaluation,
      dalilEvaluation,
      hotsReflection,
      ustadzFeedback
    };
  }

  displayAiEvaluationResult(result) {
    if (!this.aiResultCard) return;

    const scoreNum = document.getElementById("aiScoreNum");
    const evalAttitude = document.getElementById("evalAttitude");
    const evalDalil = document.getElementById("evalDalil");
    const evalHots = document.getElementById("evalHots");
    const ustadzNotes = document.getElementById("ustadzNotes");

    if (scoreNum) scoreNum.textContent = result.score;
    if (evalAttitude) evalAttitude.textContent = result.attitudeEvaluation;
    if (evalDalil) evalDalil.textContent = result.dalilEvaluation;
    if (evalHots) evalHots.textContent = result.hotsReflection;
    if (ustadzNotes) ustadzNotes.textContent = `"${result.ustadzFeedback}"`;

    this.aiResultCard.classList.add("active");
    this.aiResultCard.scrollIntoView({ behavior: 'smooth' });

    window.audioManager.playCelebrate();
    this.addPoints("hots", result.score, `Studi Kasus HOTS: ${window.APP_DATA.scenarios[this.activeScenarioIndex].title}`);
    this.showToast(`✨ Evaluasi AI Selesai! Skor HOTS: ${result.score}/100`, "gold");
  }

  // ==========================================================================
  // MENU 4: PANEL GURU & REKAP NILAI
  // ==========================================================================
  renderTeacherPanel() {
    if (this.teacherStudentName) this.teacherStudentName.textContent = this.student.name;
    if (this.teacherStudentClass) this.teacherStudentClass.textContent = this.student.grade;
    if (this.teacherTotalScore) this.teacherTotalScore.textContent = `${this.student.score} XP`;

    // Predikat calculation
    let predikat = "Jayyid (Baik)";
    if (this.student.score >= 250) predikat = "Mumtaz (Sangat Baik / Istimewa)";
    else if (this.student.score >= 150) predikat = "Jayyid Jiddan (Amat Baik)";
    else if (this.student.score < 80) predikat = "Maqbul (Perlu Bimbingan)";

    if (this.teacherPredikat) this.teacherPredikat.textContent = predikat;

    if (this.teacherTajwidScore) this.teacherTajwidScore.textContent = `${this.student.tajwidScore} Pts`;
    if (this.teacherTahfidzScore) this.teacherTahfidzScore.textContent = `${this.student.tahfidzScore} Pts`;
    if (this.teacherHotsScore) this.teacherHotsScore.textContent = `${this.student.hotsScore} Pts`;

    // Render Assessment Log Table
    if (this.teacherAssessmentsBody) {
      this.teacherAssessmentsBody.innerHTML = "";
      if (this.student.assessments.length === 0) {
        this.teacherAssessmentsBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Belum ada rekap aktivitas siswa.</td></tr>`;
      } else {
        this.student.assessments.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><div style="font-weight: 700;">${item.module}</div><div style="font-size: 0.72rem; color: var(--text-muted);">${item.date}</div></td>
            <td><span style="font-weight: 700; color: var(--primary);">${item.score} Pts</span></td>
            <td><span style="font-size: 0.8rem; color: var(--text-muted);">${item.notes}</span></td>
          `;
          this.teacherAssessmentsBody.appendChild(tr);
        });
      }
    }
  }

  // Export to CSV / Excel
  exportCsv() {
    const bom = "\uFEFF"; // UTF-8 BOM for Microsoft Excel in Windows
    let csv = `${bom}No,Nama Siswa,Kelas,Modul / Aktivitas,Poin,Waktu Asesmen,Keterangan\n`;

    this.student.assessments.forEach((item, idx) => {
      csv += `"${idx + 1}","${this.student.name}","${this.student.grade}","${item.module}","${item.score}","${item.date}","${item.notes}"\n`;
    });

    // Summary line
    csv += `\n"TOTAL","${this.student.name}","${this.student.grade}","Akumulasi Nilai","${this.student.score}","","Predikat: ${this.teacherPredikat ? this.teacherPredikat.textContent : 'Mumtaz'}"\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Nilai_AlQuran_Hadits_${this.student.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("📄 File Rekap CSV/Excel berhasil diunduh!", "success");
  }

  // API Status & Connection Test
  updateApiStatus() {
    const key = localStorage.getItem("gemini_api_key");
    if (this.apiKeyInput && key) this.apiKeyInput.value = key;

    if (this.apiStatusBadge) {
      if (key && key.length > 10) {
        this.apiStatusBadge.className = "api-status-badge api-status-live";
        this.apiStatusBadge.innerHTML = `<span>🟢</span> Mode Live: Gemini 2.5 Flash Aktif`;
      } else {
        this.apiStatusBadge.className = "api-status-badge api-status-heuristic";
        this.apiStatusBadge.innerHTML = `<span>⚡</span> Mode Mandiri: Smart Heuristic Fallback Aktif (100% Offline Ready)`;
      }
    }
  }

  async testGeminiConnection() {
    const key = this.apiKeyInput ? this.apiKeyInput.value.trim() : "";
    if (!key) {
      this.showToast("Masukkan Google Gemini API Key terlebih dahulu.", "error");
      return;
    }

    this.showToast("Menguji koneksi ke endpoint Google Gemini...", "warning");
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Tes koneksi. Jawab 'OK'." }] }]
        })
      });

      if (res.ok) {
        localStorage.setItem("gemini_api_key", key);
        this.updateApiStatus();
        window.audioManager.playSuccess();
        this.showToast("✅ Berhasil! Koneksi Google Gemini API 2.5 Flash Valid!", "success");
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (e) {
      this.showToast("Koneksi gagal atau API Key tidak valid. Sistem tetap siap menggunakan Smart Heuristic Fallback.", "error");
    }
  }

  // Modals
  openCurriculumModal() {
    if (this.curriculumModal) {
      this.renderCurriculumModalContent();
      this.curriculumModal.classList.add("active");
    }
  }

  openProfileModal() {
    if (this.profileModal) {
      if (this.modalInputName) this.modalInputName.value = this.student.name;
      if (this.modalInputClass) this.modalInputClass.value = this.student.grade;
      this.profileModal.classList.add("active");
    }
  }

  closeModals() {
    if (this.curriculumModal) this.curriculumModal.classList.remove("active");
    if (this.profileModal) this.profileModal.classList.remove("active");
  }

  renderCurriculumModalContent() {
    const modalBody = document.getElementById("curriculumModalBody");
    if (!modalBody) return;

    let html = `<div class="curriculum-accordion">`;
    window.APP_DATA.curriculum.levels.forEach(lvl => {
      html += `
        <div class="curriculum-card">
          <h4 class="curriculum-grade-title">📌 ${lvl.grade} MTs</h4>
      `;
      lvl.semesters.forEach(sem => {
        html += `
          <div class="ki-kd-block">
            <h6>${sem.semester}</h6>
        `;
        if (sem.ki) {
          html += `<div style="font-weight: 700; font-size: 0.75rem; margin-bottom: 0.2rem; color: var(--primary);">Kompetensi Inti (KI):</div><ul>`;
          sem.ki.forEach(k => html += `<li>${k}</li>`);
          html += `</ul>`;
        }
        if (sem.kd) {
          html += `<div style="font-weight: 700; font-size: 0.75rem; margin-top: 0.5rem; margin-bottom: 0.2rem; color: var(--gold-700);">Kompetensi Dasar (KD):</div><ul>`;
          sem.kd.forEach(k => html += `<li>${k}</li>`);
          html += `</ul>`;
        }
        html += `</div>`;
      });
      html += `</div>`;
    });
    html += `</div>`;

    modalBody.innerHTML = html;
  }

  // Toast Notification
  showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "🔔";
    if (type === "success") icon = "✅";
    else if (type === "error") icon = "⚠️";
    else if (type === "gold") icon = "⭐";

    toast.innerHTML = `<span style="font-size: 1.15rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================================================
  // SYAIKH MISYARI RASYID QURAN AUDIO HELPERS
  // ==========================================================================

  playSurahAudio(surahId) {
    const list = window.APP_DATA.surahList || [];
    const found = list.find(s => s.id === surahId);
    if (found && found.ayahs && found.ayahs.length) {
      window.audioManager.playQuranAyahs(found.ayahs, {
        title: found.title,
        subtitle: `${found.subtitle} • Syaikh Misyari Rasyid`
      });
      this.showToast(`🎙️ Memutar Murottal Syaikh Misyari Rasyid: ${found.title}`, "gold");
    }
  }

  handleQuranAudioStateChange(detail) {
    const globalPlayer = document.getElementById("globalAudioPlayer");
    const gapTrackTitle = document.getElementById("gapTrackTitle");
    const gapReciterName = document.getElementById("gapReciterName");
    const gapBtnPlayPause = document.getElementById("gapBtnPlayPause");
    const gapCurrentTime = document.getElementById("gapCurrentTime");
    const gapTotalTime = document.getElementById("gapTotalTime");
    const gapProgressFill = document.getElementById("gapProgressFill");

    const btnPlayFullVerse = document.getElementById("btnPlayFullVerse");
    const playIconSpan = document.getElementById("playIconSpan");
    const playTextSpan = document.getElementById("playTextSpan");

    if (detail.event === "play" || detail.event === "trackchange") {
      if (globalPlayer) globalPlayer.style.display = "flex";
      if (gapBtnPlayPause) gapBtnPlayPause.textContent = "⏸️";

      if (detail.track) {
        if (gapTrackTitle) gapTrackTitle.textContent = detail.track.title || "Lafadz Al-Qur'an";
        if (gapReciterName) {
          const ayahBadge = detail.playlistLength > 1 ? ` (Ayat ${detail.playlistIndex + 1}/${detail.playlistLength})` : "";
          gapReciterName.textContent = `${detail.reciter ? detail.reciter.name : "Syaikh Misyari Rasyid"}${ayahBadge}`;
        }
      }

      if (btnPlayFullVerse) btnPlayFullVerse.classList.add("playing");
      if (playIconSpan) playIconSpan.textContent = "⏸️";
      if (playTextSpan) playTextSpan.textContent = "Jeda Tartil";

      // Highlight active surah button
      document.querySelectorAll(".btn-surah-play").forEach(btn => btn.classList.remove("playing"));
    } else if (detail.event === "pause") {
      if (gapBtnPlayPause) gapBtnPlayPause.textContent = "▶";
      if (btnPlayFullVerse) btnPlayFullVerse.classList.remove("playing");
      if (playIconSpan) playIconSpan.textContent = "▶";
      if (playTextSpan) playTextSpan.textContent = "Lanjutkan Tartil";
    } else if (detail.event === "timeupdate") {
      const cur = detail.currentTime || 0;
      const dur = detail.duration || 0;
      if (gapCurrentTime) gapCurrentTime.textContent = this.formatTime(cur);
      if (gapTotalTime && dur > 0) gapTotalTime.textContent = this.formatTime(dur);
      if (gapProgressFill && dur > 0) {
        const pct = Math.min(100, (cur / dur) * 100);
        gapProgressFill.style.width = `${pct}%`;
      }
    } else if (detail.event === "ended" || detail.event === "stop") {
      if (gapBtnPlayPause) gapBtnPlayPause.textContent = "▶";
      if (gapProgressFill) gapProgressFill.style.width = "0%";
      if (gapCurrentTime) gapCurrentTime.textContent = "00:00";
      if (btnPlayFullVerse) btnPlayFullVerse.classList.remove("playing");
      if (playIconSpan) playIconSpan.textContent = "▶";
      if (playTextSpan) playTextSpan.textContent = "Tartil Misyari Rasyid";

      if (detail.event === "stop" && globalPlayer) {
        globalPlayer.style.display = "none";
      }

      document.querySelectorAll(".btn-surah-play").forEach(btn => btn.classList.remove("playing"));
    } else if (detail.event === "error") {
      this.showToast("Gagal memutar audio online. Menyiapkan alternatif suara sistem...", "error");
      if (btnPlayFullVerse) btnPlayFullVerse.classList.remove("playing");
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// Instantiate App
window.quranApp = new QuranApp();
