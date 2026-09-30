/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   AUDIO.JS - Efectos de sonido con Web Audio API
===================================================== */

const SoundFX = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function isEnabled() {
    return Store && Store.getSettings && Store.getSettings().sound;
  }

  function playTone(freq, type = 'sine', duration = 0.15, startTime = 0, gainVal = 0.15) {
    if (!isEnabled()) return;
    const c = getCtx();
    if (!c) return;

    try {
      const osc = c.createOscillator();
      const gain = c.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime + startTime);

      gain.gain.setValueAtTime(gainVal, c.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(c.currentTime + startTime);
      osc.stop(c.currentTime + startTime + duration);
    } catch (e) {
      // AudioContext seguro
    }
  }

  return {
    click() {
      playTone(600, 'sine', 0.04, 0, 0.08);
    },

    correct() {
      // Acorde alegre ascendente C5 - E5 - G5
      playTone(523.25, 'triangle', 0.15, 0, 0.15);
      playTone(659.25, 'triangle', 0.15, 0.08, 0.15);
      playTone(783.99, 'triangle', 0.25, 0.16, 0.18);
    },

    wrong() {
      // Tono bajo disonante
      playTone(220, 'sawtooth', 0.2, 0, 0.12);
      playTone(196, 'sawtooth', 0.25, 0.1, 0.12);
    },

    match() {
      // Arpegio brillante de emparejamiento
      playTone(587.33, 'sine', 0.1, 0, 0.12);
      playTone(739.99, 'sine', 0.1, 0.07, 0.12);
      playTone(880.00, 'sine', 0.18, 0.14, 0.15);
    },

    badge() {
      // Fanfarria triunfal de desbloqueo
      playTone(523.25, 'triangle', 0.12, 0, 0.15);
      playTone(659.25, 'triangle', 0.12, 0.1, 0.15);
      playTone(783.99, 'triangle', 0.12, 0.2, 0.15);
      playTone(1046.50, 'triangle', 0.35, 0.3, 0.2);
    }
  };
})();
