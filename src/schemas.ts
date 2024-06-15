import { z } from '../deps.ts';

const Rating = z.object({
  Source: z.string(),
  Value: z.string(),
});

const stringWithArray = z.string(z.array(z.string())).transform((value) =>
  value.split(', ')
).or(z.array(z.string()));
const stringWithNumber = z.preprocess((v) => {
  if (typeof v === 'string') {
    if (v === 'N/A') return null;
    const castedValue = Number(v.replaceAll(',', ''));

    if (isNaN(castedValue)) return null;
    return castedValue;
  }
  if (typeof v === 'number') return v;
  return null;
}, z.number().nullable());
const stringNullable = z.preprocess((v) => {
  if (typeof v === 'string') {
    if (v === 'N/A') return null;
    return v;
  }
  return null;
}, z.string().nullable());
const TitleType = z.enum(['movie', 'series', 'episode']);

export const Title = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.coerce.date(),
  Runtime: stringNullable,
  Genre: stringWithArray,
  Director: stringWithArray,
  Writer: stringWithArray,
  Actors: stringWithArray,
  Plot: stringNullable,
  Language: stringWithArray,
  Country: stringNullable,
  Awards: stringNullable,
  Poster: stringNullable,
  Ratings: z.array(Rating),
  Metascore: stringNullable,
  imdbRating: stringWithNumber,
  imdbVotes: stringWithNumber,
  imdbID: stringNullable,
  Type: TitleType,
  DVD: stringNullable,
  totalSeasons: stringWithNumber.optional(),
  BoxOffice: stringNullable,
  Production: stringNullable,
  Website: stringNullable,
  Response: z.literal('True'),
});

export const BadResponse = z.object({
  Response: z.literal('False'),
  Error: z.string(),
});

export const TitleResponse = z.discriminatedUnion('Response', [
  Title,
  BadResponse,
]);

const Search = z.object({
  Title: z.string(),
  Year: stringWithNumber,
  imdbID: z.string(),
  Type: TitleType,
  Poster: z.string().url(),
});

export const SearchObject = z.object({
  Search: z.array(Search),
  totalResults: stringWithNumber,
  Response: z.literal('True'),
});

export const SearchResponse = z.discriminatedUnion('Response', [
  SearchObject,
  BadResponse,
]);

export type TitleResponse = z.infer<typeof TitleResponse>;
export type Title = z.infer<typeof Title>;
export type BadResponse = z.infer<typeof BadResponse>;
export type SearchResponse = z.infer<typeof SearchResponse>;
export type SearchObject = z.infer<typeof SearchObject>;

export const Error = z.object({ message: z.string(), error: z.unknown() });
export type Error = z.infer<typeof Error>;
