/**
 * Datos de los proyectos destacados.
 *
 * IMPORTANTE: se mantienen exactamente los cuatro proyectos que ya estaban
 * cargados en la versión anterior del portfolio. La sección aclara que es una
 * selección y no la totalidad de los trabajos.
 *
 * Cada proyecto tiene dos "miradas" (producto y gestion). El switch del
 * ProjectExplorer decide cuál se muestra y qué metadatos se destacan.
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
  format: string;
  year: string;
  areas: AreaId[];
  roles: string[];
  /**
   * `summary` es texto plano (se usa en <meta description>).
   * Los campos de caso de estudio admiten HTML acotado (<strong>, <em>) para
   * destacar palabras clave; se renderizan con `set:html`.
   */
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
    format: 'Video · Motion',
    year: '2024',
    areas: ['audiovisual'],
    roles: ['Dirección de arte', 'Animación de personaje', 'Edición y sonido'],
    summary:
      'Aviso de gira para el tour HIT ME HARD AND SOFT: animación de personaje y motion graphics en formato vertical.',
    problem:
      'Proyecto final de Técnicas de Animación: comunicar una fecha de gira en <strong>pocos segundos</strong> y para <strong>consumo móvil</strong>.',
    role:
      'Animé el personaje en <strong>After Effects</strong> desde cero, sincronicé el audio en <strong>Premiere Pro</strong> y resolví el ritmo desde la edición.',
    decisions: [
      'Personaje como <strong>sistema de piezas reutilizables</strong> para sostener el movimiento.',
      'Ritmo desde el audio: cortes y transiciones responden a la canción.',
      'Paleta reducida y alto contraste para leer la fecha en <strong>9:16</strong>.',
    ],
    learnings:
      'Aprendí <strong>animación de personaje</strong> y el pipeline completo: idea, animación, edición y audio.',
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
      producto: {
        focus: 'Pieza pensada para móvil: lectura rápida, alto contraste y un foco por plano.',
        highlight: 'Legibilidad en 9:16, jerarquía y ritmo de lectura.',
        detail:
          'Cada plano cumple una función: presentar el personaje, ubicar el tour y cerrar con la fecha. La animación acompaña esa lectura, <strong>no la tapa</strong>.',
      },
      gestion: {
        focus: 'Pipeline audiovisual: alcance breve, entregables por etapa y coordinación de animación, edición y audio.',
        highlight: 'Alcance, cronograma y pipeline técnico.',
        detail:
          'Organicé el trabajo en referencias, storyboard, animación y edición, con un <strong>entregable verificable</strong> por etapa. Stack: <strong>After Effects</strong> y <strong>Premiere Pro</strong>.',
      },
    },
    behanceUrl: behance,
  },
  {
    id: 'macbook-3d',
    title: 'MacBook Pro Model',
    tag: '3D Product Visualization',
    format: '3 renders · 3D',
    year: '2025',
    areas: ['3d'],
    roles: ['Modelado 3D', 'Texturizado PBR', 'Iluminación y render'],
    summary:
      'Producción 3D completa: modelado, texturizado PBR, iluminación y render de producto en tres vistas.',
    problem:
      'Proyecto final de Producción 3D: construir un producto <strong>reconocible</strong> y sostener su <strong>materialidad</strong> en distintas vistas.',
    role:
      'Modelé en <strong>Maya</strong>, construí materiales <strong>PBR</strong> en Substance Painter y resolví luz y render con <strong>Arnold</strong>.',
    decisions: [
      'Modelar por bloques y respetar <strong>proporciones reales</strong> antes de agregar detalles.',
      'Materiales PBR que responden distinto según la luz y el ángulo.',
      'Iluminación de estudio para que las tres vistas compartan lógica visual.',
    ],
    learnings:
      'Dominé el <strong>pipeline 3D</strong> completo: modelado, texturizado, lighting y render.',
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
      producto: {
        focus: 'La lectura se construye desde el encuadre: qué se muestra primero y qué detalle se destaca.',
        highlight: 'Jerarquía visual, reconocibilidad y consistencia.',
        detail:
          'Elegí vistas que reconocen el objeto de inmediato y, al mismo tiempo, muestran detalles de construcción. La <strong>luz guía la mirada</strong> hacia las superficies clave.',
      },
      gestion: {
        focus: 'Pipeline 3D con control de calidad: bloqueo, modelado, texturizado PBR, luz y render.',
        highlight: 'Maya, Substance Painter y Arnold.',
        detail:
          'Cada etapa tuvo un archivo y un criterio de salida. Los materiales funcionaron en las tres vistas <strong>sin rehacer texturas</strong>. Alcance cerrado en tres piezas.',
      },
    },
    behanceUrl: behance,
  },
  {
    id: 'maimoconecta',
    title: 'MaimoConecta',
    tag: 'Diseño Estratégico',
    format: '45 imágenes · Caso UX',
    year: '2025',
    areas: ['diseno', 'gestion'],
    roles: ['Research', 'Ideación', 'Presentación'],
    summary:
      'Podcast institucional para conectar estudiantes de Maimónides: investigación, ideación y prototipado.',
    problem:
      'Proyecto de Diseño Estratégico: los estudiantes de Maimónides no tenían un <strong>canal propio</strong> para conectarse y compartir experiencias.',
    role:
      'En equipo aplicamos <strong>Design Thinking</strong>: investigación de usuarios, ideación y presentación del sistema de comunicación.',
    decisions: [
      'Convertir el podcast en <strong>canal institucional</strong>: identidad, episodios y continuidad.',
      'Prototipar la propuesta como narrativa de <strong>45 slides</strong> para mostrar el proceso.',
      'Roles y entregas parciales para sostener el trabajo en equipo.',
    ],
    learnings:
      'Mi primer proyecto en equipo real: aprendí a <strong>investigar antes de proponer</strong> y a defender una idea con evidencia.',
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
      producto: {
        focus: 'La investigación define el problema y el formato: un podcast pensado desde la necesidad de conexión.',
        highlight: 'Design Thinking, UX Research y narrativa de presentación.',
        detail:
          'Partimos de entrevistas y observación. La propuesta se validó en equipo y se comunicó con una <strong>narrativa visual clara</strong> para que la audiencia académica entendiera el valor.',
      },
      gestion: {
        focus: 'La gestión se ve en alcance, roles y entregables: investigación, ideación, prototipo y presentación.',
        highlight: 'Alcance, roles, entregables y presentación.',
        detail:
          'Cada etapa dejó un <strong>entregable verificable</strong>: hallazgos, mapa de oportunidad, concepto y presentación de 45 slides. Esa estructura sostuvo el trabajo en equipo.',
      },
    },
    behanceUrl: behance,
  },
  {
    id: 'manual-marea',
    title: 'Tini — Manual de Marca',
    tag: 'Identidad Visual',
    format: '9 páginas · Identidad',
    year: '2025',
    areas: ['diseno'],
    roles: ['Dirección de arte', 'Sistema de marca', 'Diseño editorial'],
    summary:
      'Manual de marca para un álbum musical: tipografía, paleta, logo, aplicaciones y guías de uso.',
    problem:
      'Proyecto de Identidad Visual: un álbum necesitaba una identidad <strong>coherente</strong> aplicable en distintos soportes.',
    role:
      'Construí el <strong>sistema visual</strong> completo —tipografía, paleta, logo, aplicaciones— y lo documenté en un manual editorial.',
    decisions: [
      'Paleta y tipografía acotadas para reconocer la marca en <strong>cualquier aplicación</strong>.',
      'Pensar el manual como <strong>herramienta de uso</strong>, no como pieza de presentación.',
      'Mostrar aplicaciones reales para probar el sistema fuera de la lámina.',
    ],
    learnings:
      'Practiqué <strong>diseño de sistemas</strong> e identidad de marca. Un manual vale cuando otra persona puede usarlo sin preguntarme.',
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
      producto: {
        focus: 'El manual se diseña para ser usado: jerarquía clara, ejemplos y criterios que reducen la ambigüedad.',
        highlight: 'Usabilidad del sistema y documentación.',
        detail:
          'Cada sección responde a una pregunta concreta de quien aplica la identidad. El <strong>diseño editorial</strong> ordena la información para que el manual funcione como herramienta.',
      },
      gestion: {
        focus: 'La lógica de sistema está en las reglas: tokens de color, escalas tipográficas y criterios de uso.',
        highlight: 'Reglas, escalas, documentación y consistencia.',
        detail:
          'Misma lógica que un <strong>sistema de diseño</strong>: definir variables, documentar usos y probar que resista contextos distintos. El manual funciona como <strong>handoff</strong> para otra persona.',
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
