# PROCESO — Portfolio multimedial

Este documento registra cómo se construyó el portfolio, qué decisiones se tomaron, qué alternativas se descartaron y cómo defender el código en vivo.

---

## 1. Punto de partida

El portfolio anterior era un sitio en HTML, CSS y JavaScript con:

- Contenido y estilos repetidos entre páginas.
- Proyectos escritos directamente en el HTML.
- Interacciones acotadas y poco accesibles.
- Sin estados asíncronos ni consumo de APIs.
- Sin una capa de datos que permitiera mantener el contenido.

La consigna pedía migrar a AstroJS, incorporar al menos tres componentes propios relevantes, consumir una API externa con todos sus estados, resolver responsive y accesibilidad, documentar el proceso y construir un historial de commits progresivos.

### Qué se conservó

- Los cuatro proyectos elegidos: Billie Eilish, MacBook Pro 3D, MaimoConecta y Tini.
- Los assets multimedia de esos proyectos.
- El retrato personal.
- La dirección visual cálida y editorial.
- Los textos base, revisados y reorganizados.

### Qué se descartó

- El historial Git anterior, para construir un repositorio nuevo y limpio.
- Los proyectos que no formaban parte de la selección.
- La estructura de páginas separadas: el portfolio pasó a ser una experiencia de una sola página con secciones ancladas.
- Los estilos duplicados y el JavaScript global sin separación de responsabilidades.

---

## 2. Correcciones de esta iteración

La primera versión resolvía la presentación con tres bloques separados (Perfil, Enfoque y Trayectoria) y un selector global de “Mirada”. Esa estructura no comunicaba con claridad el foco profesional real ni hacía evidente dónde estaba la API.

En esta iteración se corrigió:

1. **Presentación unificada**: Hero + una sola sección “Sobre mí”. El foco es **UX/UI + Digital PM**, con la base técnica como diferencial.
2. **Tres componentes propios con lógica real**:
   - `ProjectExplorer`: matriz de proyectos con switch de rol, filtros, búsqueda, vistas y estado vacío.
   - `WorkflowSimulator`: tablero/timeline interactivo de cinco etapas de PM y UX.
   - `LiveApiDashboard`: panel en vivo conectado a la API pública de GitHub.
3. **API visible**: badge de conexión, endpoint en pantalla, tarjetas dinámicas y controles para probar carga, vacío, error y respaldo.
4. **Documentación actualizada**: README y PROCESO explican los tres componentes y la ubicación visual y técnica de la API.

---

## 3. Decisiones de arquitectura

| Decisión | Alternativa descartada | Por qué se eligió |
| --- | --- | --- |
| AstroJS con `output: 'static'` | Next.js, React SPA | El portfolio es contenido con interacciones puntuales. Astro envía menos JS y genera HTML accesible desde el primer render. |
| Datos en módulos TypeScript | Contenido hardcodeado en cada componente | Una sola fuente de verdad para proyectos, miradas, proceso, navegación y respaldo de GitHub. |
| Componentes `.astro` | Un único HTML gigante | Reutilización, estilos scoped y responsabilidades claras. |
| Switch de proyectos con `data-mirada` + CSS | Estado global en un framework | Menos JavaScript, sin re-render y una única regla de visibilidad. |
| `<dialog>` nativo | Modal custom con divs | Foco, Escape, backdrop y semántica resueltos por el navegador. |
| Tabs nativos con ARIA | Acordeón o botones sin semántica | El proceso se lee como una secuencia de etapas y se navega con teclado. |
| API de GitHub + respaldo local | Datos hardcodeados solamente | La sección muestra datos reales y, si falla la API, no rompe la experiencia. |
| Controles de prueba visibles | Solo probar desconectando la red | Permiten demostrar los estados en la defensa sin depender del entorno. |

### Sobre la presentación

El Hero y “Sobre mí” ya no cambian según una mirada global. El texto personal es único y directo:

- **Hero**: “Hola, soy Abru Mancuso. Diseño experiencias digitales (UX/UI) y lidero proyectos tecnológicos de punta a punta...”
- **Sobre mí**: formación en UMAI, cruce entre Diseño UX/UI y Project Management, y la ventaja de hablar el mismo idioma que el equipo de desarrollo.

El cambio de foco se movió al lugar donde aporta valor: **los proyectos**. Ahí el switch cambia qué se destaca de cada caso.

### Sobre el switch de proyectos

Se implementó con tres capas:

1. **CSS global**: todos los `[data-mirada-panel]` están ocultos; solo se muestra el que coincide con `html[data-mirada="producto"]` o `html[data-mirada="gestion"]`.
2. **Switch en `ProjectExplorer`**: actualiza `data-mirada` en `<html>`, `aria-pressed`, la descripción visible y `localStorage`.
3. **Resaltados**: los elementos con `data-mirada-highlight` reciben la clase `.is-highlighted` cuando coinciden con el modo activo.

Ventajas:

- Sin JavaScript, el HTML queda en modo “UX/UI & Producto” y el contenido principal sigue visible.
- El cambio es inmediato y no requiere recargar.
- La lógica de visibilidad vive en un solo lugar.

Costo:

- Los paneles alternativos no visibles quedan en el DOM. Es un costo aceptable para este volumen de contenido.
- Si se agregaran muchas variantes, convendría evaluar un render condicional o un store.

### Sobre los diálogos

Se usa `<dialog>` con `showModal()` porque resuelve gratis:

- Foco atrapado dentro del diálogo.
- Cierre con Escape.
- Backdrop.
- Retorno de foco al abridor al cerrar.

El código agrega cierre por click en el backdrop, bloqueo de scroll del body, pausa de video y navegación de carrusel con flechas.

### Sobre la API

Se eligió la API pública de GitHub porque:

- Es real, verificable y tiene CORS.
- Permite mostrar actividad técnica sin backend.
- Tiene un límite claro (60 solicitudes por hora por IP) que obliga a diseñar estados de error.
- No requiere secretos ni variables de entorno.

El respaldo local no reemplaza a la API: es una red de seguridad para que la sección no quede vacía si falla la red o se agota el límite.

---

## 4. Fases y commits

| # | Commit | Qué contiene |
| --- | --- | --- |
| 1 | `chore: initialize AstroJS project and base structure` | `package.json`, configuración de Astro, `.gitignore`, estructura de carpetas y assets. |
| 2 | `feat: add global layout, navigation and visual identity` | Layout, navegación, footer, tokens, tipografía y secciones base. |
| 3 | `feat: migrate project data and build interactive project explorer` | Datos de los cuatro proyectos, tarjetas, filtros, búsqueda, vistas y diálogos. |
| 4 | `feat: add reading mode selector with dynamic content` | Primera versión del selector de Mirada y textos alternativos. |
| 5 | `feat: add GitHub activity section with async states` | Primera versión del fetch de la API y estados asíncronos. |
| 6 | `fix: polish responsive layout and accessibility` | Ajustes de contraste, foco, semántica, responsive y detalles de interacción. |
| 7 | `docs: add project documentation and defense guide` | `README.md` y `PROCESO.md`. |
| 8 | `refactor: unify presentation and rebuild interactive components` | Hero + Sobre mí unificados, switch de proyectos, WorkflowSimulator, LiveApiDashboard y documentación actualizada. |

Para ver el historial:

```bash
git log --oneline
```

---

## 5. Evidencia técnica de los tres componentes

### 5.1 ProjectExplorer

**Archivos:**

- `src/components/ProjectExplorer.astro`
- `src/components/ProjectCard.astro`
- `src/components/ProjectDialog.astro`
- `src/data/projects.ts`
- `src/data/miradas.ts`

**Dónde mirar en el código:**

| Qué | Archivo | Buscar |
| --- | --- | --- |
| Switch de mirada | `src/components/ProjectExplorer.astro` | `data-mode-switch`, `data-mirada-button` |
| Estado y lógica del switch | `src/components/ProjectExplorer.astro` | `applyMode`, `isMirada`, `localStorage` |
| Filtros y búsqueda | `src/components/ProjectExplorer.astro` | `applyFilters`, `data-search` |
| Vista Galería/Ficha | `src/components/ProjectExplorer.astro` | `data-view`, `explorer[data-view='ficha']` |
| Estado vacío | `src/components/ProjectExplorer.astro` | `data-empty`, `renderEmpty` |
| Paneles por mirada | `src/components/ProjectCard.astro` | `data-mirada-panel` |
| Resaltados | `src/components/ProjectCard.astro` y `ProjectDialog.astro` | `data-mirada-highlight` |
| Datos de los proyectos | `src/data/projects.ts` | `miradas: { producto, gestion }` |
| Opciones de mirada | `src/data/miradas.ts` | `miradaOptions` |

