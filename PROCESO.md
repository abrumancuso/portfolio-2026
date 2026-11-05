# PROCESO.md — Bitácora, decisiones y guía de defensa

Documento de trabajo del portfolio **Abril Mancuso — Project Manager & Diseñadora UX/UI** para **Programación Multimedial IV (2026)**.

Este archivo explica **qué se hizo, por qué se tomó cada decisión, cómo se construyó la API externa y cómo defender el proyecto en vivo**. No reemplaza al README: lo complementa con el proceso y los argumentos de defensa.

---

## 1. Propósito del proyecto

El objetivo no fue hacer “una página linda con proyectos”, sino construir un **portfolio profesional que demuestre criterio de producto, diseño y gestión técnica**.

La consigna pedía:

- Presentación personal.
- Sección de proyectos.
- Componentes propios con interacción significativa.
- Una API externa visible.
- Diseño responsive.
- Accesibilidad.
- Documentación.
- Commits progresivos.

La resolución fue:

- **Hero + una única sección “Sobre mí”**, sin duplicar información.
- **Cuatro proyectos reales** presentados como selección, no como totalidad.
- **Páginas individuales** para cada proyecto, con URL propia.
- **Tres componentes propios**: `ProjectExplorer`, `WorkflowSimulator` y `AlbumLab`.
- **iTunes Search API** como API externa visible, con estados de carga, éxito, vacío, error y respaldo.
- **Posicionamiento formal**: Abril Mancuso, Project Manager & Diseñadora UX/UI.
- **Documentación y commits** que permiten reconstruir el proceso.

---

## 2. Decisión de posicionamiento

### Qué se corrigió

La versión anterior comunicaba un perfil más informal y apoyado en “Abru”. También mezclaba diseño, código y gestión sin una jerarquía clara.

### Qué se decidió

- Usar siempre el nombre completo: **Abril Mancuso**.
- Posicionar el perfil como **Project Manager & Diseñadora UX/UI**.
- Presentar la base técnica multimedial como **diferencial**, no como identidad principal.
- Escribir en un tono profesional, claro y directo, sin perder cercanía.
- Evitar promesas genéricas y frases de marketing vacías.

### Por qué

Un portfolio tiene que responder rápido tres preguntas:

1. **Quién soy.**
2. **Qué hago.**
3. **Por qué deberían contratarme o convocarme.**

El perfil anterior no las respondía con suficiente claridad. La nueva versión sí:

- **PM**: organiza alcance, prioridades, equipos y entregas.
- **UX/UI**: investiga, define flujos, diseña interfaces y valida accesibilidad.
- **Base técnica**: permite dialogar con desarrollo, entender restricciones y liderar handoffs reales.

### Dónde se aplicó

- `src/data/site.ts`: nombre, rol, Hero, Sobre mí, navegación y contacto.
- `src/components/Hero.astro`: “Abril Mancuso” + rol + propuesta.
- `src/components/About.astro`: perfil unificado y tags profesionales.
- `src/components/Footer.astro`: contacto formal.
- `src/layouts/BaseLayout.astro`: título y descripción SEO.
- `README.md` y `PROCESO.md`: documentación alineada.

---

## 3. Arquitectura general

### Stack

| Capa | Tecnología | Motivo |
| --- | --- | --- |
| Framework | AstroJS 6.4.8 | Sitio estático, componentes, poco JS, build simple. |
| Lenguaje | TypeScript / JavaScript | Tipos para datos y lógica de cliente. |
| Estilos | CSS con custom properties | Control total, sin dependencias, responsive. |
| API | iTunes Search API | Pública, sin token, con CORS y portadas reales para trabajar identidad visual. |
| Rutas | `getStaticPaths()` | Una página estática por proyecto. |
| Persistencia | `localStorage` | Recordar el enfoque de lectura de proyectos. |

### Por qué Astro y no una SPA

El portfolio es contenido con interacciones acotadas. Astro entrega HTML estático y carga JavaScript solo donde hace falta. Una SPA agregaría routing, hidratación y estado global sin mejorar la experiencia central.

### Estructura de la página principal

```
#inicio       Hero
#sobre-mi     Perfil profesional
#proyectos    Explorador de proyectos
#proceso      Simulador de proceso
#identidad    iTunes Search API
#contacto     Footer
```

### Páginas individuales

