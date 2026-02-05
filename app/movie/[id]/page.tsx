import { Metadata } from 'next';
import MovieDetailClient from './MovieDetailClient';

interface Movie {
  backdrop_path: string;
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

interface DetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id: movieId } = params;
  return {
    title: `Movie Detail - ${movieId}`, 
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id: movieId } = params;
  
  let movie: Movie | null = null;
  
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY || '99e2b135ff4afc4350aa59165158ff64'}&language=ko-KR`);
    
    if (response.ok) {
      movie = (await response.json()) as Movie;
    } else if (response.status === 404) {
      console.error(`Movie with ID ${movieId} not found`);
    } else {
      console.error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to fetch movie:', error);
  }

  return <MovieDetailClient movie={movie} />;
}