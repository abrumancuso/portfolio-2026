# Portfolio multimedial — Abril Mancuso

Portfolio personal y académico construido con AstroJS para la materia **Programación Multimedial IV (2026)**. El posicionamiento profesional es **Project Manager & Diseñadora UX/UI**, con formación técnica multimedial y experiencia en el ciclo completo de productos digitales.

El sitio no se limita a mostrar piezas: presenta **cómo se investiga, se planifica, se diseña y se implementa un producto digital**. Para eso incluye tres componentes propios con lógica real, páginas individuales para cada proyecto y un laboratorio de research conectado a una API pública.

---

## 1. Datos del proyecto

| Campo | Valor |
| --- | --- |
| Autora | Abril Mancuso |
| Materia | Programación Multimedial IV |
| Año | 2026 |
| Tipo | Proyecto individual |
| Repositorio | `<COMPLETAR_URL_DEL_REPO>` |
| Deploy | `<COMPLETAR_URL_DEL_DEPLOY>` |
| Stack principal | AstroJS 6.4.8, HTML, CSS, TypeScript/JavaScript |
| API externa | Random User API |
| Componentes propios | `ProjectExplorer`, `WorkflowSimulator`, `PersonaLab` |

> Los placeholders de repositorio y deploy se completan al publicar. El proyecto genera una build estática lista para cualquier hosting.

---

## 2. Descripción general

El portfolio es una experiencia de una sola página con seis bloques y páginas individuales para los casos:

1. **Hero** (`#inicio`): presentación profesional de Abril Mancuso.
2. **Sobre mí** (`#sobre-mi`): perfil, diferencial y propuesta de valor.
3. **Proyectos** (`#proyectos`): selección de cuatro casos con selector de enfoque, filtros, búsqueda y dos vistas.
4. **Proceso** (`#proceso`): simulador interactivo de las cinco etapas de trabajo.
5. **Laboratorio** (`#laboratorio`): generador de proto-personas con Random User API.
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

- Tipos para `Project`, `MiradaId`, `PersonaApiResult`, `PersonaSetResponse` y `WorkflowStage`.
- Datos centralizados y tipados en `src/data/`.
- Scripts de cliente para el selector de proyectos, filtros, vistas, tabs del proceso, generación de proto-personas, copiado de fichas y carrusel de imágenes.

### APIs nativas del navegador

