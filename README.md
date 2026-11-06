# Portfolio multimedial — Abril Mancuso

Portfolio personal y académico construido con AstroJS para la materia **Programación Multimedial IV (2026)**. El posicionamiento profesional es **Project Manager & Diseñadora UX/UI**, con formación técnica multimedial y experiencia en el ciclo completo de productos digitales.

El sitio no se limita a mostrar piezas: presenta **cómo se investiga, se planifica, se diseña y se implementa un producto digital**. Para eso incluye tres componentes propios con lógica real, páginas individuales para cada proyecto y una calculadora de rituales ágiles conectada a Open-Meteo.

---

## 1. Datos del proyecto

| Campo | Valor |
| --- | --- |
| Autora | Abril Mancuso |
| Materia | Programación Multimedial IV |
| Año | 2026 |
| Tipo | Proyecto individual |
| Repositorio | [github.com/abrumancuso/portfolio-2026](https://github.com/abrumancuso/portfolio-2026) |
| Deploy | `<COMPLETAR_URL_DEL_DEPLOY>` |
| Stack principal | AstroJS 6.4.8, HTML, CSS, TypeScript/JavaScript |
| API externa | Open-Meteo (geocoding + forecast) |
| Componentes propios | `ProjectExplorer`, `WorkflowSimulator`, `AgileRitualCalculator` |

> El repositorio ya está publicado. La URL de deploy se completa al publicar; el proyecto genera una build estática lista para cualquier hosting.

---

## 2. Descripción general

El portfolio es una experiencia de una sola página con seis bloques y páginas individuales para los casos:

1. **Hero** (`#inicio`): presentación profesional de Abril Mancuso.
2. **Sobre mí** (`#sobre-mi`): perfil, diferencial y propuesta de valor.
3. **Proyectos** (`#proyectos`): selección de cuatro casos con selector de enfoque, filtros, búsqueda y dos vistas.
4. **Proceso** (`#proceso`): simulador interactivo de las cinco etapas de trabajo.
5. **Rituales** (`#rituales`): calculadora interactiva de rituales ágiles con hora y clima en vivo de Open-Meteo.
6. **Contacto** (`#contacto`): email, Behance, LinkedIn y GitHub.

Cada proyecto tiene además una **página propia** en `/proyectos/[id]` con el caso completo, la galería o el video, las dos lecturas del proyecto, el proceso técnico, las métricas, los aprendizajes y la navegación al proyecto anterior y siguiente.

La sección de proyectos aclara de forma visible que se trata de **una selección de algunos proyectos**, no de la totalidad. El portfolio completo de diseño e identidad está disponible en Behance.

### Proyectos incluidos

- **Billie Eilish — motion graphics**: pieza audiovisual vertical.
- **MacBook Pro 3D**: visualización y renders 3D.
- **MaimoConecta**: proyecto de diseño estratégico y UX con 45 slides.
- **Tini — Manual de Marca**: sistema de identidad visual de 9 páginas.

### Páginas individuales

| Proyecto | Ruta |
| --- | --- |
| Billie Eilish Argentina Tour | `/proyectos/billie-animation` |
| MacBook Pro Model | `/proyectos/macbook-3d` |
| MaimoConecta | `/proyectos/maimoconecta` |
| Tini — Manual de Marca | `/proyectos/manual-marea` |

Las rutas se generan en build time con `getStaticPaths()` a partir de `src/data/projects.ts`.

---

## 3. Tecnologías usadas y justificación

### AstroJS 6.4.8

Astro permite construir un sitio **estático, rápido y con muy poco JavaScript**, pero con arquitectura de componentes. Es el equilibrio adecuado para un portfolio: el contenido pesa más que la aplicación y la interactividad se concentra solo donde aporta valor.

- `output: 'static'`: genera HTML, CSS y JS listos para cualquier hosting de archivos.
- Componentes `.astro`: reutilización de secciones, tarjetas, páginas de proyecto y datos.
- Rutas dinámicas estáticas: `/proyectos/[id]` con `getStaticPaths()`.
- Islas de interactividad: los scripts se cargan solo en los componentes que los necesitan.
- Sin framework de UI adicional: no hay necesidad de React, Vue o Svelte para este alcance.

### HTML semántico y CSS

- Landmarks (`header`, `nav`, `main`, `article`, `section`, `footer`), jerarquía de encabezados y listas reales.
- CSS con custom properties para tokens de color, tipografía, radios, transiciones y layout.
- Grid y flexbox para responsive sin dependencias externas.
- `clamp()` para tipografía fluida y espaciado.
- `prefers-reduced-motion` para desactivar animaciones.

### TypeScript / JavaScript

- Tipos para `Project`, `MiradaId`, `WorkflowStage`, `Hub`, `CityWeather`, `Ritual` y `Plan`.
- Datos centralizados y tipados en `src/data/`; la configuración de la calculadora se serializa a JSON desde el frontmatter del componente.
- Scripts de cliente para el selector de proyectos, filtros, vistas, tabs del proceso, búsqueda de ciudades con debounce, cálculo de husos y solapamiento, diagnóstico del ritual y carrusel de imágenes.

### APIs nativas del navegador

- `fetch` para Open-Meteo (geocoding y forecast), sin claves ni backend.
- `Intl.DateTimeFormat` con `timeZoneName: 'longOffset'` para obtener el huso real de cada ciudad y construir el respaldo local.
- `localStorage` para recordar el enfoque elegido en proyectos.
- `<video>` para la pieza audiovisual.

### Git y GitHub

- Historial de commits progresivos que documenta la construcción.
- Repositorio local nuevo, sin arrastrar el historial anterior.
- GitHub se mantiene como perfil profesional y enlace de contacto, pero no se usa como fuente de datos del portfolio.

### ¿Por qué no React, Next.js o una SPA?

Porque el problema no lo requiere. El portfolio es principalmente contenido con interacciones acotadas. Astro reduce el JavaScript enviado, mejora el tiempo de carga y mantiene el HTML accesible desde el primer render. Una SPA agregaría complejidad de routing, hidratación y estado global sin un beneficio claro para este caso.

---

## 4. Arquitectura de la información

### Estructura de la página principal

```
Inicio (#inicio)
  └── Sobre mí (#sobre-mi)
        └── Proyectos (#proyectos)
              └── Proceso (#proceso)
                    └── Rituales (#rituales)
                          └── Contacto (#contacto)
```

La navegación es fija, indica la sección activa con `aria-current="location"` y en mobile se transforma en un menú desplegable. En las páginas de proyecto, el link de Proyectos queda marcado con `aria-current="page"` y los enlaces vuelven al inicio con rutas absolutas (`/#...`).

La presentación se resolvió en **Hero + una sola sección “Sobre mí”**. No hay secciones separadas de perfil, enfoque y trayectoria: el texto personal está unificado y el proceso de trabajo vive en un componente interactivo propio.

### Capas del proyecto

| Capa | Archivos | Responsabilidad |
| --- | --- | --- |
| Datos | `src/data/site.ts`, `projects.ts`, `miradas.ts`, `workflow.ts` | Contenido editorial, proyectos, enfoques de lectura y etapas del proceso. |
| Layout | `src/layouts/BaseLayout.astro` | Documento, fuentes, skip link, navegación y footer. |
| Presentación | `src/components/Hero.astro`, `About.astro` | Hero y sección única “Sobre mí”. |
| Proyectos | `ProjectExplorer.astro`, `ProjectCard.astro`, `ProjectMedia.astro` | Selector de enfoque, filtros, búsqueda, vistas, tarjetas, galería y video. |
| Páginas de proyecto | `src/pages/proyectos/[id].astro` | Caso completo, dos lecturas, métricas, aprendizajes y navegación entre proyectos. |
| Proceso | `WorkflowSimulator.astro` | Tablero/timeline interactivo de las cinco etapas de trabajo. |
| API | `AgileRitualCalculator.astro` | Búsqueda de ciudades, husos horarios, solapamiento, diagnóstico del ritual y respaldo local. |
| Sistema visual | `src/styles/global.css` + estilos scoped | Tokens, reset, utilidades, accesibilidad y patrones compartidos. |
| Assets | `public/media/`, `public/perfil.jpg` | Imágenes, posters y video de los proyectos. |

### Flujo de datos

1. Los datos editoriales viven en módulos TypeScript.
2. Los componentes `.astro` los importan en build time y generan HTML estático.
3. `getStaticPaths()` genera una página por cada proyecto.
4. Los scripts de cliente agregan comportamiento sobre ese HTML ya renderizado.
5. Open-Meteo se consulta en el navegador; si falla, los husos se calculan localmente con `Intl.DateTimeFormat` y la calculadora sigue funcionando con datos de respaldo.

---

## 5. Los tres componentes propios relevantes

### 5.1 `ProjectExplorer` — Matriz interactiva de proyectos y selector de enfoque

**Archivos:**

- `src/components/ProjectExplorer.astro`
- `src/components/ProjectCard.astro`
- `src/data/projects.ts`
- `src/data/miradas.ts`

**Responsabilidad:** explorar la selección de proyectos y cambiar el foco de lectura según el rol profesional.

**Interacción significativa obligatoria:** arriba de los proyectos hay un selector visible con dos estados:

- **Mirada UX/UI & Producto**: destaca el problema de usuario, los flujos, las decisiones de interfaz y los criterios de experiencia.
- **Mirada Gestión & Arquitectura Técnica**: destaca el alcance, la organización, las prioridades, el stack, el proceso y la implementación.

El selector escribe `data-mirada` en `<html>`, actualiza `aria-pressed`, resalta metadatos con `data-mirada-highlight`, cambia la descripción visible y persiste la elección en `localStorage` con la clave `portfolio-mirada`. El cambio se resuelve con CSS para los paneles `data-mirada-panel` y con JavaScript para los resaltados.

Además incluye:

- Filtro por área (Todas, Diseño, Audiovisual, 3D, Gestión).
- Búsqueda por título, herramienta, rol o texto del proyecto.
- Vista **Galería visual** y vista **Ficha técnica**.
- Contador de resultados con `role="status"` y `aria-live="polite"`.
- Estado vacío si una combinación de filtros no tiene resultados.
- Botón para limpiar filtros.
- Tarjetas con enlace a la página individual del proyecto.

**Decisión clave:** los proyectos ya no se abren en un modal. Cada tarjeta lleva a `/proyectos/[id]`, una URL propia, compartible e inspeccionable.

### 5.2 `WorkflowSimulator` — Tablero y timeline interactivo del proceso

**Archivos:**

- `src/components/WorkflowSimulator.astro`
- `src/data/workflow.ts`

**Responsabilidad:** mostrar cómo se gestiona y diseña un proyecto digital, etapa por etapa.

El componente tiene cinco etapas navegables:

1. **Discovery & UX Research**
2. **Definición & Priorización (PM)**
3. **Wireframing & UI Design**
4. **Handoff & Desarrollo**
5. **Testing & Accesibilidad**

Al seleccionar una etapa, el panel cambia y muestra:

- **Entregables** que se generan.
- **Herramientas** que se usan (Figma, Jira/Notion, Astro, React Native, WCAG, etc.).
- **Preguntas** que se resuelven en esa fase.

La interacción usa el patrón de **tabs accesibles**: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `tabindex` y navegación con flechas, Home y End. El panel activo se anuncia con una región `aria-live`.

### 5.3 `AgileRitualCalculator` — ¿Reunión en vivo o async?

**Archivos:**

- `src/components/AgileRitualCalculator.astro`

**Responsabilidad:** demostrar el criterio de coordinación de un equipo distribuido: cruzar la agenda de Buenos Aires con la ciudad del equipo, medir cuántas horas hábiles se comparten y decidir si conviene un ritual sincrónico, híbrido o asíncrono.

**Flujo de uso:**

1. Elegís la ciudad del equipo con los hubs sugeridos (San Francisco, Madrid, Ciudad de México, Londres, Berlín y São Paulo) o buscando cualquier ciudad del mundo.
2. La calculadora consulta en paralelo el clima actual y el huso horario de Buenos Aires y de la ciudad elegida.
3. Elegís el ritual: **Kickoff & Discovery UX** (60 min), **Design Critique** (45 min), **Sprint Planning** (45 min) o **Daily / Handoff** (15 min).
4. El panel calcula el solapamiento de la ventana laboral, el índice de viabilidad y el veredicto con una recomendación concreta.

**Qué incluye:**

- Badge de estado visible: **Cargando datos…**, **Contenido disponible**, **Ritual seleccionado**, **Sin resultados** y **Error de conexión**.
- Endpoint visible en pantalla (`Open-Meteo · geocoding + forecast · sin API key`).
- Buscador de ciudades con debounce de 380 ms, listbox accesible y navegación por teclado (flechas, Enter y Escape).
- Hubs sugeridos como atajo y búsqueda libre de cualquier ciudad.
- Tarjeta de Buenos Aires y tarjeta de la ciudad del equipo con hora local, huso, temperatura y clima.
- Durómetro de 24 horas con tres carriles: Buenos Aires, ciudad del equipo y golden hours.
- Índice de viabilidad sincrónica (0–100) con barra y lectura en texto.
- Veredicto **sincrónico**, **híbrido** o **async-first**, con explicación contextual del porqué.
- Franja ideal sugerida en la hora de ambas ciudades.
- Bloque **“Cómo lo resuelvo”** con el kit de herramientas para ese veredicto (Notion, FigJam, Loom, Figma, Jira/Linear, Slack).
- Lectura del clima como contexto humano del encuentro.
- Reloj vivo que refresca horas y diagnóstico cada 30 segundos.
- Estado vacío, estado de error con reintento y un control para **simular el modo offline**.

**Cómo se calcula:**

- Se toma la ventana laboral de 9:00 a 18:00 (540 a 1080 minutos) en cada ciudad y se desplaza según la diferencia de husos.
- El solapamiento es la intersección de ambas ventanas; se expresa en horas y se dibuja sobre 24 horas.
- El índice combina tres factores: horas compartidas (hasta 55 puntos), afinidad sincrónica del ritual (hasta 25) y si ambos equipos están en horario laboral en este momento (hasta 20).
- Veredicto: `>= 60` sincrónico, `>= 35` híbrido, el resto async. Se fuerza async si no hay solapamiento, si ninguno de los dos equipos está en horario laboral, o si el Daily no alcanza 4 horas compartidas.
- La franja sugerida prioriza las 10:00 de Buenos Aires dentro del solapamiento.

**Por qué está en el portfolio:**

- **Coordinar es una decisión de producto.** Un PM no elige un horario por comodidad: evalúa solapamiento, costo de contexto y foco del equipo.
- **El diagnóstico no es un adorno.** Cada veredicto trae una recomendación operativa concreta, no solo un número.
- **Los estados difíciles también se diseñan.** Vacío, error, reintento y respaldo local demuestran cómo se sostiene una herramienta cuando la API falla.
- **Los datos en vivo agregan contexto.** La hora real y el clima acercan la decisión a la vida del equipo distribuido.

**Aclaración metodológica:** el clima es contexto, no insumo del veredicto. El cálculo se apoya en husos horarios, ventana laboral y duración del ritual. Si Open-Meteo falla, el botón de respaldo calcula los husos localmente con `Intl.DateTimeFormat` y la calculadora sigue funcionando.

---

## 6. API externa y ubicación exacta

### Dónde está en la pantalla

La calculadora está en la sección **“Rituales: ¿reunión en vivo o async?”**, después de **“Proceso de trabajo”** y antes del footer de contacto. En la navegación se accede con el link **“Rituales”** (`#rituales`).

La sección incluye el badge de estado, el endpoint visible, el buscador de ciudades, los hubs sugeridos y el panel de diagnóstico.

### Dónde está en el código

| Responsabilidad | Archivo | Marcas / funciones |
| --- | --- | --- |
| Sección visible | `src/components/AgileRitualCalculator.astro` | `id="rituales"`, `data-rituals` |
| Render en la página | `src/pages/index.astro` | `<AgileRitualCalculator />` |
| Badge de estado | `src/components/AgileRitualCalculator.astro` | `data-state-badge`, `setState` |
| Endpoint visible | `src/components/AgileRitualCalculator.astro` | `.rituals__endpoint` |
| Buscador | `src/components/AgileRitualCalculator.astro` | `data-search-form`, `data-city-input`, `geocode` |
| Resultados | `src/components/AgileRitualCalculator.astro` | `data-results`, `renderResults` |
| Hubs sugeridos | `src/components/AgileRitualCalculator.astro` | `data-hub`, `hubs` |
| Estado vacío | `src/components/AgileRitualCalculator.astro` | `data-region="empty"`, `showEmpty`, `data-back-to-hubs` |
| Estado de error | `src/components/AgileRitualCalculator.astro` | `data-region="error"`, `showError`, `data-retry`, `data-fallback` |
| Modo offline | `src/components/AgileRitualCalculator.astro` | `data-offline`, `simulateOffline` |
| Reloj y clima | `src/components/AgileRitualCalculator.astro` | `fetchForecast`, `weatherInfo`, `renderCityWeather` |
| Husos horarios | `src/components/AgileRitualCalculator.astro` | `zoneOffsetSeconds`, `fallbackCity` |
| Solapamiento | `src/components/AgileRitualCalculator.astro` | `buildPlan`, `paintLane`, `data-lane-base` / `-team` / `-golden` |
| Diagnóstico | `src/components/AgileRitualCalculator.astro` | `data-score`, `data-verdict-badge`, `data-kit`, `data-slot` |
| Configuración | `src/components/AgileRitualCalculator.astro` | `#rituals-config` (`set:html` + JSON) |
| Anuncios | `src/components/AgileRitualCalculator.astro` | `data-live`, `aria-live="polite"` |

### Endpoints

```text
GET https://geocoding-api.open-meteo.com/v1/search?name={ciudad}&count=5&language=es&format=json
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,is_day,weather_code&timezone=auto
```

- No requieren token ni clave.
- Devuelven JSON público con CORS habilitado.
- `count=5` acota los resultados del buscador y `language=es` prioriza nombres en español.
- `timezone=auto` hace que Open-Meteo devuelva `utc_offset_seconds` y `timezone_abbreviation`, que son la base del cálculo de husos.
- `current` pide temperatura, si es de día y el código meteorológico WMO que se traduce a emoji y descripción.
- La configuración de ciudades, hubs y rituales se serializa desde el frontmatter a un `<script type="application/json" id="rituals-config">`, así el HTML y el cliente comparten una única fuente de verdad.

### Respuesta usada

Geocoding:

```json
{
  "results": [
    {
      "id": 3117735,
      "name": "Madrid",
      "country": "España",
      "latitude": 40.4165,
      "longitude": -3.70256,
      "timezone": "Europe/Madrid"
    }
  ]
}
```

Forecast:

```json
{
  "latitude": 40.4,
  "longitude": -3.7,
  "timezone": "Europe/Madrid",
  "timezone_abbreviation": "GMT+1",
  "utc_offset_seconds": 3600,
  "current": {
    "time": "2026-11-06T12:00",
    "temperature_2m": 14.3,
    "is_day": 1,
    "weather_code": 3
  }
}
```

`fetchForecast` valida que la respuesta sea `ok`, toma `current` y usa `utc_offset_seconds`; si el campo no viene, cae a `zoneOffsetSeconds` con `Intl`. `geocode` filtra con `Array.isArray` y normaliza cada resultado con `String()` y `Number()`.

### Estados implementados

| Estado | Badge | Qué se ve | Disparador |
| --- | --- | --- | --- |
| Carga | `Cargando datos…` | Skeleton + `aria-busy` | Al iniciar, cambiar de ciudad o reintentar |
| Éxito | `Contenido disponible` | Tarjetas de ciudad, solapamiento, índice, veredicto y kit | Respuesta válida de Open-Meteo |
| Selección | `Ritual seleccionado` | Mismo panel recalculado para el ritual elegido | Clic o teclado en un ritual |
| Vacío | `Sin resultados` | Mensaje, ciudad buscada y botón para volver a los hubs | Geocoding sin resultados |
| Error | `Error de conexión` | Mensaje, **Reintentar conexión** y **Usar husos de respaldo** | Fallo de red, HTTP no-OK u offline simulado |
| Respaldo | `Contenido disponible` | Husos calculados localmente, sin clima | Botón de respaldo |

### Decisiones técnicas

- **Sin backend ni secretos**: todo ocurre en el navegador; no hay claves ni variables de entorno.
- **Configuración única**: el frontmatter define `hubs`, `rituals` y la ciudad base; se serializa a JSON y el cliente la parsea.
- **Consultas en paralelo**: `Promise.all` trae Buenos Aires y la ciudad del equipo al mismo tiempo.
- **Debounce de 380 ms**: evita una request por tecla en el buscador.
- **Validación defensiva**: se verifica `response.ok`, tipos numéricos y arrays antes de renderizar.
- **Seguridad de render**: los datos externos se insertan con `textContent` y creación de nodos, nunca con `innerHTML`.
- **Husos**: se usa `utc_offset_seconds` de la API y, en respaldo, `Intl.DateTimeFormat` con `timeZoneName: 'longOffset'`; si la ciudad no tiene zona IANA conocida, se estima por longitud.
- **Reloj vivo**: un `setInterval` de 30 segundos refresca horas y diagnóstico mientras el panel está en éxito o selección.
- **Offline simulable**: el botón de la barra fuerza el estado de error para mostrar el comportamiento sin desconectar la red.
- **Respaldo local**: el botón calcula los husos sin red y mantiene la herramienta operativa.
- **Accesibilidad**: `role="combobox"` y `role="listbox"`, `aria-pressed` en rituals y offline, `aria-busy`, `role="alert"` en el error y anuncios con `aria-live`.

### Por qué Open-Meteo y no otra API

- Es pública, sin token y con CORS.
- Resuelve geocoding y forecast en un mismo proveedor.
- Devuelve la hora, el huso y el clima reales, que son el insumo del diagnóstico.
- Permite buscar cualquier ciudad, no solo una lista fija.
- Se puede explicar y defender en vivo sin depender de credenciales.

### Limitaciones conocidas

- Open-Meteo es un servicio externo: puede fallar, tardar o limitar requests; por eso existen el reintento y el respaldo.
- El clima es contexto humano, no altera el veredicto.
- La ventana de 9:00 a 18:00 es una convención de referencia, no la jornada real de cada equipo.
- La franja sugerida prioriza las 10:00 de Buenos Aires y puede requerir ajuste manual.
- El horario de verano lo resuelve el huso IANA que devuelve la API; el respaldo depende de la base de zonas del navegador.
- Sin backend no hay caché compartida: cada visita consulta la API.

---

## 7. Decisiones de diseño y accesibilidad

### Sistema visual

- Paleta de cuatro colores: crema `#FFF8DC`, ciruela `#6C0345`, terracota `#DC6B19` y mostaza `#F7C566`, con tinta `#3B0A24` para texto.
- Tipografía **Fraunces** para display, **Space Grotesk** para interfaz y etiquetas, y **DM Sans** para texto corrido.
- Bordes de 2 px, radios de 10 a 36 px y sombras duras tipo sticker, sobre un fondo con grilla de papel.
- Stickers, subrayados dibujados y rotaciones leves como firma visual de la sección de rituales y del Hero.
- Layout de 1200 px con espaciado fluido y breakpoints en 980, 900, 700 y 560 px.
- Tarjetas, etiquetas y botones comparten radios, bordes, sombras y transiciones.

### Accesibilidad

- Skip link al contenido principal.
- Navegación con `aria-label`, `aria-expanded`, `aria-controls` y cierre con Escape.
- Indicador de sección activa con `aria-current="location"` y página activa con `aria-current="page"`.
- Foco visible con `:focus-visible` y contraste reforzado.
- Selector de proyectos, filtros y vistas con `aria-pressed`.
- Tabs del proceso con `role="tablist"`, `aria-selected`, `aria-controls` y navegación por teclado.
- Resultados y cambios de estado con `aria-live="polite"`.
- Buscador de ciudades con `role="combobox"`, `aria-expanded`, listbox con opciones y navegación por flechas, Enter y Escape.
- Rituales y control de offline con `aria-pressed`; cambio de ritual anunciado como estado `selected`.
- Carga con `aria-busy`, errores con `role="alert"` y anuncios con `aria-live="polite"`.
- Imágenes con `alt` descriptivo; imágenes decorativas con `aria-hidden`.
- Video con nota explícita de ausencia de subtítulos y audiodescripción.
- `prefers-reduced-motion` para reducir animaciones.
- Áreas táctiles de al menos 44 px en controles principales.
- Uso de `svh`/`dvh` para evitar saltos en mobile.

### Responsive

- Hero a dos columnas en desktop y una columna en mobile.
- Sobre mí con imagen sticky en desktop y estática en mobile.
- Explorador de proyectos con toolbar flexible, selector de dos columnas y grillas de 2/1 columnas.
- Páginas de proyecto con hero, métricas y lecturas en dos columnas; una columna en mobile.
- Proceso con timeline vertical en desktop y horizontal scrollable en mobile.
- Calculadora con tarjetas de ciudad apiladas y diagnóstico en una columna por debajo de 980 px; carriles y leyenda se reacomodan en 700 y 560 px.
- Menú de navegación desplegable por debajo de 900 px.

### Limitaciones de accesibilidad

- El video no tiene subtítulos ni audiodescripción; se informa en la interfaz.
- Las fuentes se cargan desde Google Fonts; si fallan, hay fallback del sistema.
- La calculadora depende de Open-Meteo y de la conexión del usuario para los datos en vivo; el respaldo local cubre el cálculo de husos, no el clima.
- No se realizó una auditoría formal con lector de pantalla; se aplicaron criterios manuales y revisión de contraste.

---

## 8. Proceso de trabajo y uso de IA

### Fases

1. **Relevamiento** del portfolio anterior y de la consigna.
2. **Definición de arquitectura** y sistema visual.
3. **Migración de contenido y assets** a la estructura de Astro.
4. **Construcción de componentes** y datos tipados.
5. **Refactorización**: unificación de la presentación, creación de los tres componentes propios y páginas individuales de proyecto.
6. **Reemplazo del laboratorio de identidad** por la calculadora de rituales ágiles conectada a Open-Meteo.
7. **Rediseño visual integral**: paleta crema, ciruela, terracota y mostaza, tipografías Fraunces / Space Grotesk / DM Sans, stickers y tarjetas con sombra dura.
8. **Ajustes de responsive y accesibilidad**.
9. **Documentación y cierre**.

El detalle de cada fase, las decisiones descartadas y una guía para la defensa en vivo están en [`PROCESO.md`](./PROCESO.md).

### Uso de IA

La IA se usó como **asistente de programación y documentación**, no como reemplazo del criterio proyectual.

- Se utilizó para acelerar tareas repetitivas de scaffolding, refactorización y redacción de documentación.
- Se consultó para contrastar alternativas de arquitectura, accesibilidad y manejo de estados asíncronos.
- La selección de proyectos, los textos, la dirección visual, las métricas y las decisiones de contenido fueron definidas y revisadas por la autora.
- Ningún dato de proyecto, métrica o experiencia fue inventado por la IA.
- Cada cambio generado con asistencia fue leído, ajustado y validado en el servidor de desarrollo antes de commitear.
- La IA no reemplazó la comprensión del código: se usó para escribir más rápido lo que ya estaba decidido y para detectar problemas que después se verificaron.

### Historial de commits

El repositorio tiene commits progresivos que separan:

1. Inicialización del proyecto y estructura base.
2. Layout global, navegación e identidad visual.
3. Datos de proyectos y explorador interactivo.
4. Selector de Mirada con contenido dinámico.
5. Sección de actividad de GitHub con estados asíncronos.
6. Ajustes de responsive y accesibilidad.
7. Documentación y guía de defensa.
8. Refactorización: presentación unificada, selector de proyectos, WorkflowSimulator y primer dashboard de API.
9. `feat: add itunes album identity lab`: manual de identidad instantáneo, extracción de paleta, tipografía curada y posicionamiento profesional de Abril Mancuso.
10. `feat: redesign portfolio and add agile rituals calculator`: nueva identidad visual y reemplazo del manual de identidad por la calculadora de rituales con Open-Meteo.

---

## 9. Estructura del repositorio

```
portfolio/
├── public/
│   ├── media/
│   │   ├── billie/
│   │   ├── macbook/
│   │   ├── maimoconecta/
│   │   └── tini/
│   └── perfil.jpg
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── AgileRitualCalculator.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Nav.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectExplorer.astro
│   │   ├── ProjectMedia.astro
│   │   ├── SectionHeading.astro
│   │   └── WorkflowSimulator.astro
│   ├── data/
│   │   ├── miradas.ts
│   │   ├── projects.ts
│   │   ├── site.ts
│   │   └── workflow.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── proyectos/
│   │       └── [id].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── PROCESO.md
```

---

## 10. Cómo ejecutar el proyecto

### Requisitos

- Node.js `>= 22.12.0`
- npm `>= 10`

> Astro 7 requiere una versión de Node más nueva que la disponible en el entorno de desarrollo. Por eso el proyecto usa **Astro 6.4.8**, compatible con Node 22.12+.

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abrir `http://localhost:4321`.

### Build de producción

```bash
npm run build
```

La salida se genera en `dist/`.

### Previsualizar la build

```bash
npm run preview
```

### Variables de entorno

No se necesitan. El proyecto no usa claves privadas ni backend propio.

---

## 11. Deploy

El proyecto es estático y puede publicarse en:

- **Vercel**: importar el repositorio, build `npm run build`, output `dist`.
- **Netlify**: build `npm run build`, publish directory `dist`.
- **GitHub Pages**: publicar el contenido de `dist` o usar una Action.

Si se publica en GitHub Pages como project page, hay que configurar el `base` correspondiente en `astro.config.mjs` y ajustar las rutas absolutas de los assets.

> El deploy no se realizó desde este entorno. Completar la URL en la sección 1 al publicar.

---

## 12. Créditos y contenido

- Contenido, proyectos, imágenes y textos: **Abril Mancuso**.
- Portfolio completo: [Behance](https://www.behance.net/abrilmancuso).
- Perfil profesional: [LinkedIn](https://linkedin.com/in/abrilmancuso).
- Código y actividad: [GitHub](https://github.com/abrumancuso).
- Tipografías: Fraunces, Space Grotesk y DM Sans (Google Fonts).
- API de hora y clima: [Open-Meteo](https://open-meteo.com/), con geocoding y forecast públicos.

Los proyectos incluidos son una selección académica y profesional. Las métricas y descripciones corresponden a cada caso y se presentan con fines de portfolio.
