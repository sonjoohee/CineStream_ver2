export interface Movie {
  id: number;
  backdrop_path: string;
  name?: string;
  title?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  first_air_date?: string;
  poster_path?: string;
  media_type?: string;
}

export interface MovieResponse {
  results: Movie[];
}