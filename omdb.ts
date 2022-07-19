import { options, REQUEST_URL } from './deps.ts';

async function _fetch(url: URL) {
  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export async function getMovie(query: Query, format: string) {
  const requestUrl = REQUEST_URL;
  requestUrl.searchParams.set('apikey', options.api);

  if (query.id) {
    requestUrl.searchParams.set('i', query.id);
  } else if (query.title) {
    requestUrl.searchParams.set('t', query.title);
  }

  const result = await _fetch(requestUrl);
  if (format == 'long') {
    return result;
  }

  return {
    title: result.Title,
    year: result.Year,
    genre: result.Genre,
    director: result.Director,
  };
}

export interface Query {
  id?: string;
  title?: string;
}

export function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
