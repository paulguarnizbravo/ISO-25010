/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   DETECTIVE.JS - Motor Avanzado del Detective de Defectos
   Soporte para casos simples, casos con doble defecto,
   y Matriz de Gravedad QA (Impacto x Frecuencia).
===================================================== */

let dOrder = [];
let dIdx = 0;
let dSubDefectIdx = 0; // Para casos con dos defectos (0 o 1)
let dStep = 0;         // 0: Evidencia, 1: Característica, 2: Subcaracterística, 3: Gravedad/Matriz
let dScore = 0;
let dOk = 0;
let dDualHits = [];    // Guarda los índices de defectos encontrados en casos dobles
let useMatrixMode = false; // Modo matriz QA de impacto x frecuencia
let matrixImpact = null;
let matrixFreq = null;

const $d = () => document.getElementById("detectiveContent");

function startDetective() {
  dOrder = shuffle([...defects]);
  dIdx = 0;
  dSubDefectIdx = 0;
  dStep = 0;
  dScore = 0;
  dOk = 0;
  dDualHits = [];
  useMatrixMode = false;
  matrixImpact = null;
  matrixFreq = null;
  score = 0;
  streak = 0;
  updateHeader();
  showSection("detectiveScreen");
  dRender();
}

function dRender() {
  if (dIdx >= dOrder.length) {
    // Fin de casos
    Store.addScore(score);
    if (typeof checkAllBadges === 'function') checkAllBadges();
    updateHeader();

    $d().innerHTML = `
      <div class="det-card final-case-card">
        <div class="badge-icon">🕵️‍♂️</div>
        <h2>¡Investigación Concluida!</h2>
        <p>Has analizado los casos de calidad de software disponibles.</p>
        <div class="result-stats" style="margin: 20px 0;">
          <div><strong>${score}</strong><span>Puntos</span></div>
          <div><strong>${dOk}</strong><span>Aciertos</span></div>
        </div>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
          <button class="primary-btn" onclick="startDetective()">🔄 Nuevos casos</button>
          <button class="secondary-btn" onclick="showSection('homeScreen')">🏠 Menú Principal</button>
        </div>
      </div>
    `;
    return;
  }

  const c = dOrder[dIdx];
  const isDual = !!c.isDual;
  const currentDefect = (c.defects && c.defects[dSubDefectIdx]) ? c.defects[dSubDefectIdx] : c;

  const stepNames = isDual
    ? ["1 Evidencias (2)", "2 Característica", "3 Subcaracterística", "4 Gravedad"]
    : ["1 Evidencia", "2 Característica", "3 Subcaracterística", "4 Gravedad"];

  const sectorBadge = c.sector ? `<span class="tag-sector tag-${c.sector.toLowerCase()}">${c.sector}</span>` : '';
  const dualBadge = isDual ? `<span class="tag-dual">⚠️ Doble Defecto</span>` : '';

  // Generar texto con partes subrayables
  const reportHtml = c.parts.map((p, idx) => {
    if (typeof p === "string") return p;
    const isDefect = p[1] === 1;
    const defIndex = p[2] !== undefined ? p[2] : 0;
    return `<span class="pick" tabindex="0" role="button" data-part-idx="${idx}" data-ok="${isDefect ? 1 : 0}" data-def-idx="${defIndex}">${p[0]}</span>`;
  }).join("");

  $d().innerHTML = `
    <div class="det-card">
      <div class="det-topbar">
        <div class="det-meta">
          <span class="det-counter">Caso ${dIdx + 1} de ${dOrder.length}</span>
          ${sectorBadge}
          ${dualBadge}
        </div>
        <div class="steps">
          ${stepNames.map((n, i) => `<span class="${i < dStep ? 'done' : i === dStep ? 'now' : ''}">${n}</span>`).join("")}
        </div>
      </div>

      <div class="det-ctx">${c.ctx}</div>
      <div class="report">${reportHtml}</div>

      <div id="dq" class="dq-container"></div>
      <div id="dv" class="dv-container"></div>
    </div>
  `;

  dAsk(c);
}

