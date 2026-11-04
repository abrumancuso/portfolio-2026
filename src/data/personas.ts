/**
 * Configuración y datos de respaldo del laboratorio de proto-personas.
 *
 * Random User API genera perfiles ficticios. No representa personas reales:
 * se usa como disparador para ejercicios de research y para alinear hipótesis
 * antes de salir a hablar con usuarios.
 */

export interface PersonaApiResult {
  login: { uuid: string };
  name: { first: string; last: string };
  location: { city: string; country: string };
  email: string;
  dob: { age: number };
  picture: { large: string; medium: string; thumbnail: string };
}

export interface PersonaSetResponse {
  results: PersonaApiResult[];
  info?: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface ResearchHypothesis {
  goal: string;
  pain: string;
  question: string;
}

export interface ResearchContext {
  id: string;
  label: string;
  description: string;
  hypotheses: ResearchHypothesis[];
}

export const PERSONA_API_BASE = 'https://randomuser.me/api/';
export const PERSONA_API_URL =
  'https://randomuser.me/api/?results=4&nat=es,us,gb&inc=name,location,email,dob,picture,login';
export const DEFAULT_CONTEXT = 'producto';

export const researchContexts: ResearchContext[] = [
  {
    id: 'producto',
    label: 'Producto digital',
    description:
      'Personas que usan una aplicación o servicio para resolver una tarea concreta. El foco está en la fricción y la confianza.',
    hypotheses: [
      {
        goal: 'Completar una tarea frecuente en pocos pasos.',
        pain: 'Pierde contexto cuando la interfaz cambia de sección.',
        question: '¿Qué información necesita ver antes de actuar?',
      },
      {
        goal: 'Comparar opciones antes de tomar una decisión.',
        pain: 'No encuentra criterios claros para elegir.',
        question: '¿Qué datos usa para comparar alternativas?',
      },
      {
        goal: 'Resolver un problema urgente desde el celular.',
        pain: 'La carga cognitiva aumenta cuando tiene prisa.',
        question: '¿Qué atajo necesita para terminar la tarea?',
      },
      {
        goal: 'Aprender a usar una función nueva.',
        pain: 'No sabe si lo está haciendo bien.',
        question: '¿Qué señal de confirmación le da seguridad?',
      },
    ],
  },
  {
    id: 'educacion',
    label: 'Educación',
    description:
      'Personas que estudian y necesitan sostener el aprendizaje entre otras responsabilidades. El foco está en la motivación y el progreso.',
    hypotheses: [
      {
        goal: 'Organizar el estudio alrededor de otras responsabilidades.',
        pain: 'Se le acumulan entregas y pierde prioridades.',
        question: '¿Cómo planifica su semana de estudio?',
      },
      {
        goal: 'Entender un concepto antes de practicarlo.',
        pain: 'Le cuesta pedir ayuda cuando se traba.',
        question: '¿Qué canal usa para resolver dudas?',
      },
      {
        goal: 'Medir su progreso de forma visible.',
        pain: 'No percibe avances hasta la evaluación.',
        question: '¿Qué evidencia de progreso le resulta significativa?',
      },
      {
        goal: 'Aprender con otros, no en soledad.',
        pain: 'La experiencia individual le quita motivación.',
        question: '¿Qué tipo de interacción con pares le ayuda?',
      },
    ],
  },
  {
    id: 'comunidad',
    label: 'Comunidad',
    description:
      'Personas que quieren sentirse parte de un grupo y participar. El foco está en la pertenencia, la información y el nivel de exposición.',
    hypotheses: [
      {
        goal: 'Encontrar personas con intereses similares.',
        pain: 'Los canales existentes le parecen dispersos.',
        question: '¿Dónde busca conexión hoy?',
      },
      {
        goal: 'Participar sin exponerse demasiado.',
        pain: 'Le preocupa opinar en público.',
        question: '¿Qué nivel de participación le resulta cómodo?',
      },
      {
        goal: 'Enterarse de actividades relevantes.',
        pain: 'La información llega tarde o por canales que no revisa.',
        question: '¿Qué canal usa para enterarse?',
      },
      {
        goal: 'Contribuir con algo concreto.',
        pain: 'No sabe qué aporte se espera de él.',
        question: '¿Qué tarea inicial le resultaría clara y útil?',
      },
    ],
  },
];

export const isResearchContext = (value: string | null | undefined): value is string =>
  Boolean(value && researchContexts.some((context) => context.id === value));

export const researchContextLabel = (id: string) =>
  researchContexts.find((context) => context.id === id)?.label ?? id;

const emptyPicture = { large: '', medium: '', thumbnail: '' };

export const fallbackPersonas: PersonaApiResult[] = [
  {
    login: { uuid: 'fallback-sofia' },
    name: { first: 'Sofía', last: 'Ramírez' },
    location: { city: 'Barcelona', country: 'Spain' },
    email: 'sofia.ramirez@example.com',
    dob: { age: 27 },
    picture: emptyPicture,
  },
  {
    login: { uuid: 'fallback-james' },
    name: { first: 'James', last: 'Carter' },
    location: { city: 'Manchester', country: 'United Kingdom' },
    email: 'james.carter@example.com',
    dob: { age: 31 },
    picture: emptyPicture,
  },
  {
    login: { uuid: 'fallback-valentina' },
    name: { first: 'Valentina', last: 'Torres' },
    location: { city: 'Miami', country: 'United States' },
    email: 'valentina.torres@example.com',
    dob: { age: 24 },
    picture: emptyPicture,
  },
  {
    login: { uuid: 'fallback-lucas' },
    name: { first: 'Lucas', last: 'Fernández' },
    location: { city: 'Madrid', country: 'Spain' },
    email: 'lucas.fernandez@example.com',
    dob: { age: 38 },
    picture: emptyPicture,
  },
];
