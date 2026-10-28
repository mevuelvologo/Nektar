/**
 * DATOS DE PRODUCTOS — NEKTAR BAMBÚ
 * ----------------------------------------------------
 * Este archivo es el único lugar que hay que editar para
 * cargar, sacar o modificar productos. No hace falta tocar
 * app.js ni styles.css para actualizar el catálogo.
 *
 * Catálogo completo con textos y precios reales provistos por
 * el cliente (texto final, versión 2). Todavía faltan fotos y
 * audios propios: imagen usa un placeholder genérico por
 * categoría hasta que lleguen.
 *
 * Cambios acordados sobre la lista original:
 * - Se sacó "Maraca" (ítem 12) y en su lugar va "Baquetas Grandes",
 *   haciendo pareja con "Baquetas Chicas".
 * - "Fungiball" se recategorizó de Artesanías a Instrumentos
 *   (es un shaker de percusión, no una artesanía decorativa).
 *
 * Campos:
 *  id                 identificador único (string, sin espacios)
 *  categoria          "instrumentos" | "artesanias" | "luminarias"
 *  orden              posición en la lista original completa (1-43, global)
 *  nombre             nombre base del producto
 *  subtitulo          variante o característica, "" si no aplica
 *  precio             número entero en pesos (todos los ítems tienen precio real)
 *  spec               línea corta bajo el nombre
 *  descripcionBreve   50–80 caracteres aprox, para la tarjeta de la grilla
 *  descripcionLarga   texto completo para la zona de información (admite
 *                     párrafos separados por líneas en blanco)
 *  disponible         false si está marcado "sin stock"
 *  imagen             ruta a la foto de producto (genérica por ahora)
 *  galeria            array de imágenes para el carrusel de información
 *  audio              ruta a mp3 corto, o null si todavía no hay
 */

const PRECIO_EJEMPLO = 25000; // red de contención: no se usa hoy, todos los ítems tienen precio real

const PLACEHOLDER = {
  instrumento: "assets/placeholder/generico-instrumento.svg",
  artesania: "assets/placeholder/generico-artesania.svg",
  luminaria: "assets/placeholder/generico-luminaria.svg"
};

// ids de los productos que ya tienen foto real cargada en assets/productos/
// (miniatura en assets/productos/thumb/<id>.webp y versión grande en
// assets/productos/<id>.webp). Los que no estén en esta lista usan el
// placeholder genérico de su categoría, así el sitio nunca queda con imágenes rotas.
const CON_FOTO = ["didgeridoo-liso", "tambor-trueno-mediano", "tambor-oceanico-mediano", "ovni-drum-mini", "bongo-bambu-2-tonos", "guiro-mediano", "baquetas-chicas", "mate-liso-bombilla", "palo-lluvia", "flautone", "kass-kash-asalato", "baquetas-grandes", "ektar", "doble-percu", "fanal", "luminaria", "matofono", "pucuy", "didgeridoo-pirograbado", "didgeridoo-tallado", "tambor-trueno-chico", "tambor-trueno-grande", "tambor-oceanico-chico", "tambor-oceanico-grande", "ovni-drum-chico", "ovni-drum-clasico", "ovni-drum-grande", "bongo-bambu-3-tonos", "bongo-bambu-lineas", "guiro-chico", "guiro-grande", "palo-lluvia-grande", "mate-pirograbado-bombilla", "mate-tallado-bombilla", "fungiball", "cascabelero", "shaker", "caxixi", "luminaria-chica", "luminaria-grande", "pajarito", "llamador-angeles", "llamador-angeles-chico"];

// cuántas fotos secundarias tiene cada producto en assets/productos/galeria/<id>-1.webp, <id>-2.webp, ...
// (la galería de la ficha muestra primero la foto principal y después estas)
const GALERIA_EXTRA = {"baquetas-chicas": 3, "baquetas-grandes": 3, "bongo-bambu-2-tonos": 3, "bongo-bambu-3-tonos": 3, "bongo-bambu-lineas": 1, "cascabelero": 4, "caxixi": 3, "didgeridoo-liso": 4, "didgeridoo-pirograbado": 6, "didgeridoo-tallado": 5, "doble-percu": 2, "ektar": 3, "fanal": 2, "flautone": 2, "fungiball": 2, "guiro-chico": 1, "guiro-grande": 1, "guiro-mediano": 1, "kass-kash-asalato": 3, "llamador-angeles": 2, "llamador-angeles-chico": 1, "luminaria": 3, "luminaria-chica": 3, "luminaria-grande": 3, "mate-liso-bombilla": 1, "mate-pirograbado-bombilla": 2, "mate-tallado-bombilla": 6, "matofono": 2, "ovni-drum-chico": 8, "ovni-drum-clasico": 13, "ovni-drum-grande": 4, "ovni-drum-mini": 10, "pajarito": 2, "palo-lluvia": 2, "palo-lluvia-grande": 2, "pucuy": 1, "shaker": 4, "tambor-oceanico-chico": 4, "tambor-oceanico-grande": 4, "tambor-oceanico-mediano": 4, "tambor-trueno-chico": 1, "tambor-trueno-grande": 1, "tambor-trueno-mediano": 1};