**Variables principales:**

- `state`: `{ area, query, view }`.
- `root`: `<html>`, donde se escribe `data-mirada`.
- `modeButtons`: botones del switch.
- `highlights`: elementos con `data-mirada-highlight`.
- `applyMode(mode, announce)`: función central del switch.
- `applyFilters()`: filtro combinado por área y búsqueda.
- `updateStatus(visible)`: mensaje accesible.
- `showSlide(nextIndex)`: carrusel circular.
- `dialogs`: todos los `<dialog>` del documento.

**Cómo explicarlo en 30 segundos:**

> El explorador tiene las tarjetas en el DOM y alterna `hidden` según área y búsqueda. El switch de mirada escribe `data-mirada` en `<html>`; el CSS muestra el panel correspondiente y el JS resalta roles, herramientas, decisiones o proceso. La vista Galería/Ficha se resuelve con `data-view` y CSS. Los casos completos se abren en `<dialog>` nativo, con foco atrapado, cierre por Escape, backdrop y pausa de video.

### 5.2 WorkflowSimulator

**Archivos:**

- `src/components/WorkflowSimulator.astro`
- `src/data/workflow.ts`

**Dónde mirar en el código:**

| Qué | Archivo | Buscar |
| --- | --- | --- |
| Estructura del tablero | `src/components/WorkflowSimulator.astro` | `data-workflow`, `role="tablist"` |
| Botones de etapa | `src/components/WorkflowSimulator.astro` | `data-workflow-tab` |
| Paneles de etapa | `src/components/WorkflowSimulator.astro` | `data-workflow-panel` |
| Lógica de activación | `src/components/WorkflowSimulator.astro` | `activate`, `aria-selected` |
| Navegación por teclado | `src/components/WorkflowSimulator.astro` | `ArrowRight`, `ArrowLeft`, `Home`, `End` |
| Contenido de las etapas | `src/data/workflow.ts` | `workflowStages` |

**Variables principales:**

- `tabs`: botones de etapa.
- `panels`: paneles de contenido.
- `activate(id, focus)`: muestra el panel y actualiza ARIA.
- `status`: región `aria-live` que anuncia la etapa activa.

**Cómo explicarlo en 30 segundos:**

> El proceso se modela como tabs accesibles. Cada botón tiene `role="tab"`, `aria-selected` y `aria-controls`; cada panel tiene `role="tabpanel"`. Al hacer clic o usar las flechas, se ocultan los paneles que no corresponden y se muestra el activo. Los datos de entregables, herramientas y preguntas viven en `workflowStages`.

### 5.3 LiveApiDashboard

**Archivos:**

- `src/components/LiveApiDashboard.astro`
- `src/data/github.ts`

**Dónde mirar en el código:**

| Qué | Archivo | Buscar |
| --- | --- | --- |
| Sección visible | `src/components/LiveApiDashboard.astro` | `id="actividad"`, `data-live-api` |
| Badge de conexión | `src/components/LiveApiDashboard.astro` | `data-badge`, `updateBadge` |
| Controles de prueba | `src/components/LiveApiDashboard.astro` | `data-refresh`, `data-simulate-error`, `data-fallback` |
| Estados | `src/components/LiveApiDashboard.astro` | `setView`, `data-loading`, `data-empty`, `data-error` |
| Fetch | `src/components/LiveApiDashboard.astro` | `loadRepos`, `fetch`, `AbortController` |
| Rate limit | `src/components/LiveApiDashboard.astro` | `x-ratelimit-remaining`, `x-ratelimit-reset` |
| Render de tarjetas | `src/components/LiveApiDashboard.astro` | `createCard`, `textContent` |
| URL y respaldo | `src/data/github.ts` | `GITHUB_API_URL`, `fallbackRepos` |
| Render en la página | `src/pages/index.astro` | `<LiveApiDashboard />` |

**Variables principales:**

- `repos`: repositorios activos.
- `language`: filtro por lenguaje.
- `query`: búsqueda.
- `sourceType`: `api` o `fallback`.
- `requestId`: evita respuestas viejas.
- `controller`: aborta la request anterior.
- `setView(view)`: máquina de estados visual.
- `renderFiltered()`: filtro y render.
- `useFallback()`: respaldo local.
- `simulateError()`: fuerza el estado de error para la defensa.
- `loadRepos()`: fetch y manejo de errores.

**Estados:**

