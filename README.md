# deno-omdb

Access [OMDb's API](https://omdbapi.com/) for getting details about movies and
TV shows.

## Usage

```ts
// your_script.ts
import { getMovie } from "https://deno.land/x/omdb/mod.ts";

const request = { titleOrId: "Spider-Man", apiKey: "xxxx", verbose: 0 };
const result = await getMovie(request);
```

## CLI

### Installation

```sh
deno install --allow-net=www.omdbapi.com --allow-env=OMDB_API \
  -n omdb https://deno.land/x/omdb/src/cli.ts
```

### Usage

```bash
# Using name
omdb --api <api_key> 'Spider-Man Far from home'
# Using IMDb id
omdb --api <api_key> tt6320628
# Another way to specify the API key
OMDB_API=<api_key> omdb 'Spider-Man'
```

See `omdb -h` for all available flags and commands.
