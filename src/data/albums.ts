/**
 * Manual de identidad instantáneo: datos de álbumes y criterios tipográficos.
 *
 * iTunes Search API se usa como fuente pública de metadata y portadas. El
 * componente no pretende reconstruir el manual oficial de una discográfica:
 * interpreta la identidad visual de una portada y la traduce a un sistema.
 */

export interface ItunesAlbum {
  collectionId?: number;
  collectionName?: string;
  artistName?: string;
  artworkUrl100?: string;
  releaseDate?: string;
  trackCount?: number;
  primaryGenreName?: string;
  copyright?: string;
  collectionViewUrl?: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  artwork: string;
  artworkSmall: string;
  year: string;
  genre: string;
  tracks: number;
  copyright: string;
  url: string;
  fallback?: boolean;
}

export interface TypographyPair {
  id: string;
  label: string;
  display: string;
  body: string;
  displayStack: string;
  bodyStack: string;
  note: string;
}

export const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search';
export const ALBUM_LIMIT = 12;
export const ARTWORK_SIZE = 600;
export const SEARCH_TIMEOUT = 12000;

export const getArtworkUrl = (url: string | undefined, size = ARTWORK_SIZE) => {
  if (!url) return '';
  return url.replace(/\/\d+x\d+bb\.(jpg|jpeg|png)$/i, `/${size}x${size}bb.$1`);
};

const getYear = (date: string | undefined) => {
  if (!date) return 's/f';
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? 's/f' : String(parsed.getFullYear());
};

export const toAlbum = (item: ItunesAlbum | null): Album | null => {
  if (
    !item ||
    typeof item.collectionId !== 'number' ||
    typeof item.collectionName !== 'string' ||
    typeof item.artworkUrl100 !== 'string'
  ) {
    return null;
  }

  const artwork = getArtworkUrl(item.artworkUrl100, ARTWORK_SIZE);
  if (!artwork) return null;

  return {
    id: item.collectionId,
    title: item.collectionName,
    artist: item.artistName ?? 'Artista desconocido',
    artwork,
    artworkSmall: getArtworkUrl(item.artworkUrl100, 200),
    year: getYear(item.releaseDate),
    genre: item.primaryGenreName ?? 'Música',
    tracks: item.trackCount ?? 0,
    copyright: item.copyright ?? '',
    url: item.collectionViewUrl ?? 'https://music.apple.com/',
  };
};

const editorialPair: TypographyPair = {
  id: 'editorial',
  label: 'Editorial',
  display: 'Fraunces',
  body: 'DM Sans',
  displayStack: "'Fraunces', Georgia, 'Times New Roman', serif",
  bodyStack: "'DM Sans', system-ui, sans-serif",
  note: 'Serif expresiva para el título y sans neutra para la lectura. Funciona cuando la portada tiene narrativa, textura o un tono de autor.',
};

const contundentePair: TypographyPair = {
  id: 'contundente',
  label: 'Contundente',
  display: 'Archivo Black',
  body: 'DM Sans',
  displayStack: "'Archivo Black', 'Arial Black', sans-serif",
  bodyStack: "'DM Sans', system-ui, sans-serif",
  note: 'Display de alto impacto para un catálogo pop, latino o urbano. La sans de lectura mantiene la metadata clara y evita que todo grite.',
};

const tecnicaPair: TypographyPair = {
  id: 'tecnica',
  label: 'Técnica',
  display: 'Space Grotesk',
  body: 'DM Sans',
  displayStack: "'Space Grotesk', 'Helvetica Neue', sans-serif",
  bodyStack: "'DM Sans', system-ui, sans-serif",
  note: 'Geometría y ritmo para portadas electrónicas o experimentales. La display aporta carácter sin competir con la información.',
};

export const typographyPairs = [editorialPair, contundentePair, tecnicaPair];

export const getTypographyPair = (genre: string): TypographyPair => {
  const normalized = genre.toLowerCase();

  if (
    normalized.includes('latino') ||
    normalized.includes('pop') ||
    normalized.includes('hip-hop') ||
    normalized.includes('rap') ||
    normalized.includes('rock') ||
    normalized.includes('urbano')
  ) {
    return contundentePair;
  }

  if (
    normalized.includes('electronic') ||
    normalized.includes('dance') ||
    normalized.includes('soundtrack') ||
    normalized.includes('techno') ||
    normalized.includes('house')
  ) {
    return tecnicaPair;
  }

  return editorialPair;
};

const fallbackArtwork = (url: string) => getArtworkUrl(url, ARTWORK_SIZE);

export const fallbackAlbums: Album[] = [
  {
    id: 1739659134,
    title: 'HIT ME HARD AND SOFT',
    artist: 'Billie Eilish',
    artwork: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/100x100bb.jpg',
    ),
    artworkSmall: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/200x200bb.jpg',
    ),
    year: '2024',
    genre: 'Alternative',
    tracks: 11,
    copyright: '© 2024 Darkroom/Interscope Records',
    url: 'https://music.apple.com/us/album/hit-me-hard-and-soft/1739659134',
    fallback: true,
  },
  {
    id: 1450695723,
    title: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
    artist: 'Billie Eilish',
    artwork: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/100x100bb.jpg',
    ),
    artworkSmall: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/200x200bb.jpg',
    ),
    year: '2019',
    genre: 'Alternative',
    tracks: 14,
    copyright: '© 2019 Darkroom/Interscope Records',
    url: 'https://music.apple.com/us/album/when-we-all-fall-asleep-where-do-we-go/1450695723',
    fallback: true,
  },
  {
    id: 1440898929,
    title: 'dont smile at me',
    artist: 'Billie Eilish',
    artwork: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/100x100bb.jpg',
    ),
    artworkSmall: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/200x200bb.jpg',
    ),
    year: '2017',
    genre: 'Alternative',
    tracks: 9,
    copyright: '© 2017 Darkroom/Interscope Records',
    url: 'https://music.apple.com/us/album/dont-smile-at-me/1440898929',
    fallback: true,
  },
  {
    id: 1668892833,
    title: 'Cupido',
    artist: 'TINI',
    artwork: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8e/4d/c6/8e4dc662-e848-84c4-fbf8-74250e70bfdc/196589774842.jpg/100x100bb.jpg',
    ),
    artworkSmall: fallbackArtwork(
      'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8e/4d/c6/8e4dc662-e848-84c4-fbf8-74250e70bfdc/196589774842.jpg/200x200bb.jpg',
    ),
    year: '2023',
    genre: 'Pop Latino',
    tracks: 14,
    copyright: '© 2023 Sony Music Entertainment Argentina',
    url: 'https://music.apple.com/us/album/cupido/1668892833',
    fallback: true,
  },
];
