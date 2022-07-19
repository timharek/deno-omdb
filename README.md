# deno-omdb

CLI tool for querying data from [OMDb API](https://omdbapi.com/).

It's fast and simple to use.

## Installation

1. Install [Deno](https://deno.land)
1. Run `deno install --allow-net -n omdb https://raw.githubusercontent.com/timharek/deno-omdb/HEAD/mod.ts`
1. Done, you can now simply run `omdb` on your machine!

## Usage

```bash
omdb --api <api_key> -t 'Spider-Man Far from home'
omdb --api <api_key> -i tt6320628
```

See `omdb -h` for all available flags and commands.
