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

La consigna pedía migrar a AstroJS, incorporar al menos tres componentes interactivos, consumir una API externa con todos sus estados, resolver responsive y accesibilidad, documentar el proceso y construir un historial de commits progresivos.

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

## 2. Decisiones de arquitectura

| Decisión | Alternativa descartada | Por qué se eligió |
| --- | --- | --- |
| AstroJS con `output: 'static'` | Next.js, React SPA | El portfolio es contenido con interacciones puntuales. Astro envía menos JS y genera HTML accesible desde el primer render. |
| Datos en módulos TypeScript | Contenido hardcodeado en cada componente | Una sola fuente de verdad para proyectos, Mirada, navegación y respaldo de GitHub. |
| Componentes `.astro` | Un único HTML gigante | Reutilización, estilos scoped y responsabilidades claras. |
| Mirada con `data-mirada` + CSS | Estado global en un framework | Menos JavaScript, sin parpadeo, fallback sin JS y una única regla de visibilidad. |
| `<dialog>` nativo | Modal custom con divs | Foco, Escape, backdrop y semántica resueltos por el navegador. |
| API de GitHub + respaldo local | Datos hardcodeados solamente | La sección muestra datos reales y, si falla la API, no rompe la experiencia. |
| Script inline en `<head>` | Restaurar la Mirada después del primer paint | Evita el flash entre el modo por defecto y el guardado. |

### Sobre la Mirada

La Mirada no es un tema visual: es una forma de lectura. Cambia los textos de presentación, el foco de cada proyecto y los metadatos que se resaltan.

Se implementó con tres capas:

1. **CSS global**: todos los `[data-mirada-panel]` están ocultos; solo se muestra el que coincide con `html[data-mirada="..."]`.
2. **Script inline en el `<head>`**: lee `localStorage` y escribe `data-mirada` antes de que se pinte el contenido.
3. **Selector**: actualiza el atributo, `aria-pressed`, el almacenamiento y emite un evento `mirada:change` para que otros componentes reaccionen.

Ventajas:

- Sin JavaScript, el HTML queda en modo Integral y el contenido principal sigue visible.
- No hay que ocultar paneles con `hidden` desde el servidor.
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

## 3. Fases y commits

| # | Commit | Qué contiene |
| --- | --- | --- |
| 1 | `chore: initialize AstroJS project and base structure` | `package.json`, configuración de Astro, `.gitignore`, estructura de carpetas y assets. |
| 2 | `feat: add global layout, navigation and visual identity` | Layout, navegación, footer, tokens, tipografía y secciones base. |
| 3 | `feat: migrate project data and build interactive project explorer` | Datos de los cuatro proyectos, tarjetas, filtros, búsqueda, vistas y diálogos. |
| 4 | `feat: add reading mode selector with dynamic content` | Selector de Mirada, textos alternativos, persistencia y resaltados. |
| 5 | `feat: add GitHub activity section with async states` | Fetch de la API, loading, éxito, vacío, error, rate limit y respaldo. |
| 6 | `fix: polish responsive layout and accessibility` | Ajustes de contraste, foco, semántica, responsive y detalles de interacción. |
| 7 | `docs: add project documentation and defense guide` | `README.md` y `PROCESO.md`. |

Para ver el historial:

```bash
git log --oneline
```

---

## 4. Evidencia técnica

### 4.1 Selector de Mirada

**Archivos:**

- `src/components/ReadingMode.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/data/miradas.ts`
- `src/data/site.ts`

**Puntos exactos para mostrar:**

| Archivo | Líneas | Qué se ve |
| --- | --- | --- |
| `src/components/ReadingMode.astro` | 15-27 | Botones de Mirada con `data-mirada-button` y `aria-pressed`. |
| `src/components/ReadingMode.astro` | 55-88 | `applyMode`: cambia `data-mirada`, `aria-pressed`, resaltados, `localStorage` y emite `mirada:change`. |
| `src/components/ReadingMode.astro` | 92-98 | Lectura del modo guardado y aplicación inicial. |
| `src/layouts/BaseLayout.astro` | 45-54 | Script inline que restaura la Mirada antes del paint. |
| `src/styles/global.css` | 322-330 | Regla CSS que muestra solo el panel activo. |
| `src/data/miradas.ts` | 17-35 | Fuente de verdad de los tres modos. |
| `src/data/site.ts` | 35-41 | Textos de Hero por Mirada. |
| `src/data/site.ts` | 47-72 | Textos de Perfil por Mirada. |

