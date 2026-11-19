# Portfolio Web Interactivo — Abril Mancuso

Proyecto individual desarrollado con **AstroJS** para el examen final de **Programación Multimedial IV** (Universidad Maimónides).

- **Portfolio en producción:** [mancuso-abril-portfolio.vercel.app](https://mancuso-abril-portfolio.vercel.app/)
- **Repositorio:** [github.com/abrumancuso/portfolio-2026](https://github.com/abrumancuso/portfolio-2026)
- **Evidencia de proceso:** [`PROCESO.md`](./PROCESO.md)
- **Stack técnico:** AstroJS 6.4.8 (generación estática), HTML semántico, CSS nativo, TypeScript y JavaScript
- **API externa:** Open-Meteo (geocoding y zonas horarias)

---

## 1. Propuesta y público objetivo

Este proyecto presenta mi perfil profesional con foco en **Gestión de Proyectos Digitales** y **Diseño UX/UI**, respaldado por mi formación técnica multimedial. Bajo una estética editorial, el sitio integra mi presentación, una selección de cuatro proyectos con páginas propias, un simulador interactivo de mi proceso de trabajo y una herramienta conectada a una API externa para calcular cruces horarios y proponer reuniones según la ciudad del equipo.

Está dirigido a **recruiters y equipos de producto, diseño y tecnología** que buscan un perfil híbrido entre diseño y gestión, así como a **potenciales clientes o estudios** interesados en conocer mi metodología de trabajo antes de coordinar una reunión inicial.

---

## 2. Estructura y contenidos

La página principal se divide en seis secciones conectadas a una navegación fija con indicador de sección activa: **Inicio**, **Sobre mí**, **Proyectos**, **Proceso**, **Servicios** y **Contacto**. La presentación se unificó entre el Hero y una única sección **Sobre mí** para evitar repeticiones, mientras que la metodología de trabajo se resolvió en un componente interactivo aparte.

En **Proyectos** se aclara que se muestra una selección curada y no la totalidad de mi producción (el portfolio completo de diseño e identidad está en [Behance](https://www.behance.net/abrilmancuso)). Los casos incluidos son:

- **Billie Eilish Argentina Tour (2024):** Video y Motion Graphics — `/proyectos/billie-animation`
- **MacBook Pro Model (2025):** Visualización y renders 3D — `/proyectos/macbook-3d`
- **MaimoConecta (2025):** Caso UX y diseño estratégico — `/proyectos/maimoconecta`
- **Tini — Manual de Marca (2025):** Sistema de identidad visual — `/proyectos/manual-marea`

Cada caso cuenta con su propia ruta estática generada en tiempo de compilación mediante `getStaticPaths()` desde `src/data/projects.ts`. Esta decisión reemplaza el uso de modales para permitir compartir enlaces directos a cada proyecto. Las vistas internas incluyen galería con efecto parallax (o reproductor de video), dos lecturas del proyecto (UX/UI y Gestión), aprendizajes clave, bloque de cierre orientado al contacto y navegación entre proyectos.

---

## 3. Arquitectura y decisiones técnicas

Se eligió **AstroJS** en modo estático (`output: 'static'`) por tratarse de un sitio centrado en el contenido con interacciones puntuales. Esto permite servir HTML liviano y ejecutar JavaScript únicamente en los componentes interactivos, evitando la sobrecarga de frameworks como React o Next.js.

- **Datos y lógica:** TypeScript y JavaScript para tipar proyectos, etapas de proceso y respuestas de la API, junto con la interactividad en cliente.
- **Estilos:** CSS nativo sin librerías externas, organizado mediante *custom properties* para tokens de color y tipografía, layout con Grid y Flexbox, escalado fluido con `clamp()` y soporte para `prefers-reduced-motion`.
- **APIs del navegador:** `fetch` para el consumo externo, `Intl.DateTimeFormat` para el cálculo local de husos horarios, `localStorage` para persistencia de preferencias y etiqueta HTML `<video>` para la pieza audiovisual.
- **Indexación:** archivos `robots.txt`, `llm.txt` y `llms.txt` en `public/` para facilitar el rastreo de buscadores y la lectura estructurada por agentes de IA.

La arquitectura de carpetas separa responsabilidades en `src/components/` (componentes de interfaz e interactivos), `src/data/` (datos tipados de sitio, proyectos, miradas y proceso), `src/layouts/` (plantilla base), `src/pages/` (home y rutas dinámicas de proyectos), `src/styles/` (estilos globales) y `public/` (recursos multimedia y archivos de indexación).

---

## 4. Componentes propios relevantes

### `ProjectExplorer`
Gestiona la exploración de los proyectos e implementa la interacción principal del sitio mediante un selector de enfoque con dos modos: **UX/UI & Producto** y **Gestión & Arquitectura Técnica**. La elección modifica los textos y metadatos destacados y se guarda en `localStorage` (`portfolio-mirada`). Incluye filtros por área, buscador por palabra clave, cambio entre vista de ficha técnica y galería visual, contador dinámico (`aria-live`) y estado vacío con limpieza de filtros.

### `WorkflowSimulator`
Tablero interactivo de cinco etapas de trabajo (*Discovery & UX Research*, *Definición & Priorización*, *Wireframing & UI Design*, *Handoff & Desarrollo* y *Testing & Accesibilidad*). Al seleccionar cada etapa se actualizan los entregables, herramientas y preguntas clave. Sigue el patrón de pestañas accesibles con navegación por teclado (flechas, `Home` y `End`).

### `AgileRitualCalculator`
Evolucionó de una calculadora de rituales ágiles a un coordinador de servicios y reuniones. En el Paso 1 el usuario selecciona o busca la ciudad de su equipo y en el Paso 2 elige el servicio (*Manejo de redes*, *Diseño de web*, *Revisión de diseño*, *Rebranding* o *Gestión de proyectos*). A partir de esos datos, calcula la diferencia horaria con Buenos Aires, arma una propuesta con puntos de abordaje y entregable, sugiere una franja de 30 minutos y habilita un botón que prearma un correo electrónico con el servicio y el horario elegidos.

---

## 5. Integración de API externa (Open-Meteo)

Ubicada en la sección **Servicios**, consume directamente desde el cliente —sin backend, sin API key y sin almacenar búsquedas— dos endpoints públicos de [Open-Meteo](https://open-meteo.com/):

- **Geocoding** (`https://geocoding-api.open-meteo.com/v1/search`): alimenta el buscador de ciudades en español y devuelve coordenadas y zona horaria.
- **Forecast** (`https://api.open-meteo.com/v1/forecast`): se utiliza exclusivamente para obtener `utc_offset_seconds` y `timezone_abbreviation`.

El algoritmo cruza jornadas laborales de referencia (9:00 a 18:00 en ambas ciudades) y evalúa las horas compartidas junto con el servicio elegido para recomendar una reunión sincrónica de 30 minutos, una instancia breve híbrida o modalidad asincrónica.

La interfaz contempla estados de **carga**, **contenido disponible**, **selección**, **vacío** (ciudad inexistente), **error de conexión** (con simulación offline y reintento) y **respaldo local** calculado en el navegador con `Intl.DateTimeFormat` si la API no responde.

---

## 6. Diseño visual, responsive y accesibilidad

El sistema visual se apoya en una paleta de cuatro colores —crema (`#FFF8DC`), ciruela (`#6C0345`), terracota (`#DC6B19`) y mostaza (`#F7C566`), con tinta (`#3B0A24`)— y combina **Anton** (titulares), **Instrument Serif** en itálica (acentos), **Plus Jakarta Sans** (cuerpo e interfaz) y **Space Mono** (etiquetas).

En **mobile**, el Hero y las grillas pasan a una columna, la navegación se convierte en menú desplegable y el tablero de proceso pasa a desplazamiento horizontal. El efecto parallax de las galerías internas se desactiva por debajo de `820px` y ante `prefers-reduced-motion`.

En **accesibilidad** se implementaron *skip link*, HTML semántico, foco visible, `aria-current` en navegación, control por teclado en pestañas y combobox, regiones `aria-live`, `aria-busy` en cargas y textos alternativos en imágenes.

---

## 7. Uso de inteligencia artificial y correcciones realizadas

El repositorio se construyó mediante commits progresivos (detallados en [`PROCESO.md`](./PROCESO.md)). Se utilizaron **OpenCode** y **Gemini** como apoyo técnico para el andamiaje inicial en Astro, tipado en TypeScript, maquetado repetitivo y depuración de lógica asíncrona. La dirección de arte, la selección de proyectos, los textos finales y la validación funcional fueron realizados por mí.

Errores generados por la IA que detecté y corregí manualmente:

1. **Tipografía e interlineado:** fuentes demasiado anchas que desbordaban contenedores, cursivas de baja legibilidad en párrafos y un interlineado cerrado que cortaba la virgulilla de la letra `Ñ` en títulos en mayúscula (resuelto ajustando la escala y fijando `line-height: 1.12` con `overflow: visible`).
2. **HTML crudo en pantalla:** visualización literal de la etiqueta `<strong>` en las fichas de proyecto por el escape automático de Astro (corregido aplicando `set:html`).
3. **Conflicto de especificidad CSS:** en el Paso 2 de Servicios, una regla `:nth-child` pisaba el color de fondo de las tarjetas activas con `aria-pressed="true"` dejándolas en blanco (resuelto excluyendo el estado seleccionado).
4. **Sobrecarga textual y visual:** textos iniciales demasiado extensos y adornos superpuestos sobre imágenes de proyectos, corregidos sintetizando copys y limpiando los marcos.

---

## 8. Limitaciones y líneas de mejora

### Limitaciones actuales
- El video de *Billie Eilish Argentina Tour* aún no cuenta con subtítulos ni audiodescripción (informado en la página del caso).
- El cálculo horario usa una jornada estándar de 9:00 a 18:00 como referencia.
- Las consultas a Open-Meteo se ejecutan desde el cliente sin caché en servidor.
- La accesibilidad fue validada de forma manual y por teclado, sin auditoría con lector de pantalla.

### Próximas mejoras
- Sumar subtítulos al material audiovisual.
- Conectar el botón final de Servicios a una herramienta de agendamiento real (como Cal.com o Calendly).
- Desarrollar una versión en inglés.
- Incorporar nuevos casos de UX Research.

---

## 9. Ejecución local

Requiere **Node.js `>= 22.12.0`** y **npm `>= 10`**. No utiliza variables de entorno ni claves privadas.

```bash
# Instalar dependencias
npm install

# Levantar el servidor de desarrollo (http://localhost:4321)
npm run dev

# Compilar para producción (genera dist/)
npm run build

# Previsualizar la compilación
npm run preview
```

---

## Contacto, créditos y licencias

Me podés escribir a [abrilmancusoumai@gmail.com](mailto:abrilmancusoumai@gmail.com). También estoy en [Behance](https://www.behance.net/abrilmancuso), [LinkedIn](https://linkedin.com/in/abrilmancuso) y [GitHub](https://github.com/abrumancuso). Los proyectos, las imágenes y los textos son míos. Las tipografías vienen de Google Fonts y los datos en vivo de [Open-Meteo](https://open-meteo.com/). Las tipografías de Google Fonts están bajo la SIL Open Font License 1.1. Los datos de Open-Meteo se usan con fines públicos y no comerciales, bajo licencia CC BY 4.0.
