# Portfolio multimedial — Abru Mancuso

Portfolio personal y académico construido con AstroJS para la materia **Programación Multimedial IV (2026)**. El foco profesional es **Diseño UX/UI + Gestión de Proyectos Digitales (Digital PM)**, con una base técnica en programación multimedial, desarrollo web/mobile y producción audiovisual.

El sitio no presenta una lista de piezas: muestra **cómo se investiga, se estructura, se diseña y se gestiona un producto digital**. Para eso incluye tres componentes propios con lógica real: un explorador de proyectos con switch de rol, un simulador de proceso de trabajo y un panel en vivo conectado a una API externa.

---

## 1. Datos del proyecto

| Campo | Valor |
| --- | --- |
| Autora | Abru Mancuso (Abril Mancuso) |
| Materia | Programación Multimedial IV |
| Año | 2026 |
| Tipo | Proyecto individual |
| Repositorio | `<COMPLETAR_URL_DEL_REPO>` |
| Deploy | `<COMPLETAR_URL_DEL_DEPLOY>` |
| Stack principal | AstroJS 6.4.8, HTML, CSS, TypeScript/JavaScript |
| API externa | GitHub REST API |
| Componentes propios | `ProjectExplorer`, `WorkflowSimulator`, `LiveApiDashboard` |

> Los placeholders de repositorio y deploy se completan al publicar. El proyecto genera una build estática lista para cualquier hosting.

---

## 2. Descripción general

El portfolio es una experiencia de una sola página con seis bloques:

1. **Hero** (`#inicio`): presentación directa y foco profesional.
2. **Sobre mí** (`#sobre-mi`): una única sección personal, sin dividir la presentación en tres bloques.
3. **Proyectos** (`#proyectos`): selección de cuatro casos con switch de mirada, filtros, búsqueda, dos vistas y diálogos.
4. **Proceso** (`#proceso`): simulador interactivo de las cinco etapas de trabajo.
5. **Live API** (`#actividad`): panel en vivo con repositorios reales de GitHub.
6. **Contacto** (`#contacto`): email, Behance, LinkedIn y GitHub.

La sección de proyectos aclara de forma visible que se trata de **una selección de algunos proyectos**, no de la totalidad. El portfolio completo de diseño e identidad vive en Behance.

### Proyectos incluidos

- **Billie Eilish — motion graphics**: pieza audiovisual vertical.
- **MacBook Pro 3D**: visualización y renders 3D.
- **MaimoConecta**: proyecto de diseño estratégico y UX con 45 slides.
- **Tini — Manual de Marca**: sistema de identidad visual de 9 páginas.

---

## 3. Tecnologías usadas y justificación

### AstroJS 6.4.8

Astro permite construir un sitio **estático, rápido y con muy poco JavaScript**, pero con arquitectura de componentes. Es el equilibrio adecuado para un portfolio: el contenido pesa más que la aplicación y la interactividad se concentra solo donde aporta valor.

- `output: 'static'`: genera HTML, CSS y JS listos para cualquier hosting de archivos.
- Componentes `.astro`: reutilización de secciones, tarjetas, diálogos y datos.
- Islas de interactividad: los scripts se cargan solo en los componentes que los necesitan.
- Sin framework de UI adicional: no hay necesidad de React, Vue o Svelte para este alcance.

### HTML semántico y CSS

- Landmarks (`header`, `nav`, `main`, `section`, `footer`), jerarquía de encabezados y listas reales.
- CSS con custom properties para tokens de color, tipografía, radios, transiciones y layout.
- Grid y flexbox para responsive sin dependencias externas.
- `clamp()` para tipografía fluida y espaciado.
- `prefers-reduced-motion` para desactivar animaciones.

### TypeScript / JavaScript

- Tipos para `Project`, `MiradaId`, `GitHubRepo` y `WorkflowStage`.
- Datos centralizados y tipados en `src/data/`.
- Scripts de cliente para el switch de proyectos, filtros, diálogos, carrusel, tabs del proceso y fetch de la API.

### APIs nativas del navegador

- `<dialog>` + `showModal()` para los casos completos.
- `<video>` para la pieza audiovisual.
- `fetch` + `AbortController` para la API de GitHub.
- `localStorage` para recordar la mirada elegida en proyectos.
- `Intl.DateTimeFormat` para fechas legibles en español.

### Git y GitHub

- Historial de commits progresivos que documenta la construcción.
- Repositorio local nuevo, sin arrastrar el historial anterior.
- La API de GitHub se usa como fuente de datos real y también como parte de la narrativa técnica del portfolio.

### ¿Por qué no React, Next.js o una SPA?

