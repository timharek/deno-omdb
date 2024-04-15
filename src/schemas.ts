import { z } from '../deps.ts';

const Rating = z.object({
  Source: z.string(),
  Value: z.string(),
});

const stringWithArray = z.string(z.array(z.string())).transform((value) =>
  value.split(', ')
).or(z.array(z.string()));
const stringWithNumber = z.string(z.number()).transform((value) =>
  Number(value.replaceAll(',', ''))
)
  .optional().or(z.number());
export const Title = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(z.date()).transform((value) => new Date(value)).or(
    z.date(),
  ),
  Runtime: z.string(),
  Genre: stringWithArray,
  Director: stringWithArray,
  Writer: stringWithArray,
  Actors: stringWithArray,
  Plot: z.string(),
  Language: stringWithArray,
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string(),
  Ratings: z.array(Rating),
  Metascore: z.string(),
  imdbRating: stringWithNumber,
  imdbVotes: stringWithNumber,
  imdbID: z.string(),
  Type: z.enum(['movie', 'series', 'episode']),
  DVD: z.string().optional(),
  totalSeasons: stringWithNumber,
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().optional(),
  Response: z.enum(['True']),
});

export const BadResponse = z.object({
  Response: z.enum(['False']),
  Error: z.string(),
});

export const OMDBResponse = z.discriminatedUnion('Response', [
  Title,
  BadResponse,
]);

export type OMDBResponse = z.infer<typeof OMDBResponse>;
export type Title = z.infer<typeof Title>;
export type BadResponse = z.infer<typeof BadResponse>;

export const Error = z.object({ message: z.string(), error: z.unknown() });
export type Error = z.infer<typeof Error>;
