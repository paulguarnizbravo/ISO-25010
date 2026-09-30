/* V8 · Aprendizaje aplicado ISO/IEC 25010 */
let labView = 'overview';

function filterModes(category, button) {
  const rules = {
    learn: ['modelScreen', 'visualMapScreen'],
    practice: ['startDetective', 'startMatchingGame', 'startImageCases', 'startBugReport', "'characteristic'", "'subcategory'", "'cases'", "'quick'"],
    evaluate: ["'exam'"],
    progress: ['badgesScreen', 'certificateScreen']
  };
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('#modeGrid .mode-card').forEach(card => {
    const action = card.getAttribute('onclick') || '';
    card.hidden = category !== 'all' && !(rules[category] || []).some(key => action.includes(key));
  });
}

function startDiagnostic() {
  startGame('diagnostic');
}

function updateLearningPath() {
  const title = document.getElementById('nextStepTitle');
  const text = document.getElementById('nextStepText');
  if (!title || !text) return;
  const errors = Store.getWrong().length;
  if (errors) {
    title.textContent = 'Refuerza tus conceptos pendientes';
    text.textContent = `Tienes ${errors} pregunta${errors > 1 ? 's' : ''} para repasar antes del siguiente examen.`;
  } else if (Store.getProfile().bestScore > 0) {
    title.textContent = 'Sube al nivel intermedio';
    text.textContent = 'Aplica la norma en el simulador de auditoría y en los casos prácticos.';
  }
}

function setLabView(view) {
  labView = view;
  renderLearningLab();
}

