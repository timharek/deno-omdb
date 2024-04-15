import { Command } from '../deps.ts';
import { getTitle, search } from './omdb.ts';
import { stringifySearch, stringifyTitle } from './util.ts';

await new Command()
  .name('omdb')
  .version('v3.0.0')
  .description('Use OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example('Query with title', "omdb 'Spider-Man Far from home'")
  .example('Query with id', 'omdb tt6320628')
  .globalEnv('OMDB_API=<api_key:string>', 'Your OMDb API key.', {
    prefix: 'OMDB_',
  })
  .globalEnv('DEBUG', 'Enable debugging output')
  .globalOption('-a, --api <key:string>', 'API-key from OMDb.')
  .globalOption('--json', 'Display JSON output.')
  .arguments('<titleOrId:string>')
  .action(async function (options, titleOrId: string): Promise<void> {
    const result = await getTitle({ titleOrId });

    if (!result) {
      console.error('No result');
      Deno.exit(1);
    }

    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
      Deno.exit(0);
    }
    console.log(stringifyTitle(result));
  })
  .command('search <query:string>')
  .description('Search by movie title.')
  .action(async function (options, query: string): Promise<void> {
    const result = await search({ title: query });

    if (!result) {
      console.error('No result');
      Deno.exit(1);
    }

    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
      Deno.exit(0);
    }
    console.log(stringifySearch(result));
  })
  .parse(Deno.args);
