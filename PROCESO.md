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
- **Tres componentes propios**: `ProjectExplorer`, `WorkflowSimulator` y `AgileRitualCalculator`.
- **Open-Meteo** como API externa visible (geocoding + forecast), con estados de carga, éxito, selección, vacío, error y respaldo.
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
| API | Open-Meteo | Pública, sin token y con CORS; geocoding y forecast en un mismo proveedor. |
| Rutas | `getStaticPaths()` | Una página estática por proyecto. |
| Persistencia | `localStorage` | Recordar el enfoque de lectura de proyectos. |

### Por qué Astro y no una SPA

El portfolio es contenido con interacciones acotadas. Astro entrega HTML estático y carga JavaScript solo donde hace falta. Una SPA agregaría routing, hidratación y estado global sin mejorar la experiencia central.

### Sistema visual

El rediseño buscó una identidad cálida y editorial, no un template genérico:

- **Paleta:** crema `#FFF8DC` como base, ciruela `#6C0345` para texto y superficies oscuras, terracota `#DC6B19` como acento y mostaza `#F7C566` para destacados.
- **Tipografías:** Fraunces para display, Space Grotesk para interfaz y etiquetas, DM Sans para lectura.
- **Recursos gráficos:** bordes de 2 px, sombras duras tipo sticker, radios de 10 a 36 px, stickers, subrayados dibujados, rotaciones leves y un fondo con grilla de papel.
- **Contraste:** el texto sobre terracota y mostaza usa tinta `#3B0A24`; sobre ciruela se usa crema.
- **Componentes:** un único sistema de botones, etiquetas y tarjetas reutilizado en Hero, Sobre mí, Proyectos, Proceso y Rituales.

### Estructura de la página principal

```
#inicio       Hero
#sobre-mi     Perfil profesional
#proyectos    Explorador de proyectos
#proceso      Simulador de proceso
#rituales     Calculadora de rituales (Open-Meteo)
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
src/data/*.ts + configuración del componente
  → componentes .astro (build time)
    → HTML estático
      → getStaticPaths() genera /proyectos/[id]
        → scripts de cliente (interacción)
          → Open-Meteo (geocoding + forecast en el navegador)
            → husos calculados localmente con Intl si la API falla
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

### 4.3 `AgileRitualCalculator`

**Archivos:**

- `src/components/AgileRitualCalculator.astro`

**Qué resuelve:** diagnosticar si un ritual ágil conviene en vivo, híbrido o asíncrono, cruzando la agenda de Buenos Aires con la ciudad del equipo.

**Funciones:**

- Hubs sugeridos (San Francisco, Madrid, CDMX, Londres, Berlín, São Paulo) y búsqueda libre de cualquier ciudad.
- Dos consultas en paralelo con `Promise.all`: Buenos Aires y la ciudad elegida.
- Hora local, huso, temperatura y clima de cada ciudad.
- Ventana laboral de 9:00 a 18:00 desplazada por huso y solapamiento de 24 horas en tres carriles: Buenos Aires, equipo y golden hours.
- Índice de viabilidad 0–100, veredicto, franja sugerida y kit de herramientas.
- Cuatro rituales seleccionables con `aria-pressed`: Kickoff (60 min), Critique (45), Planning (45) y Daily (15).
- Estados de carga, éxito, selección, vacío y error; respaldo local y modo offline simulado.
- Reloj vivo que refresca el diagnóstico cada 30 segundos.

**Cómo se calcula:**

- `diffMin` es la diferencia de husos en minutos.
- La ventana del equipo se desplaza dentro de las 24 horas y se intersecta con la de Buenos Aires.
- El índice suma horas compartidas (hasta 55), afinidad sincrónica del ritual (hasta 25) y presencia en horario laboral (hasta 20).
- `>= 60` sincrónico, `>= 35` híbrido, el resto async. Se fuerza async sin solapamiento, fuera de horario en ambas ciudades o con Daily por debajo de 4 horas compartidas.
- La franja sugerida prioriza las 10:00 de Buenos Aires y se traduce a la hora del equipo.

**Por qué es significativa:** es la API externa visible y, al mismo tiempo, una decisión de PM. No muestra datos por mostrarlos: los convierte en una recomendación operativa con herramientas concretas. Además ejercita los estados difíciles (vacío, error, respaldo) y el teclado en un combobox.

---

## 5. API externa: Open-Meteo

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

Más tarde se usó iTunes Search API para un manual de identidad. Funcionaba como demostración visual, pero ataba la sección a un catálogo de música y a contenido de terceros.

Se reemplazó por una **calculadora de rituales ágiles** con Open-Meteo:

- La hora y el clima reales son el insumo del diagnóstico.
- El resultado es una decisión de gestión reconocible para cualquier equipo distribuido.
- La API no se muestra como adorno: alimenta el cálculo.
- No hay contenido de terceros ni portadas que explicar.

### 5.2 Ubicación exacta en pantalla

La sección se llama **“¿Reunión en vivo o async? Calculá el ritual correcto”**.

Está:

- Después de **“Proceso de trabajo”**.
- Antes del footer de contacto.
- En la navegación: link **“Rituales”** (`#rituales`).