```
/proyectos/billie-animation
/proyectos/macbook-3d
/proyectos/maimoconecta
/proyectos/manual-marea
```

Cada página se genera con `getStaticPaths()` desde `src/data/projects.ts` y contiene:

- Título, tag, año y resumen.
- Datos del proyecto: áreas, rol y herramientas.
- Video o carrusel de imágenes.
- Métricas.
- El desafío.
- Mi rol.
- Dos lecturas: UX/UI & Producto / Gestión & Arquitectura Técnica.
- Proceso técnico y herramientas.
- Aprendizajes.
- Navegación al proyecto anterior y siguiente.
- Link a Behance y vuelta a la selección.

### Flujo de datos

```
src/data/*.ts
  → componentes .astro (build time)
    → HTML estático
      → getStaticPaths() genera /proyectos/[id]
        → scripts de cliente (interacción)
          → iTunes Search API (fetch en el navegador)
            → set de respaldo local si falla
```

---

## 4. Componentes propios

### 4.1 `ProjectExplorer`

**Archivos:**

- `src/components/ProjectExplorer.astro`
- `src/components/ProjectCard.astro`
- `src/data/projects.ts`
- `src/data/miradas.ts`

**Qué resuelve:** explorar cuatro proyectos y cambiar el foco de lectura según el rol profesional.

**Interacción significativa obligatoria:** selector **Mirada UX/UI & Producto** / **Mirada Gestión & Arquitectura Técnica**.

- Cambia `data-mirada` en `<html>`.
- Actualiza `aria-pressed`.
- Resalta metadatos con `data-mirada-highlight`.
- Cambia la descripción visible.
- Persiste en `localStorage` con la clave `portfolio-mirada`.
- Usa CSS para los paneles `data-mirada-panel`.

**Otras funciones:**

- Filtros por área.
- Búsqueda por título, herramienta, rol o texto.
- Vista **Galería visual** y **Ficha técnica**.
- Contador con `role="status"` y `aria-live="polite"`.
- Estado vacío y limpieza de filtros.
- Tarjetas con enlace a la página individual del proyecto.

**Decisión clave:** los proyectos ya no se abren en un `<dialog>`. Cada tarjeta lleva a `/proyectos/[id]`. Eso permite:

- Compartir un caso por URL.
- Inspeccionarlo con scroll completo.
- Volver con el botón del navegador.
- Indexarlo mejor.
- Evitar la sensación de “modal que no abre”.

### 4.2 `WorkflowSimulator`

**Archivos:**

- `src/components/WorkflowSimulator.astro`
- `src/data/workflow.ts`

**Qué resuelve:** mostrar el proceso de trabajo en cinco etapas navegables.

1. Discovery & UX Research.
2. Definición & Priorización (PM).
3. Wireframing & UI Design.
4. Handoff & Desarrollo.
5. Testing & Accesibilidad.

Cada etapa muestra:

- Entregables.
- Herramientas.
- Preguntas que se responden.

