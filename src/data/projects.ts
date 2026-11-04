/**
 * Datos de los proyectos destacados.
 *
 * IMPORTANTE: se mantienen exactamente los cuatro proyectos que ya estaban
 * cargados en la versión anterior del portfolio. La sección aclara que es una
 * selección y no la totalidad de los trabajos.
 *
 * Cada proyecto tiene tres "miradas" (integral, ux y codigo). El selector de
 * Mirada decide cuál se muestra y qué metadatos se destacan.
 */

import type { MiradaId } from './miradas';

export type { MiradaId } from './miradas';

export type AreaId = 'diseno' | 'audiovisual' | '3d' | 'gestion';

export interface MiradaContent {
  focus: string;
  highlight: string;
  detail: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ProcessStep {
  step: string;
  detail: string;
}

export type ProjectMedia =
  | {
      type: 'video';
      src: string;
      poster: string;
      alt: string;
      caption: string;
    }
  | {
      type: 'images';
      images: string[];
      alt: string;
      caption: string;
    };

export interface Project {
  id: string;
  title: string;
  tag: string;
  year: string;
  areas: AreaId[];
  roles: string[];
  summary: string;
  problem: string;
  role: string;
  decisions: string[];
  learnings: string;
  metrics: Metric[];
  tools: string[];
  process: ProcessStep[];
  media: ProjectMedia;
  miradas: Record<MiradaId, MiradaContent>;
  behanceUrl: string;
}

const maimoSlides = Array.from(
  { length: 45 },
  (_, index) => `/media/maimoconecta/slide-${String(index + 1).padStart(3, '0')}.jpg`,
);

const tiniPages = Array.from(
  { length: 9 },
  (_, index) => `/media/tini/pagina-${String(index + 1).padStart(3, '0')}.jpg`,
);

const behance = 'https://www.behance.net/abrilmancuso';

export const filterAreas = [
  { id: 'todas', label: 'Todas' },
  { id: 'diseno', label: 'Diseño & UX' },
  { id: 'audiovisual', label: 'Audiovisual' },
  { id: '3d', label: '3D & Producción' },
  { id: 'gestion', label: 'Gestión' },
] as const;

export const projects: Project[] = [
  {
    id: 'billie-animation',
    title: 'Billie Eilish Argentina Tour',
    tag: 'Motion Graphics',
    year: '2024',
    areas: ['audiovisual'],
    roles: ['Dirección de arte', 'Animación de personaje', 'Edición y sonido'],
    summary:
      'Aviso de gira para el tour HIT ME HARD AND SOFT de Billie Eilish. Animación de personaje y motion graphics en formato vertical.',
    problem:
      'Proyecto final de Técnicas de Animación. Había que comunicar una fecha de gira en pocos segundos y con un formato pensado para consumo móvil.',
    role:
      'Diseñé y animé el personaje en After Effects desde cero, sincronicé el audio en Premiere Pro y resolví el ritmo del aviso desde la edición.',
    decisions: [
      'Construir el personaje como un sistema de piezas reutilizables para sostener el movimiento en distintos planos.',
      'Trabajar el ritmo desde el audio: los cortes y las transiciones responden a la canción, no a una grilla fija.',
      'Usar una paleta reducida y alto contraste para que la información de la gira se lea en formato vertical.',
    ],
    learnings:
      'Aprendí animación de personaje, motion graphics y el pipeline completo de una pieza audiovisual: idea, animación, edición y audio.',
    metrics: [
      { value: '01', label: 'pieza audiovisual' },
      { value: '9:16', label: 'formato vertical' },
      { value: '02', label: 'etapas de pipeline' },
    ],
    tools: ['After Effects', 'Premiere Pro'],
    process: [
      { step: 'Referencias', detail: 'Análisis de avisos musicales y del universo visual del tour.' },
      { step: 'Storyboard', detail: 'Definición de planos, ritmo y puntos de corte.' },
      { step: 'Animación', detail: 'Construcción del personaje y animación en After Effects.' },
      { step: 'Edición y audio', detail: 'Montaje final y sincronización con la música en Premiere Pro.' },
    ],
    media: {
      type: 'video',
      src: '/media/billie/final.mp4',
      poster: '/media/billie/poster.jpg',
      alt: 'Fotograma del aviso animado de Billie Eilish Argentina Tour',
      caption: 'Pieza final de Técnicas de Animación. Video vertical con audio original del proyecto.',
    },
    miradas: {
      integral: {
        focus: 'Una pieza audiovisual que traduce la energía del tour en un sistema de movimiento.',
        highlight: 'Ritmo, personaje y lectura vertical.',
        detail:
          'El proyecto integra dirección de arte, animación y edición en una única pieza breve. La decisión central fue tratar el audio como guion del movimiento.',
      },
      ux: {
        focus: 'La pieza se diseña para un contexto de consumo móvil: lectura rápida, alto contraste y un único foco por plano.',
        highlight: 'Legibilidad en 9:16 y jerarquía de información.',
        detail:
          'Cada plano tiene una función: presentar el personaje, ubicar el tour y cerrar con la información de la gira. La animación acompaña esa lectura, no la tapa.',
      },
      codigo: {
        focus: 'Pipeline técnico: animación de personaje en After Effects, composición y sincronización de audio en Premiere Pro.',
        highlight: 'Timeline, capas y sincronización.',
        detail:
          'El trabajo se organizó por capas y precomposiciones para poder ajustar el ritmo sin rehacer la animación completa. La edición final se armó sobre la música.',
      },
    },
    behanceUrl: behance,
  },
  {
    id: 'macbook-3d',
    title: 'MacBook Pro Model',
    tag: '3D Product Visualization',
    year: '2025',
    areas: ['3d'],
    roles: ['Modelado 3D', 'Texturizado PBR', 'Iluminación y render'],
    summary:
      'Proyecto final de Producción 3D: modelado, texturizado y renderizado de producto con pipeline completo.',
    problem:
      'Proyecto final de Producción 3D. El desafío era construir un producto reconocible y sostener su materialidad en distintas vistas.',
    role:
      'Modelé en Maya, construí materiales PBR en Substance Painter y resolví la iluminación y el render final con Arnold.',
    decisions: [
      'Modelar por bloques y respetar proporciones reales antes de agregar detalles.',
      'Construir materiales PBR pensados para responder distinto según la luz y el ángulo.',
      'Usar iluminación de estudio para que las tres vistas compartan una misma lógica visual.',
    ],
    learnings:
      'Domine el pipeline completo de producción 3D: modelado, texturizado, lighting y render. Aprendí a pensar el objeto como una serie de decisiones técnicas y visuales.',
    metrics: [
      { value: '03', label: 'renders de producto' },
      { value: 'PBR', label: 'materiales' },
      { value: '01', label: 'pipeline completo' },
    ],
    tools: ['Maya', 'Substance Painter', 'Arnold'],
    process: [
      { step: 'Bloqueo', detail: 'Proporciones y volumen general del producto.' },
      { step: 'Modelado', detail: 'Detalle de piezas, biseles y superficies en Maya.' },
      { step: 'Texturizado', detail: 'Materiales PBR y máscaras en Substance Painter.' },
      { step: 'Iluminación y render', detail: 'Set de luces y renders finales en Arnold.' },
    ],
    media: {
      type: 'images',
      images: [
        '/media/macbook/front.jpg',
        '/media/macbook/front2.jpg',
        '/media/macbook/back.jpg',
      ],
      alt: 'Render 3D de una MacBook Pro',
      caption: 'Tres vistas del producto: frente, detalle y posterior.',
    },
    miradas: {
      integral: {
        focus: 'Un ejercicio de visualización de producto que une forma, material y luz.',
        highlight: 'Proporción, materialidad y consistencia entre vistas.',
        detail:
          'El proyecto no busca un render aislado, sino un sistema de imágenes coherente. Las tres vistas comparten encuadre, iluminación y tratamiento de materiales.',
      },
      ux: {
        focus: 'La lectura del producto se construye desde el encuadre: qué se muestra primero y qué detalle se destaca en cada vista.',
        highlight: 'Jerarquía visual y reconocibilidad.',
        detail:
          'Elegí vistas que permiten reconocer el objeto de inmediato y, al mismo tiempo, descubrir detalles de construcción. La luz guía la mirada hacia las superficies clave.',
      },
      codigo: {
        focus: 'Pipeline 3D: bloqueo, modelado, texturizado PBR, iluminación y render con Arnold.',
        highlight: 'Maya, Substance Painter y Arnold.',
        detail:
          'Cada etapa tiene un archivo y un criterio de salida. El texturizado se construyó para funcionar en las tres vistas sin rehacer materiales entre renders.',
      },
    },
    behanceUrl: behance,
  },
  {
    id: 'maimoconecta',
    title: 'MaimoConecta',
    tag: 'Diseño Estratégico',
    year: '2025',
    areas: ['diseno', 'gestion'],
    roles: ['Research', 'Ideación', 'Presentación'],
    summary:
      'Podcast institucional para conectar estudiantes de Maimónides. Proyecto de Diseño Estratégico con investigación y prototipado.',
    problem:
      'Proyecto de Diseño Estratégico. Los estudiantes de Maimónides carecían de un canal propio para conectarse entre sí y compartir experiencias.',
    role:
      'En equipo aplicamos Design Thinking: investigamos usuarios, ideamos la propuesta y la presentamos como un sistema de comunicación institucional.',
    decisions: [
      'Convertir el podcast en un canal institucional, no en una pieza aislada: identidad, episodios y continuidad.',
      'Prototipar la propuesta como una narrativa de 45 slides para hacer visible el proceso completo.',
      'Trabajar con roles y entregas parciales para sostener el proyecto en equipo.',
    ],
    learnings:
      'Fue mi primer proyecto en equipo real. Aprendí a aplicar Design Thinking, a investigar antes de proponer y a defender una idea con evidencia y narrativa.',
    metrics: [
      { value: '45', label: 'slides de proceso' },
      { value: '01', label: 'propuesta de canal' },
      { value: 'UX', label: 'research aplicado' },
    ],
    tools: ['Design Thinking', 'UX Research', 'Presentación'],
    process: [
      { step: 'Research', detail: 'Entrevistas y observación del vínculo entre estudiantes.' },
      { step: 'Ideación', detail: 'Definición del podcast como canal de conexión.' },
      { step: 'Prototipo', detail: 'Identidad, formato de episodios y narrativa de presentación.' },
      { step: 'Presentación', detail: 'Documento de 45 slides con el proceso y la propuesta.' },
    ],
    media: {
      type: 'images',
      images: maimoSlides,
      alt: 'Presentación del proyecto MaimoConecta',
      caption: 'Presentación completa de 45 slides: investigación, ideación y propuesta.',
    },
    miradas: {
      integral: {
        focus: 'Una propuesta de comunicación institucional que nace de escuchar a los estudiantes.',
        highlight: 'Research, ideación y narrativa de presentación.',
        detail:
          'El proyecto articula investigación, diseño estratégico y trabajo en equipo. La propuesta final se presenta como un sistema de canal, no como una acción suelta.',
      },
      ux: {
        focus: 'La investigación de usuarios define el problema y el formato: un podcast pensado desde las necesidades de conexión de los estudiantes.',
        highlight: 'Design Thinking y UX Research.',
        detail:
          'El proceso partió de entrevistas y observación. La propuesta se validó con el equipo y se comunicó con una narrativa visual clara para que la audiencia académica entendiera el valor.',
      },
      codigo: {
        focus: 'La dimensión técnica del proyecto está en el prototipado y la documentación: cómo se estructura una propuesta para que pueda implementarse.',
        highlight: 'Prototipo, sistema y presentación.',
        detail:
          'Cada etapa dejó un entregable: hallazgos, mapa de oportunidad, concepto y presentación. Esa estructura es la que permite que la idea sobreviva al cambio de contexto.',
      },
    },
    behanceUrl: behance,
  },
  {
    id: 'manual-marea',
    title: 'Tini — Manual de Marca',
    tag: 'Identidad Visual',
    year: '2025',
    areas: ['diseno'],
    roles: ['Dirección de arte', 'Sistema de marca', 'Diseño editorial'],
    summary:
      'Manual de marca para un álbum musical: tipografía, paleta, logo, aplicaciones y guías de uso.',
    problem:
      'Proyecto de Identidad Visual. Un álbum musical necesitaba una identidad coherente que pudiera aplicarse en distintos soportes.',
    role:
      'Construí el sistema visual completo: tipografía, paleta, logo, aplicaciones y criterios de uso. Después lo documenté en un manual editorial.',
    decisions: [
      'Partir de una paleta y una tipografía acotadas para que la identidad se reconozca en cualquier aplicación.',
      'Pensar el manual como una herramienta de uso, no solo como una pieza de presentación.',
      'Mostrar aplicaciones concretas para demostrar que el sistema funciona fuera de la lámina.',
    ],
    learnings:
      'Practiqué diseño de sistemas y construcción de identidad de marca. Aprendí que un manual vale cuando otra persona puede usarlo sin preguntarme.',
    metrics: [
      { value: '09', label: 'páginas de manual' },
      { value: '01', label: 'sistema visual' },
      { value: '03', label: 'aplicaciones' },
    ],
    tools: ['Illustrator', 'InDesign'],
    process: [
      { step: 'Research de marca', detail: 'Análisis del universo musical y de referencias visuales.' },
      { step: 'Sistema visual', detail: 'Paleta, tipografía, logo y reglas de composición.' },
      { step: 'Aplicaciones', detail: 'Pruebas del sistema en piezas y soportes.' },
      { step: 'Manual', detail: 'Documentación editorial de usos y criterios.' },
    ],
    media: {
      type: 'images',
      images: tiniPages,
      alt: 'Páginas del manual de marca de Tini',
      caption: 'Manual de marca completo: sistema visual, aplicaciones y guías de uso.',
    },
    miradas: {
      integral: {
        focus: 'Un sistema de identidad que traduce el universo de un álbum en reglas visuales reutilizables.',
        highlight: 'Tipografía, paleta y aplicaciones.',
        detail:
          'El manual reúne las decisiones que hacen reconocible la marca: qué tipografía usa, qué colores la sostienen y cómo se aplica sin perder coherencia.',
      },
      ux: {
        focus: 'El manual se diseña para ser usado: jerarquía clara, ejemplos y criterios que reducen la ambigüedad al aplicar la marca.',
        highlight: 'Usabilidad del sistema y documentación.',
        detail:
          'Cada sección responde a una pregunta concreta de quien tiene que aplicar la identidad. El diseño editorial ordena la información para que el manual funcione como herramienta.',
      },
      codigo: {
        focus: 'La lógica de sistema está en las reglas: tokens de color, escalas tipográficas y aplicaciones que se repiten con criterios definidos.',
        highlight: 'Reglas, escalas y consistencia.',
        detail:
          'Aunque el entregable sea editorial, la lógica es la misma que la de un sistema de diseño: definir variables, documentar usos y probar que el sistema resista contextos distintos.',
      },
    },
    behanceUrl: behance,
  },
];

export const areaLabels: Record<AreaId, string> = {
  diseno: 'Diseño & UX',
  audiovisual: 'Audiovisual',
  '3d': '3D & Producción',
  gestion: 'Gestión',
};
