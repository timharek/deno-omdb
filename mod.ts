import { Command } from './deps.ts';
import { getMovie, Query } from './omdb.ts';

await new Command()
  .name('omdb')
  .version('1.1.1')
  .description('CLI tool for querying data from OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example('omdb --api <api_key> -t \'Spider-Man Far from home\'', '')
  .example('omdb -a <api_key> -i tt6320628', '')
  .option('-a, --api <key:string>', 'API-key from OMDb.', {
    required: true,
  })
  .option('-v, --verbose [value:boolean]', 'A more verbose output.', {
    default: false,
  })
  .option(
    '-i, --id <id:string>',
    'Takes id as string argument (Does not work with --title)',
  )
  .option(
    '-t, --title <titlestring>',
    'Takes title as string argument (Does not work with --id)',
  )
  .action(
    async (options: {
      api: string;
      id: string;
      title: string;
      verbose: boolean;
    }) => {
      const request: Query = {
        apiKey: options.api,
        id: options.id,
        title: options.title,
        verbose: options.verbose,
      };

      console.log(await getMovie(request));
    },
  )
  .parse(Deno.args);
