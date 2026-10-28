/**
 * NEKTAR BAMBÚ — lógica de la app (SPA de una sola página)
 * ---------------------------------------------------------
 * Estado global simple, sin frameworks, para que sea fácil
 * de editar y liviano para GitHub Pages.
 */

const state = {
  vista: "bienvenida",      // "bienvenida" | "pedido" | "info"
  infoItemId: null,         // id del ítem mostrado en la vista "info"
  infoGaleriaIndex: 0,
  audioId: null,            // producto cuyo audio está cargado en el reproductor
  origenInfoId: null,       // tarjeta desde la que se abrió la info (para volver a ella)
  filtroActivo: "todo",
  busqueda: "",
  carrito: {},              // { id: cantidad }
  ordenClicks: [],          // ids en orden de click más reciente primero
  envio: "retira",          // "gratis" | "encomienda" | "retira"
  pago: "bna",              // "bna" | "mercadopago" | "efectivo" | "tarjeta"
  mensajeEditado: null      // si el usuario edita el chat a mano, se respeta
};

const el = {
  interactive: document.getElementById("interactive"),
  grid: document.getElementById("grid"),
  filtersList: document.getElementById("filters-list"),
  cartCount: document.getElementById("cart-count"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  audioPlayer: document.getElementById("audio-player"),
  showroomTitle: document.getElementById("showroom-title"),
  showroomBody: document.getElementById("showroom-body")
};

/* ---------------- utilidades ---------------- */

function formatearPrecio(numero) {
  if (numero === null || numero === undefined) return "Consultar precio";
  return ".-$ " + numero.toLocaleString("es-AR");
}

// "Envíos gratis superando los $X": el monto tiene que ser MAYOR al mínimo
function superaEnvioGratis(monto) {
  return monto > CONFIG.envioGratisMinimo;
}

function montoCorto(n) {
  return "$" + n.toLocaleString("es-AR");
}

function precioLinea(p, cant) {
  return p.precio === null ? null : p.precio * cant;
}

function getProducto(id) {
  return PRODUCTOS.find(p => p.id === id);
}

function subtotalCarrito() {
  return Object.entries(state.carrito).reduce((acc, [id, cant]) => {
    const p = getProducto(id);
    return acc + (p ? p.precio * cant : 0);
  }, 0);
}

function cantidadTotalCarrito() {
  return Object.values(state.carrito).reduce((a, b) => a + b, 0);
}

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* ---------------- render: header (carrito) ---------------- */

function renderHeader() {
  const total = cantidadTotalCarrito();
  el.cartCount.hidden = total === 0;
  el.cartCount.textContent = total;
  el.cartSubtotal.textContent = formatearPrecio(subtotalCarrito());
}

/* ---------------- render: filtros ---------------- */

function renderFiltros() {
  el.filtersList.innerHTML = "";
  CONFIG.categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filtro-btn" + (state.filtroActivo === cat.id ? " activo" : "");
    btn.textContent = cat.nombre;
    btn.setAttribute("data-filtro", cat.id);
    btn.addEventListener("click", () => {
      state.filtroActivo = cat.id;
      renderFiltros();
      renderGrid();
    });
    el.filtersList.appendChild(btn);
  });
}

/* ---------------- render: grilla de productos ---------------- */

function productosFiltrados() {
  let lista = PRODUCTOS.slice();

  if (state.filtroActivo === "envio-gratis") {
    lista = lista.filter(p => superaEnvioGratis(p.precio));
  } else if (state.filtroActivo !== "todo") {
    lista = lista.filter(p => p.categoria === state.filtroActivo);
  }

  if (state.busqueda.trim()) {
    const q = normalizar(state.busqueda);
    lista = lista.filter(p => {
      const campo = normalizar([p.nombre, p.subtitulo, p.spec, p.descripcionBreve, p.descripcionLarga].join(" "));
      return campo.includes(q);
    });
  }

  // orden: primero por click más reciente (los seleccionados van al frente),
  // después los disponibles antes que los "sin stock", y dentro de cada
  // grupo se respeta el orden original de la lista (mismo en "Todo" y
  // dentro de cada categoría filtrada)
  lista.sort((a, b) => {
    const ai = state.ordenClicks.indexOf(a.id);
    const bi = state.ordenClicks.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    if (a.disponible !== b.disponible) return a.disponible ? -1 : 1;
    return a.orden - b.orden;
  });

  return lista;
}

