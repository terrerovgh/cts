Gracias por la información completa. Empezaré a elaborar un plan técnico muy detallado para construir cubatattoostudio.com desde cero como una one-page con efectos visuales avanzados inspirados en la web de GTA VI. Incluiré todas las secciones clave (Hero, Galería, Servicios, Tatuadores con historias animadas, Testimonios, Contacto, Footer), empleando Astro, GSAP y TailwindCSS, y detallando las animaciones, estructura modular, y narrativa visual para cada tatuador.

---

## Estado del Proyecto y Tasklist (actualizado 2025-07-01)

### Completado
- Estructura base Astro con Tailwind y GSAP.
- Layout global con navegación fija, footer, fuente Rye y wrappers para ScrollSmoother.
- Hero con animaciones de entrada/salida y video de fondo.
- Galería con grid responsivo, animaciones GSAP y lightbox básico.
- Sistema de animaciones centralizado (`src/scroll-animations.js`).
- Componentes de artistas: Juan, David, Nina, Karli (video scrubbing, animaciones, parallax).
- Integración de todos los artistas en la página principal.
- Secciones implementadas: Servicios, Testimonios, Contacto y Footer como componentes modulares.
- Transiciones globales y animaciones GSAP centralizadas.
- Optimización para móviles y mejoras de accesibilidad (a11y).
- Documentación y changelog actualizados.

### Pendiente
- Mejorar y refinar transiciones globales entre secciones (fade, overlay, wipes, etc.) para una experiencia narrativa aún más fluida.
- Validar y optimizar el rendimiento en dispositivos de gama baja y navegadores menos comunes.
- Revisar y mejorar la accesibilidad avanzada (a11y): navegación por teclado, `prefers-reduced-motion`, roles ARIA, etc.
- Añadir pruebas automáticas (unitarias/E2E) y validación de formularios.
- Preparar el sitio para despliegue final y documentar el proceso de mantenimiento y actualización de contenido.
- Planificar features futuras: sistema de citas online, blog/tienda, internacionalización.

---

Te avisaré cuando el plan esté listo para revisión.

# Plan Detallado para el Desarrollo de **CubaTattooStudio.com** (Astro + GSAP + Tailwind)

*El logotipo en blanco y negro de Cuba Tattoo Studio define la paleta de colores principal del sitio.*

Este plan describe paso a paso la creación **desde cero** de la página web **Cuba Tattoo Studio**, empleando **Astro**, **GSAP** y **Tailwind CSS**. Se busca lograr un efecto visual **cinemático e inmersivo**, imitando las animaciones impactantes del sitio de GTA VI (scroll interactivas, transiciones fluidas, parallax) y utilizando una estética monocromática **blanco y negro** acorde al logotipo. Cada sección de la página (One-Page) se detalla a continuación, incluyendo Hero, Galería, Servicios, Tatuadores, Testimonios, Contacto y Footer, con énfasis en animaciones vistosas y narrativas para cada tatuador.

## 1. Preparativos Iniciales del Proyecto

* **Repositorio y Estructura:** Crear un repositorio Git iniciando el proyecto Astro. Establecer ramas principales (`main`, `develop` y `feature`) para facilitar la colaboración y el control de versiones.
* **Inicializar Astro:** Ejecutar el comando de inicio de Astro e instalar dependencias esenciales:

  ```bash
  npm create astro@latest cubatattoostudio  
  cd cubatattoostudio  
  npm install astro @astrojs/tailwind gsap 
  ```

  (Astro ofrecerá una plantilla básica; se agrega la integración oficial de Tailwind y la librería GSAP).
* **Configuración de Tailwind:** Configurar **Tailwind CSS** en Astro (vía `astro add tailwind` o manualmente) asegurando que el *purge* de CSS quede habilitado para eliminar estilos no usados y mantener eficiencia. Definir en el config las rutas a componentes `.astro` y `.jsx` para que Tailwind analice todas las plantillas.
* **Integrar GSAP:** Añadir GSAP via npm e importarlo en los componentes/clientes donde se requiera animación. Por ejemplo, incluir un `<script type="module">` con `import gsap from "gsap";` en los componentes Astro para poder usar GSAP en el navegador. Se usará la estrategia de Astro de **hydratación** (`client:load` o `client:idle`) en los componentes con animaciones para que GSAP ejecute solo en el cliente (evitando ejecutar animaciones en servidor).
* **Herramientas de Desarrollo:** Instalar utilidades opcionales para mejorar la DX, por ejemplo **Astro VSCode**, y configurar **eslint/prettier** para mantener la calidad del código. Preparar scripts de desarrollo en `package.json` como `dev`, `build` y `preview` para iterar rápidamente.

## 2. Diseño Global y Layout Base

