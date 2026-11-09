/**
 * Web Audio API based romantic ambient music and sound synthesizer
 * Provides zero-external-dependency soothing romantic chords, sound effects, and voice playback.
 */

class RomanticAudioController {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicVolume = 0.35;
  private sfxVolume = 0.5;
  private loopInterval: any = null;
  private musicGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted = false;
  private currentStep = 0;
  private activeVoices: AudioNode[] = [];

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
  }

  // Romantic ambient chord progressions (Fmaj7 - Cmaj7 - Dm7 - Am7)
  private playRomanticChord() {
    if (!this.ctx || !this.musicGain || !this.isMusicPlaying) return;

    // Frequencies for soothing romantic progression (Hz)
    // 0: Fmaj9 (F3, A3, C4, E4, G4)
    // 1: Cmaj7 (C3, G3, B3, E4, G4)
    // 2: Dm9 (D3, F3, A3, C4, E4)
    // 3: Am7 / G (A2, E3, G3, C4, E4)
    const progressions = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj7
      [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
      [110.00, 164.81, 196.00, 261.63, 329.63], // Am7
    ];

    const chord = progressions[this.currentStep % progressions.length];
    this.currentStep++;

    const now = this.ctx.currentTime;
    const duration = 4.8; // seconds per chord

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.musicGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft warm sine/triangle blend
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for warm, dreamy analog piano-pad feel
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, now);
      filter.Q.setValueAtTime(1.0, now);

      // Gentle attack and release envelope
      const baseGain = 0.045 / chord.length;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(baseGain, now + 1.2 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + duration + 0.1);

      this.activeVoices.push(osc);
    });
  }

  public startRomanticMusic() {
    this.initContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.playRomanticChord();
    this.loopInterval = setInterval(() => {
      if (this.isMusicPlaying) {
        this.playRomanticChord();
      }
    }, 4500);
  }

  public stopRomanticMusic() {
    this.isMusicPlaying = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
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
    utterance.rate = 0.88; // Gentle, intimate, unhurried pace
    utterance.pitch = 0.95; // Warm, soothing tone

    // Try finding an English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Male') || v.name.includes('Google'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

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

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const romanticAudio = new RomanticAudioController();
