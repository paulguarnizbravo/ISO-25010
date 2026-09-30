/* ===== Mejoras: modo "Entender" + Detective de defectos ===== */

/* ---------- ENTENDER: ideas simples y analogías ---------- */
const concepts = {
 1:["¿Hace lo que necesito, y lo hace bien?","Un cuchillo de cocina: sirve si corta lo que quieres cortar (completo), corta limpio (correcto) y es el cuchillo adecuado para esa tarea (pertinente).","¿Faltan funciones, o alguna da un resultado equivocado?"],
 2:["¿Qué tan rápido va y cuánto gasta?","Una cocina de restaurante: importa cuánto tarda en salir el plato, cuánto gas y personal gasta y cuántas mesas aguanta a la vez.","¿Se pone lento, gasta mucho o se cae con muchos usuarios?"],
 3:["¿Se lleva bien con los demás sistemas?","Enchufes y adaptadores: convivir en la misma regleta sin estorbarse (coexistencia) y entenderse entre aparatos (interoperabilidad).","¿Choca con otro programa o no puede intercambiar datos?"],
 4:["¿Cualquier persona lo entiende y lo usa sin sufrir?","Una puerta: si necesitas un manual para abrirla, está mal diseñada. Y si tiene un botón de alarma pegado al de abrir, invita al error.","¿Confunde, cuesta aprenderlo o deja al usuario equivocarse fácil?"],
 5:["¿Funciona siempre y se levanta si tropieza?","Un auto: arranca todos los días (madurez), está listo cuando lo necesitas (disponibilidad) y tiene llanta de repuesto (tolerancia y recuperación).","¿Se cae, se cuelga o pierde datos cuando algo falla?"],
 6:["¿Solo entra, ve y cambia cosas quien debe?","Una casa con llave y cámara: los de fuera no ven (confidencialidad), nadie mueve tus cosas (integridad) y se sabe quién entró (responsabilidad).","¿Alguien no autorizado puede ver, cambiar o negar algo?"],
 7:["¿Es fácil de arreglar y mejorar por dentro?","Un mueble por módulos: cambias una pieza sin desarmar todo, entiendes dónde falló y puedes probar cada parte.","¿Cambiar una cosa rompe otras o cuesta encontrar el error?"],
 8:["¿Se puede mudar de un lugar a otro sin dolor?","Una maleta: cambias de casa y todo cabe (adaptabilidad), se arma rápido (instalación) y puedes cambiar una prenda por otra (reemplazabilidad).","¿Solo funciona en un equipo, o instalarlo es un calvario?"]};
const pairs = [
 ["Confidencialidad vs Integridad","Confidencialidad = que nadie NO autorizado lo VEA. Integridad = que nadie NO autorizado lo CAMBIE."],
 ["Responsabilidad vs No repudio","Responsabilidad = el sistema anota quién hizo qué. No repudio = esa persona no puede negarlo (prueba, como una firma)."],
 ["Tolerancia a fallos vs Recuperación","Tolerancia = sigue funcionando MIENTRAS falla algo. Recuperación = vuelve a funcionar DESPUÉS de caerse."],
 ["Coexistencia vs Interoperabilidad","Coexistencia = conviven sin estorbarse. Interoperabilidad = se pasan información."]];

const _showCharacteristic = showCharacteristic;
showCharacteristic = function(id){
  _showCharacteristic(id);
  const c = concepts[id], box = document.querySelector("#detailContent .detail-header");
  if(c && box) box.insertAdjacentHTML("afterend",
   `<div class="concept"><div class="simple">${c[0]}</div><div class="analogy">🧩 <b>Piensa en…</b> ${c[1]}</div><div class="ask">🔍 Pregúntate: ${c[2]}</div></div>`);
};
(function(){
  const g = document.getElementById("characteristicsGrid");
  g.insertAdjacentHTML("beforebegin",`<h3 class="section-title">🧠 Para no confundirte</h3><div class="pairs">${pairs.map(p=>`<div class="pair"><b>${p[0]}</b><br>${p[1]}</div>`).join("")}</div>`);
})();

/* ---------- DETECTIVE DE DEFECTOS ---------- */
const defects = [
 {ctx:"🛒 Bodega · Sistema de ventas",parts:["Un cliente compra 3 productos de S/20. ",["El ticket muestra un total de S/50",1],". ",["El cajero atiende con normalidad",0],"."],ch:1,sub:"Corrección funcional",sev:"Alto",why:"Cobra mal en cada venta: hay pérdida de dinero directa."},
 {ctx:"🎓 Universidad · Portal de notas",parts:["En semana de matrícula ",["cada consulta de notas tarda 40 segundos",1],". ",["Las notas son correctas",0],"."],ch:2,sub:"Comportamiento temporal",sev:"Medio",why:"Funciona y los datos son correctos, pero frustra y satura; hay rodeo (reintentar)."},
 {ctx:"🏥 Hospital · Historias clínicas",parts:["Al iniciar sesión, ",["cualquier enfermera puede abrir la historia de todos los pacientes",1],". ",["El buscador es rápido",0],"."],ch:6,sub:"Confidencialidad",sev:"Alto",why:"Expone datos sensibles: riesgo legal y de privacidad."},
 {ctx:"📱 App de notas",parts:["El botón ",["«Borrar todo» está pegado a «Guardar» y borra sin preguntar",1],". ",["Los colores son agradables",0],"."],ch:4,sub:"Protección contra errores de usuario",sev:"Medio",why:"El daño depende de un descuido del usuario, pero puede perder su trabajo."},
 {ctx:"🏦 Banco · Servidor central",parts:["Se cayó el servidor y ",["no había copia de respaldo: se perdieron las operaciones del día",1],". ",["La app luce moderna",0],"."],ch:5,sub:"Capacidad de recuperación",sev:"Alto",why:"Pérdida irreversible de información crítica del negocio."},
 {ctx:"🧾 Facturación · Código fuente",parts:["Cuando cambia el IGV, ",["hay que editar 40 archivos a mano",1],". ",["El sistema calcula bien hoy",0],"."],ch:7,sub:"Modificabilidad",sev:"Medio",why:"No falla hoy, pero cada cambio es lento y riesgoso."},
 {ctx:"🌐 Tienda online · Página de inicio",parts:["El logo ",["se ve 2 píxeles desalineado en la cabecera",1],". ",["Comprar y pagar funcionan perfecto",0],"."],ch:4,sub:"Estética de la interfaz de usuario",sev:"Bajo",why:"Es cosmético: no afecta funciones ni datos."}];