**Accesibilidad:** patrón de tabs con `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `tabindex` y navegación con flechas, Home y End. El panel activo se anuncia con `aria-live`.

**Por qué es significativa:** convierte el “proceso” en algo verificable. No es una lista estática: se puede recorrer y explicar en la defensa.

### 4.3 `AlbumLab`

**Archivos:**

- `src/components/AlbumLab.astro`
- `src/data/albums.ts`

**Qué resuelve:** consumir una API externa real, leer la identidad visual de una portada y traducirla a un sistema de diseño acotado.

**Funciones:**

- Busca álbumes por artista en iTunes Search API.
- Muestra hasta 12 resultados con portada, título, artista, año y género.
- Permite seleccionar un álbum y regenerar el manual.
- Extrae una paleta de cinco colores de la portada con `canvas` y `getImageData`.
- Conserva el peso de cada color y lo muestra en una tira proporcional.
- Asigna nombres descriptivos en español y roles: dominante, acento, claro, profundo y apoyo.
- Elige una dupla tipográfica curada según el género: Fraunces, Archivo Black o Space Grotesk, siempre con DM Sans para lectura.
- Genera un análisis de diseño en primera persona: lectura de la portada, color dominante, qué transmite cada color, hipótesis de aplicación, tono, tokens CSS y vista aplicada.
- Permite copiar cada HEX y el bloque completo de tokens.
- Tiene carga, éxito, vacío, error y set de ejemplo.
- Timeout de 12 segundos con `AbortController` y race guards.
- Set local en `src/data/albums.ts`.
- Mensaje `noscript`.

**Por qué es significativa:** es la API externa visible y, al mismo tiempo, una demostración de criterio de diseño. No es un listado de tarjetas: obliga a observar una imagen, extraer una paleta, ordenar roles, elegir tipografías y comunicar el alcance de la interpretación.

**Por qué está en el portfolio:** un PM y una diseñadora UX/UI trabajan con identidades que ya existen. El manual muestra cómo se lee un material, cómo se traduce a sistema y cómo se evita presentar una interpretación como verdad oficial.

---

## 5. API externa: iTunes Search API

### 5.1 Por qué se descartaron las opciones anteriores

La versión anterior usaba The Color API para generar paletas. Funcionaba técnicamente, pero el vínculo con el portfolio era débil:

- Era un ejercicio de color suelto, no conectado con los proyectos.
- No aportaba al relato de gestión ni de research.
- El resultado no ayudaba a explicar cómo trabaja Abril.
- Se sentía como “API porque había que usar una API”.

Después se probó Random User API con un laboratorio de proto-personas. También funcionaba, pero el resultado seguía siendo genérico:

- Generaba perfiles ficticios que no decían nada sobre el criterio de Abril.
- El vínculo con research era correcto, pero la interacción se parecía a un CRUD de tarjetas.
- No aportaba una visualización propia ni un momento memorable en el portfolio.

Luego se probó Hacker News API con un radar de señales. Tenía datos reales, pero el resultado seguía siendo ajeno al portfolio:

- Las señales eran conversaciones técnicas que no conectaban con los proyectos de diseño.
- El radar exigía explicar demasiado contexto externo.
- El vínculo con la identidad visual y con los casos de Billie y Tini no existía.

Se reemplazó por un **manual de identidad instantáneo** con iTunes Search API:

- Portadas reales y reconocibles.
- Búsqueda libre de cualquier artista.
- Extracción de paleta desde la imagen.
- Tipografía curada y tokens aplicables.
- Un relato claro: leer una identidad, traducirla a sistema y comunicar el alcance.

### 5.2 Ubicación exacta en pantalla

La sección se llama **“Identidad: un manual en segundos”**.

Está:

- Después de **“Proceso de trabajo”**.
- Antes del footer de contacto.
- En la navegación: link **“Identidad”** (`#identidad`).

Además incluye un bloque previo, **“Un ejemplo de mi trabajo”**, que explica el valor del ejercicio antes de mostrar la API.

### 5.3 Ubicación exacta en el código

| Responsabilidad | Archivo | Marcas / funciones |
| --- | --- | --- |
| Sección visible | `src/components/AlbumLab.astro` | `id="identidad"`, `data-album-lab` |
| Render en la página | `src/pages/index.astro` | `<AlbumLab />` |
| Badge de estado | `src/components/AlbumLab.astro` | `data-badge`, `data-badge-text`, `updateBadge` |
| Endpoint visible | `src/components/AlbumLab.astro` | `.album-lab__endpoint` |
| Buscador | `src/components/AlbumLab.astro` | `data-search-form`, `data-search-input`, `loadAlbums` |
| Ejemplos rápidos | `src/components/AlbumLab.astro` | `data-example` |
| Grilla de álbumes | `src/components/AlbumLab.astro` | `.album-lab__grid`, `data-grid`, `renderGrid` |
| Selección | `src/components/AlbumLab.astro` | `data-album-id`, `aria-pressed`, `selectAlbum` |
| Portada y metadata | `src/components/AlbumLab.astro` | `data-cover`, `data-album-title`, `data-album-artist`, `data-album-meta` |
| Paleta | `src/components/AlbumLab.astro` | `data-palette`, `extractPalette`, `renderPalette` |
| Tipografía | `src/components/AlbumLab.astro` | `getTypographyPair`, `renderTypography` |
| Tokens | `src/components/AlbumLab.astro` | `buildTokens`, `data-tokens`, `data-copy-tokens` |
| Vista aplicada | `src/components/AlbumLab.astro` | `data-preview`, `applyPreview` |
| Estados | `src/components/AlbumLab.astro` | `setView`, `data-loading`, `data-content`, `data-empty`, `data-error` |
| Fetch | `src/components/AlbumLab.astro` | `loadAlbums`, `fetchJson`, `AbortController` |
| Normalización | `src/data/albums.ts` | `toAlbum`, `getArtworkUrl` |
| Tipografías curadas | `src/data/albums.ts` | `typographyPairs`, `getTypographyPair` |
| Respaldo | `src/data/albums.ts` | `fallbackAlbums` |