function dAsk(c) {
  const q = document.getElementById("dq");
  const picks = [...document.querySelectorAll(".pick")];
  const isDual = !!c.isDual;

  // PASO 0: Subrayar evidencia
  if (dStep === 0) {
    if (!isDual) {
      q.innerHTML = `<p class="d-instruction">🔍 <b>Subraya la frase que revela el defecto</b> (haz clic o toca sobre el texto).</p>`;
      picks.forEach(p => {
        const go = () => {
          picks.forEach(x => x.classList.add("off"));
          const ok = p.dataset.ok === "1";
          p.classList.add(ok ? "hit" : "miss");
          if (!ok) {
            const rightOne = picks.find(x => x.dataset.ok === "1");
            if (rightOne) rightOne.classList.add("hit");
          }
          dDone(ok);
        };
        p.onclick = go;
        p.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") go(); };
      });
    } else {
      // Caso con dos defectos en el mismo texto
      q.innerHTML = `<p class="d-instruction">🔍 <b>Este caso contiene 2 defectos distintos.</b> Toca las <b>2 frases</b> que revelan los fallos (${dDualHits.length}/2 encontradas).</p>`;
      
      // Restaurar estado de los ya encontrados
      picks.forEach(p => {
        const defIdx = parseInt(p.dataset.defIdx || 0);
        if (dDualHits.includes(defIdx)) {
          p.classList.add("hit", "off");
        }
      });

      picks.forEach(p => {
        if (p.classList.contains("off")) return;
        const go = () => {
          const isOk = p.dataset.ok === "1";
          const defIdx = parseInt(p.dataset.defIdx || 0);

          if (isOk && !dDualHits.includes(defIdx)) {
            p.classList.add("hit", "off");
            dDualHits.push(defIdx);
            SoundFX.click();

            if (dDualHits.length < 2) {
              q.innerHTML = `<p class="d-instruction">✅ ¡Encontraste 1 defecto! Ahora <b>subraya el segundo defecto</b> en el texto (1/2).</p>`;
            } else {
              // Ambos encontrados
              picks.forEach(x => x.classList.add("off"));
              dDone(true);
            }
          } else {
            p.classList.add("miss");
            picks.forEach(x => x.classList.add("off"));
            // Mostrar los correctos
            picks.filter(x => x.dataset.ok === "1").forEach(x => x.classList.add("hit"));
            dDone(false);
          }
        };
        p.onclick = go;
        p.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") go(); };
      });
    }
    return;
  }

  // Dejar las partes correctas resaltadas
  picks.forEach(x => {
    x.classList.add("off");
    if (x.dataset.ok === "1") x.classList.add("hit");
  });

  const curDefect = (c.defects && c.defects[dSubDefectIdx]) ? c.defects[dSubDefectIdx] : c;
  const defectLabel = c.isDual ? `<div class="sub-defect-tag">Analizando: <b>${curDefect.label || `Defecto ${dSubDefectIdx + 1}`}</b></div>` : '';

  // PASO 1: Característica
  if (dStep === 1) {
    const rightCharObj = characteristics.find(x => x.id === curDefect.ch);
    const rightName = rightCharObj ? rightCharObj.name : "";
    const opts = characteristics.map(x => x.name);

    q.innerHTML = `
      ${defectLabel}
      <p class="d-instruction"><b>¿Qué característica ISO 25010 principal se ve afectada?</b></p>
      <div class="opts">
        ${opts.map(o => `<button class="opt-btn">${o}</button>`).join("")}
      </div>
    `;

    q.querySelectorAll("button").forEach(b => {
      b.onclick = () => {
        const ok = b.textContent === rightName;
        q.querySelectorAll("button").forEach(x => {
          x.disabled = true;
          if (x.textContent === rightName) x.classList.add("ok");
        });
        if (!ok) b.classList.add("no");
        dDone(ok);
      };
    });
    return;
  }

  // PASO 2: Subcaracterística
  if (dStep === 2) {
    const chObj = characteristics.find(x => x.id === curDefect.ch);
    const opts = chObj ? chObj.subcategories.map(s => s.name) : [];
    const rightSub = curDefect.sub;

    q.innerHTML = `
      ${defectLabel}
      <p class="d-instruction"><b>¿Y qué subcaracterística específica se vulnera?</b></p>
      <div class="opts">
        ${opts.map(o => `<button class="opt-btn">${o}</button>`).join("")}
      </div>
    `;

    q.querySelectorAll("button").forEach(b => {
      b.onclick = () => {
        const ok = b.textContent === rightSub;
        q.querySelectorAll("button").forEach(x => {
          x.disabled = true;
          if (x.textContent === rightSub) x.classList.add("ok");
        });
        if (!ok) b.classList.add("no");
        dDone(ok);
      };
    });
    return;
  }

  // PASO 3: Gravedad y Matriz QA
  if (dStep === 3) {
    renderSeverityStep(c, curDefect);
  }
}