Porque el problema no lo requiere. El portfolio es principalmente contenido con interacciones acotadas. Astro reduce el JavaScript enviado, mejora el tiempo de carga y mantiene el HTML accesible desde el primer render. Una SPA agregaría complejidad de routing, hidratación y estado global sin un beneficio claro para este caso.

---

## 4. Arquitectura de la información

### Estructura de la página

```
Inicio (#inicio)
  └── Sobre mí (#sobre-mi)
        └── Proyectos (#proyectos)
              └── Proceso (#proceso)
                    └── Live API (#actividad)
                          └── Contacto (#contacto)
```

La navegación es fija, indica la sección activa con `aria-current="location"` y en mobile se transforma en un menú desplegable.

La presentación se resolvió en **Hero + una sola sección “Sobre mí”**. No hay secciones separadas de perfil, enfoque y trayectoria: el texto personal está unificado y el proceso de trabajo vive en un componente interactivo propio.

### Capas del proyecto

| Capa | Archivos | Responsabilidad |
| --- | --- | --- |
| Datos | `src/data/site.ts`, `projects.ts`, `miradas.ts`, `workflow.ts`, `github.ts` | Contenido editorial, proyectos, modos de lectura, etapas de proceso y respaldo de la API. |
| Layout | `src/layouts/BaseLayout.astro` | Documento, fuentes, skip link, navegación y footer. |
| Presentación | `src/components/Hero.astro`, `About.astro` | Hero y sección única “Sobre mí”. |
| Proyectos | `ProjectExplorer.astro`, `ProjectCard.astro`, `ProjectDialog.astro` | Switch de mirada, filtros, búsqueda, vistas, tarjetas, diálogos y carrusel. |
| Proceso | `WorkflowSimulator.astro` | Tablero/timeline interactivo de las cinco etapas de trabajo. |
| API | `LiveApiDashboard.astro` | Fetch, badge de conexión, estados asíncronos, filtros, pruebas y respaldo local. |
| Sistema visual | `src/styles/global.css` + estilos scoped | Tokens, reset, utilidades, accesibilidad y patrones compartidos. |
| Assets | `public/media/`, `public/perfil.jpg` | Imágenes, posters y video de los proyectos. |

### Flujo de datos

1. Los datos editoriales viven en módulos TypeScript.
2. Los componentes `.astro` los importan en build time y generan HTML estático.
3. Los scripts de cliente agregan comportamiento sobre ese HTML ya renderizado.
4. La API de GitHub se consulta en el navegador; si falla, se usa el respaldo local.

---

## 5. Los tres componentes propios relevantes

### 5.1 `ProjectExplorer` — Matriz interactiva de proyectos + switch de rol

**Archivos:**

- `src/components/ProjectExplorer.astro`
- `src/components/ProjectCard.astro`
- `src/components/ProjectDialog.astro`
- `src/data/projects.ts`
- `src/data/miradas.ts`

**Responsabilidad:** explorar la selección de proyectos y cambiar el foco de lectura según el rol profesional.

**Interacción significativa obligatoria:** arriba de los proyectos hay un switch visible con dos estados:

- **Mirada UX/UI & Producto**: destaca el problema de usuario, los flujos, las decisiones de interfaz y los criterios de experiencia.
- **Mirada Gestión & Arquitectura Técnica**: destaca el alcance, la organización, las prioridades, el stack, el proceso y la implementación.

El switch escribe `data-mirada` en `<html>`, actualiza `aria-pressed`, resalta metadatos con `data-mirada-highlight`, cambia la descripción visible y persiste la elección en `localStorage` con la clave `portfolio-mirada`. El cambio se resuelve con CSS para los paneles `data-mirada-panel` y con JavaScript para los resaltados.

Además incluye:

- Filtro por área (Todas, Diseño, Audiovisual, 3D, Gestión).
- Búsqueda por título, herramienta, rol o texto del proyecto.
- Vista **Galería visual** y vista **Ficha técnica**.
- Contador de resultados con `role="status"` y `aria-live="polite"`.
- Estado vacío si una combinación de filtros no tiene resultados.
- Botón para limpiar filtros.
- Apertura de casos completos en diálogos nativos.
- Cierre por botón, Escape o click en el backdrop.
- Bloqueo del scroll del body mientras hay un diálogo abierto.
- Pausa del video al cerrar el diálogo.
- Carrusel de imágenes con flechas del teclado.

### 5.2 `WorkflowSimulator` — Tablero / timeline interactivo del proceso

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

### 5.3 `LiveApiDashboard` — Panel en vivo conectado a API externa

**Archivos:**

- `src/components/LiveApiDashboard.astro`
- `src/data/github.ts`

**Responsabilidad:** demostrar consumo de una API externa real, manejo de estados asíncronos y una estrategia de fallback.

El panel consume la API pública de GitHub y muestra hasta 8 repositorios ordenados por actualización. Incluye:

