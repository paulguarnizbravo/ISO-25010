/* Casos de estudio: evidencia, clasificación ISO y severidad */
const caseStudies = [
  {
    title: 'ShopNova · CyberDay', sector: 'E-commerce · alta concurrencia',
    intro: 'Lee el incidente como si formaras parte del equipo de QA. Pulsa las evidencias que consideres relevantes para subrayarlas y luego clasifica cada defecto.',
    narrative: [
      'Durante la campaña CyberDay, el tráfico concurrente escaló de 1,200 a 8,500 usuarios activos simultáneos y el flujo de compras colapsó durante las primeras seis horas.',
      'El endpoint /api/checkout/summary elevó su latencia media de 450 ms a casi 15 segundos bajo 3,000 req/s, disparando errores HTTP 504 Gateway Timeout en el 35% de las sesiones.',
      'La falta de sincronización con la pasarela de pagos debitaba dinero al cliente mientras el backend marcaba la orden como FAILED, sin generar pedido ni comprobante.',
      'Los carritos cancelados retuvieron el inventario durante 45 minutos por fallas de consistencia en el catálogo.',
      'Las compras mediante tarjetas guardadas y tokens 3D Secure v2 fueron rechazadas con el mensaje “objeto no encontrado”.',
      'En móviles menores a 390 px, el botón de pago se superpuso sobre términos y condiciones e interrumpió el flujo.',
      'El código CVV y datos de facturación quedaron guardados en texto plano dentro de access.log.'
    ],
    highlights: ['de 1,200 a 8,500 usuarios activos simultáneos','casi 15 segundos','HTTP 504 Gateway Timeout en el 35% de las sesiones','debitaba dinero al cliente mientras el backend marcaba la orden como FAILED','retuvieron el inventario durante 45 minutos','tokens 3D Secure v2 fueron rechazadas','botón de pago se superpuso sobre términos y condiciones','CVV y datos de facturación quedaron guardados en texto plano'],
    defects: [
      ['D01','El sistema colapsa al crecer de 1,200 a 8,500 usuarios.','Eficiencia de desempeño','Capacidad','Alta'],
      ['D02','La latencia del checkout aumenta de 450 ms a 15 s.','Eficiencia de desempeño','Comportamiento temporal','Alta'],
      ['D03','35% de las sesiones termina en HTTP 504.','Fiabilidad','Disponibilidad','Alta'],
      ['D04','Se debita el dinero, pero la orden queda FAILED.','Adecuación funcional','Corrección funcional','Alta'],
      ['D05','El inventario queda retenido durante 45 minutos.','Fiabilidad','Capacidad de recuperación','Media'],
      ['D06','Tokens 3D Secure v2 son rechazados.','Compatibilidad','Interoperabilidad','Alta'],
      ['D07','El botón de pago se superpone en pantalla móvil.','Usabilidad','Operabilidad','Media'],
      ['D08','CVV y facturación se guardan en texto plano.','Seguridad','Confidencialidad','Alta']
    ]
  },
  {
    title: 'MediLink · Portal de citas', sector: 'Salud · continuidad y privacidad',
    intro: 'Identifica los atributos comprometidos antes de revisar la solución.',
    narrative: [
      'Durante una actualización, el portal dejó de permitir reservar citas durante 40 minutos.',
      'Al recuperar el servicio, algunos pacientes vieron horarios duplicados y reservaron dos veces la misma atención.',
      'El lector de pantalla no anunciaba el campo obligatorio de alergias y los usuarios no podían completar el formulario.',
      'La integración con el sistema de laboratorio dejó de importar resultados en formato HL7.'
    ],
    highlights: ['dejó de permitir reservar citas durante 40 minutos','horarios duplicados y reservaron dos veces','lector de pantalla no anunciaba el campo obligatorio de alergias','no podían completar el formulario','dejó de importar resultados en formato HL7'],
    defects: [
      ['D01','El portal no permite reservas por 40 minutos.','Fiabilidad','Disponibilidad','Alta'],
      ['D02','Se crean citas duplicadas tras la recuperación.','Adecuación funcional','Corrección funcional','Alta'],
      ['D03','El lector de pantalla no permite completar el formulario.','Usabilidad','Accesibilidad','Alta'],
      ['D04','No se importan resultados de laboratorio HL7.','Compatibilidad','Interoperabilidad','Alta']
    ]
  },
  {
    title: 'AulaPro · Examen en línea', sector: 'Educación · experiencia de uso',
    intro: 'Analiza un incidente con impacto académico y técnico.',
    narrative: [
      'En el inicio de un examen, la plataforma consumió toda la batería de las tabletas en menos de una hora.',
      'El botón “Enviar examen” no solicitaba confirmación y varios estudiantes enviaron respuestas incompletas por error.',
      'Después de un corte de red, las respuestas no guardadas no pudieron recuperarse.',
      'El sistema solo funcionaba en el navegador institucional y fallaba en dispositivos personales.'
    ],
    highlights: ['consumió toda la batería de las tabletas en menos de una hora','no solicitaba confirmación','enviaron respuestas incompletas por error','no pudieron recuperarse','fallaba en dispositivos personales'],
    defects: [
      ['D01','La plataforma consume la batería en menos de una hora.','Eficiencia de desempeño','Utilización de recursos','Media'],
      ['D02','Enviar examen no solicita confirmación.','Usabilidad','Protección contra errores de usuario','Media'],
      ['D03','Las respuestas se pierden después de un corte de red.','Fiabilidad','Capacidad de recuperación','Alta'],
      ['D04','El sistema falla fuera del navegador institucional.','Portabilidad','Adaptabilidad','Media']
    ]
  },
  {
    title: 'FinPay · Transferencias inmediatas', sector: 'Fintech · transacciones críticas',
    intro: 'Analiza un incidente financiero con fallos de seguridad, tiempo de respuesta e integridad de la operación.',
    narrative: [
      'En quincena, el saldo disponible tardaba hasta 12 segundos en actualizarse después de confirmar una transferencia.',
      'Al reintentar una operación por mala conexión, algunos clientes recibieron dos débitos para la misma transferencia.',
      'El historial mostraba “operación realizada” sin indicar qué dispositivo autorizó el movimiento.',
      'Una sesión cerrada podía reutilizar el enlace de confirmación de transferencia durante 30 minutos.'
    ],
    highlights: ['hasta 12 segundos en actualizarse','recibieron dos débitos para la misma transferencia','sin indicar qué dispositivo autorizó el movimiento','podía reutilizar el enlace de confirmación de transferencia durante 30 minutos'],
    defects: [
      ['D01','El saldo tarda 12 segundos en actualizarse.','Eficiencia de desempeño','Comportamiento temporal','Alta'],
      ['D02','Una operación genera dos débitos.','Adecuación funcional','Corrección funcional','Alta'],
      ['D03','No se puede rastrear el dispositivo que autorizó.','Seguridad','Responsabilidad','Media'],
      ['D04','Un enlace de confirmación puede reutilizarse.','Seguridad','Autenticidad','Alta']
    ]
  },
  {
    title: 'RutaExpress · Entregas urbanas', sector: 'Logística · operación en campo',
    intro: 'Evalúa una plataforma de reparto usada con conectividad irregular y múltiples integraciones.',
    narrative: [
      'Cuando el repartidor perdía señal, la aplicación se cerraba y eliminaba las entregas que aún no se habían sincronizado.',
      'La ubicación en el mapa podía diferir más de 10 km de la posición real del repartidor.',
      'La integración con el operador postal rechazaba códigos de distrito con ceros a la izquierda.',
      'El sistema no permitía instalar la aplicación en dispositivos Android de gama baja usados por nuevos repartidores.'
    ],
    highlights: ['eliminaba las entregas que aún no se habían sincronizado','diferir más de 10 km de la posición real','rechazaba códigos de distrito con ceros a la izquierda','no permitía instalar la aplicación en dispositivos Android de gama baja'],
    defects: [
      ['D01','Se pierden entregas no sincronizadas al perder señal.','Fiabilidad','Capacidad de recuperación','Alta'],
      ['D02','El mapa muestra una ubicación incorrecta.','Adecuación funcional','Corrección funcional','Alta'],
      ['D03','El operador postal rechaza formatos de distrito.','Compatibilidad','Interoperabilidad','Media'],
      ['D04','La aplicación no puede instalarse en equipos objetivo.','Portabilidad','Facilidad de instalación','Media']
    ]
  },
  {
    title: 'TrámiteClaro · Portal ciudadano', sector: 'Gobierno digital · acceso inclusivo',
    intro: 'Revisa un trámite público que debe ser comprensible, accesible y estable para toda la ciudadanía.',
    narrative: [
      'La pantalla de inicio no explicaba qué trámite podía realizarse ni qué documentos se necesitaban.',
      'El formulario usaba solo color rojo para señalar errores, por lo que usuarios con baja visión no identificaban los campos inválidos.',
      'El sitio quedaba indisponible todos los lunes por mantenimiento sin aviso previo.',
      'Cambiar una regla de validación obligaba a modificar seis módulos y produjo nuevos errores en otros trámites.'
    ],
    highlights: ['no explicaba qué trámite podía realizarse ni qué documentos se necesitaban','usaba solo color rojo para señalar errores','quedaba indisponible todos los lunes','obligaba a modificar seis módulos'],
    defects: [
      ['D01','No se entiende el objetivo ni requisitos del trámite.','Usabilidad','Inteligibilidad','Media'],
      ['D02','Los errores no son accesibles para baja visión.','Usabilidad','Accesibilidad','Alta'],
      ['D03','El sitio queda indisponible periódicamente.','Fiabilidad','Disponibilidad','Alta'],
      ['D04','Un cambio exige editar muchos módulos.','Mantenibilidad','Capacidad de ser modificado','Media']
    ]
  },
  {
    title: 'VivaPlay · Streaming en vivo', sector: 'Entretenimiento · escala y experiencia',
    intro: 'Clasifica los problemas surgidos durante la transmisión de un evento en directo.',
    narrative: [
      'Con más de 70,000 espectadores, la calidad descendía a 144p y el video se detenía cada pocos segundos.',
      'La opción de subtítulos desaparecía después de cambiar la calidad de video.',
      'El reproductor no conservaba la preferencia de idioma y obligaba a seleccionarla en cada episodio.',
      'Después de desplegar una nueva versión, el chat en vivo dejó de funcionar con navegadores Safari.'
    ],
    highlights: ['más de 70,000 espectadores','el video se detenía cada pocos segundos','opción de subtítulos desaparecía','no conservaba la preferencia de idioma','dejó de funcionar con navegadores Safari'],
    defects: [
      ['D01','El servicio no soporta el volumen de espectadores.','Eficiencia de desempeño','Capacidad','Alta'],
      ['D02','El video se detiene durante la transmisión.','Fiabilidad','Madurez','Alta'],
      ['D03','Los subtítulos desaparecen al cambiar calidad.','Usabilidad','Operabilidad','Media'],
      ['D04','El chat falla en Safari.','Portabilidad','Adaptabilidad','Media']
    ]
  }
];
let activeCaseStudy = 0;

