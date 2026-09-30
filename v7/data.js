/* =====================================================
   ISO/IEC 25010 CHALLENGE - v5 (Pedagógica & Modelo de Calidad)
   DATOS: Conceptos claros, preguntas clave y modelo ISO
===================================================== */

/* =====================================================
   LA NORMA ISO/IEC 25010 Y EL MODELO DE CALIDAD
===================================================== */
const isoStandardInfo = {
  title: "ISO/IEC 25010: El Estándar Mundial de Calidad de Software",
  subtitle: "La 'revisión técnica de salud' que separa un software profesional de uno mediocre o peligroso.",
  whatIsIt: "Es una norma internacional creada por ingenieros y expertos de todo el mundo para responder una pregunta fundamental: ¿cómo saber si un programa de computadora está bien hecho? En lugar de decir vagamente 'esta app me gusta' o 'este sistema no sirve', la norma define una lista de chequeo universal de 8 características técnicas y 31 aspectos específicos para evaluar cualquier software.",
  questionToUnderstand: "¿Cómo sé con total certeza si un software está bien construido por dentro y por fuera, o si solo aparenta funcionar bien hasta que colapse o pierda mi dinero?",
  analogy: "Imagina que vas a comprar un automóvil usado: no basta con ver que la pintura esté bonita y que el motor arranque. Necesitas revisar si los frenos responden al instante (Seguridad), si gasta demasiada gasolina (Eficiencia), si el tablero es fácil de entender (Usabilidad), si consigues repuestos baratos en cualquier taller (Mantenibilidad) y si cabe en tu cochera (Portabilidad). La ISO 25010 es exactamente esa inspección mecánica integral, pero aplicada a los sistemas y programas informáticos.",
  theModel: {
    title: "¿Cómo se organiza el Modelo de Calidad ISO 25010?",
    description: "La norma organiza la evaluación de calidad en dos grandes mundos complementarios:",
    branches: [
      {
        name: "1. Modelo de Calidad del Producto Software (8 Características)",
        icon: "⚙️",
        desc: "Evalúa las propiedades técnicas internas y externas del sistema durante su diseño, programación y ejecución: Adecuación funcional, Eficiencia de desempeño, Compatibilidad, Usabilidad, Fiabilidad, Seguridad, Mantenibilidad y Portabilidad. Es el estándar con el que trabajan los ingenieros de software, analistas y evaluadores QA en todo el mundo."
      },
      {
        name: "2. Modelo de Calidad en Uso (5 Características)",
        icon: "👥",
        desc: "Evalúa el impacto real del software cuando las personas lo usan en su entorno cotidiano: Eficacia (lograr el objetivo), Eficiencia (sin perder tiempo ni esfuerzo), Satisfacción (confianza y agrado del usuario), Seguridad ante riesgos (no causar daños económicos ni físicos) y Cobertura de contexto (funcionar bien en cualquier escenario)."
      }
    ]
  }
};

/* =====================================================
   LAS 8 CARACTERÍSTICAS Y 31 SUBCARACTERÍSTICAS
===================================================== */

/* =====================================================
   GUÍA RÁPIDA: CONCEPTOS Y PREGUNTAS CLAVE
===================================================== */
const isoEssentialGuide = [
  {
    num: 1,
    name: "Adecuación funcional",
    icon: "⚙️",
    concept: "Es el grado en que el software proporciona las funciones que necesita el usuario para realizar sus tareas.",
    mainQuestion: "👉 ¿El software hace lo que necesito?",
    subs: [
      { name: "Completitud funcional", desc: "el software tiene todas las funciones necesarias.", question: "👉 ¿Tiene todas las funciones que necesito?" },
      { name: "Corrección funcional", desc: "las funciones proporcionan resultados correctos.", question: "👉 ¿Las funciones hacen correctamente lo que deben hacer?" },
      { name: "Pertinencia funcional", desc: "las funciones permiten al usuario realizar sus tareas de manera adecuada.", question: "👉 ¿Las funciones realmente me ayudan a realizar mi tarea?" }
    ]
  },
  {
    num: 2,
    name: "Eficiencia de desempeño",
    icon: "⚡",
    concept: "Es el grado en que el software ofrece un buen rendimiento utilizando adecuadamente los recursos.",
    mainQuestion: "👉 ¿El software funciona rápido y utiliza bien sus recursos?",
    subs: [
      { name: "Comportamiento temporal", desc: "mide los tiempos de respuesta y procesamiento.", question: "👉 ¿Qué tan rápido responde?" },
      { name: "Utilización de recursos", desc: "mide cuánto utiliza recursos como CPU, memoria, batería o red.", question: "👉 ¿Cuántos recursos utiliza?" },
      { name: "Capacidad", desc: "indica la cantidad máxima de elementos o usuarios que puede manejar.", question: "👉 ¿Cuánto puede soportar?" }
    ]
  },
  {
    num: 3,
    name: "Compatibilidad",
    icon: "🔗",
    concept: "Es la capacidad del software para trabajar junto con otros sistemas o intercambiar información con ellos.",
    mainQuestion: "👉 ¿El software puede trabajar con otros sistemas?",
    subs: [
      { name: "Coexistencia", desc: "puede funcionar junto con otros sistemas sin afectar negativamente su funcionamiento.", question: "👉 ¿Puede funcionar junto con otros sistemas sin afectarles?" },
      { name: "Interoperabilidad", desc: "puede intercambiar información y utilizar esa información con otros sistemas.", question: "👉 ¿Puede intercambiar información con otros sistemas?" }
    ]
  },
  {
    num: 4,
    name: "Usabilidad",
    icon: "👤",
    concept: "Es el grado en que el software permite que los usuarios aprendan, entiendan y utilicen el sistema de manera fácil y satisfactoria.",
    mainQuestion: "👉 ¿Qué tan fácil es utilizar el software?",
    subs: [
      { name: "Reconocibilidad de la adecuación", alias: "Reconocimiento de la adecuación", desc: "permite que el usuario reconozca si el sistema sirve para sus necesidades.", question: "👉 ¿Entiendo para qué sirve?" },
      { name: "Aprendizabilidad", alias: "Facilidad de aprendizaje", desc: "facilidad con la que el usuario aprende a utilizar el sistema.", question: "👉 ¿Es fácil aprender a usarlo?" },
      { name: "Operabilidad", desc: "facilidad para manejar y controlar el sistema.", question: "👉 ¿Es fácil manejarlo?" },
      { name: "Protección contra errores de usuario", desc: "ayuda al usuario a evitar o corregir errores.", question: "👉 ¿Me ayuda a evitar errores?" },
      { name: "Estética de la interfaz de usuario", desc: "la interfaz presenta elementos claros, ordenados y agradables.", question: "👉 ¿La interfaz es clara y agradable?" },
      { name: "Accesibilidad", desc: "permite utilizar el sistema a personas con diferentes características y capacidades.", question: "👉 ¿Puede ser utilizado por personas con diferentes capacidades?" }
    ]
  },
  {
    num: 5,
    name: "Fiabilidad",
    icon: "🛡️",
    concept: "Es la capacidad del software para mantener su funcionamiento correcto y estable durante un determinado tiempo y bajo determinadas condiciones.",
    mainQuestion: "👉 ¿El software puede funcionar de forma estable?",
    subs: [
      { name: "Madurez", desc: "capacidad de funcionar con pocos fallos.", question: "👉 ¿Tiene pocos fallos?" },
      { name: "Disponibilidad", desc: "capacidad de estar disponible para ser utilizado cuando se necesita.", question: "👉 ¿Está disponible cuando lo necesito?" },
      { name: "Tolerancia a fallos", desc: "capacidad de seguir funcionando aunque ocurra un fallo.", question: "👉 ¿Sigue funcionando aunque ocurra un fallo?" },
      { name: "Capacidad de recuperación", desc: "capacidad de recuperar los datos y volver a funcionar después de un fallo.", question: "👉 ¿Puede recuperarse después de un fallo?" }
    ]
  },
  {
    num: 6,
    name: "Seguridad",
    icon: "🔐",
    concept: "Es la capacidad del software para proteger la información y controlar el acceso y las acciones de los usuarios.",
    mainQuestion: "👉 ¿El software protege la información y los accesos?",
    subs: [
      { name: "Confidencialidad", desc: "garantiza que la información solo sea accesible para quienes tienen autorización.", question: "👉 ¿Quién puede ver la información?" },
      { name: "Integridad", desc: "protege la información para evitar modificaciones no autorizadas.", question: "👉 ¿La información puede ser modificada indebidamente?" },
      { name: "No repudio", desc: "permite demostrar que una determinada acción fue realizada por alguien.", question: "👉 ¿Se puede demostrar que alguien realizó una acción?" },
      { name: "Responsabilidad", desc: "permite identificar y rastrear las acciones realizadas.", question: "👉 ¿Se puede saber quién hizo qué?" },
      { name: "Autenticidad", desc: "permite comprobar que un usuario o entidad es realmente quien dice ser.", question: "👉 ¿Podemos comprobar que el usuario es quien dice ser?" }
    ]
  },
  {
    num: 7,
    name: "Mantenibilidad",
    icon: "🔧",
    concept: "Es la capacidad del software para ser analizado, modificado, corregido, mejorado y probado con facilidad.",
    mainQuestion: "👉 ¿Es fácil modificar o corregir el software?",
    subs: [
      { name: "Modularidad", desc: "el software está dividido en partes independientes o módulos.", question: "👉 ¿Está dividido en partes independientes?" },
      { name: "Reusabilidad", desc: "permite utilizar componentes o partes del software nuevamente.", question: "👉 ¿Puedo reutilizar partes del software?" },
      { name: "Analizabilidad", desc: "facilita encontrar las causas de errores o problemas.", question: "👉 ¿Puedo encontrar fácilmente la causa de un problema?" },
      { name: "Modificabilidad", desc: "permite realizar cambios sin causar problemas en otras partes.", question: "👉 ¿Puedo hacer cambios fácilmente?" },
      { name: "Capacidad de ser probado", desc: "facilita realizar pruebas para comprobar su funcionamiento.", question: "👉 ¿Es fácil probarlo?" }
    ]
  },
  {
    num: 8,
    name: "Portabilidad",
    icon: "📦",
    concept: "Es la capacidad del software para ser trasladado o utilizado en diferentes entornos.",
    mainQuestion: "👉 ¿Es fácil llevar el software a otro entorno?",
    subs: [
      { name: "Adaptabilidad", desc: "capacidad para adaptarse a diferentes entornos.", question: "👉 ¿Puede adaptarse a otro entorno?" },
      { name: "Instalabilidad", alias: "Facilidad de instalación", desc: "facilidad para instalar o desinstalar el software.", question: "👉 ¿Es fácil instalarlo o desinstalarlo?" },
      { name: "Reemplazabilidad", desc: "capacidad de reemplazar o ser reemplazado por otro software equivalente.", question: "👉 ¿Puede ser reemplazado por otro software equivalente?" }
    ]
  }
];