function renderLearningLab() {
  const el = document.getElementById('learningLabContent');
  if (!el) return;
  const views = {
    overview: `<div class="lab-hero"><span class="badge">ROADMAP DE APRENDIZAJE</span><h2>Tu ruta para dominar ISO/IEC 25010</h2><p>Avanza de los fundamentos a una auditoría QA. Cada bloque abre la actividad recomendada.</p></div>
      <div class="iso-roadmap" aria-label="Ruta de aprendizaje ISO IEC 25010">
        <div class="roadmap-stage phase-base"><span>01<small>BASE</small></span><button onclick="showSection('modelScreen')"><i>◈</i>Entiende el modelo ISO/IEC 25010<small>Las 8 características y su propósito</small></button></div>
        <div class="roadmap-branches phase-base"><button onclick="showSection('learnScreen')"><i>▤</i>Fichas de características<small>Conceptos y subcaracterísticas</small></button><button onclick="showSection('glossaryScreen')"><i>⌕</i>Buscador inteligente<small>Relaciona términos cotidianos</small></button></div>
        <div class="roadmap-stage phase-recognize"><span>02<small>RECONOCE</small></span><button onclick="startGame('characteristic')"><i>◎</i>Identifica el atributo afectado<small>Quiz de características</small></button></div>
        <div class="roadmap-branches phase-recognize"><button onclick="startMatchingGame()"><i>↔</i>Empareja conceptos<small>Característica + subcaracterística</small></button><button onclick="setLabView('compare')"><i>≋</i>Compara conceptos cercanos<small>Evita confusiones frecuentes</small></button></div>
        <div class="roadmap-stage phase-apply"><span>03<small>APLICA</small></span><button onclick="startDetective()"><i>⌁</i>Investiga defectos reales<small>Evidencia, gravedad e impacto</small></button></div>
        <div class="roadmap-branches phase-apply"><button onclick="startImageCases()"><i>▧</i>Inspecciona interfaces<small>Encuentra fallos en pantalla</small></button><button onclick="setLabView('audit')"><i>✓</i>Audita un caso QA<small>Requisito, evidencia y decisión</small></button></div>
        <div class="roadmap-stage phase-demonstrate"><span>04<small>DEMUESTRA</small></span><button onclick="startGame('exam')"><i>★</i>Presenta el examen adaptativo<small>Refuerza las áreas pendientes</small></button></div>
      </div>`,
    compare: `<div class="lab-panel lab-workspace"><div class="lab-heading"><span class="lab-kicker">01 · DECIDE CON PRECISIÓN</span><h2>Comparador de conceptos</h2><p>Separa atributos que suelen parecer iguales. Lee el síntoma, identifica la pregunta clave y reconoce el atributo correcto.</p></div><div class="compare-cards"><article><span>⚡</span><b>Eficiencia de desempeño</b><p>¿El sistema responde a tiempo y usa bien sus recursos?</p><small><strong>Señal:</strong> una pantalla demora 8 segundos en cargar.</small></article><article><span>🛡️</span><b>Fiabilidad</b><p>¿El sistema mantiene el servicio correcto sin fallar?</p><small><strong>Señal:</strong> la app se cae durante un pago.</small></article><article><span>👤</span><b>Usabilidad</b><p>¿La persona comprende y completa su tarea con facilidad?</p><small><strong>Señal:</strong> no encuentra cómo confirmar una compra.</small></article></div><div class="decision-strip"><b>Regla rápida:</b><span>Lento = rendimiento · Se cae = fiabilidad · Confunde = usabilidad.</span></div><div class="lab-challenge"><span>MINI RETO</span><p>Una app funciona sin caerse, pero tarda 12 segundos en mostrar el saldo. ¿Qué atributo se afecta primero?</p><div><button onclick="answerCompare(this,false)">Fiabilidad</button><button onclick="answerCompare(this,true)">Eficiencia de desempeño</button><button onclick="answerCompare(this,false)">Usabilidad</button></div><small id="compareFeedback"></small></div></div>`,
    audit: `<div class="lab-panel lab-workspace"><div class="lab-heading"><span class="lab-kicker">02 · INVESTIGA UN HALLAZGO</span><h2>Simulador de auditoría QA</h2><p>Trabaja como analista: revisa el requisito, identifica la evidencia y formula una conclusión sustentada.</p></div><div class="audit-flow"><div><i>1</i><b>Requisito</b><span>El usuario debe recuperar su contraseña de forma segura.</span></div><div><i>2</i><b>Evidencia</b><span>El enlace permanece activo 24 h y puede reutilizarse.</span></div><div><i>3</i><b>Impacto</b><span>Una persona no autorizada podría tomar control de la cuenta.</span></div></div><div class="audit-form"><label>Característica<select id="auditCharacteristic"><option>Selecciona</option><option>Seguridad</option><option>Fiabilidad</option><option>Usabilidad</option></select></label><label>Subcaracterística<select id="auditSub"><option>Selecciona</option><option>Autenticidad</option><option>Confidencialidad</option><option>Disponibilidad</option></select></label><label>Severidad<select id="auditSeverity"><option>Selecciona</option><option>Alta</option><option>Media</option><option>Baja</option></select></label></div><label for="auditAnswer">Recomendación para el equipo</label><textarea id="auditAnswer" placeholder="Ej.: invalidar el enlace después de un solo uso..." aria-label="Recomendación de auditoría"></textarea><button class="primary-btn" onclick="revealAudit()">Evaluar mi auditoría</button><div id="auditFeedback"></div></div>`,
    trace: `<div class="lab-panel lab-workspace"><div class="lab-heading"><span class="lab-kicker">03 · CONECTA LA EVIDENCIA</span><h2>Matriz de trazabilidad</h2><p>Una buena auditoría permite seguir la ruta desde una necesidad hasta la característica ISO que justifica el hallazgo.</p></div><div class="trace-table"><div>Requisito</div><div>Caso de prueba</div><div>Hallazgo</div><div>Atributo ISO</div><div>El pago debe responder en menos de 3 s.</div><div>Simular 500 usuarios y medir respuesta.</div><div>Respuesta de 9 s en hora pico.</div><div>Eficiencia de desempeño · Comportamiento temporal</div></div><div class="trace-legend"><span>1. Lo que se espera</span><span>2. Cómo se comprueba</span><span>3. Qué ocurrió</span><span>4. Cómo se clasifica</span></div><div class="lab-challenge"><span>COMPLETA EL ESLABÓN</span><p>El requisito dice: “El usuario podrá usar lector de pantalla”. La prueba falla porque el campo no tiene etiqueta. ¿Qué subcaracterística falta?</p><div><button onclick="answerTrace(this,false)">Operabilidad</button><button onclick="answerTrace(this,true)">Accesibilidad</button><button onclick="answerTrace(this,false)">Estética</button></div><small id="traceFeedback"></small></div></div>`,
    metrics: `<div class="lab-panel lab-workspace"><div class="lab-heading"><span class="lab-kicker">04 · MIDE LA CALIDAD</span><h2>Métricas prácticas</h2><p>Convierte los atributos ISO 25010 en señales observables para informar decisiones de producto.</p></div><div class="metric-list"><div><b>⚡ Eficiencia de desempeño</b><span>Tiempo de respuesta · uso de CPU · transacciones por segundo.</span><em>Meta ejemplo: 95% de respuestas &lt; 3 s.</em></div><div><b>🛡️ Fiabilidad</b><span>Tasa de fallos · disponibilidad · tiempo de recuperación.</span><em>Meta ejemplo: disponibilidad ≥ 99.9%.</em></div><div><b>👤 Usabilidad</b><span>Éxito de tareas · errores por usuario · tiempo para completar.</span><em>Meta ejemplo: 90% completa el pago sin ayuda.</em></div><div><b>🔐 Seguridad</b><span>Vulnerabilidades · sesiones inválidas · intentos bloqueados.</span><em>Meta ejemplo: 0 hallazgos críticos abiertos.</em></div></div><div class="metric-calculator"><span>CALCULADORA</span><h3>Disponibilidad del servicio</h3><label>Minutos totales del período<input id="metricTotal" type="number" value="43200" min="1"></label><label>Minutos de caída<input id="metricDown" type="number" value="35" min="0"></label><button class="primary-btn" onclick="calculateAvailability()">Calcular disponibilidad</button><strong id="metricResult">Ingresa datos para calcular.</strong></div></div>`
  };
  el.innerHTML = `<button class="back-btn" onclick="showSection('homeScreen')">← Volver al inicio</button><nav class="lab-nav" aria-label="Herramientas de aprendizaje"><button class="${labView === 'compare' ? 'active' : ''}" onclick="setLabView('compare')"><i>◈</i><span>Comparar<small>Conceptos</small></span></button><button class="${labView === 'audit' ? 'active' : ''}" onclick="setLabView('audit')"><i>✓</i><span>Auditar<small>Hallazgos</small></span></button><button class="${labView === 'trace' ? 'active' : ''}" onclick="setLabView('trace')"><i>↔</i><span>Trazar<small>Evidencia</small></span></button><button class="${labView === 'metrics' ? 'active' : ''}" onclick="setLabView('metrics')"><i>▥</i><span>Medir<small>Métricas</small></span></button></nav>${views[labView] || views.overview}`;
}

