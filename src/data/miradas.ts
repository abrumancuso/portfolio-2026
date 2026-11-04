/**
 * Modos de lectura del portfolio.
 *
 * El selector de Mirada escribe `data-mirada` en <html>. A partir de ese
 * atributo, el CSS global muestra un panel u otro y el JS resalta los
 * metadatos que corresponden a cada enfoque.
 */

export type MiradaId = 'integral' | 'ux' | 'codigo';

export interface MiradaOption {
  id: MiradaId;
  label: string;
  description: string;
}

export const miradaOptions: MiradaOption[] = [
  {
    id: 'integral',
    label: 'Integral',
    description:
      'Una lectura completa: el proyecto, el rol, las decisiones y el proceso en el mismo nivel.',
  },
  {
    id: 'ux',
    label: 'Diseño & UX',
    description:
      'Se destacan la investigación, las decisiones de experiencia, los roles y los criterios de uso.',
  },
  {
    id: 'codigo',
    label: 'Arquitectura & Código',
    description:
      'Se destacan el pipeline técnico, las herramientas, los procesos de producción y las métricas.',
  },
];

export const miradaLabels: Record<MiradaId, string> = {
  integral: 'Integral',
  ux: 'Diseño & UX',
  codigo: 'Arquitectura & Código',
};