const characteristics = [
  {
    id: 1,
    name: "Adecuación funcional",
    icon: "⚙️",
    simpleConcept: "Que el software haga exactamente todo lo que prometió hacer, completo y sin errores de cálculo.",
    question: "¿El programa hace todo lo que el usuario necesita y arroja los resultados correctos?",
    analogy: "Un cuchillo de cocina: sirve si corta lo que necesitas cortar (completo), corta limpio sin desgarrar (correcto) y es el cuchillo adecuado para esa comida (pertinente).",
    reflection: "¿Faltan funciones indispensables para el negocio o alguna arroja un cálculo equivocado?",
    description: "El software proporciona las funciones necesarias para satisfacer los requisitos y necesidades del usuario.",
    subcategories: [
      {
        name: "Completitud funcional",
        simpleConcept: "Tiene todas las funciones, botones y opciones prometidas; no le falta nada para que el usuario cumpla su meta.",
        question: "¿El sistema tiene todas las opciones y herramientas necesarias, o me deja a medias porque le falta una función clave?",
        example: "En una tienda virtual puedes registrarte, buscar productos, pagar con tarjeta y descargar tu boleta sin que falte ningún paso indispensable."
      },
      {
        name: "Corrección funcional",
        simpleConcept: "Los cálculos, datos y operaciones que realiza arrojan resultados matemáticamente exactos y verdaderos.",
        question: "¿Los cálculos y datos que muestra son correctos, o arroja resultados equivocados que hacen perder dinero o tiempo?",
        example: "Si compras 3 cuadernos de S/ 20 cada uno, el sistema calcula y factura exactamente S/ 60 (y no S/ 50 ni S/ 80)."
      },
      {
        name: "Pertinencia funcional",
        simpleConcept: "Las funciones que tiene son realmente útiles para el trabajo del usuario, sin obligarlo a dar rodeos absurdos.",
        question: "¿Las opciones que tiene me ayudan de verdad a lograr mi objetivo, o están mal pensadas y me complican la vida?",
        example: "El buscador de una farmacia te permite buscar por síntoma o nombre comercial, ayudándote de inmediato en vez de exigirte un código de barras raro."
      }
    ]
  },

  {
    id: 2,
    name: "Eficiencia de desempeño",
    icon: "⚡",
    simpleConcept: "Que sea rápido al responder y no consuma de forma abusiva la memoria, el procesador o la batería del equipo.",
    question: "¿Funciona con rapidez y aprovecha bien los recursos del dispositivo sin congelarlo?",
    analogy: "Una cocina de restaurante: importa cuánto tarda en salir el plato a la mesa (tiempo), cuánto gas y personal gasta (recursos) y cuántos clientes aguanta a la vez sin colapsar (capacidad).",
    reflection: "¿El sistema se pone lento, agota la batería en minutos o se cae cuando muchos usuarios entran al mismo tiempo?",
    description: "Evalúa qué tan rápido funciona el sistema y qué tan bien aprovecha los recursos de hardware disponibles.",
    subcategories: [
      {
        name: "Comportamiento temporal",
        simpleConcept: "El tiempo que tarda el sistema en responder a cada clic, búsqueda o consulta en pantalla.",
        question: "¿Responde al instante cuando toco un botón, o se queda cargando y me hace esperar una eternidad?",
        example: "Al consultar tus notas o tu saldo bancario, la pantalla muestra los resultados en menos de 1 segundo."
      },
      {
        name: "Utilización de recursos",
        simpleConcept: "La cantidad justa de batería, memoria RAM, procesador o internet que consume mientras trabaja.",
        question: "¿Consume lo justo y necesario de mi equipo, o me calienta el celular y le agota la batería en media hora?",
        example: "Una app de música que reproduce canciones en segundo plano gastando apenas un 2% de batería por hora."
      },
      {
        name: "Capacidad",
        simpleConcept: "El número máximo de personas, transacciones o datos que puede atender en simultáneo sin saturarse.",
        question: "¿El sistema aguanta a miles de personas usándolo a la vez, o colapsa y arroja error apenas entra mucha gente?",
        example: "El portal de matrícula o de venta de entradas para conciertos atiende a 15,000 personas al mismo segundo sin caerse."
      }
    ]
  },

  {
    id: 3,
    name: "Compatibilidad",
    icon: "🔗",
    simpleConcept: "Que sepa convivir en el mismo equipo con otros programas sin dañarlos y pueda intercambiar datos fácilmente.",
    question: "¿Se lleva bien con otros programas instalados y puede intercambiar datos vía API sin problemas?",
    analogy: "Enchufes y adaptadores: convivir en la misma regleta sin estorbarse físicamente (coexistencia) y entenderse entre aparatos para pasarse corriente o datos (interoperabilidad).",
    reflection: "¿Choca con otro programa abierto en la computadora o no puede sincronizar datos con el almacén?",
    description: "Permite que el software funcione junto con otros sistemas o intercambie información con ellos sin conflictos.",
    subcategories: [
      {
        name: "Coexistencia",
        simpleConcept: "Convivir pacíficamente en la misma computadora o teléfono con otros programas sin congelarlos ni cerrarlos.",
        question: "¿Puede estar abierto junto a otros programas sin que se peleen por la memoria ni se cuelguen entre sí?",
        example: "Puedes tener abierto el software de historias clínicas, el antivirus y el navegador al mismo tiempo sin que ninguno se cierre."
      },
      {
        name: "Interoperabilidad",
        simpleConcept: "Poder intercambiar y entender datos con otros sistemas externos mediante formatos estándar (como JSON o APIs).",
        question: "¿Sabe pasarse información con otros sistemas y entenderse en el mismo idioma de datos?",
        example: "La tienda virtual envía automáticamente la dirección de cada pedido al sistema de la empresa de transporte para que el repartidor lo reciba en su GPS."
      }
    ]
  },

  {
    id: 4,
    name: "Usabilidad",
    icon: "👤",
    simpleConcept: "Que cualquier persona lo entienda, lo aprenda y lo use a la primera de forma cómoda y sin frustrarse.",
    question: "¿Es fácil, cómodo y agradable de usar, o necesito un manual gigante para no equivocarme?",
    analogy: "Una puerta de vidrio: si necesitas un cartel de 'JALE' o 'EMPUJE' para saber cómo abrirla, está mal diseñada. Y si tiene la alarma de incendios pegada a la manija, invita al error humano.",
    reflection: "¿Confunde a los nuevos usuarios, cuesta aprender a manejarlo o induce a cometer errores por accidente?",
    description: "Evalúa qué tan fácil es comprender, aprender y utilizar el software para los usuarios.",
    subcategories: [
      {
        name: "Reconocimiento de la adecuación",
        simpleConcept: "Que con solo mirar la pantalla entiendas de inmediato para qué sirve el programa y si tiene lo que buscas.",
        question: "¿Apenas abro el programa me queda clarísimo para qué sirve y qué puedo hacer en él?",
        example: "Al abrir una app de delivery, la primera pantalla muestra fotos claras de platos de comida y un buscador que dice: '¿Qué te gustaría comer hoy?'."
      },
      {
        name: "Facilidad de aprendizaje",
        simpleConcept: "Qué tan rápido una persona que nunca vio el programa aprende a usarlo sin necesidad de una capacitación larga.",
        question: "¿Un usuario nuevo puede aprender a usarlo en 5 minutos o necesita un manual de 80 páginas para entenderlo?",
        example: "Un cajero nuevo en una bodega aprende a registrar productos y cobrar a los clientes en su primera media hora de trabajo."
      },
      {
        name: "Operabilidad",
        simpleConcept: "Qué tan cómodo, fluido y con pocos pasos se realizan las tareas cotidianas en el software.",
        question: "¿Es cómodo, ágil y natural de manejar, o me hace dar 20 clics para hacer una sola cosa básica?",
        example: "Poder enviar un comprobante de pago por WhatsApp con un solo botón directo en vez de tener que guardarlo, buscarlo y adjuntarlo a mano."
      },
      {
        name: "Protección contra errores de usuario",
        simpleConcept: "El sistema te cuida las espaldas para que no cometas fallos por descuido o te deja corregirlos a tiempo.",
        question: "¿El sistema me advierte si estoy a punto de cometer un error grave, o me deja borrar todo con un toque accidental?",
        example: "Antes de vaciar una orden o eliminar una cuenta, el sistema muestra una ventana que dice: '¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer'."
      },
      {
        name: "Estética de la interfaz de usuario",
        simpleConcept: "El aspecto visual: colores armoniosos, tipografía clara, buen espacio y botones bien presentados.",
        question: "¿La pantalla se ve limpia, ordenada, moderna y agradable a la vista, o parece un desorden confuso?",
        example: "Una pantalla con diseño ordenado, márgenes limpios, botones bien alineados y contrastes suaves que no cansan la vista tras horas de uso."
      },
      {
        name: "Accesibilidad",
        simpleConcept: "Que cualquier persona, incluyendo personas con discapacidad visual, auditiva o motora, pueda usar el sistema.",
        question: "¿Puede usarlo cualquier persona, incluso si usa lector de voz para ciegos o tiene dificultades motrices?",
        example: "La aplicación permite aumentar el tamaño del texto, ofrece buen contraste de color y es compatible con lectores de pantalla para personas invidentes."
      }
    ]
  },

  {
    id: 5,
    name: "Fiabilidad",
    icon: "🛡️",
    simpleConcept: "Que funcione siempre de forma estable, no se caiga a cada rato y sepa levantarse si ocurre un tropiezo.",
    question: "¿Puedo confiar en que el sistema estará funcionando cuando lo necesite sin perder mis datos?",
    analogy: "Un automóvil confiable: arranca todos los días sin fallas raras (madurez), está listo cuando necesitas salir de viaje (disponibilidad) y tiene llanta de repuesto si se pincha (tolerancia y recuperación).",
    reflection: "¿El sistema se cuelga, deja de responder en horarios clave o pierde información cuando se va la luz?",
    description: "Evalúa si el sistema funciona correctamente y puede recuperarse ante problemas o fallos imprevistos.",
    subcategories: [
      {
        name: "Madurez",
        simpleConcept: "Que el software sea estable y no presente errores extraños ni cuelgues durante su uso diario normal.",
        question: "¿El programa funciona de manera sólida todos los días, o se congela y falla a cada rato en operaciones comunes?",
        example: "Un sistema de ventas que funciona 8 horas diarias durante semanas completas sin cerrarse solo ni arrojar pantallas azules."
      },
      {
        name: "Disponibilidad",
        simpleConcept: "Que el sistema esté encendido y listo para usarse en el momento exacto en que el usuario lo requiere (24/7).",
        question: "¿El servicio está disponible cuando lo busco, o me sale el mensaje de 'sistema en mantenimiento' a cada rato?",
        example: "La banca móvil o la plataforma de emergencias médicas está activa y lista para operar las 24 horas del día, los 365 días del año."
      },
      {
        name: "Tolerancia a fallos",
        simpleConcept: "Seguir funcionando y prestando servicio aunque falle un componente físico, un servidor o la conexión a internet.",
        question: "¿El sistema puede seguir operando si se cae un servidor o falla internet, o se paraliza por completo?",
        example: "Si el servidor principal de una clínica sufre un fallo, un servidor de respaldo asume la carga en milisegundos sin que los médicos noten interrupción."
      },
      {
        name: "Capacidad de recuperación",
        simpleConcept: "La habilidad de levantarse, restaurar los datos intactos y volver a operar tras una caída o desastre.",
        question: "¿Si ocurre un corte de energía o fallo grave, el sistema recupera toda la información o se pierden los datos?",
        example: "Tras un corte eléctrico imprevisto, el software se reinicia, lee la copia de respaldo automática y restaura las transferencias del día intactas."
      }
    ]
  },

  {
    id: 6,
    name: "Seguridad",
    icon: "🔐",
    simpleConcept: "Que solo las personas con permiso puedan ver o cambiar los datos, y que nadie pueda engañar al sistema.",
    question: "¿La información y el dinero están a salvo de curiosos, atacantes o cambios no autorizados?",
    analogy: "Una casa con cerradura de seguridad y cámara: los extraños no pueden mirar hacia adentro (confidencialidad), nadie puede mover tus cosas de lugar (integridad) y se sabe con certeza quién abrió la puerta (responsabilidad y no repudio).",
    reflection: "¿Alguien no autorizado puede espiar datos personales, alterar precios en el sistema o negar que hizo una compra?",
    description: "Protege la información y evita accesos, modificaciones o acciones no autorizadas.",
    subcategories: [
      {
        name: "Confidencialidad",
        simpleConcept: "Que solo las personas con permiso expreso puedan mirar o leer la información privada o sensible.",
        question: "¿Solo las personas autorizadas pueden ver los datos secretos, o cualquier curioso puede espiarlos?",
        example: "La historia clínica de un paciente solo puede ser vista por el médico asignado a su tratamiento y no por el personal de limpieza o visitas."
      },
      {
        name: "Integridad",
        simpleConcept: "Evitar que personas no autorizadas modifiquen, alteren o borren los datos y registros del sistema.",
        question: "¿Los datos están protegidos contra modificaciones no autorizadas, fraudes o alteraciones de precios?",
        example: "Un usuario no puede alterar el precio de un producto en la URL del navegador para comprar un televisor de S/ 2,000 pagando solo S/ 1."
      },
      {
        name: "No repudio",
        simpleConcept: "Que nadie pueda negar haber realizado una acción importante porque existe una prueba digital irrefutable.",
        question: "¿Queda una prueba legal e imborrable de quién hizo la operación para que luego no pueda decir 'yo no fui'?",
        example: "Al firmar una transferencia o contrato bancario con token digital, queda constancia criptográfica de que el titular autorizó la salida del dinero."
      },
      {
        name: "Responsabilidad",
        simpleConcept: "El sistema guarda una bitácora exacta con nombre, fecha y hora de cada acción que realiza cada empleado.",
        question: "¿El sistema anota con nombre y apellido quién hizo cada cambio, para poder pedir cuentas si algo sale mal?",
        example: "En la base de datos queda registrado: 'El 29 de septiembre a las 10:15 am, el usuario Cajero_03 aprobó el retiro de S/ 5,000 en ventanilla'."
      },
      {
        name: "Autenticidad",
        simpleConcept: "Poder comprobar con absoluta certeza que la persona o el sistema que se conecta es quien realmente dice ser.",
        question: "¿El sistema comprueba con certeza la identidad real del usuario antes de darle acceso a sus datos?",
        example: "Para ingresar a la aplicación bancaria debes ingresar tu clave secreta y confirmar con tu huella digital o reconocimiento facial biométrico."
      }
    ]
  },

  {
    id: 7,
    name: "Mantenibilidad",
    icon: "🔧",
    simpleConcept: "Que sea fácil, rápido y seguro de arreglar, actualizar y mejorar por dentro sin que se rompa nada.",
    question: "¿Si los programadores necesitan cambiar o mejorar algo en el código, será fácil o será una pesadilla?",
    analogy: "Un mueble modular bien diseñado: puedes cambiar una gaveta rota sin desarmar todo el mueble, entiendes dónde encaja cada tornillo y puedes probar cada repuesto por separado.",
    reflection: "¿Modificar una pantalla rompe otras tres partes del sistema o cuesta días encontrar la causa raíz de un fallo?",
    description: "Evalúa qué tan fácil es modificar, corregir, mejorar o adaptar el software por los desarrolladores.",
    subcategories: [
      {
        name: "Modularidad",
        simpleConcept: "El código está dividido en piezas independientes (como bloques de Lego), para tocar una sin romper las otras.",
        question: "¿El sistema está dividido en piezas independientes que se pueden tocar sin desarmar todo el programa?",
        example: "Los ingenieros pueden actualizar el diseño del carrito de compras sin afectar para nada el módulo de inventario del almacén."
      },
      {
        name: "Reusabilidad",
        simpleConcept: "Un componente o bloque de código programado una vez puede reutilizarse en muchas otras pantallas o proyectos.",
        question: "¿Las piezas del software se pueden volver a usar en otras partes, o hay que programar todo desde cero cada vez?",
        example: "El módulo que valida las tarjetas de crédito se programa una sola vez y se usa tanto en la página web como en la app móvil del banco."
      },
      {
        name: "Analizabilidad",
        simpleConcept: "Qué tan fácil es inspeccionar el sistema para diagnosticar por qué falló o medir qué partes necesitan mejora.",
        question: "¿Si ocurre un error, es fácil descubrir exactamente dónde está la falla o hay que buscar una aguja en un pajar?",
        example: "Cuando una compra falla, el sistema genera un registro claro que dice: 'Línea 42: el banco rechazó la tarjeta porque los fondos son insuficientes'."
      },
      {
        name: "Modificabilidad",
        simpleConcept: "Qué tan rápido y seguro es agregar funciones nuevas o cambiar las existentes sin introducir nuevos errores.",
        question: "¿Es fácil y seguro hacer cambios en el sistema, o cada pequeño ajuste es riesgoso y cuesta semanas de trabajo?",
        example: "Cuando cambia la tasa del impuesto a las ventas, el programador cambia un solo archivo de configuración y todo el sistema se actualiza en 5 minutos."
      },
      {
        name: "Capacidad de ser probado",
        simpleConcept: "Qué tan fácil es someter el software a pruebas automáticas para comprobar que no tiene fallos antes de lanzarlo.",
        question: "¿Se puede probar fácilmente cada parte del sistema para asegurarse de que funciona antes de entregarlo a los usuarios?",
        example: "Los evaluadores ejecutan una batería de 200 pruebas automáticas en 3 minutos para certificar que la nueva versión no tiene errores."
      }
    ]
  },

  {
    id: 8,
    name: "Portabilidad",
    icon: "📦",
    simpleConcept: "Que se pueda mudar, instalar y ejecutar en diferentes computadoras, celulares o sistemas sin complicaciones.",
    question: "¿Puedo llevarme el programa a otro dispositivo o sistema operativo sin tener que volver a programarlo?",
    analogy: "Una maleta de viaje bien empacada: cabe en el maletero del taxi o en la cabina del avión (adaptabilidad), se desempaca en minutos (instalación) y puedes cambiar una prenda por otra equivalente (reemplazabilidad).",
    reflection: "¿El programa solo funciona en una versión vieja de Windows o instalarlo requiere horas de configuración técnica manual?",
    description: "Evalúa la facilidad con la que el software puede trasladarse o adaptarse de un entorno de hardware o software a otro.",
    subcategories: [
      {
        name: "Adaptabilidad",
        simpleConcept: "La capacidad del software para ajustarse y funcionar en diferentes sistemas operativos o tamaños de pantalla.",
        question: "¿El programa puede adaptarse para funcionar en Windows, Mac, Android o pantallas de diferente tamaño sin rehacerlo?",
        example: "La misma plataforma educativa se adapta de forma fluida si la abres en una laptop de 15 pulgadas o en un teléfono de 6 pulgadas."
      },
      {
        name: "Facilidad de instalación",
        simpleConcept: "Qué tan rápido, sencillo y sin enredos técnicos es instalar y desinstalar el programa en cualquier equipo.",
        question: "¿Cualquier usuario puede instalarlo en 2 clics, o se necesitan conocimientos avanzados de informática para lograrlo?",
        example: "Descargas la app desde la tienda oficial, presionas 'Instalar' y en 10 segundos ya está lista para usarse sin configurar variables raras."
      },
      {
        name: "Reemplazabilidad",
        simpleConcept: "Poder sustituir este software por otro equivalente sin que los usuarios sufran pérdidas de datos o traumatismos.",
        question: "¿Se puede cambiar este programa por otro similar sin perder los datos ni tener que empezar todo de cero?",
        example: "Una empresa cambia su software de correo electrónico antiguo por uno nuevo, migrando todos los mensajes y contactos sin perder nada."
      }
    ]
  }
];

