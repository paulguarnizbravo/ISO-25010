/* =====================================================
   ISO/IEC 25010 CHALLENGE
   DATOS (contenido del juego: editar aquí para agregar preguntas y casos)
===================================================== */


/* =====================================================
   DATOS ISO 25010
===================================================== */

const characteristics = [

    {
        id: 1,
        name: "Adecuación funcional",
        icon: "⚙️",
        description:
            "El software proporciona las funciones necesarias para satisfacer las necesidades del usuario.",

        subcategories: [

            {
                name: "Completitud funcional",
                description:
                    "El sistema tiene todas las funciones necesarias.",
                example:
                    "Un sistema de ventas permite registrar productos, clientes, ventas, pagos y reportes."
            },

            {
                name: "Corrección funcional",
                description:
                    "Las funciones proporcionan resultados correctos.",
                example:
                    "Al vender 3 productos de S/20, el sistema calcula correctamente S/60."
            },

            {
                name: "Pertinencia funcional",
                description:
                    "Las funciones ayudan realmente a realizar las tareas necesarias.",
                example:
                    "El sistema permite buscar rápidamente un producto por nombre o código."
            }
        ]
    },


    {
        id: 2,
        name: "Eficiencia de desempeño",
        icon: "⚡",
        description:
            "Evalúa qué tan rápido funciona el sistema y cuánto utiliza los recursos disponibles.",

        subcategories: [

            {
                name: "Comportamiento temporal",
                description:
                    "El sistema responde en un tiempo adecuado.",
                example:
                    "Una búsqueda de productos muestra los resultados en menos de 2 segundos."
            },

            {
                name: "Utilización de recursos",
                description:
                    "Utiliza correctamente recursos como memoria, CPU, almacenamiento o batería.",
                example:
                    "Una aplicación móvil funciona sin consumir excesivamente la batería."
            },

            {
                name: "Capacidad",
                description:
                    "Puede soportar la cantidad esperada de usuarios, datos o tareas.",
                example:
                    "Una plataforma soporta 500 usuarios conectados simultáneamente."
            }
        ]
    },


    {
        id: 3,
        name: "Compatibilidad",
        icon: "🔗",
        description:
            "Permite que el software funcione junto con otros sistemas o intercambie información.",

        subcategories: [

            {
                name: "Coexistencia",
                description:
                    "Puede funcionar junto con otros programas sin afectar negativamente su funcionamiento.",
                example:
                    "Dos aplicaciones instaladas en una computadora funcionan simultáneamente sin conflictos."
            },

            {
                name: "Interoperabilidad",
                description:
                    "Puede intercambiar información con otros sistemas.",
                example:
                    "Un sistema de ventas envía información de una factura a otro sistema mediante una API."
            }
        ]
    },


    {
        id: 4,
        name: "Usabilidad",
        icon: "👤",
        description:
            "Evalúa qué tan fácil es comprender, aprender y utilizar el sistema.",

        subcategories: [

            {
                name: "Reconocimiento de la adecuación",
                description:
                    "El usuario puede comprender para qué sirve el sistema y sus funciones.",
                example:
                    "Los nombres de los botones permiten entender claramente qué acción realizan."
            },

            {
                name: "Facilidad de aprendizaje",
                description:
                    "El usuario puede aprender rápidamente a utilizar el sistema.",
                example:
                    "Un nuevo trabajador aprende a registrar una venta en pocos minutos."
            },

            {
                name: "Operabilidad",
                description:
                    "Las funciones son fáciles de manejar.",
                example:
                    "El usuario puede registrar una venta con pocos pasos."
            },

            {
                name: "Protección contra errores de usuario",
                description:
                    "El sistema ayuda a prevenir o corregir errores.",
                example:
                    "Antes de eliminar un producto aparece un mensaje solicitando confirmación."
            },

            {
                name: "Estética de la interfaz de usuario",
                description:
                    "La interfaz es clara, ordenada y visualmente agradable.",
                example:
                    "El sistema utiliza botones, colores y menús organizados."
            },

            {
                name: "Accesibilidad",
                description:
                    "Puede ser utilizado por personas con diferentes capacidades.",
                example:
                    "La aplicación permite utilizar lectores de pantalla y tiene buen contraste."
            }
        ]
    },


    {
        id: 5,
        name: "Fiabilidad",
        icon: "🛡️",
        description:
            "Evalúa si el sistema funciona correctamente y puede recuperarse ante problemas.",

        subcategories: [

            {
                name: "Madurez",
                description:
                    "El sistema funciona correctamente durante su uso normal.",
                example:
                    "Una aplicación funciona durante semanas sin presentar fallos frecuentes."
            },

            {
                name: "Disponibilidad",
                description:
                    "El sistema está disponible cuando se necesita.",
                example:
                    "Un sistema bancario permanece disponible durante la mayor parte del día."
            },

            {
                name: "Tolerancia a fallos",
                description:
                    "Puede continuar funcionando aunque ocurra algún problema.",
                example:
                    "Si falla uno de los servidores, otro servidor continúa atendiendo las solicitudes."
            },

            {
                name: "Capacidad de recuperación",
                description:
                    "Puede recuperar su funcionamiento y datos después de un fallo.",
                example:
                    "Después de una caída del servidor, el sistema recupera la información mediante una copia de respaldo."
            }
        ]
    },


    {
        id: 6,
        name: "Seguridad",
        icon: "🔐",
        description:
            "Protege la información y evita accesos o acciones no autorizadas.",

        subcategories: [

            {
                name: "Confidencialidad",
                description:
                    "Solo las personas autorizadas pueden acceder a la información.",
                example:
                    "Un trabajador no autorizado no puede consultar los datos bancarios de los clientes."
            },

            {
                name: "Integridad",
                description:
                    "Evita modificaciones no autorizadas de la información.",
                example:
                    "Un usuario normal no puede modificar el precio de los productos."
            },

            {
                name: "No repudio",
                description:
                    "Permite demostrar que una persona realizó determinada acción.",
                example:
                    "Una firma digital permite demostrar quién aprobó un documento."
            },

            {
                name: "Responsabilidad",
                description:
                    "Permite identificar las acciones realizadas por cada usuario.",
                example:
                    "El sistema registra que el usuario Carlos modificó el precio de un producto."
            },

            {
                name: "Autenticidad",
                description:
                    "Permite verificar que un usuario o sistema es quien dice ser.",
                example:
                    "El sistema solicita usuario, contraseña y código de verificación."
            }
        ]
    },


    {
        id: 7,
        name: "Mantenibilidad",
        icon: "🔧",
        description:
            "Evalúa qué tan fácil es analizar, modificar, probar y mantener el software.",

        subcategories: [

            {
                name: "Modularidad",
                description:
                    "El sistema está dividido en partes independientes.",
                example:
                    "El módulo de ventas puede modificarse sin cambiar el módulo de inventario."
            },

            {
                name: "Reusabilidad",
                description:
                    "Los componentes pueden reutilizarse en otros sistemas.",
                example:
                    "Un componente de validación de DNI puede utilizarse en varios proyectos."
            },

            {
                name: "Analizabilidad",
                description:
                    "Es fácil encontrar la causa de un problema.",
                example:
                    "Los registros del sistema permiten identificar dónde ocurrió un error."
            },

            {
                name: "Modificabilidad",
                description:
                    "Es fácil realizar cambios o mejoras.",
                example:
                    "Agregar un nuevo método de pago no requiere modificar todo el sistema."
            },

            {
                name: "Capacidad de ser probado",
                description:
                    "Es fácil comprobar que el software funciona correctamente.",
                example:
                    "Los módulos pueden probarse individualmente mediante pruebas automatizadas."
            }
        ]
    },


    {
        id: 8,
        name: "Portabilidad",
        icon: "📦",
        description:
            "Evalúa qué tan fácil es trasladar o instalar el software en diferentes entornos.",

        subcategories: [

            {
                name: "Adaptabilidad",
                description:
                    "Puede adaptarse a diferentes entornos.",
                example:
                    "El sistema puede funcionar en Windows y Linux realizando los ajustes necesarios."
            },

            {
                name: "Facilidad de instalación",
                description:
                    "Es fácil instalar o desinstalar el software.",
                example:
                    "La aplicación puede instalarse mediante un asistente con pocos pasos."
            },

            {
                name: "Reemplazabilidad",
                description:
                    "Puede sustituir o ser sustituido por otro software similar.",
                example:
                    "Una aplicación puede reemplazarse por otra que ofrece funciones equivalentes."
            }
        ]
    }

];


