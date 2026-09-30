/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   BUG-REPORT.JS - Redacción de Ficha de Defecto Profesional
   Permite al estudiante redactar un ticket QA formal y
   contrastarlo con la respuesta modelo de un QA Senior.
===================================================== */

let currentBugTemplateIdx = 0;

function startBugReport(templateIdx = 0) {
  currentBugTemplateIdx = templateIdx;
  showSection("bugReportScreen");
  renderBugReportForm();
}

function renderBugReportForm() {
  const container = document.getElementById("bugReportContent");
  if (!container) return;

  const template = bugReportTemplates[currentBugTemplateIdx] || bugReportTemplates[0];

  container.innerHTML = `
    <div class="bug-report-card">
      <div class="report-header-nav">
        <button class="back-btn" onclick="showSection('homeScreen')">← Volver al Menú</button>
        <span class="badge">FICHA DE DEFECTO QA · ${template.sector}</span>
      </div>

      <div class="report-scenario-box">
        <h3>📋 Caso a Reportar:</h3>
        <p>${template.scenario}</p>
      </div>

      <form id="bugReportForm" onsubmit="submitBugReport(event)">
        <div class="form-group">
          <label for="repTitle">1. Título descriptivo del defecto:</label>
          <input type="text" id="repTitle" placeholder="Ej: Fallo en la confirmación de transferencias..." required>
        </div>

        <div class="form-group">
          <label for="repEvidence">2. Evidencia observada / Comportamiento anómalo:</label>
          <textarea id="repEvidence" rows="3" placeholder="Describe qué ocurrió, qué viste en pantalla o qué datos fallaron..." required></textarea>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label for="repChar">3. Característica ISO 25010:</label>
            <select id="repChar" onchange="updateSubcharSelect()" required>
              <option value="">-- Seleccionar Característica --</option>
              ${characteristics.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
            </select>
          </div>

          <div class="form-group">
            <label for="repSubchar">4. Subcaracterística:</label>
            <select id="repSubchar" required>
              <option value="">-- Primero elige la característica --</option>
            </select>
          </div>
        </div>

        <div class="form-group matrix-eval-section">
          <label>5. Evaluación de Severidad con Matriz QA:</label>
          <div class="form-row-2">
            <div>
              <small>Impacto estimado:</small>
              <select id="repImpact" onchange="updateReportMatrixCalc()">
                <option value="Catastrófico">Catastrófico (Pérdida de datos/dinero)</option>
                <option value="Mayor">Mayor (Bloquea función esencial)</option>
                <option value="Moderado" selected>Moderado (Incomodidad con rodeo)</option>
                <option value="Menor">Menor (Cosmético/Visual)</option>
              </select>
            </div>
            <div>
              <small>Frecuencia de ocurrencia:</small>
              <select id="repFreq" onchange="updateReportMatrixCalc()">
                <option value="Frecuente" selected>Frecuente (En cada uso)</option>
                <option value="Ocasional">Ocasional (Bajo ciertas condiciones)</option>
                <option value="Raro">Raro (Muy esporádico)</option>
              </select>
            </div>
          </div>
          <div class="calculated-preview">
            Severidad y Prioridad resultante: <b id="repCalcSev" class="tag Medio">Medio</b>
          </div>
        </div>

        <div class="form-group">
          <label for="repSolution">6. Propuesta de corrección / ¿Cómo lo solucionarías?:</label>
          <textarea id="repSolution" rows="3" placeholder="Propón una medida técnica o de diseño para evitar que el fallo vuelva a ocurrir..." required></textarea>
        </div>

        <button type="submit" class="primary-btn submit-ticket-btn">
          📤 Enviar Reporte y Comparar con QA Senior →
        </button>
      </form>

      <div id="bugReportComparison" class="comparison-area hidden"></div>
    </div>
  `;
}

function updateSubcharSelect() {
  const charVal = document.getElementById("repChar").value;
  const subSelect = document.getElementById("repSubchar");
  subSelect.innerHTML = '<option value="">-- Seleccionar Subcaracterística --</option>';

  const foundChar = characteristics.find(c => c.name === charVal);
  if (foundChar) {
    foundChar.subcategories.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.name;
      opt.textContent = s.name;
      subSelect.appendChild(opt);
    });
  }
}