/* =====================================================
   PREGUNTAS
===================================================== */


// Enriquecer el array characteristics con las definiciones y preguntas exactas de isoEssentialGuide
(function() {
  if (typeof isoEssentialGuide === 'undefined' || typeof characteristics === 'undefined') return;
  isoEssentialGuide.forEach(g => {
    const c = characteristics.find(x => x.id === g.num || x.name === g.name);
    if (!c) return;
    c.coreConcept = g.concept;
    c.mainQuestion = g.mainQuestion;
    g.subs.forEach(gs => {
      const sub = c.subcategories.find(s => s.name === gs.name || (gs.alias && s.name === gs.alias));
      if (sub) {
        sub.coreDesc = gs.desc;
        sub.coreQuestion = gs.question;
        if (gs.alias) sub.alias = gs.alias;
      }
    });
  });
})();

const questions = [

    /* ============================
       CARACTERÍSTICAS
    ============================ */

    {
        type: "characteristic",
        question:
            "Un sistema de ventas permite registrar productos, clientes, ventas y reportes porque todas estas funciones son necesarias para el negocio.",
        correct: "Adecuación funcional",
        explanation:
            "El caso se relaciona con que el sistema tenga las funciones necesarias."
    },

    {
        type: "characteristic",
        question:
            "Una aplicación tarda 20 segundos en mostrar los resultados de una búsqueda.",
        correct: "Eficiencia de desempeño",
        explanation:
            "El problema está relacionado con el tiempo de respuesta del sistema."
    },

    {
        type: "characteristic",
        question:
            "Una aplicación puede intercambiar información con otro sistema mediante una API.",
        correct: "Compatibilidad",
        explanation:
            "El intercambio de información entre sistemas corresponde a compatibilidad."
    },

    {
        type: "characteristic",
        question:
            "Un nuevo trabajador puede aprender a utilizar el sistema en pocos minutos.",
        correct: "Usabilidad",
        explanation:
            "La facilidad para aprender a utilizar el software pertenece a usabilidad."
    },

    {
        type: "characteristic",
        question:
            "Una plataforma continúa funcionando correctamente durante largos períodos sin presentar fallos frecuentes.",
        correct: "Fiabilidad",
        explanation:
            "Se está evaluando la estabilidad y funcionamiento continuo del sistema."
    },

    {
        type: "characteristic",
        question:
            "Un usuario no autorizado intenta consultar información privada de clientes.",
        correct: "Seguridad",
        explanation:
            "La protección de información frente a accesos no autorizados corresponde a seguridad."
    },

    {
        type: "characteristic",
        question:
            "Un programador puede modificar un módulo sin tener que cambiar todo el sistema.",
        correct: "Mantenibilidad",
        explanation:
            "La facilidad para modificar el software corresponde a mantenibilidad."
    },

    {
        type: "characteristic",
        question:
            "Una aplicación puede ejecutarse en diferentes sistemas operativos después de realizar pequeños ajustes.",
        correct: "Portabilidad",
        explanation:
            "La capacidad de adaptarse a diferentes entornos corresponde a portabilidad."
    },


    /* ============================
       SUBCARACTERÍSTICAS
    ============================ */

    {
        type: "subcategory",
        question:
            "Un sistema de ventas permite registrar productos, pero no permite actualizar el stock.",
        correct: "Completitud funcional",
        explanation:
            "Faltan funciones necesarias para completar correctamente las tareas."
    },

    {
        type: "subcategory",
        question:
            "El sistema calcula correctamente el total de una compra.",
        correct: "Corrección funcional",
        explanation:
            "La función proporciona el resultado correcto."
    },

    {
        type: "subcategory",
        question:
            "Una búsqueda devuelve los resultados en menos de dos segundos.",
        correct: "Comportamiento temporal",
        explanation:
            "Se está evaluando el tiempo que tarda el sistema en responder."
    },

    {
        type: "subcategory",
        question:
            "Una aplicación puede utilizarse sin consumir excesivamente la memoria del dispositivo.",
        correct: "Utilización de recursos",
        explanation:
            "Se evalúa el uso de los recursos disponibles."
    },

    {
        type: "subcategory",
        question:
            "Una plataforma soporta 1,000 usuarios conectados al mismo tiempo.",
        correct: "Capacidad",
        explanation:
            "Se está evaluando la cantidad de usuarios que puede soportar."
    },

    {
        type: "subcategory",
        question:
            "Dos programas pueden ejecutarse simultáneamente sin generar conflictos.",
        correct: "Coexistencia",
        explanation:
            "La coexistencia permite que diferentes programas funcionen juntos."
    },

    {
        type: "subcategory",
        question:
            "Un sistema intercambia datos con otro mediante una API.",
        correct: "Interoperabilidad",
        explanation:
            "El intercambio de información entre sistemas corresponde a interoperabilidad."
    },

    {
        type: "subcategory",
        question:
            "Un usuario entiende inmediatamente qué hace cada botón.",
        correct: "Reconocimiento de la adecuación",
        explanation:
            "El usuario puede reconocer para qué sirve el sistema y sus funciones."
    },

    {
        type: "subcategory",
        question:
            "Un trabajador aprende rápidamente a registrar una venta.",
        correct: "Facilidad de aprendizaje",
        explanation:
            "Se refiere a qué tan rápido una persona aprende a usar el sistema."
    },

    {
        type: "subcategory",
        question:
            "El sistema permite realizar una venta utilizando solamente tres pasos.",
        correct: "Operabilidad",
        explanation:
            "La operabilidad está relacionada con la facilidad de manejar las funciones."
    },

    {
        type: "subcategory",
        question:
            "Antes de eliminar un producto, el sistema pregunta si realmente desea eliminarlo.",
        correct: "Protección contra errores de usuario",
        explanation:
            "La confirmación ayuda a evitar acciones accidentales."
    },

    {
        type: "subcategory",
        question:
            "Una aplicación presenta una interfaz clara, ordenada y agradable.",
        correct: "Estética de la interfaz de usuario",
        explanation:
            "La presentación visual de la interfaz corresponde a esta subcaracterística."
    },

    {
        type: "subcategory",
        question:
            "Una aplicación es compatible con lectores de pantalla.",
        correct: "Accesibilidad",
        explanation:
            "La accesibilidad permite que personas con diferentes capacidades utilicen el sistema."
    },

    {
        type: "subcategory",
        question:
            "Una aplicación funciona durante meses sin presentar errores frecuentes.",
        correct: "Madurez",
        explanation:
            "La madurez refleja el funcionamiento estable del software."
    },

    {
        type: "subcategory",
        question:
            "Una plataforma está disponible cuando los usuarios necesitan acceder a ella.",
        correct: "Disponibilidad",
        explanation:
            "La disponibilidad indica si el sistema puede utilizarse cuando es necesario."
    },

    {
        type: "subcategory",
        question:
            "Si un servidor falla, otro servidor continúa atendiendo las solicitudes.",
        correct: "Tolerancia a fallos",
        explanation:
            "El sistema continúa funcionando aunque ocurra un fallo."
    },

    {
        type: "subcategory",
        question:
            "Después de una caída, el sistema recupera la información mediante una copia de respaldo.",
        correct: "Capacidad de recuperación",
        explanation:
            "El sistema puede recuperar su funcionamiento después de un fallo."
    },

    {
        type: "subcategory",
        question:
            "Solo los administradores pueden consultar información confidencial.",
        correct: "Confidencialidad",
        explanation:
            "La información solo debe estar disponible para usuarios autorizados."
    },

    {
        type: "subcategory",
        question:
            "Un usuario sin permisos no puede modificar los precios.",
        correct: "Integridad",
        explanation:
            "Se evita que personas no autorizadas modifiquen la información."
    },

    {
        type: "subcategory",
        question:
            "Una firma digital demuestra quién aprobó un documento.",
        correct: "No repudio",
        explanation:
            "Permite demostrar que una determinada persona realizó una acción."
    },

    {
        type: "subcategory",
        question:
            "El sistema registra qué usuario modificó un producto.",
        correct: "Responsabilidad",
        explanation:
            "Permite identificar quién realizó una acción."
    },

    {
        type: "subcategory",
        question:
            "El sistema solicita contraseña y código de verificación.",
        correct: "Autenticidad",
        explanation:
            "Se comprueba que el usuario sea realmente quien dice ser."
    },

    {
        type: "subcategory",
        question:
            "El sistema está dividido en módulos independientes.",
        correct: "Modularidad",
        explanation:
            "La modularidad divide el software en partes independientes."
    },

    {
        type: "subcategory",
        question:
            "Un componente puede utilizarse nuevamente en otro proyecto.",
        correct: "Reusabilidad",
        explanation:
            "La reusabilidad permite utilizar componentes en diferentes sistemas."
    },

    {
        type: "subcategory",
        question:
            "Los registros permiten encontrar rápidamente dónde ocurrió un error.",
        correct: "Analizabilidad",
        explanation:
            "La analizabilidad facilita encontrar las causas de problemas."
    },

    {
        type: "subcategory",
        question:
            "Agregar un nuevo método de pago no requiere cambiar todo el sistema.",
        correct: "Modificabilidad",
        explanation:
            "Es fácil realizar cambios sin afectar otras partes del sistema."
    },

    {
        type: "subcategory",
        question:
            "Los módulos pueden comprobarse mediante pruebas automatizadas.",
        correct: "Capacidad de ser probado",
        explanation:
            "El software puede verificarse fácilmente mediante pruebas."
    },

    {
        type: "subcategory",
        question:
            "Una aplicación puede adaptarse para funcionar en Windows y Linux.",
        correct: "Adaptabilidad",
        explanation:
            "Puede adaptarse a diferentes entornos."
    },

    {
        type: "subcategory",
        question:
            "Un programa puede instalarse siguiendo un asistente sencillo.",
        correct: "Facilidad de instalación",
        explanation:
            "La instalación puede realizarse fácilmente."
    },

    {
        type: "subcategory",
        question:
            "Una aplicación puede sustituir a otra que ofrece funciones equivalentes.",
        correct: "Reemplazabilidad",
        explanation:
            "La reemplazabilidad permite sustituir un software por otro similar."
    },


    /* ============================
       CASOS PRÁCTICOS
    ============================ */

    {
        type: "cases",
        question:
            "CASO: BANCO. Un empleado intenta modificar información bancaria de un cliente sin tener permisos.",
        correct: "Integridad",
        explanation:
            "La integridad protege la información contra modificaciones no autorizadas."
    },

    {
        type: "cases",
        question:
            "CASO: UNIVERSIDAD. Los estudiantes pueden consultar sus notas, pero el sistema tarda 40 segundos en mostrar cada resultado.",
        correct: "Comportamiento temporal",
        explanation:
            "El problema principal está en el tiempo de respuesta."
    },

    {
        type: "cases",
        question:
            "CASO: BODEGA. El sistema permite registrar ventas, pero no permite registrar nuevos productos.",
        correct: "Completitud funcional",
        explanation:
            "Falta una función necesaria para las operaciones del negocio."
    },

    {
        type: "cases",
        question:
            "CASO: HOSPITAL. Si un servidor deja de funcionar, otro servidor continúa atendiendo las solicitudes.",
        correct: "Tolerancia a fallos",
        explanation:
            "El sistema continúa funcionando aunque uno de sus componentes falle."
    },

    {
        type: "cases",
        question:
            "CASO: EMPRESA. Cada acción realizada por los trabajadores queda registrada junto con su usuario.",
        correct: "Responsabilidad",
        explanation:
            "Permite identificar quién realizó cada acción."
    },

    {
        type: "cases",
        question:
            "CASO: TIENDA ONLINE. La aplicación funciona correctamente en diferentes sistemas operativos después de realizar ajustes.",
        correct: "Adaptabilidad",
        explanation:
            "El software puede adaptarse a diferentes entornos."
    },

    {
        type: "cases",
        question:
            "CASO: MUNICIPALIDAD. Un trabajador nuevo puede aprender a registrar solicitudes en pocos minutos.",
        correct: "Facilidad de aprendizaje",
        explanation:
            "Se evalúa qué tan rápido el usuario aprende a utilizar el sistema."
    },

    {
        type: "cases",
        question:
            "CASO: EMPRESA. El módulo de clientes puede cambiarse sin modificar el módulo de productos.",
        correct: "Modularidad",
        explanation:
            "El sistema está organizado en partes que pueden modificarse de forma independiente."
    },

    {
        type: "cases",
        question:
            "CASO: E-COMMERCE. El sistema permite intercambiar información de pedidos con el sistema de almacén mediante una API.",
        correct: "Interoperabilidad",
        explanation:
            "Dos sistemas pueden intercambiar información."
    },

    {
        type: "cases",
        question:
            "CASO: APLICACIÓN MÓVIL. La aplicación utiliza demasiada batería incluso cuando realiza tareas simples.",
        correct: "Utilización de recursos",
        explanation:
            "El problema está relacionado con el uso de recursos del dispositivo."
    }

];