/* =====================================================
   PREGUNTAS
===================================================== */

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



/* ===== CASOS DEL DETECTIVE ===== */
const defects = [
 {ctx:"🛒 Bodega · Sistema de ventas",parts:["Un cliente compra 3 productos de S/20. ",["El ticket muestra un total de S/50",1],". ",["El cajero atiende con normalidad",0],"."],ch:1,sub:"Corrección funcional",sev:"Alto",why:"Cobra mal en cada venta: hay pérdida de dinero directa."},
 {ctx:"🎓 Universidad · Portal de notas",parts:["En semana de matrícula ",["cada consulta de notas tarda 40 segundos",1],". ",["Las notas son correctas",0],"."],ch:2,sub:"Comportamiento temporal",sev:"Medio",why:"Funciona y los datos son correctos, pero frustra y satura; hay rodeo (reintentar)."},
 {ctx:"🏥 Hospital · Historias clínicas",parts:["Al iniciar sesión, ",["cualquier enfermera puede abrir la historia de todos los pacientes",1],". ",["El buscador es rápido",0],"."],ch:6,sub:"Confidencialidad",sev:"Alto",why:"Expone datos sensibles: riesgo legal y de privacidad."},
 {ctx:"📱 App de notas",parts:["El botón ",["«Borrar todo» está pegado a «Guardar» y borra sin preguntar",1],". ",["Los colores son agradables",0],"."],ch:4,sub:"Protección contra errores de usuario",sev:"Medio",why:"El daño depende de un descuido del usuario, pero puede perder su trabajo."},
 {ctx:"🏦 Banco · Servidor central",parts:["Se cayó el servidor y ",["no había copia de respaldo: se perdieron las operaciones del día",1],". ",["La app luce moderna",0],"."],ch:5,sub:"Capacidad de recuperación",sev:"Alto",why:"Pérdida irreversible de información crítica del negocio."},
 {ctx:"🧾 Facturación · Código fuente",parts:["Cuando cambia el IGV, ",["hay que editar 40 archivos a mano",1],". ",["El sistema calcula bien hoy",0],"."],ch:7,sub:"Modificabilidad",sev:"Medio",why:"No falla hoy, pero cada cambio es lento y riesgoso."},
 {ctx:"🌐 Tienda online · Página de inicio",parts:["El logo ",["se ve 2 píxeles desalineado en la cabecera",1],". ",["Comprar y pagar funcionan perfecto",0],"."],ch:4,sub:"Estética de la interfaz de usuario",sev:"Bajo",why:"Es cosmético: no afecta funciones ni datos."}];
