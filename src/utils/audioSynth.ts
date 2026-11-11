/**
 * Plays Nyasha David — Ndoda, plus sound effects and voice playback.
 */

class RomanticAudioController {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicVolume = 0.35;
  private sfxVolume = 0.5;
  private musicGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted = false;
  private trackFrame: HTMLIFrameElement | null = null;
  private holdMusic = false;
  // Nyasha David — Ndoda (Official Audio)
  private readonly trackId = 'cHkEfoeGIKk';

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getContext(): AudioContext | null {
    this.initContext();
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime, 0.05);
    }
    this.postTrack(this.isMuted ? 'mute' : 'unMute');
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public setMusicVolume(val: number) {
    this.musicVolume = Math.max(0, Math.min(1, val));
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(this.musicVolume, this.ctx.currentTime, 0.05);
    }
    this.postTrack('setVolume', [Math.round(this.musicVolume * 100)]);
  }

  private postTrack(func: string, args: unknown[] = []) {
    this.trackFrame?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    );
  }

  private mountTrack() {
    this.unmountTrack();
    const frame = document.createElement('iframe');
    frame.title = 'Nyasha David - Ndoda';
    frame.allow = 'autoplay; encrypted-media';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.style.cssText =
      'position:fixed;width:1px;height:1px;left:-9999px;top:0;border:0;opacity:0;pointer-events:none';
    const params = new URLSearchParams({
      autoplay: '1',
      loop: '1',
      playlist: this.trackId,
      controls: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
    });
    if (this.isMuted) params.set('mute', '1');
    frame.src = `https://www.youtube.com/embed/${this.trackId}?${params.toString()}`;
    frame.addEventListener('load', () => this.postTrack('playVideo'));
    document.body.appendChild(frame);
    this.trackFrame = frame;
  }

  private unmountTrack() {
    document.querySelectorAll('iframe[title="Nyasha David - Ndoda"]').forEach((frame) => {
      frame.remove();
    });
    this.trackFrame = null;
  }

  public startRomanticMusic() {
    if (this.holdMusic) return;
    this.initContext();
    if (this.isMusicPlaying && this.trackFrame) {
      this.postTrack('playVideo');
      return;
    }
    this.isMusicPlaying = true;
    this.mountTrack();
  }

  public holdMusicForVoice(hold: boolean) {
    this.holdMusic = hold;
    if (hold) this.stopRomanticMusic();
    else this.startRomanticMusic();
  }

  public stopRomanticMusic() {
    this.isMusicPlaying = false;
    this.unmountTrack();
  }

  public toggleRomanticMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopRomanticMusic();
    } else {
      this.startRomanticMusic();
    }
    return this.isMusicPlaying;
  }

  // Sound Effects

  // Heart click / tap
  public playHeartSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Gentle cheerful sweet harp chime
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

    gain.gain.setValueAtTime(0.12 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Card Flip Chime
  public playCardFlip() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.08 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  // Wax seal pop / Letter unfold
  public playWaxSealSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Layer 1: low thud
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(140, now);
    thud.frequency.exponentialRampToValueAtTime(45, now + 0.15);
    thudGain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    thud.connect(thudGain);
    thudGain.connect(this.masterGain);
    thud.start(now);
    thud.stop(now + 0.22);

    // Layer 2: sweet chime
    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(587.33, now + 0.05); // D5
    chime.frequency.exponentialRampToValueAtTime(880, now + 0.25);
    chimeGain.gain.setValueAtTime(0.12 * this.sfxVolume, now + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    chime.connect(chimeGain);
    chimeGain.connect(this.masterGain);
    chime.start(now + 0.05);
    chime.stop(now + 0.52);
  }

  // Quiz correct chime
  public playSuccessChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);

      gain.gain.setValueAtTime(0.1 * this.sfxVolume, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.45);
    });
  }

  // Heartbeat sound for Virtual Hug
  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const playThump = (timeOffset: number, freq: number, vol: number) => {
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime + timeOffset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.16);

      gain.gain.setValueAtTime(vol * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.2);
    };

    // Lub-Dub
    playThump(0, 95, 0.35);
    playThump(0.18, 80, 0.25);
  }

  // Virtual Kiss sound
  public playKissSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.14);

    gain.gain.setValueAtTime(0.18 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Spoken voice using Web Speech API with intimate vocal warmth
  public speakRomanticText(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!('speechSynthesis' in window)) {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, 3000);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.72;
    const voice = this.pickWalterVoice(window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      if (onStart) onStart();
    };
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  private pickWalterVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
    const maleHints = ['male', 'daniel', 'david', 'guy', 'james', 'george', 'brian', 'alex', 'fred', 'rishi', 'arthur', 'thomas'];
    const femaleHints = ['female', 'samantha', 'victoria', 'zira', 'susan', 'karen', 'moira', 'fiona', 'tessa', 'veena', 'sara', 'zira'];
    const english = voices.filter((voice) => voice.lang.toLowerCase().startsWith('en'));
    const pool = english.length > 0 ? english : voices;
    return (
      pool.find((voice) => maleHints.some((hint) => voice.name.toLowerCase().includes(hint))) ||
      pool.find((voice) => !femaleHints.some((hint) => voice.name.toLowerCase().includes(hint))) ||
      pool[0]
    );
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const romanticAudio = new RomanticAudioController();