- Badge visible con el estado de conexión: `🟢 Conectado en vivo a GitHub API`, `🟡 Conectando...`, `⚪ Sin resultados` o `🔴 Error de conexión`.
- Endpoint visible en pantalla para que se entienda qué API se está consumiendo.
- Tarjetas dinámicas con nombre, descripción, lenguaje, última actualización, estrellas y link.
- Estado de carga con skeleton y `aria-busy`.
- Estado de éxito con tarjetas.
- Estado vacío si el perfil no devuelve repositorios o si el filtro no encuentra resultados.
- Estado de error con mensaje, botón de reintento y botón para usar datos de respaldo.
- Detección de rate limit con hora estimada de reintento.
- Timeout de 10 segundos con `AbortController`.
- Búsqueda por nombre, descripción o lenguaje.
- Filtros por lenguaje con `aria-pressed`.
- Enlaces a cada repositorio y al perfil de GitHub.
- Mensaje `noscript` para quienes navegan sin JavaScript.

**Controles visibles para la defensa:**

- **Refrescar datos**: vuelve a disparar el estado de carga y consulta la API.
- **Simular error**: fuerza el estado de error con el mismo tratamiento visual que un error real.
- **Usar datos de respaldo**: carga los repositorios locales de `src/data/github.ts`.
- **Buscar “zzz”**: permite ver el estado vacío sin modificar el código.

---

## 6. API externa y ubicación exacta

### Dónde está en la pantalla

La API está en la sección **“Actividad & Repositorios en Tiempo Real (Live API)”**, al final de la página, **después de “Proceso de trabajo” y antes del footer de contacto**. En la navegación se accede con el link **“Live API”** (`#actividad`).

### Dónde está en el código

- Componente: `src/components/LiveApiDashboard.astro`
- Renderizado: `src/pages/index.astro` (último componente antes del footer del layout)
- Datos y respaldo: `src/data/github.ts`
- Sección HTML: `id="actividad"` y `data-live-api`
- Badge: `data-badge`
- Controles de prueba: `data-refresh`, `data-simulate-error`, `data-fallback`
- Estados: `data-loading`, `data-content`, `data-empty`, `data-error`
- Fetch: bloque `loadRepos` dentro del `<script>` del componente

### Endpoint

```
GET https://api.github.com/users/abrumancuso/repos?sort=updated&per_page=8
```

- No requiere token para este endpoint.
- Devuelve JSON público.
- Tiene CORS habilitado.
- Límite de 60 solicitudes por hora por IP sin autenticación.

### Estados implementados

| Estado | Qué muestra | Cómo se resuelve |
| --- | --- | --- |
| Carga | Skeleton de tarjetas y mensaje `aria-live` | `data-state="loading"` + `aria-busy="true"` |
| Éxito | Tarjetas con nombre, descripción, lenguaje, estrellas y fecha | Render con DOM API y `textContent` |
| Vacío | Mensaje y acciones | Si el array viene vacío o el filtro no encuentra resultados |
| Error | Título, detalle, reintento y respaldo | `fetch` fallido, timeout, formato inválido o respuesta no OK |
| Rate limit | Mensaje específico con hora de reintento | `403`/`429` o `x-ratelimit-remaining: 0` |
| Respaldo | Tarjetas locales marcadas como respaldo | `src/data/github.ts` |

### Decisiones técnicas

- **Timeout**: `AbortController` corta la solicitud a los 10 segundos.
- **Validación**: se verifica que la respuesta sea un array y que cada repo tenga `name` y `html_url`.
- **Seguridad**: los datos de la API se insertan con `textContent`, no con `innerHTML`.
- **Respaldo**: si la API falla, el usuario no queda con una sección rota; puede reintentar o ver datos locales.
- **Sin secretos**: no hay claves ni variables de entorno; todo es público.
- **Cache**: se usa `cache: 'no-store'` para consultar datos frescos al abrir la página.

### Limitaciones conocidas

- El rate limit es por IP y puede agotarse en redes compartidas.
- Los datos de respaldo son una foto local y pueden quedar desactualizados.
- La sección no está pensada para autenticación ni para mostrar repositorios privados.

---

## 7. Decisiones de diseño y accesibilidad

### Sistema visual

- Paleta cálida con fondos claros y superficies oscuras para el Hero y el Footer.
- Tipografía **Instrument Sans** para display y **DM Sans** para texto.
- Acento principal `#74552f` para garantizar contraste AA sobre fondos claros.
- Layout de 1200 px con espaciado fluido y breakpoints en 900, 820, 700, 640 y 560 px.
- Tarjetas, etiquetas y botones comparten radios, bordes y transiciones.

### Accesibilidad

