# Portfolio multimedial — Abril Mancuso

Portfolio personal y académico construido con AstroJS para la materia **Programación Multimedial IV (2026)**. Reúne una selección de proyectos, un selector de lectura llamado **Mirada**, un explorador interactivo de casos y una sección de actividad técnica que consume la API pública de GitHub.

El objetivo no es mostrar una lista de piezas, sino hacer visible **cómo se toman decisiones**: qué se investiga, qué se ordena, qué se construye y cómo se comunica.

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
| API externa | GitHub REST API |

> Los placeholders de repositorio y deploy se completan al publicar. El proyecto ya está preparado para generar una build estática.

---

## 2. Descripción general

El portfolio está organizado como una experiencia de una sola página con secciones ancladas:

1. **Inicio**: presentación, perfil híbrido y acceso rápido a proyectos.
2. **Perfil**: retrato, formación y áreas de especialidad.
3. **Enfoque**: preguntas que orientan la práctica y decisiones que distinguen la propuesta.
4. **Trayectoria**: recorrido académico/profesional y herramientas.
5. **Proyectos**: selección de cuatro casos destacados con filtros, búsqueda, dos vistas y diálogos de caso completo.
6. **Actividad**: repositorios públicos de GitHub consumidos en tiempo real, con estados de carga, éxito, vacío, error y respaldo local.
7. **Contacto**: email, Behance, LinkedIn y GitHub.

La sección de proyectos aclara de forma visible que se trata de **una selección de algunos proyectos destacados**, no de la totalidad. El portfolio completo vive en Behance.

### Proyectos incluidos

- **Billie Eilish — motion graphics**: pieza audiovisual.
- **MacBook Pro 3D**: visualización y renders 3D.
- **MaimoConecta**: proyecto de diseño estratégico y UX con 45 slides.
- **Tini — Manual de Marca**: sistema de identidad visual de 9 páginas.

---

## 3. Tecnologías usadas y justificación

### AstroJS 6.4.8

Astro permite construir un sitio **estático, rápido y con muy poco JavaScript**, pero con arquitectura de componentes. Es el equilibrio adecuado para un portfolio: el contenido pesa más que la aplicación, y la interactividad se concentra solo donde aporta valor.

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

- Tipos para `Project`, `MiradaId`, `GitHubRepo` y las opciones de Mirada.
- Datos centralizados y tipados en `src/data/`.
- Scripts de cliente para filtros, diálogos, carrusel, Mirada y fetch de la API.

### APIs nativas del navegador

