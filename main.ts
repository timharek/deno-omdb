import { parse } from 'https://deno.land/std@0.130.0/flags/mod.ts';

const options = {
  api: '',
  format: 'long',
};

const REQUEST_URL = 'https://www.omdbapi.com/';

interface Query {
  id?: string;
  title?: string;
}

const flags = parse(Deno.args, {
  boolean: ['help', 'short'],
  string: ['title', 'id', 'api'],
  alias: { 'title': ['t'], 'short': ['s'], 'id': ['i'], 'help': ['h'] },
});

function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

async function getMovie(query: Query, format: string) {
  let queryUrl = `${REQUEST_URL}?apikey=${options.api}&`;
  if (query.id) {
    queryUrl += `i=${query.id}`;
  } else if (query.title) {
    queryUrl += `t=${query.title}`;
  }

  const result = await fetch(queryUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  if (format == 'long') {
    return result;
  }

  return {
    title: result.Title,
    year: result.Year,
    genre: result.Genre,
    director: result.Director,
  };
}

if (flags.help) {
  console.log(`
deno-omdb 1.0.0 

Author: Tim Hårek Andreassen <tim@harek.no>
Source: https://github.com/timharek/deno-omdb

USAGE: 
  omdb [OPTIONS] [FLAGS]

OPTIONS:
  -h, --help  Prints this help message

FLAGS:
  --api       Takes API key as argument
  -s, --short Return shorter respons
  -t, --title Takes title as string argument (Doesn't work with -i)
  -i, --id    Takes (IMDb) ID as string argument (Doesn't work with -t)

              `);
  Deno.exit(1);
}

if (!flags.api) {
  console.error('No API key provided.');
  Deno.exit(1);
}

if (flags.title && flags.id || flags.id && flags.title) {
  console.error('Cannot use ID in conjuction with title');
  Deno.exit(1);
}

if (flags.api) {
  options.api = flags.api;
}

if (flags.short) {
  options.format = 'short';
}

if (flags.title) {
  console.log(await getMovie({ title: slugify(flags.title) }, options.format));
}

if (flags.id) {
  console.log(await getMovie({ id: flags.id }, options.format));
}