let dOrder=[],dIdx=0,dStep=0,dPts=0,dOk=0;
const $d=()=>document.getElementById("detectiveContent");

function startDetective(){dOrder=shuffle([...defects]);dIdx=0;dStep=0;dPts=0;dOk=0;score=0;streak=0;updateHeader();showSection("detectiveScreen");dRender();}

function dRender(){
  if(dIdx>=dOrder.length){
    const best=getBestScore(); if(score>best) localStorage.setItem("iso25010BestScore",score); updateHeader();
    $d().innerHTML=`<div class="det-card"><h2>🕵️ Caso cerrado</h2><p>Puntos ganados: <b>${score}</b> · Pasos acertados: <b>${dOk} de ${dOrder.length*4}</b></p><button class="primary-btn" onclick="startDetective()">🔄 Nuevos casos</button> <button class="secondary-btn" onclick="showSection('homeScreen')">🏠 Menú</button></div>`;return;}
  const c=dOrder[dIdx],names=["1 Evidencia","2 Característica","3 Subcaracterística","4 Gravedad"];
  const report=c.parts.map(p=>typeof p==="string"?p:`<span class="pick" tabindex="0" role="button" data-ok="${p[1]}">${p[0]}</span>`).join("");
  $d().innerHTML=`<div class="det-card"><div class="steps">${names.map((n,i)=>`<span class="${i<dStep?'done':i===dStep?'now':''}">${n}</span>`).join("")}</div>
   <div class="det-ctx">Caso ${dIdx+1} de ${dOrder.length} · ${c.ctx}</div><div class="report">${report}</div><div id="dq"></div><div id="dv"></div></div>`;
  dAsk(c);
}

function dAsk(c){
  const q=document.getElementById("dq"),picks=[...document.querySelectorAll(".pick")];
  if(dStep===0){
    q.innerHTML=`<b>Subraya la frase que revela el defecto</b> (toca una).`;
    picks.forEach(p=>{const go=()=>{picks.forEach(x=>x.classList.add("off"));const ok=p.dataset.ok==="1";
      p.classList.add(ok?"hit":"miss"); if(!ok) picks.find(x=>x.dataset.ok==="1").classList.add("hit"); dDone(ok);};
      p.onclick=go;p.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")go();};});
    return;}
  picks.forEach(x=>{x.classList.add("off");if(x.dataset.ok==="1")x.classList.add("hit");});
  let opts,right,label;
  if(dStep===1){label="¿Qué característica ISO 25010 se ve afectada?";opts=characteristics.map(x=>x.name);right=characteristics.find(x=>x.id===c.ch).name;}
  else if(dStep===2){label="¿Y qué subcaracterística exacta?";const ch=characteristics.find(x=>x.id===c.ch);opts=ch.subcategories.map(s=>s.name);right=c.sub;}
  else{label="¿Qué gravedad tiene este defecto?";opts=["Alto","Medio","Bajo"];right=c.sev;}
  q.innerHTML=`<b>${label}</b><div class="opts ${dStep===3?'sev':''}" style="margin-top:10px">${opts.map(o=>`<button>${o}</button>`).join("")}</div>${dStep===3?`<div class="sev-guide"><b>Alto:</b> pierde dinero o datos, o deja de funcionar. <b>Medio:</b> molesta o frena, pero hay rodeo. <b>Bajo:</b> cosmético, no afecta el uso.</div>`:""}`;
  q.querySelectorAll("button").forEach(b=>b.onclick=()=>{const ok=b.textContent===right;
    q.querySelectorAll("button").forEach(x=>{x.disabled=true;if(x.textContent===right)x.classList.add("ok");});
    if(!ok)b.classList.add("no");dDone(ok);});
}

function dDone(ok){
  if(ok){dOk++;streak++;score+=50+Math.min(streak,4)*5;}else streak=0;
  updateHeader();
  setTimeout(()=>{dStep++;if(dStep<4){dRender();return;}
    const c=dOrder[dIdx],ch=characteristics.find(x=>x.id===c.ch).name;
    document.getElementById("dq").innerHTML="";
    document.getElementById("dv").innerHTML=`<div class="verdict"><b>Veredicto:</b> ${ch} → <b>${c.sub}</b> · Gravedad <span class="tag ${c.sev}">${c.sev}</span><br>${c.why}<br><br><button class="primary-btn" onclick="dIdx++;dStep=0;dRender()">${dIdx+1<dOrder.length?"Siguiente caso →":"Ver resultado →"}</button></div>`;
  },ok?700:1400);
}
