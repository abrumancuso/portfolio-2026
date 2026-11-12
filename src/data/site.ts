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
  paragraphs: [
    'Soy <strong>Abril Mancuso</strong>, Project Manager y Diseñadora UX/UI. Estoy cursando el cuarto año de la <strong>Licenciatura en Tecnología Multimedial en la Universidad Maimónides (UMAI)</strong>, donde construí un perfil que integra gestión de proyectos, diseño de experiencia y desarrollo.',
    'Mi diferencial es liderar el ciclo completo de un producto digital: investigar el problema, definir el alcance, priorizar el roadmap, diseñar flujos e interfaces y acompañar el handoff con el equipo de desarrollo. Esa combinación me permite tomar decisiones de producto con criterio técnico, cuidar la viabilidad de la implementación y sostener la calidad visual y la accesibilidad en cada entrega.',
    'Trabajo con equipos multidisciplinarios, documento decisiones y traduzco objetivos de negocio en experiencias claras. Busco aportar una mirada estratégica y operativa: que el proyecto avance, que el equipo tenga claridad y que la persona usuaria encuentre una interfaz que le resuelva el problema.',
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
