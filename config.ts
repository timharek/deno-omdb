import { Options, parse } from './deps.ts';

export const CONFIG: Options = {
  name: 'omdb',
  version: '1.0.2',
  description: 'CLI tool for querying data from OMDb API.',
  author: [{ name: 'Tim Hårek Andreassen', email: 'tim@harek.no' }],
  source: 'https://github.com/timharek/deno-omdb',
  flags: [
    {
      name: 'version',
      aliases: ['V'],
      description: 'Prints version.',
    },
    {
      name: 'help',
      aliases: ['h'],
      description: 'Prints this help message.',
    },
    {
      name: 'short',
      aliases: ['s'],
      description: 'Give the output in the short-format.',
    },
    {
      name: 'title',
      aliases: ['t'],
      description:
        'Takes title as string argument (Does not work with --id',
    },
    {
      name: 'id',
      aliases: ['i'],
      description:
        'Takes id as string argument (Does not work with --title',
    },
    {
      name: 'bytes',
      aliases: ['b'],
      description:
        'Calculate the emissions of a page by manually passing the bytes and whether or not it is powered by green hosting.',
    },
  ],
  examples: [
    'omdb --api <api_key> -t \'Spider-Man Far from home\'',
    'omdb --api <api_key> -i tt6320628'
  ]
};

export const FLAGS = parse(Deno.args, {
  boolean: ['help', 'short'],
  string: ['title', 'id', 'api'],
  alias: { title: ['t'], short: ['s'], id: ['i'], help: ['h'] },
});
