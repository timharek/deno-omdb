import { Command } from '../deps.ts';
import { getMovie } from './omdb.ts';

await new Command()
  .name('omdb')
  .version('v2.0.0')
  .description('CLI tool for querying data from OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example('Query with title', 'omdb \'Spider-Man Far from home\'')
  .example('Query with id', 'omdb tt6320628')
  .globalEnv('OMDB_API=<api_key:string>', 'Your OMDb API key.', {
    prefix: 'OMDB_',
  })
  .globalOption('-a, --api <key:string>', 'API-key from OMDb.')
  .arguments('<titleOrId:string>')
  .action(async function (options, titleOrId: string): Promise<void> {
    if (!options.api) {
      throw new Error('Missing API');
    }
    const result = await getMovie({ titleOrId, api: options.api });
    console.log(result);
  })
  .parse(Deno.args);