function startCaseStudy(index = 0) { activeCaseStudy = index; showSection('caseStudyScreen'); renderCaseStudy(); }
function caseOptions() { return characteristics.map(c => `<option value="${c.name}">${c.name}</option>`).join(''); }
function subOptions() { return characteristics.flatMap(c => c.subcategories).map(s => `<option value="${s.name}">${s.name}</option>`).join(''); }
function caseNarrativeHtml(c) { return c.narrative.map(p => { let out=p; c.highlights.forEach((h,i) => { if (out.includes(h)) out=out.replace(h, `<button class="case-evidence" data-evidence="${i}" onclick="toggleEvidence(this)">${h}</button>`); }); return `<p>${out}</p>`; }).join(''); }

function renderCaseStudy() {
  const c = caseStudies[activeCaseStudy]; const target = document.getElementById('caseStudyContent'); if (!target) return;
  target.innerHTML = `<button class="back-btn" onclick="showSection('homeScreen')">← Volver al inicio</button>
    <div class="case-study-head"><span class="badge">CASO DE ESTUDIO ${activeCaseStudy + 1} / ${caseStudies.length}</span><h2>${c.title}</h2><p>${c.sector} · ${c.intro}</p><div class="case-switcher">${caseStudies.map((x,i) => `<button class="${i===activeCaseStudy?'active':''}" onclick="startCaseStudy(${i})">${i+1}. ${x.title.split(' · ')[0]}</button>`).join('')}</div></div>
    <div class="case-instructions"><b>Cómo resolverlo</b><span>1. Pulsa solo las frases que sean evidencia. 2. Clasifica cada defecto. 3. Valida tu análisis.</span><em><strong id="evidenceCount">0</strong> evidencias subrayadas</em></div>
    <article class="case-narrative">${caseNarrativeHtml(c)}</article>
    <div class="case-table-wrap"><table class="case-table"><thead><tr><th>ID</th><th>Defecto identificado</th><th>Característica ISO</th><th>Subcaracterística</th><th>Severidad</th></tr></thead><tbody>${c.defects.map(d => `<tr data-id="${d[0]}"><td><b>${d[0]}</b></td><td>${d[1]}</td><td><select aria-label="Característica para ${d[0]}"><option value="">Selecciona</option>${caseOptions()}</select></td><td><select aria-label="Subcaracterística para ${d[0]}"><option value="">Selecciona</option>${subOptions()}</select></td><td><select aria-label="Severidad para ${d[0]}"><option value="">Selecciona</option><option>Alta</option><option>Media</option><option>Baja</option></select></td></tr>`).join('')}</tbody></table></div>
    <div class="case-actions"><button class="primary-btn" onclick="validateCaseStudy()">Validar mi análisis</button><button class="secondary-btn" onclick="revealCaseStudy()">Ver solución guiada</button></div><div id="caseFeedback"></div>`;
}
function toggleEvidence(button) { button.classList.toggle('marked'); document.getElementById('evidenceCount').textContent = document.querySelectorAll('.case-evidence.marked').length; }
function validateCaseStudy() { const c=caseStudies[activeCaseStudy]; let correct=0, total=c.defects.length*3; document.querySelectorAll('.case-table tbody tr').forEach((row,i)=>{ const selects=row.querySelectorAll('select'); const d=c.defects[i]; let rowCorrect=0; [d[2],d[3],d[4]].forEach((value,j)=>{ const ok=selects[j].value===value; selects[j].classList.toggle('answer-ok',ok); selects[j].classList.toggle('answer-bad',!!selects[j].value&&!ok); if(ok){correct++;rowCorrect++;} }); if(typeof Store!=='undefined'&&Store.record){if(selects[0].value)Store.record(d[2],selects[0].value===d[2]);if(selects[1].value)Store.record(d[3],selects[1].value===d[3]);} row.classList.toggle('case-row-ok',rowCorrect===3); }); document.getElementById('caseFeedback').innerHTML=`<div class="case-score"><b>${correct} de ${total} clasificaciones correctas</b><span>${correct===total?'Excelente: clasificaste todos los hallazgos correctamente.':'Revisa las celdas marcadas y utiliza la solución guiada para aprender.'}</span></div>`; }
function revealCaseStudy() { const c=caseStudies[activeCaseStudy]; document.querySelectorAll('.case-table tbody tr').forEach((row,i)=>{ const s=row.querySelectorAll('select'),d=c.defects[i]; s[0].value=d[2];s[1].value=d[3];s[2].value=d[4]; }); validateCaseStudy(); }