| Estado | Disparador | Salida |
| --- | --- | --- |
| Loading | Inicio, refresco o reintento | Skeleton + `aria-busy` + badge amarillo |
| Success | Array con repos | Tarjetas + filtros + badge verde |
| Empty | Array vacío o filtro sin resultados | Mensaje + acciones + badge neutro |
| Error | Red, timeout, formato o status no OK | Mensaje + reintento + respaldo + badge rojo |
| Rate limit | 403/429 o `remaining: 0` | Mensaje con hora de reintento |
| Fallback | Acción del usuario | Tarjetas locales + badge naranja |

**Cómo explicarlo en 30 segundos:**

> La sección hace un `fetch` a la API pública de GitHub con timeout de 10 segundos y `AbortController`. Valida que la respuesta sea un array y que cada repo tenga nombre y URL. Si falla, muestra un estado de error con reintento y la opción de usar datos locales. Si GitHub limita las solicitudes, calcula la hora de reintento con `x-ratelimit-reset`. Los datos se insertan con `textContent`, no con `innerHTML`. El badge y los controles de prueba hacen visible el estado en todo momento.

---

## 6. Ubicación exacta de la API

### En la pantalla

La API está en la sección **“Actividad & Repositorios en Tiempo Real (Live API)”**:

- Es el **último bloque de contenido antes del footer de contacto**.
- En la navegación se llega con el link **“Live API”** (`#actividad`).
- El panel tiene un badge de conexión, el endpoint visible, una barra de pruebas, el buscador, los filtros por lenguaje y las tarjetas de repositorios.

### En el código

- `src/pages/index.astro`: `<LiveApiDashboard />` se renderiza después de `<WorkflowSimulator />` y antes del footer del layout.
- `src/components/LiveApiDashboard.astro`: contiene la sección, el fetch, los estados y los controles.
- `src/data/github.ts`: contiene `GITHUB_API_URL` y `fallbackRepos`.

### Cómo probarla en la defensa

1. Abrir `http://localhost:4321/#actividad`.
2. Ver el badge `🟢 Conectado en vivo a GitHub API` y las tarjetas reales.
3. Hacer clic en **Refrescar datos** para mostrar el estado de carga.
4. Escribir `zzz` en el buscador para mostrar el estado vacío.
5. Hacer clic en **Simular error** para mostrar el estado de error.
6. Hacer clic en **Usar datos de respaldo** para mostrar el fallback local.
7. Abrir DevTools > Network y mostrar la request a `api.github.com`.

---

## 7. Accesibilidad y responsive

### Evidencia

| Criterio | Archivo | Buscar |
| --- | --- | --- |
| Skip link | `src/layouts/BaseLayout.astro` | `skip-link` |
| Foco visible | `src/styles/global.css` | `:focus-visible` |
| Movimiento reducido | `src/styles/global.css` | `prefers-reduced-motion` |
| Menú mobile | `src/components/Nav.astro` | `aria-expanded`, `aria-controls` |
| Cierre con Escape y retorno de foco | `src/components/Nav.astro` | `Escape`, `toggle.focus()` |
| Sección activa | `src/components/Nav.astro` | `aria-current` |
| Switch de proyectos | `src/components/ProjectExplorer.astro` | `aria-pressed`, `data-mirada-button` |
| Resultados del explorador | `src/components/ProjectExplorer.astro` | `role="status"`, `aria-live` |
| Tabs del proceso | `src/components/WorkflowSimulator.astro` | `role="tablist"`, `role="tab"`, `aria-selected` |
| Estado de API | `src/components/LiveApiDashboard.astro` | `role="status"`, `aria-live` |
| Badge de API | `src/components/LiveApiDashboard.astro` | `data-badge` |
| `aria-busy` durante carga | `src/components/LiveApiDashboard.astro` | `aria-busy` |
| Diálogo nativo | `src/components/ProjectDialog.astro` | `<dialog>`, `aria-labelledby` |
| Video con nota de accesibilidad | `src/components/ProjectDialog.astro` | “sin subtítulos ni audiodescripción” |

### Decisiones

