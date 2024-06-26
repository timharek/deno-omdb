[![JSR](https://jsr.io/badges/@timharek/omdb)](https://jsr.io/@timharek/omdb)
[![sourcehut](https://img.shields.io/badge/repository-sourcehut-lightgrey.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSINCiAgICB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+DQogIDxkZWZzPg0KICAgIDxmaWx0ZXIgaWQ9InNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEyNSUiIGhlaWdodD0iMTI1JSI+DQogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIwIiBkeT0iMCIgc3RkRGV2aWF0aW9uPSIxLjUiDQogICAgICAgIGZsb29kLWNvbG9yPSJibGFjayIgLz4NCiAgICA8L2ZpbHRlcj4NCiAgICA8ZmlsdGVyIGlkPSJ0ZXh0LXNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEyNSUiIGhlaWdodD0iMTI1JSI+DQogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIwIiBkeT0iMCIgc3RkRGV2aWF0aW9uPSIxLjUiDQogICAgICAgIGZsb29kLWNvbG9yPSIjQUFBIiAvPg0KICAgIDwvZmlsdGVyPg0KICA8L2RlZnM+DQogIDxjaXJjbGUgY3g9IjUwJSIgY3k9IjUwJSIgcj0iMzglIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQlIg0KICAgIGZpbGw9Im5vbmUiIGZpbHRlcj0idXJsKCNzaGFkb3cpIiAvPg0KICA8Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjM4JSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0JSINCiAgICBmaWxsPSJub25lIiBmaWx0ZXI9InVybCgjc2hhZG93KSIgLz4NCjwvc3ZnPg0KCg==)](https://sr.ht/~timharek/deno-omdb)
[![GitHub mirror](https://img.shields.io/badge/mirror-GitHub-black.svg?logo=github)](https://github.com/timharek/deno-omdb)

# deno-omdb

Access [OMDb's API](https://omdbapi.com/) for getting details about movies and
TV shows.

## Usage

Remember to set `OMDB_API` enviroment variable.

```ts
// your_script.ts
import { getTitle } from "jsr:@timharek/omdb";

const result = await getTitle({ titleOrId: "Spider-Man" });
```

## CLI

### Installation

```sh
deno install --allow-net=www.omdbapi.com --allow-env=OMDB_API \
  -n omdb jsr:@timharek/omdb/cli
```

### Usage

```bash
# Using name
omdb --api <api_key> 'Spider-Man Far from home'
# Using IMDb id
omdb --api <api_key> tt6320628
# Another way to specify the API key
OMDB_API=<api_key> omdb 'Spider-Man'
# Using name and getting JSON output
omdb --api <api_key> --json 'Spider-Man Far from home'
```

See `omdb -h` for all available flags and commands.
