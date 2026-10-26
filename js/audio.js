// Audio Engine & Web Speech API & Sound Synthesizer & Voice Recorder
// Enhanced with Sheikh Mishary Rashid Alafasy (Syaikh Misyari Rasyid Al-Afasy) Quran MP3 Audio

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = window.speechSynthesis;
    this.arabicVoice = null;
    this.initAudioContext();
    this.initSpeechVoices();

    // Reciter Profile: Sheikh Mishary Rashid Alafasy
    this.reciter = {
      id: "alafasy",
      name: "Syaikh Misyari Rasyid Al-Afasy",
      title: "Qari Internasional (Kuwait)",
      avatar: "🎙️",
      baseUrl: "https://everyayah.com/data/Alafasy_128kbps/"
    };

    // Dedicated Quran HTML5 Audio Player
    this.quranAudio = new Audio();
    this.quranAudio.preload = "auto";
    this.isQuranPlaying = false;
    this.currentTrack = null;
    this.playlist = [];
    this.playlistIndex = 0;
    this.repeatMode = false;

    this.initQuranAudioListeners();

    // Recorder state
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordedAudioUrl = null;
    this.isRecording = false;
    this.animationFrameId = null;
    this.analyser = null;
    this.microphoneStream = null;
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resumeAudioContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initSpeechVoices() {
    if (!this.speechSynth) return;
    const findVoice = () => {
      const voices = this.speechSynth.getVoices();
      // Look for Arabic voice
      this.arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang === 'ar-SA' || v.name.toLowerCase().includes('arabic')) || null;
    };

    findVoice();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = findVoice;
    }
  }

  // ==========================================================================
  // SYAIKH MISYARI RASYID AL-AFASY QURAN AUDIO RECITATION SYSTEM
  // ==========================================================================

  initQuranAudioListeners() {
    this.quranAudio.addEventListener("play", () => {
      this.isQuranPlaying = true;
      this.emitQuranAudioEvent("play");
    });

    this.quranAudio.addEventListener("pause", () => {
      this.isQuranPlaying = false;
      this.emitQuranAudioEvent("pause");
    });

    this.quranAudio.addEventListener("timeupdate", () => {
      this.emitQuranAudioEvent("timeupdate", {
        currentTime: this.quranAudio.currentTime || 0,
        duration: this.quranAudio.duration || 0
      });
    });

    this.quranAudio.addEventListener("ended", () => {
      if (this.playlistIndex + 1 < this.playlist.length) {
        // Advance to next Ayah in sequence
        this.playlistIndex++;
        this.playCurrentPlaylistTrack();
      } else if (this.repeatMode) {
        this.playlistIndex = 0;
        this.playCurrentPlaylistTrack();
      } else {
        this.isQuranPlaying = false;
        this.emitQuranAudioEvent("ended");
      }
    });

    this.quranAudio.addEventListener("error", (err) => {
      console.warn("Quran audio load/play error:", err);
      this.isQuranPlaying = false;
      this.emitQuranAudioEvent("error", { error: err });
    });
  }

  getAyahUrl(surah, ayah) {
    const s = String(surah).padStart(3, "0");
    const a = String(ayah).padStart(3, "0");
    return `${this.reciter.baseUrl}${s}${a}.mp3`;
  }

  // Aliases for compatibility
  getAlafasyAyahUrl(surah, ayah) {
    return this.getAyahUrl(surah, ayah);
  }

  getSudaisAyahUrl(surah, ayah) {
    return this.getAyahUrl(surah, ayah);
  }

  // Play a sequence of Ayahs recited by Sheikh Mishary Rashid Alafasy
  playQuranAyahs(ayahList, meta = {}) {
    if (!ayahList || !ayahList.length) return;

    this.resumeAudioContext();
    if (this.speechSynth) this.speechSynth.cancel();

    this.playlist = ayahList.map((item, idx) => ({
      surah: item.surah,
      ayah: item.ayah,
      url: this.getAyahUrl(item.surah, item.ayah),
      title: meta.title || `QS. ${item.surah}:${item.ayah}`,
      subtitle: meta.subtitle || `Ayat ${item.ayah}`,
      reciterName: this.reciter.name,
      index: idx
    }));

    this.playlistIndex = 0;
    this.playCurrentPlaylistTrack();
  }

  // Aliases for compatibility
  playAlafasyAyahs(ayahList, meta = {}) {
    return this.playQuranAyahs(ayahList, meta);
  }

  playSudaisAyahs(ayahList, meta = {}) {
    return this.playQuranAyahs(ayahList, meta);
  }

  // Play a single Ayah recited by Sheikh Mishary Rashid Alafasy
  playQuranAyah(surah, ayah, meta = {}) {
    this.playQuranAyahs([{ surah, ayah }], {
      title: meta.title || `QS. ${surah}:${ayah}`,
      subtitle: meta.subtitle || `Ayat ${ayah}`,
      ...meta
    });
  }

  // Aliases for compatibility
  playAlafasyAyah(surah, ayah, meta = {}) {
    return this.playQuranAyah(surah, ayah, meta);
  }

  playSudaisAyah(surah, ayah, meta = {}) {
    return this.playQuranAyah(surah, ayah, meta);
  }

  playCurrentPlaylistTrack() {
    if (!this.playlist.length || this.playlistIndex >= this.playlist.length) return;

    const track = this.playlist[this.playlistIndex];
    this.currentTrack = track;
    this.quranAudio.src = track.url;
    
    const playPromise = this.quranAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isQuranPlaying = true;
          this.emitQuranAudioEvent("trackchange", { track, index: this.playlistIndex });
        })
        .catch(err => {
          console.warn("Autoplay/audio play error:", err);
          // If network failed, notify user
          this.emitQuranAudioEvent("error", { error: err, track });
        });
    }
  }

  toggleQuranPlay() {
    if (!this.currentTrack) return;
    if (this.quranAudio.paused) {
      this.quranAudio.play();
    } else {
      this.quranAudio.pause();
    }
  }

  stopQuranAudio() {
    this.quranAudio.pause();
    this.quranAudio.currentTime = 0;
    this.isQuranPlaying = false;
    this.playlist = [];
    this.playlistIndex = 0;
    this.currentTrack = null;
    this.emitQuranAudioEvent("stop");
  }

  seekQuranAudio(percent) {
    if (this.quranAudio.duration && isFinite(this.quranAudio.duration)) {
      this.quranAudio.currentTime = (percent / 100) * this.quranAudio.duration;
    }
  }

  toggleRepeat() {
    this.repeatMode = !this.repeatMode;
    this.emitQuranAudioEvent("repeat_toggle", { repeat: this.repeatMode });
    return this.repeatMode;
  }

  emitQuranAudioEvent(eventName, extra = {}) {
    const detail = {
      event: eventName,
      isPlaying: this.isQuranPlaying,
      track: this.currentTrack,
      playlistIndex: this.playlistIndex,
      playlistLength: this.playlist.length,
      repeat: this.repeatMode,
      reciter: this.reciter,
      ...extra
    };
    window.dispatchEvent(new CustomEvent("quran-audio-event", { detail }));
  }

  // ==========================================================================
  // WEB SPEECH API & FALLBACKS
  // ==========================================================================

  // Speak Arabic text using Web Speech API (Used for single isolated words/hadits)
  speakArabic(text, rate = 0.85) {
    if (!this.speechSynth) return;
    this.resumeAudioContext();

    try {
      this.speechSynth.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = rate; // Tartil slightly measured pace
      utterance.pitch = 1.0;

      if (this.arabicVoice) {
        utterance.voice = this.arabicVoice;
      }

      this.speechSynth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      // Fallback tone
      this.playTone(440, 'sine', 0.2);
    }
  }

  // Synthesize custom tones via Web Audio API (Zero external MP3 dependencies)
  playTone(frequency, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.audioCtx) return;
    this.resumeAudioContext();

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

    gainNode.gain.setValueAtTime(gainValue, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }

  // Success chime
  playSuccess() {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const now = this.audioCtx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  // Error buzz
  playError() {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Button tap
  playTap() {
    this.playTone(800, 'sine', 0.06, 0.08);
  }

  // Metronome tick for ketukan visualizer
  playMetronomeTick(isAccent = false) {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = isAccent ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 750, now);

    gain.gain.setValueAtTime(isAccent ? 0.25 : 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Celebrate fanfare
  playCelebrate() {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.3, 0.15);
      }, i * 90);
    });
  }

  // Studio Rekam Suara (MediaRecorder + Web Audio Waveform Visualizer)
  async startRecording(canvasElement, onDataAvailableCallback) {
    if (this.isRecording) return;
    this.audioChunks = [];
    this.resumeAudioContext();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.microphoneStream = stream;

      // Audio Analyser Setup for visualizer
      if (this.audioCtx) {
        const source = this.audioCtx.createMediaStreamSource(stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 256;
        source.connect(this.analyser);

        if (canvasElement) {
          this.drawWaveform(canvasElement);
        }
      }

      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.recordedAudioUrl = URL.createObjectURL(audioBlob);
        if (onDataAvailableCallback) {
          onDataAvailableCallback(this.recordedAudioUrl, audioBlob);
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      return true;
    } catch (err) {
      console.warn("Microphone access failed or denied:", err);
      // Simulated recording for presentation environments where mic is blocked
      this.isRecording = true;
      if (canvasElement) {
        this.drawSimulatedWaveform(canvasElement);
      }
      return false; // Indicates simulated fallback
    }
  }

  stopRecording() {
    if (!this.isRecording) return;
    this.isRecording = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach(track => track.stop());
      this.microphoneStream = null;
    }
  }

  // Draw real microphone waveform on canvas
  drawWaveform(canvas) {
    if (!canvas || !this.analyser) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!this.isRecording) {
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = '#10b981';
        ctx.stroke();
        return;
      }

      this.animationFrameId = requestAnimationFrame(render);
      this.analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#f59e0b'; // Gold accent
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    render();
  }

  // Simulated visual wave fallback if hardware mic is restricted
  drawSimulatedWaveform(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      if (!this.isRecording) {
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      this.animationFrameId = requestAnimationFrame(render);
      phase += 0.15;

      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();

      const width = canvas.width;
      const height = canvas.height;

      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.05 + phase) * 18 * Math.sin(x * 0.02 + phase * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    render();
  }
}

// Instantiate globally
window.audioManager = new AudioManager();