### 5.3 Ubicación exacta en el código

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

### 5.4 Endpoints

```text
GET https://geocoding-api.open-meteo.com/v1/search?name={ciudad}&count=5&language=es&format=json
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,is_day,weather_code&timezone=auto
```

- No requieren token ni clave.
- Devuelven JSON público con CORS habilitado.
- `count=5` acota los resultados y `language=es` prioriza nombres en español.
- `timezone=auto` devuelve `utc_offset_seconds` y `timezone_abbreviation`: la base del cálculo de husos.
- `current` pide temperatura, si es de día y el código WMO que se traduce a emoji y descripción.

### 5.5 Respuesta usada

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
  "timezone": "Europe/Madrid",
  "timezone_abbreviation": "GMT+1",
  "utc_offset_seconds": 3600,
  "current": {
    "temperature_2m": 14.3,
    "is_day": 1,
    "weather_code": 3
  }
}
```

`fetchForecast` verifica `response.ok` y toma `current`; si `utc_offset_seconds` no viene, usa `zoneOffsetSeconds` con `Intl`. `geocode` filtra con `Array.isArray` y normaliza con `String()` y `Number()`.

### 5.6 Estados implementados

| Estado | Badge | Qué se ve | Disparador |
| --- | --- | --- | --- |
| Carga | `Cargando datos…` | Skeleton + `aria-busy` | Al iniciar, cambiar de ciudad o reintentar |
| Éxito | `Contenido disponible` | Tarjetas, solapamiento, índice, veredicto y kit | Respuesta válida de Open-Meteo |
| Selección | `Ritual seleccionado` | Panel recalculado para el ritual elegido | Clic o teclado en un ritual |
| Vacío | `Sin resultados` | Mensaje, ciudad buscada y botón a hubs | Geocoding sin resultados |
| Error | `Error de conexión` | Mensaje, reintento y respaldo | Fallo de red, HTTP no-OK u offline simulado |
| Respaldo | `Contenido disponible` | Husos locales, sin clima | Botón “Usar husos de respaldo” |

### 5.7 Controles visibles para la defensa

- **Elegir un hub**: San Francisco, Madrid, CDMX, Londres, Berlín o São Paulo.
- **Buscar una ciudad**: consulta el geocoding y muestra resultados navegables con teclado.
- **Cambiar de ritual**: recalcula índice, veredicto, franja y kit al instante.
- **Simular modo offline**: demuestra el estado de error sin desconectar la red.
- **Reintentar conexión**: vuelve a la API real.
- **Usar husos de respaldo**: calcula sin red y mantiene la herramienta operativa.

### 5.8 Decisiones técnicas de la API

- **Sin backend ni secretos:** todo ocurre en el navegador.
- **Configuración única:** `hubs`, `rituals` y ciudad base se serializan desde el frontmatter a JSON.
- **Consultas en paralelo:** `Promise.all` evita esperar dos veces.
- **Debounce de 380 ms** en el buscador.
- **Validación defensiva:** `response.ok`, tipos numéricos y arrays antes de renderizar.
- **Seguridad:** `textContent` y nodos del DOM, nunca `innerHTML` con datos externos.
- **Husos:** `utc_offset_seconds` de la API y, en respaldo, `Intl.DateTimeFormat` con `longOffset`; si no hay zona IANA, se estima por longitud.
- **Reloj vivo:** `setInterval` de 30 segundos.
- **Offline simulable:** permite demostrar el estado de error en la defensa.
- **Respaldo local:** la calculadora nunca queda en blanco.

### 5.9 Limitaciones y ética

- Open-Meteo es externo: puede fallar, tardar o limitar requests.
- El clima es contexto humano, no altera el veredicto.
- La ventana 9–18 es una convención de referencia.
- La franja sugerida prioriza 10:00 de Buenos Aires y puede requerir ajuste manual.
- El horario de verano depende del huso IANA; el respaldo usa la base de zonas del navegador.
- Sin backend no hay caché compartida: cada visita consulta la API.
- No se guardan búsquedas ni datos personales.

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
- La calculadora depende de red y Open-Meteo para la hora y el clima; el respaldo local cubre los husos, no el clima.
- No se hizo auditoría formal con lector de pantalla; se aplicaron criterios manuales y revisión de contraste.

### Aportes del componente de rituales

- Buscador con `role="combobox"`, `aria-expanded`, listbox de opciones y navegación con flechas, Enter y Escape.
- Rituales y control de offline con `aria-pressed`.
- Carga con `aria-busy`, error con `role="alert"` y anuncios con `aria-live="polite"`.
- Contraste de texto sobre terracota y mostaza resuelto con tinta `#3B0A24`.

