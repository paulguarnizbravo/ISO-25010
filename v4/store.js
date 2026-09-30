/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   STORE.JS - Gestor de Estado y Persistencia Unificado
===================================================== */

const Store = (() => {
  const STORAGE_KEY = 'iso25010_v4_progress';

  // Estructura de datos por defecto
  const defaultData = {
    version: '4.0',
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

  // Cargar desde localStorage
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = {
          ...defaultData,
          ...parsed,
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

    // Registro de respuestas para una subcaracterística o característica
    record(name, isCorrect) {
      if (!name) return;
      if (!state.stats[name]) {
        state.stats[name] = { recent: [] };
      }
      const s = state.stats[name];
      s.recent.push(isCorrect ? 1 : 0);
      if (s.recent.length > 8) s.recent.shift();
      save();
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
      const recentAnswers = names.flatMap(n => (state.stats[n] || { recent: [] }).recent);
      if (!recentAnswers.length) return null;
      const total = recentAnswers.reduce((a, b) => a + b, 0);
      return Math.round((total / recentAnswers.length) * 100);
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
