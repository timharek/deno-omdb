import { Command, GithubProvider, UpgradeCommand } from './deps.ts';
import { getMovie } from './omdb.ts';

await new Command()
  .name('omdb')
  .version('v1.3.0')
  .description('CLI tool for querying data from OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example('Query with title', 'omdb -t \'Spider-Man Far from home\'')
  .example('Query with id', 'omdb -i tt6320628')
  .globalEnv('OMDB_API=<api_key:string>', 'Your OMDb API key.')
  .globalOption('-a, --api <key:string>', 'API-key from OMDb.')
  .globalOption('-v, --verbose', 'A more verbose output.', {
    collect: true,
    value: (_, verbose = 0) => ++verbose,
  })
  .option(
    '-i, --id <id:string>',
    'Takes id as string argument (Does not work with --title)',
  )
  .option(
    '-t, --title <title:string>',
    'Takes title as string argument (Does not work with --id)',
  )
  .arguments('[titleOrId:string]')
  .action(async (options, titleOrId: string) => {
    if (Deno.env.get('OMDB_API') === undefined && !options.api) {
      throw new Error('Missing API key');
    }
    if (titleOrId && titleOrId.startsWith('tt')) {
      options.id = titleOrId;
    }
    if (titleOrId && !titleOrId.startsWith('tt')) {
      options.title = titleOrId;
    }

    const apiKey = Deno.env.get('OMDB_API') ?? options.api;
    const request: Partial<Query> = {
      apiKey: apiKey,
      id: options.id,
      title: options.title,
      verbose: options.verbose ?? 0,
    };

    console.log(await getMovie(request as Query));
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
