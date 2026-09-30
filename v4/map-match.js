/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   MAP-MATCH.JS - Mapa Visual Interactivo y Minijuego Emparejar
===================================================== */

/* =====================================================
   1. MAPA VISUAL INTERACTIVO
===================================================== */
function initVisualMap() {
  const container = document.getElementById("visualMapContainer");
  if (!container) return;

  const cardsHtml = characteristics.map(c => {
    const subNames = c.subcategories.map(s => s.name);
    const m = Store.mastery([c.name, ...subNames]);
    const lvlClass = m === null ? 'no-data' : m >= 70 ? 'hi' : m >= 40 ? 'mid' : 'lo';
    const mLabel = m === null ? 'Sin datos' : `${m}% Dominio`;

    return `
      <div class="map-node ${lvlClass}" onclick="openMapModal(${c.id})" role="button" tabindex="0">
        <div class="map-node-header">
          <span class="map-node-icon">${c.icon}</span>
          <span class="map-node-badge ${lvlClass}">${mLabel}</span>
        </div>
        <h4 class="map-node-title">${c.name}</h4>
        <p class="map-node-desc">${c.description}</p>
        <div class="map-node-subtags">
          ${c.subcategories.map(s => `<span class="subtag">${s.name}</span>`).join("")}
        </div>
        <div class="map-node-action">Ver analogía y detalles →</div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="map-controls">
      <div class="map-legend">
        <span><i class="dot hi"></i> ≥70% Alto</span>
        <span><i class="dot mid"></i> 40-69% Medio</span>
        <span><i class="dot lo"></i> &lt;40% Bajo</span>
        <span><i class="dot no-data"></i> Sin evaluar</span>
      </div>
      <button class="secondary-btn" onclick="showSection('homeScreen')">← Volver al Menú</button>
    </div>
    <div class="map-grid">
      ${cardsHtml}
    </div>
    <div id="mapModal" class="modal-overlay hidden" onclick="closeMapModal(event)">
      <div class="modal-box" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeMapModal()">✕</button>
        <div id="mapModalContent"></div>
      </div>
    </div>
  `;
}

function openMapModal(id) {
  const c = characteristics.find(x => x.id === id);
  if (!c) return;

  const concept = concepts[id] || ["", "", ""];
  const subNames = c.subcategories.map(s => s.name);
  const m = Store.mastery([c.name, ...subNames]);
  const mDisplay = m === null ? "Aún sin datos de evaluación" : `Dominio actual: <b>${m}%</b>`;

  const content = document.getElementById("mapModalContent");
  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-icon">${c.icon}</span>
      <div>
        <span class="badge">CARACTERÍSTICA ${c.id}</span>
        <h2>${c.name}</h2>
        <small>${mDisplay}</small>
      </div>
    </div>

    <div class="concept" style="margin-top:16px;">
      <div class="simple">❓ ${concept[0]}</div>
      <div class="analogy">🧩 <b>Piensa en…</b> ${concept[1]}</div>
      <div class="ask">🔍 <b>Pregúntate:</b> ${concept[2]}</div>
    </div>

    <h3 style="margin:20px 0 10px;">Subcaracterísticas (${c.subcategories.length}):</h3>
    <div class="modal-sublist">
      ${c.subcategories.map((sub, i) => `
        <div class="modal-subcard">
          <div class="modal-sub-title"><b>${i + 1}. ${sub.name}</b></div>
          <p>${sub.description}</p>
          <div class="example"><b>💡 Ejemplo:</b> ${sub.example}</div>
        </div>
      `).join("")}
    </div>
  `;

  document.getElementById("mapModal").classList.remove("hidden");
  SoundFX.click();
}

function closeMapModal(e) {
  const modal = document.getElementById("mapModal");
  if (modal) modal.classList.add("hidden");
}

/* =====================================================
   2. MINIJUEGO DE EMPAREJAR (Matching Game)
===================================================== */
let matchPairsPool = [];
let matchCurrentRound = 0;
let matchSelectedLeft = null;
let matchSelectedRight = null;
let matchMistakesInRound = 0;
let matchScore = 0;
let matchModeType = 'subcatToCat'; // 'subcatToCat' | 'exampleToSubcat'

function startMatchingGame(type = 'subcatToCat') {
  matchModeType = type;
  matchScore = 0;
  matchCurrentRound = 1;
  score = 0;
  streak = 0;
  updateHeader();
  showSection("matchScreen");
  renderMatchRound();
}

function renderMatchRound() {
  matchSelectedLeft = null;
  matchSelectedRight = null;
  matchMistakesInRound = 0;

  const rawPool = matchingData[matchModeType] || matchingData.subcatToCat;
  const shuffled = shuffle([...rawPool]);
  // 5 pares por ronda
  const roundPairs = shuffled.slice(0, 5);

  const leftItems = shuffle(roundPairs.map((p, i) => ({ id: `pair_${i}`, text: p.left, pairId: `pair_${i}` })));
  const rightItems = shuffle(roundPairs.map((p, i) => ({ id: `pair_${i}`, text: p.right, pairId: `pair_${i}` })));

  const container = document.getElementById("matchContent");
  const typeTitle = matchModeType === 'subcatToCat'
    ? "Subcaracterística ➔ Característica"
    : "Ejemplo Real ➔ Subcaracterística";

  container.innerHTML = `
    <div class="match-arena">
      <div class="match-topbar">
        <button class="back-btn" onclick="showSection('homeScreen')">← Salir</button>
        <div class="match-mode-selector">
          <button class="chip ${matchModeType === 'subcatToCat' ? 'selected' : ''}" onclick="startMatchingGame('subcatToCat')">Subcaracterística ➔ Característica</button>
          <button class="chip ${matchModeType === 'exampleToSubcat' ? 'selected' : ''}" onclick="startMatchingGame('exampleToSubcat')">Ejemplo ➔ Subcaracterística</button>
        </div>
      </div>

      <div class="match-header-info">
        <h3>🧩 Emparejar: ${typeTitle}</h3>
        <p>Toca un elemento de la columna izquierda y luego toca su pareja correspondiente a la derecha.</p>
      </div>

      <div class="match-columns">
        <div class="match-col" id="colLeft">
          <div class="col-title">ORIGEN</div>
          ${leftItems.map(item => `
            <div class="match-card left-card" data-pair-id="${item.pairId}" onclick="handleMatchLeft(this)">
              ${item.text}
            </div>
          `).join("")}
        </div>

        <div class="match-col" id="colRight">
          <div class="col-title">DESTINO</div>
          ${rightItems.map(item => `
            <div class="match-card right-card" data-pair-id="${item.pairId}" onclick="handleMatchRight(this)">
              ${item.text}
            </div>
          `).join("")}
        </div>
      </div>

      <div id="matchFeedback" class="match-feedback"></div>
    </div>
  `;
}

function handleMatchLeft(card) {
  if (card.classList.contains("paired")) return;
  SoundFX.click();

  document.querySelectorAll("#colLeft .left-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  matchSelectedLeft = card;

  checkPairResolution();
}

function handleMatchRight(card) {
  if (card.classList.contains("paired")) return;
  SoundFX.click();

  document.querySelectorAll("#colRight .right-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  matchSelectedRight = card;

  checkPairResolution();
}

function checkPairResolution() {
  if (!matchSelectedLeft || !matchSelectedRight) return;

  const leftPairId = matchSelectedLeft.dataset.pairId;
  const rightPairId = matchSelectedRight.dataset.pairId;

  if (leftPairId === rightPairId) {
    // ¡Acierto!
    SoundFX.match();
    streak++;
    score += 40 + Math.min(streak, 5) * 10;
    updateHeader();

    matchSelectedLeft.classList.remove("selected");
    matchSelectedRight.classList.remove("selected");
    matchSelectedLeft.classList.add("paired");
    matchSelectedRight.classList.add("paired");

    matchSelectedLeft = null;
    matchSelectedRight = null;

    // Verificar si se completó la ronda
    const remaining = document.querySelectorAll(".match-card:not(.paired)");
    if (remaining.length === 0) {
      handleMatchRoundComplete();
    }
  } else {
    // Error
    SoundFX.wrong();
    streak = 0;
    matchMistakesInRound++;
    updateHeader();

    const left = matchSelectedLeft;
    const right = matchSelectedRight;

    left.classList.add("shake-error");
    right.classList.add("shake-error");

    setTimeout(() => {
      left.classList.remove("selected", "shake-error");
      right.classList.remove("selected", "shake-error");
      matchSelectedLeft = null;
      matchSelectedRight = null;
    }, 600);
  }
}

function handleMatchRoundComplete() {
  Store.incrementMatchRounds();
  Store.addScore(score);

  if (matchMistakesInRound === 0) {
    Store.unlockBadge("match_master");
  }
  if (typeof checkAllBadges === 'function') checkAllBadges();

  const fb = document.getElementById("matchFeedback");
  fb.innerHTML = `
    <div class="match-success-banner">
      <h3>🎉 ¡Ronda completada con éxito!</h3>
      <p>Errores en esta ronda: <b>${matchMistakesInRound}</b> · Puntos ganados: <b>${score}</b></p>
      <div style="display:flex; gap:10px; justify-content:center; margin-top:12px;">
        <button class="primary-btn" onclick="renderMatchRound()">Siguiente Ronda →</button>
        <button class="secondary-btn" onclick="showSection('homeScreen')">🏠 Volver al Menú</button>
      </div>
    </div>
  `;
}
