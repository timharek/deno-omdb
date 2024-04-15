import { SearchObject, Title } from './schemas.ts';

export async function _fetch(url: URL): Promise<unknown> {
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

export function stringifyTitle(title: Title): string {
  return `${title.Title} (${title.Year}) has a rating of ${title.imdbRating} on IMDb`;
}

export function stringifySearch(search: SearchObject): string {
  const rowsResult = search.Search.map((title) =>
    `\t- ${title.Title} (${title.Year}): ${title.imdbID} (${title.Type})`
  );
  return `Totalt results: ${search.totalResults}
${rowsResult.join('\n')}
`;
}
