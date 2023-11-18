import { z } from '../deps.ts';

const Rating = z.object({
  Source: z.string(),
  Value: z.string(),
});

export const OMDBResponse = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string(),
  Ratings: z.array(Rating),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  imdbID: z.string(),
  Type: z.enum(['movie', 'series']),
  DVD: z.string().optional(),
  TotalSeasons: z.string().optional(),
  BoxOffice: z.string(),
  Production: z.string(),
  Website: z.string(),
  Response: z.string(),
});

export type OMDBResponse = z.infer<typeof OMDBResponse>;
