/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   IMAGE-CASES.JS - Casos con Interfaz Simulada (Mockups)
   Permite tocar/hacer clic en la zona que contiene el defecto visual.
===================================================== */

let imgCaseIdx = 0;
let imgCasesPool = [];
let imgCaseAnswered = false;

function startImageCases() {
  imgCasesPool = shuffle([...imageCases]);
  imgCaseIdx = 0;
  imgCaseAnswered = false;
  score = 0;
  streak = 0;
  updateHeader();
  showSection("imageBugScreen");
  renderImageCase();
}

function renderImageCase() {
  imgCaseAnswered = false;
  const container = document.getElementById("imageBugContent");
  if (!container) return;

  if (imgCaseIdx >= imgCasesPool.length) {
    Store.addScore(score);
    if (typeof checkAllBadges === 'function') checkAllBadges();
    updateHeader();

    container.innerHTML = `
      <div class="det-card final-case-card">
        <div class="badge-icon">📸</div>
        <h2>¡Inspección Visual Completada!</h2>
        <p>Has identificado con éxito los fallos en todas las pantallas simuladas.</p>
        <div style="margin:20px 0;">
          <strong style="font-size:2rem; color:var(--primary);">${score} puntos</strong>
        </div>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="primary-btn" onclick="startImageCases()">🔄 Repetir Inspección</button>
          <button class="secondary-btn" onclick="showSection('homeScreen')">🏠 Menú Principal</button>
        </div>
      </div>
    `;
    return;
  }

  const cur = imgCasesPool[imgCaseIdx];

  container.innerHTML = `
    <div class="mockup-case-container">
      <div class="mockup-header-bar">
        <button class="back-btn" onclick="showSection('homeScreen')">← Salir</button>
        <span class="det-counter">Caso Visual ${imgCaseIdx + 1} de ${imgCasesPool.length} · <b>${cur.sector}</b></span>
      </div>

      <div class="mockup-prompt">
        <h3>${cur.title}</h3>
        <p class="d-instruction">🔍 <b>${cur.instruction}</b></p>
      </div>

      <div class="mockup-viewport" id="mockupViewport">
        ${renderMockupGraphic(cur.mockupType)}
        <div class="hotspots-layer">
          ${cur.hotspots.map((h, i) => `
            <div class="hotspot"
                 data-idx="${i}"
                 style="top:${h.top}; left:${h.left}; width:${h.width}; height:${h.height};"
                 onclick="handleHotspotClick(${i})"
                 role="button"
                 title="Toca para inspeccionar">
            </div>
          `).join("")}
        </div>
      </div>

      <div id="imageCaseFeedback" class="mockup-feedback hidden"></div>
    </div>
  `;
}