/* =====================================================
   CONCEPTOS Y ANALOGÍAS (ISO 25010)
===================================================== */
const concepts = {
  1: [
    "¿Hace lo que necesito, y lo hace bien?",
    "Un cuchillo de cocina: sirve si corta lo que quieres cortar (completo), corta limpio (correcto) y es el cuchillo adecuado para esa tarea (pertinente).",
    "¿Faltan funciones indispensables, o alguna arroja un cálculo equivocado?"
  ],
  2: [
    "¿Qué tan rápido va y cuántos recursos consume?",
    "Una cocina de restaurante: importa cuánto tarda en salir el plato (tiempo), cuánto gas y personal gasta (recursos) y cuántas mesas aguanta a la vez (capacidad).",
    "¿Se pone lento, gasta demasiada batería/memoria o colapsa con muchos usuarios?"
  ],
  3: [
    "¿Se lleva bien con otros programas y equipos?",
    "Enchufes y adaptadores: convivir en la misma regleta sin estorbarse (coexistencia) y entenderse entre aparatos para intercambiar corriente o datos (interoperabilidad).",
    "¿Choca con otro programa instalado o no puede intercambiar datos vía API?"
  ],
  4: [
    "¿Cualquier persona lo entiende y lo usa sin frustrarse?",
    "Una puerta: si necesitas un manual para empujar o jalar, está mal diseñada. Y si tiene una alarma pegada a la manija, invita al error humano.",
    "¿Confunde, cuesta aprender a usarlo o induce al usuario a equivocarse?"
  ],
  5: [
    "¿Funciona siempre de manera estable y se levanta si tropieza?",
    "Un automóvil: arranca todos los días sin fallas raras (madurez), está listo cuando lo necesitas (disponibilidad) y tiene llanta de repuesto si se pincha (tolerancia y recuperación).",
    "¿Se cuelga, deja de responder o pierde datos cuando ocurre un fallo imprevisto?"
  ],
  6: [
    "¿Solo entra, consulta y modifica quien realmente tiene autorización?",
    "Una casa con llave y cámara: los de fuera no ven hacia adentro (confidencialidad), nadie mueve tus muebles sin permiso (integridad) y se sabe con certeza quién abrió la puerta (responsabilidad y no repudio).",
    "¿Alguien no autorizado puede ver datos privados, alterarlos o negar que hizo una operación?"
  ],
  7: [
    "¿Es fácil de revisar, reparar y actualizar por dentro?",
    "Un mueble modular: puedes cambiar una pieza rota sin desarmar todo el mueble, entiendes dónde encaja cada tornillo y puedes probar cada repuesto por separado.",
    "¿Modificar una pantalla rompe otras tres partes del sistema o cuesta encontrar la causa raíz de un bug?"
  ],
  8: [
    "¿Se puede mudar de un entorno a otro sin complicaciones?",
    "Una maleta de viaje bien empacada: cabe en el maletero del taxi o en el avión (adaptabilidad), se desempaca rápido (instalación) y puedes cambiar una prenda por otra equivalente (reemplazabilidad).",
    "¿Solo funciona en un único sistema operativo antiguo, o instalarlo requiere horas de configuración manual?"
  ]
};

