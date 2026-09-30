/* =====================================================
   ISO/IEC 25010 CHALLENGE - v4
   BADGES-CERT.JS - Insignias, Niveles, Certificado y Ajustes
===================================================== */

/* =====================================================
   1. SISTEMA DE INSIGNIAS Y LOGROS
===================================================== */
function checkAllBadges() {
  const profile = Store.getProfile();

  // 1. Primer Paso
  if (profile.totalScore > 0 || profile.casesSolved > 0) {
    awardBadge("first_step");
  }

  // 2. Detective Junior (5 casos)
  if (profile.casesSolved >= 5) {
    awardBadge("detective_jr");
  }

  // 3. Detective Senior (15 casos)
  if (profile.casesSolved >= 15) {
    awardBadge("detective_sr");
  }

  // 4. Cazador de Bugs (3 casos de imagen)
  if (profile.imageBugsSolved >= 3) {
    awardBadge("bug_hunter");
  }

  // 5. Racha Imparable (10 seguidas)
  if (profile.bestStreak >= 10 || profile.streak >= 10) {
    awardBadge("streak_10");
  }

  // 6. Auditor de Calidad (al menos 1 reporte redactado)
  if (profile.reportsCreated >= 1) {
    awardBadge("qa_auditor");
  }

  // 7. Maestro ISO 25010 (al menos 4 características con >= 80% de dominio)
  const highMasteryCount = characteristics.filter(c => {
    const m = Store.mastery([c.name, ...c.subcategories.map(s => s.name)]);
    return m !== null && m >= 80;
  }).length;

  if (highMasteryCount >= 4) {
    awardBadge("iso_master");
  }
}

function awardBadge(badgeId) {
  const isNew = Store.unlockBadge(badgeId);
  if (isNew) {
    const badgeInfo = badgesCatalog.find(b => b.id === badgeId);
    if (badgeInfo) {
      SoundFX.badge();
      showBadgeToast(badgeInfo);
    }
  }
}