// audio corto de cada producto (id -> archivo en assets/audio/). Las variantes que comparten
// el mismo sonido (chico/mediano/grande) apuntan al mismo archivo.
const AUDIO_DE = {"bongo-bambu-2-tonos": "assets/audio/bongo-bambu-2-tonos.m4a", "bongo-bambu-3-tonos": "assets/audio/bongo-bambu-3-tonos.m4a", "bongo-bambu-lineas": "assets/audio/bongo-bambu-lineas.m4a", "cascabelero": "assets/audio/cascabelero.m4a", "caxixi": "assets/audio/caxixi.m4a", "didgeridoo-liso": "assets/audio/didgeridoo-liso.m4a", "didgeridoo-pirograbado": "assets/audio/didgeridoo-pirograbado.m4a", "didgeridoo-tallado": "assets/audio/didgeridoo-pirograbado.m4a", "doble-percu": "assets/audio/doble-percu.m4a", "ektar": "assets/audio/ektar.m4a", "flautone": "assets/audio/flautone.m4a", "fungiball": "assets/audio/fungiball.m4a", "guiro-chico": "assets/audio/guiro-mediano.m4a", "guiro-grande": "assets/audio/guiro-mediano.m4a", "guiro-mediano": "assets/audio/guiro-mediano.m4a", "kass-kash-asalato": "assets/audio/kass-kash-asalato.m4a", "llamador-angeles": "assets/audio/llamador-angeles.m4a", "llamador-angeles-chico": "assets/audio/llamador-angeles.m4a", "matofono": "assets/audio/matofono.m4a", "ovni-drum-chico": "assets/audio/ovni-drum-chico.m4a", "ovni-drum-clasico": "assets/audio/ovni-drum-clasico.m4a", "ovni-drum-grande": "assets/audio/ovni-drum-grande.m4a", "ovni-drum-mini": "assets/audio/ovni-drum-mini.m4a", "pajarito": "assets/audio/pajarito.m4a", "palo-lluvia": "assets/audio/palo-lluvia.m4a", "palo-lluvia-grande": "assets/audio/palo-lluvia.m4a", "pucuy": "assets/audio/pucuy.m4a", "shaker": "assets/audio/shaker.m4a", "tambor-oceanico-chico": "assets/audio/tambor-oceanico-chico.m4a", "tambor-oceanico-grande": "assets/audio/tambor-oceanico-mediano.m4a", "tambor-oceanico-mediano": "assets/audio/tambor-oceanico-mediano.m4a", "tambor-trueno-chico": "assets/audio/tambor-trueno-mediano.m4a", "tambor-trueno-grande": "assets/audio/tambor-trueno-mediano.m4a", "tambor-trueno-mediano": "assets/audio/tambor-trueno-mediano.m4a"};

function item(o) {
  const base = Object.assign({
    subtitulo: "",
    precio: PRECIO_EJEMPLO,
    descripcionBreve: "Descripción breve pendiente de cargar.",
    descripcionLarga: "Texto de ejemplo: descripción extendida pendiente, a completar con la información real del producto.",
    disponible: true,
    galeria: null,
    audio: null
  }, o);
  const placeholder = PLACEHOLDER[base.categoria === "instrumentos" ? "instrumento" : base.categoria === "luminarias" ? "luminaria" : "artesania"];
  const tieneFoto = CON_FOTO.includes(base.id);
  base.imagen = base.imagen || (tieneFoto ? `assets/productos/thumb/${base.id}.webp` : placeholder);
  base.audio = base.audio || AUDIO_DE[base.id] || null;
  const extras = tieneFoto ? (GALERIA_EXTRA[base.id] || 0) : 0;
  base.galeria = base.galeria || (tieneFoto
    ? [`assets/productos/${base.id}.webp`, ...Array.from({ length: extras }, (_, i) => `assets/productos/galeria/${base.id}-${i + 1}.webp`)]
    : [placeholder]);
  return base;
}