**Variables principales:**

- `root`: `<html>`, donde se escribe `data-mirada`.
- `buttons`: botones del selector.
- `status`: región `aria-live` que anuncia el cambio.
- `labels` / `descriptions`: textos accesibles por modo.
- `validModes`: validación de valores guardados.
- `highlights`: elementos con `data-mirada-highlight`.
- `applyMode(mode, announce)`: función central.
- `initialMode`: modo guardado o Integral.

**Cómo explicarlo en 30 segundos:**

> La Mirada se resuelve con un atributo en `<html>`. El CSS muestra solo el panel que coincide. El script inline lee `localStorage` antes del paint para evitar el flash. El selector actualiza el atributo, los estados `aria-pressed`, guarda la preferencia y emite un evento para que el explorador actualice su mensaje. Sin JavaScript, queda Integral y todo el contenido principal sigue visible.

### 4.2 Explorador de proyectos

**Archivos:**

- `src/components/ProjectExplorer.astro`
- `src/components/ProjectCard.astro`
- `src/components/ProjectDialog.astro`
- `src/data/projects.ts`

**Puntos exactos para mostrar:**

| Archivo | Líneas | Qué se ve |
| --- | --- | --- |
| `src/components/ProjectExplorer.astro` | 156-160 | Estado de filtros y vista. |
| `src/components/ProjectExplorer.astro` | 179-203 | `applyFilters`: área, búsqueda, `hidden`, contador y estado vacío. |
| `src/components/ProjectExplorer.astro` | 212-225 | Cambio entre Galería y Ficha técnica. |
| `src/components/ProjectExplorer.astro` | 258-326 | Diálogos, carrusel, teclado, cierre y bloqueo de scroll. |
| `src/components/ProjectCard.astro` | 77-86 | Paneles de Mirada y resaltados de roles/herramientas. |
| `src/components/ProjectCard.astro` | 114-124 | Foco de Mirada en la ficha técnica. |
| `src/components/ProjectDialog.astro` | 15-20 | `<dialog>` con `aria-labelledby`. |
| `src/components/ProjectDialog.astro` | 58-85 | Carrusel y contador `aria-live`. |
| `src/components/ProjectDialog.astro` | 97-100 | Contenido por Mirada dentro del caso. |
| `src/data/projects.ts` | 89 | Array de proyectos tipado. |

**Variables principales:**

- `state`: `{ area, query, view }`.
- `cards`: tarjetas renderizadas.
- `visibleCount`: cantidad visible para los mensajes.
- `applyFilters()`: filtro combinado.
- `updateStatus(visible)`: mensaje accesible.
- `showSlide(nextIndex)`: carrusel circular.
- `dialogs`: todos los `<dialog>` del documento.

**Cómo explicarlo en 30 segundos:**

> El explorador no vuelve a renderizar las tarjetas: las tiene en el DOM y alterna `hidden` según área y búsqueda. El estado vive en un objeto chico. La vista Galería/Ficha se resuelve con `data-view` en el contenedor y CSS. Los casos completos se abren en `<dialog>` nativo, con foco atrapado, cierre por Escape, backdrop y pausa de video.

### 4.3 Actividad de GitHub

**Archivos:**

- `src/components/GitHubActivity.astro`
- `src/data/github.ts`

**Puntos exactos para mostrar:**

