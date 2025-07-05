export default class Osc {
  static DEFAULT_ENVELOPE = {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.6,
    release: 0.1,
  };

  static DEFAULT_CONFIG = {
    easing: 0.005,
    disconnectDelay: 10000,
    minFrequency: 20,
    maxFrequency: 20000,
  };

  constructor(audioContext, type, frequency, detune, envelope, connection) {
    this.validateInputs(audioContext, type, frequency, detune, connection);
    
    this.actx = audioContext;
    this.envelope = { ...Osc.DEFAULT_ENVELOPE, ...envelope };
    this.config = { ...Osc.DEFAULT_CONFIG };
    this.easing = this.config.easing;
    
    this.isPlaying = false;
    this.isReleasing = false;
    this.disconnectTimeout = null;
    this.startTime = null;
    
    this.initializeAudioNodes(type, frequency, detune, connection);
    this.start();
  }

  validateInputs(audioContext, type, frequency, detune, connection) {
    if (!audioContext || typeof audioContext.createOscillator !== 'function') {
      throw new Error('Invalid AudioContext provided');
    }
    
    if (!['sine', 'square', 'sawtooth', 'triangle'].includes(type)) {
      throw new Error(`Invalid oscillator type: ${type}`);
    }
    
    if (typeof frequency !== 'number' || frequency <= 0) {
      throw new Error('Frequency must be a positive number');
    }
    
    if (typeof detune !== 'number') {
      throw new Error('Detune must be a number');
    }
    
    if (!connection || typeof connection.connect !== 'function') {
      throw new Error('Invalid connection node provided');
    }
  }

  initializeAudioNodes(type, frequency, detune, connection) {
    try {
      this.osc = this.actx.createOscillator();
      this.osc.frequency.value = this.clampFrequency(frequency);
      this.osc.detune.value = detune;
      this.osc.type = type;
      
      this.gateGain = this.actx.createGain();
      this.gateGain.gain.value = 0;
      
      this.osc.connect(this.gateGain);
      this.gateGain.connect(connection);
      
      this.osc.start();
      
      this.osc.onended = () => {
        this.cleanup();
      };
      
    } catch (error) {
      throw new Error(`Failed to initialize audio nodes: ${error.message}`);
    }
  }

  clampFrequency(frequency) {
    return Math.max(
      this.config.minFrequency,
      Math.min(this.config.maxFrequency, frequency)
    );
  }

  start() {
    if (this.isPlaying) {
      console.warn('Oscillator is already playing');
      return;
    }

    try {
      const { currentTime } = this.actx;
      this.startTime = currentTime;
      this.isPlaying = true;
      this.isReleasing = false;
      
      this.gateGain.gain.cancelScheduledValues(currentTime);
      
      this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
      
      this.gateGain.gain.linearRampToValueAtTime(
        1,
        currentTime + this.envelope.attack + this.easing
      );
      
      this.gateGain.gain.linearRampToValueAtTime(
        this.envelope.sustain,
        currentTime + this.envelope.attack + this.envelope.decay + this.easing
      );
      
    } catch (error) {
      console.error('Failed to start oscillator:', error);
      this.cleanup();
    }
  }

  stop() {
    if (!this.isPlaying || this.isReleasing) {
      return;
    }

    try {
      const { currentTime } = this.actx;
      this.isReleasing = true;
      
      this.gateGain.gain.cancelScheduledValues(currentTime);
      
      const currentGain = this.gateGain.gain.value;
      this.gateGain.gain.setValueAtTime(currentGain, currentTime);
      
      this.gateGain.gain.setTargetAtTime(
        0,
        currentTime,
        this.envelope.release + this.easing
      );
      
      const releaseTime = (this.envelope.release + this.easing) * 5; // 5 time constants for ~99% decay
      this.scheduleCleanup(releaseTime * 1000);
      
    } catch (error) {
      console.error('Failed to stop oscillator:', error);
      this.cleanup();
    }
  }

  scheduleCleanup(delay) {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
    }
    
    this.disconnectTimeout = setTimeout(() => {
      this.cleanup();
    }, Math.max(delay, this.config.disconnectDelay));
  }

  updateFrequency(frequency) {
    if (this.osc && !this.isReleasing) {
      this.osc.frequency.value = this.clampFrequency(frequency);
    }
  }

  updateDetune(detune) {
    if (this.osc && !this.isReleasing) {
      this.osc.detune.value = detune;
    }
  }

  updateEnvelope(newEnvelope) {
    this.envelope = { ...this.envelope, ...newEnvelope };
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      isReleasing: this.isReleasing,
      frequency: this.osc ? this.osc.frequency.value : null,
      detune: this.osc ? this.osc.detune.value : null,
      type: this.osc ? this.osc.type : null,
      envelope: { ...this.envelope },
      startTime: this.startTime,
    };
  }

  isActive() {
    return this.isPlaying && !this.isReleasing;
  }

  forceStop() {
    this.cleanup();
  }

  cleanup() {
    try {
      if (this.disconnectTimeout) {
        clearTimeout(this.disconnectTimeout);
        this.disconnectTimeout = null;
      }
      
      if (this.osc) {
        this.osc.onended = null;
        if (this.osc.stop) {
          this.osc.stop();
        }
        this.osc.disconnect();
        this.osc = null;
      }
      
      if (this.gateGain) {
        this.gateGain.disconnect();
        this.gateGain = null;
      }
      
      this.isPlaying = false;
      this.isReleasing = false;
      this.startTime = null;
      
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  destroy() {
    this.cleanup();
  }
}