- `fetch` + `AbortController` para Random User API.
- `navigator.clipboard` para copiar fichas de proto-personas.
- `localStorage` para recordar el enfoque elegido en proyectos.
- `Intl.DateTimeFormat` para fechas legibles en español.
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
                    └── Laboratorio (#laboratorio)
                          └── Contacto (#contacto)
```

La navegación es fija, indica la sección activa con `aria-current="location"` y en mobile se transforma en un menú desplegable. En las páginas de proyecto, el link de Proyectos queda marcado con `aria-current="page"` y los enlaces vuelven al inicio con rutas absolutas (`/#...`).

La presentación se resolvió en **Hero + una sola sección “Sobre mí”**. No hay secciones separadas de perfil, enfoque y trayectoria: el texto personal está unificado y el proceso de trabajo vive en un componente interactivo propio.

### Capas del proyecto

| Capa | Archivos | Responsabilidad |
| --- | --- | --- |
| Datos | `src/data/site.ts`, `projects.ts`, `miradas.ts`, `workflow.ts`, `personas.ts` | Contenido editorial, proyectos, enfoques de lectura, etapas de proceso, configuración de la API y respaldo. |
| Layout | `src/layouts/BaseLayout.astro` | Documento, fuentes, skip link, navegación y footer. |
| Presentación | `src/components/Hero.astro`, `About.astro` | Hero y sección única “Sobre mí”. |
| Proyectos | `ProjectExplorer.astro`, `ProjectCard.astro`, `ProjectMedia.astro` | Selector de enfoque, filtros, búsqueda, vistas, tarjetas, galería y video. |
| Páginas de proyecto | `src/pages/proyectos/[id].astro` | Caso completo, dos lecturas, métricas, aprendizajes y navegación entre proyectos. |
| Proceso | `WorkflowSimulator.astro` | Tablero/timeline interactivo de las cinco etapas de trabajo. |
| API | `PersonaLab.astro` | Generación de proto-personas, estados asíncronos, copiado y respaldo local. |
| Sistema visual | `src/styles/global.css` + estilos scoped | Tokens, reset, utilidades, accesibilidad y patrones compartidos. |
| Assets | `public/media/`, `public/perfil.jpg` | Imágenes, posters y video de los proyectos. |

### Flujo de datos

1. Los datos editoriales viven en módulos TypeScript.
2. Los componentes `.astro` los importan en build time y generan HTML estático.
3. `getStaticPaths()` genera una página por cada proyecto.
4. Los scripts de cliente agregan comportamiento sobre ese HTML ya renderizado.
5. Random User API se consulta en el navegador; si falla, se usa el set de respaldo local.

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

### 5.3 `PersonaLab` — Laboratorio de proto-personas conectado a Random User API

**Archivos:**

- `src/components/PersonaLab.astro`
- `src/data/personas.ts`

**Responsabilidad:** demostrar consumo de una API externa real, manejo de estados asíncronos y aplicación de criterios de research.

El laboratorio genera un set de **cuatro proto-personas ficticias** y les asigna una hipótesis de research según el contexto elegido. Incluye:

- Badge visible con el estado de conexión: **Proto-personas generadas**, **Generando proto-personas…**, **Sin resultados**, **Error de conexión** o **Set de respaldo local**.
- Endpoint visible en pantalla para que se entienda qué API se está consumiendo.
- Selector de contexto: **Producto digital**, **Educación** o **Comunidad**.
- Tarjetas con foto, nombre, edad, ubicación, email y una hipótesis con objetivo, fricción y pregunta de investigación.
- Copiado de cada ficha al portapapeles.
- Estado de carga con skeleton y `aria-busy`.
- Estado de éxito con las cuatro proto-personas.
- Estado vacío si la API no devuelve resultados válidos.
- Estado de error con mensaje, reintento y opción de usar datos de respaldo.
- Timeout de 10 segundos con `AbortController`.
- Set de respaldo local en `src/data/personas.ts`.
- Mensaje `noscript` para quienes navegan sin JavaScript.

**Controles visibles para la defensa:**

- **Generar proto-personas**: consulta la API con el contexto seleccionado.
- **Cambiar el contexto**: vuelve a consultar automáticamente.
- **Copiar ficha**: copia los datos y la hipótesis de cada proto-persona.
- **Simular error**: fuerza el estado de error con el mismo tratamiento visual que un error real.
- **Usar set de respaldo**: carga las proto-personas locales.
- **Reintentar consulta**: vuelve a llamar a la API.

**Aclaración ética:** Random User API genera datos ficticios. Las proto-personas son hipótesis para ordenar supuestos y alinear al equipo; no son evidencia de investigación. La validación se hace con personas reales.

---

## 6. API externa y ubicación exacta

### Dónde está en la pantalla

El laboratorio está en la sección **“Laboratorio de research: proto-personas para empezar a preguntar”**, después de **“Proceso de trabajo”** y antes del footer de contacto. En la navegación se accede con el link **“Laboratorio”** (`#laboratorio`).

### Dónde está en el código

- Componente: `src/components/PersonaLab.astro`
- Renderizado: `src/pages/index.astro` (último componente antes del footer del layout)
- Datos, contextos y respaldo: `src/data/personas.ts`
- Sección HTML: `id="laboratorio"` y `data-persona-lab`
- Badge: `data-badge`
- Formulario: `data-form`, `data-context`
- Estados: `data-loading`, `data-content`, `data-empty`, `data-error`
- Herramientas de demostración: `data-retry`, `data-simulate-error`, `data-fallback`
- Fetch: bloque `loadPersonas` dentro del `<script>` del componente

### Endpoint

```
GET https://randomuser.me/api/?results=4&nat=es,us,gb&inc=name,location,email,dob,picture,login
```

- No requiere token para este endpoint.
- Devuelve JSON público.
- Tiene CORS habilitado.
- Se agrega `seed` en cada consulta para generar un set nuevo.

### Respuesta usada

```json
{
  "results": [
    {
      "login": { "uuid": "..." },
      "name": { "first": "Juana", "last": "Muñoz" },
      "location": { "city": "Elche", "country": "Spain" },
      "email": "juana.munoz@example.com",
      "dob": { "age": 30 },
      "picture": { "large": "https://randomuser.me/api/portraits/women/33.jpg" }
    }
  ]
}
```

El componente valida que cada perfil tenga `login.uuid`, `name.first`, `name.last`, `location.city`, `location.country`, `email`, `dob.age` y `picture.large`. Si no, lo descarta.

### Estados implementados

| Estado | Badge | Qué se ve | Disparador |
| --- | --- | --- | --- |
| Carga | `Generando proto-personas…` | Skeleton + `aria-busy` | Al generar o cambiar contexto |
| Éxito | `Proto-personas generadas` | Cuatro tarjetas con datos e hipótesis | Respuesta válida de la API |
| Vacío | `Sin resultados` | Mensaje y acciones | Respuesta sin perfiles válidos |
| Error | `Error de conexión` | Mensaje, reintento y respaldo | Fallo de red, timeout o formato inválido |
| Respaldo | `Set de respaldo local` | Proto-personas locales | Botón “Usar set de respaldo” |

### Decisiones técnicas

- **Timeout**: `AbortController` corta la solicitud a los 10 segundos.
- **Validación**: se verifica la estructura de cada perfil antes de renderizar.
- **Seguridad**: los datos de la API se insertan con `textContent`, no con `innerHTML`.
- **Respaldo**: si la API falla, la sección no queda rota; se puede reintentar o usar el set local.
- **Imágenes**: si la foto falla, se muestran iniciales generadas localmente.
- **Sin secretos**: no hay claves ni variables de entorno; todo es público.
- **Cache**: se usa `cache: 'no-store'` para consultar datos frescos.

### Limitaciones conocidas

- La API puede fallar o tardar; por eso existe el respaldo local.
- Los datos son ficticios y no representan personas reales.
- Las proto-personas no reemplazan investigación con usuarios.
- El servicio es externo y puede cambiar sin aviso.

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
- Indicador de sección activa con `aria-current="location"` y página activa con `aria-current="page"`.
- Foco visible con `:focus-visible` y contraste reforzado.
- Selector de proyectos, filtros y vistas con `aria-pressed`.
- Tabs del proceso con `role="tablist"`, `aria-selected`, `aria-controls` y navegación por teclado.
- Resultados y cambios de estado con `aria-live="polite"`.
- Etiquetas asociadas a inputs de búsqueda y al formulario de proto-personas.
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
- Laboratorio de proto-personas con formulario de 2/1 columnas y grillas de tarjetas adaptativas.
- Menú de navegación desplegable por debajo de 900 px.

### Limitaciones de accesibilidad

- El video no tiene subtítulos ni audiodescripción; se informa en la interfaz.
- Las fuentes se cargan desde Google Fonts; si fallan, hay fallback del sistema.
- El laboratorio depende de una API externa y de la conexión del usuario.
- No se realizó una auditoría formal con lector de pantalla; se aplicaron criterios manuales y revisión de contraste.

---

## 8. Proceso de trabajo y uso de IA

### Fases

1. **Relevamiento** del portfolio anterior y de la consigna.
2. **Definición de arquitectura** y sistema visual.
3. **Migración de contenido y assets** a la estructura de Astro.
4. **Construcción de componentes** y datos tipados.
5. **Refactorización**: unificación de la presentación, creación de los tres componentes propios, páginas individuales de proyecto y reemplazo del laboratorio de color por el laboratorio de proto-personas.
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
8. Refactorización: presentación unificada, selector de proyectos, WorkflowSimulator y LiveApiDashboard.
9. `feat: add project pages and research lab with random user api`: páginas individuales de proyecto, laboratorio de proto-personas y posicionamiento profesional de Abril Mancuso.

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
│   │   ├── Nav.astro
│   │   ├── PersonaLab.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectExplorer.astro
│   │   ├── ProjectMedia.astro
│   │   ├── SectionHeading.astro
│   │   └── WorkflowSimulator.astro
│   ├── data/
│   │   ├── miradas.ts
│   │   ├── personas.ts
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
- Tipografías: Instrument Sans y DM Sans (Google Fonts).
- API de proto-personas: [Random User API](https://randomuser.me).

Los proyectos incluidos son una selección académica y profesional. Las métricas y descripciones corresponden a cada caso y se presentan con fines de portfolio.
