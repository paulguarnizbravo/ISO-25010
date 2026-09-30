/* =====================================================
   ISO/IEC 25010 CHALLENGE - v6
   STORE.JS - Gestor de Estado y Persistencia Unificado
===================================================== */

const Store = (() => {
  const STORAGE_KEY = 'iso25010_v6_progress';
  const FALLBACK_KEY_V4 = 'iso25010_v4_progress';
  const FALLBACK_KEY_V5 = 'iso25010_v5_progress';

  // Estructura de datos por defecto
  const defaultData = {
    version: '6.0',
    profile: {
      name: 'Estudiante de Calidad',
      level: 'Novato',
      totalScore: 0,
      bestScore: 0,
      streak: 0,
      bestStreak: 0,
      casesSolved: 0,
      imageBugsSolved: 0,
      matchRoundsWon: 0,
      reportsCreated: 0
    },
    settings: {
      theme: 'light',      // 'light' | 'dark'
      sound: true,         // true | false
      difficulty: 'normal' // 'facil' | 'normal' | 'dificil'
    },
    stats: {},             // { [subcatName]: { recent: [1, 0, 1...] } }
    wrongQuestions: [],    // Array de IDs o textos de preguntas falladas
    badgesUnlocked: [],    // Array de IDs de insignias desbloqueadas
    history: []
  };

  let state = { ...defaultData };

  // Cargar desde localStorage con fallback automático
  function load() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Migrar desde v5 primero, luego v4
        raw = localStorage.getItem(FALLBACK_KEY_V5) || localStorage.getItem(FALLBACK_KEY_V4);
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        state = {
          ...defaultData,
          ...parsed,
          version: '6.0', // siempre marcar como v6
          profile: { ...defaultData.profile, ...(parsed.profile || {}) },
          settings: { ...defaultData.settings, ...(parsed.settings || {}) },
          stats: parsed.stats || {},
          wrongQuestions: parsed.wrongQuestions || [],
          badgesUnlocked: parsed.badgesUnlocked || []
        };
      }
    } catch (e) {
      console.warn('No se pudo cargar el progreso previo:', e);
      state = { ...defaultData };
    }
  }

  // Guardar en localStorage
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error al guardar en localStorage:', e);
    }
  }

  load();

  return {
    // Lectura de estado
    getState() {
      return state;
    },

    getProfile() {
      return state.profile;
    },

    getSettings() {
      return state.settings;
    },

    // Actualizar configuración
    updateSettings(newSettings) {
      state.settings = { ...state.settings, ...newSettings };
      save();
    },

    setPlayerName(name) {
      if (name && name.trim()) {
        state.profile.name = name.trim();
        save();
      }
    },

    // Función de normalización para asegurar coincidencia sin importar mayúsculas o tildes
    _norm(str) {
      return String(str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
    },

    // Registro de respuestas para una subcaracterística o característica
    record(name, isCorrect) {
      if (!name) return;
      const val = isCorrect ? 1 : 0;
      const rawKey = String(name).trim();
      const normKey = this._norm(rawKey);

      // Guardar en clave original y normalizada
      if (!state.stats[normKey]) {
        state.stats[normKey] = { recent: [], name: rawKey };
      }
      state.stats[normKey].recent.push(val);
      if (state.stats[normKey].recent.length > 10) state.stats[normKey].recent.shift();

      // Si name es una subcaracterística, registrar también para su característica padre
      if (typeof characteristics !== 'undefined' && Array.isArray(characteristics)) {
        for (const c of characteristics) {
          const cNorm = this._norm(c.name);
          if (cNorm !== normKey && c.subcategories) {
            const isSub = c.subcategories.some(s => this._norm(s.name) === normKey || (s.alias && this._norm(s.alias) === normKey));
            if (isSub) {
              if (!state.stats[cNorm]) {
                state.stats[cNorm] = { recent: [], name: c.name };
              }
              state.stats[cNorm].recent.push(val);
              if (state.stats[cNorm].recent.length > 12) state.stats[cNorm].recent.shift();
              break;
            }
          }
        }
      }

      save();
    },

    // Registrar progreso por estudio / exploración de fichas
    recordStudy(name) {
      if (!name) return;
      const normKey = this._norm(name);
      if (!state.stats[normKey] || !state.stats[normKey].recent.length) {
        state.stats[normKey] = { recent: [1], name: String(name).trim() };
        save();
      }
    },

    // Agregar o quitar de la lista de errores para repaso espaciado
    setWrong(questionText, isWrong) {
      if (!questionText) return;
      const idx = state.wrongQuestions.indexOf(questionText);
      if (isWrong && idx < 0) {
        state.wrongQuestions.push(questionText);
      } else if (!isWrong && idx >= 0) {
        state.wrongQuestions.splice(idx, 1);
      }
      save();
    },

    getWrong() {
      return [...state.wrongQuestions];
    },

    // Calcular el porcentaje de dominio para una o varias características/subcaracterísticas
    mastery(names) {
      if (!Array.isArray(names) || names.length === 0) return null;
      const targetNorms = names.map(n => this._norm(n));
      const recentAnswers = [];

      for (const [key, val] of Object.entries(state.stats)) {
        if (!val || !Array.isArray(val.recent) || !val.recent.length) continue;
        const kNorm = this._norm(key);
        if (targetNorms.includes(kNorm)) {
          recentAnswers.push(...val.recent);
        }
      }

      if (!recentAnswers.length) return null;
      const total = recentAnswers.reduce((a, b) => a + b, 0);
      return Math.round((total / recentAnswers.length) * 100);
    },

    // Cargar progreso de prueba realista para las 8 características
    seedDemoProgress() {
      const demoData = [
        { name: "Adecuación funcional", recent: [1, 1, 1, 0, 1] },       // 80%
        { name: "Eficiencia de desempeño", recent: [1, 1, 0, 1] },     // 75%
        { name: "Compatibilidad", recent: [1, 0, 1] },                  // 67%
        { name: "Usabilidad", recent: [1, 1, 1, 1, 0] },                // 80%
        { name: "Fiabilidad", recent: [1, 1, 1, 0] },                   // 75%
        { name: "Seguridad", recent: [1, 1, 1, 1] },                    // 100%
        { name: "Mantenibilidad", recent: [1, 0, 1, 0, 1] },            // 60%
        { name: "Portabilidad", recent: [1, 1, 1, 0] }                  // 75%
      ];

      demoData.forEach(d => {
        const normKey = this._norm(d.name);
        state.stats[normKey] = { recent: [...d.recent], name: d.name };
      });

      state.profile.totalScore = Math.max(state.profile.totalScore || 0, 650);
      state.profile.bestScore = Math.max(state.profile.bestScore || 0, 650);
      state.profile.streak = Math.max(state.profile.streak || 0, 4);
      state.profile.casesSolved = Math.max(state.profile.casesSolved || 0, 8);
      save();
    },

    // Incrementar estadísticas generales
    addScore(points) {
      state.profile.totalScore = (state.profile.totalScore || 0) + points;
      if (state.profile.totalScore > (state.profile.bestScore || 0)) {
        state.profile.bestScore = state.profile.totalScore;
      }
      save();
    },

    updateStreak(currentStreak) {
      state.profile.streak = currentStreak;
      if (currentStreak > (state.profile.bestStreak || 0)) {
        state.profile.bestStreak = currentStreak;
      }
      save();
    },

    incrementCasesSolved() {
      state.profile.casesSolved = (state.profile.casesSolved || 0) + 1;
      save();
    },

    incrementImageBugsSolved() {
      state.profile.imageBugsSolved = (state.profile.imageBugsSolved || 0) + 1;
      save();
    },

    incrementMatchRounds() {
      state.profile.matchRoundsWon = (state.profile.matchRoundsWon || 0) + 1;
      save();
    },

    incrementReportsCreated() {
      state.profile.reportsCreated = (state.profile.reportsCreated || 0) + 1;
      save();
    },

    // Desbloqueo de insignias
    unlockBadge(badgeId) {
      if (!state.badgesUnlocked.includes(badgeId)) {
        state.badgesUnlocked.push(badgeId);
        save();
        return true;
      }
      return false;
    },

    hasBadge(badgeId) {
      return state.badgesUnlocked.includes(badgeId);
    },

    getBadges() {
      return [...state.badgesUnlocked];
    },

    // Reiniciar todo el progreso
    reset() {
      const curSettings = { ...state.settings };
      state = { ...defaultData, settings: curSettings };
      save();
    }
  };
})();