function revealAudit() {
  const answer = document.getElementById('auditAnswer').value.trim();
  const selections = [document.getElementById('auditCharacteristic').value, document.getElementById('auditSub').value, document.getElementById('auditSeverity').value];
  const score = [selections[0] === 'Seguridad', selections[1] === 'Autenticidad', selections[2] === 'Alta'].filter(Boolean).length;
  document.getElementById('auditFeedback').innerHTML = `<div class="study-feedback"><b>${score}/3 clasificaciones correctas.</b><br><b>Respuesta modelo:</b> Seguridad — autenticidad — severidad alta. El enlace reutilizable permite acceso no autorizado; el impacto es alto porque expone la cuenta. ${answer ? '<br><br>Tu recomendación fue registrada como reflexión de auditoría.' : ''}</div>`;
}

function answerCompare(button, correct) { const out=document.getElementById('compareFeedback'); document.querySelectorAll('#compareFeedback').forEach(x=>x.textContent=''); button.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('quiz-right','quiz-wrong')); button.classList.add(correct?'quiz-right':'quiz-wrong'); if(typeof Store!=='undefined'&&Store.record){Store.record('Eficiencia de desempeño',correct);Store.record('Comportamiento temporal',correct);} out.textContent=correct?'Correcto: el síntoma principal es el tiempo de respuesta.':'No exactamente: que no se caiga no descarta un problema de rendimiento.'; }
function answerTrace(button, correct) { const out=document.getElementById('traceFeedback'); button.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('quiz-right','quiz-wrong')); button.classList.add(correct?'quiz-right':'quiz-wrong'); if(typeof Store!=='undefined'&&Store.record){Store.record('Usabilidad',correct);Store.record('Accesibilidad',correct);} out.textContent=correct?'Correcto: una persona que usa lector de pantalla debe poder percibir y operar el campo.':'Revisa el requisito: el problema no es visual ni de manejo general, sino de acceso asistido.'; }
function calculateAvailability() { const total=Number(document.getElementById('metricTotal').value), down=Number(document.getElementById('metricDown').value), out=document.getElementById('metricResult'); if(!total||down<0||down>total){out.textContent='Revisa los valores ingresados.';return;} const value=((total-down)/total*100).toFixed(3); out.textContent=`Disponibilidad: ${value}% · ${value>=99.9?'Cumple una meta alta de servicio.':'Está por debajo de una meta alta de 99.9%.'}`; }