| Archivo | Líneas | Qué se ve |
| --- | --- | --- |
| `src/components/GitHubActivity.astro` | 143-151 | Estado local: repos, lenguaje, búsqueda, fuente, request y controller. |
| `src/components/GitHubActivity.astro` | 153-169 | `setView`: alterna loading, éxito, vacío y error. |
| `src/components/GitHubActivity.astro` | 309-347 | `renderFiltered`: búsqueda, lenguaje, estado vacío y status. |
| `src/components/GitHubActivity.astro` | 349-357 | `useFallback`: carga los datos locales. |
| `src/components/GitHubActivity.astro` | 359-437 | `loadRepos`: fetch, timeout, validación, errores y rate limit. |
| `src/components/GitHubActivity.astro` | 374-378 | `fetch` con `Accept`, `no-store` y `AbortSignal`. |
| `src/components/GitHubActivity.astro` | 382-403 | Detección de rate limit y hora de reintento. |
| `src/components/GitHubActivity.astro` | 420-437 | Manejo de timeout y errores. |
| `src/data/github.ts` | 21-23 | URL de la API. |
| `src/data/github.ts` | 25 | Datos de respaldo. |

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
- `loadRepos()`: fetch y manejo de errores.

**Estados:**

| Estado | Disparador | Salida |
| --- | --- | --- |
| Loading | Inicio o reintento | Skeleton + `aria-busy` |
| Success | Array con repos | Tarjetas + filtros |
| Empty | Array vacío o filtro sin resultados | Mensaje + acciones |
| Error | Red, timeout, formato o status no OK | Mensaje + reintento + respaldo |
| Rate limit | 403/429 o `remaining: 0` | Mensaje con hora de reintento |
| Fallback | Acción del usuario | Tarjetas locales marcadas |

**Cómo explicarlo en 30 segundos:**

> La sección hace un `fetch` a la API pública de GitHub con timeout de 10 segundos y `AbortController`. Valida que la respuesta sea un array y que cada repo tenga nombre y URL. Si falla, muestra un estado de error con reintento y la opción de usar datos locales. Si GitHub limita las solicitudes, calcula la hora de reintento con `x-ratelimit-reset`. Los datos se insertan con `textContent`, no con `innerHTML`.

---

## 5. Accesibilidad y responsive

### Evidencia

| Criterio | Archivo | Líneas |
| --- | --- | --- |
| Skip link | `src/layouts/BaseLayout.astro` | 57 |
| Foco visible | `src/styles/global.css` | 120-124 |
| Movimiento reducido | `src/styles/global.css` | 162-174 |
| Scroll con offset por nav + Mirada | `src/styles/global.css` | 59 |
| Menú mobile con `aria-expanded` / `aria-controls` | `src/components/Nav.astro` | 14-15 |
| Cierre con Escape y retorno de foco | `src/components/Nav.astro` | 59-62 |
| Sección activa con `aria-current` | `src/components/Nav.astro` | 100-102 |
| Resultados con `role="status"` | `src/components/ProjectExplorer.astro` | 97 |
| Filtros con `aria-pressed` | `src/components/ProjectExplorer.astro` | 61, 199 |
| Diálogo nativo con `aria-labelledby` | `src/components/ProjectDialog.astro` | 15-20 |
| Estado de API con `aria-live` | `src/components/GitHubActivity.astro` | 35 |
| Filtros de lenguaje con `aria-pressed` | `src/components/GitHubActivity.astro` | 268-276 |
| `aria-busy` durante carga | `src/components/GitHubActivity.astro` | 15, 155 |
| Video con nota de accesibilidad | `src/components/ProjectDialog.astro` | 51-53 |

### Decisiones

- La jerarquía de encabezados se mantiene: un `h1`, `h2` por sección, `h3`/`h4` dentro.
- Las tarjetas usan `aria-label` con el título del proyecto para que la ficha técnica también tenga nombre accesible.
- Los paneles ocultos por Mirada usan `display: none`, por lo que no se anuncian.
- Los botones de filtro y Mirada usan `aria-pressed`, no `aria-selected`.
- Los mensajes de resultados usan `aria-live="polite"`, no `alert`.
- El modal usa `<dialog>` nativo; no se reimplementa el focus trap.
- Las animaciones se desactivan con `prefers-reduced-motion`.
- Los controles principales tienen al menos 44 px de alto.
- Se usa `100svh`/`100dvh` para evitar saltos por la barra del navegador mobile.

### Breakpoints

