/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   SCRIPT.JS - Controlador Principal, Quiz y Navegación
===================================================== */

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let streak = 0;
let lives = 3;
let currentMode = "";
let timerInterval = null;
let timeLeft = 20;
let answered = false;

/* Elementos principales */
const scoreElement = document.getElementById("score");
const streakElement = document.getElementById("streak");
const bestScoreElement = document.getElementById("bestScore");

function getBestScore() {
  return Store.getProfile().bestScore || 0;
}

function updateHeader() {
  if (scoreElement) scoreElement.textContent = score;
  if (streakElement) streakElement.textContent = streak;
  if (bestScoreElement) bestScoreElement.textContent = getBestScore();
}

function updateLives() {
  const livesEl = document.getElementById("lives");
  if (!livesEl) return;
  if (currentMode === "exam") {
    livesEl.textContent = `❤️ x ${lives}`;
  } else if (lives > 10) {
    livesEl.textContent = `♾️ Vidas`;
  } else {
    livesEl.textContent = "❤️ ".repeat(Math.max(0, lives));
  }
}

/* =====================================================
   NAVEGACIÓN ENTRE PANTALLAS
===================================================== */
function showSection(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Sonido de navegación (excepto al inicializar)
  if (typeof SoundFX !== 'undefined') SoundFX.navigate();

  // Disparar renderizadores según la pantalla activa
  if (id === 'homeScreen') {
    renderProgress();
    checkAllBadges();
    if (typeof updateLearningPath !== 'undefined') updateLearningPath();
  } else if (id === 'modelScreen') {
    renderModelScreen();
  } else if (id === 'visualMapScreen') {
    initVisualMap();
  } else if (id === 'badgesScreen') {
    renderBadgesScreen();
  } else if (id === 'certificateScreen') {
    renderCertificateScreen();
  } else if (id === 'glossaryScreen') {
    initGlossaryScreen();
  } else if (id === 'learningLabScreen') {
    renderLearningLab();
  } else if (id === 'caseStudyScreen') {
    renderCaseStudy();
  }
}