function renderSeverityStep(c, curDefect) {
  const q = document.getElementById("dq");
  const rightSev = curDefect.sev;
  const defectLabel = c.isDual ? `<div class="sub-defect-tag">Analizando: <b>${curDefect.label || `Defecto ${dSubDefectIdx + 1}`}</b></div>` : '';

  if (!useMatrixMode) {
    // Modo directo clásico
    q.innerHTML = `
      ${defectLabel}
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <p class="d-instruction" style="margin:0;"><b>¿Qué nivel de gravedad asignas a este defecto?</b></p>
        <button class="matrix-toggle-btn" onclick="toggleMatrixMode(true)">🔬 Usar Matriz Impacto x Frecuencia</button>
      </div>

      <div class="opts sev" style="margin-top:12px;">
        <button class="opt-btn">Alto</button>
        <button class="opt-btn">Medio</button>
        <button class="opt-btn">Bajo</button>
      </div>

      <div class="sev-guide">
        <b>Alto:</b> Pérdida económica o de datos, fallo crítico o bloqueo total.<br>
        <b>Medio:</b> Dificulta o frustra la operación, pero existe rodeo o alternativa.<br>
        <b>Bajo:</b> Defecto cosmético o estético que no impide el uso.
      </div>
    `;

    q.querySelectorAll(".opts button").forEach(b => {
      b.onclick = () => {
        const ok = b.textContent === rightSev;
        q.querySelectorAll(".opts button").forEach(x => {
          x.disabled = true;
          if (x.textContent === rightSev) x.classList.add("ok");
        });
        if (!ok) b.classList.add("no");
        dDone(ok);
      };
    });
  } else {
    // Modo Matriz QA profesional (Impacto x Frecuencia)
    matrixImpact = matrixImpact || curDefect.impact || "Mayor";
    matrixFreq = matrixFreq || curDefect.freq || "Frecuente";

    q.innerHTML = `
      ${defectLabel}
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <p class="d-instruction" style="margin:0;"><b>Matriz de Evaluación QA: Impacto y Frecuencia</b></p>
        <button class="matrix-toggle-btn" onclick="toggleMatrixMode(false)">← Volver a selección directa</button>
      </div>

      <div class="matrix-box">
        <div class="matrix-selector">
          <label>💥 <b>Impacto en el Negocio/Usuario:</b></label>
          <div class="matrix-chips" id="impactChips">
            ${["Catastrófico", "Mayor", "Moderado", "Menor"].map(imp => `
              <button class="chip ${matrixImpact === imp ? 'selected' : ''}" onclick="selectMatrixImpact('${imp}')">${imp}</button>
            `).join("")}
          </div>
        </div>

        <div class="matrix-selector" style="margin-top:12px;">
          <label>🔄 <b>Frecuencia / Probabilidad de Ocurrencia:</b></label>
          <div class="matrix-chips" id="freqChips">
            ${["Frecuente", "Ocasional", "Raro"].map(fr => `
              <button class="chip ${matrixFreq === fr ? 'selected' : ''}" onclick="selectMatrixFreq('${fr}')">${fr}</button>
            `).join("")}
          </div>
        </div>

        <div class="matrix-result-bar">
          <div>Prioridad resultante calculada: <b id="matrixCalcSev" class="tag ${calculateMatrixSeverity(matrixImpact, matrixFreq)}">${calculateMatrixSeverity(matrixImpact, matrixFreq)}</b></div>
          <button class="primary-btn" onclick="submitMatrixSeverity('${rightSev}')">Confirmar Evaluación QA →</button>
        </div>
      </div>
    `;
  }
}

function toggleMatrixMode(val) {
  useMatrixMode = val;
  const c = dOrder[dIdx];
  const curDefect = (c.defects && c.defects[dSubDefectIdx]) ? c.defects[dSubDefectIdx] : c;
  renderSeverityStep(c, curDefect);
}

function selectMatrixImpact(val) {
  matrixImpact = val;
  document.getElementById("impactChips").querySelectorAll(".chip").forEach(b => {
    b.classList.toggle("selected", b.textContent === val);
  });
  updateMatrixCalculation();
}

function selectMatrixFreq(val) {
  matrixFreq = val;
  document.getElementById("freqChips").querySelectorAll(".chip").forEach(b => {
    b.classList.toggle("selected", b.textContent === val);
  });
  updateMatrixCalculation();
}