- La jerarquía de encabezados se mantiene: un `h1`, `h2` por sección, `h3`/`h4` dentro.
- Las tarjetas usan `aria-label` con el título del proyecto para que la ficha técnica también tenga nombre accesible.
- Los paneles ocultos por mirada usan `display: none`, por lo que no se anuncian.
- Los botones de filtro, mirada y lenguaje usan `aria-pressed`, no `aria-selected`.
- Las tabs del proceso usan `aria-selected` porque cambian el panel visible.
- Los mensajes de resultados y estado usan `aria-live="polite"`, no `alert`.
- El modal usa `<dialog>` nativo; no se reimplementa el focus trap.
- Las animaciones se desactivan con `prefers-reduced-motion`.
- Los controles principales tienen al menos 44 px de alto.
- Se usa `100svh`/`100dvh` para evitar saltos por la barra del navegador mobile.

### Breakpoints

- `900px`: menú mobile, Hero a una columna, timeline del proceso horizontal, Live API a dos columnas.
- `860px`: diálogo a una columna.
- `820px`: Sobre mí a una columna.
- `700px`: grillas internas del proceso a una columna.
- `640px`: Live API a una columna.
- `560px`: Hero sin altura forzada, acciones a ancho completo, diálogo a pantalla completa.

### Limitaciones

- El video no tiene subtítulos ni audiodescripción; se informa en la interfaz.
- No se hizo una auditoría formal con lector de pantalla.
- Las fuentes externas pueden fallar; hay fallback del sistema.
- La API depende de red y rate limit.

---

## 8. Pruebas realizadas

### Servidor de desarrollo

```bash
npm run dev
```

Resultado observado:

- Astro inicia correctamente en `http://localhost:4321/`.
- La página responde `HTTP 200`.
- El HTML generado incluye `#sobre-mi`, `#proyectos`, `#proceso` y `#actividad`.
- El HTML incluye el switch `data-mirada-button` con los dos estados.
- El HTML incluye `data-workflow` y `data-live-api`.
- No quedan referencias a `ReadingMode`, `GitHubActivity`, `Focus` ni `Trajectory`.

### API

```bash
curl -sS -D - "https://api.github.com/users/abrumancuso/repos?sort=updated&per_page=8"
```

Resultado observado:

- `HTTP/2 200`.
- `x-ratelimit-limit: 60`.
- `x-ratelimit-remaining` mayor que cero.
- Array con 8 repositorios.
- Repos como `portfolio_progra_iv`, `FitCheck`, `portfolio`, `maimo-prog3-2025-tpfinal`, entre otros.

### Verificaciones manuales

- El explorador conserva los cuatro proyectos.
- El switch cambia el panel visible y los resaltados.
- El estado vacío aparece con una búsqueda sin resultados.
- El proceso muestra una etapa por vez y responde a las flechas del teclado.
- La API muestra badge, endpoint, tarjetas y controles de prueba.
- Los diálogos tienen `aria-labelledby` y cierre accesible.
- El README y este documento existen y están enlazados.

### Qué no se probó

- Lectores de pantalla reales (VoiceOver, NVDA).
- Matriz completa de navegadores y dispositivos.
- Deploy en un hosting real.
- Tests automatizados de componentes o de API.

---

## 9. Guía rápida para defensa en vivo

### Recorrido sugerido de 5 minutos

1. **Hero + Sobre mí (1 minuto)**
   - Abrir `http://localhost:4321/`.
   - Mostrar la bajada del Hero y la sección única “Sobre mí”.
   - Explicar el foco UX/UI + Digital PM y la base técnica.

2. **Proyectos (2 minutos)**
   - Ir a `#proyectos`.
   - Cambiar el switch entre **Mirada UX/UI & Producto** y **Mirada Gestión & Arquitectura Técnica**.
   - Mostrar cómo cambia el foco de cada tarjeta y los resaltados.
   - Filtrar por **3D**.
   - Buscar `After Effects`.
   - Cambiar a **Ficha técnica**.
   - Abrir un caso completo, pasar imágenes con las flechas y cerrar con Escape.
   - Mostrar `applyMode` y `applyFilters` en `ProjectExplorer.astro`.

3. **Proceso (1 minuto)**
   - Ir a `#proceso`.
   - Recorrer las cinco etapas con clic y con flechas.
   - Mostrar entregables, herramientas y preguntas.
   - Mostrar `workflowStages` en `src/data/workflow.ts`.

4. **Live API (1 minuto)**
   - Ir a `#actividad`.
   - Mostrar el badge `🟢 Conectado en vivo a GitHub API` y las tarjetas reales.
   - Abrir la pestaña Network y mostrar la request a `api.github.com`.
   - Hacer clic en **Refrescar datos** para mostrar loading.
   - Escribir `zzz` para mostrar empty.
   - Hacer clic en **Simular error** y luego en **Usar datos de respaldo**.
   - Mostrar `loadRepos`, `setView` y `useFallback` en `LiveApiDashboard.astro`.