/* Pares que suelen confundir a los evaluadores */
const confusingPairs = [
  ["Confidencialidad vs Integridad", "Confidencialidad = que nadie no autorizado lo VEA. Integridad = que nadie no autorizado lo MODIFIQUE o altere."],
  ["Responsabilidad vs No repudio", "Responsabilidad = el sistema registra qué usuario hizo cada acción. No repudio = no se puede negar la acción porque hay prueba irrefutable (firma/hash)."],
  ["Tolerancia a fallos vs Capacidad de recuperación", "Tolerancia a fallos = el sistema SIGUE funcionando MIENTRAS un componente falla. Recuperación = vuelve a operar y restaura datos DESPUÉS de una caída."],
  ["Coexistencia vs Interoperabilidad", "Coexistencia = dos programas comparten la misma máquina sin estorbarse. Interoperabilidad = dos programas intercambian información entre sí."]
];

/* =====================================================
   CASOS DEL DETECTIVE (28 Casos por Sector y Gravedad)
===================================================== */
const defects = [
  // 1. Comercio
  {
    id: 1,
    sector: "Comercio",
    ctx: "🛒 Bodega · Sistema de ventas y caja",
    parts: ["Un cliente compra 3 productos de S/20 cada uno. ", ["El ticket muestra un total a pagar de S/50", 1, 0], ". ", ["El cajero atiende con normalidad", 0], "."],
    ch: 1, sub: "Corrección funcional", sev: "Alto", impact: "Catastrófico", freq: "Frecuente",
    why: "El sistema cobra menos de lo debido en cada venta: pérdida económica directa e inmediata."
  },
  // 2. Educación
  {
    id: 2,
    sector: "Educación",
    ctx: "🎓 Universidad · Portal de notas",
    parts: ["En semana de matrícula y calificaciones, ", ["cada consulta de notas tarda 40 segundos en cargar la pantalla", 1, 0], ". ", ["Las notas mostradas son las correctas", 0], "."],
    ch: 2, sub: "Comportamiento temporal", sev: "Medio", impact: "Moderado", freq: "Frecuente",
    why: "El sistema funciona y no altera datos, pero el tiempo de respuesta excesivo satura y frustra a los estudiantes."
  },
  // 3. Salud
  {
    id: 3,
    sector: "Salud",
    ctx: "🏥 Hospital · Historias clínicas digitales",
    parts: ["Al iniciar sesión en el módulo de triaje, ", ["cualquier usuario puede ver y descargar el historial médico completo de todos los pacientes", 1, 0], ". ", ["El buscador por DNI es muy ágil", 0], "."],
    ch: 6, sub: "Confidencialidad", sev: "Alto", impact: "Catastrófico", freq: "Frecuente",
    why: "Fuga masiva de información confidencial y sensible: infracción legal grave y riesgo de privacidad médica."
  },
  // 4. Comercio
  {
    id: 4,
    sector: "Comercio",
    ctx: "📱 App de notas y pedidos",
    parts: ["En la pantalla de redacción, ", ["el botón «Borrar todo» está pegado a «Guardar» y vacía la orden sin pedir confirmación", 1, 0], ". ", ["La combinación de colores es moderna", 0], "."],
    ch: 4, sub: "Protección contra errores de usuario", sev: "Medio", impact: "Moderado", freq: "Ocasional",
    why: "Un roce accidental borra el trabajo del usuario de forma irreversible por falta de confirmación preventiva."
  },
  // 5. Banca
  {
    id: 5,
    sector: "Banca",
    ctx: "🏦 Banco · Servidor transaccional",
    parts: ["Ocurrió un corte imprevisto de energía en el datacenter y ", ["al no existir copias de respaldo ni réplica, se perdieron irreversiblemente las transferencias del día", 1, 0], ". ", ["La interfaz web lucía impecable", 0], "."],
    ch: 5, sub: "Capacidad de recuperación", sev: "Alto", impact: "Catastrófico", freq: "Raro",
    why: "Pérdida irrecuperable de transacciones financieras críticas debido a la falta de mecanismos de respaldo y recuperación."
  },
  // 6. Finanzas
  {
    id: 6,
    sector: "Comercio",
    ctx: "🧾 Sistema de facturación · Mantenimiento",
    parts: ["Cuando la entidad tributaria cambia la tasa de impuestos, ", ["los programadores deben buscar y editar manualmente 40 archivos de código fuente", 1, 0], ". ", ["El cálculo actual en producción no tiene errores", 0], "."],
    ch: 7, sub: "Modificabilidad", sev: "Medio", impact: "Moderado", freq: "Ocasional",
    why: "No es un fallo ante el usuario final hoy, pero cada modificación futura requiere alto esfuerzo y genera riesgo de introducir bugs."
  },
  // 7. Comercio (Bajo)
  {
    id: 7,
    sector: "Comercio",
    ctx: "🌐 Tienda online · Cabecera principal",
    parts: ["Al abrir el portal de compras en Chrome, ", ["el logotipo institucional aparece desplazado 3 píxeles hacia la izquierda", 1, 0], ". ", ["El catálogo, el carrito y el pago funcionan sin inconvenientes", 0], "."],
    ch: 4, sub: "Estética de la interfaz de usuario", sev: "Bajo", impact: "Menor", freq: "Frecuente",
    why: "Es un defecto netamente cosmético que no interrumpe transacciones ni afecta la seguridad ni la funcionalidad."
  },
  // 8. Banca
  {
    id: 8,
    sector: "Banca",
    ctx: "🏦 Banca Online · Módulo de transferencias interbancarias",
    parts: ["Un cliente desconoce una transferencia de S/ 5,000, pero ", ["el sistema no guarda registro criptográfico, dirección IP ni firma digital de la operación", 1, 0], ". ", ["La transferencia se procesó al instante", 0], "."],
    ch: 6, sub: "No repudio", sev: "Alto", impact: "Mayor", freq: "Ocasional",
    why: "Imposibilita demostrar técnica y legalmente que el usuario realizó la transacción, dejando al banco sin respaldo probatorio."
  },
  // 9. Salud
  {
    id: 9,
    sector: "Salud",
    ctx: "🏥 Clínica Sanitaria · Monitoreo de camas UCI",
    parts: ["En la unidad de cuidados intensivos, ", ["el software de monitoreo se reinicia automáticamente todos los días a las 3:00 am durante 20 minutos sin dejar servicio de guardia", 1, 0], ". ", ["Durante el resto del día las lecturas son precisas", 0], "."],
    ch: 5, sub: "Disponibilidad", sev: "Alto", impact: "Catastrófico", freq: "Frecuente",
    why: "En un entorno crítico hospitalario, 20 minutos de caída diaria dejan a los pacientes sin vigilancia asistida."
  },
  // 10. Educación
  {
    id: 10,
    sector: "Educación",
    ctx: "🎓 Campus Virtual · Examen de admisión en línea",
    parts: ["A las 9:00 am, ", ["al conectarse simultáneamente 500 postulantes, el servidor colapsa arrojando error 503 Service Unavailable", 1, 0], ". ", ["El diseño de las preguntas es muy pedagógico", 0], "."],
    ch: 2, sub: "Capacidad", sev: "Alto", impact: "Mayor", freq: "Ocasional",
    why: "El sistema no tiene la capacidad de concurrencia requerida para soportar la carga masiva esperada en momentos clave."
  },
  // 11. Comercio (Accesibilidad)
  {
    id: 11,
    sector: "Comercio",
    ctx: "🛒 Tienda E-commerce · Botón de finalizar compra",
    parts: ["En la pantalla de pago, ", ["el botón tiene texto gris claro sobre fondo beige (contraste 1.4:1) y no tiene etiqueta aria para lectores de pantalla", 1, 0], ". ", ["La pasarela de pago bancaria procesa las tarjetas con éxito", 0], "."],
    ch: 4, sub: "Accesibilidad", sev: "Medio", impact: "Moderado", freq: "Frecuente",
    why: "Impide que usuarios con baja visión o lectores asistidos puedan completar su compra de manera independiente."
  },
  // 12. Logística
  {
    id: 12,
    sector: "Logística",
    ctx: "📦 Centro Logístico · Despacho de paquetes",
    parts: ["Se adquirieron lectores láser modernos para el almacén, pero ", ["el lector no puede transmitir los códigos leídos al software central porque los formatos de datos son incompatibles", 1, 0], ". ", ["Los lectores tienen excelente alcance físico", 0], "."],
    ch: 3, sub: "Interoperabilidad", sev: "Alto", impact: "Mayor", freq: "Frecuente",
    why: "Dos sistemas de la empresa no pueden intercambiar información entre sí mediante protocolos y formatos comprensibles."
  },
  // 13. Banca
  {
    id: 13,
    sector: "Banca",
    ctx: "🏦 Fintech · Apertura de cuenta bancaria",
    parts: ["La aplicación permite registrar clientes nacionales con DNI, pero ", ["no existe ninguna opción para que personas extranjeras con carné de extranjería puedan abrir una cuenta", 1, 0], ". ", ["El formulario de DNI valida los dígitos con rapidez", 0], "."],
    ch: 1, sub: "Completitud funcional", sev: "Medio", impact: "Moderado", freq: "Frecuente",
    why: "Falta una función o alcance comercial previsto en los requisitos de negocio para atender a todo el público objetivo."
  },
  // 14. Comercio
  {
    id: 14,
    sector: "Comercio",
    ctx: "📱 App de Delivery · Rastreo de repartidores",
    parts: ["Los repartidores reportan que ", ["la aplicación agota el 50% de la batería del teléfono en solo una hora porque mantiene el sensor GPS activo al máximo sin optimización", 1, 0], ". ", ["El mapa muestra la ruta exacta", 0], "."],
    ch: 2, sub: "Utilización de recursos", sev: "Medio", impact: "Moderado", freq: "Frecuente",
    why: "Uso desproporcionado e ineficiente de los recursos de hardware (batería y energía) del dispositivo móvil."
  },
  // 15. Salud
  {
    id: 15,
    sector: "Salud",
    ctx: "🏥 Farmacia Clínica · Inventario de narcóticos",
    parts: ["En el módulo de despacho, ", ["cualquier practicante puede modificar manualmente el stock de medicamentos controlados sin autorización ni contraseña supervisora", 1, 0], ". ", ["El conteo de cajas es muy visual", 0], "."],
    ch: 6, sub: "Integridad", sev: "Alto", impact: "Catastrófico", freq: "Ocasional",
    why: "Permite alteraciones no autorizadas en datos sensibles de inventario, vulnerando la confiabilidad de los registros."
  },
  // 16. Educación (Bajo)
  {
    id: 16,
    sector: "Educación",
    ctx: "🎓 Laboratorio Escolar · Instalación de software educativo",
    parts: ["Para instalar el software en las computadoras del colegio, ", ["el docente debe abrir la consola y escribir 12 comandos técnicos complejos para configurar variables", 1, 0], ". ", ["Una vez configurado el programa corre sin errores", 0], "."],
    ch: 8, sub: "Facilidad de instalación", sev: "Bajo", impact: "Menor", freq: "Ocasional",
    why: "No hay instalador amigable, lo que dificulta el despliegue pero no impide el funcionamiento del software una vez configurado."
  },
  // 17. Comercio
  {
    id: 17,
    sector: "Comercio",
    ctx: "🌐 Portal Mayorista · Búsqueda de repuestos",
    parts: ["Un comprador necesita cotizar frenos de disco, pero ", ["el buscador del catálogo solo permite buscar por fecha de ingreso y no por modelo de repuesto ni marca", 1, 0], ". ", ["El sistema responde las búsquedas en milisegundos", 0], "."],
    ch: 1, sub: "Pertinencia funcional", sev: "Medio", impact: "Moderado", freq: "Frecuente",
    why: "Aunque el sistema tiene una función de búsqueda, esta no ayuda al usuario a cumplir su objetivo real de compra."
  },
  // 18. Banca (Bajo)
  {
    id: 18,
    sector: "Banca",
    ctx: "🏦 Banca Web · Pie de página de contratos",
    parts: ["En la sección final de contratos hipotecarios, ", ["el texto legal aparece redactado con fuente Comic Sans morada y sin justificación de márgenes", 1, 0], ". ", ["Las cláusulas legales están completas y son vigentes", 0], "."],
    ch: 4, sub: "Estética de la interfaz de usuario", sev: "Bajo", impact: "Menor", freq: "Frecuente",
    why: "Es un problema puramente visual de estilo que no invalida las cláusulas ni afecta el funcionamiento del contrato."
  },
  // 19. Banca
  {
    id: 19,
    sector: "Banca",
    ctx: "🏦 Entidad Financiera · Auditoría de cajas",
    parts: ["Se detectó un retiro sospechoso de S/ 10,000 en ventanilla, pero ", ["en la base de datos el campo 'usuario_cajero' quedó en blanco porque el sistema no registra el ID de sesión", 1, 0], ". ", ["El dinero fue entregado correctamente", 0], "."],
    ch: 6, sub: "Responsabilidad", sev: "Alto", impact: "Mayor", freq: "Ocasional",
    why: "Impide rastrear qué empleado específico llevó a cabo la acción de débito, quebrando la trazabilidad del sistema."
  },
  // 20. Salud
  {
    id: 20,
    sector: "Salud",
    ctx: "🏥 Laboratorio de Análisis · Equipo hematológico",
    parts: ["En la computadora de laboratorio, ", ["el software de análisis sanguíneo se congela y bloquea cada vez que el antivirus institucional inicia su escaneo", 1, 0], ". ", ["Por separado ambos programas funcionan bien", 0], "."],
    ch: 3, sub: "Coexistencia", sev: "Medio", impact: "Moderado", freq: "Ocasional",
    why: "Dos aplicaciones no pueden compartir los mismos recursos y entorno de sistema operativo sin perjudicarse entre sí."
  },
  // 21. Educación
  {
    id: 21,
    sector: "Educación",
    ctx: "🎓 Universidad · Servidores del campus",
    parts: ["El área de TI intentó actualizar el sistema de matrículas a la última versión de Linux, pero ", ["el código fuente arroja errores fatales porque está acoplado estrictamente a una versión obsoleta de 2012", 1, 0], ". ", ["En el servidor antiguo sigue operando", 0], "."],
    ch: 8, sub: "Adaptabilidad", sev: "Medio", impact: "Moderado", freq: "Raro",
    why: "El software no tiene la capacidad de adaptarse a diferentes entornos de hardware o sistemas operativos modernos."
  },
  // 22. Comercio (Bajo)
  {
    id: 22,
    sector: "Comercio",
    ctx: "🛒 Tienda de Ropa · Confirmación de pedido",
    parts: ["Luego de presionar el botón de pagar con tarjeta, ", ["la pantalla permanece 6 segundos completamente en blanco sin barra de carga ni mensaje de 'procesando'", 1, 0], ". ", ["Finalmente el cobro se efectúa y la orden se crea bien", 0], "."],
    ch: 4, sub: "Reconocimiento de la adecuación", sev: "Bajo", impact: "Menor", freq: "Frecuente",
    why: "La falta momentánea de retroalimentación o estado claro desconcierta al usuario, aunque el proceso culmina con éxito."
  },
  // 23. Logística
  {
    id: 23,
    sector: "Logística",
    ctx: "📦 Transporte Express · Servidor de despacho",
    parts: ["En la central de distribución, ", ["cuando el enlace principal a internet cae, los despachadores no pueden continuar trabajando localmente porque no hay modo offline ni servidor alterno", 1, 0], ". ", ["Cuando hay red la sincronización es veloz", 0], "."],
    ch: 5, sub: "Tolerancia a fallos", sev: "Alto", impact: "Mayor", freq: "Ocasional",
    why: "El sistema no tolera la falla de un componente externo (conectividad) y detiene por completo la operación logística."
  },
  // 24. Salud
  {
    id: 24,
    sector: "Salud",
    ctx: "🏥 Centro Médico · Software de triaje",
    parts: ["Para registrar la temperatura y pulso de un paciente, ", ["las nuevas enfermeras requieren memorizar un manual de 80 páginas y tomar 3 semanas de capacitación obligatoria", 1, 0], ". ", ["Los datos guardados nunca se pierden", 0], "."],
    ch: 4, sub: "Facilidad de aprendizaje", sev: "Medio", impact: "Moderado", freq: "Frecuente",
    why: "Curva de aprendizaje desmesurada para realizar tareas básicas y cotidianas en un entorno médico ágil."
  },

  /* =====================================================
     CASOS CON DOS DEFECTOS (El detective debe subrayar ambos)
  ===================================================== */
  // 25. Banca (DOBLE)
  {
    id: 25,
    sector: "Banca",
    isDual: true,
    ctx: "🏦 Banca Móvil · Transferencias rápidas (Doble defecto)",
    parts: [
      "Al entrar a la app bancaria desde el teléfono, ",
      ["el saldo completo de la cuenta aparece en números gigantes sin opción de ocultar con asteriscos", 1, 0],
      ", y además, ",
      ["al presionar transferir no pide clave ni huella y envía el dinero inmediatamente al primer toque", 1, 1],
      ". ",
      ["El menú de ayuda al usuario es claro y responde rápido", 0],
      "."
    ],
    defects: [
      {
        label: "Defecto 1 (Saldo expuesto)",
        ch: 6, sub: "Confidencialidad", sev: "Medio", impact: "Moderado", freq: "Frecuente",
        why: "Expone información financiera privada ante personas alrededor en lugares públicos."
      },
      {
        label: "Defecto 2 (Envío inmediato sin confirmación)",
        ch: 4, sub: "Protección contra errores de usuario", sev: "Alto", impact: "Catastrófico", freq: "Ocasional",
        why: "Cualquier toque accidental envía dinero real sin oportunidad de cancelarlo ni confirmarlo."
      }
    ]
  },

  // 26. Salud (DOBLE)
  {
    id: 26,
    sector: "Salud",
    isDual: true,
    ctx: "🏥 Hospital · Receta médica electrónica (Doble defecto)",
    parts: [
      "En el recetario electrónico, ",
      ["al indicar 2 pastillas de 500mg el sistema imprime una dosis de 2000mg en la receta", 1, 0],
      ". Por otro lado, ",
      ["el título del encabezado aparece cortado y con letras fluorescentes difíciles de leer", 1, 1],
      ". ",
      ["El doctor puede guardar la receta en la base de datos sin demoras", 0],
      "."
    ],
    defects: [
      {
        label: "Defecto 1 (Dosis calculada erróneamente)",
        ch: 1, sub: "Corrección funcional", sev: "Alto", impact: "Catastrófico", freq: "Frecuente",
        why: "Calcula una sobredosis peligrosa para la salud del paciente: fallo crítico directo."
      },
      {
        label: "Defecto 2 (Título cortado y colores chillones)",
        ch: 4, sub: "Estética de la interfaz de usuario", sev: "Bajo", impact: "Menor", freq: "Frecuente",
        why: "Es un problema cosmético de diseño visual que no pone en riesgo la vida del paciente."
      }
    ]
  },

  // 27. Comercio (DOBLE)
  {
    id: 27,
    sector: "Comercio",
    isDual: true,
    ctx: "🛒 E-commerce · Carrito y Pasarela de pagos (Doble defecto)",
    parts: [
      "Durante la compra, ",
      ["el botón de pagar tarda 45 segundos en confirmar el pedido", 1, 0],
      ", y al revisar la base de datos ",
      ["se descubre que un usuario anónimo pudo modificar el precio del producto en la URL antes de pagar", 1, 1],
      ". ",
      ["El catálogo de productos carga sin interrupciones", 0],
      "."
    ],
    defects: [
      {
        label: "Defecto 1 (Lentitud en confirmación)",
        ch: 2, sub: "Comportamiento temporal", sev: "Medio", impact: "Moderado", freq: "Frecuente",
        why: "Demora excesiva en procesar la orden que provoca compras duplicadas por reintento."
      },
      {
        label: "Defecto 2 (Alteración de precio por URL)",
        ch: 6, sub: "Integridad", sev: "Alto", impact: "Catastrófico", freq: "Ocasional",
        why: "Vulnerabilidad grave que permite adulterar datos comerciales sin autorización."
      }
    ]
  },

  // 28. Educación (DOBLE)
  {
    id: 28,
    sector: "Educación",
    isDual: true,
    ctx: "🎓 Portal de Matrícula Universitaria (Doble defecto)",
    parts: [
      "En el sistema de matrícula, ",
      ["el sitio no funciona con lectores de pantalla para alumnos con discapacidad visual", 1, 0],
      ", y además ",
      ["todos los viernes a las 11:00 pm el servidor se apaga automáticamente dejando fuera a los estudiantes", 1, 1],
      ". ",
      ["Los créditos de cada curso están bien sumados", 0],
      "."
    ],
    defects: [
      {
        label: "Defecto 1 (Inaccesible para lectores de pantalla)",
        ch: 4, sub: "Accesibilidad", sev: "Medio", impact: "Moderado", freq: "Frecuente",
        why: "Excluye a usuarios con discapacidades visuales de realizar su matrícula en igualdad de condiciones."
      },
      {
        label: "Defecto 2 (Servidor apagado los viernes)",
        ch: 5, sub: "Disponibilidad", sev: "Alto", impact: "Mayor", freq: "Frecuente",
        why: "El sistema no está disponible para los usuarios en horarios de necesidad."
      }
    ]
  }
];

