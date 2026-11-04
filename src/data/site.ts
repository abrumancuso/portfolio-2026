/**
 * Datos editoriales del portfolio.
 * Todo lo que se repite en la interfaz (navegación, perfil, enfoque,
 * trayectoria y contacto) vive acá para poder editarlo en un solo lugar.
 */

export const site = {
  name: 'Abril Mancuso',
  shortName: 'AM.',
  role: 'Diseño UI/UX · Sistemas de Diseño · Desarrollo Full-Stack & Mobile · Producción Audiovisual · PM Digital',
  email: 'abrilmancusoumai@gmail.com',
  location: 'Buenos Aires, Argentina',
  behance: 'https://www.behance.net/abrilmancuso',
  linkedin: 'https://linkedin.com/in/abrilmancuso',
  github: 'https://github.com/abrumancuso',
  githubUser: 'abrumancuso',
} as const;

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#perfil', label: 'Perfil' },
  { href: '#enfoque', label: 'Enfoque' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#actividad', label: 'Actividad' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const profile = {
  lead: 'Soy Abril Mancuso, estudiante de Tecnología Multimedial en la Universidad Maimónides y profesional en formación con un perfil híbrido entre diseño, tecnología y producción.',
  paragraphs: [
    'Me interesa el punto donde una idea se convierte en sistema: investigar, ordenar la información, definir reglas visuales y después llevarlas a una interfaz, a una pieza audiovisual o a un proyecto coordinado con otras personas.',
    'Trabajo en el departamento de alumnos de la Universidad de Palermo, donde coordino trámites y múltiples tareas bajo plazos reales. Esa experiencia me dio una mirada de gestión que hoy aplico a los proyectos creativos: planificar, priorizar y sostener la comunicación con el equipo.',
    'Mi formación combina diseño UI/UX, sistemas de diseño, desarrollo web, producción audiovisual y 3D. No me interesa elegir una sola disciplina: me interesa entender cómo se conectan para que un proyecto llegue a buen puerto.',
  ],
  tags: [
    'UI/UX',
    'Sistemas de Diseño',
    'Desarrollo Full-Stack',
    'Mobile',
    'Producción Audiovisual',
    'PM Digital',
    'Inglés avanzado',
  ],
} as const;

export const focusQuestions = [
  {
    number: '01',
    question: '¿Cómo se traduce una idea en un sistema visual que otras personas puedan usar y sostener?',
    answer:
      'Investigo, ordeno y documento. Me interesa que el diseño no quede en una pieza aislada, sino en reglas, componentes y decisiones que otra persona pueda continuar.',
  },
  {
    number: '02',
    question: '¿Qué cambia cuando el diseño se encuentra con el código, el render y la producción?',
    answer:
      'Cambian las restricciones y también las posibilidades. Aprender el pipeline técnico me permite tomar decisiones formales más conscientes y defenderlas con argumentos.',
  },
  {
    number: '03',
    question: '¿Cómo se coordina un proyecto creativo sin perder su intención inicial?',
    answer:
      'Con criterios claros, entregas visibles y comunicación constante. La gestión no es un accesorio del proyecto: es parte de su diseño.',
  },
] as const;

export const designDecisions = [
  {
    title: 'Sistema antes que pieza',
    text: 'Pienso en componentes, tokens y reglas reutilizables. La identidad se sostiene cuando cada decisión visual puede explicarse y repetirse.',
  },
  {
    title: 'La técnica también narra',
    text: 'El código, el render o el montaje no son solo herramientas: son decisiones que afectan el tiempo, el ritmo y la lectura de una obra.',
  },
  {
    title: 'Tres miradas, una práctica',
    text: 'El portfolio se puede leer desde Diseño & UX, desde Arquitectura & Código o de forma integral. La misma obra cambia de énfasis según la pregunta que le hacemos.',
  },
] as const;

export const timeline = [
  {
    date: '2025 — Actualidad',
    title: 'Gestión administrativa',
    place: 'Universidad de Palermo',
    text: 'Coordinación de trámites administrativos y atención a alumnos. Gestión de múltiples tareas simultáneas, cumplimiento de plazos y normativa institucional.',
  },
  {
    date: '2024 — 2025',
    title: 'Work & Travel',
    place: 'San Francisco, Estados Unidos',
    text: 'Experiencia laboral internacional: comunicación multicultural, atención al cliente y resolución de problemas en tiempo real. Perfeccionamiento de inglés.',
  },
  {
    date: '2021 — Actualidad',
    title: 'Estudiante de Tecnología Multimedial',
    place: 'Universidad Maimónides',
    text: 'Proyectos académicos de diseño, animación, 3D e identidad visual. Trabajo en equipo, coordinación de entregas y presentación de proyectos.',
  },
] as const;

export const skillGroups = [
  {
    title: 'Diseño & UX',
    items: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'Design Thinking', 'UX Research'],
  },
  {
    title: 'Audiovisual & 3D',
    items: ['After Effects', 'Premiere Pro', 'Maya', 'Substance Painter', 'Arnold', 'Animación 2D'],
  },
  {
    title: 'Desarrollo & Gestión',
    items: ['HTML', 'CSS', 'JavaScript (en formación)', 'Astro (en formación)', 'Git / GitHub', 'Notion'],
  },
] as const;
