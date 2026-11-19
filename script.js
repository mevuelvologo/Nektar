(function(){

  var WA_NUMBER = '5491138608235'; // 15 3860 8235 (AR, CABA/GBA) en formato wa.me
  var ACCENT_CYCLE = ['#6C4CE0','#E14434','#25D366','#6C4CE0','#E14434','#25D366'];

  var iconYes = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5 10 17 19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var iconNo  = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';

  function fmtInt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function waLink(msg){ return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg); }

  /* ============================================================
     DATASETS — un cotizador por clave (logo / web / sub).
     Misma estructura para los tres: 6 preguntas, 3 opciones cada
     una (1/2/3 puntos), 3 niveles de resultado y una matriz de
     features para el detalle y el comparador.
     ============================================================ */
  var DATASETS = {

    /* ---------------------------------------------------------- LOGO */
    logo: {
      name: 'Cotizador de Logo',
      cardLabel: 'Cotizador de Logo',
      tagline: 'Respondé 6 preguntas y te recomendamos el paquete de diseño de logo ideal.',
      priceMode: 'single',
      tierOrder: ['minima','media','avanzada'],
      questions: [
        { code:'Claridad del brief', title:'¿Qué tan claro tienen el brief para el logo?', options:[
          { pts:1, text:'Tenemos referencias claras.' },
          { pts:2, text:'¿Qué es un brief?' },
          { pts:3, text:'Estamos abiertos a una búsqueda creativa.' } ] },
        { code:'Propuestas', title:'¿Cuántas propuestas de diseño les gustaría recibir?', options:[
          { pts:1, text:'De una a tres propuestas.' },
          { pts:2, text:'De tres a seis propuestas.' },
          { pts:3, text:'De seis a doce propuestas.' } ] },
        { code:'Devoluciones', title:'¿Cuántas rondas de ajustes o devoluciones necesitan?', options:[
          { pts:1, text:'No queremos devoluciones.' },
          { pts:2, text:'Queremos de una a tres devoluciones.' },
          { pts:3, text:'Queremos de tres a seis devoluciones.' } ] },
        { code:'Archivos finales', title:'¿Qué archivos finales necesitan?', options:[
          { pts:1, text:'Imagen para redes sociales.' },
          { pts:2, text:'Archivos editables.' },
          { pts:3, text:'Archivos multimedia.' } ] },
        { code:'Tiempo de entrega', title:'¿Con qué urgencia necesitan el logo?', options:[
          { pts:1, text:'No tenemos prisa.' },
          { pts:2, text:'Sin prisa, pero con fecha de entrega.' },
          { pts:3, text:'Es urgente.' } ] },
        { code:'Seguimiento', title:'¿Qué nivel de seguimiento les gustaría que hagamos?', options:[
          { pts:1, text:'No necesitamos que lo sigan.' },
          { pts:2, text:'Nos gustaría que traten con los proveedores.' },
          { pts:3, text:'Nos gustaría que chequeen el trabajo.' } ] }
      ],
      tiers: {
        minima:   { name:'Paquete Mínimo',   eur:50,  ars:85000,
          summary:'Ideal para marcas que ya tienen dirección clara y buscan un proceso ágil, con pocas propuestas y archivos esenciales.' },
        media:    { name:'Paquete Medio',    eur:100, ars:170000,
          summary:'Pensado para proyectos con más opciones para elegir, algunas rondas de ajuste y archivos listos para editar.' },
        avanzada: { name:'Paquete Avanzado', eur:200, ars:340000,
          summary:'Para marcas que buscan una búsqueda creativa completa, con más propuestas, devoluciones y seguimiento cercano del proceso.' }
      },
      features: [
        { cat:'Claridad del brief', minima:{ok:true, text:'Partimos de tus referencias, sin armar un brief desde cero'}, media:{ok:true, text:'Te ayudamos a definir el brief paso a paso'}, avanzada:{ok:true, text:'Búsqueda creativa guiada de punta a punta'} },
        { cat:'Propuestas', minima:{ok:true, text:'1 a 3 propuestas de diseño'}, media:{ok:true, text:'3 a 6 propuestas de diseño'}, avanzada:{ok:true, text:'6 a 12 propuestas de diseño'} },
        { cat:'Devoluciones', minima:{ok:false, text:'Sin rondas de devoluciones incluidas'}, media:{ok:true, text:'1 a 3 rondas de devoluciones'}, avanzada:{ok:true, text:'3 a 6 rondas de devoluciones'} },
        { cat:'Archivos finales', minima:{ok:true, text:'Imagen lista para redes sociales'}, media:{ok:true, text:'Archivos editables (vectores/fuentes)'}, avanzada:{ok:true, text:'Editables + multimedia (animado, variantes)'} },
        { cat:'Tiempo de entrega', minima:{ok:true, text:'Entrega sin fecha comprometida'}, media:{ok:true, text:'Entrega con fecha comprometida'}, avanzada:{ok:true, text:'Entrega urgente / prioritaria'} },
        { cat:'Seguimiento', minima:{ok:false, text:'Sin seguimiento adicional'}, media:{ok:true, text:'Gestión y trato con proveedores'}, avanzada:{ok:true, text:'Chequeo y control de calidad del trabajo final'} }
      ],
      notes: []
    },

    /* ---------------------------------------------------------- WEB */
    web: {
      name: 'Cotizador de Diseño Web',
      cardLabel: 'Cotizador de Diseño Web',
      tagline: 'Respondé 6 preguntas y te recomendamos el tipo de web ideal para tu proyecto.',
      priceMode: 'single',
      tierOrder: ['basica','intermedia','avanzada'],
      questions: [
        { code:'Dominio', title:'¿Cuál es la situación actual con el dominio?', options:[
          { pts:1, text:'¿Qué es un dominio?' },
          { pts:2, text:'Ya tenemos dominio.' },
          { pts:3, text:'Ya tenemos dominio y hosting.' } ] },
        { code:'Tipo de página', title:'¿Qué tipo de página necesitan?', options:[
          { pts:1, text:'1 sección (landing).' },
          { pts:2, text:'Institucional, hasta 5 secciones.' },
          { pts:3, text:'Institucional + catálogo básico + sistema.' } ] },
        { code:'Contenido', title:'¿Con qué contenido cuentan para armar la web?', options:[
          { pts:1, text:'Tenemos todo el contenido necesario (textos, fotos, etc.).' },
          { pts:2, text:'Nos falta una parte, pero tenemos una idea y referencias claras.' },
          { pts:3, text:'Necesitamos que generen textos, imágenes, etc.' } ] },
        { code:'Mantenimiento', title:'¿Con qué frecuencia van a necesitar hacer cambios?', options:[
          { pts:1, text:'Es posible que no hagamos cambios en un año una vez subida.' },
          { pts:2, text:'Queremos cada tanto una actualización.' },
          { pts:3, text:'Queremos poder modificar precios constantemente.' } ] },
        { code:'Diseño', title:'¿Cómo está su marca hoy?', options:[
          { pts:1, text:'Tenemos claro el estilo.' },
          { pts:2, text:'Nos gustaría aprovechar y actualizar el branding.' },
          { pts:3, text:'Necesitamos actualizar y ampliar el alcance de la marca.' } ] },
        { code:'Extras', title:'¿Qué extras les gustaría sumar?', options:[
          { pts:1, text:'Sin extras.' },
          { pts:2, text:'Avisos promocionales: 1 a 6 imágenes extra.' },
          { pts:3, text:'6 a 12 imágenes o video promocional del uso de la web.' } ] }
      ],
      tiers: {
        basica:     { name:'Web Básica',     eur:250, ars:425000,
          summary:'Ideal para una landing simple con contenido ya definido y sin necesidad de mantenimiento frecuente.' },
        intermedia: { name:'Web Intermedia', eur:500, ars:850000,
          summary:'Pensada para sitios institucionales de varias secciones, con actualización de branding y cambios periódicos.' },
        avanzada:   { name:'Web Avanzada',   eur:750, ars:1275000,
          summary:'Para proyectos con catálogo o sistema, generación de contenido, marca ampliada y actualizaciones frecuentes.' }
      },
      features: [
        { cat:'Dominio', basica:{ok:true, text:'Te ayudamos a entender y elegir tu dominio'}, intermedia:{ok:true, text:'Configuramos tu dominio existente'}, avanzada:{ok:true, text:'Configuramos dominio y hosting existentes'} },
        { cat:'Tipo de página', basica:{ok:true, text:'1 sección (landing)'}, intermedia:{ok:true, text:'Institucional, hasta 5 secciones'}, avanzada:{ok:true, text:'Institucional + catálogo básico + sistema'} },
        { cat:'Contenido', basica:{ok:true, text:'Usamos el contenido que ya tienen'}, intermedia:{ok:true, text:'Completamos lo que falta con sus referencias'}, avanzada:{ok:true, text:'Generamos textos e imágenes a medida'} },
        { cat:'Mantenimiento', basica:{ok:false, text:'Sin actualizaciones incluidas tras la entrega'}, intermedia:{ok:true, text:'Actualizaciones periódicas'}, avanzada:{ok:true, text:'Cambios de precios/contenido constantes'} },
        { cat:'Diseño', basica:{ok:true, text:'Aplicamos el estilo actual de la marca'}, intermedia:{ok:true, text:'Actualizamos el branding existente'}, avanzada:{ok:true, text:'Ampliamos el alcance de la marca'} },
        { cat:'Extras', basica:{ok:false, text:'Sin extras incluidos'}, intermedia:{ok:true, text:'1 a 6 imágenes promocionales extra'}, avanzada:{ok:true, text:'6 a 12 imágenes o video promocional'} }
      ],
      notes: [
        { text:'Los gastos de dominio y alojamiento corren por cuenta del cliente.' },
        { text:'La página web está incluida sin cargo dentro de los planes de Suscripción.', actionLabel:'Ver planes de Suscripción', actionKey:'sub' }
      ]
    },

    /* ---------------------------------------------------------- SUSCRIPCIÓN */
    sub: {
      name: 'Cotizador de Suscripción',
      cardLabel: 'Cotizador de Suscripción',
      tagline: 'Respondé 6 preguntas y te recomendamos tu plan de suscripción ideal.',
      priceMode: 'monthly',
      tierOrder: ['basico','medio','superior'],
      questions: [
        { code:'Redes sociales', title:'¿Tienen cuenta activa de Instagram/Redes y qué nivel de publicación buscan realizar?', options:[
          { pts:1, text:'Sí/No. Queremos publicar poco (1 a 2 posteos estáticos o placas simples por semana).' },
          { pts:2, text:'Sí. Queremos movimiento constante (3 a 5 publicaciones semanales combinando posteos e historias).' },
          { pts:3, text:'Sí. Queremos presencia intensiva (publicaciones diarias, Reels editados, placas y dinamismo total).' } ] },
        { code:'Video y audio', title:'¿Necesitan producción de video (Reels/TikTok) y edición musical/audio?', options:[
          { pts:1, text:'No necesitamos videos ni edición de audio por el momento.' },
          { pts:2, text:'Sí, videos cortos simples y música de librería/tendencia (hasta 2 por semana).' },
          { pts:3, text:'Sí, edición de video compleja, guion audiovisual y musicalización/audio a medida.' } ] },
        { code:'Página web', title:'¿Cuál es la situación actual de su página web?', options:[
          { pts:1, text:'No tenemos, o solo necesitamos una presencia básica (Linktree, landing simple de 1 sección).' },
          { pts:2, text:'Tenemos o queremos un sitio institucional completo, o catálogo de productos/servicios.' },
          { pts:3, text:'Queremos un desarrollo más complejo (e-commerce completo, integraciones, plataforma a medida).' } ] },
        { code:'Aplicaciones de marca', title:'¿En cuántos soportes físicos/digitales aplica o imprime la marca su logo?', options:[
          { pts:1, text:'Pocos (solo foto de perfil, un par de impresos o tarjetas digitales).' },
          { pts:2, text:'Moderado (packaging, papelería, marquesinas, uniformes, placas digitales).' },
          { pts:3, text:'Muchos (submarcas, rotulación, eventos, stands, merchandising y piezas institucionales continuas).' } ] },
        { code:'Urgencias', title:'¿Con qué frecuencia surgen urgencias o pedidos "para ayer" en su empresa?', options:[
          { pts:1, text:'Casi nunca. Planificamos con tiempo y podemos esperar la entrega semanal.' },
          { pts:2, text:'A veces (hasta 2 urgencias semanales de un día para el otro).' },
          { pts:3, text:'Todo el tiempo. La empresa exige respuesta inmediata el mismo día o el hábil siguiente.' } ] },
        { code:'Consultoría', title:'¿Requieren acompañamiento estratégico, capacitaciones o reuniones de consultoría?', options:[
          { pts:1, text:'No, solo requerimos que nos entreguen los diseños solicitados.' },
          { pts:2, text:'Queremos que nos ayuden a armar y organizar el plan de publicación y piezas.' },
          { pts:3, text:'Sí: consultoría estratégica en proyectos externos, capacitaciones para el equipo y reuniones continuas.' } ] }
      ],
      tiers: {
        basico:   { name:'Plan Básico',   eur:200, ars:340000,  eurWeek:46,  arsWeek:78500,
          summary:'Ideal para proyectos que requieren un flujo constante pero planificado de piezas gráficas simples y mantenimiento básico.' },
        medio:    { name:'Plan Medio',    eur:400, ars:680000,  eurWeek:92,  arsWeek:157000,
          summary:'Pensado para marcas activas que necesitan producción de video corto, dinamismo en redes y resolución rápida de urgencias.' },
        superior: { name:'Plan Superior', eur:800, ars:1360000, eurWeek:185, arsWeek:314000,
          summary:'Solución integral para empresas que buscan acompañamiento estratégico, consultoría externa, urgencias ilimitadas y máxima prioridad.' }
      },
      features: [
        { cat:'Redes sociales', basico:{ok:true, text:'1 a 2 piezas gráficas por semana'}, medio:{ok:true, text:'3 a 5 publicaciones semanales (posteos + historias)'}, superior:{ok:true, text:'Publicación diaria + Reels editados'} },
        { cat:'Video y audio', basico:{ok:false, text:'No incluye producción de video'}, medio:{ok:true, text:'Videos cortos + música de tendencia (hasta 2/semana)'}, superior:{ok:true, text:'Edición compleja, guion audiovisual y música a medida'} },
        { cat:'Página web', basico:{ok:true, text:'Presencia básica (landing de 1 sección)'}, medio:{ok:true, text:'Sitio institucional completo o catálogo'}, superior:{ok:true, text:'Desarrollo a medida (e-commerce, integraciones)'} },
        { cat:'Aplicaciones de marca', basico:{ok:true, text:'Piezas básicas (perfil, impresos simples)'}, medio:{ok:true, text:'Packaging, papelería, uniformes, placas digitales'}, superior:{ok:true, text:'Submarcas, eventos, stands y merchandising'} },
        { cat:'Urgencias', basico:{ok:false, text:'Sin urgencias — entregas semanales planificadas'}, medio:{ok:true, text:'Hasta 2 urgencias semanales de un día para el otro'}, superior:{ok:true, text:'Urgencias ilimitadas, respuesta el mismo día'} },
        { cat:'Consultoría', basico:{ok:false, text:'Solo entrega de los diseños solicitados'}, medio:{ok:true, text:'Ayuda a organizar el plan de publicación'}, superior:{ok:true, text:'Consultoría estratégica, capacitaciones y reuniones continuas'} }
      ],
      notes: []
    }
  };

  function planFor(ds, score){
    if (score <= 10) return ds.tierOrder[0];
    if (score <= 14) return ds.tierOrder[1];
    return ds.tierOrder[2];
  }

  /* ============================================================
     ESTADO — un estado de quiz independiente por cotizador, así
     cambiar de pestaña no hace perder el progreso de las otras.
     ============================================================ */
  var STATES = {};
  Object.keys(DATASETS).forEach(function(key){
    STATES[key] = {
      current: 0,
      answers: new Array(DATASETS[key].questions.length).fill(null),
      view: 'quiz',        // 'quiz' | 'result' | 'detail' | 'compare'
      lastScore: 0,
      lastTierKey: null
    };
  });

  var ACTIVE = 'logo';

  /* ---------------- Referencias DOM (compartidas por los 3 cotizadores) ---------------- */
  var elProgress      = document.getElementById('progress');
  var elProgressLabel = document.getElementById('progressLabel');
  var elPanel         = document.getElementById('panel');
  var elBtnPrev       = document.getElementById('btnPrev');
  var elBtnNext       = document.getElementById('btnNext');
  var elCardLabel     = document.getElementById('cardLabel');
  var elHeroTagline   = document.getElementById('heroTagline');

  var viewQuiz    = document.getElementById('viewQuiz');
  var viewResult  = document.getElementById('viewResult');
  var viewDetail  = document.getElementById('viewDetail');
  var viewCompare = document.getElementById('viewCompare');
  var allViews = [viewQuiz, viewResult, viewDetail, viewCompare];

  function showOnly(target){
    allViews.forEach(function(v){ v.classList.add('hidden'); });
    target.classList.remove('hidden');
    target.classList.remove('fade-in');
    void target.offsetWidth;
    target.classList.add('fade-in');
  }

  /* ---------------- Detalle de respuestas para WhatsApp ---------------- */
  function answersBreakdown(ds, st){
    return ds.questions.map(function(q, i){
      var pts = st.answers[i];
      var opt = q.options.find(function(o){ return o.pts === pts; });
      return (i+1) + '. ' + q.code + ': ' + (opt ? opt.text : '(sin responder)');
    }).join('\n');
  }

  function priceLineFor(ds, tier){
    return ds.priceMode === 'monthly' ? (tier.eur + ' €/mes') : (tier.eur + ' € (pago único)');
  }

  function buildWaMessage(ds, st, intro){
    var tier = ds.tiers[st.lastTierKey];
    return intro + '\n\nResultado: ' + tier.name + ' — ' + priceLineFor(ds, tier) +
      ' (puntaje ' + st.lastScore + '/18).' +
      '\n\nEstas fueron mis respuestas:\n' + answersBreakdown(ds, st);
  }

  /* ============================================================
     QUIZ
     ============================================================ */
  function renderProgress(ds, st, popIndex){
    elProgress.innerHTML = '';
    for (var i=0; i<ds.questions.length; i++){
      var dot = document.createElement('div');
      dot.className = 'dot-step';
      var answered = st.answers[i] !== null;
      if (answered){
        dot.classList.add('filled');
        if (i === popIndex) dot.classList.add('pop');
      }
      if (i === st.current) dot.classList.add('current');
      elProgress.appendChild(dot);
    }
    elProgressLabel.textContent = 'Pregunta ' + (st.current+1) + ' de ' + ds.questions.length;
  }

  function panelHTML(ds, st, qIndex){
    var q = ds.questions[qIndex];
    var accent = ACCENT_CYCLE[qIndex];
    var html = '';
    html += '<div class="eyebrow" style="--accent:'+accent+'"><span class="dot"></span>' + q.code + '</div>';
    html += '<h2 class="q-title">' + q.title + '</h2>';
    html += '<div class="options" role="radiogroup" aria-label="'+q.title.replace(/"/g,'&quot;')+'">';
    q.options.forEach(function(opt,i){
      var id = ACTIVE+'_q'+qIndex+'_o'+i;
      var checked = st.answers[qIndex] === opt.pts ? 'checked' : '';
      var ptsLabel = opt.pts === 1 ? '1 PTO' : opt.pts + ' PTS';
      html += '<label class="option" for="'+id+'">' +
                '<input type="radio" id="'+id+'" name="'+ACTIVE+'_q'+qIndex+'" value="'+opt.pts+'" '+checked+'>' +
                '<span class="card-opt" style="--accent:'+accent+'">' +
                  '<span class="check" aria-hidden="true"></span>' +
                  '<span class="txt">'+opt.text+'</span>' +
                  '<span class="pts">'+ptsLabel+'</span>' +
                '</span>' +
              '</label>';
    });
    html += '</div>';
    return html;
  }

  function fillPanel(popIndex){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    elPanel.innerHTML = panelHTML(ds, st, st.current);
    renderProgress(ds, st, popIndex);
    bindOptionEvents();
    updateNav();
  }

  function renderPanel(dir, popIndex){
    if (dir){
      elPanel.classList.remove('enter');
      elPanel.classList.add(dir === 'next' ? 'leave-next' : 'leave-prev');
      window.setTimeout(function(){
        fillPanel(popIndex);
        elPanel.classList.remove('leave-next','leave-prev');
        void elPanel.offsetWidth;
        elPanel.classList.add('enter');
      }, 190);
    } else {
      fillPanel(popIndex);
    }
  }

  function bindOptionEvents(){
    var inputs = elPanel.querySelectorAll('input[type=radio]');
    inputs.forEach(function(inp){
      inp.addEventListener('change', function(){
        var st = STATES[ACTIVE];
        st.answers[st.current] = parseInt(inp.value, 10);
        renderProgress(DATASETS[ACTIVE], st, st.current);
        updateNav();
      });
    });
  }

  function updateNav(){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    elBtnPrev.disabled = st.current === 0;
    var answered = st.answers[st.current] !== null;
    elBtnNext.disabled = !answered;
    elBtnNext.textContent = (st.current === ds.questions.length - 1) ? 'Ver mi presupuesto' : 'Siguiente';
  }

  elBtnNext.addEventListener('click', function(){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    if (st.answers[st.current] === null) return;
    if (st.current === ds.questions.length - 1){
      showResult();
    } else {
      st.current++;
      renderPanel('next', null);
    }
  });
  elBtnPrev.addEventListener('click', function(){
    var st = STATES[ACTIVE];
    if (st.current === 0) return;
    st.current--;
    renderPanel('prev', null);
  });

  /* ============================================================
     RESULTADO
     ============================================================ */
  function renderNotes(ds){
    var el = document.getElementById('resultNotes');
    el.innerHTML = '';
    (ds.notes || []).forEach(function(n){
      var p = document.createElement('div');
      p.className = 'note-line';
      if (n.actionKey){
        p.innerHTML = n.text + ' <button type="button" class="note-link-btn" data-goto="'+n.actionKey+'">'+n.actionLabel+'</button>';
      } else {
        p.textContent = n.text;
      }
      el.appendChild(p);
    });
    el.querySelectorAll('[data-goto]').forEach(function(b){
      b.addEventListener('click', function(){ activateTab(b.dataset.goto); });
    });
  }

  function populateResult(){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    var tier = ds.tiers[st.lastTierKey];

    document.getElementById('resultPlanName').textContent = tier.name;

    var priceEurEl = document.getElementById('resultPriceEur');
    var priceArsEl = document.getElementById('resultPriceArs');
    var priceWeekEl = document.getElementById('resultPriceWeek');

    if (ds.priceMode === 'monthly'){
      priceEurEl.innerHTML = tier.eur + ' <span>€/mes</span>';
      priceArsEl.textContent = '$ ' + fmtInt(tier.ars) + ' ARS/mes';
      priceWeekEl.style.display = '';
      priceWeekEl.textContent = '≈ ' + tier.eurWeek + ' €/semana · $ ' + fmtInt(tier.arsWeek) + ' ARS/semana';
    } else {
      priceEurEl.innerHTML = tier.eur + ' <span>€ · pago único</span>';
      priceArsEl.textContent = '$ ' + fmtInt(tier.ars) + ' ARS';
      priceWeekEl.style.display = 'none';
    }

    document.getElementById('resultSummary').textContent = tier.summary;
    document.getElementById('resultScore').textContent = st.lastScore;
    renderNotes(ds);

    var msg = buildWaMessage(ds, st, 'Hola! Quiero una consulta detallada sobre el ' + ds.name + '.');
    document.getElementById('ctaWhatsapp').href = waLink(msg);
  }

  function showResult(){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    var total = st.answers.reduce(function(a,b){ return a + (b||0); }, 0);
    st.lastScore = total;
    st.lastTierKey = planFor(ds, total);
    st.view = 'result';
    populateResult();
    showOnly(viewResult);
  }

  /* ============================================================
     DETALLE DEL PLAN / PAQUETE
     ============================================================ */
  function populateDetail(){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    var tier = ds.tiers[st.lastTierKey];

    document.getElementById('detailPlanName').textContent = tier.name;
    document.getElementById('detailPrice').innerHTML =
      priceLineFor(ds, tier) + ' <span class="ars">· $ ' + fmtInt(tier.ars) + ' ARS' + (ds.priceMode==='monthly'?'/mes':'') + '</span>';

    var list = document.getElementById('featureList');
    list.innerHTML = '';
    ds.features.forEach(function(row){
      var cell = row[st.lastTierKey];
      var li = document.createElement('li');
      li.innerHTML =
        '<span class="f-icon '+(cell.ok?'yes':'no')+'">'+(cell.ok?iconYes:iconNo)+'</span>' +
        '<span class="f-body"><b>'+row.cat+'</b><span>'+cell.text+'</span></span>';
      list.appendChild(li);
    });

    var msg = buildWaMessage(ds, st, 'Hola! Quiero avanzar con el ' + tier.name + ' de ' + ds.name.replace('Cotizador de ','') + '.');
    document.getElementById('ctaWhatsapp2').href = waLink(msg);
  }

  function showDetail(){
    STATES[ACTIVE].view = 'detail';
    populateDetail();
    showOnly(viewDetail);
  }

  /* ============================================================
     COMPARAR
     ============================================================ */
  function populateCompare(){
    var ds = DATASETS[ACTIVE], st = STATES[ACTIVE];
    var order = ds.tierOrder;
    var recoKey = st.lastTierKey;

    var thead = '<thead><tr><th class="label"></th>';
    order.forEach(function(k){
      var t = ds.tiers[k];
      var isReco = k === recoKey;
      thead += '<th class="'+(isReco?'reco':'')+'">' +
                 (isReco ? '<span class="reco-badge">Recomendado</span><br>' : '') +
                 t.name +
                 '<span class="plan-price">'+priceLineFor(ds, t)+'</span>' +
               '</th>';
    });
    thead += '</tr></thead>';

    var tbody = '<tbody>';
    ds.features.forEach(function(row){
      tbody += '<tr><td class="label">'+row.cat+'</td>';
      order.forEach(function(k){
        var cell = row[k];
        var isReco = k === recoKey;
        tbody += '<td class="'+(isReco?'reco':'')+'"><span class="cell-inner">' +
                    '<span class="f-icon '+(cell.ok?'yes':'no')+'">'+(cell.ok?iconYes:iconNo)+'</span>' +
                    '<span>'+cell.text+'</span>' +
                  '</span></td>';
      });
      tbody += '</tr>';
    });
    tbody += '</tbody>';

    document.getElementById('compareTable').innerHTML = thead + tbody;

    var msg = buildWaMessage(ds, st, 'Hola! Quiero una consulta detallada para elegir mi opción en el ' + ds.name + '.');
    document.getElementById('ctaWhatsapp3').href = waLink(msg);
  }

  function showCompare(){
    STATES[ACTIVE].view = 'compare';
    populateCompare();
    showOnly(viewCompare);
  }

  function restart(){
    var ds = DATASETS[ACTIVE];
    var st = STATES[ACTIVE];
    st.current = 0;
    st.answers = new Array(ds.questions.length).fill(null);
    st.view = 'quiz';
    renderPanel(null, null);
    showOnly(viewQuiz);
  }

  document.getElementById('btnVerPlan').addEventListener('click', showDetail);
  document.getElementById('btnComparar').addEventListener('click', showCompare);
  document.getElementById('backFromDetail').addEventListener('click', function(){ STATES[ACTIVE].view='result'; showOnly(viewResult); });
  document.getElementById('backFromCompare').addEventListener('click', function(){ STATES[ACTIVE].view='result'; showOnly(viewResult); });
  document.getElementById('btnRestart').addEventListener('click', restart);

  /* ============================================================
     PESTAÑAS DE NAVEGACIÓN
     ============================================================ */
  function activateTab(key){
    ACTIVE = key;
    var ds = DATASETS[key], st = STATES[key];

    document.querySelectorAll('.nav-tab').forEach(function(b){
      b.classList.toggle('active', b.dataset.key === key);
    });
    elCardLabel.textContent = ds.cardLabel;
    elHeroTagline.textContent = ds.tagline;

    switch (st.view){
      case 'result':  populateResult();  showOnly(viewResult);  break;
      case 'detail':  populateDetail();  showOnly(viewDetail);  break;
      case 'compare': populateCompare(); showOnly(viewCompare); break;
      default:
        fillPanel(null);
        showOnly(viewQuiz);
    }
  }

  document.querySelectorAll('.nav-tab').forEach(function(b){
    b.addEventListener('click', function(){ activateTab(b.dataset.key); });
  });

  /* ---------------- Init ---------------- */
  activateTab('logo');

})();
