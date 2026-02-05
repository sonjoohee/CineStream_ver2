'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import api from '@/lib/api';
import { Movie } from '@/types/movie';
import { useDebounce } from '@/hooks/useDebounce';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm: string) => {
    try {
      const response = await api.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <SearchContainer>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl 
            = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return(
              <MovieCard key={movie.id} onClick={() => router.push(`/movie/${movie.id}`)}>
                <MoviePoster src={movieImageUrl} alt="movie" />
              </MovieCard>
            );
          }
          return null;
        })}
      </SearchContainer>
    );
  } else {
    return (
      <NoResultsSection>
        <NoResultsText>
          <p>
            찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </NoResultsText>
      </NoResultsSection>
    );
  }
};

export default SearchPage;

const SearchContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  background-color: black;
  width: 100%;
  text-align: center;
  padding: 5rem 0;
`;

const MovieCard = styled.div`
  width: 200px;
  cursor: pointer;
  flex: 1 1 auto;
  display: inline-block;
  padding-right: 0.5rem;
  padding-bottom: 7rem;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.25);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  width: 90%;
  border-radius: 5px;
`;

const NoResultsSection = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #c5c5c5;
  height: 100%;
  padding: 8rem;
  background-color: black;
`;

const NoResultsText = styled.div`
  .no-reulsts__text {
    // Maintaining the original class name for compatibility
  }
`;