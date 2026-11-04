/**
 * Modos de lectura de los proyectos.
 *
 * El switch del ProjectExplorer escribe `data-mirada` en <html>. A partir de
 * ese atributo, el CSS global muestra un panel u otro y el JS resalta los
 * metadatos que corresponden a cada enfoque.
 */

export type MiradaId = 'producto' | 'gestion';

export interface MiradaOption {
  id: MiradaId;
  label: string;
  shortLabel: string;
  description: string;
}

export const miradaOptions: MiradaOption[] = [
  {
    id: 'producto',
    label: 'Mirada UX/UI & Producto',
    shortLabel: 'UX/UI & Producto',
    description:
      'Se destacan el problema de usuario, los flujos, las decisiones de interfaz y los criterios de experiencia.',
  },
  {
    id: 'gestion',
    label: 'Mirada Gestión & Arquitectura Técnica',
    shortLabel: 'Gestión & Técnica',
    description:
      'Se destacan el alcance, la organización, las prioridades, el stack, el proceso y la implementación.',
  },
];

export const miradaLabels: Record<MiradaId, string> = {
  producto: 'UX/UI & Producto',
  gestion: 'Gestión & Arquitectura Técnica',
};

export const miradaDescriptions: Record<MiradaId, string> = {
  producto:
    'Se destacan el problema de usuario, los flujos, las decisiones de interfaz y los criterios de experiencia.',
  gestion:
    'Se destacan el alcance, la organización, las prioridades, el stack, el proceso y la implementación.',
};