/* =====================================================
   GUÍA DEL MODELO ISO 25010 Y CONCEPTO DE LA NORMA
===================================================== */
function renderModelScreen() {
  const container = document.getElementById("modelContent");
  if (!container) return;

  const info = isoStandardInfo;

  container.innerHTML = `
    <div class="model-guide-card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
        <button class="back-btn" style="margin:0;" onclick="showSection('homeScreen')">← Volver al Menú</button>
        <span class="badge">ESTÁNDAR INTERNACIONAL</span>
      </div>

      <div class="model-hero">
        <h2>${info.title}</h2>
        <p class="model-subtitle">${info.subtitle}</p>
      </div>

      <div class="highlight-question-box" style="margin: 22px 0;">
        <div class="question-title">❓ LA PREGUNTA CLAVE PARA ENTENDER LA NORMA:</div>
        <div class="question-text">"${info.questionToUnderstand}"</div>
      </div>

      <div class="model-section">
        <h3>🔍 ¿Qué es la ISO/IEC 25010 en cristiano?</h3>
        <p>${info.whatIsIt}</p>
      </div>

      <div class="concept" style="margin: 20px 0;">
        <div class="analogy">
          🧩 <b>La analogía del automóvil usado:</b><br>
          ${info.analogy}
        </div>
      </div>

      <div class="model-section">
        <h3>🏛️ ${info.theModel.title}</h3>
        <p style="color:var(--muted); margin-bottom:16px;">${info.theModel.description}</p>

        <div class="model-branches-grid">
          <div class="model-branch-card active-branch">
            <div class="branch-icon">⚙️</div>
            <h4>1. Calidad del Producto Software (8 Características)</h4>
            <p>${info.theModel.branches[0].desc}</p>
            <div class="branch-badge">Foco de este simulador y de las pruebas QA</div>
          </div>

          <div class="model-branch-card">
            <div class="branch-icon">👥</div>
            <h4>2. Calidad en Uso (5 Dimensiones)</h4>
            <p>${info.theModel.branches[1].desc}</p>
            <div class="branch-badge">Foco de satisfacción y experiencia de usuario</div>
          </div>
        </div>
      </div>

      <div class="model-section" style="margin-top: 30px;">
        <div class="blueprint-intro">
          <span class="badge">MAPA DEL MODELO</span>
          <h3>Arquitectura de la calidad del producto</h3>
          <p>Selecciona una característica para ver sus subcaracterísticas, conceptos y ejemplos.</p>
        </div>
        ${renderQualityBlueprint()}
      </div>

      <div class="model-section" style="margin-top: 30px;">
        <h3>⚡ Guía Esencial: Conceptos y Preguntas Clave (ISO 25010)</h3>
        <p style="color:var(--muted); margin-bottom:16px;">
          El esquema directo y sin rodeos con la pregunta principal de cada característica y sus subcaracterísticas:
        </p>

        <div class="essential-guide-list">
          ${isoEssentialGuide.map(g => `
            <div class="essential-guide-card">
              <div class="essential-card-header">
                <span class="essential-badge">${g.num}</span>
                <h4>${g.name}</h4>
              </div>
              <div class="essential-concept">
                <b>Concepto:</b> ${g.concept}
              </div>
              <div class="essential-main-q">
                <b>Pregunta principal:</b> <span class="q-highlight">${g.mainQuestion}</span>
              </div>
              <div class="essential-subs-list">
                ${g.subs.map(s => `
                  <div class="essential-sub-row">
                    <div class="sub-desc"><b>${s.name}:</b> ${s.desc}</div>
                    <div class="sub-q">${s.question}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="display:flex; gap:12px; margin-top:30px; justify-content:center; flex-wrap:wrap;">
        <button class="primary-btn" onclick="showSection('learnScreen')">📚 Explorar Modo Detallado</button>
        <button class="secondary-btn" onclick="showSection('visualMapScreen')">🗺️ Ver en el Mapa Visual</button>
      </div>
    </div>
  `;
}

function renderQualityBlueprint() {
  return `<div class="quality-blueprint" aria-label="Diagrama de las características y subcaracterísticas ISO IEC 25010">
    <div class="blueprint-root">CALIDAD DEL PRODUCTO<br>SOFTWARE</div>
    <div class="blueprint-line" aria-hidden="true"></div>
    <div class="blueprint-grid">
      ${characteristics.map(ch => `<button class="blueprint-node" onclick="showCharacteristic(${ch.id})" aria-label="Ver ${ch.name}">
        <span class="blueprint-icon">${ch.icon}</span><strong>${ch.name}</strong>
        <ul>${ch.subcategories.map(s => `<li>${s.name}</li>`).join('')}</ul>
      </button>`).join('')}
    </div>
  </div>`;
}

/* =====================================================
   MODO APRENDER Y DETALLES
===================================================== */
function loadCharacteristics() {
  const grid = document.getElementById("characteristicsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  characteristics.forEach(ch => {
    const card = document.createElement("div");
    card.className = "characteristic-card";
    card.onclick = () => showCharacteristic(ch.id);

    const mainQ = ch.mainQuestion || (`👉 ${ch.question}`);
    const conceptText = ch.coreConcept || ch.simpleConcept || ch.description;

    card.innerHTML = `
      <div class="characteristic-number">CARACTERÍSTICA ${ch.id}</div>
      <h3>${ch.icon} ${ch.name}</h3>
      <div class="question-chip">
        ${mainQ}
      </div>
      <p style="margin-top:8px;"><b>Concepto:</b> ${conceptText}</p>
      <div class="sub-count">${ch.subcategories.length} subcaracterísticas →</div>
    `;

    grid.appendChild(card);
  });
}

function showCharacteristic(id) {
  const ch = characteristics.find(item => item.id === id);
  if (!ch) return;

  if (typeof Store !== 'undefined' && Store.recordStudy) {
    Store.recordStudy(ch.name);
  }

  const content = document.getElementById("detailContent");
  const mainQ = ch.mainQuestion || (`👉 ${ch.question}`);
  const conceptText = ch.coreConcept || ch.simpleConcept || ch.description;

  content.innerHTML = `
    <div class="detail-header">
      <span class="badge">CARACTERÍSTICA ${ch.id}</span>
      <h2>${ch.icon} ${ch.name}</h2>

      <div style="background:var(--background); border-radius:12px; padding:16px; margin: 14px 0 10px;">
        <div style="font-size:0.85rem; font-weight:800; color:var(--muted); text-transform:uppercase; margin-bottom:4px;">Concepto:</div>
        <p style="font-size:1.1rem; color:var(--heading); font-weight:600; line-height:1.5;">
          ${conceptText}
        </p>
      </div>

      <div class="highlight-question-box">
        <div class="question-title">PREGUNTA PRINCIPAL:</div>
        <div class="question-text">${mainQ}</div>
      </div>
    </div>

    <div class="concept" style="margin: 20px 0;">
      <div class="analogy">🧩 <b>Piensa en… (Analogía cotidiana):</b><br>${ch.analogy}</div>
      <div class="ask">🔍 <b>Pregúntate (Diagnóstico de calidad):</b> ${ch.reflection}</div>
    </div>

    <h3 style="margin: 26px 0 14px;">Subcaracterísticas de ${ch.name} (${ch.subcategories.length}):</h3>
    <div class="sub-list">
      ${ch.subcategories.map((sub, index) => {
        const subDesc = sub.coreDesc || sub.simpleConcept || sub.description;
        const subQ = sub.coreQuestion || (`👉 ${sub.question}`);

        return `
          <div class="sub-card">
            <div class="characteristic-number">SUBCARACTERÍSTICA ${index + 1}</div>
            <h3 style="font-size:1.2rem; margin-bottom:6px;">
              ${sub.name}: <span style="font-size:1rem; font-weight:500; color:var(--text);">${subDesc}</span>
            </h3>

            <div class="subcat-question-box">
              <span style="font-size:1.15rem; font-weight:800; color:var(--primary-dark);">${subQ}</span>
            </div>

            <div class="example" style="margin-top:12px;">
              <strong>🌟 Ejemplo práctico:</strong><br>${sub.example}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  showSection("detailScreen");
}

/* =====================================================
   INICIO DE JUEGO (QUIZ)
===================================================== */
function startGame(mode) {
  currentMode = mode;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  streak = 0;
  currentQuestion = 0;

  SoundFX.gameStart();

  // Ajustar dificultad
  const diff = Store.getSettings().difficulty;
  if (diff === 'facil') {
    lives = 4;
    timeLeft = 30;
  } else if (diff === 'dificil') {
    lives = 1;
    timeLeft = 12;
  } else {
    lives = 3;
    timeLeft = 20;
  }

  let filtered = [];
  if (mode === "exam" || mode === "diagnostic") {
    filtered = [...questions];
    lives = diff === 'dificil' ? 1 : 3;
  } else if (mode === "cases") {
    filtered = questions.filter(q => q.type === "cases");
  } else if (mode === "characteristic") {
    filtered = questions.filter(q => q.type === "characteristic");
  } else if (mode === "subcategory") {
    filtered = questions.filter(q => q.type === "subcategory");
  } else if (mode === "quick") {
    filtered = [...questions];
  }

  const numQ = mode === "exam" ? 15 : 10;
  // El examen adaptativo prioriza los conceptos fallados anteriormente.
  if (mode === "exam") {
    const pending = Store.getWrong();
    const weakQuestions = filtered.filter(q => pending.includes(q.question));
    const remaining = filtered.filter(q => !pending.includes(q.question));
    currentQuestions = [...shuffle(weakQuestions), ...shuffle(remaining)].slice(0, numQ);
  } else {
    currentQuestions = shuffle([...filtered]).slice(0, numQ);
  }

  showSection("gameScreen");
  setupGame();
  loadQuestion();
}

function setupGame() {
  document.getElementById("timerBox").classList.toggle("hidden", currentMode !== "quick");
  updateLives();
  updateHeader();
}

function loadQuestion() {
  clearInterval(timerInterval);
  answered = false;

  if (currentQuestion >= currentQuestions.length) {
    finishGame();
    return;
  }

  const question = currentQuestions[currentQuestion];
  const total = currentQuestions.length;

  document.getElementById("questionCounter").textContent = `Pregunta ${currentQuestion + 1} / ${total}`;
  document.getElementById("progressBar").style.width = `${(currentQuestion / total) * 100}%`;
  document.getElementById("questionType").textContent = getQuestionTypeName(question.type);
  document.getElementById("questionText").textContent = question.question;

  const diff = Store.getSettings().difficulty;
  const hintText = (diff === 'facil' && question.explanation)
    ? `💡 Pista: Relacionado con los atributos de calidad de ${question.correct.slice(0, 10)}...`
    : "Selecciona la respuesta correcta.";

  document.getElementById("questionDescription").textContent = hintText;
  document.getElementById("feedback").className = "feedback hidden";
  document.getElementById("nextBtn").classList.add("hidden");

  createAnswers(question);

  if (currentMode === "quick") {
    const diff = Store.getSettings().difficulty;
    timeLeft = diff === 'facil' ? 30 : diff === 'dificil' ? 12 : 20;
    startTimer();
  }
}

function getQuestionTypeName(type) {
  if (currentMode === "exam") return "📝 EXAMEN FINAL";
  if (currentMode === "diagnostic") return "DIAGNÓSTICO INICIAL";
  if (currentMode === "review") return "🔁 REPASO DE ERRORES";
  const names = {
    characteristic: "🎯 IDENTIFICA LA CARACTERÍSTICA",
    subcategory: "🔎 IDENTIFICA LA SUBCARACTERÍSTICA",
    cases: "🏢 CASO PRÁCTICO"
  };
  return names[type] || "PREGUNTA";
}

function createAnswers(question) {
  const container = document.getElementById("answers");
  container.innerHTML = "";

  let options = [];
  if (question.type === "characteristic") {
    options = characteristics.map(c => c.name);
  } else {
    options = characteristics.flatMap(c => c.subcategories.map(s => s.name));
  }

  // Filtrar y tomar 3 opciones incorrectas
  let wrongPool = options.filter(o => o !== question.correct);
  wrongPool = shuffle(wrongPool).slice(0, 3);

  let finalOptions = shuffle([...wrongPool, question.correct]);

  // En modo fácil descartar 1 errónea a veces
  const diff = Store.getSettings().difficulty;
  if (diff === 'facil' && finalOptions.length > 3) {
    // 3 opciones en lugar de 4
    finalOptions = shuffle([wrongPool[0], wrongPool[1], question.correct]);
  }

  finalOptions.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, opt, question);
    container.appendChild(btn);
  });
}

