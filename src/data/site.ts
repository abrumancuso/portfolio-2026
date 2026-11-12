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
  'Diseño experiencias, gestiono procesos. Integro la estrategia de producto, la interfaz visual y la ejecución técnica. Me dedico a investigar fricciones, prototipar soluciones claras y coordinar el avance del proyecto para que el equipo trabaje sin trabas. y sentido. Me muevo entre el Diseño UX/UI, la dirección visual y el Project Management: investigo qué necesita realmente el usuario, diseño interfaces que enamoran y organizo al equipo para que el producto se haga realidad sin perder su esencia en el camino.';

export const heroAreas = [
  { number: '01', label: 'Gestión de Proyectos Digitales' },
  { number: '02', label: 'Diseño UX/UI' },
  { number: '03', label: 'Estrategia de Producto' },
] as const;

export const about = {
  paragraphs: [
    'Soy <strong>Abril Mancuso</strong>, Project Manager y Diseñadora UX/UI. Estoy cursando el cuarto año de la <strong>Licenciatura en Tecnología Multimedial en la Universidad Maimónides (UMAI)</strong>, donde construí un perfil que integra gestión de proyectos, diseño de experiencia y desarrollo.',
    'Mi diferencial es liderar el ciclo completo de un producto digital: investigar el problema, definir el alcance, organizar los tiempos, diseñar flujos e interfaces y acompañar la entrega al equipo de desarrollo. Esta combinación me da el criterio técnico para saber qué es viable, asegurando que la calidad visual y la accesibilidad lleguen intactas al producto final',
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
