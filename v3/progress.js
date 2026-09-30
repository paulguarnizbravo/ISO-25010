/* Fase 1: registro de respuestas, repaso de errores y dominio por característica */
const _showSection = showSection;
showSection = function (id) { _showSection(id); if (id === 'homeScreen') renderProgress(); };

const _checkAnswer = checkAnswer;
checkAnswer = function (btn, sel, q) {
  if (answered) return;
  _checkAnswer(btn, sel, q);
  recordQ(q, sel === q.correct);
};
const _handleTimeout = handleTimeout;
handleTimeout = function () {
  const q = currentQuestions[currentQuestion];
  _handleTimeout();
  recordQ(q, false);
};
function recordQ(q, ok) { Store.record(q.correct, ok); Store.setWrong(q.question, !ok); }

function startReview() {
  const ids = Store.wrong();
  const pool = questions.filter(q => ids.includes(q.question));
  if (!pool.length) return;
  currentMode = 'review'; score = 0; correctCount = 0; wrongCount = 0;
  streak = 0; lives = 99; currentQuestion = 0;
  currentQuestions = shuffle([...pool]).slice(0, 10);
  showSection('gameScreen'); setupGame(); loadQuestion();
}
const _restartGame = restartGame;
restartGame = function () { currentMode === 'review' ? startReview() : _restartGame(); };

function resetProgress() {
  if (confirm('¿Borrar todo tu progreso y tus errores guardados?')) { Store.reset(); renderProgress(); }
}

function renderProgress() {
  const home = document.getElementById('homeScreen');
  let p = document.getElementById('progressPanel');
  if (!p) {
    p = document.createElement('div'); p.id = 'progressPanel';
    home.querySelector('.section-title').before(p);
    const card = document.createElement('div');
    card.id = 'reviewCard'; card.className = 'mode-card'; card.onclick = startReview;
    home.querySelector('.mode-grid').prepend(card);
  }
  p.innerHTML = `<h3 class="section-title">📊 Tu dominio</h3><div class="mastery">${characteristics.map(c => {
    const m = Store.mastery([c.name, ...c.subcategories.map(s => s.name)]);
    const lvl = m === null ? '' : m >= 70 ? 'hi' : m >= 40 ? 'mid' : 'lo';
    return `<button class="m-row" onclick="showCharacteristic(${c.id})"><span>${c.icon} ${c.name}</span><span class="m-bar"><i class="${lvl}" style="width:${m ?? 0}%"></i></span><b>${m === null ? 'sin datos' : m + '%'}</b></button>`;
  }).join('')}</div><button class="link-btn" onclick="resetProgress()">Borrar mi progreso</button>`;
  const n = Store.wrong().length;
  document.getElementById('reviewCard').innerHTML = `<div class="mode-icon teal">🔁</div><h3>Repasar mis errores</h3><p>${n ? `Tienes ${n} pregunta${n > 1 ? 's' : ''} para repasar.` : 'Aún no tienes errores pendientes. ¡Sigue jugando!'}</p><button ${n ? '' : 'disabled'}>Repasar →</button>`;
}
renderProgress();
