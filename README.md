
# Deno OMDb

*A fast and easy to use CLI tool for* <br>
*querying data from the **[OMDb API]**.*

<br>

## Installation

1.  Install **[Deno]**.

2.  Install the command with:
    
    ```shell
    deno install    \
        --allow-net \
        --name omdb \
        https://raw.githubusercontent.com/timharek/deno-omdb/main/main.ts
    ```

<br>
<br>

## Usage

### Help

*See the help page for all available flags / commands.*

```shell
omdb -h
```

### ID

```shell
omdb                \
    --api <API Key> \
    -i tt6320628
```

### Title

```shell
omdb                \
    --api <API Key> \
    -t 'Spider-Man Far from home'
```

<br>


<!----------------------------------------------------------------------------->

[OMDb API]: https://omdbapi.com/
[Deno]: https://deno.land