function renderGrid() {
  const lista = productosFiltrados();
  el.grid.innerHTML = "";

  if (lista.length === 0) {
    const vacio = document.createElement("div");
    vacio.className = "grid-vacio";
    vacio.textContent = "No encontramos ítems para esa búsqueda o filtro.";
    el.grid.appendChild(vacio);
    return;
  }

  lista.forEach(p => {
    const cant = state.carrito[p.id] || 0;
    const card = document.createElement("div");
    card.className = "card"
      + (cant > 0 ? " seleccionado" : "")
      + (state.vista === "info" && state.infoItemId === p.id ? " activo" : "");
    card.setAttribute("role", "listitem");
    card.setAttribute("data-id", p.id);

    card.innerHTML = `
      <div class="card-top">
        <div>
          <p class="card-titulo">${p.nombre}${p.subtitulo ? `<span class="card-subtitulo">${p.subtitulo}</span>` : ""}</p>
        </div>
        <button class="card-info-btn" data-info="${p.id}" aria-label="Ver información de ${p.nombre}">i</button>
      </div>
      ${superaEnvioGratis(p.precio) ? `
        <div class="card-badges">
          <span class="card-envio-gratis">Envío gratis</span>
        </div>
      ` : ""}
      <div class="card-imagen"><img src="${p.imagen}" alt="${p.nombre} ${p.subtitulo}" loading="lazy"></div>
      <p class="card-spec">${p.spec}</p>
      <p class="card-desc">${p.descripcionBreve}</p>
      <div class="card-footer">
        ${p.disponible ? (cant > 0 ? `
          <div class="card-qty">
            <button class="qty-btn" data-qty-menos="${p.id}" aria-label="Quitar uno">−</button>
            <span>${cant}</span>
            <button class="qty-btn" data-qty-mas="${p.id}" aria-label="Sumar uno">+</button>
          </div>
        ` : `
          <button class="btn-agregar" data-agregar="${p.id}">Agregar al carrito</button>
        `) : `
          <span class="card-sin-stock">SIN STOCK</span>
        `}
        <span class="card-precio">${formatearPrecio(p.precio)}</span>
      </div>
    `;

    // click en la tarjeta: solo muestra la info, nunca agrega al carrito
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-info], [data-qty-mas], [data-qty-menos], [data-agregar]")) return;
      abrirInfo(p.id);
    });

    el.grid.appendChild(card);
  });

  el.grid.querySelectorAll("[data-agregar]").forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    agregarYAbrirCarrito(b.getAttribute("data-agregar"));
  }));
  el.grid.querySelectorAll("[data-qty-mas]").forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    sumarUno(b.getAttribute("data-qty-mas"));
  }));
  el.grid.querySelectorAll("[data-qty-menos]").forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    restarUno(b.getAttribute("data-qty-menos"));
  }));
  el.grid.querySelectorAll("[data-info]").forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirInfo(b.getAttribute("data-info"));
  }));
}

/* ---------------- acciones de carrito ---------------- */

function registrarClick(id) {
  state.ordenClicks = state.ordenClicks.filter(x => x !== id);
  state.ordenClicks.unshift(id);
}

// sube suavemente hasta la zona interactiva (arriba del todo)
function irAZonaInteractiva() {
  if (!el.interactive.scrollIntoView) return;
  const reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.interactive.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
}

// vuelve a mostrar la tarjeta donde estaba la persona, para que no pierda su lugar en la grilla
function volverALaTarjeta(id) {
  const card = id && el.grid.querySelector(`[data-id="${id}"]`);
  if (!card || !card.scrollIntoView) return;
  const reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  card.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "center" });
}