- `900px`: menú mobile, Hero a una columna, grillas de GitHub a dos columnas.
- `860px`: diálogo a una columna.
- `820px`: perfil y trayectoria a una columna.
- `640px`: GitHub a una columna.
- `560px`: Hero sin altura forzada, acciones a ancho completo, diálogo a pantalla completa.

### Limitaciones

- El video no tiene subtítulos ni audiodescripción; se informa en la interfaz.
- No se hizo una auditoría formal con lector de pantalla.
- Las fuentes externas pueden fallar; hay fallback del sistema.
- La API depende de red y rate limit.

---

## 6. Pruebas realizadas

### Build

```bash
npm run build
```

Resultado: build estática exitosa, una página generada en `dist/`.

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

- El HTML generado no contiene atributos `hidden` en los paneles de Mirada.
- Los paneles se muestran según `data-mirada`.
- El build incluye la sección `#actividad`.
- El explorador conserva los cuatro proyectos.
- Los diálogos tienen `aria-labelledby` y cierre accesible.
- El README y este documento existen y están enlazados.

### Qué no se probó

- Lectores de pantalla reales (VoiceOver, NVDA).
- Matriz completa de navegadores y dispositivos.
- Deploy en un hosting real.
- Tests automatizados de componentes o de API.

---

## 7. Guía Rápida para Defensa en Vivo

### Recorrido sugerido de 5 minutos

1. **Mirada (1 minuto)**
   - Abrir la página.
   - Hacer click en **Diseño & UX**.
   - Mostrar cómo cambian Hero y Perfil.
   - Abrir DevTools y ver `data-mirada="ux"` en `<html>`.
   - Mostrar `localStorage` con `portfolio-mirada`.
   - Mostrar la regla CSS en `src/styles/global.css:322-330`.

2. **Proyectos (2 minutos)**
   - Filtrar por **3D**.
   - Buscar `After Effects`.
   - Cambiar a **Ficha técnica**.
   - Abrir un caso completo.
   - Pasar imágenes con las flechas.
   - Cerrar con Escape.
   - Mostrar `src/components/ProjectExplorer.astro:179-203` y `:258-326`.

3. **API (1 minuto)**
   - Abrir la pestaña Network y recargar.
   - Mostrar la request a `api.github.com`.
   - Explicar los estados con `src/components/GitHubActivity.astro:153-169` y `:359-437`.
   - Si se quiere demostrar el error: bloquear la request o desconectar la red, recargar y mostrar el estado de error + respaldo.

4. **Accesibilidad (1 minuto)**
   - Tabulador desde el inicio: skip link.
   - Mostrar foco visible.
   - Mostrar `aria-pressed` en filtros.
   - Mostrar `aria-live` en resultados.
   - Abrir un diálogo y mostrar que el foco queda adentro.
   - Cerrar con Escape y ver que el foco vuelve.

### Tabla de archivos y líneas

| Tema | Archivo | Líneas |
| --- | --- | --- |
| Selector de Mirada (UI) | `src/components/ReadingMode.astro` | 15-27 |
| Selector de Mirada (lógica) | `src/components/ReadingMode.astro` | 55-98 |
| Restauración antes del paint | `src/layouts/BaseLayout.astro` | 45-54 |
| Visibilidad por CSS | `src/styles/global.css` | 322-330 |
| Datos de Mirada | `src/data/miradas.ts` | 17-35 |
| Textos por Mirada | `src/data/site.ts` | 35-72 |
| Filtros y búsqueda | `src/components/ProjectExplorer.astro` | 156-203 |
| Vista Galería/Ficha | `src/components/ProjectExplorer.astro` | 212-225 |
| Diálogo y carrusel | `src/components/ProjectExplorer.astro` | 258-326 |
| Tarjeta y paneles | `src/components/ProjectCard.astro` | 77-86, 114-124 |
| Diálogo de caso | `src/components/ProjectDialog.astro` | 15-20, 58-85, 97-100 |
| Datos de proyectos | `src/data/projects.ts` | 89 |
| Estados de API | `src/components/GitHubActivity.astro` | 143-169 |
| Filtros de API | `src/components/GitHubActivity.astro` | 309-347 |
| Respaldo local | `src/components/GitHubActivity.astro` | 349-357 |
| Fetch y errores | `src/components/GitHubActivity.astro` | 359-437 |
| URL y respaldo | `src/data/github.ts` | 21-25 |
| Skip link | `src/layouts/BaseLayout.astro` | 57 |
| Foco visible | `src/styles/global.css` | 120-124 |
| Menú mobile | `src/components/Nav.astro` | 14-15, 59-62 |
| Resultados accesibles | `src/components/ProjectExplorer.astro` | 97 |
| Estado de API accesible | `src/components/GitHubActivity.astro` | 35 |