function renderMockupGraphic(type) {
  if (type === "bank_transfer") {
    return `
      <div class="mockup-screen phone-frame">
        <div class="phone-statusbar"><span>9:41</span><span>📶 🔋 100%</span></div>
        <div class="phone-app-header">🏦 Billetera Móvil</div>
        <div class="phone-body">
          <div class="ui-card">
            <small>Cuenta Origen: Ahorros Soles</small>
            <div style="font-size:1.1rem; font-weight:700; margin-top:4px;">Saldo: S/ 4,820.00</div>
          </div>
          <div class="ui-card" style="margin-top:10px;">
            <small>Destinatario:</small>
            <div style="font-weight:700;">Juan Carlos Pérez</div>
            <div>CCI: 002-194-001928374-12</div>
            <div style="font-size:1.3rem; font-weight:800; color:var(--primary); margin-top:8px;">Monto: S/ 2,500.00</div>
          </div>
          <div class="ui-button-area" style="margin-top:25px;">
            <button class="mock-btn-danger">⚡ Transferir Ahora S/ 2,500</button>
            <div style="font-size:0.75rem; color:#999; text-align:center; margin-top:4px;">(Envío inmediato sin confirmación)</div>
          </div>
        </div>
      </div>
    `;
  }

  if (type === "hospital_header") {
    return `
      <div class="mockup-screen browser-frame">
        <div class="browser-header">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <div class="browser-url">https://clinica-sanrafael.gob/historias-clinicas/medico</div>
        </div>
        <div class="hospital-top-nav">
          <div class="doc-badge">
            <span style="font-size:1.6rem;">👨‍⚕️</span>
            <div>
              <b>Dr. Roberto Silva</b><br>
              <small>Cirugía General · CMP 48192</small>
            </div>
          </div>
          <div class="exposed-pass-box">
            <span style="font-size:0.75rem; color:#dc2626; font-weight:700;">⚠️ CLAVE DE ACCESO:</span><br>
            <code style="background:#fee2e2; color:#991b1b; padding:2px 6px; border-radius:4px; font-weight:700;">DocSilva#2024!</code>
          </div>
        </div>
        <div class="hospital-body">
          <h4>Historias Clínicas Recientes (14 Pacientes en Espera)</h4>
          <p style="color:#666; font-size:0.9rem;">Seleccione un paciente de la lista para iniciar la consulta.</p>
        </div>
      </div>
    `;
  }

  if (type === "cart_calculation") {
    return `
      <div class="mockup-screen browser-frame">
        <div class="browser-header">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <div class="browser-url">https://tienda-digital.pe/checkout/resumen</div>
        </div>
        <div class="cart-body">
          <h3>🛒 Resumen de tu Compra</h3>
          <div class="cart-items">
            <div class="cart-row">
              <span>🎧 2x Auriculares Bluetooth Pro (S/ 40.00 c/u)</span>
              <b>S/ 80.00</b>
            </div>
            <div class="cart-row">
              <span>🚚 Costo de Envío Estándar</span>
              <b>S/ 10.00</b>
            </div>
          </div>
          <div class="cart-total-box">
            <span>TOTAL CALCULADO:</span>
            <b class="wrong-sum-text">S/ 50.00</b>
          </div>
        </div>
      </div>
    `;
  }

  // mobile_overflow
  return `
    <div class="mockup-screen phone-frame">
      <div class="phone-statusbar"><span>8:30</span><span>📶 🔋 90%</span></div>
      <div class="phone-app-header">🎓 Campus Universitario Móvil</div>
      <div class="phone-body" style="overflow:hidden;">
        <div class="ui-card">
          <b>Bienvenido, Luis Torres</b><br>
          <small>Ciclo Académico 2026-II</small>
        </div>
        <h4 style="margin:12px 0 6px;">Horario Semanal:</h4>
        <div class="broken-table-wrapper">
          <table class="broken-table">
            <thead>
              <tr><th>Hora</th><th>Lunes</th><th>Martes</th><th>Miér...</th><th>Juev...</th><th>Vier...</th></tr>
            </thead>
            <tbody>
              <tr><td>08:00</td><td>Física II</td><td>Cálculo</td><td style="color:#dc2626;">[CORTADO]</td><td style="color:#dc2626;">[CORTADO]</td><td style="color:#dc2626;">[CORTADO]</td></tr>
              <tr><td>10:00</td><td>Química</td><td>Lab Redes</td><td style="color:#dc2626;">[CORTADO]</td><td style="color:#dc2626;">[CORTADO]</td><td style="color:#dc2626;">[CORTADO]</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function handleHotspotClick(idx) {
  if (imgCaseAnswered) return;
  const cur = imgCasesPool[imgCaseIdx];
  const h = cur.hotspots[idx];
  if (!h) return;

  const fb = document.getElementById("imageCaseFeedback");
  fb.classList.remove("hidden");

  if (h.isDefect) {
    imgCaseAnswered = true;
    SoundFX.correct();
    streak++;
    score += 60 + Math.min(streak, 4) * 10;
    updateHeader();

    Store.incrementImageBugsSolved();
    Store.record(h.characteristic, true);
    Store.record(h.subcharacteristic, true);

    if (Store.getProfile().imageBugsSolved >= 3) {
      Store.unlockBadge("bug_hunter");
    }
    if (typeof checkAllBadges === 'function') checkAllBadges();

    fb.innerHTML = `
      <div class="feedback-box success">
        <h4>🎯 ¡Defecto Encontrado!</h4>
        <p>${h.feedback}</p>
        <div class="iso-classification-box">
          <b>Norma ISO 25010:</b> ${h.characteristic} ➔ <b>${h.subcharacteristic}</b><br>
          <b>Gravedad:</b> <span class="tag ${h.severity}">${h.severity}</span>
        </div>
        <button class="primary-btn" style="margin-top:14px;" onclick="nextImageCase()">
          ${imgCaseIdx + 1 < imgCasesPool.length ? "Siguiente Caso Visual →" : "Finalizar Inspección →"}
        </button>
      </div>
    `;

    // Resaltar hotspot en verde
    const spotEl = document.querySelector(`.hotspot[data-idx="${idx}"]`);
    if (spotEl) spotEl.classList.add("defect-hit");
  } else {
    SoundFX.wrong();
    streak = 0;
    updateHeader();

    fb.innerHTML = `
      <div class="feedback-box warning">
        <h4>🔎 Esa área no tiene fallos</h4>
        <p>${h.feedback}</p>
        <small>Observa con cuidado los textos, botones, cálculos y la seguridad de la pantalla.</small>
      </div>
    `;
  }
}

function nextImageCase() {
  imgCaseIdx++;
  renderImageCase();
}