// botón verde "Agregar al carrito" (tarjeta o info): suma una unidad y abre el carrito
function agregarYAbrirCarrito(id) {
  const p = getProducto(id);
  if (!p || !p.disponible) return;
  state.carrito[id] = (state.carrito[id] || 0) + 1;
  registrarClick(id);
  state.mensajeEditado = null;
  state.infoItemId = null;
  state.vista = "pedido";
  el.audioPlayer.pause();
  render();
  irAZonaInteractiva();
}

// + / − : solo ajustan la cantidad de lo que ya está en el pedido, no cambian de vista
function sumarUno(id) {
  state.carrito[id] = (state.carrito[id] || 0) + 1;
  registrarClick(id);
  state.mensajeEditado = null;
  render();
}

function restarUno(id) {
  if (!state.carrito[id]) return;
  state.carrito[id] -= 1;
  if (state.carrito[id] <= 0) {
    delete state.carrito[id];
    state.ordenClicks = state.ordenClicks.filter(x => x !== id);
  }
  state.mensajeEditado = null;
  render();
}

/* ---------------- vista: info ---------------- */

// click en la tarjeta o en la "i": sube y muestra la info, sin tocar el pedido
function abrirInfo(id) {
  state.infoItemId = id;
  state.origenInfoId = id;
  state.infoGaleriaIndex = 0;
  state.vista = "info";
  render();
  irAZonaInteractiva();
}

function cerrarInfo() {
  const origen = state.origenInfoId;
  state.infoItemId = null;
  state.vista = "bienvenida";
  el.audioPlayer.pause();
  render();
  volverALaTarjeta(origen);
}

function reproducirAudio(producto) {
  if (!producto || !producto.audio) return;
  const mismo = state.audioId === producto.id;
  if (mismo && !el.audioPlayer.paused) { el.audioPlayer.pause(); return; }
  if (!mismo) {
    el.audioPlayer.src = producto.audio;
    state.audioId = producto.id;
  }
  el.audioPlayer.play().catch(() => {});
}

// frena el audio y lo deja listo para arrancar de cero la próxima vez
function detenerAudio() {
  if (state.audioId === null && el.audioPlayer.paused) return;
  el.audioPlayer.pause();
  state.audioId = null;
}

// refleja en el botón de la info si está sonando, y el avance
function actualizarAudioUI() {
  const delProducto = state.audioId !== null && state.audioId === state.infoItemId;
  const sonando = delProducto && !el.audioPlayer.paused;
  const btn = document.getElementById("info-audio-btn");
  if (btn) {
    btn.textContent = sonando ? "❚❚" : "▶";
    btn.setAttribute("aria-label", sonando ? "Pausar audio" : "Reproducir audio");
  }
  const texto = document.getElementById("info-audio-texto");
  if (texto) texto.textContent = sonando ? "Pausar" : "Escuchar";
  const barra = document.getElementById("info-audio-progreso");
  if (barra) {
    const d = el.audioPlayer.duration;
    barra.style.width = (delProducto && d) ? Math.min(100, el.audioPlayer.currentTime / d * 100) + "%" : "0%";
  }
}

["play", "pause", "timeupdate", "loadedmetadata"].forEach(ev => el.audioPlayer.addEventListener(ev, actualizarAudioUI));
el.audioPlayer.addEventListener("ended", () => { state.audioId = null; actualizarAudioUI(); });

/* ---------------- armado del mensaje de WhatsApp ---------------- */

function textoEnvio() {
  if (state.envio === "gratis") return "Envío gratis en CABA y GBA";
  if (state.envio === "encomienda") return "Encomienda al interior";
  return "Retiro en Showroom en Floresta CABA";
}

function textoPago() {
  if (state.pago === "bna") return "pago con BNA+";
  if (state.pago === "mercadopago") return "pago con Mercado Pago";
  if (state.pago === "tarjeta") return "pago con tarjeta y cuotas";
  return "pago en transferencia o efectivo";
}