const PRODUCTOS = [

  item({
    id: "didgeridoo-liso", categoria: "instrumentos", orden: 1,
    nombre: "Didgeridoo", subtitulo: "Liso",
    precio: 60000, spec: "Viento · 100% bambú",
    descripcionBreve: "Instrumento de viento ancestral australiano. Incluye funda de transporte.",
    descripcionLarga: `Didgeridoo de bambú, acabado liso flameado (Yidaki): conexión ancestral, vibración profunda y terapia sonora.

Confeccionado artesanalmente en cañas de bambú seleccionadas, destaca por su acabado liso en tonos naturales que resalta las vetas orgánicas del material. Originario de los aborígenes australianos bajo el nombre de Yidaki, es un aerófono sagrado que produce frecuencias graves cercanas al infrasonido.

Su vibración sostenida mediante la técnica de respiración circular favorece la vasodilatación, la relajación muscular y estados profundos de meditación, siendo ideal tanto para la interpretación musical como para baños de sonido y musicoterapia.

Material: distintas especies de bambú natural. Afinación según longitud (a mayor largo, más grave). Incluye funda reforzada de transporte e instructivo con técnicas y ejercicios.`,
  }),

  item({
    id: "tambor-trueno-mediano", categoria: "instrumentos", orden: 2,
    nombre: "Tambor de Trueno", subtitulo: "Mediano",
    precio: 40000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Recrea el rugido de la tormenta: truenos, viento y ráfagas.",
    descripcionLarga: `Tambor de Trueno (Thunder Drum): el poder de la tormenta en un instrumento de percusión.

Diseñado como instrumento de efectos acústicos, recrea fielmente el rugido de los truenos, la intensidad del viento y tempestades, con excelente volumen y gran resonancia. Ideal para ambientaciones sonoras, teatro, musicalización, meditación y terapia de sonido.

Material: bambú seleccionado con acabado flameado. Medidas aproximadas: 13 a 16 cm de alto x 8 a 10 cm de diámetro.`,
  }),

  item({
    id: "tambor-oceanico-mediano", categoria: "instrumentos", orden: 3,
    nombre: "Tambor Oceánico", subtitulo: "Mediano",
    precio: 200000, spec: "Percusión · Madera y cuero",
    descripcionBreve: "Recrea el sonido del mar con suaves movimientos circulares.",
    descripcionLarga: `Tambor Oceánico (Ocean Drum), tamaño clásico de 45 cm: el sonido envolvente del mar en tus manos.

Confeccionado con aro de madera seleccionada y parches de cuero, este tambor originario de Nepal recrea con fidelidad el vaivén y la calma de las olas del mar. Su diámetro clásico ofrece el equilibrio exacto entre volumen, portabilidad y profundidad tímbrica.

Al realizar suaves movimientos circulares libera una corriente sonora continua que induce a una relajación profunda e instantánea: ideal para meditación, baños de sonido, yoga, musicoterapia, teatro y narraciones. Puede percutirse de forma tradicional gracias a la baqueta incluida.

Terminación pintada a mano con motivos decorativos o acabado liso.`,
  }),

  item({
    id: "ovni-drum-mini", categoria: "instrumentos", orden: 4,
    nombre: "OVNI Drum", subtitulo: "Mini · 7 notas",
    precio: 200000, spec: "Percusión melódica · Metal",
    descripcionBreve: "Percusión melódica de lengüetas metálicas, la versión más portátil.",
    descripcionLarga: `OVNI Drum Mini – 7 notas (Steel Tongue Drum): portabilidad total, brillo armónico y la opción más accesible.

Es la versión más pequeña, ligera y económica de la familia de percusión melódica: cabe cómodamente en cualquier bolso o mochila sin resignar calidad sonora. Por sus dimensiones compactas presenta la afinación más aguda y brillante de toda la línea, con notas cristalinas y sustain dulce.

Se toca con las baquetas de goma incluidas o directamente con los dedos y las manos; su forma de tocarlo es completamente intuitiva, sin necesitar conocimientos musicales previos. Ideal para meditación personal, reiki, pausas conscientes y viajes.

Medidas: 16 cm de diámetro x 11 cm de alto. Peso aprox.: 850 g. Incluye funda a medida, par de baquetas de goma y manual. Podés encargar tu pedido personalizado eligiendo escala musical y color.`,
  }),

  item({
    id: "bongo-bambu-2-tonos", categoria: "instrumentos", orden: 5,
    nombre: "Bongó de Bambú", subtitulo: "2 tonos",
    precio: 45000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Tambor de hendidura precolombino, produce distintos tonos al golpear.",
    descripcionLarga: `El Bongó de Bambú (Teponaztli, tunkul en México o tun en Guatemala y El Salvador) es un tambor de hendidura (lengüetas) de origen mesoamericano precolombino, utilizado por aztecas, mayas y culturas relacionadas.

Consiste en una pieza de bambú como cámara de resonancia, con dos aberturas en su parte superior cortadas en forma de "H" o "U". Las lengüetas resultantes se golpean con pelotas de goma o las manos y, al tener distintas longitudes o grosores, producen tonos diferentes (por lo general intervalos de tercera o cuarta).

Versión de 2 tonos. Incluye baquetas.`,
  }),

  item({
    id: "guiro-mediano", categoria: "instrumentos", orden: 6,
    nombre: "Güiro", subtitulo: "Mediano",
    precio: 35000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Idiófono raspador típico de Centroamérica, incluye baqueta.",
    descripcionLarga: `El Güiro es un instrumento de percusión idiófono (suena por sí mismo, sin cuerdas ni parches) de la rama de los raspadores, típico de Centroamérica (Puerto Rico, Cuba, México).

Se ejecuta raspando con un palillo o baqueta de madera sobre la superficie rugosa o ranurada, con mayor o menor velocidad, obteniendo distintos sonidos. Se utiliza habitualmente como acompañamiento en ritmos de percusión.

Incluye palillo de madera. Hecho con diferentes especies de bambú. Decoración flameada y texturizada. Tamaño clásico de 18 a 25 cm aprox.`,
  }),

  item({
    id: "baquetas-chicas", categoria: "instrumentos", orden: 7,
    nombre: "Baquetas", subtitulo: "Chicas",
    precio: 20000, spec: "Accesorio · Madera y goma",
    descripcionBreve: "Par de baquetas con punta de goma, para percusión melódica.",
    descripcionLarga: `Precisión, rebote y calidez sonora para tu percusión. Diseñadas para una respuesta acústica limpia y controlada, este par de baquetas con cabeza de goma amortigua el golpe agresivo y resalta los armónicos fundamentales del instrumento.

Su balance y tamaño compacto las hacen versátiles tanto para estudio como para sesiones de meditación y ambientación sonora. Ideales para tongue drums, handpans, metalófonos, xilófonos y gongs.

Presentación: par (2 unidades). Largo total: 20 a 25 cm aprox. Diámetro de la punta: 2,5 cm.`,
  }),

  item({
    id: "mate-liso-bombilla", categoria: "artesanias", orden: 8,
    nombre: "Mate", subtitulo: "Liso c/bombilla",
    precio: 30000, spec: "Artesanía · Bambú",
    descripcionBreve: "Mate de bambú con bombilla de caña, sin curado previo.",
    descripcionLarga: `Mate de bambú + bombilla de caña: una experiencia natural, práctica y con identidad propia.

Hecho a mano a partir de cañas seleccionadas, aporta una impronta estética cálida y le otorga a la yerba un sabor suave, limpio y característico. No requiere curado previo: simplemente se lava y ya está listo para disfrutar desde el primer día.

Incluye bombilla artesanal de caña a juego. Terminación lisa flameada. Se puede pedir grabado a medida.`,
  }),

  item({
    id: "palo-lluvia", categoria: "instrumentos", orden: 9,
    nombre: "Palo de Lluvia", subtitulo: "",
    precio: 50000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Recrea el sonido de la lluvia cayendo, ideal para meditación.",
    descripcionLarga: `Palo de Lluvia de bambú, tamaño clásico: la calma del agua y la naturaleza en tu espacio.

Confeccionado en bambú seleccionado, recrea fielmente el sonido suave y continuo de las gotas de lluvia al caer. Ampliamente utilizado en meditación, yoga, relajación y baños de sonido, así como en percusión y musicalización de ambientes.

Su tamaño clásico ofrece un equilibrio perfecto entre portabilidad, duración de la caída sonora y riqueza armónica.`,
  }),

  item({
    id: "flautone", categoria: "instrumentos", orden: 10,
    nombre: "Flautone", subtitulo: "",
    precio: 25000, spec: "Viento · 100% bambú",
    descripcionBreve: "Flauta traversa de bambú con sonoridad cálida y precolombina.",
    descripcionLarga: `Flautone – flauta traversa de bambú: ecos ancestrales y calidez acústica en tus manos.

Confeccionada artesanalmente en bambú seleccionado, combina un diseño compacto y cómodo con una acústica envolvente de carácter precolombino. Su embocadura transversal permite una gran expresividad sonora, con tonos dulces, cálidos, graves y ricos en armónicos naturales.

Largo aproximado: 25 cm. Terminaciones disponibles: flameado, pirograbado o tallado a mano.`,
  }),

  item({
    id: "kass-kash-asalato", categoria: "instrumentos", orden: 11,
    nombre: "Kass Kash (Asalato)", subtitulo: "",
    precio: 60000, spec: "Percusión · Africano",
    descripcionBreve: "Idiófono africano de dos esferas: percusión y malabarismo rítmico.",
    descripcionLarga: `Kass Kash / Asalato – percusión y malabarismo rítmico. Ritmo, destreza y coordinación en tus manos.

Originario de África Occidental, este instrumento idiófono combina la percusión con la motricidad fina. Está compuesto por dos esferas unidas por una cuerda ajustable: una se sostiene en la palma mientras la otra pivota libremente, permitiendo alternar el sonido de shaker con el chasquido del impacto entre ambas esferas.

Desde patrones rítmicos sencillos hasta complejas combinaciones de malabarismo sonoro con un par en cada mano, ofrece un aprendizaje dinámico y muy versátil.`,
  }),

  item({
    id: "baquetas-grandes", categoria: "instrumentos", orden: 12,
    nombre: "Baquetas", subtitulo: "Grandes",
    precio: 25000, spec: "Accesorio · Madera y goma",
    descripcionBreve: "Par de baquetas grandes para instrumentos de mayor masa acústica.",
    descripcionLarga: `Baquetas de goma, tamaño grande (par): ataque cálido, máxima resonancia y profundidad armónica.

Diseñadas para instrumentos de mayor masa acústica, cuentan con cabezales de goma densa que extraen los tonos más profundos y ricos sin generar golpes ásperos. Su peso balanceado y firmeza en el mango permiten un rebote suave y controlado, protegiendo el instrumento en cada ejecución.

Complemento ideal para OVNI Drum o Steel Tongue Drum de tamaño Clásico y Grande, y para gongs de distintas dimensiones, logrando sustain prolongado y vibraciones envolventes.`,
  }),

  item({
    id: "ektar", categoria: "instrumentos", orden: 13,
    nombre: "Ektar", subtitulo: "",
    precio: 160000, spec: "Cuerdas · Bambú y cuero",
    descripcionBreve: "Instrumento de cuerda de la India, ritmo hipnótico y modulación continua.",
    descripcionLarga: `Ektar / Gopichand de bambú: tradición devocional de la India, ritmo hipnótico y modulación continua.

Emblemático en la música tradicional de los juglares Baul, el Ektar es un instrumento de cuerda pulsada único: su cuerpo resonador está confeccionado en caña de bambú y parche de cuero genuino de chivo, coronado por un arco bífido de bambú que sostiene una única cuerda metálica.

Mientras se pulsa la cuerda con una mano, con la otra se presiona o libera el arco, variando la tensión en tiempo real para generar deslizamientos tonales, glissandos y modulaciones expresivas. La afinación base se ajusta mediante su clavija artesanal de madera.

Ideal para kirtan, cantos devocionales, ambientación acústica, meditación y música étnica.`,
  }),

  item({
    id: "doble-percu", categoria: "instrumentos", orden: 14,
    nombre: "Doble Percu", subtitulo: "Güiro + Bongó",
    precio: 60000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Marimba y güiro combinados en una sola pieza artesanal.",
    descripcionLarga: `Marimba con güiro: melodía y ritmo combinados en una sola pieza artesanal de bambú.

Integra dos mundos sonoros en un único cuerpo: la resonancia armónica de la marimba y la textura rítmica característica del güiro o raspador. Diseñado para explorar ritmos, melodías y ambientaciones acústicas de forma simultánea o alternada; perfecto para músicos, docentes, terapias sonoras o juegos rítmicos.

Terminaciones: flameado, texturado o pirograbado. Incluye par de baquetas de goma y palillo rascador para el güiro.`,
  }),

  item({
    id: "fanal", categoria: "luminarias", orden: 15,
    nombre: "Fanal", subtitulo: "Portavela",
    precio: 20000, spec: "Iluminación · Calabaza",
    descripcionBreve: "Portavela artesanal de calabaza con luz cálida y tenue.",
    descripcionLarga: `Fanal portavela de calabaza artesanal: calidez, luz tenue y diseño natural para transformar tus espacios.

Hecho a mano sobre calabazas naturales seleccionadas, proyecta sombras y destellos suaves a través de sus calados y tramas decorativas. Su base interior contiene una capa de sales minerales que sostienen el portavela, aportando estabilidad y un toque estético armónico.

Incluye: fanal de calabaza, vela de noche con soporte protector y cama interior de sales decorativas.`,
  }),

  item({
    id: "luminaria", categoria: "luminarias", orden: 16,
    nombre: "Luminaria", subtitulo: "Decorativa",
    precio: 80000, spec: "Iluminación · 100% bambú",
    descripcionBreve: "Velador artesanal de bambú con instalación eléctrica incluida.",
    descripcionLarga: `Velador artesanal de bambú, luminaria decorativa: luz cálida, sombras envolventes e identidad natural.

Confeccionado a mano sobre cañas de bambú seleccionadas, transforma cualquier ambiente proyectando figuras y texturas luminosas a través de sus calados y relieves. Su altura y diseño estilizado la convierten en el punto focal ideal para mesas de luz, escritorios o rincones de relax.

Medida aproximada: 40 cm de altura. Instalación eléctrica incluida: cable con ficha, tecla de encendido/apagado y lámpara. Stock permanente y posibilidad de diseños personalizados a pedido.`,
    disponible: false,
  }),

  item({
    id: "matofono", categoria: "instrumentos", orden: 17,
    nombre: "Matófono", subtitulo: "",
    precio: 10000, spec: "Membranófono vocal · Calabaza",
    descripcionBreve: "Kazoo de calabaza: transforma la voz en un instrumento acústico.",
    descripcionLarga: `Matófono de calabaza artesanal (mirlitón / kazoo de mate): tu voz transformada en un instrumento acústico único.

Es un membranófono tradicional confeccionado a partir de un mate de calabaza seca tratada. Funciona amplificando y modulando la propia voz a través de una membrana vibratoria, generando un timbre nasal, cálido y resonante similar al del kazoo, con la profundidad acústica de la calabaza natural.

Instrumento intuitivo, no requiere conocimientos musicales previos: basta con canturrear o vocalizar dentro de él. Apto para todas las edades.`,
  }),

  item({
    id: "pucuy", categoria: "instrumentos", orden: 18,
    nombre: "Pucuy", subtitulo: "",
    precio: 50000, spec: "Viento · Cerámica",
    descripcionBreve: "Aerófono ceremonial de cerámica, inspirado en la cultura Comechingón.",
    descripcionLarga: `Instrumento ritual de viento Comechingón, cerámica ancestral: ecos sagrados, viento y agua de las sierras de Córdoba.

Inspirado en los instrumentos ceremoniales de la cultura Comechingón (Córdoba, Argentina), este aerófono de cerámica artesanal conecta con la sonoridad de la tierra, evocando el silbido y la fuerza del viento serrano.

Su ejecución es transversal sobre la abertura superior más ancha, logrando diversas tonalidades al modular con los dedos sobre la embocadura y su orificio central. Permite introducir agua en su interior para crear efectos acuáticos y modulaciones ondulantes.

Medidas aproximadas: 10 a 15 cm.`,
  }),

  item({
    id: "didgeridoo-pirograbado", categoria: "instrumentos", orden: 19,
    nombre: "Didgeridoo", subtitulo: "Pirograbado Texturado",
    precio: 80000, spec: "Viento · 100% bambú",
    descripcionBreve: "Instrumento de viento ancestral australiano, acabado texturado.",
    descripcionLarga: `Didgeridoo de bambú, acabado texturado (Yidaki): vibración ancestral, relieve táctil y contraste visual único.

Se distingue por el trabajo de diseño sobre la superficie: combina pirograbado detallado y devastados directos sobre la caña (motivos circulares o tramas talladas). Al remover la capa externa tratada se genera un contraste entre la zona flameada y el tono claro natural del bambú.

Como instrumento sagrado de origen aborigen australiano, produce frecuencias graves cercanas al infrasonido; tocado con respiración circular relaja el cuerpo y favorece la vasodilatación.

Incluye funda reforzada de transporte e instructivo con técnicas y ejercicios.`,
  }),

  item({
    id: "didgeridoo-tallado", categoria: "instrumentos", orden: 20,
    nombre: "Didgeridoo", subtitulo: "Tallado",
    precio: 100000, spec: "Viento · 100% bambú",
    descripcionBreve: "Instrumento de viento ancestral australiano, acabado tallado a mano.",
    descripcionLarga: `Didgeridoo de bambú, acabado tallado (Yidaki): arte ancestral, relieve escultórico y diseños a medida.

Destaca por su trabajo de talla directa sobre el cuerpo del instrumento. Incluye una línea clásica de motivos ancestrales —como la serpiente precolombina y guardas étnicas— y también se pueden realizar tallados personalizados a pedido.

Como instrumento sagrado de origen aborigen australiano, emite frecuencias graves cercanas al infrasonido; tocado con respiración circular produce una vibración continua que relaja profundamente y alivia tensiones corporales.

Incluye funda reforzada de transporte e instructivo con técnicas y ejercicios.`,
  }),

  item({
    id: "tambor-trueno-chico", categoria: "instrumentos", orden: 21,
    nombre: "Tambor de Trueno", subtitulo: "Chico",
    precio: 35000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Recrea el rugido de la tormenta, versión chica y ágil.",
    descripcionLarga: `Tambor de Trueno (Thunder Drum), tamaño chico: tormentas ágiles, ráfagas cortantes y respuesta inmediata.

Esta versión compacta se destaca por su maniobrabilidad y rapidez de respuesta. Su menor volumen interno genera una afinación más aguda y definida, emulando ráfagas de viento cortantes y truenos cercanos.

Ideal para sets de efectos portátiles, musicalización en vivo, teatro o exploraciones sonoras.`,
  }),

  item({
    id: "tambor-trueno-grande", categoria: "instrumentos", orden: 22,
    nombre: "Tambor de Trueno", subtitulo: "Grande",
    precio: 50000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Recrea el rugido de la tormenta, el más profundo y envolvente.",
    descripcionLarga: `Tambor de Trueno (Thunder Drum), tamaño grande: el rugido más profundo, cavernoso y envolvente de la tormenta.

Confeccionado en piezas de bambú de mayor diámetro, está pensado para el máximo impacto acústico. Su mayor caja de resonancia produce una tonalidad marcadamente grave y un sonido expansivo que llena el espacio.

Ideal para viajes sonoros, baños de gong, sonoterapia y ambientaciones teatrales imponentes.`,
  }),

  item({
    id: "tambor-oceanico-chico", categoria: "instrumentos", orden: 23,
    nombre: "Tambor Oceánico", subtitulo: "Chico",
    precio: 180000, spec: "Percusión · Madera y cuero",
    descripcionBreve: "Recrea el sonido del mar, versión chica y liviana.",
    descripcionLarga: `Tambor Oceánico (Ocean Drum), tamaño chico: la brisa marina y el rumor de las olas en un formato ágil y liviano.

Al contar con un cuerpo de menores dimensiones, produce un tono más agudo y brillante, con un volumen sutil y controlado. Ideal para traslados frecuentes, terapias individuales, cuentacuentos y trabajo lúdico.

Materiales: aro de madera seleccionada y parches de cuero. Incluye baqueta.`,
  }),

  item({
    id: "tambor-oceanico-grande", categoria: "instrumentos", orden: 24,
    nombre: "Tambor Oceánico", subtitulo: "Grande",
    precio: 250000, spec: "Percusión · Madera y cuero",
    descripcionBreve: "Recrea el sonido del mar, la experiencia más envolvente.",
    descripcionLarga: `Tambor Oceánico (Ocean Drum), tamaño grande: el oleaje más profundo, envolvente e inmersivo en tus manos.

Ofrece una cámara de resonancia amplia que entrega un sonido de mar profundo y de largo recorrido sonoro, con una afinación más grave y presencia envolvente. Ideal para baños de sonido, viajes sonoros grupales y conciertos meditativos.

Materiales: aro de madera tratada y parches de cuero. Incluye baqueta.`,
  }),

  item({
    id: "ovni-drum-chico", categoria: "instrumentos", orden: 25,
    nombre: "OVNI Drum", subtitulo: "Chico · 8 notas",
    precio: 400000, spec: "Percusión melódica · Metal",
    descripcionBreve: "Percusión melódica de lengüetas metálicas, escala de 8 notas.",
    descripcionLarga: `OVNI Drum Chico – 8 notas (Steel Tongue Drum): melodía armónica, vibración pura e interpretación intuitiva.

Su escala de 8 notas amplía el repertorio musical manteniendo un formato ágil y cómodo de transportar. Al percutir sus lengüetas emite armónicos envolventes que inducen relajación profunda, muy buscado para meditación, reiki, yoga y musicoterapia.

Se toca con baquetas de goma o directamente con las manos, de forma completamente intuitiva. Incluye funda, par de baquetas de goma y manual. Podés encargar tu pedido personalizado eligiendo escala musical y color.`,
  }),

  item({
    id: "ovni-drum-clasico", categoria: "instrumentos", orden: 26,
    nombre: "OVNI Drum", subtitulo: "Clásico · 9 notas",
    precio: 600000, spec: "Percusión melódica · Metal",
    descripcionBreve: "Percusión melódica de lengüetas metálicas, nuestro modelo de referencia.",
    descripcionLarga: `OVNI Drum Clásico – 9 notas (Steel Tongue Drum): el equilibrio perfecto entre profundidad acústica, presencia y versatilidad.

Es el modelo de referencia de la línea: con una escala extendida de 9 notas y una caja acústica equilibrada, entrega un sustain prolongado y una rica resonancia armónica. Favorito de sonoterapeutas, instructores de yoga, docentes y músicos.

Se ejecuta con las baquetas de goma incluidas o con los dedos. Incluye funda acolchada, par de baquetas de goma y manual. Podés encargar tu pedido personalizado eligiendo escala musical y color.`,
  }),

  item({
    id: "ovni-drum-grande", categoria: "instrumentos", orden: 27,
    nombre: "OVNI Drum", subtitulo: "Grande · 11 notas",
    precio: 800000, spec: "Percusión melódica · Metal",
    descripcionBreve: "Percusión melódica de lengüetas metálicas, la versión más completa.",
    descripcionLarga: `OVNI Drum Grande – 11 notas (Steel Tongue Drum): máxima amplitud melódica, tonos graves profundos e inmersión total.

Es la versión más completa y resonante de la línea: con 11 notas en una cámara de mayor diámetro, ofrece un rango musical expandido con graves llenos de cuerpo y un decaimiento sonoro prolongado. Ideal para baños de sonido grupales, sonoterapia profesional y conciertos meditativos.

Incluye funda reforzada, par de baquetas de goma y manual. Podés encargar tu pedido personalizado eligiendo escala musical y color.`,
  }),

  item({
    id: "bongo-bambu-3-tonos", categoria: "instrumentos", orden: 28,
    nombre: "Bongó de Bambú", subtitulo: "3 tonos",
    precio: 60000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Tambor de hendidura precolombino, la versión más completa.",
    descripcionLarga: `Bongó de bambú, 3 tonos (lengüetas caladas): ritmo orgánico, afinación escalonada y raíz acústica.

Es la versión más completa de la línea de percusión de lengüetas, superando en rango y versatilidad melódica al modelo clásico de 2 tonos. Su superficie superior cuenta con tres lengüetas caladas, calibradas para tres alturas tonales bien diferenciadas.

Produce un golpe seco, cálido y resonante, con excelente respuesta al tocarlo con dedos, palmas o baquetas livianas. Ideal para círculos de percusión, música folclórica y terapias sonoras.`,
  }),

  item({
    id: "bongo-bambu-lineas", categoria: "instrumentos", orden: 29,
    nombre: "Bongó de Bambú", subtitulo: "Líneas",
    precio: 40000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Tambor de bambú ranurado, estilo marimbeta con ataque brillante.",
    descripcionLarga: `Bongó de bambú Líneas, 3 tonos (estilo marimbeta): ataque brillante, resonancia lineal y textura percusiva única.

Reemplaza el formato de lengüetas por un sistema de líneas o ranuras longitudinales caladas sobre el cuerpo, emulando la acústica de una pequeña marimbeta de bambú. Entrega tres tonos nítidos y escalonados con un golpe brillante y rápido.

Permite un doble juego: percutir cada zona para marcar patrones rítmicos definidos, o deslizar baquetas o dedos sobre las ranuras para generar efectos de frotación similares al güiro.`,
  }),

  item({
    id: "guiro-chico", categoria: "instrumentos", orden: 30,
    nombre: "Güiro", subtitulo: "Chico",
    precio: 25000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Idiófono raspador de bambú, versión chica y ágil.",
    descripcionLarga: `Güiro artesanal de bambú, tamaño chico: rasguido ágil, brillo rítmico y máxima comodidad de toque.

Esta versión compacta destaca por su maniobrabilidad y rapidez de respuesta. Sus ranuras percusivas están talladas de manera uniforme para un raspado continuo y nítido, con un timbre agudo y brillante.

Ideal para marcar el pulso en ritmos latinos, cumbia, folklore y salsa. Incluye raspador artesanal a medida.`,
  }),

  item({
    id: "guiro-grande", categoria: "instrumentos", orden: 31,
    nombre: "Güiro", subtitulo: "Grande",
    precio: 45000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Idiófono raspador de bambú, versión grande y contundente.",
    descripcionLarga: `Güiro artesanal de bambú, tamaño grande: presencia contundente, resonancia profunda y raspado envolvente.

Confeccionado sobre piezas de bambú de mayor longitud y calibre. Su amplia cámara interna amplifica el raspado en frecuencias medias y graves, entregando un sonido rasposo, cálido y lleno de cuerpo.

Sus estrías profundas permiten desde acentos marcados hasta arrastres densos y continuos. Se entrega con su raspador artesanal.`,
  }),

  item({
    id: "palo-lluvia-grande", categoria: "instrumentos", orden: 32,
    nombre: "Palo de Lluvia", subtitulo: "Grande",
    precio: 60000, spec: "Percusión · 100% bambú",
    descripcionBreve: "Recrea el sonido de la lluvia, con la caída sonora más prolongada.",
    descripcionLarga: `Palo de Lluvia de bambú, tamaño grande (larga duración): torrente continuo, caída prolongada y profunda relajación.

Confeccionado sobre caña de bambú de gran longitud, se distingue por su prolongada duración sonora en cada inclinación. Su extenso recorrido interno permite que las semillas desciendan de manera pausada, recreando desde una llovizna suave hasta un chaparrón constante.

Herramienta preferida para baños de sonido, viajes sonoros, yoga, meditación profunda y sonoterapia.`,
  }),

  item({
    id: "mate-pirograbado-bombilla", categoria: "artesanias", orden: 33,
    nombre: "Mate", subtitulo: "Pirograbado c/bombilla",
    precio: 35000, spec: "Artesanía · Bambú",
    descripcionBreve: "Mate de bambú con bombilla, terminación pirograbada a mano.",
    descripcionLarga: `Mate artesanal de bambú pirograbado (incluye bombilla de bambú): tradición litoraleña, calidez natural y detalles a fuego.

Destaca por la fineza de su diseño pirograbado a mano, donde el fuego traza guardas, motivos botánicos y símbolos de identidad regional. El bambú conserva bien la temperatura del agua sin calentar en exceso las paredes externas.

No hace falta curarlo: con solo lavarlo ya está listo para usar. Incluye bombilla artesanal de bambú.`,
  }),

  item({
    id: "mate-tallado-bombilla", categoria: "artesanias", orden: 34,
    nombre: "Mate", subtitulo: "Tallado c/bombilla",
    precio: 45000, spec: "Artesanía · Bambú",
    descripcionBreve: "Mate de bambú con bombilla, terminación tallada a mano.",
    descripcionLarga: `Mate artesanal de bambú tallado (incluye bombilla de bambú): relieve escultórico, textura al tacto e identidad a tu medida.

Confeccionado sobre nudos de bambú seleccionados, se distingue por su trabajo de talla directa sobre la corteza vegetal, logrando relieves y contrastes de tono. La densidad del bambú garantiza un mate resistente y liviano.

No hace falta curarlo: se lava y ya se puede usar. Incluye bombilla de bambú. Se pueden encargar diseños personalizados con nombres, fechas o frases talladas.`,
  }),

  item({
    id: "fungiball", categoria: "instrumentos", orden: 35,
    nombre: "Fungiball", subtitulo: "",
    precio: 15000, spec: "Percusión · Plástico",
    descripcionBreve: "Shaker artesanal con forma de hongo amanita, diseño propio.",
    descripcionLarga: `Fungiball – shaker artesanal hongo amanita: ritmo compacto, estética botánica y excelente definición sónica.

Diseñado y fabricado por Nektar Bambú, es un shaker de percusión menor inspirado en la silueta del hongo amanita. Su formato ergonómico cabe perfectamente en la palma de la mano, ideal para marcar compases precisos y patrones sincopados.

Material: polímero plástico rígido y resistente a impactos. Tamaño chico, de bolsillo.`,
  }),

  item({
    id: "cascabelero", categoria: "instrumentos", orden: 36,
    nombre: "Cascabelero", subtitulo: "",
    precio: 15000, spec: "Percusión · Calabaza",
    descripcionBreve: "Sonajero de calabaza con cascabeles metálicos, forma de hongo.",
    descripcionLarga: `Cascabelero artesanal de calabaza: brillo sonoro, pulso rítmico e identidad visual artesanal.

Construido con un mango firme de madera que sostiene una semiesfera de calabaza natural pintada a mano, emulando la silueta de un hongo. Contiene múltiples cascabeles metálicos que liberan un sonido brillante y continuo con cada sacudida.

Ideal para marcar el compás en ensambles acústicos, círculos de percusión, danzas o musicoterapia.`,
  }),

  item({
    id: "shaker", categoria: "instrumentos", orden: 37,
    nombre: "Shaker", subtitulo: "",
    precio: 10000, spec: "Percusión · Calabaza",
    descripcionBreve: "Shaker de calabaza pintado a mano, ataque nítido y potente.",
    descripcionLarga: `Shaker de calabaza pintado a mano: ataque nítido, gran potencia sonora e identidad artesanal.

Confeccionado sobre calabazas naturales seleccionadas, combina calidez estética artesanal con un impacto acústico potente. En su interior tiene un relleno de bolitas de metal que aporta un volumen sobresaliente y una respuesta rítmica ágil.

Cada pieza está pintada a mano con diseños exclusivos.`,
    disponible: false,
  }),

  item({
    id: "caxixi", categoria: "instrumentos", orden: 38,
    nombre: "Caxixi", subtitulo: "",
    precio: 30000, spec: "Percusión · Mimbre y calabaza",
    descripcionBreve: "Sonajero tradicional brasileño de mimbre y calabaza.",
    descripcionLarga: `Caxixi – percusión tradicional brasileña: ritmo orgánico, acento definido y raíz afrobrasileña.

Es un idiófono tradicional de Brasil, emblemático en la capoeira junto al berimbau y en ensambles de percusión. Está confeccionado a mano con un cesto tejido en mimbre cerrado en su base por un fondo de calabaza natural.

Genera dos dinámicas de sonido: un chasquido seco cuando las semillas impactan contra la calabaza, y un tono más suave al rozar contra las paredes de mimbre.`,
    disponible: false,
  }),

  item({
    id: "luminaria-chica", categoria: "luminarias", orden: 39,
    nombre: "Luminaria", subtitulo: "Chica",
    precio: 60000, spec: "Iluminación · 100% bambú",
    descripcionBreve: "Velador de bambú calado, formato compacto e íntimo.",
    descripcionLarga: `Velador artesanal de bambú calado, tamaño chico: luz tenue, proyección de sombras y calidez en formato compacto.

Confeccionado a mano sobre cañas de bambú en escala pequeña, pensado para mesas de luz, escritorios, repisas o altares con iluminación puntual e íntima. El calado artesanal proyecta figuras sobre las paredes y el entorno.

Incluye instalación eléctrica completa y lámpara, con posibilidad de elegir el color del foco. Hay variedad de diseños en stock y también se hacen pedidos personalizados.`,
    disponible: false,
  }),

  item({
    id: "luminaria-grande", categoria: "luminarias", orden: 40,
    nombre: "Luminaria", subtitulo: "Grande",
    precio: 100000, spec: "Iluminación · 100% bambú",
    descripcionBreve: "Luminaria de bambú de gran porte, protagonista del ambiente.",
    descripcionLarga: `Velador artesanal de bambú calado, tamaño grande: presencia escultórica, amplio alcance lumínico y tramas envolventes.

Elaborada sobre cañas de bambú maduras de gran porte, se convierte en la protagonista visual del ambiente. Sus calados detallados permiten que la luz se expanda con mayor amplitud, proyectando texturas y sombras vivas.

Se entrega completamente armada con circuito eléctrico y lámpara incluida, pudiendo elegir el color de la luz. Diseños en stock y fabricación personalizada a pedido.`,
    disponible: false,
  }),

  item({
    id: "pajarito", categoria: "instrumentos", orden: 41,
    nombre: "Pajarito", subtitulo: "",
    precio: 50000, spec: "Viento · Cerámica",
    descripcionBreve: "Silbato de cerámica con efecto de agua, imita el canto de pájaros.",
    descripcionLarga: `Silbato de pájaro de cerámica (efecto agua): el trino real de la naturaleza en una pieza artesanal.

Combina juego, estímulo sonoro y diseño rústico. Su gran atractivo está en la modulación: al agregar unas gotas de agua por el orificio superior y soplar, reproduce un trino vibrante y realista que imita el canto de los pájaros. También se puede tocar en seco como silbato tradicional.

Ideal para estimulación temprana en niños y para músicos y terapeutas que buscan efectos ambientales orgánicos. Medidas: 5 x 6 cm.`,
  }),

  item({
    id: "llamador-angeles", categoria: "artesanias", orden: 42,
    nombre: "Llamador de Ángeles", subtitulo: "",
    precio: 50000, spec: "Artesanía · Bambú",
    descripcionBreve: "Móvil de viento de bambú, apto para exteriores.",
    descripcionLarga: `Llamador de Ángeles de bambú (móvil de viento): armonía natural, energía positiva y serenidad para tu hogar.

Confeccionado artesanalmente con cañas de bambú seleccionadas, combina una presencia visual cálida y rústica con un sonido hueco, dulce y relajante. Al chocar suavemente con la brisa, las cañas liberan tonos de madera que limpian la energía del ambiente.

Ideal para galerías, balcones, jardines, entradas o espacios de meditación y yoga. Apto para exteriores.`,
    disponible: false,
  }),

  item({
    id: "llamador-angeles-chico", categoria: "artesanias", orden: 43,
    nombre: "Llamador de Ángeles", subtitulo: "Chico",
    precio: 40000, spec: "Artesanía · Bambú",
    descripcionBreve: "Móvil de viento de bambú, formato compacto para espacios chicos.",
    descripcionLarga: `Llamador de Ángeles de bambú, tamaño chico (móvil de viento): sutileza sonora, armonía y calidez natural en formato compacto.

Pensado para espacios íntimos, balcones pequeños, ventanas, galerías o rincones de descanso. Al activarse con una brisa suave, los tubos de bambú entregan un sonido dulce, amaderado y sutil, con un volumen delicado.

Su diseño liviano reacciona ante la más mínima corriente de aire. Apto para exteriores.`,
    disponible: false,
  }),

];