/* Compatibilidad retrospectiva con lectores directos */
defects.forEach(d => {
  if (d.defects && d.defects.length > 0) {
    d.ch = d.defects[0].ch;
    d.sub = d.defects[0].sub;
    d.sev = d.defects[0].sev;
    d.why = d.defects[0].why;
    d.impact = d.defects[0].impact;
    d.freq = d.defects[0].freq;
  }
});

/* =====================================================
   PAREJAS PARA EL JUEGO DE EMPAREJAR (Fase 3)
===================================================== */
const matchingData = {
  subcatToCat: [
    { left: "Completitud funcional", right: "Adecuación funcional" },
    { left: "Corrección funcional", right: "Adecuación funcional" },
    { left: "Comportamiento temporal", right: "Eficiencia de desempeño" },
    { left: "Capacidad", right: "Eficiencia de desempeño" },
    { left: "Coexistencia", right: "Compatibilidad" },
    { left: "Interoperabilidad", right: "Compatibilidad" },
    { left: "Protección contra errores", right: "Usabilidad" },
    { left: "Accesibilidad", right: "Usabilidad" },
    { left: "Disponibilidad", right: "Fiabilidad" },
    { left: "Tolerancia a fallos", right: "Fiabilidad" },
    { left: "Confidencialidad", right: "Seguridad" },
    { left: "Integridad", right: "Seguridad" },
    { left: "Modularidad", right: "Mantenibilidad" },
    { left: "Modificabilidad", right: "Mantenibilidad" },
    { left: "Adaptabilidad", right: "Portabilidad" },
    { left: "Facilidad de instalación", right: "Portabilidad" }
  ],
  exampleToSubcat: [
    { left: "3 ítems de S/20 suman S/60 exactos", right: "Corrección funcional" },
    { left: "Búsqueda responde en menos de 1 segundo", right: "Comportamiento temporal" },
    { left: "Antivirus y sistema corren sin estorbarse", right: "Coexistencia" },
    { left: "Pide confirmación antes de borrar la base", right: "Protección contra errores de usuario" },
    { left: "Si un servidor falla, otro asume la carga", right: "Tolerancia a fallos" },
    { left: "Solo el médico autorizado lee la historia clínica", right: "Confidencialidad" },
    { left: "Cambiar el módulo de cobro no rompe el de ventas", right: "Modularidad" },
    { left: "La app corre en Windows, Mac y Android", right: "Adaptabilidad" }
  ]
};

