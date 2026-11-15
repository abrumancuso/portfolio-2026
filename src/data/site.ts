/**
 * Datos editoriales del portfolio.
 *
 * La presentación se resolvió en dos bloques: Hero y una única sección
 * "Sobre mí". El posicionamiento profesional es Project Manager y
 * Diseñadora UX/UI, con la formación técnica multimedial como diferencial.
 */

export const site = {
  name: 'Abril Mancuso',
  fullName: 'Abril Mancuso',
  shortName: 'AM.',
  role: 'Project Manager & Diseñadora UX/UI',
  email: 'abrilmancusoumai@gmail.com',
  location: 'Buenos Aires, Argentina',
  behance: 'https://www.behance.net/abrilmancuso',
  linkedin: 'https://linkedin.com/in/abrilmancuso',
  github: 'https://github.com/abrumancuso',
  githubUser: 'abrumancuso',
} as const;

export const navLinks = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/#rituales', label: 'Servicios' },
  { href: '/#contacto', label: 'Contacto' },
] as const;

export const heroEyebrow = 'Project Manager & Diseñadora UX/UI · Portfolio 2026';

export const heroFirstName = 'Abril';
export const heroLastName = 'Mancuso';
export const heroRole = 'Project Manager & Diseñadora UX/UI';

export const heroBody =
  'Diseño experiencias y <strong>gestiono procesos</strong>. Integro <strong>estrategia de producto</strong>, interfaz visual y ejecución técnica: investigo fricciones, prototipo soluciones claras y coordino al equipo para que el proyecto avance sin trabas. <em>UX/UI, dirección de arte y Project Management</em> en un mismo ciclo.';

export const heroAreas = [
  { number: '01', label: 'Gestión de Proyectos Digitales' },
  { number: '02', label: 'Diseño UX/UI' },
  { number: '03', label: 'Estrategia de Producto' },
] as const;

export const about = {
  paragraphs: [
    'Soy <strong>Abril Mancuso</strong>, Project Manager y Diseñadora UX/UI. Cursando 4.º año de la <strong>Lic. en Tecnología Multimedial (UMAI)</strong>, construí un perfil que cruza <strong>gestión, experiencia y desarrollo</strong>.',
    'Lidero el <strong>ciclo completo</strong> de un producto digital: investigo el problema, defino el alcance, diseño flujos e interfaces y acompaño la entrega. Ese criterio técnico asegura que la <strong>calidad visual y la accesibilidad</strong> lleguen intactas.',
    'Trabajo con equipos multidisciplinarios, documento cada decisión y traduzco objetivos de negocio en <em>experiencias claras</em>.',
  ],
  tags: [
    'FIGMA',
    'ADOBE ILLUSTRATOR',
    'ADOBE PHOTOSHOP',
    'AFTER EFFECTS',
    'PREMIERE PRO',
    'DISEÑO UX/UI',
    'PROJECT MANAGEMENT',
    'DIRECCIÓN DE ARTE',
    'DESARROLLO WEB & MOBILE',
  ],
} as const;

export const projectsDisclaimer =
  'La selección presentada reúne algunos de los proyectos en los que apliqué diseño de experiencia, estrategia y desarrollo. El portfolio completo de diseño e identidad está disponible en Behance.';