function checkAnswer(button, selected, question) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b => b.classList.add("disabled"));

  const isCorrect = selected === question.correct;

  // Registrar en el Store
  Store.record(question.correct, isCorrect);
  Store.setWrong(question.question, !isCorrect);

  const feedback = document.getElementById("feedback");
  feedback.classList.remove("hidden");

  if (isCorrect) {
    button.classList.add("correct");
    correctCount++;
    streak++;
    const bonus = Math.min(streak, 5) * 5;
    score += 50 + bonus;
    SoundFX.correct();

    feedback.className = "feedback success";
    feedback.innerHTML = `
      <strong>¡Correcto! +${50 + bonus} pts</strong>
      <p>${question.explanation || 'Respuesta exacta conforme al estándar ISO/IEC 25010.'}</p>
    `;
  } else {
    button.classList.add("wrong");
    wrongCount++;
    streak = 0;
    lives--;
    SoundFX.wrong();

    buttons.forEach(b => {
      if (b.textContent === question.correct) {
        b.classList.add("correct");
      }
    });

    feedback.className = "feedback error";
    feedback.innerHTML = `
      <strong>Incorrecto</strong>
      <p>${question.explanation || `La respuesta correcta era: ${question.correct}`}</p>
    `;
  }

  updateHeader();
  updateLives();

  if (lives <= 0) {
    setTimeout(finishGame, 1200);
    return;
  }

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.remove("hidden");
  nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function startTimer() {
  const timerText = document.getElementById("timer");
  timerText.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 5 && timeLeft > 0) {
      SoundFX.timerWarn();
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const question = currentQuestions[currentQuestion];
  Store.record(question.correct, false);
  Store.setWrong(question.question, true);

  SoundFX.wrong();
  wrongCount++;
  streak = 0;
  lives--;
  updateHeader();
  updateLives();

  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b => {
    b.classList.add("disabled");
    if (b.textContent === question.correct) {
      b.classList.add("correct");
    }
  });

  const feedback = document.getElementById("feedback");
  feedback.classList.remove("hidden");
  feedback.className = "feedback error";
  feedback.innerHTML = `
    <strong>⏱️ ¡Tiempo agotado!</strong>
    <p>${question.explanation || `La respuesta correcta era: ${question.correct}`}</p>
  `;

  if (lives <= 0) {
    setTimeout(finishGame, 1200);
    return;
  }

  document.getElementById("nextBtn").classList.remove("hidden");
}