// Configuración general del sitio — editable sin tocar la lógica
const CONFIG = {
  envioGratisMinimo: 150000,   // el envío gratis aplica "superando" este monto, en CABA y GBA
  whatsappNumero: "5491165865434", // sin espacios ni signos, con código de país (a este número llegan los pedidos)
  categorias: [
    { id: "todo", nombre: "Todo" },
    { id: "instrumentos", nombre: "Instrumentos" },
    { id: "artesanias", nombre: "Artesanías" },
    { id: "luminarias", nombre: "Luminarias" },
    { id: "envio-gratis", nombre: "Envío Gratis" }
  ],
  showroom: "Showroom Floresta, de Lunes a Sábados 14 a 21 hs",
  redes: {
    instagram: "https://instagram.com/nektarbambu",
    youtube: "https://www.youtube.com/@nektarbambu",
    maps: "https://www.google.com/maps/search/?api=1&query=Av.+Rivadavia+8803%2C+Floresta%2C+CABA"
  },
  // Texto del pie de la página. Cada ítem admite HTML simple (links) porque lo edita el dueño del sitio.
  guia: {
    titulo: "NEKTAR BAMBÚ • GUÍA RÁPIDA DE COMPRA",
    secciones: [
      {
        titulo: "1. ¿CÓMO COMPRAR?",
        items: [
          "Sumá tus artículos al carrito en la web.",
          "Al finalizar, el pedido nos llega directo por WhatsApp.",
          "Coordinamos detalles, pago y envío con atención personalizada."
        ]
      },
      {
        titulo: "2. FORMAS DE PAGO",
        items: [
          "BNA+ (recomendado)",
          "Mercado Pago (todas las tarjetas y dinero en cuenta).",
          "Transferencia Bancaria."
        ]
      },
      {
        titulo: "3. ENVÍOS Y ENTREGAS",
        items: [
          "CABA y primeros cordones del GBA: envíos en el día por moto mensajería.",
          "Todo el país: Correo Argentino, Mercado Envíos y encomiendas (con embalaje reforzado)."
        ]
      },
      {
        titulo: "4. SHOWROOM Y CONTACTO",
        items: [
          "Showroom y Retiro: <a href=\"https://www.google.com/maps/search/?api=1&query=Av.+Rivadavia+8803%2C+Floresta%2C+CABA\" target=\"_blank\" rel=\"noopener\">Av. Rivadavia 8803, Floresta, CABA</a> (con cita previa).",
          "WhatsApp: <a href=\"https://wa.me/5491165865434\" target=\"_blank\" rel=\"noopener\">+54 9 11 6586-5434</a> / <a href=\"https://wa.me/5491123152312\" target=\"_blank\" rel=\"noopener\">+54 9 11 2315-2312</a>",
          "Email: <a href=\"mailto:nektarbambu@gmail.com\">nektarbambu@gmail.com</a>"
        ]
      }
    ]
  }
};