function showBadgeToast(badge) {
  const toast = document.createElement("div");
  toast.className = "badge-toast animate-slide-up";
  toast.innerHTML = `
    <span class="toast-icon">${badge.icon}</span>
    <div>
      <small style="color:var(--secondary); font-weight:700;">¡NUEVA INSIGNIA DESBLOQUEADA!</small>
      <div style="font-weight:800; font-size:1.05rem;">${badge.name}</div>
      <div style="font-size:0.8rem; opacity:0.85;">${badge.description}</div>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function renderBadgesScreen() {
  const container = document.getElementById("badgesContent");
  if (!container) return;

  const unlocked = Store.getBadges();
  const total = badgesCatalog.length;

  container.innerHTML = `
    <div class="badges-gallery-card">
      <div class="report-header-nav">
        <button class="back-btn" onclick="showSection('homeScreen')">← Volver al Menú</button>
        <span class="badge">LOGROS: ${unlocked.length} de ${total}</span>
      </div>

      <div class="section-header" style="margin:16px 0 24px;">
        <h2>🎖️ Tus Insignias de Calidad</h2>
        <p>Demuestra tu experiencia dominando los estándares internacionales de calidad software.</p>
      </div>

      <div class="badges-grid">
        ${badgesCatalog.map(b => {
          const isUnlocked = unlocked.includes(b.id);
          return `
            <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="badge-item-icon">${b.icon}</div>
              <h4>${b.name}</h4>
              <p>${b.description}</p>
              <span class="badge-item-status">
                ${isUnlocked ? '✅ Desbloqueada' : '🔒 Por desbloquear'}
              </span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

/* =====================================================
   2. GENERADOR DE CERTIFICADO IMPRIMIBLE / PDF
===================================================== */
function renderCertificateScreen() {
  const container = document.getElementById("certificateContent");
  if (!container) return;

  const profile = Store.getProfile();
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Calcular nivel en función de casos y puntuación
  let titleLevel = "Evaluador Junior de Software";
  if (profile.casesSolved >= 15 || profile.totalScore >= 2000) {
    titleLevel = "Auditor Especialista en ISO/IEC 25010";
  } else if (profile.casesSolved >= 5 || profile.totalScore >= 800) {
    titleLevel = "Analista de Aseguramiento de Calidad (QA)";
  }

  container.innerHTML = `
    <div class="cert-screen-controls no-print">
      <button class="back-btn" onclick="showSection('homeScreen')">← Volver al Menú</button>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="secondary-btn" onclick="promptChangeName()">✏️ Modificar mi nombre</button>
        <button class="primary-btn" onclick="window.print()">🖨️ Imprimir / Guardar en PDF</button>
      </div>
    </div>

    <!-- CERTIFICADO FORMAL DE ALTA RESOLUCIÓN -->
    <div class="certificate-sheet" id="printableCertificate">
      <div class="cert-border-outer">
        <div class="cert-border-inner">

          <div class="cert-header">
            <div class="cert-iso-badge">ISO / IEC 25010</div>
            <h1>CERTIFICADO DE ACREDITACIÓN</h1>
            <div class="cert-subtitle">SISTEMAS Y CALIDAD DEL PRODUCTO SOFTWARE</div>
          </div>

          <div class="cert-body">
            <p class="cert-certifies">Se certifica que:</p>
            <h2 class="cert-student-name" id="certStudentName">${escapeHtml(profile.name)}</h2>
            <p class="cert-text">
              Ha completado satisfactoriamente los desafíos teórico-prácticos, detección de defectos
              y evaluación técnica bajo los estándares del modelo de calidad <b>ISO/IEC 25010</b>,
              alcanzando la distinción de:
            </p>
            <div class="cert-level-badge">🏅 ${titleLevel}</div>
          </div>

          <div class="cert-breakdown">
            <div class="cert-breakdown-title">DESGLOSE DE DOMINIO POR CARACTERÍSTICA:</div>
            <div class="cert-bars-grid">
              ${characteristics.map(c => {
                const m = Store.mastery([c.name, ...c.subcategories.map(s => s.name)]) ?? 0;
                return `
                  <div class="cert-bar-row">
                    <span>${c.name}</span>
                    <div class="cert-bar-track">
                      <div class="cert-bar-fill" style="width:${m}%;"></div>
                    </div>
                    <b>${m}%</b>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div class="cert-footer">
            <div class="cert-seal">
              <div class="seal-circle">
                <span>ISO</span>
                <b>25010</b>
                <small>CALIDAD</small>
              </div>
            </div>

            <div class="cert-sign">
              <div class="sign-line"></div>
              <b>Comité de Calidad y Evaluación ISO 25010</b>
              <small>Fecha de expedición: ${dateStr}</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function promptChangeName() {
  const current = Store.getProfile().name;
  const newName = prompt("Ingresa tu nombre y apellidos para el certificado:", current);
  if (newName && newName.trim()) {
    Store.setPlayerName(newName);
    renderCertificateScreen();
  }
}

/* =====================================================
   3. PANEL DE AJUSTES Y PREFERENCIAS
===================================================== */
function openSettingsModal() {
  const modal = document.getElementById("settingsModal");
  if (!modal) return;

  const settings = Store.getSettings();
  const profile = Store.getProfile();

  document.getElementById("setPlayerName").value = profile.name;
  document.getElementById("setTheme").value = settings.theme;
  document.getElementById("setSound").checked = !!settings.sound;
  document.getElementById("setDifficulty").value = settings.difficulty;

  modal.classList.remove("hidden");
  SoundFX.click();
}

function closeSettingsModal() {
  const modal = document.getElementById("settingsModal");
  if (modal) modal.classList.add("hidden");
}

function saveSettingsModal() {
  const nameVal = document.getElementById("setPlayerName").value;
  const themeVal = document.getElementById("setTheme").value;
  const soundVal = document.getElementById("setSound").checked;
  const diffVal = document.getElementById("setDifficulty").value;

  Store.setPlayerName(nameVal);
  Store.updateSettings({
    theme: themeVal,
    sound: soundVal,
    difficulty: diffVal
  });

  applyTheme(themeVal);
  closeSettingsModal();
  SoundFX.correct();

  // Actualizar la pantalla de inicio si procede
  if (typeof renderProgress === 'function') renderProgress();
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function toggleThemeQuick() {
  const currentTheme = Store.getSettings().theme;
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  Store.updateSettings({ theme: nextTheme });
  applyTheme(nextTheme);
  SoundFX.click();
}
