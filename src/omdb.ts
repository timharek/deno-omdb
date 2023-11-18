import { ZodError } from 'https://deno.land/x/zod@v3.22.4/ZodError.ts';
import { BadResponse, OMDBResponse, SuccessResponse } from './schemas.ts';
import { _fetch, slugify } from './util.ts';
const REQUEST_URL = new URL('https://www.omdbapi.com/');

interface QueryProps {
  api: string;
  titleOrId: string;
}
export async function getMovie(
  request: QueryProps,
): Promise<SuccessResponse> {
  const requestUrl = REQUEST_URL;
  const { titleOrId, api } = request;

  requestUrl.searchParams.set('apikey', api);

  const isId = titleOrId.startsWith('tt');
  if (titleOrId && isId) {
    requestUrl.searchParams.set('i', titleOrId);
  }
  if (titleOrId && !isId) {
    requestUrl.searchParams.set('t', slugify(titleOrId));
  }

  try {
    const verifiedResult = OMDBResponse.parse(await _fetch(requestUrl));
    const isBadResult = BadResponse.safeParse(verifiedResult);
    if (isBadResult.success) {
      const result = BadResponse.parse(verifiedResult);
      throw new Error(result.Error);
    }
    const successResult = SuccessResponse.parse(verifiedResult);
    return successResult;
  } catch (error) {
    if (error instanceof ZodError) {
      throw JSON.stringify(
        { message: 'ZodError', error: JSON.parse(error.message) },
        null,
        2,
      );
    }
    throw error;
  }
}