### Por qué importa

La accesibilidad no es un extra: es parte del trabajo de UX/UI. Un portfolio que habla de experiencia y no es accesible pierde coherencia.

---

## 7. Responsive

### Breakpoints principales

| Ancho | Cambios |
| --- | --- |
| `1000px` | Explorador de proyectos: toolbar y selector se reacomodan. |
| `980px` | Hero a una columna; calculadora con tarjetas de ciudad apiladas y diagnóstico en dos columnas. |
| `900px` | Menú mobile, proceso horizontal. |
| `820px` | Sobre mí y páginas de proyecto a una columna. |
| `700px` | Rituales en una columna, diagnóstico apilado y leyenda a ancho completo. |
| `640px` | Carrusel de imágenes y controles apilados. |
| `620px` | Tarjetas de proyecto a una columna. |
| `560px` | Hero, footer y páginas de proyecto con padding reducido; buscador y barra de estado apilados. |

### Estrategia

- Grid y flexbox.
- `clamp()` para tipografía y espaciado.
- `minmax()` para grillas fluidas.
- Sin alturas fijas innecesarias.
- Carrusel de imágenes con controles de 44 px.

---

## 8. Verificación realizada

No hay tests automatizados.

### Verificación estructural

- [x] Los 13 archivos `.astro` compilan con `@astrojs/compiler` sin errores de sintaxis.
- [x] `index.astro` renderiza `Hero`, `About`, `ProjectExplorer`, `WorkflowSimulator` y `AgileRitualCalculator`.
- [x] `AlbumLab` y `albums.ts` se eliminaron y no quedan referencias en `src/`.
- [x] Los links de navegación usan rutas absolutas (`/#...`) y el menú apunta a `#rituales`.
- [x] El componente declara los cinco estados y los controles de reintento, respaldo y offline.
- [x] La configuración de hubs y rituales se serializa a JSON desde el frontmatter.

### Verificación de la API

```bash
curl -sS -D - -H "Origin: http://localhost:4321" "https://geocoding-api.open-meteo.com/v1/search?name=Madrid&count=2&language=es&format=json"
curl -sS -D - -H "Origin: http://localhost:4321" "https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current=temperature_2m,is_day,weather_code&timezone=auto"
```

Se verificó:

- Respuesta `200` en ambos endpoints.
- `access-control-allow-origin: *` al enviar `Origin`.
- Los resultados del geocoding incluyen `id`, `name`, `country`, `latitude`, `longitude` y `timezone`.
- El forecast devuelve `utc_offset_seconds`, `timezone_abbreviation` (`GMT+1` para Madrid), `current.temperature_2m`, `is_day` y `weather_code`.
- El límite informado es de 600 requests por minuto (`x-ratelimit-limit`).

### Pendiente de prueba manual en navegador

- [ ] Carga inicial de la calculadora con el hub por defecto.
- [ ] Búsqueda de una ciudad, navegación con flechas y selección con Enter.
- [ ] Cambio de ritual y recálculo inmediato del veredicto.
- [ ] Estado vacío con una búsqueda inexistente.
- [ ] Estado de error con el toggle offline, reintento y respaldo local.
- [ ] Solapamiento correcto en husos extremos (San Francisco y Tokio).
- [ ] Menú mobile: abrir, cerrar y navegar.
- [ ] Selector de Mirada: cambio, persistencia y resaltados.
- [ ] Filtros, búsqueda y estado vacío de proyectos.
- [ ] Carrusel de imágenes con botones y teclado.
- [ ] Tabs del proceso con flechas, Home y End.
- [ ] Revisión de scroll horizontal en 360, 768 y 1280 px.
- [ ] Auditoría con lector de pantalla.
- [ ] Tests automatizados.
- [ ] Build de producción final.
- [ ] Deploy y URL pública.
- [ ] Completar la URL de deploy en README.

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
| 10 | `feat: redesign portfolio and add agile rituals calculator` | Nueva identidad visual y calculadora de rituales ágiles con Open-Meteo en lugar del manual de identidad. |

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