### 5.4 Endpoint

```
GET https://itunes.apple.com/search?term={artista}&entity=album&limit=12&country=US
```

- No requiere token ni clave.
- Devuelve JSON público con CORS habilitado (`access-control-allow-origin: *`).
- `entity=album` limita la búsqueda a álbumes.
- `limit=12` acota la grilla.
- `country=US` amplía el catálogo disponible.
- La portada llega como `artworkUrl100`; `getArtworkUrl` reemplaza el sufijo por `600x600bb` para trabajar con una imagen de mayor tamaño.
- Se usa `cache: 'no-store'` para traer resultados frescos.
- La API tiene límites de uso informales; por eso existe el set de ejemplo local.

### 5.5 Respuesta usada

```json
{
  "resultCount": 12,
  "results": [
    {
      "collectionId": 1739659134,
      "collectionName": "HIT ME HARD AND SOFT",
      "artistName": "Billie Eilish",
      "artworkUrl100": "https://is1-ssl.mzstatic.com/.../100x100bb.jpg",
      "releaseDate": "2024-05-17T07:00:00Z",
      "trackCount": 11,
      "primaryGenreName": "Alternative",
      "collectionViewUrl": "https://music.apple.com/us/album/..."
    }
  ]
}
```

`toAlbum` valida que existan `collectionId`, `collectionName` y `artworkUrl100`. Si falta el artista, usa `Artista desconocido`; si falta el género, `Música`; si falta la fecha, `s/f`. Los resultados se deduplican por `collectionId` y se ordenan para priorizar coincidencias exactas del artista buscado antes de recortar a 12.

### 5.6 Estados implementados

| Estado | Badge | Qué se ve | Disparador |
| --- | --- | --- | --- |
| Carga de búsqueda | `Buscando álbumes…` | Skeleton + `aria-busy` | Al buscar o reintentar |
| Carga del manual | `Analizando portada…` | Skeleton del manual | Al seleccionar un álbum |
| Éxito | `Manual generado` | Grilla, portada, paleta, tipografía, tokens y preview | Respuesta válida + canvas disponible |
| Vacío | `Sin resultados` | Mensaje y acciones | Búsqueda sin álbumes |
| Error | `Error de conexión` | Mensaje, reintento y set de ejemplo | Fallo de red, timeout o formato inválido |
| Respaldo | `Set de ejemplo` | Álbumes locales | Botón “Ver set de ejemplo” |

### 5.7 Controles visibles para la defensa

- **Buscar un artista**: consulta iTunes y actualiza la grilla.
- **Usar un ejemplo rápido**: Billie Eilish, Tini, Dua Lipa o Bad Bunny.
- **Seleccionar un álbum**: actualiza portada, paleta, tira proporcional, nombres de color, análisis, tipografía, tokens y preview.
- **Copiar un HEX**: confirma en `aria-live`.
- **Copiar tokens**: descarga el bloque CSS listo para usar.
- **Reintentar consulta**: disponible en los estados vacío y error.
- **Ver set de ejemplo**: carga álbumes locales para demostrar la interfaz sin depender de la red.

### 5.8 Decisiones técnicas de la API

