// @deno-types="../mod.d.ts"

import { _fetch, getVerbosifiedMessage, slugify } from './util.ts';
const REQUEST_URL = new URL('https://www.omdbapi.com/');

export async function getMovie(request: Query) {
  const requestUrl = REQUEST_URL;
  const { titleOrId, apiKey, verbose } = request;
  requestUrl.searchParams.set('apikey', apiKey);

  if (titleOrId && titleOrId.startsWith('tt')) {
    requestUrl.searchParams.set('i', titleOrId);
  }
  if (titleOrId && !titleOrId.startsWith('tt')) {
    requestUrl.searchParams.set('t', slugify(titleOrId));
  }

  const result = await _fetch(requestUrl);
  const parsedResult = parseOMDbResponse(result);
  return getVerbosifiedMessage(parsedResult, verbose);
}

function parseOMDbResponse(result: OMDb.Response) {
  if (result.Response && result.Response === 'False') {
    console.error('Movie or show not found');
    Deno.exit(1);
  }
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
