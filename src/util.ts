// @deno-types="../mod.d.ts"

export async function _fetch(url: URL): Promise<OMDb.Response> {
  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

export function getVerbosifiedMessage(result: Result, verbose: number) {
  if (verbose > 1) {
    return result;
  } else if (verbose === 1) {
    return {
      title: result.title,
      year: result.year,
      genre: result.genre,
      director: result.director,
      imdbUrl: result.imdbUrl,
    };
  }

  return `${result.title} (${result.year}) has a ${result.imdbRating} rating on IMDb`;
}

export function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