function finishGame() {
  clearInterval(timerInterval);

  Store.addScore(score);
  checkAllBadges();
  updateHeader();
  SoundFX.gameEnd();

  const total = correctCount + wrongCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  document.getElementById("finalScore").textContent = score;
  document.getElementById("correctAnswers").textContent = correctCount;
  document.getElementById("wrongAnswers").textContent = wrongCount;
  document.getElementById("accuracy").textContent = `${accuracy}%`;

  const title = document.getElementById("resultTitle");
  const msg = document.getElementById("resultMessage");
  const icon = document.getElementById("resultIcon");

  if (accuracy >= 80) {
    icon.textContent = "🏆";
    title.textContent = "¡Excelente Trabajo!";
    msg.textContent = "Demuestras un dominio sólido de los criterios de calidad ISO 25010.";
  } else if (accuracy >= 50) {
    icon.textContent = "👍";
    title.textContent = "¡Buen Intento!";
    msg.textContent = "Vas por buen camino. Te recomendamos repasar los temas donde tuviste dudas.";
  } else {
    icon.textContent = "📚";
    title.textContent = "Sigue Practicando";
    msg.textContent = "Revisa el modo Aprender o utiliza el modo 'Repasar mis errores' para consolidar conceptos.";
  }

  showSection("resultScreen");
}

