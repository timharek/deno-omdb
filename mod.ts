import { Command } from './deps.ts';
import { getMovie, Query } from './omdb.ts';

const { options } = await new Command()
  .name('omdb')
  .version('1.1.0')
  .description('CLI tool for querying data from OMDb API.')
  .meta("Author", "Tim Hårek Andreassen <tim@harek.no>")
  .meta("Source", "https://github.com/timharek/deno-omdb")
  .example(
    "omdb --api <api_key> -t \'Spider-Man Far from home\'",
    ""
  )
  .example(
    "omdb -a <api_key> -i tt6320628",
    ""
  )
  .option('-a, --api <key>', 'API-key from OMDb.', {
    required: true,
  })
  .option('-s, --short', 'Returns response in the short-format.')
  .option(
    '-i, --id <id>',
    'Takes id as string argument (Does not work with --title)',
  )
  .option(
    '-t, --title <title>',
    'Takes title as string argument (Does not work with --id)',
  )
  .parse(Deno.args);

const request: Query = {
  apiKey: options.api,
  id: options.id,
  title: options.title,
  format: options.short ? 'short' : 'long',
};

console.log(await getMovie(request));
