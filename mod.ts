// @deno-types='./mod.d.ts'
import { Command, GithubProvider, UpgradeCommand } from './deps.ts';
import { getMovie, Query } from './omdb.ts';

await new Command()
  .name('omdb')
  .version('v1.2.0')
  .description('CLI tool for querying data from OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example(
    'Query with title',
    'omdb -t \'Spider-Man Far from home\'',
  )
  .example('Query with id', 'omdb -i tt6320628')
  .globalEnv('OMDB_API=<api_key:string>', 'Your OMDb API key.')
  .globalOption('-a, --api <key:string>', 'API-key from OMDb.')
  .globalOption('-v, --verbose', 'A more verbose output.', {
    collect: true,
    value: (value: boolean, previous = 0) => (value ? previous + 1 : 0),
  })
  .option(
    '-i, --id <id:string>',
    'Takes id as string argument (Does not work with --title)',
  )
  .option(
    '-t, --title <title:string>',
    'Takes title as string argument (Does not work with --id)',
  )
  .action(
    async (options) => {
      if (Deno.env.get('OMDB_API') === undefined && !options.api) {
        throw new Error('Missing API key');
      }

      const apiKey = Deno.env.get('OMDB_API') ?? options.api;
      const request: Query = {
        apiKey: apiKey,
        id: options.id,
        title: options.title,
        verbose: options.verbose ?? 0,
      };

      console.log(await getMovie(request));
    },
  )
  .command(
    'upgrade',
    new UpgradeCommand({
      main: 'mod.ts',
      args: ['--allow-net', '--allow-read', '--allow-env'],
      provider: [new GithubProvider({ repository: 'timharek/deno-omdb' })],
    }),
  )
  .parse(Deno.args);