- **Timeout:** `AbortController` corta a los 12 segundos.
- **Race guards:** `requestId` y `manualRequestId` evitan que una respuesta vieja pise una búsqueda o un manual más reciente.
- **Validación:** se descartan ítems sin id, nombre o portada.
- **Deduplicación:** `Set<number>` por `collectionId`.
- **Orden:** las coincidencias exactas de artista se muestran primero; después las que incluyen el término.
- **Paleta:** la portada se dibuja en un canvas de 96×96, se agrupan píxeles en buckets de color, se promedian y se eligen hasta cinco colores con distancia mínima. Si no hay suficientes, se generan variantes del dominante.
- **Peso:** cada color conserva la cantidad de píxeles que lo respaldan; la tira superior usa ese peso para mostrar proporciones reales.
- **Nombres:** `rgbToHsl` + `getHueFamily` + `describeColor` convierten cada HEX en una etiqueta legible como `azul profundo` o `rosa claro`.
- **Análisis:** `buildAnalysis` arma un texto en primera persona con el color dominante, el acento, la tipografía elegida y una aplicación posible. Es una hipótesis de diseño, no un dato oficial.
- **Roles:** el color más frecuente es dominante; el más saturado, acento; el más claro y el más oscuro completan la escala.
- **Contraste:** `contrastText` elige texto claro u oscuro según luminancia relativa; el umbral es `0.179`.
- **Tipografía:** `getTypographyPair` mapea género a una dupla curada. No se infiere de la imagen.
- **Tokens:** `buildTokens` genera variables CSS de fondo, superficie, texto, acento, borde y fuentes.
- **Seguridad:** `textContent` y APIs del DOM, nunca `innerHTML` con datos de la API.
- **Copiar:** `navigator.clipboard.writeText` con confirmación en `aria-live` y fallback si el navegador lo bloquea.
- **Respaldo:** la sección nunca queda rota.
- **Sin secretos:** no hay claves ni variables de entorno.
- **Cache:** `no-store` para datos frescos.

### 5.9 Limitaciones y ética

- iTunes no devuelve tipografías; la dupla es una recomendación curada, no un dato de la API.
- El manual es una interpretación, no el manual oficial de la discográfica.
- La paleta es heurística: portadas con texto, logos o degradés pueden producir colores que no son los oficiales de la marca.
- Los resultados pueden incluir singles, colaboraciones o ediciones regionales.
- La API puede fallar, tardar o limitar requests; existe set de ejemplo.
- Las portadas pertenecen a sus respectivos titulares y se usan con fines educativos y de portfolio.
- El servicio es externo y puede cambiar sin aviso.

---

## 6. Accesibilidad

### Implementado

- Skip link al contenido principal.
- Landmarks y jerarquía de encabezados.
- Navegación con `aria-label`, `aria-expanded`, `aria-controls` y Escape.
- Sección activa con `aria-current="location"`; página de proyecto con `aria-current="page"`.
- Foco visible con `:focus-visible`.
- Selector de proyectos, filtros y vistas con `aria-pressed`.
- Tabs del proceso con navegación por teclado.
- Estados de API con `role="status"` y `aria-live="polite"`.
- `aria-busy` durante la carga.
- Inputs con `label` y ayuda asociada.
- Imágenes con `alt`; decorativas con `aria-hidden`.
- Video sin subtítulos informado en la interfaz.
- `prefers-reduced-motion`.
- Áreas táctiles de 44 px en controles principales.
- `svh`/`dvh` para mobile.

### Limitaciones

- El video no tiene subtítulos ni audiodescripción.
- Las fuentes de Google pueden fallar; hay fallback del sistema.
- El manual depende de red e iTunes Search API.
- No se hizo auditoría formal con lector de pantalla; se aplicaron criterios manuales y revisión de contraste.

### Por qué importa

La accesibilidad no es un extra: es parte del trabajo de UX/UI. Un portfolio que habla de experiencia y no es accesible pierde coherencia.

---

## 7. Responsive

### Breakpoints principales

| Ancho | Cambios |
| --- | --- |
| `900px` | Menú mobile, Hero a una columna, proceso horizontal, manual a una columna. |
| `820px` | Páginas de proyecto: datos, métricas y lecturas a una columna. |
| `700px` | Panel del manual y acciones apiladas. |
| `640px` | Tarjetas y toolbar a una columna. |
| `560px` | Página de proyecto con padding reducido, paginación y footer apilados. |

### Estrategia

- Grid y flexbox.
- `clamp()` para tipografía y espaciado.
- `minmax()` para grillas fluidas.
- Sin alturas fijas innecesarias.
- Carrusel de imágenes con controles de 44 px.

---

## 8. Verificación manual realizada

No hay tests automatizados. La verificación combinó el servidor de desarrollo, `curl` y Chrome headless con CDP.

### Verificación técnica realizada