/* =====================================================
   CASOS CON IMAGEN / MOCKUPS INTERACTIVOS (Fase 4)
===================================================== */
const imageCases = [
  {
    id: 1,
    sector: "Banca Móvil",
    title: "App Bancaria: Transferencia Inmediata",
    instruction: "Toca sobre el elemento de la pantalla que representa el mayor defecto de calidad.",
    mockupType: "bank_transfer",
    hotspots: [
      {
        id: "btn_transfer",
        top: "76%", left: "10%", width: "80%", height: "14%",
        isDefect: true,
        feedback: "¡Correcto! El botón 'Transferir Ahora' transfiere S/ 2,500 en un solo toque, sin pedir PIN, huella digital ni confirmación previa.",
        characteristic: "Usabilidad",
        subcharacteristic: "Protección contra errores de usuario",
        severity: "Alto"
      },
      {
        id: "account_info",
        top: "20%", left: "10%", width: "80%", height: "25%",
        isDefect: false,
        feedback: "Los datos de la cuenta de destino son correctos y claros."
      }
    ]
  },
  {
    id: 2,
    sector: "Salud Digital",
    title: "Portal Hospitalario: Ficha del Médico",
    instruction: "Observa la cabecera del sistema clínico y toca la zona con una vulnerabilidad crítica.",
    mockupType: "hospital_header",
    hotspots: [
      {
        id: "exposed_pass",
        top: "15%", left: "55%", width: "40%", height: "24%",
        isDefect: true,
        feedback: "¡Excelente! La contraseña institucional del médico está expuesta en texto plano en la cabecera visible para cualquier persona.",
        characteristic: "Seguridad",
        subcharacteristic: "Confidencialidad",
        severity: "Alto"
      },
      {
        id: "doctor_avatar",
        top: "15%", left: "5%", width: "35%", height: "24%",
        isDefect: false,
        feedback: "El nombre y fotografía del doctor no presentan ningún defecto."
      }
    ]
  },
  {
    id: 3,
    sector: "E-Commerce",
    title: "Carrito de Compras Online",
    instruction: "Revisa los cálculos matemáticos del pedido y pulsa sobre el error.",
    mockupType: "cart_calculation",
    hotspots: [
      {
        id: "wrong_total",
        top: "72%", left: "50%", width: "45%", height: "18%",
        isDefect: true,
        feedback: "¡Bien visto! Dos audífonos de S/ 40 más S/ 10 de envío suman S/ 90, pero el total muestra erróneamente S/ 50.",
        characteristic: "Adecuación funcional",
        subcharacteristic: "Corrección funcional",
        severity: "Alto"
      },
      {
        id: "item_list",
        top: "25%", left: "10%", width: "80%", height: "35%",
        isDefect: false,
        feedback: "El detalle de los artículos y sus precios unitarios está bien listado."
      }
    ]
  },
  {
    id: 4,
    sector: "Educación",
    title: "Campus Virtual en Pantalla Móvil",
    instruction: "Detecta qué parte de la pantalla muestra que el diseño no se adapta al teléfono.",
    mockupType: "mobile_overflow",
    hotspots: [
      {
        id: "table_overflow",
        top: "40%", left: "60%", width: "38%", height: "35%",
        isDefect: true,
        feedback: "¡Exacto! El horario de clases desborda la pantalla del teléfono cortando dos columnas de cursos esenciales sin scroll horizontal.",
        characteristic: "Portabilidad",
        subcharacteristic: "Adaptabilidad",
        severity: "Medio"
      },
      {
        id: "user_banner",
        top: "10%", left: "10%", width: "80%", height: "20%",
        isDefect: false,
        feedback: "El saludo y foto del estudiante se visualizan correctamente."
      }
    ]
  }
];

