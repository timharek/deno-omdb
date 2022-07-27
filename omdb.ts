import { REQUEST_URL } from './deps.ts';

export interface Query {
  apiKey: string;
  id?: string;
  title?: string;
  verbose: boolean;
}

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

export async function getMovie(request: Query) {
  const requestUrl = REQUEST_URL;
  requestUrl.searchParams.set('apikey', request.apiKey);

  if (request.id) {
    requestUrl.searchParams.set('i', request.id);
  } else if (request.title) {
    requestUrl.searchParams.set('t', slugify(request.title));
  }

  const result = await _fetch(requestUrl);
  if (request.verbose) {
    return {
      ...result,
      imdb_url: `https://www.imdb.com/title/${result.imdbID}`,
    };
  }

  return {
    title: result.Title,
    year: result.Year,
    genre: result.Genre,
    director: result.Director,
    imdb_url: `https://www.imdb.com/title/${result.imdbID}`,
  };
}

function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