function armarMensaje() {
  const items = Object.entries(state.carrito).map(([id, cant]) => {
    const p = getProducto(id);
    return `${cant} ${p.nombre}${p.subtitulo ? " " + p.subtitulo : ""} (${formatearPrecio(precioLinea(p, cant))})`;
  });
  if (items.length === 0) return "Hola, quiero hacer una consulta sobre sus productos.";
  return `Hola, quiero ${items.join(" y ")}. ${textoEnvio()}, ${textoPago()}.`;
}

function mensajeActual() {
  return state.mensajeEditado !== null ? state.mensajeEditado : armarMensaje();
}

function enviarWhatsapp() {
  const texto = encodeURIComponent(mensajeActual());
  window.open(`https://wa.me/${CONFIG.whatsappNumero}?text=${texto}`, "_blank", "noopener");
}

/* ---------------- render del módulo interactivo ---------------- */

function render() {
  renderHeader();
  renderGrid();

  if (!(state.vista === "info" && state.infoItemId)) detenerAudio();

  if (state.vista === "info" && state.infoItemId) {
    renderInfo();
  } else if (state.vista === "pedido") {
    renderPedido();
  } else {
    renderBienvenida();
  }
}

function renderBienvenida() {
  el.interactive.innerHTML = `
    <div class="interactive-inner bienvenida">
      <div>
        <h1>Nektar Bambú, la tienda de instrumentos musicales, luminarias y artesanías.</h1>
        <p>Para ampliar información hacé click sobre el ítem. Podés agregar varios al carrito y modificar cantidades para hacer tu pedido por WhatsApp directo con nosotros.</p>
        <p class="bienvenida-envio">Envíos Gratis superando los ${montoCorto(CONFIG.envioGratisMinimo)}</p>
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.6" y2="16.6"/></svg>
          <input type="search" id="buscador" placeholder="¿Qué estás buscando?" value="${state.busqueda}">
        </div>
      </div>
      <div class="bienvenida-badge"><img src="assets/logo/badge.svg" alt="Isotipo Nektar Bambú"></div>
    </div>
  `;
  const input = document.getElementById("buscador");
  input.addEventListener("input", (e) => {
    state.busqueda = e.target.value;
    renderGrid();
  });
}