/* =====================================================
   PLANTILLAS PARA FICHA DE REPORTE DE DEFECTO (Fase 4)
===================================================== */
const bugReportTemplates = [
  {
    id: "rep_bank",
    sector: "Banca Móvil",
    scenario: "En una billetera digital bancaria, los usuarios reportan que al enviar dinero a un contacto, no se solicita clave secreta ni huella y la transacción se procesa inmediatamente.",
    modelAnswer: {
      title: "Transferencia de fondos sin confirmación ni validación de identidad",
      evidence: "Al pulsar el botón 'Transferir', el saldo se debita de forma automática e instantánea sin pedir PIN, contraseña ni confirmación.",
      characteristic: "Usabilidad",
      subcharacteristic: "Protección contra errores de usuario",
      impact: "Catastrófico",
      frequency: "Frecuente",
      severity: "Alto",
      solution: "Implementar un modal de confirmación con el resumen de la operación y solicitar biometría o clave dinámica antes de invocar la API de transferencia."
    }
  },
  {
    id: "rep_health",
    sector: "Salud",
    scenario: "En el software de farmacia de una clínica, cualquier practicante puede editar a su gusto el inventario de medicamentos controlados sin clave de supervisor.",
    modelAnswer: {
      title: "Modificación de stock de medicamentos controlados sin control de permisos",
      evidence: "Un usuario con rol 'Caja/Practicante' tiene habilitada la edición directa del stock de narcóticos en la pantalla de inventario.",
      characteristic: "Seguridad",
      subcharacteristic: "Integridad",
      impact: "Catastrófico",
      frequency: "Ocasional",
      severity: "Alto",
      solution: "Restringir la acción en frontend y backend mediante control de acceso basado en roles (RBAC) y exigir autorización con firma del jefe de farmacia."
    }
  }
];

/* =====================================================
   CATÁLOGO DE INSIGNIAS Y NIVELES (Fase 5)
===================================================== */
const badgesCatalog = [
  {
    id: "first_step",
    name: "Primer Paso",
    icon: "🌱",
    description: "Completa tu primera partida en cualquier modo de juego."
  },
  {
    id: "detective_jr",
    name: "Detective Junior",
    icon: "🕵️‍♂️",
    description: "Resuelve con éxito tus primeros 5 casos de investigación."
  },
  {
    id: "detective_sr",
    name: "Detective Senior",
    icon: "🔍",
    description: "Resuelve con éxito 15 o más casos de defectos de software."
  },
  {
    id: "bug_hunter",
    name: "Cazador de Bugs",
    icon: "🎯",
    description: "Encuentra y clasifica el error en 3 casos visuales con imagen."
  },
  {
    id: "match_master",
    name: "Mente Conectada",
    icon: "🧩",
    description: "Supera una ronda completa del juego de emparejar sin equivocarte."
  },
  {
    id: "streak_10",
    name: "Racha Imparable",
    icon: "🔥",
    description: "Alcanza una racha de 10 aciertos consecutivos."
  },
  {
    id: "qa_auditor",
    name: "Auditor de Calidad",
    icon: "📋",
    description: "Redacta una ficha de reporte de defecto y compárala con el Senior QA."
  },
  {
    id: "iso_master",
    name: "Maestro ISO 25010",
    icon: "🏆",
    description: "Consigue un dominio del 80% o más en al menos 4 características."
  }
];