- Skip link al contenido principal.
- Navegación con `aria-label`, `aria-expanded`, `aria-controls` y cierre con Escape.
- Indicador de sección activa con `aria-current="location"`.
- Foco visible con `:focus-visible` y contraste reforzado.
- Switch de proyectos, filtros y lenguajes con `aria-pressed`.
- Tabs del proceso con `role="tablist"`, `aria-selected`, `aria-controls` y navegación por teclado.
- Resultados y cambios de estado con `aria-live="polite"`.
- Diálogos nativos con manejo de foco del navegador.
- Etiquetas asociadas a inputs de búsqueda.
- Imágenes con `alt` descriptivo; imágenes decorativas con `aria-hidden`.
- Video con nota explícita de ausencia de subtítulos y audiodescripción.
- `prefers-reduced-motion` para reducir animaciones.
- Áreas táctiles de al menos 44 px en controles principales.
- Uso de `svh`/`dvh` para evitar saltos en mobile.

### Responsive

- Hero a dos columnas en desktop y una columna en mobile.
- Sobre mí con imagen sticky en desktop y estática en mobile.
- Explorador de proyectos con toolbar flexible, switch de dos columnas y grillas de 2/1 columnas.
- Proceso con timeline vertical en desktop y horizontal scrollable en mobile.
- Live API con grillas de 3/2/1 columnas.
- Diálogos a pantalla completa en mobile.
- Menú de navegación desplegable por debajo de 900 px.

### Limitaciones de accesibilidad

- El video no tiene subtítulos ni audiodescripción; se informa en la interfaz.
- Las fuentes se cargan desde Google Fonts; si fallan, hay fallback del sistema.
- La sección de GitHub depende de una API externa y de la conexión del usuario.
- No se realizó una auditoría formal con lector de pantalla; se aplicaron criterios manuales y revisión de contraste.

---

## 8. Proceso de trabajo y uso de IA

### Fases

1. **Relevamiento** del portfolio anterior y de la consigna.
2. **Definición de arquitectura** y sistema visual.
3. **Migración de contenido y assets** a la estructura de Astro.
4. **Construcción de componentes** y datos tipados.
5. **Refactorización**: unificación de la presentación y creación de los tres componentes propios.
6. **Ajustes de responsive y accesibilidad**.
7. **Documentación y cierre**.

El detalle de cada fase, las decisiones descartadas y una guía para la defensa en vivo están en [`PROCESO.md`](./PROCESO.md).

### Uso de IA

La IA se usó como **asistente de programación y documentación**, no como reemplazo del criterio proyectual.

- Se utilizó para acelerar tareas repetitivas de scaffolding, refactorización y redacción de documentación.
- Se consultó para contrastar alternativas de arquitectura, accesibilidad y manejo de estados asíncronos.
- La selección de proyectos, los textos, la dirección visual, las métricas y las decisiones de contenido fueron definidas y revisadas por la autora.
- Ningún dato de proyecto, métrica o experiencia fue inventado por la IA.
- Cada cambio generado con asistencia fue leído, ajustado y validado en el servidor de desarrollo antes de commitear.
- La IA no reemplazó la comprensión del código: se usó para escribir más rápido lo que ya estaba decidido, y para detectar problemas que después se verificaron.

### Historial de commits

El repositorio tiene commits progresivos que separan:

1. Inicialización del proyecto y estructura base.
2. Layout global, navegación e identidad visual.
3. Datos de proyectos y explorador interactivo.
4. Selector de Mirada con contenido dinámico.
5. Sección de actividad de GitHub con estados asíncronos.
6. Ajustes de responsive y accesibilidad.
7. Documentación y guía de defensa.
8. Refactorización: presentación unificada, switch de proyectos, WorkflowSimulator y LiveApiDashboard.

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
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── LiveApiDashboard.astro
│   │   ├── Nav.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectDialog.astro
│   │   ├── ProjectExplorer.astro
│   │   ├── SectionHeading.astro
│   │   └── WorkflowSimulator.astro
│   ├── data/
│   │   ├── github.ts
│   │   ├── miradas.ts
│   │   ├── projects.ts
│   │   ├── site.ts
│   │   └── workflow.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
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

- Contenido, proyectos, imágenes y textos: **Abru Mancuso**.
- Portfolio completo: [Behance](https://www.behance.net/abrilmancuso).
- Perfil profesional: [LinkedIn](https://linkedin.com/in/abrilmancuso).
- Código y actividad: [GitHub](https://github.com/abrumancuso).
- Tipografías: Instrument Sans y DM Sans (Google Fonts).
- API de repositorios: GitHub REST API.

Los proyectos incluidos son una selección académica y profesional. Las métricas y descripciones corresponden a cada caso y se presentan con fines de portfolio.
