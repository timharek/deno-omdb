import { OMDBResponse, Title } from './schemas.ts';

export async function _fetch(url: URL): Promise<OMDBResponse> {
  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function textResult(input: Title): string {
  return `${input.Title} (${input.Year}) has a rating of ${input.imdbRating} on IMDb`;
}
