import 'https://deno.land/std@0.222.1/dotenv/load.ts';
import { BadResponse, OMDBResponse, Title } from './schemas.ts';
import { _fetch, slugify } from './util.ts';
const REQUEST_URL = new URL('https://www.omdbapi.com/');

type TitleProps = {
  titleOrId: string;
  type?: 'movies' | 'series' | 'episode';
  year?: number;
  plot?: 'long' | 'short';
  format?: 'json' | 'xml';
};

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

  const verifiedResult = OMDBResponse.parse(rawResponse);
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