* **Paleta Monocromática:** Adoptar **blanco y negro** como colores base (tal como el logo), aportando contraste marcado y estética limpia. Se pueden definir *tokens* de color (variables CSS o utilidades Tailwind) para negro profundo (#000) y blanco puro (#FFF), además de algún tono gris neutro para texto secundario o fondos si fuera necesario.
* **Tipografía y Estilo General:** Escoger fuentes legibles y modernas (por ejemplo, una tipografía sans-serif limpia para párrafos y otra estilizada para encabezados si encaja con la marca). Asegurar buen contraste (texto blanco sobre fondos negros y viceversa) para accesibilidad. Definir estilos base en Tailwind (p. ej. clases utilitarias para tamaños de encabezados, sombras ligeras, etc.).
* **Componentes Reutilizables:** Implementar componentes Astro para elementos UI comunes, optimizados para reuso:

  * `Layout.astro`: componente de **layout global** que incluya el `<header>` de navegación y `<footer>`, aplicando la estructura de una página One-Page. Gestionará también la importación de estilos globales.
  * `Button.astro`: botón estilizado (blanco/negro) para CTAs.
  * `Heading.astro`: componente para títulos seccionales que aplique fuentes y estilos consistentes.
  * `ImageOptimized.astro`: componente opcional para cargar imágenes optimizadas/responsivas (aprovechando **Astro Image** si se desea, aunque solo con Astro/Tailwind también se puede manejar con `<img>` y utilidades CSS).
* **Layout y Navegación:** Diseñar un layout de una sola página con navegación fija o anclada en el header:

  * El **Header** contendrá el logotipo del estudio (linkeado al inicio) y un menú de navegación con enlaces que hagan *scroll* suave a cada sección (`Galería`, `Servicios`, `Tatuadores`, `Testimonios`, `Contacto`). Usar `scroll-behavior: smooth` (Tailwind tiene clase `scroll-smooth`) para la transición suave al ancla.
  * El **Footer** presentará información de contacto resumida, redes sociales y un recordatorio del horario o dirección, todo en coherencia con el estilo negro/blanco.
* **Diseño Responsivo:** Garantizar desde el inicio que el diseño sea **responsive**. Utilizar el grid y flex de Tailwind para reordenar secciones en móvil (por ejemplo, columnas que pasan a filas). Comprobar que texto e imágenes escalen adecuadamente en distintos tamaños de pantalla. Tailwind facilitará crear un sitio fluido que conserve la estética en móviles y desktops.

## 3. Hero e Introducción Cinemática

* **Componente Hero:** Crear `Hero.astro` como sección inicial de la página. Ocupa la pantalla completa al cargar, sirviendo de **portada** impactante. Debe incluir:

  * El **logotipo** o nombre del estudio destacado, posiblemente centrado.
  * Un subtítulo o eslogan breve del estudio (ej: *“Arte en la piel, contado en cada trazo”*).
  * Opcionalmente, un indicativo visual de *scroll* (una flecha o “scroll down”) animado para invitar al usuario a desplazarse.
* **Animación de Carga (Preloader):** Implementar un **spinner de carga** personalizado que imite una **gota de tinta girando** sobre sí misma. Por ejemplo, mostrar inicialmente una forma circular negra (SVG o div redondo) que con GSAP vaya rotando/ondulando continuamente, simulando tinta líquida fluyendo en círculos. Este preloader se mostrará mientras el sitio termina de cargar recursos. Una vez lista la página, ejecutar una transición suave: la gota de tinta puede “expandirse” y desvanecerse revelando el hero. (Esta animación de intro añade dramatismo y refuerza la temática de tinta).
* **Intro Cinemática con GSAP:** Al revelarse el Hero, desplegar animaciones inspiradas en GTA VI:

  * Usar GSAP Timeline para orquestar la entrada de elementos. Por ejemplo, **revelar el logotipo con máscara SVG**: el logo puede aparecer inicialmente cubierto por una máscara (quizá simulando ser “escrito” con tinta). Inspirarse en la técnica GTA VI donde un texto SVG se reveló mediante máscara y zoom. Aplicar un efecto de zoom-out o fade-in sincronizado con la remoción del preloader.
  * Incluir un **video de fondo** a pantalla completa en el hero para dar impacto visual. Se puede colocar un video MP4 en loop (blanco y negro o con colores sutiles) mostrando escenas de tatuajes, el estudio o tinta esparciéndose, para generar atmósfera. Este video debe estar en **auto-play** sin sonido, en bucle, y ocupando todo el fondo (`object-cover` para llenar contenedor). La combinación de video de fondo y el logotipo animado creará un efecto inmersivo inmediato.
  * Asegurarse de optimizar el video (resolución adecuada, uso de codecs y keyframes suficientes para que al manipularlo en scroll sea fluido). Si el video es pesado, proveer una imagen estática de fallback para móviles o en caso de fallo de carga.
* **Scroll-trigger del Hero:** Considerar usar **GSAP ScrollTrigger** para controlar la transición del Hero al resto de la página. Por ejemplo, hacer que el Hero permanezca *fijo (pinned)* durante cierto scroll mientras se reproducen animaciones (texto apareciendo, video haciendo un zoom out lento) y luego liberar el scroll a la siguiente sección. Este efecto anclado puede contar una breve historia inicial (e.g., “Bienvenido... conoce nuestro arte... desliza para continuar”) antes de dar paso a la galería.

## 4. Galería de Trabajos Destacados

* **Sección Galería:** Presentar una selección de **trabajos (tatuajes) destacados** del estudio. Esta sección será muy visual, mostrando fotos de alta calidad de tatuajes realizados. Diseñarla como un **mosaico** o carrusel:

  * **Galería tipo Grid:** Usar un grid responsivo (p. ej. 3 columnas en desktop, 2 en tablet, 1 en móvil) con imágenes cuadradas o rectangulares. Las imágenes deben estar optimizadas y quizás en escala de grises para seguir la temática, salvo que se quiera resaltar alguna en color. Al hacer hover (en desktop) o al focalizar (en móvil), se puede aplicar un filtro de color o zoom leve para resaltar.
  * **Efecto de Aparición:** Aplicar animaciones de entrada conforme se hace scroll a esta sección. Con GSAP (ScrollTrigger), configurar que las fotos se **fade-in** o se deslicen desde abajo con ligera demora escalonada. De este modo, a medida que el usuario baja, las imágenes van apareciendo secuencialmente dando dinamismo. Esto garantiza que las animaciones se activan solo cuando el elemento está en viewport.
  * **Interactividad:** Opcionalmente, implementar un **lightbox**: al clic en una imagen, mostrarla en grande sobre un fondo oscuro con detalles (podría ser una futura mejora; inicialmente se puede sólo mostrar estático). Si no se hace lightbox ahora, asegurar al menos que las imágenes tengan `alt` descriptivos para accesibilidad.
* **Rendimiento de Imágenes:** Usar técnicas de optimización rigurosa: exportar las fotos en formatos modernos (WebP/AVIF) con compresión balanceada, y usar tamaños responsivos (`<img srcset>` o la componente Astro Image) para no cargar imágenes enormes en móvil. Activar **lazy loading** en imágenes (propiedad `loading="lazy"`), o utilizar `IntersectionObserver`/GSAP para cargar y animar solo cuando cada imagen esté cerca de entrar en pantalla. Esto mejora tiempos de carga al no cargar toda la galería de golpe.

## 5. Sección de Servicios

* **Descripción de Servicios:** Crear una sección que liste los **servicios** ofrecidos por el estudio (e.g., estilos de tatuaje: tradicional, realismo, neo-tradicional; servicios de diseño personalizado; cover-ups; perforaciones si aplican, etc.).
* **Formato de Presentación:** Utilizar un layout simple y claro:

  * Un encabezado breve (“Servicios” o frase como “¿Qué ofrecemos?”) introduciendo la sección.
  * Debajo, listar cada servicio con un pequeño icono o ilustración alusiva (en blanco/negro minimalista) seguido del nombre del servicio y una corta descripción. Se puede usar una lista con íconos SVG personalizados o iconos de biblioteca (Font Awesome, Remix Icons, etc.).
  * Por ejemplo: un ícono de aguja de tatuar para “Tatuajes personalizados”, uno de máquina de tatuar para “Cobertura de tatuajes (cover-up)”, etc., acompañados de 1-2 líneas de explicación.
* **Animación y Diseño:** Aplicar **fade-in** o **slide-in** para cada elemento de servicio al hacer scroll:

  * Usar GSAP ScrollTrigger en cada item para que, al entrar en viewport, se anime desde abajo con ligera demora. Esto añade dinamismo a una sección que de otra forma es estática.
  * Podría implementarse con un timeline encadenado: a medida que el usuario va bajando, el primer servicio aparece, luego el siguiente con un leve retardo, etc., creando un efecto de *stagger*.
* **Tailwind Utilidades:** Emplear utilidades Tailwind para un diseño consistente: por ejemplo `grid grid-cols-1 md:grid-cols-2 gap-6` para colocar los servicios en dos columnas en pantallas grandes y una columna en móviles. Usar `text-center` o `text-left` según la estética deseada. Mantener la paleta en negro/blanco: quizás fondo blanco en esta sección con texto negro para variar si otras secciones tienen fondo oscuro, dando contraste seccional.

## 6. Sección de Tatuadores (Historias de Artistas)

* **Concepto Narrativo:** Dedicaremos una sección prominente para **los artistas tatuadores**, donde cada tatuador cuenta **una historia con sus trabajos**. Inspirado en la web de GTA VI, esta sección será interactiva y narrativa: cada artista tendrá un *mini-story* en la página, destacando su estilo y obras.
* **Componentización:** Crear componentes Astro individuales para cada artista (ej. `ArtistJuan.astro`, `ArtistMaria.astro`, etc.), facilitando que en el futuro se añadan/quiten artistas fácilmente. Inicialmente, incluso si solo se tiene contenido para uno o dos tatuadores, la estructura permite escalar añadiendo nuevos componentes modularmente. Cada componente contendrá el contenido (texto, imágenes) y las animaciones específicas de ese artista.
* **Diseño de Cada Artista:** Seguir un patrón común para la presentación de cada tatuador:

  * **Nombre y Retrato:** Mostrar el nombre del tatuador como subtítulo destacado, con quizás una foto retrato en blanco y negro semi-transparente de fondo o al lado.
  * **Historia Breve:** Un párrafo narrativo que cuente su experiencia, estilo o filosofía (por ejemplo, “Juan lleva 10 años tatuando, especializado en realismo. Cree en...”). Esta narrativa personaliza la experiencia para cada artista.
  * **Galería de Obras del Artista:** Incluir 2-3 imágenes de tatuajes representativos hechos por ese tatuador, posiblemente dispuestas en un mini-slider horizontal o como una pequeña galería interna. El usuario podría deslizar para ver más (si se implementa un carrusel ligero con Tailwind/JS).
* **Animaciones GSAP por Artista:** Aplicar animaciones avanzadas al recorrer esta sección:

  * Utilizar **scroll trigger** para activar la historia de cada artista cuando entra al viewport. Por ejemplo, fijar (pin) la sección de cada artista brevemente y ejecutar una secuencia: primero aparece el nombre con un efecto (fade o desde un lado), luego el texto narrativo escribe o aparece palabra por palabra (GSAP tiene opciones para animar texto). Mientras tanto, las imágenes de tatuajes pueden hacer un **parallax sutil**: a distintas velocidades de scroll, creando profundidad (por ejemplo, la foto de fondo del artista se mueve ligeramente más lento que el texto, logrando efecto 3D).
  * Se puede coordinar estas animaciones con timelines GSAP para asegurar fluidez. Por ejemplo, **timeline** que al iniciar la sección de Juan: hace un fade-in del nombre, luego una transición de la foto de fondo, luego muestra cada imagen de tatuaje con un pequeño retraso. Al terminar, al seguir scroll, esa sección puede desvanecerse dando paso a la del siguiente artista.
  * Asegurar que las animaciones no recarguen demasiado el CPU. GSAP permite sincronizar con scroll (scrub) y también optimiza internamente para evitar reflujo de layout. Mantener las animaciones de propiedad transform y opacity (que suelen estar GPU-aceleradas) para un rendimiento óptimo.
* **Transición entre Artistas:** Entre cada artista, usar transiciones fluidas: por ejemplo, mientras el usuario scrollea de Juan a María, aplicar un **fade-out/in** o un efecto de *wipe* (un elemento cubriendo y revelando) para que el cambio sea suave. Esto puede lograrse detectando el scrollTrigger de fin de sección de Juan para iniciar animación de entrada de María.
* **Historia Unificada:** Si se prefiere, podría plantearse toda la sección tatuadores como una **línea de tiempo unificada**: es decir, pinnear la sección tatuadores entera y conforme se scroll, avanzar por “capítulos” (Juan, luego María, etc.). Esto es más complejo pero replicaría una experiencia estilo storytelling contínua (similar a cómo un trailer cuenta escenas al avanzar). En una primera versión, manejarlo sección a sección es más sencillo, pero el plan deja abierta la posibilidad de unificar con ScrollTrigger timeline global si se desea un efecto verdaderamente cinematográfico.

## 7. Testimonios de Clientes

* **Importancia:** Incluir una sección de **testimonios** reales de clientes añade confianza y autenticidad. Mantenerla relativamente breve pero destacada visualmente.
* **Contenido:** Reunir 3-5 testimonios breves (uno o dos párrafos cada uno) donde clientes describen su experiencia positiva con Cuba Tattoo Studio. Incluir nombre del cliente y, si es posible, una pequeña foto o avatar (en blanco y negro o con un filtro uniforme para mantener estilo).
* **Diseño de Testimonios:** Varios enfoques posibles:

  * Un **slider/carousel** automático: Mostrar un testimonio a la vez al centro, con controles o auto-play que rota cada 5-6 segundos. Esto requeriría un poco de JS/GSAP para la rotación. GSAP podría animar la entrada/salida (p.ej. el testimonio actual se desvanece a la izquierda mientras el siguiente entra desde la derecha).
  * **Múltiples columnas:** Alternativamente, mostrar 2 o 3 testimonios a la vez en tarjetas dispuestas en rejilla. Cada tarjeta con comillas decorativas, el texto del testimonio y el nombre/foto del autor abajo.
* **Animación de Aparición:** Si se usa el enfoque de **tarjetas simultáneas**, al hacer scroll las tarjetas pueden aparecer con **fade-in** ascendentes simultáneamente. Si es un **slider**, animar cada cambio de testimonio con GSAP timeline (por ejemplo, hacer un texto salir con `x:100%` y el nuevo entrar con `x:0`).
* **Estética:** Usar comillas grandes semi-transparentes o un símbolo tatuaje de fondo en esta sección para darle un toque distintivo sin distraer del texto. Fondo podría ser blanco con texto negro para legibilidad (ya que serán párrafos de texto relativamente pequeños). Tipografía quizás en cursiva o estilizada para denotar cita, pero asegurando legibilidad.
* **Interactividad:** Asegurar que en móviles los testimonios se lean bien (si es slider, permitir swipe; si son tarjetas, quizás convertir a slider en pantallas pequeñas).

## 8. Sección de Contacto (Formulario y Ubicación)

* **Llamado a la Acción:** La sección de Contacto debe facilitar que los visitantes agenden citas o realicen consultas. Iniciar con un encabezado claro (“Contacto” o “Reserva tu cita”) y un breve texto motivador (ej. “¡Conversemos sobre tu próximo tatuaje! Completa el formulario y te responderemos pronto.”).
* **Formulario de Contacto:** Implementar un formulario sencillo pero funcional con Tailwind Forms:

  * Campos necesarios: **Nombre**, **Email** (o teléfono), **Mensaje/Descripción** del tatuaje deseado. Opcionalmente un campo para fecha preferida o adjuntar referencia (pero en esta fase quizá mantenerlo básico).
  * Usar componentes de formulario estilizados: inputs con bordes blancos o negros según fondo, que al focalizar tengan un efecto (borde resaltado, sombra). Tailwind ayuda con clases como `form-input`, etc., pero se puede personalizar para coherencia estética.
  * Validación básica en el cliente: asegurarse de requerir nombre/email, etc., mostrando mensajes de error amigables en caso de faltar algo (esto se puede hacer con HTML5 `required` y patrones, complementado con un poco de JS si se quiere mejorar).
  * *Por ahora*, dado que solo usamos Astro/GSAP/Tailwind (frontend), el formulario podría enviarse a un servicio externo o simplemente no tener backend. Se puede configurar un formulario de **Formspree** o similar para recibir los mensajes por email sin montar servidor, o dejar el botón de submit con un `mailto:`. Sin embargo, para experiencia más fluida, considerar usar Astro Endpoints o algún mecanismo ligero más adelante. En este plan, anotar que la integración de envío se puede hacer posteriormente; el foco inicial es la interfaz.
* **Información de Contacto Alternativa:** Además del formulario, proveer datos directos: número de teléfono, correo electrónico y dirección física del estudio. Muchos visitantes podrían preferir usar esos datos directamente. Presentarlos con íconos (teléfono, email, ubicación) y texto correspondiente.
* **Mapa (Opcional):** Incluir un pequeño mapa embebido de Google Maps con la ubicación del local (si relevante y la página no se vuelve muy pesada). Esto puede ponerse en un modal al hacer clic en la dirección, o insertado directamente en el footer. Se debe evaluar el impacto en rendimiento (un mapa embed es externo y puede ralentizar). Tal vez mejor un enlace “Ver en Google Maps” en vez de embed, para mantener solo Astro stack puro.
* **Animación:** Animar la aparición del formulario y elementos de contacto al scrollear:

  * Por ejemplo, hacer que el formulario suba desde abajo con una leve atenuación (ease) cuando la sección entra en pantalla.
  * Íconos de contacto podrían tener un pequeño efecto hover (e.g., moverse o cambiar de color ligeramente cuando se pasa sobre ellos).
  * No sobre-animar aquí, ya que la prioridad es usabilidad; las animaciones deben ser sutiles para no distraer del objetivo de completar el formulario.

## 9. Footer (Pie de página)

* **Contenido del Footer:** Al final de la página, incluir un footer simple que cierre el contenido:

  * Repetir el **logo** o nombre del estudio para refuerzo de marca (en pequeño).
  * Dirección física completa, teléfono y correo electrónico de contacto.
  * Horarios de atención si aplica, y enlaces rápidos (por ejemplo, a redes sociales: Instagram, Facebook). Los iconos de redes en blanco/negro, con hover que invierta color tal vez.
  * Copyright y nombre del estudio, año vigente.
* **Diseño:** Fondo negro con texto blanco (invirtiendo si sección previa fue blanca) para delimitar claramente el final. Usar tailwind utilidades de spacing para separar bien cada elemento y que en móvil se apilen verticalmente.
* **Animación Final:** Como broche visual, se puede hacer un pequeño efecto al cargar el footer: por ejemplo, una línea horizontal dibujándose arriba del footer (como separación) o un último pequeño efecto con el logo (quizá un **glitch** o destello leve a lo Rockstar, sutil). Esto añade un detalle de cierre.
* **Optimización:** Mantener el footer ligero. Evitar imágenes pesadas; si se incluye mapa o similares, asegurarse de cargarlos de forma diferida. Dado que el footer es el final, es una buena práctica que cualquier script pesado (si existiera) se ejecute después de que el usuario llegue ahí para no bloquear contenido anterior.

## 10. Animaciones GSAP y Efectos de Scroll

*(Esta sección resume las técnicas de animación a implementar globalmente con GSAP, para asegurar una experiencia cohesiva y de alto impacto.)*

* **ScrollTrigger a Pleno:** Aprovechar **GSAP ScrollTrigger**, que permite crear animaciones por scroll con relativa facilidad y flexibilidad. Se configurarán triggers para las secciones principales: galería, servicios, cada artista, etc., de modo que las animaciones se disparen exactamente al entrar en vista (o con cierto margen). Muchas animaciones usarán `scrub: true` para sincronizar con el desplazamiento (ej: efectos parallax donde el desplazamiento del usuario controla la posición del fondo).
* **Parallax y Profundidad:** Implementar **efecto parallax** en varias partes para dar profundidad a la página:

  * En el Hero: capas (por ejemplo, podría haber humo o tinta en SVG por encima del video, moviéndose más lento que el video al scroll o al mover mouse, creando realismo).
  * En las secciones de artistas: fondos o imágenes de tatuajes moviéndose a distinta velocidad que el texto frontal.
  * GSAP facilita estos efectos con pequeñas configuraciones (mover X pixels al scroll, o usar porcentajes de desplazamiento de fondo). La experiencia GTA VI clónica enfatiza estas capas para lograr dramatismo.
* **Timeline Narrativas:** Usar **GSAP Timelines** para secuenciar animaciones complejas. Por ejemplo, la animación de introducción (logo + video) estará en una timeline que combina varias animaciones en orden. Igual para cada historia de artista, se puede definir una timeline que abarque texto e imágenes, vinculada a ScrollTrigger con pinning para que la timeline se reproduzca a lo largo de la estancia en esa sección. Esto asegura sincronización y un flujo suave (sin tener que manejar cada animación por separado manualmente).
* **Video Controlado por Scroll:** Evaluar la posibilidad de reproducir o **scrub de video según scroll** en alguna sección (posiblemente el Hero o quizás un clip en la historia de un artista). GSAP ScrollTrigger puede controlar el tiempo de un video frame a frame vinculándolo al progreso de scroll. Por ejemplo, si se tuviera un video corto de una gota de tinta expandiéndose, se podría sincronizar para que a medida que el usuario baja, el video avance. Esta técnica requiere videos con suficientes keyframes para que saltar entre frames sea fluido, y es más avanzada, por lo que su implementación dependerá de contar con contenido de video adecuado.
* **Efectos de Transición Globales:** Además de animaciones dentro de secciones, definir transiciones al cambiar de sección:

  * Usar *fade-outs* de la sección anterior mientras la nueva hace *fade-in*, para no tener cambios bruscos. Esto puede lograrse, por ejemplo, superponiendo ligeramente las secciones en el scroll timeline y ajustando opacidad.
  * Otra opción es usar un elemento global (como un div negro o blanco) que brevemente cubra la pantalla entre secciones (un destello o blink muy rápido) para simular estilo cinematográfico. Debe usarse con moderación para no marear.
* **Consistencia y Calidad:** Asegurar que las animaciones sean **coherentes** en estilo (eases suaves tipo `power2.out` o similares para que los movimientos se sientan fluidos, no bruscos). Mantener tiempos consistentes (por ej., todas las fade-ins duran \~0.5s). Probar distintos efectos pero priorizando que la atención del usuario se dirija a lo importante (p.ej., en testimonios, la animación no debe hacer difícil leer el texto). En resumen, las animaciones deben realzar la narrativa visual sin comprometer la usabilidad.

## 11. Optimización Rigurosa del Rendimiento

* **Carga eficiente:** Aunque el sitio tendrá muchos elementos visuales y animados, es crucial que cargue rápido. Optimizar recursos desde el comienzo:

  * Comprimir imágenes y videos al máximo sin pérdida de calidad perceptible (herramientas como Imagemin, Squoosh, ffmpeg for video encoding con keyframes suficientes).
  * Usar formatos modernos (WebP/AVIF para imágenes, MP4/H.264 o WebM para videos, según compatibilidad).
* **Lazy Loading Selectivo:** Cargar diferidamente aquello que no se ve de inicio. Astro genera HTML estático; se puede marcar secciones pesadas (como la galería, testimonios) para que no bloqueen la carga inicial. Por ejemplo, usar el componente Astro `client:idle` o `IntersectionObserver` para inicializar ciertas animaciones solo cuando el usuario llega a ellas. También, no iniciar todos los GSAP tweens al mismo tiempo; usar ScrollTrigger para que solo activen al necesitarse.
* **Evitar *Layout Thrashing*:** Organizar las animaciones GSAP para evitar re-calcular layout en exceso. GSAP internamente ya optimiza muchas cosas (convierte transformaciones 2D en 3D para activar GPU, y agrupa escrituras/lecturas del DOM para evitar intercalar cálculos de estilos). Aún así, el desarrollador debe:

  * Animar propiedades transformables (translate, scale, rotate) y opacidad preferentemente, en lugar de cosas como `width`/`height` directos que fuerzan *reflows*.
  * Si se necesita medir posiciones (por ej., para efecto scroll parallax personalizado), hacerlo fuera de animación frames (o usar funcionalidades de GSAP como `ScrollTrigger.batch` que optimiza triggers múltiples).
* **Astro y División de Código:** Astro, al exportar, dividirá el JS en *chunks*. Asegurarse de marcar componentes sin animación como estáticos para que no carguen JS innecesario. Solo las partes con GSAP deberían hidratarse en cliente. Esto minimiza el bundle al cliente.
* **Monitorizar Performance:** Durante el desarrollo, usar **Lighthouse** y **Chrome DevTools Performance** para revisar FPS durante scroll y uso de CPU/GPU. Identificar si alguna animación causa jank (tirones) e iterar hasta suavizarla. Intentar mantener FPS cercanos a 60fps incluso con animaciones intensas (quizá reduciendo cantidad de elementos animados simultáneamente o simplificando efectos en móviles).

## 12. Pruebas y Control de Calidad Continuos

* **Pruebas en Dispositivos:** Probar el sitio en múltiples navegadores (Chrome, Firefox, Safari) y dispositivos (desktop, móvil Android, iPhone). Las animaciones de scroll a veces difieren en móvil (por ejemplo, ScrollTrigger maneja diferente el scroll en iOS). Ajustar configuraciones como `ScrollTrigger.normalizeScroll()` o asegurarse de la compatibilidad táctil. Verificar que en dispositivos de gama baja el rendimiento siga siendo aceptable; en caso contrario, considerar degradar ciertas animaciones (p. ej., desactivar video autoplay o efectos muy pesados en móviles antiguos).
* **Testing de Funcionalidad:** Asegurar que la navegación por anclas del header funcione correctamente en toda circunstancia (no se rompa por la manipulación de scroll de GSAP). Probar el formulario de contacto (si se integra con Formspree u otro, verificar envíos reales).
* **Accesibilidad (a11y):** Revisar semántica HTML: encabezados ordenados, texto alternativo en imágenes, labels en campos de formulario. Comprobar contrastes de color (blanco vs negro es excelente contraste, pero si se usa gris, que cumpla WCAG AA). Navegar solo con teclado para ver que puede accederse a todo (especialmente el menú de navegación y formulario). Animaciones: evitar flashes que puedan molestar, y quizá ofrecer una forma de reducir animaciones (prefers-reduced-motion media query) para usuarios que lo requieran.
* **Pruebas Automatizadas (opcional):** Si es factible, escribir algunos tests:

  * *Unit tests* para componentes puros (por ejemplo, formateo de entradas, aunque la mayoría es UI estática).
  * *E2E tests* con Playwright o Cypress para verificar que secciones aparecen, enlaces navegan (scroll) correctamente, etc. Esto puede ser complejo con animaciones, pero al menos validar que el contenido renderiza y no hay errores JS en consola.
* **Contenido:** Revisar textos e imágenes con el cliente (dueños del estudio) para asegurarse que las historias de tatuadores y testimonios sean correctos. Tener un ciclo de feedback durante el desarrollo de cada sección para ajustar tono y estilo.

## 13. Despliegue y Monitorización

* **Build y Hosting:** Generar la versión estática optimizada (`npm run build`) de Astro. Aprovechar que Astro produce un sitio estático (por lo general) para desplegar en un hosting de CDN:

  * Plataformas recomendadas: **Vercel**, **Netlify** o **Cloudflare Pages**, por su facilidad con Astro. Por ejemplo, configurar en Vercel el proyecto (detectará Astro) y cada push a `main` hará deploy automático con dominio personalizado (cubatattoostudio.com).
  * Asegurarse de configurar encabezados de caché adecuados para assets (Vercel lo hace automáticamente en muchos casos).
* **Dominio y SSL:** Si *cubatattoostudio.com* está registrado, apuntarlo al despliegue (Vercel/Netlify dan instrucciones DNS). Verificar que el certificado SSL funcione (HTTPS).
* **Monitorización de Rendimiento:** Implementar herramientas para seguimiento post-lanzamiento:

  * **Analytics:** Integrar Google Analytics 4 u otra alternativa para conocer visitas y comportamiento (tiempo en página, scroll depth quizás).
  * **RUM & Performance Monitoring:** Opcionalmente, usar algo como **Sentry** para capturar errores de JS en producción (p.ej., si alguna animación falla en un navegador específico, poder enterarse). Dado que es un sitio estático, los errores deberían ser mínimos, pero GSAP o Formspree podrían arrojar alguno inesperado en ciertos entornos.
  * **Auditoría Final:** Tras despliegue, correr Lighthouse en producción para obtener métricas de performance, accesibilidad y SEO. Chequear puntajes y, si alguno es bajo, planear parches (por ejemplo, si Largest Contentful Paint es alto por el video, pensar en carga diferida o poster image).

## 14. Mantenimiento Futuro y Escalabilidad

* **Añadir Nuevos Artistas:** El sitio está preparado para crecer de forma modular. Para agregar un tatuador nuevo, simplemente crear un nuevo componente de artista y añadirlo a la sección de Tatuadores. Gracias a Astro (componentes) y la arquitectura actual, esto no afectará a otros componentes. Se documentará el proceso para que futuros desarrolladores o el mismo equipo puedan hacerlo con facilidad.
* **Actualización de Contenido:** Establecer un flujo para mantener galerías y testimonios actualizados. Por ejemplo, cada cierto tiempo agregar nuevas fotos destacadas a la Galería (asegurando optimización). Los testimonios también pueden rotar o incrementarse; quizás implementar un sistema básico para que no crezca indefinidamente (mostrar los N más recientes o seleccionar aleatorios en cada despliegue).
* **Optimización Continua:** Monitorizar cómo usa la gente el sitio (con Analytics) y hacer mejoras basadas en datos reales. Por ejemplo, si se detecta que pocos usuarios llegan al final, quizás agregar un botón “Ir al inicio” en el footer o revisar la longitud de la página. O si alguna animación causa que usuarios abandonen (difícil de saber, pero feedback cualitativo puede ayudar), ajustar la experiencia.
* **Features Futuras:** Identificar funcionalidades a implementar más adelante una vez cubierta la fase inicial:

  * **Sistema de Citas Online:** Posiblemente integrar un sistema de reservas (como mencionaba la integración con Google Calendar en el plan original). Esto se podría lograr con un formulario más avanzado o integrando alguna API de calendario. Si se añade, hacerlo de forma progresiva para no afectar la performance principal de la página.
  * **Tienda o Blog:** Si en el futuro desean vender merchandising o publicar artículos (ej. cuidados del tatuaje), planificar secciones adicionales o subpáginas. Astro soporta páginas estáticas adicionales si se necesitara (p.ej., `/blog`), pero manteniendo la One-Page para la homepage.
  * **Versión en Inglés (Multilenguaje):** Dado que el estudio pudiera tener público internacional, considerar internacionalización. Astro tiene integración i18n para múltiples idiomas, se podría planear duplicar el contenido en inglés más adelante, manteniendo la estructura. Por ahora, todo en español hasta que surja la necesidad.

## 15. Consideraciones de Seguridad y Mejores Prácticas

* **Seguridad en Formularios:** Cuando el formulario de contacto tenga manejo real (backend o servicio externo), asegurarse de implementar validaciones del lado servidor y evitar inyecciones. Usar reCAPTCHA v3 o similar si se empieza a recibir spam a través del formulario. Por ahora, con un servicio básico de email, considerar al menos un campo oculto *honeypot* para bots.
* **Actualización de Dependencias:** Mantener Astro, GSAP y Tailwind actualizados a sus últimas versiones estables. Estos proyectos lanzan parches que mejoran rendimiento y seguridad. Hacer revisión periódica (mensual/trimestral) de dependencias (`npm audit` para ver vulnerabilidades).
* **Contenido Moderado:** Si se permiten comentarios en testimonios o integración con redes sociales en el futuro, moderar contenido para evitar que aparezca algo inapropiado en la página. Actualmente, todo el contenido es curado manualmente, lo cual es seguro.
* **Buenas Prácticas de Desarrollo:** Continuar siguiendo patrones limpios: código accesible (evitar texto incrustado en imágenes, etc.), estructura de archivos organizada (componentes por carpeta de secciones, estilos en archivos separados si usan CSS modules o uno global tailwind). Documentar cualquier atajo o decisión técnica inusual para futuros desarrolladores.

## 16. Documentación Completa

* **README del Proyecto:** Mantener el `README.md` del repositorio actualizado, describiendo cómo correr el proyecto, cómo hacer build y deploy, y cualquier requerimiento (por ejemplo “necesita Node vX”). Incluir capturas o un gif corto de la interfaz final para contexto.
* **Comentarios en Código:** En componentes Astro y scripts GSAP, añadir comentarios breves explicando las secciones de animación más complejas. Por ejemplo, documentar qué hace cada timeline GSAP, para facilitar ajustes en el futuro sin romper nada.
* **Guía de Contenido:** Preparar (en Notion, Google Doc o Markdown) una pequeña guía para el cliente sobre cómo actualizar contenido básico. Aunque no es un CMS, se le puede indicar qué archivos JSON o MD tocar si quisieran cambiar un texto de testimonio, por ejemplo, o instruir que contacten al desarrollador para cambios más profundos.
* **Changelog:** Registrar en un CHANGELOG las mejoras o cambios significativos por versión (especialmente si el sitio evoluciona integrando nuevas features como las mencionadas de citas, idiomas, etc.). Esto ayuda a rastrear qué se hizo y cuándo, útil para depuración y para futuros colaboradores.

## 17. Colaboración y Control de Versiones

* **Git Flow:** Seguir un flujo de trabajo Git disciplinado. Desarrollar nuevas secciones o features en ramas `feature/mi-feature`, probarlas y luego fusionar a `develop` para integración. Solo desplegar a producción desde `main` una vez comprobado. Hacer *commits* descriptivos que indiquen qué se hizo (ej. `feat: animación intro GSAP en Hero` en vez de `update`).
* **Revisiones de Código:** Si hay más de un desarrollador, implementar *pull requests* para integrar cambios, con revisión mutua para mantener calidad y para difundir conocimiento del código entre el equipo.
* **Gestión de Tareas:** Usar herramientas como GitHub Projects o Trello para organizar las tareas definidas en este plan, marcando el progreso en cada sección (Hero, Galería, etc.) y aspectos transversales (optimización, pruebas). Esto asegurará que nada se pase por alto.
* **Comunicación con Cliente:** Mantener contacto frecuente con los dueños del estudio para mostrar avances (por ejemplo, desplegar una versión staging accesible para que la revisen). Recoger feedback sobre si las animaciones se alinean con lo que imaginaban; quizás hasta pedirles que comparen la experiencia con la referencia GTA VI para validar si el *feeling* es el esperado. Ajustar iterativamente según sus impresiones.

En resumen, este plan integrará la potencia de **Astro** (rendimiento y estructura), la flexibilidad visual de **Tailwind CSS** y las **animaciones avanzadas de GSAP** para entregar un sitio One-Page espectacular y eficaz. Al final, CubaTattooStudio.com contará una historia en cada scroll: desde la **entrada cinematográfica** hasta las **historias de cada tatuador**, envolviendo al visitante en la experiencia del estudio, todo mientras se mantiene rápido, accesible y fácil de mantener en el largo plazo. ¡Manos a la obra!