function restartGame() {
  if (currentMode === "review") {
    startReview();
  } else {
    startGame(currentMode || "characteristic");
  }
}

function confirmExit() {
  if (confirm("¿Seguro que deseas salir de la partida actual?")) {
    clearInterval(timerInterval);
    showSection("homeScreen");
  }
}

/* =====================================================
   REPASO DE ERRORES Y PROGRESO (Fase 1 y Store)
===================================================== */
function startReview() {
  const ids = Store.getWrong();
  const pool = questions.filter(q => ids.includes(q.question));

  if (!pool.length) {
    alert("¡Felicitaciones! No tienes errores pendientes por repasar en este momento.");
    return;
  }

  currentMode = "review";
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  streak = 0;
  lives = 99; // Vidas libres en modo repaso
  currentQuestion = 0;
  currentQuestions = shuffle([...pool]).slice(0, 10);

  showSection("gameScreen");
  setupGame();
  loadQuestion();
}

function loadDemoProgress() {
  Store.seedDemoProgress();
  updateHeader();
  renderProgress();
  if (typeof SoundFX !== 'undefined') SoundFX.badge();
  if (typeof checkAllBadges === 'function') checkAllBadges();
}

function startCharacteristicQuiz(charId) {
  const ch = characteristics.find(c => c.id === charId);
  if (!ch) return;

  const charNorm = Store._norm(ch.name);
  const subNorms = ch.subcategories ? ch.subcategories.map(s => Store._norm(s.name)) : [];
  const targetNorms = [charNorm, ...subNorms];

  // Filtrar preguntas relacionadas con esta característica o sus subcaracterísticas
  const pool = questions.filter(q => {
    const corNorm = Store._norm(q.correct);
    return targetNorms.includes(corNorm) || (q.explanation && Store._norm(q.explanation).includes(charNorm));
  });

  if (pool.length > 0) {
    currentMode = "characteristic";
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    streak = 0;
    currentQuestion = 0;
    lives = 3;
    timeLeft = 20;
    currentQuestions = shuffle([...pool]).slice(0, 4);
    showSection("gameScreen");
    setupGame();
    loadQuestion();
  } else {
    showCharacteristic(charId);
  }
}

