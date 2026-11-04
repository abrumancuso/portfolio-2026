/**
 * Etapas del proceso de trabajo (PM + UX/UI).
 *
 * El WorkflowSimulator usa estos datos para mostrar, en cada etapa, qué
 * entregables se generan, qué herramientas se usan y qué preguntas se resuelven.
 */

export interface WorkflowStage {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  description: string;
  deliverables: string[];
  tools: string[];
  questions: string[];
}

export const workflowStages: WorkflowStage[] = [
  {
    id: 'discovery',
    step: '01',
    title: 'Discovery & UX Research',
    shortTitle: 'Discovery',
    description:
      'Entender el problema antes de diseñar la solución: contexto, personas, fricciones y evidencia.',
    deliverables: [
      'Plan de investigación',
      'Entrevistas y observación',
      'Benchmark y mapa de empatía',
      'Hallazgos priorizados',
    ],
    tools: ['Figma', 'FigJam', 'Notion', 'Maze'],
    questions: [
      '¿Quién es la persona usuaria y qué necesita realmente?',
      '¿Dónde están las fricciones del flujo actual?',
      '¿Qué evidencia tenemos para tomar decisiones?',
    ],
  },
  {
    id: 'definicion',
    step: '02',
    title: 'Definición & Priorización (PM)',
    shortTitle: 'Definición',
    description:
      'Convertir los hallazgos en un alcance claro, prioridades defendibles y un mapa de ruta compartido.',
    deliverables: [
      'Objetivos y métricas de éxito',
      'Alcance y no-alcance',
      'Backlog priorizado',
      'Roadmap y criterios de aceptación',
    ],
    tools: ['Jira', 'Notion', 'Trello', 'RICE / MoSCoW'],
    questions: [
      '¿Qué entra ahora y qué queda para después?',
      '¿Qué priorizamos según impacto, esfuerzo y riesgo?',
      '¿Cómo vamos a medir si el producto funciona?',
    ],
  },
  {
    id: 'diseno',
    step: '03',
    title: 'Wireframing & UI Design',
    shortTitle: 'Diseño',
    description:
      'Diseñar flujos sin ruido y una interfaz que se entienda rápido, con criterios de sistema y accesibilidad.',
    deliverables: [
      'User flows y arquitectura de información',
      'Wireframes de baja y media fidelidad',
      'Design system y componentes',
      'Prototipo navegable',
    ],
    tools: ['Figma', 'FigJam', 'Design tokens', 'Prototipos'],
    questions: [
      '¿El flujo se entiende sin explicaciones extra?',
      '¿La interfaz reduce carga cognitiva?',
      '¿Las decisiones visuales son consistentes y accesibles?',
    ],
  },
  {
    id: 'handoff',
    step: '04',
    title: 'Handoff & Desarrollo',
    shortTitle: 'Handoff',
    description:
      'Pasar de la decisión a la implementación con especificaciones claras, viabilidad técnica y control de calidad.',
    deliverables: [
      'Especificaciones y tickets',
      'Criterios de aceptación',
      'Handoff de componentes y estados',
      'QA visual y revisión de implementación',
    ],
    tools: ['Figma Dev Mode', 'Jira', 'GitHub', 'Astro', 'React Native'],
    questions: [
      '¿Qué necesita el equipo de desarrollo para construir sin ambigüedad?',
      '¿Qué es viable técnicamente y qué hay que negociar?',
      '¿Cómo cuidamos la calidad visual y la accesibilidad en cada entrega?',
    ],
  },
  {
    id: 'testing',
    step: '05',
    title: 'Testing & Accesibilidad',
    shortTitle: 'Testing',
    description:
      'Validar con personas reales, medir lo que importa y cerrar el ciclo con mejoras concretas.',
    deliverables: [
      'Plan de pruebas',
      'Test con usuarios',
      'Auditoría WCAG y revisión con teclado',
      'Métricas, hallazgos y retrospectiva',
    ],
    tools: ['Maze', 'Hotjar', 'axe', 'Lighthouse', 'WCAG 2.2'],
    questions: [
      '¿Funciona en un contexto real de uso?',
      '¿Qué falla y qué evidencia tenemos para mejorarlo?',
      '¿La experiencia es accesible para todas las personas?',
    ],
  },
];