- [x] El servidor de desarrollo compila la página principal y las páginas de proyecto sin errores.
- [x] Las cuatro rutas `/proyectos/[id]` responden con `200`.
- [x] Las tarjetas de proyecto enlazan a `/proyectos/[id]` y no abren modales.
- [x] Los links de navegación usan rutas absolutas (`/#...`) y funcionan desde las páginas de proyecto.
- [x] Las páginas de proyecto incluyen video o carrusel según el caso.
- [x] La sección `#identidad` renderiza badge, endpoint, buscador, ejemplos y grilla.
- [x] La carga inicial con **Billie Eilish** devuelve 10 álbumes y genera el manual del primero.
- [x] La búsqueda **Tini** devuelve 12 álbumes y prioriza **Cupido** de TINI.
- [x] La selección de un álbum actualiza portada, paleta de 5 colores, tira proporcional, nombres de color, análisis, tipografía, tokens y vista aplicada.
- [x] La tarjeta seleccionada muestra su mini paleta y todas las tarjetas tienen foco visible, hover y acción “Ver análisis”.
- [x] La portada del manual ya no usa `sticky`: no se superpone con el preview al scrollear.
- [x] El análisis se genera en primera persona y menciona colores, qué transmiten y una aplicación concreta.
- [x] El estado de error se disparó con red offline; el set de ejemplo carga 4 álbumes y una paleta de 5 colores.
- [x] La sección de proyectos ya no contiene `ProjectDialog` ni `data-open-dialog`.
- [x] El HTML generado incluye los cuatro links a las páginas individuales.
- [x] No hay scroll horizontal a 360, 390, 768 ni 1440 px.

### Verificación de la API

```bash
curl -sS -D - "https://itunes.apple.com/search?term=Billie%20Eilish&entity=album&limit=12&country=US"
curl -sS -D - -o /dev/null "https://is1-ssl.mzstatic.com/image/thumb/.../600x600bb.jpg"
```

Se verificó:

- Respuesta `200`.
- `access-control-allow-origin: *` en la API y en las portadas de `mzstatic.com`.
- La respuesta incluye `collectionId`, `collectionName`, `artistName`, `artworkUrl100`, `releaseDate`, `trackCount`, `primaryGenreName` y `collectionViewUrl`.
- El reemplazo de `100x100bb.jpg` por `600x600bb.jpg` devuelve una portada válida.
- El canvas puede leer los píxeles de la portada sin error de CORS.
- El manual carga 5 colores y una dupla tipográfica coherente con el género.

### Pendiente de prueba manual en navegador

- [ ] Menú mobile: abrir, cerrar y navegar.
- [ ] Selector de Mirada: cambio, persistencia y resaltados.
- [ ] Filtros, búsqueda y estado vacío de proyectos.
- [ ] Carrusel de imágenes con botones y teclado.
- [ ] Tabs del proceso con flechas, Home y End.
- [ ] Manual: timeout de 12 segundos y búsqueda sin resultados.
- [ ] Copiar HEX y tokens en un navegador real con permisos de clipboard.
- [ ] Revisión de scroll horizontal en 360, 768 y 1280 px.
- [ ] Auditoría con lector de pantalla.
- [ ] Tests automatizados.
- [ ] Build de producción final.
- [ ] Deploy y URL pública.
- [ ] Completar repositorio y deploy en README.

---

## 9. Historial de commits

| # | Mensaje | Qué agregó |
| --- | --- | --- |
| 1 | `chore: initialize astro portfolio` | Proyecto base, configuración y estructura. |
| 2 | `feat: build global layout and visual identity` | Layout, navegación, Hero, Footer y estilos globales. |
| 3 | `feat: add project data and interactive explorer` | Datos de proyectos, tarjetas y explorador. |
| 4 | `feat: add mirada selector with dynamic content` | Selector UX/UI vs Gestión y contenido dinámico. |
| 5 | `feat: add github activity dashboard with async states` | Primera API externa y estados asíncronos. |
| 6 | `fix: improve responsive behavior and accessibility` | Ajustes responsive y accesibilidad. |
| 7 | `docs: add readme and defense guide` | Documentación y guía de defensa. |
| 8 | `refactor: unify presentation and rebuild interactive components` | Hero + Sobre mí unificados, ProjectExplorer, WorkflowSimulator y primer dashboard de API. |
| 9 | `feat: add itunes album identity lab` | Manual de identidad instantáneo, extracción de paleta, tipografía curada y documentación final. |

---

## 10. Guía de defensa en vivo

### 10.1 Recorrido sugerido (6–8 minutos)