5. **Accesibilidad (1 minuto)**
   - Tabulador desde el inicio: skip link.
   - Mostrar foco visible.
   - Mostrar `aria-pressed` en el switch y filtros.
   - Mostrar `aria-selected` en las tabs del proceso.
   - Mostrar `aria-live` en resultados y estados.
   - Abrir un diálogo y mostrar que el foco queda adentro.
   - Cerrar con Escape y ver que el foco vuelve.

### Preguntas probables

**¿Por qué Astro y no React/Next?**

> Porque el portfolio es principalmente contenido. Astro genera HTML estático y solo hidrata las interacciones necesarias. React o Next agregarían peso y complejidad de estado sin un beneficio claro. La arquitectura de componentes se mantiene, pero el resultado final es más liviano.

**¿Por qué el switch de proyectos usa CSS y no un estado de framework?**

> Porque el cambio es una decisión de presentación: qué panel se muestra. Un atributo en `<html>` y una regla CSS resuelven el caso sin estado global, sin re-render y con fallback sin JavaScript. El script solo actualiza el atributo, el almacenamiento y los estados accesibles.

**¿Dónde está la API y cómo se ve?**

> En la sección “Actividad & Repositorios en Tiempo Real (Live API)”, al final de la página, antes del footer. Tiene un badge de conexión, el endpoint visible, tarjetas reales y una barra de pruebas para demostrar carga, vacío, error y respaldo.

**¿Qué pasa si la API de GitHub falla?**

> La sección muestra un estado de error con dos caminos: reintentar o usar datos de respaldo locales. Si el problema es rate limit, muestra la hora estimada de reintento. La página nunca queda rota ni con un spinner infinito. Además, el botón “Simular error” permite demostrar ese estado en la defensa.

**¿Cómo evitás XSS con datos de la API?**

> Los datos se insertan con `textContent` y `createElement`, no con `innerHTML`. Además se valida que la respuesta sea un array y que cada repo tenga `name` y `html_url` antes de renderizar.

**¿Cómo asegurás accesibilidad en el modal?**

> Uso `<dialog>` nativo con `showModal()`. El navegador atrapa el foco, cierra con Escape y devuelve el foco al abridor. El diálogo tiene `aria-labelledby`, el botón de cierre tiene `aria-label`, el carrusel tiene contador `aria-live` y el video informa que no tiene subtítulos.

**¿Cómo asegurás accesibilidad en el proceso?**

> Uso el patrón de tabs: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"` y `tabindex`. Las flechas, Home y End cambian de etapa, y una región `aria-live` anuncia el cambio.

**¿Qué mejorarías si tuvieras más tiempo?**

> Agregar subtítulos y audiodescripción al video, sumar tests automatizados de filtros y estados de API, hacer una auditoría con lectores de pantalla, optimizar más las imágenes, publicar el deploy y reemplazar los datos de respaldo por una estrategia de caché o un proxy con token si el rate limit se vuelve un problema.

---

## 10. Limitaciones y próximos pasos

- Completar la URL del repositorio y del deploy en `README.md`.
- Publicar en Vercel, Netlify o GitHub Pages.
- Agregar subtítulos y audiodescripción al video de Billie Eilish.
- Sumar tests de filtros, estados de API y tabs del proceso.
- Probar con VoiceOver/NVDA y en dispositivos reales.
- Optimizar imágenes de proyectos a WebP/AVIF con `srcset`.
- Evaluar un proxy con token para la API si el rate limit afecta la experiencia.
- Revisar y actualizar periódicamente los datos de respaldo de GitHub.

---

## 11. Checklist de cierre

- [x] Migración a AstroJS.
- [x] Cuatro proyectos con datos tipados.
- [x] Hero + Sobre mí unificados.
- [x] Switch de mirada en proyectos con persistencia.
- [x] Explorador con filtros, búsqueda, vistas y estado vacío.
- [x] WorkflowSimulator con cinco etapas y navegación por teclado.
- [x] LiveApiDashboard con badge, endpoint, estados y controles de prueba.
- [x] Diálogos de caso completo con carrusel y video.
- [x] Responsive y accesibilidad base.
- [x] README y PROCESO actualizados.
- [ ] Completar URLs de repositorio y deploy.
- [ ] Publicar.
