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
  'Transformo ideas sueltas en experiencias digitales con identidad, orden y sentido. Me muevo entre el Diseño UX/UI, la dirección visual y el Project Management: investigo qué necesita realmente el usuario, diseño interfaces que enamoran y organizo al equipo para que el producto se haga realidad sin perder su esencia en el camino.';

export const heroAreas = [
  { number: '01', label: 'Gestión de Proyectos Digitales' },
  { number: '02', label: 'Diseño UX/UI' },
  { number: '03', label: 'Estrategia de Producto' },
] as const;

export const about = {
  lead: 'Project Manager y Diseñadora UX/UI con formación técnica multimedial.',
  paragraphs: [
    'Desde chica soy inquieta y curiosa por cómo funcionan las cosas visuales y tecnológicas. Hoy, en mi 4.° año de Tecnología Multimedial en <strong>UMAI</strong>, encontré mi lugar uniendo dos mundos que suelen ir separados: la sensibilidad estética del diseño y la cabeza estratégica de la gestión.',
    'Puedo bajar una identidad visual en Illustrator, prototipar un flujo completo en Figma, animar una pieza en After Effects y sentarme a hablar de igual a igual con desarrollo porque entiendo cómo se escribe el código. No solo diseño pantallas: cuido el proyecto completo de principio a fin.',
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
