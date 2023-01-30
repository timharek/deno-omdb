declare interface Query {
  api: string;
  titleOrId: string;
  verbose: number;
}

declare interface Result {
  title: string;
  year: number;
  released: string;
  runtime: string | null;
  genre: string[];
  director: string[] | null;
  writer: string[];
  actors: string[];
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: Rating[];
  metascore: string;
  imdbRating: string | null;
  imdbVotes: string | null;
  imdbID: string;
  imdbUrl: string;
  type: 'movie' | 'series';
  dvd: string;
  boxOffice: string | null;
  totalSeasons: number | null;
  production: string;
  website: string;
  response: string;
}

declare interface Rating {
  source: string;
  value: string;
}

declare namespace OMDb {
  interface Response {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: 'movie' | 'series';
    DVD?: string;
    TotalSeasons?: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }

  interface Rating {
    Source: string;
    Value: string;
  }
}
