/* =====================================================
   ISO/IEC 25010 CHALLENGE - v6
   AUDIO.JS - Efectos de sonido con Web Audio API
   Versión extendida: nuevos sonidos para navegación,
   buscador, y todos los puntos de interacción del juego.
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

    /* ─────────────────────────────────────────
       SONIDOS ORIGINALES (v4 / v5)
    ───────────────────────────────────────── */

    /** Click genérico de botón */
    click() {
      playTone(600, 'sine', 0.04, 0, 0.08);
    },

    /** Respuesta correcta en quiz: acorde alegre ascendente C5-E5-G5 */
    correct() {
      playTone(523.25, 'triangle', 0.15, 0, 0.15);
      playTone(659.25, 'triangle', 0.15, 0.08, 0.15);
      playTone(783.99, 'triangle', 0.25, 0.16, 0.18);
    },

    /** Respuesta incorrecta: tono bajo disonante */
    wrong() {
      playTone(220, 'sawtooth', 0.2, 0, 0.12);
      playTone(196, 'sawtooth', 0.25, 0.1, 0.12);
    },

    /** Emparejamiento correcto: arpegio brillante */
    match() {
      playTone(587.33, 'sine', 0.1, 0, 0.12);
      playTone(739.99, 'sine', 0.1, 0.07, 0.12);
      playTone(880.00, 'sine', 0.18, 0.14, 0.15);
    },

    /** Insignia desbloqueada: fanfarria triunfal */
    badge() {
      playTone(523.25, 'triangle', 0.12, 0, 0.15);
      playTone(659.25, 'triangle', 0.12, 0.1, 0.15);
      playTone(783.99, 'triangle', 0.12, 0.2, 0.15);
      playTone(1046.50, 'triangle', 0.35, 0.3, 0.2);
    },

    /* ─────────────────────────────────────────
       NUEVOS SONIDOS - v6
    ───────────────────────────────────────── */

    /**
     * Navegación entre pantallas: tono suave de transición ascendente.
     * Se dispara al cambiar de sección principal.
     */
    navigate() {
      playTone(440, 'sine', 0.08, 0, 0.07);
      playTone(554, 'sine', 0.1, 0.06, 0.07);
    },

    /**
     * Resultado encontrado en el buscador: "ping" de descubrimiento.
     * Se dispara cuando la búsqueda arroja 1+ resultados.
     */
    searchFound() {
      playTone(880, 'sine', 0.06, 0, 0.10);
      playTone(1108, 'sine', 0.1, 0.05, 0.12);
    },

    /**
     * Sin resultados en el buscador: tono suave de "nada encontrado".
     * Evitamos el `wrong()` pesado para no desanimar en la búsqueda.
     */
    noResults() {
      playTone(350, 'triangle', 0.18, 0, 0.10);
    },

    /**
     * Apertura de modal / popup: clic doble ascendente.
     * Para modales de mapa, ajustes, detalle de característica.
     */
    openModal() {
      playTone(660, 'sine', 0.05, 0, 0.08);
      playTone(880, 'sine', 0.08, 0.04, 0.08);
    },

    /**
     * Cierre de modal: tono descendente suave.
     */
    closeModal() {
      playTone(660, 'sine', 0.06, 0, 0.07);
      playTone(440, 'sine', 0.08, 0.05, 0.08);
    },

    /**
     * Inicio del juego / detective: sonido de "arrancada".
     */
    gameStart() {
      playTone(392, 'triangle', 0.1, 0, 0.10);
      playTone(523, 'triangle', 0.1, 0.08, 0.10);
      playTone(659, 'triangle', 0.18, 0.16, 0.14);
    },

    /**
     * Fin de partida (resultado): fanfarria de cierre.
     * Más corta que badge para no saturar.
     */
    gameEnd() {
      playTone(523.25, 'triangle', 0.10, 0, 0.12);
      playTone(783.99, 'triangle', 0.10, 0.08, 0.12);
      playTone(1046.50, 'triangle', 0.20, 0.16, 0.15);
    },

    /**
     * Timer warning (últimos 5 segundos del reto rápido): pulso urgente.
     */
    timerWarn() {
      playTone(880, 'square', 0.04, 0, 0.06);
    },

    /**
     * Reset de progreso: sonido neutro de confirmación destructiva.
     */
    reset() {
      playTone(300, 'sawtooth', 0.1, 0, 0.08);
      playTone(200, 'sawtooth', 0.2, 0.09, 0.12);
    },

    /**
     * Guardar ajustes: doble ping de confirmación.
     */
    save() {
      playTone(659, 'sine', 0.08, 0, 0.08);
      playTone(880, 'sine', 0.12, 0.07, 0.10);
    },

    /**
     * Subrayar evidencia en detective: clic tipo "marca".
     */
    highlight() {
      playTone(1200, 'sine', 0.03, 0, 0.06);
    }
  };
})();
