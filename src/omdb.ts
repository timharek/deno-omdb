import { OMDBResponse } from './schemas.ts';
import { _fetch, slugify } from './util.ts';
const REQUEST_URL = new URL('https://www.omdbapi.com/');

interface QueryProps {
  api: string;
  titleOrId: string;
}
export async function getMovie(request: QueryProps): Promise<OMDBResponse> {
  const requestUrl = REQUEST_URL;
  const { titleOrId, api } = request;
  requestUrl.searchParams.set('apikey', api);

  if (titleOrId && titleOrId.startsWith('tt')) {
    requestUrl.searchParams.set('i', titleOrId);
  }
  if (titleOrId && !titleOrId.startsWith('tt')) {
    requestUrl.searchParams.set('t', slugify(titleOrId));
  }

  const result = OMDBResponse.parse(await _fetch(requestUrl));
  return result;
}