function renderProgress() {
  const home = document.getElementById("homeScreen");
  let p = document.getElementById("progressPanel");
  if (!p) {
    p = document.createElement("div");
    p.id = "progressPanel";
    const secTitle = home.querySelector(".section-title");
    if (secTitle) secTitle.before(p);
  }

  const wrongCountTotal = Store.getWrong().length;

  p.innerHTML = `
    <div class="progress-section">
      <div class="review-banner-box" onclick="startReview()" role="button" tabindex="0">
        <div class="review-banner-icon">🔁</div>
        <div class="review-banner-text">
          <h4>Repasar mis errores pendientes</h4>
          <p>${wrongCountTotal ? `Tienes <b>${wrongCountTotal} pregunta${wrongCountTotal > 1 ? 's' : ''}</b> falladas listas para afianzar.` : '¡No tienes errores pendientes! Tu historial está limpio.'}</p>
        </div>
        <button class="primary-btn sm-btn" ${wrongCountTotal ? '' : 'disabled'}>Repasar →</button>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:22px; flex-wrap:wrap; gap:10px;">
        <h3 class="section-title" style="margin:0;">📊 Tu Dominio por Característica</h3>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="secondary-btn sm-btn" onclick="startGame('exam')" title="Evaluar tus conocimientos en un test integral">🎯 Test Integral</button>
          <button class="secondary-btn sm-btn" onclick="loadDemoProgress()" title="Cargar datos de ejemplo para visualizar el progreso y certificado">⚡ Cargar Progreso Demo</button>
        </div>
      </div>

      <div class="mastery-grid">
        ${characteristics.map(c => {
          const m = Store.mastery([c.name, ...c.subcategories.map(s => s.name)]);
          const lvl = m === null ? '' : m >= 70 ? 'hi' : m >= 40 ? 'mid' : 'lo';
          const label = m === null ? '0% (Evaluar)' : `${m}%`;
          const barWidth = m === null ? 0 : m;
          return `
            <button class="m-row" onclick="startCharacteristicQuiz(${c.id})" title="Clic para evaluar o practicar ${c.name}">
              <span>${c.icon} ${c.name}</span>
              <span class="m-bar"><i class="${lvl}" style="width:${barWidth}%"></i></span>
              <b style="${m === null ? 'color:var(--primary); font-size:0.85rem;' : ''}">${label}</b>
            </button>
          `;
        }).join('')}
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; flex-wrap:wrap; gap:10px;">
        <button class="link-btn" onclick="resetAllProgress()">Borrar mi progreso</button>
        <div style="display:flex; gap:12px;">
          <button class="link-btn" onclick="loadDemoProgress()">⚡ Cargar progreso demo</button>
          <button class="link-btn" onclick="showSection('certificateScreen')">📜 Ver mi Certificado →</button>
        </div>
      </div>
    </div>
  `;
}

function resetAllProgress() {
  if (confirm("¿Estás seguro de que deseas borrar todo tu historial, errores guardados y puntos?")) {
    Store.reset();
    updateHeader();
    renderProgress();
    SoundFX.reset();
  }
}

// Función auxiliar de barajado Fisher-Yates
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Inicialización */
document.addEventListener("DOMContentLoaded", () => {
  const theme = Store.getSettings().theme || 'light';
  applyTheme(theme);
  loadCharacteristics();
  renderProgress();
  updateHeader();
  checkAllBadges();
  if (typeof updateLearningPath !== 'undefined') updateLearningPath();
});