function renderPedido() {
  const items = Object.entries(state.carrito);
  const subtotal = subtotalCarrito();
  const gratis = superaEnvioGratis(subtotal);
  // si el pedido bajó del mínimo, deja de valer la opción de envío gratis
  if (state.envio === "gratis" && !gratis) { state.envio = "retira"; state.mensajeEditado = null; }

  el.interactive.innerHTML = `
    <div class="interactive-inner pedido">
      <div class="pedido-panel">
        <h2>Tu pedido</h2>
        ${items.length === 0 ? `<p class="pedido-vacio">Todavía no agregaste ítems. Elegí algo del catálogo de abajo.</p>` : `
          <ul class="pedido-lista">
            ${items.map(([id, cant]) => {
              const p = getProducto(id);
              return `<li>
                <span>${cant} ${p.nombre}${p.subtitulo ? " " + p.subtitulo : ""}</span>
                <span class="item-qty-controls">
                  <button class="qty-btn" data-ped-menos="${id}" aria-label="Quitar uno">−</button>
                  ${formatearPrecio(precioLinea(p, cant))}
                  <button class="qty-btn" data-ped-mas="${id}" aria-label="Agregar uno">+</button>
                </span>
              </li>`;
            }).join("")}
          </ul>
        `}

        <div class="opciones-grupo">
          <p class="opciones-grupo-titulo">Opciones de envío</p>
          <label class="opcion-radio">
            <input type="radio" name="envio" value="gratis" ${state.envio === "gratis" ? "checked" : ""} ${gratis ? "" : "disabled"}>
            <span class="opcion-texto">Gratis en CABA y GBA<br><small>superando los ${montoCorto(CONFIG.envioGratisMinimo)}</small></span>
          </label>
          <label class="opcion-radio">
            <input type="radio" name="envio" value="encomienda" ${state.envio === "encomienda" ? "checked" : ""}>
            <span class="opcion-texto">Encomienda al interior<br><small>cambia el importe final</small></span>
          </label>
          <label class="opcion-radio">
            <input type="radio" name="envio" value="retira" ${state.envio === "retira" ? "checked" : ""}>
            <span class="opcion-texto">Retira en showroom</span>
          </label>
        </div>

        <div class="opciones-grupo">
          <p class="opciones-grupo-titulo">Opciones de pago</p>
          <label class="opcion-radio">
            <input type="radio" name="pago" value="bna" ${state.pago === "bna" ? "checked" : ""}>
            <span class="opcion-texto">BNA+ (recomendado)</span>
          </label>
          <label class="opcion-radio">
            <input type="radio" name="pago" value="mercadopago" ${state.pago === "mercadopago" ? "checked" : ""}>
            <span class="opcion-texto">Mercado Pago<br><small>todas las tarjetas y dinero en cuenta</small></span>
          </label>
          <label class="opcion-radio">
            <input type="radio" name="pago" value="efectivo" ${state.pago === "efectivo" ? "checked" : ""}>
            <span class="opcion-texto">Efectivo o transferencia</span>
          </label>
          <label class="opcion-radio">
            <input type="radio" name="pago" value="tarjeta" ${state.pago === "tarjeta" ? "checked" : ""}>
            <span class="opcion-texto">Tarjeta y cuotas<br><small>cambia el importe final</small></span>
          </label>
        </div>

        ${items.length > 0 ? `
          <div class="envio-gratis-aviso ${gratis ? "cumplido" : ""}">
            ${gratis
              ? "Llegaste al envío gratis en CABA y GBA."
              : `Sumá más de ${formatearPrecio(CONFIG.envioGratisMinimo - subtotal)} para el envío gratis en CABA y GBA.`}
          </div>
        ` : ""}

        <div class="pedido-subtotal"><span>Subtotal</span><span>${formatearPrecio(subtotal)}</span></div>
      </div>

      <div class="chat-panel">
        <h2>Mensaje para WhatsApp</h2>
        <textarea class="chat-textarea" id="chat-texto">${mensajeActual()}</textarea>
        <button class="enviar-btn" id="btn-enviar" aria-label="Enviar por WhatsApp">
          <img src="assets/logo/icono-enviar.svg" alt="">
        </button>
      </div>
    </div>
  `;

  document.getElementById("chat-texto").addEventListener("input", (e) => {
    state.mensajeEditado = e.target.value;
  });
  document.getElementById("btn-enviar").addEventListener("click", enviarWhatsapp);

  el.interactive.querySelectorAll("[data-ped-mas]").forEach(b => b.addEventListener("click", () => sumarUno(b.getAttribute("data-ped-mas"))));
  el.interactive.querySelectorAll("[data-ped-menos]").forEach(b => b.addEventListener("click", () => restarUno(b.getAttribute("data-ped-menos"))));

  el.interactive.querySelectorAll('input[name="envio"]').forEach(r => r.addEventListener("change", (e) => {
    state.envio = e.target.value;
    state.mensajeEditado = null;
    renderPedido();
  }));
  el.interactive.querySelectorAll('input[name="pago"]').forEach(r => r.addEventListener("change", (e) => {
    state.pago = e.target.value;
    state.mensajeEditado = null;
    renderPedido();
  }));
}

