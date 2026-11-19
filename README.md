# Portfolio multimedial de Abril Mancuso

Soy Abril Mancuso, estoy cursando 4.º año de la Licenciatura en Tecnología Multimedial (UMAI) y me presento como Project Manager & Diseñadora UX/UI. Este es mi proyecto individual para Programación Multimedial IV (2026).

Armé el sitio con AstroJS. Tengo la presentación, cuatro casos reales, el proceso de trabajo y una herramienta que cruza mi huso con el de otra ciudad para armar una propuesta de servicios. Cada proyecto tiene su propia URL, así que puedo mandarlo sin obligar a nadie a pasar por un modal. Está pensado para recruiters y equipos de producto, diseño y tecnología que buscan un perfil híbrido de PM y UX/UI. También sirve para que clientes o estudios conozcan cómo trabajo antes de coordinar una reunión.

## Datos rápidos

| Campo | Valor |
| --- | --- |
| Autora | Abril Mancuso |
| Materia | Programación Multimedial IV |
| Año | 2026 |
| Tipo | Proyecto individual |
| Repositorio | [github.com/abrumancuso/portfolio-2026](https://github.com/abrumancuso/portfolio-2026) |
| Deploy | `<COMPLETAR_URL_DEL_DEPLOY>` |
| Stack | AstroJS 6.4.8, HTML, CSS, TypeScript/JavaScript |
| API externa | Open-Meteo (geocoding + forecast de zona horaria) |
| Componentes propios | `ProjectExplorer`, `WorkflowSimulator`, `AgileRitualCalculator` |
| Evidencia de proceso | [PROCESO.md](./PROCESO.md) |

El repositorio ya está publicado. El deploy todavía no: cuando lo suba completo la URL de arriba y el `Sitemap:` de `public/robots.txt`.

## Qué hay en el sitio

La home tiene seis anclas: `#inicio`, `#sobre-mi`, `#proyectos`, `#proceso`, `#rituales` y `#contacto`. En la navegación, el ancla `#rituales` se llama Servicios. La navegación queda fija y marca la sección activa.

La presentación vive en el Hero y en una sola sección "Sobre mí". No separé perfil, enfoque y trayectoria en tres bloques porque terminaba repitiendo lo mismo. El proceso de trabajo tiene su propio componente interactivo.

En Proyectos dejo claro que muestro una selección de algunos trabajos, no todos. El portfolio completo de diseño e identidad está en [Behance](https://www.behance.net/abrilmancuso).

| Proyecto | Año | Formato | Ruta |
| --- | --- | --- | --- |
| Billie Eilish Argentina Tour | 2024 | Video · Motion | `/proyectos/billie-animation` |
| MacBook Pro Model | 2025 | 3 renders · 3D | `/proyectos/macbook-3d` |
| MaimoConecta | 2025 | 45 imágenes · Caso UX | `/proyectos/maimoconecta` |
| Tini — Manual de Marca | 2025 | 9 páginas · Identidad | `/proyectos/manual-marea` |

Las rutas salen de `getStaticPaths()` leyendo `src/data/projects.ts`. Cada página trae el caso completo, el video o la galería con parallax, las dos lecturas del proyecto (UX/UI & Producto y Gestión & Arquitectura Técnica), métricas, aprendizajes, un cierre con contacto y los links al proyecto anterior y siguiente.

## Tecnología y estructura

Elegí AstroJS 6.4.8 porque el contenido pesa más que la aplicación. El sitio se genera en HTML estático y el JavaScript aparece recién donde hace falta interactividad. No necesité React, Next.js ni una SPA: me habrían sumado hidratación y estado global sin mejorar lo que el portfolio necesita mostrar.

| Parte | Qué usé | Para qué |
| --- | --- | --- |
| Sitio | AstroJS 6.4.8 con `output: 'static'` | HTML, CSS y JS listos para cualquier hosting de archivos. |
| Datos y lógica | TypeScript y JavaScript | Tipos para proyectos, etapas y resultados de la API, más los scripts de cliente. |
| Estilos | CSS con custom properties | Paleta, tipografía, grid, flexbox, `clamp()` y `prefers-reduced-motion` sin dependencias. |
| Navegador | `fetch`, `Intl.DateTimeFormat`, `localStorage`, `<video>` | Consultar la API, calcular husos, recordar la mirada elegida y reproducir el caso de motion. |
| Historial | Git y GitHub | Commits por etapas y perfil profesional. GitHub no alimenta el sitio. |

Los archivos que más se usan son estos:

```text
src/
├── components/     Hero, About, Nav, Footer, ProjectExplorer, WorkflowSimulator,
│                   AgileRitualCalculator, ProjectCard, ProjectMedia, ProjectGallery
├── data/           site.ts, projects.ts, miradas.ts, workflow.ts
├── layouts/        BaseLayout.astro
├── pages/          index.astro y proyectos/[id].astro
└── styles/         global.css
public/             media/, perfil.jpg, favicon.svg, robots.txt, llm.txt, llms.txt
```

También dejé `robots.txt`, `llm.txt` y `llms.txt` (idénticos, con los dos nombres por convención) para que buscadores y asistentes encuentren el perfil, los proyectos y los contactos sin interpretar el HTML.

## Los tres componentes propios

### ProjectExplorer

Acá se exploran los cuatro casos. Arriba hay un selector con dos miradas: "UX/UI & Producto" y "Gestión & Arquitectura Técnica". Según cuál elija, cambian los textos destacados y los metadatos que se resaltan. Guardo la elección en `localStorage` con la clave `portfolio-mirada`, para que no se pierda al recargar.

Después están los filtros por área, la búsqueda por título, herramienta o rol, y dos vistas: galería visual y ficha técnica. El contador de resultados se anuncia con `aria-live` y hay un estado vacío con botón para limpiar filtros. Cada tarjeta abre la página individual del proyecto.

### WorkflowSimulator

Es un tablero de cinco etapas: Discovery & UX Research, Definición & Priorización, Wireframing & UI Design, Handoff & Desarrollo y Testing & Accesibilidad. Al pasar de etapa se ven los entregables, las herramientas y las preguntas que se resuelven en cada momento.

Los tabs funcionan con teclado (flechas, Home y End) y el panel activo se anuncia. Puse las etapas en este orden porque es el recorrido que sigo cuando explico cómo trabajo en el final.

### AgileRitualCalculator

El nombre quedó de cuando esto era una calculadora de rituales ágiles. Hoy es un generador de propuestas de servicio. En el Paso 1 indicás la ciudad del equipo y en el Paso 2 elegís qué necesitás: Manejo de redes, Diseño de web, Revisión de diseño, Rebranding o Gestión de proyectos.

Con eso la herramienta muestra la hora de las dos ciudades, la diferencia de husos, el texto de la propuesta, los tres puntos del abordaje, el entregable y una franja de 30 minutos sugerida. El botón final arma un mail con el servicio y el horario ya cargados. Todo termina en contacto directo, que es lo que busco con esta sección.

## La API: dónde está y qué hace

Está en la sección Servicios (`#rituales`), después de Proceso y antes del footer. Arriba del panel se ven el badge de estado y el texto `Open-Meteo · geocoding + zonas horarias · sin API key`. No hay backend ni credenciales: las consultas las hace el navegador.

```text
GET https://geocoding-api.open-meteo.com/v1/search?name={ciudad}&count=5&language=es&format=json
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&timezone={zona IANA}
```

El geocoding alimenta el buscador y devuelve hasta cinco ciudades con nombre en español. El forecast se usa solo por `utc_offset_seconds` y `timezone_abbreviation`. Saqué el clima de una versión anterior porque me daba datos lindos pero no cambiaba la recomendación, y prefiero no explicar algo que después no incide en la decisión.

Para calcular tomo la ventana de 9:00 a 18:00 en cada ciudad y la corro según la diferencia de husos. El índice de 0 a 100 suma hasta 55 puntos por horas compartidas, hasta 25 por el servicio elegido y hasta 20 por estar en horario laboral en las dos ciudades. Con 60 o más muestro reunión inicial, entre 35 y 59 la dejo para una franja corta con el resto por escrito, y abajo de 35 o sin solapamiento paso a async. Cuando hay bloque, elijo los 30 minutos a partir de las 10:00 de Buenos Aires y lo traduzco a la hora del equipo.

| Estado | Badge | Cuándo aparece |
| --- | --- | --- |
| Carga | `Cargando datos…` | Al entrar, al cambiar de ciudad o al reintentar. |
| Éxito | `Contenido disponible` | La API respondió y ya hay propuesta. |
| Selección | `Servicio seleccionado` | Cambiaste el servicio y se recalculó el panel. |
| Vacío | `Sin resultados` | El buscador no encontró esa ciudad. |
| Error | `Error de conexión` | Falló la red, el HTTP no fue OK o activaste el offline simulado. |
| Respaldo | `Contenido disponible` | Usaste husos calculados en el navegador, sin datos en vivo. |

Para demostrar los estados dejé seis hubs sugeridos (San Francisco, Madrid, Ciudad de México, Londres, Berlín y São Paulo), búsqueda libre con debounce de 380 ms, el botón "Simular modo offline", "Reintentar conexión" y "Usar husos de respaldo". El reloj se refresca cada 30 segundos mientras el panel está en éxito o selección.

Antes de quedarme con Open-Meteo probé otras APIs (color, proto-personas, Hacker News e iTunes). Funcionaban, pero me obligaban a explicar contenido ajeno al portfolio. Esta es pública, no pide token, junta geocoding y husos en un mismo lugar y puedo defenderla en vivo sin depender de credenciales.

Sé que es un servicio externo: puede fallar o tardar, y no hay caché compartida porque no hay backend. La ventana de 9:00 a 18:00 es una referencia, no la jornada real de cada equipo. El respaldo usa `Intl.DateTimeFormat` y, si no conoce la zona, estima por longitud. No guardo búsquedas ni datos personales.

## Diseño y accesibilidad

Me quedé con una paleta de cuatro colores: crema `#FFF8DC`, ciruela `#6C0345`, terracota `#DC6B19` y mostaza `#F7C566`, más tinta `#3B0A24` para el texto. Las tipografías son Anton para los títulos, Instrument Serif en itálica para los acentos, Plus Jakarta Sans para cuerpo e interfaz y Space Mono para etiquetas. Elegí ese contraste y esos recortes, cintas y dibujos a mano para que el portfolio se reconozca como algo mío y no como un template.

En accesibilidad cubro lo que se ve y se navega: skip link, landmarks, jerarquía de encabezados, foco visible, `aria-current` en la navegación, tabs y combobox con teclado, anuncios con `aria-live` y `aria-busy` en la carga. El parallax se apaga con `prefers-reduced-motion` y por debajo de 820 px.

En mobile paso el Hero a una columna, el menú a desplegable, las tarjetas a una columna y el tablero del proceso a scroll horizontal. Me falta una auditoría formal con lector de pantalla. El video de Billie tampoco tiene subtítulos ni audiodescripción, y lo aviso en la propia página del caso.

## Proceso, IA y errores que corregí

Trabajé por etapas y dejé commits separados: estructura base, identidad visual, datos y explorador, componentes, páginas de proyecto, accesibilidad y responsive, rediseño editorial y cierre de textos y archivos para agentes. Después hice otros commits puntuales para corregir los problemas que aparecieron en la revisión visual.

La IA me ayudó a escribir más rápido el andamiaje inicial de Astro, los tipos de TypeScript, el HTML repetitivo de tarjetas y la documentación. También me sirvió para revisar estados asíncronos y para pensar cómo demostrar el error y el respaldo de la API. Yo elegí los proyectos, escribí los textos, definí la paleta y decidí qué APIs probar y cuál descartar. Cada cambio lo leí y lo probé en el servidor de desarrollo antes de commitearlo.

Tres errores reales que me tiró y tuve que arreglar:

1. Las tarjetas del Paso 2 quedaban blancas cuando las seleccionaba. Había una regla con `:nth-child` que pisaba el color del estado `aria-pressed="true"`. La corregí excluyendo justo las tarjetas seleccionadas y reforcé el fondo mostaza.
2. Los títulos con Ñ se cortaban contra la línea de arriba. El interlineado de la tipografía display era demasiado ajustado. Subí `line-height` a 1.12 y dejé `overflow: visible` en los encabezados.
3. En la cabecera de los proyectos se veía el texto literal `<strong>` en vez de la palabra destacada. Los datos vienen con HTML acotado y yo lo estaba escapando. Lo rendericé con `set:html` en los campos que corresponden.

El detalle de las decisiones descartadas y una guía para la defensa en vivo están en [`PROCESO.md`](./PROCESO.md).

## Limitaciones y posibles mejoras

Hoy el video de Billie no tiene subtítulos ni audiodescripción, y eso está avisado en la página del caso. La herramienta de Servicios toma la jornada de 9 a 18 hs como referencia estándar, así que la franja sugerida puede necesitar un ajuste manual. Dependemos de Open-Meteo para los datos en vivo y no hay caché en servidor: cada visita consulta la API. La accesibilidad la revisé a mano, sin una auditoría completa con lector de pantalla.

Después quiero seguir por estos pasos:

- Agregar subtítulos al video de Billie y, si puedo, una audiodescripción corta.
- Conectar el botón final de Servicios a un calendario real (Cal.com o Calendly) en vez de abrir el cliente de mail.
- Sumar una versión en inglés del portfolio.
- Cargar próximos casos de UX Research.

## Cómo correrlo

Necesitás Node.js `>= 22.12.0`, que es lo que pide `package.json`. Astro 6.4.8 es la versión que dejé funcionando con ese entorno.

```bash
npm install
npm run dev
npm run build
npm run preview
```

El servidor de desarrollo abre en `http://localhost:4321`. La build sale en `dist/`. No hay variables de entorno ni secretos.

El sitio es estático, así que sirve para Vercel, Netlify o GitHub Pages. En GitHub Pages, si el repo queda como project page, hay que ajustar el `base` en `astro.config.mjs` y las rutas absolutas de los assets. Todavía no publiqué el deploy desde acá.

## Contacto, créditos y licencias

Me podés escribir a [abrilmancusoumai@gmail.com](mailto:abrilmancusoumai@gmail.com). También estoy en [Behance](https://www.behance.net/abrilmancuso), [LinkedIn](https://linkedin.com/in/abrilmancuso) y [GitHub](https://github.com/abrumancuso). Los proyectos, las imágenes y los textos son míos. Las tipografías vienen de Google Fonts y los datos en vivo de [Open-Meteo](https://open-meteo.com/). Las tipografías de Google Fonts están bajo la SIL Open Font License 1.1. Los datos de Open-Meteo se usan con fines públicos y no comerciales, bajo licencia CC BY 4.0.
