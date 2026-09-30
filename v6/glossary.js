/* =====================================================
   ISO/IEC 25010 CHALLENGE - v6
   GLOSSARY.JS - Buscador Inteligente / Glosario de Bolsillo
   Escribe cualquier palabra cotidiana y ve a qué característica
   y subcaracterística ISO 25010 pertenece, con su regla de oro.
===================================================== */

/**
 * Base de datos del Buscador Inteligente.
 * Cada entrada contiene:
 *  - keywords: palabras o frases que activan el resultado
 *  - characteristic: nombre de la característica ISO 25010
 *  - charIcon: emoji de la característica
 *  - subcategory: subcaracterística(s) relevante(s)
 *  - rule: la "regla de oro" que explica el por qué
 *  - example: ejemplo real en 1 frase
 */
const glossaryDB = [

  /* ─────────────────────────────────────────────
     1. ADECUACIÓN FUNCIONAL
  ───────────────────────────────────────────── */
  {
    keywords: ["funciones", "característica faltante", "no hace lo que pido", "falta función", "no existe la opción", "botón que falta", "función incompleta", "feature faltante"],
    characteristic: "Adecuación Funcional",
    charIcon: "✅",
    subcategory: "Completitud funcional",
    rule: "Si el software no tiene todas las funciones que el usuario necesita, el software está incompleto.",
    example: "Una app de pagos que no permite pagar con tarjeta de crédito."
  },
  {
    keywords: ["resultado incorrecto", "cálculo mal", "suma mal", "dato erróneo", "respuesta equivocada", "error de cálculo", "precio mal calculado", "factura incorrecta"],
    characteristic: "Adecuación Funcional",
    charIcon: "✅",
    subcategory: "Corrección funcional",
    rule: "Si las funciones existen pero producen resultados equivocados, la función está mal hecha.",
    example: "El impuesto calculado en la factura es 21% cuando debería ser 18%."
  },
  {
    keywords: ["función inútil", "no sirve para mi tarea", "proceso complicado", "pasos innecesarios", "da un rodeo", "dificulta la tarea", "no me ayuda"],
    characteristic: "Adecuación Funcional",
    charIcon: "✅",
    subcategory: "Pertinencia funcional",
    rule: "La función existe y es correcta, pero no te ayuda a hacer tu tarea de forma eficaz.",
    example: "Un sistema de reservas que obliga a registrarte antes de ver disponibilidad."
  },

  /* ─────────────────────────────────────────────
     2. EFICIENCIA DE DESEMPEÑO
  ───────────────────────────────────────────── */
  {
    keywords: ["lento", "tarda mucho", "carga lenta", "no responde rápido", "demora", "tiempo de respuesta", "loading infinito", "espera mucho", "lentitud", "lag", "latencia"],
    characteristic: "Eficiencia de desempeño",
    charIcon: "⚡",
    subcategory: "Comportamiento temporal",
    rule: "El sistema existe y funciona, pero tarda más de lo aceptable en responder al usuario.",
    example: "Una tienda en línea que tarda 8 segundos en mostrar los resultados de búsqueda."
  },
  {
    keywords: ["batería", "consume batería", "gasta mucha batería", "agota la batería", "sobrecalentamiento", "calentamiento del celular", "drena batería", "cpu al 100", "memoria ram", "ram llena", "memoria llena", "fuga de memoria", "memory leak", "disco lleno", "almacenamiento lleno", "recursos", "utilización de recursos", "consumo excesivo"],
    characteristic: "Eficiencia de desempeño",
    charIcon: "⚡",
    subcategory: "Utilización de recursos",
    rule: "El sistema usa más RAM, CPU, disco o batería de lo que debería para hacer su tarea.",
    example: "Una app de música que consume el 30% de la batería en 1 hora de uso en segundo plano."
  },
  {
    keywords: ["capacidad", "muchos usuarios", "colapsa con tráfico", "cae el servidor", "sobrecarga", "escala", "no soporta carga", "miles de usuarios", "pico de usuarios", "black friday colapso", "saturación"],
    characteristic: "Eficiencia de desempeño",
    charIcon: "⚡",
    subcategory: "Capacidad",
    rule: "El sistema no puede manejar el volumen máximo de operaciones o usuarios simultáneos.",
    example: "El portal de matrículas de una universidad colapsa el primer día de inscripciones."
  },

  /* ─────────────────────────────────────────────
     3. COMPATIBILIDAD
  ───────────────────────────────────────────── */
  {
    keywords: ["docker", "linux a windows", "contenedor", "portabilidad de app", "migrar sistema", "distinto sistema operativo", "funciona en mac no en windows", "no funciona en linux", "adaptabilidad del sistema", "entorno diferente"],
    characteristic: "Portabilidad",
    charIcon: "📦",
    subcategory: "Adaptabilidad",
    rule: "Si el software solo funciona bien en un entorno (sistema operativo, hardware, nube) y falla en otro, le falta adaptabilidad.",
    example: "Una app que funciona en Windows 10 pero falla en Windows 11 sin modificaciones."
  },
  {
    keywords: ["dos apps juntas", "no conviven", "conflicto de apps", "interfiere con otra app", "crash al abrir dos", "se bloquean mutuamente", "coexistencia"],
    characteristic: "Compatibilidad",
    charIcon: "🔗",
    subcategory: "Coexistencia",
    rule: "Si dos aplicaciones funcionan solas pero se interfieren entre sí al usarlas al mismo tiempo, les falta coexistencia.",
    example: "Un antivirus que bloquea la cámara cuando intentas usar una app de videollamadas."
  },
  {
    keywords: ["interoperabilidad", "api no conecta", "no se comunica con otro sistema", "envía datos a otro sistema", "integración", "sistema externo", "json", "xml", "intercambio de datos", "erp no conecta", "sistemas distintos que deben hablar"],
    characteristic: "Compatibilidad",
    charIcon: "🔗",
    subcategory: "Interoperabilidad",
    rule: "Si dos sistemas deberían intercambiar datos y uno no procesa correctamente lo que envía el otro, falla la interoperabilidad.",
    example: "Un hospital que no puede importar los resultados de laboratorio de una clínica aliada por formatos distintos."
  },

  /* ─────────────────────────────────────────────
     4. USABILIDAD
  ───────────────────────────────────────────── */
  {
    keywords: ["difícil de aprender", "no entiendo cómo usarlo", "curva de aprendizaje", "confuso", "no es intuitivo", "primer uso complicado", "aprendizaje difícil", "tutorial necesario", "no se entiende"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Facilidad de aprendizaje",
    rule: "Si un usuario nuevo no puede aprender a usar el sistema sin entrenamiento extenso, la curva de aprendizaje es demasiado alta.",
    example: "Un software de contabilidad que requiere 2 semanas de capacitación para registrar una factura."
  },
  {
    keywords: ["ctrl+z", "deshacer", "undo", "revertir", "no puedo volver atrás", "borré sin querer", "acción accidental", "doble confirmación", "botón peligroso", "sin confirmación de borrado", "protección de errores", "error de usuario"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Protección contra errores de usuario",
    rule: "Si el sistema no protege al usuario de cometer acciones destructivas accidentales (sin confirmar, sin deshacer), le falta protección contra errores.",
    example: "Un formulario que borra todos los datos ingresados al presionar 'Cancelar' sin pedir confirmación."
  },
  {
    keywords: ["estético", "feo", "interfaz poco atractiva", "diseño horrible", "colores raros", "tipografía ilegible", "fuente pequeña", "contraste bajo", "accesibilidad visual", "modo oscuro", "no me agrada visualmente"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Estética de la interfaz de usuario",
    rule: "La interfaz debe ser visualmente agradable, ordenada y facilitar la lectura. Un diseño pobre afecta la satisfacción.",
    example: "Una app de salud con fondo negro, texto gris oscuro y botones diminutos."
  },
  {
    keywords: ["accesibilidad", "daltónico", "lector de pantalla", "discapacidad", "ciego", "sordo", "subtítulos", "aria label", "wcag", "acceso a personas con discapacidad"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Accesibilidad",
    rule: "El sistema debe ser utilizable por personas con diversas capacidades físicas o sensoriales.",
    example: "Una plataforma educativa que no tiene subtítulos en los videos para estudiantes con problemas auditivos."
  },
  {
    keywords: ["reconocer si sirve", "no sé si este es el programa que busco", "no es claro para qué sirve", "qué hace este software", "propósito no claro", "no me deja probar antes de comprar"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Reconocimiento de la adecuación",
    rule: "El usuario debe poder reconocer rápidamente si el software es útil para su propósito antes de instalarlo o pagarlo.",
    example: "Un software sin demo ni descripción clara de sus funciones principales."
  },
  {
    keywords: ["experto usa rápido", "usuario avanzado", "teclas rápidas", "atajos de teclado", "shortcut", "eficiencia de uso", "flujo de trabajo experto", "operabilidad", "se adapta a mí"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Operabilidad",
    rule: "Un sistema operable se puede controlar y personalizar. El experto puede usar atajos; el novato tiene guías.",
    example: "Un editor de código sin atajos de teclado configurables que obliga a usar siempre el menú."
  },

  /* ─────────────────────────────────────────────
     5. FIABILIDAD
  ───────────────────────────────────────────── */
  {
    keywords: ["cae", "crash", "se cierra solo", "error inesperado", "falla el sistema", "excepción no controlada", "apagón", "falla sin avisar", "madurez del sistema", "sistema inestable"],
    characteristic: "Fiabilidad",
    charIcon: "🛡️",
    subcategory: "Madurez",
    rule: "Un sistema maduro falla poco. Si se cae frecuentemente o lanza excepciones no controladas, no es maduro.",
    example: "Una app bancaria que cierra inesperadamente cuando el usuario tiene más de 50 transacciones."
  },
  {
    keywords: ["rollback", "restaurar datos", "recuperar datos", "backup", "se cayó y volvió", "reanudó después del fallo", "volvió a funcionar", "recuperación", "after crash", "base de datos restaurada"],
    characteristic: "Fiabilidad",
    charIcon: "🛡️",
    subcategory: "Capacidad de recuperación",
    rule: "Tras un fallo, el sistema debe poder retomar su operación y restablecer los datos sin pérdida.",
    example: "Un servidor de base de datos que, tras un corte de luz, restaura automáticamente la última transacción confirmada."
  },
  {
    keywords: ["seguir funcionando cuando falla parte", "un servidor cae y sigue", "servidor redundante", "sin interrupción", "alta disponibilidad", "tolerancia a fallos", "no se apagó", "sigue operando con fallo"],
    characteristic: "Fiabilidad",
    charIcon: "🛡️",
    subcategory: "Tolerancia a fallos",
    rule: "El sistema continúa operando aunque una de sus partes falle. Es diferente a recuperarse: nunca dejó de funcionar.",
    example: "Netflix mantiene el servicio aunque fallen 3 de sus 10 servidores de streaming."
  },
  {
    keywords: ["disponibilidad", "tiempo activo", "uptime", "99.9%", "siempre disponible", "24/7", "caída del servicio", "downtime", "fuera de servicio"],
    characteristic: "Fiabilidad",
    charIcon: "🛡️",
    subcategory: "Disponibilidad",
    rule: "El sistema debe estar operativo y accesible cuando el usuario lo necesite, con el menor tiempo de inactividad posible.",
    example: "Un sistema hospitalario que tiene 4 horas de mantenimiento sin aviso durante turnos nocturnos."
  },

  /* ─────────────────────────────────────────────
     6. SEGURIDAD
  ───────────────────────────────────────────── */
  {
    keywords: ["contraseña", "datos privados", "información confidencial", "acceso no autorizado", "ver datos sin permiso", "espionaje", "leak de datos", "fuga de información", "datos expuestos", "sin cifrado", "sin encriptación"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "Confidencialidad",
    rule: "Solo los usuarios autorizados deben acceder a los datos. Si alguien ve datos sin permiso, falla la confidencialidad.",
    example: "Un hacker accede a la base de datos médica y lee diagnósticos de pacientes."
  },
  {
    keywords: ["modificó datos sin permiso", "datos alterados", "alguien cambió el registro", "datos manipulados", "integridad de datos", "dato corrupto", "registro modificado ilegalmente", "tipo de sangre cambiado"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "Integridad",
    rule: "Los datos solo deben ser modificados por quienes tienen permiso. Si alguien los alteró sin autorización, falla la integridad.",
    example: "Un atacante cambia el saldo de una cuenta bancaria en la base de datos directamente."
  },
  {
    keywords: ["no repudio", "firma digital", "no puedo negar que lo hice", "prueba de acción", "evidencia digital", "log de acción", "quién aprobó la transferencia", "registro de quién actuó"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "No repudio",
    rule: "El usuario realizó una acción y no puede negar haberla hecho porque existe evidencia digital firmada.",
    example: "Un empleado aprueba una orden de compra con firma digital; no puede alegar que no fue él."
  },
  {
    keywords: ["responsabilidad", "log de auditoría", "quién hizo qué", "rastro de acciones", "historial de cambios", "accountability", "traza de actividad", "quién borró el archivo", "registro de acceso"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "Responsabilidad",
    rule: "El sistema registra quién hizo qué y cuándo, para poder identificar responsables en caso de incidente.",
    example: "El sistema de auditoría detecta que el admin2 eliminó 500 registros de clientes el viernes a las 11 PM."
  },
  {
    keywords: ["autenticación", "verificación de identidad", "login", "2fa", "doble factor", "verificar usuario", "quién eres", "identidad falsa", "suplantación de identidad", "phishing", "usuario ficticio"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "Autenticidad",
    rule: "El sistema debe verificar que el usuario es quien dice ser antes de dar acceso.",
    example: "Un portal bancario sin autenticación de dos factores que permite a un hacker acceder solo con usuario y contraseña robados."
  },

  /* ─────────────────────────────────────────────
     7. MANTENIBILIDAD
  ───────────────────────────────────────────── */
  {
    keywords: ["difícil de modificar", "código espagueti", "código sucio", "no tiene comentarios", "difícil de leer", "código sin documentar", "mantenibilidad", "hard to maintain", "deuda técnica"],
    characteristic: "Mantenibilidad",
    charIcon: "🔧",
    subcategory: "Analizabilidad",
    rule: "Si el equipo tarda mucho en entender qué hace el código para diagnosticar un error, le falta analizabilidad.",
    example: "Un desarrollador tarda 3 días en ubicar la causa de un bug porque el código no tiene documentación."
  },
  {
    keywords: ["efecto secundario", "arreglo un bug y aparece otro", "regresión", "cambio rompe otra cosa", "modificar y afectar lo demás", "side effect", "efecto colateral"],
    characteristic: "Mantenibilidad",
    charIcon: "🔧",
    subcategory: "Modificabilidad",
    rule: "Si un cambio en el código genera nuevos bugs en otras partes del sistema, la modificabilidad es baja.",
    example: "Cambiar la fórmula de descuento rompe el módulo de facturación que nadie estaba tocando."
  },
  {
    keywords: ["prueba unitaria", "test automatizado", "difícil de testear", "no puedo hacer pruebas", "cobertura de código", "tdd", "unit test", "testing difícil"],
    characteristic: "Mantenibilidad",
    charIcon: "🔧",
    subcategory: "Capacidad de ser probado",
    rule: "El sistema debe poder ser probado fácilmente. Si es imposible escribir pruebas, el código tiene acoplamiento excesivo.",
    example: "Un módulo de pagos sin interfaces ni inyección de dependencias que no puede testearse sin una tarjeta real."
  },
  {
    keywords: ["modular", "código repetido", "copy paste", "duplicación de código", "reusabilidad", "función copiada", "no reutiliza"],
    characteristic: "Mantenibilidad",
    charIcon: "🔧",
    subcategory: "Reusabilidad",
    rule: "El código debe estar organizado en componentes reutilizables. La duplicación aumenta el costo de mantenimiento.",
    example: "La misma validación de email está copiada en 12 archivos distintos del proyecto."
  },

  /* ─────────────────────────────────────────────
     8. PORTABILIDAD
  ───────────────────────────────────────────── */
  {
    keywords: ["instalación difícil", "instalar en otro equipo", "setup complicado", "instalabilidad", "proceso de instalación", "pasos de instalación", "instalar en nuevo servidor"],
    characteristic: "Portabilidad",
    charIcon: "📦",
    subcategory: "Instalabilidad",
    rule: "El software debe poder instalarse y desinstalarse fácilmente en cualquier entorno donde esté diseñado para funcionar.",
    example: "Un sistema ERP que requiere 3 técnicos especializados y 2 días para ser instalado en un nuevo servidor."
  },
  {
    keywords: ["reemplazar componente", "cambiar proveedor", "migrar a otro software", "sustituir por otro", "desinstalar y poner otro", "reemplazar sistema", "reemplazabilidad"],
    characteristic: "Portabilidad",
    charIcon: "📦",
    subcategory: "Reemplazabilidad",
    rule: "Debe ser posible reemplazar el sistema por otro equivalente sin grandes costos de migración.",
    example: "Cambiar de MySQL a PostgreSQL obliga a reescribir el 70% de las consultas del sistema."
  },
  {
    keywords: ["cloud", "nube", "aws", "azure", "google cloud", "migrar a la nube", "entorno de producción distinto", "cambia el entorno", "on premise a cloud"],
    characteristic: "Portabilidad",
    charIcon: "📦",
    subcategory: "Adaptabilidad",
    rule: "Si el software no puede trasladarse a un nuevo entorno (nube, nuevo SO, nuevo hardware) sin modificaciones, tiene baja adaptabilidad.",
    example: "Una aplicación que solo funciona en servidores físicos de la empresa y no puede migrarse a AWS."
  },

  /* ─────────────────────────────────────────────
     TÉRMINOS GENERALES MULTI-CARACTERÍSTICA
  ───────────────────────────────────────────── */
  {
    keywords: ["bug", "defecto", "error", "fallo", "problema"],
    characteristic: "Depende del contexto",
    charIcon: "🔍",
    subcategory: "Múltiples subcaracterísticas posibles",
    rule: "Un 'bug' puede afectar a cualquier característica: si la función es incorrecta → Corrección funcional. Si el sistema cae → Fiabilidad. Si hay acceso no autorizado → Seguridad. El contexto determina la característica.",
    example: "Un bug de login puede ser Seguridad (si permite acceso sin credenciales) o Fiabilidad (si cierra la sesión sola)."
  },
  {
    keywords: ["rendimiento", "performance", "desempeño", "eficiencia"],
    characteristic: "Eficiencia de desempeño",
    charIcon: "⚡",
    subcategory: "Comportamiento temporal / Utilización de recursos / Capacidad",
    rule: "El rendimiento engloba 3 aspectos: velocidad de respuesta, consumo de recursos y cantidad máxima de usuarios soportados.",
    example: "Una API lenta (tiempo), que usa el 90% de RAM (recursos), que colapsa con 100 usuarios (capacidad)."
  },
  {
    keywords: ["actualización", "patch", "parche", "nueva versión", "update", "upgrade"],
    characteristic: "Mantenibilidad / Portabilidad",
    charIcon: "🔧📦",
    subcategory: "Modificabilidad / Instalabilidad",
    rule: "Aplicar actualizaciones es fácil si el sistema tiene buena modificabilidad (cambiar el código) e instalabilidad (desplegar el nuevo paquete).",
    example: "Un microservicio que se actualiza con un solo comando 'docker pull' sin afectar los demás servicios."
  },
  {
    keywords: ["gdpr", "rgpd", "datos personales", "privacidad", "protección de datos", "ley de datos"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "Confidencialidad / Responsabilidad",
    rule: "El cumplimiento del GDPR requiere confidencialidad (datos cifrados, acceso restringido) y responsabilidad (registros de auditoría de quién accedió).",
    example: "Un sistema que almacena contraseñas en texto plano viola el GDPR por falta de Confidencialidad."
  },
  {
    keywords: ["responsive", "móvil", "tablet", "pantalla pequeña", "diseño adaptable", "app web en celular", "media query"],
    characteristic: "Portabilidad / Usabilidad",
    charIcon: "📦🖥️",
    subcategory: "Adaptabilidad / Estética de la interfaz",
    rule: "Una interfaz responsive es adaptable (funciona en distintos dispositivos) y estética (se ve correctamente en todos ellos).",
    example: "Una tienda en línea cuyo menú desaparece en pantallas menores a 400px de ancho."
  },
  {
    keywords: ["ciberseguridad", "hacker", "ataque", "vulnerabilidad", "sql injection", "xss", "cross-site scripting", "inyección sql"],
    characteristic: "Seguridad",
    charIcon: "🔒",
    subcategory: "Confidencialidad / Integridad / Autenticidad",
    rule: "Los ataques cibernéticos suelen afectar 3 pilares: ver datos sin permiso (Confidencialidad), modificarlos (Integridad) o suplantar identidades (Autenticidad).",
    example: "Un ataque de SQL Injection puede robar contraseñas (Confidencialidad) y modificar registros (Integridad) a la vez."
  },
  {
    keywords: ["ux", "experiencia de usuario", "user experience", "diseño ux", "flujo de usuario", "journey del usuario"],
    characteristic: "Usabilidad",
    charIcon: "🖥️",
    subcategory: "Facilidad de aprendizaje / Operabilidad / Estética",
    rule: "La experiencia de usuario (UX) abarca cómo se siente usar el sistema: qué tan rápido se aprende, cuánto control tiene el usuario y qué tan agradable es visualmente.",
    example: "Un flujo de checkout de 7 pasos que podría resolverse en 2, daña la UX por baja operabilidad."
  },
  {
    keywords: ["pruebas de regresión", "regression test", "automatización de pruebas", "ci cd", "pipeline", "integración continua", "entrega continua"],
    characteristic: "Mantenibilidad",
    charIcon: "🔧",
    subcategory: "Capacidad de ser probado / Modificabilidad",
    rule: "Un CI/CD eficiente requiere que el código sea fácil de probar automáticamente y que los cambios no rompan funcionalidades existentes.",
    example: "Un pipeline de CI/CD que tarda 40 minutos porque las pruebas están mal estructuradas y son dependientes entre sí."
  },
  {
    keywords: ["sla", "acuerdo de nivel de servicio", "contrato de servicio", "garantía de disponibilidad", "tiempo de respuesta garantizado"],
    characteristic: "Fiabilidad / Eficiencia de desempeño",
    charIcon: "🛡️⚡",
    subcategory: "Disponibilidad / Comportamiento temporal",
    rule: "Un SLA garantiza dos cosas: que el sistema esté disponible (Fiabilidad) y que responda dentro de un tiempo acordado (Eficiencia de desempeño).",
    example: "Un SLA que promete 99.9% de uptime y respuesta máxima de 200ms por consulta."
  },
  {
    keywords: ["api", "endpoint", "servicio web", "rest", "soap", "microservicio", "webservice"],
    characteristic: "Compatibilidad / Adecuación Funcional",
    charIcon: "🔗✅",
    subcategory: "Interoperabilidad / Completitud funcional",
    rule: "Una API debe exponer correctamente todas las operaciones necesarias (Completitud) y ser compatible con los sistemas que la consumen (Interoperabilidad).",
    example: "Una API de pagos que no expone el endpoint de reembolso, siendo una función esencial para los comercios."
  }
];

/* =====================================================
   MOTOR DEL BUSCADOR INTELIGENTE
===================================================== */

let glossarySearchTimeout = null;

/**
 * Busca en glossaryDB las entradas que coincidan con el texto ingresado.
 * Devuelve un array de resultados ordenados por relevancia.
 */
function searchGlossary(query) {
  if (!query || query.trim().length < 2) return [];

  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const results = [];

  glossaryDB.forEach(entry => {
    let score = 0;
    let matchedKw = null;

    for (const kw of entry.keywords) {
      const kwNorm = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (kwNorm === q) {
        score = 100; // exacto
        matchedKw = kw;
        break;
      } else if (kwNorm.includes(q) || q.includes(kwNorm)) {
        const s = kwNorm.includes(q) ? 70 : 50;
        if (s > score) {
          score = s;
          matchedKw = kw;
        }
      } else {
        // Coincidencia parcial por palabras individuales
        const words = q.split(/\s+/);
        const kwWords = kwNorm.split(/\s+/);
        const hits = words.filter(w => w.length > 2 && kwWords.some(kw2 => kw2.includes(w) || w.includes(kw2)));
        if (hits.length > 0) {
          const s = Math.round((hits.length / Math.max(words.length, kwWords.length)) * 40);
          if (s > score) {
            score = s;
            matchedKw = kw;
          }
        }
      }
    }

    if (score > 0) {
      results.push({ ...entry, _score: score, _matchedKw: matchedKw });
    }
  });

  // Ordenar por relevancia DESC, eliminar duplicados de característica con menor score
  results.sort((a, b) => b._score - a._score);
  return results.slice(0, 6); // Máximo 6 resultados
}

/* =====================================================
   RENDER DEL BUSCADOR EN LA PANTALLA
===================================================== */

function initGlossaryScreen() {
  const container = document.getElementById('glossaryContent');
  if (!container) return;

  container.innerHTML = `
    <div class="glossary-wrap">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
        <button class="back-btn" style="margin:0;" onclick="showSection('homeScreen')">← Volver al Menú</button>
        <span class="badge">🔍 BUSCADOR INTELIGENTE</span>
      </div>

      <div class="glossary-hero">
        <h2>🔍 Glosario de Bolsillo <span>ISO 25010</span></h2>
        <p>Escribe cualquier palabra cotidiana (en español o técnico) y te digo exactamente a qué <b>característica</b> y <b>subcaracterística</b> pertenece, con su regla de oro.</p>
      </div>

      <div class="glossary-search-box">
        <div class="glossary-input-wrap">
          <span class="glossary-search-icon">🔎</span>
          <input
            type="text"
            id="glossaryInput"
            class="glossary-input"
            placeholder='Prueba: "contraseña", "lento", "rollback", "batería"…'
            autocomplete="off"
            spellcheck="false"
            oninput="onGlossaryInput(this.value)"
            onkeydown="onGlossaryKey(event)"
          >
          <button class="glossary-clear-btn" id="glossaryClearBtn" onclick="clearGlossarySearch()" title="Limpiar">✕</button>
        </div>

        <div class="glossary-chips" id="glossaryChips">
          <span class="chip-label">💡 Prueba:</span>
          ${["contraseña","lento","rollback","batería","Ctrl+Z","docker","log de auditoría","crash","código espagueti","api","gdpr","responsive"].map(kw =>
            `<button class="glossary-chip" onclick="setGlossarySearch('${kw}')">${kw}</button>`
          ).join('')}
        </div>
      </div>

      <div id="glossaryResults" class="glossary-results"></div>

      <div class="glossary-stats-bar">
        📚 ${glossaryDB.length} conceptos · ${glossaryDB.reduce((a,e) => a + e.keywords.length, 0)} palabras clave · Todas las 8 características ISO 25010
      </div>
    </div>
  `;
}

function onGlossaryInput(value) {
  const clearBtn = document.getElementById('glossaryClearBtn');
  if (clearBtn) clearBtn.style.display = value.length > 0 ? 'flex' : 'none';

  clearTimeout(glossarySearchTimeout);
  glossarySearchTimeout = setTimeout(() => {
    renderGlossaryResults(value);
  }, 180); // debounce de 180ms
}

function onGlossaryKey(event) {
  if (event.key === 'Escape') clearGlossarySearch();
}

function setGlossarySearch(term) {
  const input = document.getElementById('glossaryInput');
  if (input) {
    input.value = term;
    onGlossaryInput(term);
    input.focus();
  }
  SoundFX.click();
}

function clearGlossarySearch() {
  const input = document.getElementById('glossaryInput');
  if (input) {
    input.value = '';
    onGlossaryInput('');
    input.focus();
  }
}

function renderGlossaryResults(query) {
  const container = document.getElementById('glossaryResults');
  if (!container) return;

  if (!query || query.trim().length < 2) {
    container.innerHTML = `
      <div class="glossary-empty-state">
        <div class="glossary-empty-icon">💡</div>
        <p>Escribe al menos 2 caracteres para buscar en el glosario.</p>
        <p class="glossary-empty-hint">Puedes buscar en español o en inglés técnico.</p>
      </div>
    `;
    return;
  }

  const results = searchGlossary(query);

  if (results.length === 0) {
    SoundFX.noResults();
    container.innerHTML = `
      <div class="glossary-empty-state">
        <div class="glossary-empty-icon">🤔</div>
        <p>No encontré "<b>${escapeHtml(query)}</b>" en el glosario.</p>
        <p class="glossary-empty-hint">
          Intenta con sinónimos o términos más específicos.<br>
          Ejemplo: en lugar de "rápido" prueba "tiempo de respuesta" o "lento".
        </p>
      </div>
    `;
    return;
  }

  SoundFX.searchFound();
  container.innerHTML = `
    <div class="glossary-count">${results.length} resultado${results.length > 1 ? 's' : ''} para "<b>${escapeHtml(query)}</b>"</div>
    <div class="glossary-cards">
      ${results.map((r, i) => renderGlossaryCard(r, i)).join('')}
    </div>
  `;
}

function renderGlossaryCard(entry, index) {
  const charColors = {
    'Adecuación Funcional':    { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
    'Eficiencia de desempeño': { bg: '#fef9c3', border: '#f59e0b', text: '#78350f' },
    'Compatibilidad':          { bg: '#e0f2fe', border: '#0284c7', text: '#0c4a6e' },
    'Usabilidad':              { bg: '#ede9fe', border: '#7c3aed', text: '#3b0764' },
    'Fiabilidad':              { bg: '#fce7f3', border: '#db2777', text: '#831843' },
    'Seguridad':               { bg: '#fee2e2', border: '#dc2626', text: '#7f1d1d' },
    'Mantenibilidad':          { bg: '#f0fdf4', border: '#15803d', text: '#14532d' },
    'Portabilidad':            { bg: '#fff7ed', border: '#ea580c', text: '#7c2d12' },
  };

  // buscar el color por nombre parcial
  const colorKey = Object.keys(charColors).find(k => entry.characteristic.includes(k.split(' ')[0]));
  const colors = charColors[colorKey] || { bg: '#f3f4f6', border: '#6b7280', text: '#1f2937' };

  const delay = index * 60;

  return `
    <div class="glossary-card" style="animation-delay:${delay}ms; --card-border-color: ${colors.border}; --card-bg-color: ${colors.bg};">
      <div class="glossary-card-header">
        <div class="glossary-char-pill" style="background:${colors.bg}; color:${colors.text}; border-color:${colors.border};">
          ${entry.charIcon} ${entry.characteristic}
        </div>
        <div class="glossary-relevance">${entry._score >= 100 ? '🎯 Exacto' : entry._score >= 70 ? '✅ Alta' : '🔍 Parcial'}</div>
      </div>

      <div class="glossary-card-body">
        <div class="glossary-subcategory">
          <span class="glossary-arrow">👉</span>
          <span class="glossary-subcat-name">${entry.subcategory}</span>
        </div>

        <div class="glossary-rule">
          <span class="glossary-rule-label">📌 Regla de oro:</span>
          <span class="glossary-rule-text">${entry.rule}</span>
        </div>

        <div class="glossary-example">
          <span class="glossary-example-label">🌟 Ejemplo:</span>
          <span class="glossary-example-text">${entry.example}</span>
        </div>
      </div>

      <div class="glossary-card-footer">
        <button class="glossary-explore-btn" onclick="exploreFromGlossary('${escapeHtml(entry.characteristic)}'); SoundFX.navigate();">
          📚 Explorar ${entry.characteristic} →
        </button>
      </div>
    </div>
  `;
}

/**
 * Navega desde el glosario a la pantalla de detalle de la característica.
 */
function exploreFromGlossary(charName) {
  const ch = characteristics.find(c =>
    c.name.toLowerCase().includes(charName.toLowerCase().split(' ')[0].toLowerCase())
  );
  if (ch) {
    showCharacteristic(ch.id);
  } else {
    showSection('learnScreen');
  }
}

/**
 * Escapa HTML para evitar XSS en resultados de búsqueda.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