5. **Rituales (2 min)**
   - Ir a `#rituales`.
   - Mostrar el badge, el endpoint visible y los hubs sugeridos.
   - Elegir **San Francisco** y leer la diferencia horaria y el clima.
   - Cambiar de **Kickoff** a **Daily** y mostrar cómo cambia el veredicto y el kit.
   - Explicar el índice: solapamiento + afinidad del ritual + horario laboral.
   - Activar **Simular modo offline** para mostrar el estado de error.
   - Reintentar y, si sigue sin red, usar **husos de respaldo**.
   - Aclarar que el clima es contexto y que el cálculo se apoya en husos y ventana laboral.

6. **Cierre (30 s)**
   - “La API no está escondida: está integrada al relato de producto.”
   - Mencionar documentación, commits y limitaciones.

### 10.2 Preguntas probables y respuestas

**¿Por qué Open-Meteo y no las APIs anteriores?**

Porque el resultado ahora es una decisión de PM, no un ejercicio visual suelto. The Color API era un ejercicio de color; Random User generaba perfiles ficticios que parecían un CRUD; Hacker News traía datos ajenos a los proyectos; iTunes ataba la sección a un catálogo de música y a contenido de terceros. Open-Meteo aporta hora, huso y clima reales, que se convierten en un diagnóstico de coordinación.

**¿Cómo calculás el solapamiento?**

Se toma la ventana laboral de 9:00 a 18:00 en minutos (540 a 1080) para cada ciudad. La diferencia de husos desplaza la ventana del equipo y la intersección con la de Buenos Aires da el solapamiento real. Si la intersección es negativa, se fuerza cero.

**¿Cómo decidís el veredicto?**

El índice suma horas compartidas (hasta 55), afinidad sincrónica del ritual (hasta 25) y presencia en horario laboral (hasta 20). Con `>= 60` recomienda sincrónico, con `>= 35` híbrido y el resto async. Se fuerza async cuando no hay solapamiento, cuando ninguna de las dos ciudades está en horario laboral o cuando el Daily no alcanza 4 horas compartidas.

**¿Qué pasa si la API falla?**

La calculadora pasa al estado de error con dos salidas: reintentar la conexión o calcular los husos localmente con `Intl.DateTimeFormat`. El respaldo mantiene el diagnóstico operativo, aunque sin clima. También hay un botón para simular el modo offline y demostrar el estado en la defensa.

**¿El clima influye en la decisión?**

No. El clima es contexto humano del encuentro (“hace 15 °C y está nublado en Madrid”). El veredicto se calcula solo con husos, ventana laboral y duración del ritual.

**¿Cómo manejás los husos y el horario de verano?**

La API devuelve `utc_offset_seconds` y `timezone_abbreviation` para la zona IANA de la ciudad. En respaldo se usa `Intl.DateTimeFormat` con `timeZoneName: 'longOffset'`; si no hay zona conocida, se estima por longitud. El horario de verano lo resuelve la base de zonas, no una regla propia.

**¿Cómo evitás que una respuesta vieja pise una nueva?**

Cada búsqueda incrementa `searchSeq` y cada carga de ciudad incrementa `loadSeq`. Si la respuesta no coincide con el contador vigente, se descarta. El buscador además usa un debounce de 380 ms para no disparar una request por tecla.

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
- [x] Componente 3: `AgileRitualCalculator` con Open-Meteo.
- [x] API visible con badge y endpoint.
- [x] Estados: carga, éxito, selección, vacío, error y respaldo.
- [x] Controles para demostrar estados.
- [x] Responsive.
- [x] Accesibilidad.
- [x] README actualizado.
- [x] PROCESO actualizado.
- [x] Commits progresivos.
- [x] URL de repositorio.
- [ ] URL de deploy.
- [ ] Build de producción final.
- [ ] Auditoría formal con lector de pantalla.

---

## 13. Próximos pasos

1. Completar `README.md` con la URL de deploy.
2. Ejecutar la prueba manual en navegador de los estados de la calculadora.
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
- `src/components/AgileRitualCalculator.astro`: calculadora de rituales, husos, solapamiento, diagnóstico y API.
- `src/components/ProjectExplorer.astro`: explorador y selector de Mirada.
- `src/components/ProjectCard.astro`: tarjetas de proyecto con enlace a la página individual.
- `src/components/ProjectMedia.astro`: video y carrusel de imágenes.
- `src/pages/proyectos/[id].astro`: página individual de cada proyecto.
- `src/components/WorkflowSimulator.astro`: proceso interactivo.
- `src/components/Hero.astro`: presentación profesional.
- `src/components/About.astro`: Sobre mí.
- `src/layouts/BaseLayout.astro`: documento, navegación y footer.
- `src/pages/index.astro`: composición de la página.
- `src/styles/global.css`: tokens, reset y accesibilidad.
- `README.md`: documentación principal.
- `PROCESO.md`: este documento.