1. **Hero (30 s)**
   - “Soy Abril Mancuso, Project Manager y Diseñadora UX/UI. Este portfolio muestra cómo trabajo, no solo qué hice.”

2. **Sobre mí (45 s)**
   - Perfil unificado.
   - Diferencial: gestión + UX/UI + base técnica.
   - Por qué eso mejora el handoff y la toma de decisiones.

3. **Proyectos (2 min)**
   - Mostrar los cuatro casos.
   - Cambiar **Mirada UX/UI** a **Mirada Gestión**.
   - Explicar que cambia el foco, no el contenido.
   - Abrir un caso y mostrar que tiene **URL propia**.
   - Recorrer la página: media, métricas, dos lecturas, proceso y navegación.
   - Volver con el botón del navegador.
   - Mostrar filtros y estado vacío.

4. **Proceso (1 min)**
   - Recorrer las cinco etapas.
   - Mostrar entregables, herramientas y preguntas.
   - Navegar con teclado para demostrar accesibilidad.

5. **Manual de identidad (2 min)**
   - Ir a `#identidad`.
   - Leer el bloque **“Un ejemplo de mi trabajo”**.
   - Mostrar el badge, el endpoint visible y el buscador.
   - Buscar **Tini** y seleccionar **Cupido**.
   - Mostrar la paleta extraída, los roles de color, la tipografía y los tokens.
   - Copiar un HEX o los tokens.
   - Aclarar que la paleta sale de la portada, pero la tipografía es una recomendación curada y que el manual no es el oficial de la discográfica.
   - Mostrar el set de ejemplo para explicar el respaldo.

6. **Cierre (30 s)**
   - “La API no está escondida: está integrada al relato de producto.”
   - Mencionar documentación, commits y limitaciones.

### 10.2 Preguntas probables y respuestas

**¿Por qué iTunes Search API y no GitHub, una API de color, perfiles ficticios o Hacker News?**

Porque el perfil es PM + UX/UI y el ejercicio tenía que conectar con identidad visual. Una API de color era un ejercicio suelto; los perfiles ficticios se parecían a un CRUD; Hacker News traía datos reales pero ajenos a los proyectos de diseño. iTunes devuelve portadas reales, permite buscar cualquier artista y conecta con los casos de Billie y Tini.

**¿El manual es el manual oficial del artista?**

No. Es una interpretación. La paleta se extrae de la portada y la tipografía es una dupla curada según el género. La interfaz lo aclara en el bloque metodológico y en la nota del manual.

**¿Cómo extraés la paleta?**

La portada se carga con `crossOrigin="anonymous"`, se dibuja en un canvas de 96×96 y se leen los píxeles con `getImageData`. Se agrupan colores en buckets, se promedian y se eligen hasta cinco con distancia mínima. Si la imagen falla o no hay suficientes colores, se usa una paleta base.

**¿Cómo asignás los roles de color?**

El color más frecuente es dominante; el más saturado, acento; el más claro y el más oscuro completan la escala. El texto se elige por luminancia relativa con umbral `0.179`.

**¿Por qué la tipografía no sale de la API?**

Porque iTunes no devuelve tipografías. La dupla se elige con una tabla curada por género: Fraunces para editorial, Archivo Black para pop/latino/urbano y Space Grotesk para electrónica. Se presenta como recomendación, no como dato.

**¿Qué pasa si la API falla?**

La sección tiene estado de error, reintento y set de ejemplo local. Si falla solo la portada, el manual sigue con una paleta base y lo informa.

**¿Cómo evitás que una respuesta vieja pise una nueva?**

Cada búsqueda incrementa `requestId` y cada manual incrementa `manualRequestId`. Si la respuesta no coincide con la última solicitud, se descarta. También se aborta la consulta anterior con `AbortController`.

**¿Cómo manejás seguridad?**

No hay claves. Los datos de la API se insertan con `textContent` y APIs del DOM, nunca con `innerHTML`. Se valida la estructura antes de renderizar.

**¿Por qué los proyectos ahora son páginas y no modales?**

Porque un caso completo necesita URL propia, scroll, navegación y posibilidad de inspección. El modal servía para una vista rápida, pero no para leer un caso de punta a punta.

**¿Por qué Astro?**

Porque el sitio es contenido con interacciones acotadas. Astro entrega HTML estático y carga JavaScript solo donde hace falta. Una SPA agregaría complejidad sin beneficio.

