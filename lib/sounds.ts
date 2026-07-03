export class SoundManager {
  private audioContext: AudioContext | null = null;
  private volume: number = 0.7;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private createOscillator(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  playButtonHover() {
    this.createOscillator(400, 0.1, 'sine');
  }

  playButtonClick() {
    this.createOscillator(600, 0.15, 'square');
    setTimeout(() => this.createOscillator(800, 0.1, 'square'), 75);
  }

  playSuccess() {
    this.createOscillator(800, 0.15, 'sine');
    setTimeout(() => this.createOscillator(1000, 0.15, 'sine'), 100);
    setTimeout(() => this.createOscillator(1200, 0.15, 'sine'), 200);
  }

  playError() {
    this.createOscillator(300, 0.2, 'sine');
    setTimeout(() => this.createOscillator(200, 0.2, 'sine'), 150);
  }

  playNotification() {
    this.createOscillator(700, 0.1, 'sine');
    setTimeout(() => this.createOscillator(900, 0.1, 'sine'), 100);
  }

  playGameStart() {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      setTimeout(() => this.createOscillator(freq, 0.2, 'sine'), index * 150);
    });
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }
}

export const soundManager = new SoundManager();
