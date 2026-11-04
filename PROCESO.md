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
- **Tres componentes propios**: `ProjectExplorer`, `WorkflowSimulator` y `PersonaLab`.
- **Random User API** como API externa visible, con estados de carga, éxito, vacío, error y respaldo.
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
| API | Random User API | Pública, sin token, con CORS y datos ficticios útiles para research. |
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
#laboratorio  Random User API
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
          → Random User API (fetch en el navegador)
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

### 4.3 `PersonaLab`

**Archivos:**

- `src/components/PersonaLab.astro`
- `src/data/personas.ts`

**Qué resuelve:** consumir una API externa real, manejar estados asíncronos y aplicar criterios de research.

**Funciones:**

- Genera cuatro proto-personas ficticias.
- Les asigna una hipótesis según el contexto: Producto digital, Educación o Comunidad.
- Muestra foto, nombre, edad, ubicación, email, objetivo, fricción y pregunta.
- Permite copiar cada ficha.
- Tiene carga, éxito, vacío, error y respaldo.
- Timeout de 10 segundos con `AbortController`.
- Set local en `src/data/personas.ts`.
- Mensaje `noscript`.

**Por qué es significativa:** es la API externa visible y, al mismo tiempo, una herramienta de research. No es un ejemplo artificial: permite ordenar supuestos antes de hablar con usuarios.

---

## 5. API externa: Random User API

### 5.1 Por qué se descartó el laboratorio de color

La versión anterior usaba The Color API para generar paletas. Funcionaba técnicamente, pero el vínculo con el portfolio era débil:

- Era un ejercicio de color suelto, no conectado con los proyectos.
- No aportaba al relato de gestión ni de research.
- El resultado no ayudaba a explicar cómo trabaja Abril.
- Se sentía como “API porque había que usar una API”.

Se reemplazó por un laboratorio de **proto-personas**, que sí se conecta con el proceso de UX:

- Research.
- Hipótesis.
- Diversidad de perfiles.
- Alineación del equipo.
- Diferencia entre supuesto y evidencia.

### 5.2 Ubicación exacta en pantalla

La sección se llama **“Laboratorio de research: proto-personas para empezar a preguntar”**.

Está:

- Después de **“Proceso de trabajo”**.
- Antes del footer de contacto.
- En la navegación: link **“Laboratorio”** (`#laboratorio`).

### 5.3 Ubicación exacta en el código

| Responsabilidad | Archivo | Marcas / funciones |
| --- | --- | --- |
| Sección visible | `src/components/PersonaLab.astro` | `id="laboratorio"`, `data-persona-lab` |
| Render en la página | `src/pages/index.astro` | `<PersonaLab />` |
| Badge de estado | `src/components/PersonaLab.astro` | `data-badge`, `data-badge-text`, `updateBadge` |
| Endpoint visible | `src/components/PersonaLab.astro` | `.persona-lab__endpoint` |
| Formulario | `src/components/PersonaLab.astro` | `data-form`, `data-context` |
| Estados | `src/components/PersonaLab.astro` | `setView`, `data-loading`, `data-content`, `data-empty`, `data-error` |
| Fetch | `src/components/PersonaLab.astro` | `loadPersonas`, `fetch`, `AbortController` |
| Render de tarjetas | `src/components/PersonaLab.astro` | `createCard`, `textContent` |
| Copiado | `src/components/PersonaLab.astro` | `data-copy-persona`, `navigator.clipboard` |
| Herramientas de demo | `src/components/PersonaLab.astro` | `data-retry`, `data-simulate-error`, `data-fallback` |
| URL, contextos y respaldo | `src/data/personas.ts` | `PERSONA_API_URL`, `researchContexts`, `fallbackPersonas` |

### 5.4 Endpoint

```
GET https://randomuser.me/api/?results=4&nat=es,us,gb&inc=name,location,email,dob,picture,login
```

Parámetros:

- `results=4`: cuatro proto-personas.
- `nat=es,us,gb`: nacionalidades variadas.
- `inc=...`: solo los campos que se usan.
- `seed`: se agrega en cada consulta para generar un set nuevo.

La API no requiere token para este endpoint, devuelve JSON y permite CORS.

### 5.5 Respuesta usada

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

### 5.6 Estados implementados

| Estado | Badge | Qué se ve | Disparador |
| --- | --- | --- | --- |
| Carga | `Generando proto-personas…` | Skeleton + `aria-busy` | Al generar o cambiar contexto |
| Éxito | `Proto-personas generadas` | Cuatro tarjetas con datos e hipótesis | Respuesta válida de la API |
| Vacío | `Sin resultados` | Mensaje y acciones | Respuesta sin perfiles válidos |
| Error | `Error de conexión` | Mensaje, reintento y respaldo | Fallo de red, timeout o formato inválido |
| Respaldo | `Set de respaldo local` | Proto-personas locales | Botón “Usar set de respaldo” |

### 5.7 Controles de demostración

En el `<details>` “Estados de la API y herramientas de demostración”:

- **Reintentar consulta**: vuelve a llamar a la API con el contexto actual.
- **Simular error**: fuerza el estado de error con el mismo tratamiento visual.
- **Usar set de respaldo**: carga las proto-personas locales.

Además:

- **Generar proto-personas**: consulta con el contexto actual.
- **Cambiar el contexto**: vuelve a consultar automáticamente.
- **Copiar ficha**: copia los datos y la hipótesis.
- **Foto rota**: muestra iniciales generadas localmente.

### 5.8 Decisiones técnicas de la API

