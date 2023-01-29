/**
 * Simple module for querying movies and TV shows from OMDb API.
 *
 * ## Example
 * ```ts
 * import { getMovie } from 'https://deno.land/x/omdb/mod.ts';
 *
 * const request = { titleOrId: 'Spider-Man', apiKey: 'xxxx', verbose: 0 };
 * const result = await getMovie(request);
 * ```
 * @module
 */

export { getMovie } from './src/omdb.ts';
export { Query, Result } from './mod.d.ts';