**¿Qué hace accesible al proyecto?**

Skip link, landmarks, foco visible, `aria-current`, tabs con teclado, `aria-live`, `aria-busy`, labels, contraste y `prefers-reduced-motion`. También se informan las limitaciones.

**¿Qué rol jugó la IA?**

Asistencia de programación y documentación. Las decisiones de contenido, proyecto, dirección visual y métricas fueron definidas y revisadas por la autora. La IA no inventó datos ni reemplazó la comprensión del código.

**¿Qué mejorarías?**

Subtítulos y audiodescripción del video, auditoría con lector de pantalla, tests automatizados, deploy con URL pública y un sistema de tokens más formal.

### 10.3 Frase de cierre

> “El portfolio no solo muestra proyectos: muestra cómo pienso, cómo organizo y cómo convierto decisiones de diseño en una interfaz real, accesible y medible.”

---

## 11. Uso de IA

### Qué se usó

- Asistencia para scaffolding, refactorización y redacción.
- Consultas sobre arquitectura, accesibilidad y estados asíncronos.
- Revisión de textos y consistencia.

### Qué no se delegó

- Selección de proyectos.
- Dirección visual.
- Métricas y descripciones de casos.
- Decisiones de posicionamiento profesional.
- Validación final de cada cambio.

### Cómo se validó

- Lectura y ajuste de cada cambio.
- Verificación en el servidor de desarrollo.
- Revisión de consola, responsive y estados.
- Commits progresivos con mensajes claros.

---

## 12. Checklist final de la consigna

- [x] Presentación personal formal.
- [x] Nombre completo: Abril Mancuso.
- [x] Posicionamiento: Project Manager & Diseñadora UX/UI.
- [x] Hero + una sola sección “Sobre mí”.
- [x] Cuatro proyectos reales.
- [x] Aviso de “selección de algunos proyectos”.
- [x] Link a Behance.
- [x] Páginas individuales para cada proyecto.
- [x] Componente 1: `ProjectExplorer` con selector de Mirada.
- [x] Componente 2: `WorkflowSimulator` con tabs accesibles.
- [x] Componente 3: `AlbumLab` con iTunes Search API.
- [x] API visible con badge y endpoint.
- [x] Estados: carga, éxito, vacío, error y respaldo.
- [x] Controles para demostrar estados.
- [x] Responsive.
- [x] Accesibilidad.
- [x] README actualizado.
- [x] PROCESO actualizado.
- [x] Commits progresivos.
- [ ] URL de repositorio.
- [ ] URL de deploy.
- [ ] Build de producción final.
- [ ] Auditoría formal con lector de pantalla.

---

## 13. Próximos pasos

1. Completar `README.md` con URL de repositorio y deploy.
2. Ejecutar build de producción y revisar `dist/`.
3. Publicar en Vercel, Netlify o GitHub Pages.
4. Agregar subtítulos y audiodescripción al video.
5. Hacer una auditoría con lector de pantalla.
6. Evaluar tests automatizados para los estados de la API y las páginas de proyecto.

---

## 14. Archivos clave

- `src/data/site.ts`: perfil, navegación y textos formales.
- `src/data/projects.ts`: cuatro proyectos y metadatos.
- `src/data/miradas.ts`: contenido de las dos miradas.
- `src/data/workflow.ts`: cinco etapas del proceso.
- `src/data/albums.ts`: configuración de iTunes Search API, normalización, tipografías curadas y respaldo.
- `src/components/ProjectExplorer.astro`: explorador y selector de Mirada.
- `src/components/ProjectCard.astro`: tarjetas de proyecto con enlace a la página individual.
- `src/components/ProjectMedia.astro`: video y carrusel de imágenes.
- `src/pages/proyectos/[id].astro`: página individual de cada proyecto.
- `src/components/WorkflowSimulator.astro`: proceso interactivo.
- `src/components/AlbumLab.astro`: manual de identidad, paleta, tipografía y API.
- `src/components/Hero.astro`: presentación profesional.
- `src/components/About.astro`: Sobre mí.
- `src/layouts/BaseLayout.astro`: documento, navegación y footer.
- `src/pages/index.astro`: composición de la página.
- `src/styles/global.css`: tokens, reset y accesibilidad.
- `README.md`: documentación principal.
- `PROCESO.md`: este documento.