function updateReportMatrixCalc() {
  const imp = document.getElementById("repImpact").value;
  const freq = document.getElementById("repFreq").value;
  const calc = calculateMatrixSeverity(imp, freq);

  const tag = document.getElementById("repCalcSev");
  if (tag) {
    tag.className = `tag ${calc}`;
    tag.textContent = calc;
  }
}

function submitBugReport(e) {
  e.preventDefault();
  SoundFX.correct();

  const titleVal = document.getElementById("repTitle").value;
  const evidenceVal = document.getElementById("repEvidence").value;
  const charVal = document.getElementById("repChar").value;
  const subVal = document.getElementById("repSubchar").value;
  const impVal = document.getElementById("repImpact").value;
  const freqVal = document.getElementById("repFreq").value;
  const calcSev = calculateMatrixSeverity(impVal, freqVal);
  const solVal = document.getElementById("repSolution").value;

  const template = bugReportTemplates[currentBugTemplateIdx] || bugReportTemplates[0];
  const model = template.modelAnswer;

  Store.incrementReportsCreated();
  Store.addScore(100);
  Store.unlockBadge("qa_auditor");
  if (typeof checkAllBadges === 'function') checkAllBadges();
  updateHeader();

  const compDiv = document.getElementById("bugReportComparison");
  compDiv.classList.remove("hidden");

  compDiv.innerHTML = `
    <div class="comparison-header">
      <h3>🔍 Comparativa de Ficha de Defecto</h3>
      <p>Revisa la precisión de tu ticket frente al estándar de un Senior QA:</p>
    </div>

    <div class="comparison-grid">
      <div class="comp-col student-draft">
        <h4>📝 Tu Reporte:</h4>
        <div class="comp-item"><b>Título:</b> ${escapeHtml(titleVal)}</div>
        <div class="comp-item"><b>Evidencia:</b> ${escapeHtml(evidenceVal)}</div>
        <div class="comp-item"><b>Clasificación:</b> ${charVal} ➔ ${subVal}</div>
        <div class="comp-item"><b>Severidad:</b> <span class="tag ${calcSev}">${calcSev}</span> (${impVal} · ${freqVal})</div>
        <div class="comp-item"><b>Solución Propuesta:</b> ${escapeHtml(solVal)}</div>
      </div>

      <div class="comp-col model-draft">
        <h4>🌟 Ficha Modelo (Senior QA Lead):</h4>
        <div class="comp-item"><b>Título:</b> ${model.title}</div>
        <div class="comp-item"><b>Evidencia:</b> ${model.evidence}</div>
        <div class="comp-item"><b>Clasificación:</b> ${model.characteristic} ➔ ${model.subcharacteristic}</div>
        <div class="comp-item"><b>Severidad:</b> <span class="tag ${model.severity}">${model.severity}</span> (${model.impact} · ${model.frequency})</div>
        <div class="comp-item"><b>Solución Recomendada:</b> ${model.solution}</div>
      </div>
    </div>

    <div class="rubric-box">
      <h4>🎯 Rúbrica de Autoevaluación QA:</h4>
      <label><input type="checkbox"> Identifiqué la característica y subcaracterística correcta de la norma ISO 25010.</label>
      <label><input type="checkbox"> Mi severidad basada en impacto y frecuencia coincidió con la prioridad real.</label>
      <label><input type="checkbox"> Mi propuesta ataca la causa raíz y no solo el síntoma superficial.</label>
    </div>

    <div style="display:flex; gap:10px; margin-top:20px; flex-wrap:wrap;">
      <button class="primary-btn" onclick="startBugReport(${currentBugTemplateIdx === 0 ? 1 : 0})">
        🔄 Practicar con otro Caso QA
      </button>
      <button class="secondary-btn" onclick="showSection('homeScreen')">
        🏠 Menú Principal
      </button>
    </div>
  `;

  compDiv.scrollIntoView({ behavior: 'smooth' });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
