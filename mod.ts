/**
 * Simple module for querying movies and TV shows from OMDb API.
 *
 * ## Example
 * ```ts
 * import { getTitle } from 'https://deno.land/x/omdb/mod.ts';
 *
 * const result = await getTitle({ titleOrId: 'Spider-Man' });
 * ```
 * @module
 */

export { getTitle, search } from './src/omdb.ts';
