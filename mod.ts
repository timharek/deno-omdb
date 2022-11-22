// @deno-types='./mod.d.ts'
import { Command } from './deps.ts';
import { getMovie, Query } from './omdb.ts';

await new Command()
  .name('omdb')
  .version('1.2.0')
  .description('CLI tool for querying data from OMDb API.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/deno-omdb')
  .example(
    'Query omdb with title',
    'omdb --api <api_key> -t \'Spider-Man Far from home\'',
  )
  .example('Query omdb with id', 'omdb -a <api_key> -i tt6320628')
  .globalOption('-a, --api <key:string>', 'API-key from OMDb.', {
    required: true,
  })
  .globalOption('-v, --verbose', 'A more verbose output.', {
    collect: true,
    value: (value: boolean, previous: number = 0) => (value ? previous + 1 : 0),
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
      const request: Query = {
        apiKey: options.api,
        id: options.id,
        title: options.title,
        verbose: options.verbose ?? 0,
      };

      console.log(await getMovie(request));
    },
  )
  .parse(Deno.args);
