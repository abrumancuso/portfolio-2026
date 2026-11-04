/**
 * Configuración y datos de respaldo para el LiveApiDashboard.
 *
 * La API pública de GitHub no requiere token para este endpoint, pero tiene
 * un límite de 60 solicitudes por hora por IP. Si se alcanza el límite o falla
 * la red, el panel ofrece datos locales de respaldo para no romper la
 * experiencia.
 */

export interface GitHubRepo {
  id?: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork?: boolean;
}

export const GITHUB_USERNAME = 'abrumancuso';

export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`;

export const fallbackRepos: GitHubRepo[] = [
  {
    name: 'portfolio_progra_iv',
    html_url: 'https://github.com/abrumancuso/portfolio_progra_iv',
    description: 'Portfolio académico de Programación IV.',
    language: null,
    stargazers_count: 0,
    updated_at: '2026-10-28T12:00:00Z',
  },
  {
    name: 'FitCheck',
    html_url: 'https://github.com/abrumancuso/FitCheck',
    description: 'Proyecto de desarrollo web con JavaScript.',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2026-10-12T17:45:21Z',
  },
  {
    name: 'portfolio',
    html_url: 'https://github.com/abrumancuso/portfolio',
    description: 'Versión anterior del portfolio personal, antes de la migración a AstroJS.',
    language: 'CSS',
    stargazers_count: 0,
    updated_at: '2026-04-23T12:00:00Z',
  },
  {
    name: 'maimo-prog3-2025-tpfinal',
    html_url: 'https://github.com/abrumancuso/maimo-prog3-2025-tpfinal',
    description: 'Trabajo práctico final de Programación III.',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2025-11-20T04:46:49Z',
  },
  {
    name: 'maimo-prog3-2025-tpfinalbackend',
    html_url: 'https://github.com/abrumancuso/maimo-prog3-2025-tpfinalbackend',
    description: 'Backend del trabajo práctico final de Programación III.',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2025-11-20T04:46:06Z',
  },
  {
    name: 'maimo-prog3-tp-ecommerce-front',
    html_url: 'https://github.com/abrumancuso/maimo-prog3-tp-ecommerce-front',
    description: 'Frontend de un e-commerce para Programación III.',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2025-10-24T22:10:06Z',
  },
  {
    name: 'maimo-prog3-2025-shop-back',
    html_url: 'https://github.com/abrumancuso/maimo-prog3-2025-shop-back',
    description: 'Backend de un e-commerce para Programación III.',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2025-10-17T00:08:21Z',
  },
  {
    name: 'parcial-progra-mancuso',
    html_url: 'https://github.com/abrumancuso/parcial-progra-mancuso',
    description: 'Parcial de Programación III.',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2025-08-08T00:09:29Z',
  },
];