- **Timeout:** `AbortController` corta a los 10 segundos.
- **Race guard:** `requestId` evita que una respuesta vieja pise una nueva.
- **Validación:** estructura de cada perfil verificada antes de renderizar.
- **Seguridad:** `textContent` y APIs del DOM, nunca `innerHTML` con datos de la API.
- **Respaldo:** la sección nunca queda rota.
- **Imágenes:** fallback a iniciales si la foto no carga.
- **Sin secretos:** no hay claves ni variables de entorno.
- **Cache:** `no-store` para datos frescos.

### 5.9 Limitaciones y ética

- La API puede fallar o tardar; existe set de respaldo.
- Los datos son ficticios: no representan personas reales.
- Las proto-personas son hipótesis, no evidencia de investigación.
- La validación se hace con personas reales.
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
- El laboratorio depende de red y API externa.
- No se hizo auditoría formal con lector de pantalla; se aplicaron criterios manuales y revisión de contraste.

### Por qué importa

La accesibilidad no es un extra: es parte del trabajo de UX/UI. Un portfolio que habla de experiencia y no es accesible pierde coherencia.

---

## 7. Responsive

### Breakpoints principales

| Ancho | Cambios |
| --- | --- |
| `900px` | Menú mobile, Hero a una columna, proceso horizontal, laboratorio a una columna. |
| `820px` | Páginas de proyecto: datos, métricas y lecturas a una columna. |
| `700px` | Formulario de proto-personas y acciones apiladas. |
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

No hay tests automatizados. La verificación fue manual en el servidor de desarrollo.

### Verificación técnica realizada

- [x] El servidor de desarrollo compila la página principal y las páginas de proyecto sin errores.
- [x] Las cuatro rutas `/proyectos/[id]` responden con `200`.
- [x] Las tarjetas de proyecto enlazan a `/proyectos/[id]` y no abren modales.
- [x] Los links de navegación usan rutas absolutas (`/#...`) y funcionan desde las páginas de proyecto.
- [x] Las páginas de proyecto incluyen video o carrusel según el caso.
- [x] El laboratorio renderiza la sección `#laboratorio`, el badge y el endpoint visible.
- [x] La sección de proyectos ya no contiene `ProjectDialog` ni `data-open-dialog`.
- [x] El HTML generado incluye los cuatro links a las páginas individuales.

### Verificación de la API

```bash
curl -sS -D - "https://randomuser.me/api/?results=4&nat=es,us,gb&inc=name,location,email,dob,picture,login&seed=123456789"
```

Se verificó:

- Respuesta `200`.
- `access-control-allow-origin: *`.
- Array `results` con cuatro elementos.
- Campos `name`, `location`, `email`, `dob` y `picture`.

### Pendiente de prueba manual en navegador

- [ ] Menú mobile: abrir, cerrar y navegar.
- [ ] Selector de Mirada: cambio, persistencia y resaltados.
- [ ] Filtros, búsqueda y estado vacío de proyectos.
- [ ] Carrusel de imágenes con botones y teclado.
- [ ] Tabs del proceso con flechas, Home y End.
- [ ] Laboratorio: carga, éxito, vacío, error simulado, respaldo y copiado.
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
| 8 | `refactor: unify presentation and rebuild interactive components` | Hero + Sobre mí unificados, ProjectExplorer, WorkflowSimulator y LiveApiDashboard. |
| 9 | `feat: add project pages and research lab with random user api` | Páginas `/proyectos/[id]`, `PersonaLab`, eliminación de modales y documentación final. |

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

5. **Laboratorio de proto-personas (2 min)**
   - Ir a `#laboratorio`.
   - Mostrar el badge y el endpoint visible.
   - Generar proto-personas.
   - Cambiar el contexto.
   - Copiar una ficha.
   - Abrir las herramientas de demostración.
   - Simular error.
   - Usar set de respaldo.
   - Aclarar que los datos son ficticios y que las proto-personas son hipótesis, no investigación.

6. **Cierre (30 s)**
   - “La API no está escondida: está integrada al relato de research.”
   - Mencionar documentación, commits y limitaciones.

### 10.2 Preguntas probables y respuestas

**¿Por qué Random User API y no GitHub o una API de color?**

Porque el perfil es PM + UX/UI. GitHub muestra código y una API de color era un ejercicio suelto. Random User API permite hablar de research, hipótesis, diversidad de perfiles y alineación del equipo, que es parte del trabajo real.

**¿Las proto-personas son investigación real?**

No. Son hipótesis ficticias para ordenar supuestos antes de investigar. La validación se hace con personas reales. La interfaz lo aclara.

**¿Qué pasa si la API falla?**

La sección tiene estado de error, reintento y set de respaldo local. No se rompe la experiencia.

**¿Cómo evitás que una respuesta vieja pise una nueva?**

Cada consulta incrementa `requestId`. Si la respuesta no coincide con la última solicitud, se descarta. También se aborta la anterior con `AbortController`.

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
- [x] Componente 3: `PersonaLab` con Random User API.
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
- `src/data/personas.ts`: configuración de Random User API, contextos y respaldo.
- `src/components/ProjectExplorer.astro`: explorador y selector de Mirada.
- `src/components/ProjectCard.astro`: tarjetas de proyecto con enlace a la página individual.
- `src/components/ProjectMedia.astro`: video y carrusel de imágenes.
- `src/pages/proyectos/[id].astro`: página individual de cada proyecto.
- `src/components/WorkflowSimulator.astro`: proceso interactivo.
- `src/components/PersonaLab.astro`: laboratorio de proto-personas y API.
- `src/components/Hero.astro`: presentación profesional.
- `src/components/About.astro`: Sobre mí.
- `src/layouts/BaseLayout.astro`: documento, navegación y footer.
- `src/pages/index.astro`: composición de la página.
- `src/styles/global.css`: tokens, reset y accesibilidad.
- `README.md`: documentación principal.
- `PROCESO.md`: este documento.
