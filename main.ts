import { parse } from "https://deno.land/std@0.145.0/flags/mod.ts";

const options = {
  api: "",
  format: "long",
};

const REQUEST_URL = new URL("https://www.omdbapi.com/");

interface Query {
  id?: string;
  title?: string;
}

const flags = parse(Deno.args, {
  boolean: ["help", "short"],
  string: ["title", "id", "api"],
  alias: { title: ["t"], short: ["s"], id: ["i"], help: ["h"] },
});

function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

async function _fetch(url: URL) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

async function getMovie(query: Query, format: string) {
  const requestUrl = REQUEST_URL;
  requestUrl.searchParams.set('apikey', options.api);

  if (query.id) {
    requestUrl.searchParams.set('i', query.id);
  } else if (query.title) {
    requestUrl.searchParams.set('t', query.title);
  }

  const result = await _fetch(requestUrl);
  if (format == "long") {
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
  console.log('deno-omdb 1.0.1');
  console.log('CLI tool for querying data from OMDb API.');
  console.log();
  console.log('%cAUTHOR', 'font-weight: bold', 'Tim Hårek Andreassen <tim@harek.no>');
  console.log('%cSOURCE', 'font-weight: bold', 'https://github.com/timharek/deno-omdb');
  console.log();
  console.log('%cUSAGE', 'font-weight: bold', '\n\tomdb [OPTIONS]');
  console.log();
  console.log('%cOPTIONS', 'font-weight: bold');
  console.log('\t-h, --help     Prints this help message');
  console.log('\t-s, --short    Give the output in the short-format.');
  console.log('\t-t, --title    Takes title as string argument (Does not work with --id)');
  console.log('\t-i, --id       Takes id as string argument (Does not work with --title)');
  console.log();
  console.log('%cEXAMPLES', 'font-weight: bold');
  console.log("\t$ omdb --api <api_key> -t 'Spider-Man Far from home'");
  console.log("\t$ omdb --api <api_key> -i tt6320628");

  Deno.exit(1);
}

if (!flags.api) {
  console.error("No API key provided.");
  Deno.exit(1);
}

if ((flags.title && flags.id) || (flags.id && flags.title)) {
  console.error("Cannot use ID in conjuction with title");
  Deno.exit(1);
}

if (flags.api) {
  options.api = flags.api;
}

if (flags.short) {
  options.format = "short";
}

if (flags.title) {
  console.log(await getMovie({ title: slugify(flags.title) }, options.format));
}

if (flags.id) {
  console.log(await getMovie({ id: flags.id }, options.format));
}
