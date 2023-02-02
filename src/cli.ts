import { Command, GithubProvider, UpgradeCommand } from '../deps.ts';
import { getMovie } from './util.ts';

await new Command()
  .name('omdb')
  .version('v1.4.3')
  .description('CLI tool for querying data from OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example('Query with title', 'omdb \'Spider-Man Far from home\'')
  .example('Query with id', 'omdb tt6320628')
  .globalEnv('OMDB_API=<api_key:string>', 'Your OMDb API key.', {
    prefix: 'OMDB_',
  })
  .globalOption('-a, --api <key:string>', 'API-key from OMDb.')
  .globalOption('-v, --verbose', 'A more verbose output.', {
    collect: true,
    value: (_, verbose = 0) => ++verbose,
  })
  .arguments('[titleOrId:string]')
  .action(async (options, titleOrId: string) => {
    console.log(await getMovie(titleOrId, options));
  })
  .command(
    'upgrade',
    new UpgradeCommand({
      main: 'mod.ts',
      args: ['--allow-net', '--allow-read', '--allow-env'],
      provider: [new GithubProvider({ repository: 'timharek/deno-omdb' })],
    }),
  )
  .parse(Deno.args);