### Preguntas probables

**¿Por qué Astro y no React/Next?**

> Porque el portfolio es principalmente contenido. Astro genera HTML estático y solo hidrata las interacciones necesarias. React o Next agregarían peso y complejidad de estado sin un beneficio claro. La arquitectura de componentes se mantiene, pero el resultado final es más liviano.

**¿Por qué la Mirada usa CSS y no un estado de framework?**

> Porque el cambio es una decisión de presentación: qué panel se muestra. Un atributo en `<html>` y una regla CSS resuelven el caso sin estado global, sin re-render y con fallback sin JavaScript. El script solo actualiza el atributo, el almacenamiento y los estados accesibles.

**¿Qué pasa si la API de GitHub falla?**

> La sección muestra un estado de error con dos caminos: reintentar o usar datos de respaldo locales. Si el problema es rate limit, muestra la hora estimada de reintento. La página nunca queda rota ni con un spinner infinito.

**¿Cómo evitás XSS con datos de la API?**

> Los datos se insertan con `textContent` y `createElement`, no con `innerHTML`. Además se valida que la respuesta sea un array y que cada repo tenga `name` y `html_url` antes de renderizar.

**¿Cómo asegurás accesibilidad en el modal?**

> Uso `<dialog>` nativo con `showModal()`. El navegador atrapa el foco, cierra con Escape y devuelve el foco al abridor. El diálogo tiene `aria-labelledby`, el botón de cierre tiene `aria-label`, el carrusel tiene contador `aria-live` y el video informa que no tiene subtítulos.

**¿Qué mejorarías si tuvieras más tiempo?**

> Agregar subtítulos y audiodescripción al video, sumar tests automatizados de filtros y estados de API, hacer una auditoría con lectores de pantalla, optimizar más las imágenes, publicar el deploy y reemplazar los datos de respaldo por una estrategia de caché o un proxy con token si el rate limit se vuelve un problema.

**¿Qué parte te costó más?**

> La convivencia entre la Mirada y los componentes: había que evitar el flash inicial, no duplicar la lógica de visibilidad y mantener el fallback sin JavaScript. La solución fue concentrar la visibilidad en CSS y la restauración temprana en un script inline mínimo.

---

## 8. Limitaciones y próximos pasos

- Completar la URL del repositorio y del deploy en `README.md`.
- Publicar en Vercel, Netlify o GitHub Pages.
- Agregar subtítulos y audiodescripción al video de Billie Eilish.
- Sumar tests de filtros, estados de API y carrusel.
- Probar con VoiceOver/NVDA y en dispositivos reales.
- Optimizar imágenes de proyectos a WebP/AVIF con `srcset`.
- Evaluar un proxy con token para la API si el rate limit afecta la experiencia.
- Revisar y actualizar periódicamente los datos de respaldo de GitHub.

---

## 9. Checklist de cierre

- [x] Migración a AstroJS.
- [x] Cuatro proyectos con datos tipados.
- [x] Selector de Mirada con persistencia y fallback.
- [x] Explorador con filtros, búsqueda, vistas y estado vacío.
- [x] Diálogos de caso completo con carrusel y video.
- [x] API de GitHub con loading, éxito, vacío, error, rate limit y respaldo.
- [x] Responsive y accesibilidad base.
- [x] README y PROCESO.
- [ ] Completar URLs de repositorio y deploy.
- [ ] Publicar.