function updateMatrixCalculation() {
  const calc = calculateMatrixSeverity(matrixImpact, matrixFreq);
  const tag = document.getElementById("matrixCalcSev");
  if (tag) {
    tag.className = `tag ${calc}`;
    tag.textContent = calc;
  }
}

// Cálculo matemático estándar de matriz QA (4x3)
function calculateMatrixSeverity(imp, freq) {
  if (imp === "Catastrófico") {
    return freq === "Raro" ? "Medio" : "Alto";
  }
  if (imp === "Mayor") {
    return freq === "Frecuente" ? "Alto" : "Medio";
  }
  if (imp === "Moderado") {
    return freq === "Raro" ? "Bajo" : "Medio";
  }
  // Menor
  return "Bajo";
}

function submitMatrixSeverity(rightSev) {
  const calculated = calculateMatrixSeverity(matrixImpact, matrixFreq);
  const ok = calculated === rightSev;
  dDone(ok);
}

function dDone(ok) {
  const c = dOrder[dIdx];
  const curDefect = (c.defects && c.defects[dSubDefectIdx]) ? c.defects[dSubDefectIdx] : c;

  // Registrar en el Store según el paso
  if (dStep === 1) {
    const chName = characteristics.find(x => x.id === curDefect.ch)?.name;
    if (chName) Store.record(chName, ok);
  }
  if (dStep === 2) {
    Store.record(curDefect.sub, ok);
    Store.setWrong(c.ctx + ": " + curDefect.sub, !ok);
  }

  if (ok) {
    dOk++;
    streak++;
    score += 50 + Math.min(streak, 5) * 10;
    SoundFX.correct();
  } else {
    streak = 0;
    SoundFX.wrong();
  }
  updateHeader();

  setTimeout(() => {
    dStep++;
    if (dStep < 4) {
      dRender();
      return;
    }

    // Si es un caso doble y aún estamos en el primer defecto, pasar al segundo
    if (c.isDual && dSubDefectIdx === 0 && c.defects && c.defects.length > 1) {
      dSubDefectIdx = 1;
      dStep = 1; // Ya subrayaron ambos al inicio, ahora clasificar el defecto 2
      useMatrixMode = false;
      dRender();
      return;
    }

    // Fin del caso completo (sea simple o doble)
    Store.incrementCasesSolved();
    if (typeof checkAllBadges === 'function') checkAllBadges();

    document.getElementById("dq").innerHTML = "";

    // Construir veredicto
    let verdictHtml = '';
    if (!c.isDual) {
      const chName = characteristics.find(x => x.id === curDefect.ch)?.name || "";
      verdictHtml = `
        <div class="verdict">
          <div class="verdict-title">📋 <b>Veredicto QA:</b></div>
          <p>Característica: <b>${chName}</b> ➔ Subcaracterística: <b>${curDefect.sub}</b></p>
          <p>Gravedad: <span class="tag ${curDefect.sev}">${curDefect.sev}</span> (Impacto: <i>${curDefect.impact || 'Mayor'}</i> · Frecuencia: <i>${curDefect.freq || 'Frecuente'}</i>)</p>
          <div class="verdict-why">💡 <b>Causa y justificación:</b> ${curDefect.why}</div>
        </div>
      `;
    } else {
      verdictHtml = `
        <div class="verdict">
          <div class="verdict-title">📋 <b>Veredicto de Doble Defecto QA:</b></div>
          ${c.defects.map((df, i) => {
            const chName = characteristics.find(x => x.id === df.ch)?.name || "";
            return `
              <div class="verdict-item" style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.03); border-radius:10px;">
                <b>Defecto ${i + 1}: ${df.label || ''}</b><br>
                ${chName} ➔ <b>${df.sub}</b> · Gravedad <span class="tag ${df.sev}">${df.sev}</span><br>
                <span>💡 ${df.why}</span>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    document.getElementById("dv").innerHTML = `
      ${verdictHtml}
      <button class="primary-btn next-case-btn" onclick="nextDetectiveCase()">
        ${dIdx + 1 < dOrder.length ? "Siguiente Caso →" : "Ver Conclusión de la Investigación →"}
      </button>
    `;
  }, ok ? 700 : 1300);
}

function nextDetectiveCase() {
  dIdx++;
  dSubDefectIdx = 0;
  dStep = 0;
  dDualHits = [];
  useMatrixMode = false;
  matrixImpact = null;
  matrixFreq = null;
  dRender();
}
