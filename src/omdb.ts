import 'jsr:@std/dotenv@0.224.0/load';
import {
  BadResponse,
  SearchObject,
  SearchResponse,
  Title,
  TitleResponse,
} from './schemas.ts';
import { _fetch, slugify } from './util.ts';
const REQUEST_URL = new URL('https://www.omdbapi.com/');

type CommonProps = {
  type?: 'movies' | 'series' | 'episode';
  year?: number;
  plot?: 'long' | 'short';
  format?: 'json' | 'xml';
};

type TitleProps = {
  titleOrId: string;
} & CommonProps;

/**
 * Get specific title from IMDb via OMDb's API.
 * A title could be for a movie, TV show or an episode of a TV show.
 *
 * NOTE: You can enable debuggin using `DEBUG` enviroment variable, set it to anything.
 * @throws If `OMDB_API` environment varialbe is not set.
 * @returns Title response if title exists (or matches), else it returns null.
 */
export async function getTitle(
  { titleOrId, type, year, plot, format }: TitleProps,
): Promise<Title | null> {
  const requestUrl = REQUEST_URL;
  const apiKey = Deno.env.get('OMDB_API');
  if (!apiKey) {
    throw new Error('Missing `OMDB_API` environment variable.');
  }

  requestUrl.searchParams.set('apikey', apiKey);
  requestUrl.searchParams.set('type', type ?? '');
  requestUrl.searchParams.set('y', String(year) ?? '');
  requestUrl.searchParams.set('plot', plot ?? '');
  requestUrl.searchParams.set('r', format ?? '');

  const isId = titleOrId.startsWith('tt');
  if (titleOrId && isId) {
    requestUrl.searchParams.set('i', titleOrId);
  }
  if (titleOrId && !isId) {
    requestUrl.searchParams.set('t', slugify(titleOrId));
  }

  const rawResponse = await _fetch(requestUrl);

  const verifiedResult = TitleResponse.parse(rawResponse);
  const isBadResult = BadResponse.safeParse(verifiedResult);
  if (isBadResult.success) {
    const result = BadResponse.parse(verifiedResult);
    if (Deno.env.get('DEBUG')) {
      console.debug(Deno.inspect(result));
    }
    return null;
  }
  const successResult = Title.parse(verifiedResult);
  return successResult;
}

type SearchProps = {
  title: string;
} & CommonProps;

/**
 * Search for titles from IMDb via OMDb's API.
 * A title could be for a movie, TV show or an episode of a TV show.
 *
 * NOTE: You can enable debuggin using `DEBUG` enviroment variable, set it to anything.
 * @throws If `OMDB_API` environment varialbe is not set.
 * @returns Search-response if there are title matches, else it returns null.
 */
export async function search(
  { title, type, year, plot, format }: SearchProps,
): Promise<SearchObject | null> {
  const requestUrl = REQUEST_URL;
  const apiKey = Deno.env.get('OMDB_API');
  if (!apiKey) {
    throw new Error('Missing `OMDB_API` environment variable.');
  }

  requestUrl.searchParams.set('s', title);
  requestUrl.searchParams.set('apikey', apiKey);
  requestUrl.searchParams.set('type', type ?? '');
  requestUrl.searchParams.set('y', String(year) ?? '');
  requestUrl.searchParams.set('plot', plot ?? '');
  requestUrl.searchParams.set('r', format ?? '');

  const rawResponse = await _fetch(requestUrl);

  const verifiedResult = SearchResponse.parse(rawResponse);
  const isBadResult = BadResponse.safeParse(verifiedResult);
  if (isBadResult.success) {
    const result = BadResponse.parse(verifiedResult);
    if (Deno.env.get('DEBUG')) {
      console.debug(Deno.inspect(result));
    }
    return null;
  }
  const successResult = SearchObject.parse(verifiedResult);
  return successResult;
}