- `<dialog>` + `showModal()` para los casos completos, con manejo de foco y cierre.
- `<video>` para la pieza audiovisual.
- `fetch` + `AbortController` para la API de GitHub.
- `localStorage` para recordar la Mirada elegida.
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
  └── Perfil (#perfil)
        └── Enfoque (#enfoque)
              └── Trayectoria (#trayectoria)
                    └── Proyectos (#proyectos)
                          └── Actividad (#actividad)
                                └── Contacto (#contacto)
```

La navegación es fija, indica la sección activa con `aria-current="location"` y en mobile se transforma en un menú desplegable.

La barra **Mirada** queda debajo de la navegación y acompaña el scroll. No es decorativa: cambia el énfasis del contenido y resalta los metadatos que corresponden a cada enfoque.

### Capas del proyecto

| Capa | Archivos | Responsabilidad |
| --- | --- | --- |
| Datos | `src/data/site.ts`, `projects.ts`, `miradas.ts`, `github.ts` | Contenido editorial, proyectos, modos de lectura y respaldo de la API. |
| Layout | `src/layouts/BaseLayout.astro` | Documento, fuentes, skip link, navegación, barra Mirada, footer y restauración temprana de la Mirada. |
| Secciones | `src/components/Hero.astro`, `About.astro`, `Focus.astro`, `Trajectory.astro` | Presentación, perfil, enfoque y trayectoria. |
| Proyectos | `ProjectExplorer.astro`, `ProjectCard.astro`, `ProjectDialog.astro` | Filtros, búsqueda, vistas, tarjetas, diálogos y carrusel. |
| API | `GitHubActivity.astro` | Fetch, estados asíncronos, filtros y respaldo local. |
| Sistema visual | `src/styles/global.css` + estilos scoped | Tokens, reset, utilidades, accesibilidad y patrones compartidos. |
| Assets | `public/media/`, `public/perfil.jpg` | Imágenes, posters y video de los proyectos. |

### Flujo de datos

1. Los datos editoriales viven en módulos TypeScript.
2. Los componentes `.astro` los importan en build time y generan HTML estático.
3. Los scripts de cliente agregan comportamiento sobre ese HTML ya renderizado.
4. La API de GitHub se consulta en el navegador; si falla, se usa el respaldo local.

---

## 5. Componentes interactivos implementados

### 5.1 Selector de Mirada

**Archivo:** `src/components/ReadingMode.astro`

Permite leer el mismo portfolio desde tres enfoques:

- **Integral**: lectura completa.
- **Diseño & UX**: investigación, roles, decisiones de experiencia y criterios de uso.
- **Arquitectura & Código**: pipeline técnico, herramientas, procesos y métricas.

Qué resuelve:

- Cambia los textos de Hero y Perfil.
- Cambia el foco de cada proyecto en la galería y en la ficha técnica.
- Resalta roles, herramientas, decisiones y procesos según el modo.
- Persiste la elección en `localStorage`.
- Restaura el modo antes del primer paint con un script inline en el `<head>`, evitando el parpadeo.
- Usa `aria-pressed` en los botones y una región `aria-live` para anunciar el cambio.
- Sin JavaScript, el HTML queda en modo Integral y todo el contenido principal sigue visible.

La visibilidad de los paneles se resuelve con CSS a partir de `data-mirada` en `<html>` y `data-mirada-panel` en cada bloque. El script solo cambia el atributo, los estados accesibles y el almacenamiento.

### 5.2 Explorador de proyectos

**Archivo:** `src/components/ProjectExplorer.astro`

Incluye:

- Filtro por área (Todas, Diseño, Audiovisual, 3D, Gestión).
- Búsqueda por título, herramienta, rol o texto del proyecto.
- Vista **Galería visual** y vista **Ficha técnica**.
- Contador de resultados con `role="status"` y `aria-live="polite"`.
- Estado vacío con acción para restablecer filtros.
- Botón para limpiar filtros.
- Apertura de casos completos en diálogos nativos.
- Cierre por botón, Escape o click en el backdrop.
- Bloqueo del scroll del body mientras hay un diálogo abierto.
- Pausa del video al cerrar el diálogo.

### 5.3 Actividad de GitHub

**Archivo:** `src/components/GitHubActivity.astro`

Consume la API pública de GitHub y muestra hasta 8 repositorios ordenados por actualización. Incluye:

- Estado de carga con skeleton y `aria-busy`.
- Estado de éxito con tarjetas de repositorio.
- Estado vacío si el perfil no devuelve repositorios o si el filtro no encuentra resultados.
- Estado de error con mensaje, botón de reintento y botón para usar datos de respaldo.
- Detección de rate limit con hora estimada de reintento.
- Timeout de 10 segundos con `AbortController`.
- Búsqueda por nombre, descripción o lenguaje.
- Filtros por lenguaje con `aria-pressed`.
- Indicador de fuente: datos en vivo o datos de respaldo.
- Enlaces a cada repositorio y al perfil de GitHub.
- Mensaje `noscript` para quienes navegan sin JavaScript.

### 5.4 Diálogos de caso completo

**Archivo:** `src/components/ProjectDialog.astro`

Cada proyecto tiene un `<dialog>` con:

- Portada o video.
- Carrusel de imágenes con controles anterior/siguiente y contador `aria-live`.
- Navegación con flechas del teclado.
- Contenido por Mirada.
- Rol, problema, decisiones, proceso, herramientas, métricas y aprendizajes.
- Enlace a Behance.
- Nota de accesibilidad sobre el video sin subtítulos ni audiodescripción.

---

## 6. API externa y estados

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
- Layout de 1200 px con espaciado fluido y breakpoints en 900, 820, 640 y 560 px.
- Tarjetas, etiquetas y botones comparten radios, bordes y transiciones.

### Accesibilidad

- Skip link al contenido principal.
- Navegación con `aria-label`, `aria-expanded`, `aria-controls` y cierre con Escape.
- Indicador de sección activa con `aria-current="location"`.
- Foco visible con `:focus-visible` y contraste reforzado.
- Botones de filtro y Mirada con `aria-pressed`.
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
- Perfil con imagen sticky en desktop y estática en mobile.
- Explorador de proyectos con toolbar flexible y grillas de 2/1 columnas.
- Actividad de GitHub con grillas de 3/2/1 columnas.
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
5. **Implementación de interactividad**: Mirada, explorador, diálogos y API.
6. **Ajustes de responsive y accesibilidad**.
7. **Documentación y cierre**.

El detalle de cada fase, las decisiones descartadas y una guía para la defensa en vivo están en [`PROCESO.md`](./PROCESO.md).

### Uso de IA

La IA se usó como **asistente de programación y documentación**, no como reemplazo del criterio proyectual.

- Se utilizó para acelerar tareas repetitivas de scaffolding, refactorización y redacción de documentación.
- Se consultó para contrastar alternativas de arquitectura, accesibilidad y manejo de estados asíncronos.
- La selección de proyectos, los textos, la dirección visual, las métricas y las decisiones de contenido fueron definidas y revisadas por la autora.
- Ningún dato de proyecto, métrica o experiencia fue inventado por la IA.
- Cada cambio generado con asistencia fue leído, ajustado y validado con build antes de commitear.
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
│   │   ├── Focus.astro
│   │   ├── Footer.astro
│   │   ├── GitHubActivity.astro
│   │   ├── Hero.astro
│   │   ├── Nav.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectDialog.astro
│   │   ├── ProjectExplorer.astro
│   │   ├── ReadingMode.astro
│   │   ├── SectionHeading.astro
│   │   └── Trajectory.astro
│   ├── data/
│   │   ├── github.ts
│   │   ├── miradas.ts
│   │   ├── projects.ts
│   │   └── site.ts
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

- Contenido, proyectos, imágenes y textos: **Abril Mancuso**.
- Portfolio completo: [Behance](https://www.behance.net/abrilmancuso).
- Perfil profesional: [LinkedIn](https://linkedin.com/in/abrilmancuso).
- Código y actividad: [GitHub](https://github.com/abrumancuso).
- Tipografías: Instrument Sans y DM Sans (Google Fonts).
- API de repositorios: GitHub REST API.

Los proyectos incluidos son una selección académica y profesional. Las métricas y descripciones corresponden a cada caso y se presentan con fines de portfolio.
