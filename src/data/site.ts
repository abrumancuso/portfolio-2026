/**
 * Datos editoriales del portfolio.
 *
 * La presentación se resolvió en dos bloques: Hero y una única sección
 * "Sobre mí". El foco profesional es UX/UI + Gestión de Proyectos Digitales,
 * con la base técnica como diferencial.
 */

export const site = {
  name: 'Abru Mancuso',
  fullName: 'Abril Mancuso',
  shortName: 'AM.',
  email: 'abrilmancusoumai@gmail.com',
  location: 'Buenos Aires, Argentina',
  behance: 'https://www.behance.net/abrilmancuso',
  linkedin: 'https://linkedin.com/in/abrilmancuso',
  github: 'https://github.com/abrumancuso',
  githubUser: 'abrumancuso',
} as const;

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#actividad', label: 'Live API' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const heroGreeting = 'Hola, soy Abru Mancuso.';

export const heroBody =
  'Diseño experiencias digitales (UX/UI) y lidero proyectos tecnológicos de punta a punta. Mi foco está en investigar, estructurar y gestionar productos digitales para que pasen de una idea compleja a una interfaz intuitiva, accesible y bien ejecutada.';

export const heroAreas = [
  { number: '01', label: 'Diseño UX/UI' },
  { number: '02', label: 'Gestión de Proyectos Digitales' },
  { number: '03', label: 'Base técnica multimedial' },
] as const;

export const about = {
  lead: 'Diseño experiencias y lidero proyectos digitales con una mirada técnica.',
  paragraphs: [
    'Estoy cursando el <strong>4to año de la Licenciatura en Tecnología Multimedial en la Universidad Maimónides (UMAI)</strong>. A lo largo de la carrera descubrí que mi verdadero diferencial está en el cruce entre el <strong>Diseño UX/UI</strong> y el <strong>Project Management (PM)</strong>.',
    'Me apasiona entender qué necesita realmente una persona detrás de la pantalla, investigar fricciones, diseñar flujos sin ruido en Figma y, al mismo tiempo, organizar el mapa de ruta, las prioridades y la estrategia para que el producto salga a la luz. Haberme formado en programación, desarrollo mobile/web y producción audiovisual me da una ventaja clave como PM y diseñadora: <strong>hablo el mismo idioma que el equipo de desarrollo</strong>. Entiendo cómo se construye el código por dentro, qué es viable técnicamente y cómo cuidar la calidad visual y la accesibilidad en cada entrega.',
  ],
  tags: [
    'UX Research',
    'UI Design',
    'Design Systems',
    'Project Management',
    'Roadmap & Backlog',
    'Figma',
    'Jira / Notion',
    'HTML / CSS / JS',
    'React Native',
    'Accesibilidad',
  ],
} as const;

export const projectsDisclaimer =
  'Esta es una selección de algunos proyectos donde apliqué diseño de experiencia, estrategia y desarrollo. Podés ver más trabajos de diseño e identidad en mi Behance.';