function parrafos(texto) {
  return texto
    .split("\n\n")
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function renderInfo() {
  const p = getProducto(state.infoItemId);
  if (!p) { cerrarInfo(); return; }
  if (state.audioId !== null && state.audioId !== p.id) detenerAudio();

  el.interactive.innerHTML = `
    <div class="interactive-inner info-detalle">
      <div class="info-galeria">
        ${p.galeria.length > 1 ? `<button class="info-galeria-nav prev" aria-label="Anterior">‹</button>` : ""}
        <img src="${p.galeria[state.infoGaleriaIndex]}" alt="${p.nombre} ${p.subtitulo}">
        ${p.galeria.length > 1 ? `<button class="info-galeria-nav next" aria-label="Siguiente">›</button>` : ""}
        ${p.galeria.length > 1 ? `
          <div class="info-galeria-dots">
            ${p.galeria.map((_, i) => `<span class="${i === state.infoGaleriaIndex ? "activo" : ""}"></span>`).join("")}
          </div>` : ""}
      </div>
      <div class="info-contenido">
        <h2>${p.nombre}${p.subtitulo ? " · " + p.subtitulo : ""}</h2>
        <p class="info-spec">${p.spec}</p>
        <p class="info-precio">${formatearPrecio(p.precio)}</p>
        ${p.disponible ? `
          <button class="btn-agregar btn-agregar-grande" id="btn-agregar-info">Agregar al carrito</button>
          ${(state.carrito[p.id] || 0) > 0 ? `<p class="info-en-pedido">Ya tenés ${state.carrito[p.id]} en tu pedido</p>` : ""}
        ` : `<p class="info-sin-stock">SIN STOCK</p>`}
        ${parrafos(p.descripcionLarga)}
        ${p.audio ? `
          <div class="info-audio">
            <button id="info-audio-btn" aria-label="Reproducir audio">▶</button>
            <span id="info-audio-texto">Escuchar</span>
            <div class="info-audio-barra"><span id="info-audio-progreso"></span></div>
          </div>` : ""}
        <button class="info-cerrar" id="btn-cerrar-info">Volver</button>
      </div>
    </div>
  `;

  // precarga la foto siguiente del carrusel para que el cambio no parpadee
  if (p.galeria.length > 1) {
    new Image().src = p.galeria[(state.infoGaleriaIndex + 1) % p.galeria.length];
  }

  document.getElementById("btn-cerrar-info").addEventListener("click", cerrarInfo);
  const btnAgregar = document.getElementById("btn-agregar-info");
  if (btnAgregar) btnAgregar.addEventListener("click", () => agregarYAbrirCarrito(p.id));

  const prev = el.interactive.querySelector(".info-galeria-nav.prev");
  const next = el.interactive.querySelector(".info-galeria-nav.next");
  if (prev) prev.addEventListener("click", () => {
    state.infoGaleriaIndex = (state.infoGaleriaIndex - 1 + p.galeria.length) % p.galeria.length;
    renderInfo();
  });
  if (next) next.addEventListener("click", () => {
    state.infoGaleriaIndex = (state.infoGaleriaIndex + 1) % p.galeria.length;
    renderInfo();
  });

  const audioBtn = document.getElementById("info-audio-btn");
  if (audioBtn) audioBtn.addEventListener("click", () => reproducirAudio(p));
  actualizarAudioUI();
}

/* ---------------- texto informativo (módulo 4) y footer ---------------- */

function renderTextoYFooter() {
  el.showroomTitle.textContent = CONFIG.showroom;

  const g = CONFIG.guia;
  el.showroomBody.innerHTML = `
    <h3 class="guia-titulo">${g.titulo}</h3>
    ${g.secciones.map(sec => `
      <section class="guia-seccion">
        <h4>${sec.titulo}</h4>
        <ul>${sec.items.map(t => `<li>${t}</li>`).join("")}</ul>
      </section>
    `).join("")}
  `;

  document.getElementById("footer-whatsapp").href = `https://wa.me/${CONFIG.whatsappNumero}`;
  document.getElementById("footer-instagram").href = CONFIG.redes.instagram;
  document.getElementById("footer-youtube").href = CONFIG.redes.youtube;
  document.getElementById("footer-maps").href = CONFIG.redes.maps;
}

/* ---------------- header: logo y carrito ---------------- */

document.querySelector('[data-action="go-home"]').addEventListener("click", (e) => {
  e.preventDefault();
  state.vista = "bienvenida";
  state.infoItemId = null;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector('[data-action="open-pedido"]').addEventListener("click", () => {
  state.vista = "pedido";
  state.infoItemId = null;
  render();
  irAZonaInteractiva();
});

/* ---------------- init ---------------- */

renderFiltros();
renderTextoYFooter();
render();
