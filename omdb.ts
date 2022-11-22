// @deno-types='./mod.d.ts'
import { REQUEST_URL } from './deps.ts';

export interface Query {
  apiKey: string;
  id?: string;
  title?: string;
  verbose: number;
}

async function _fetch(url: URL): Promise<OMDb.Response> {
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
  const parsedResult = parseOMDbResponse(result);
  return getVerbosifiedMessage(parsedResult, request.verbose);
}

function parseOMDbResponse(result: OMDb.Response) {
  return {
    title: result.Title,
    year: Number(result.Year),
    released: result.Released,
    runtime: result.Runtime,
    genre: result.Genre.split(', '),
    director: result.Director.split(', '),
    writer: result.Writer.split(', '),
    actors: result.Actors.split(', '),
    plot: result.Plot,
    language: result.Language,
    country: result.Country,
    awards: result.Awards,
    poster: result.Poster,
    ratings: result.Ratings.map((entry) => {
      return {
        source: entry.Source,
        value: entry.Value,
      };
    }),
    metascore: result.Metascore,
    imdbRating: result.imdbRating,
    imdbVotes: result.imdbVotes,
    imdbID: result.imdbID,
    imdbUrl: `https://www.imdb.com/title/${result.imdbID}`,
    type: result.Type,
    dvd: result.DVD,
    boxOffice: result.BoxOffice,
    production: result.Production,
    website: result.Website,
    response: result.Response,
  } as Result;
}

function getVerbosifiedMessage(result: Result, verbose: number) {
  if (verbose > 1) {
    return result;
  } else if (verbose === 1) {
    return {
      title: result.title,
      year: result.year,
      genre: result.genre,
      director: result.director,
      imdbUrl: result.imdbUrl,
    };
  }

  return `${result.title} (${result.year}) has a ${result.imdbRating} rating on IMDb`;
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
