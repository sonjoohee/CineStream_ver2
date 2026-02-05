'use client';

import { useState } from 'react';
import styled from 'styled-components';

interface Movie {
  backdrop_path: string;
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

interface MovieDetailClientProps {
  movie: Movie | null;
}

const MovieDetailClient = ({ movie }: MovieDetailClientProps) => {
    if(!movie) return null;
    
    return(
        <Container>
            <PosterImg
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title || movie.name || 'Movie Image'}
            />
            <MovieInfo>
                <Title>{movie.title || movie.name}</Title>
                <Rating>평점: {movie.vote_average?.toFixed(1) || 'N/A'}</Rating>
                <ReleaseDate>개봉일: {movie.release_date || 'N/A'}</ReleaseDate>
                <Overview>{movie.overview || '줄거리 정보가 없습니다.'}</Overview>
            </MovieInfo>
        </Container>
    )
};

export default MovieDetailClient;

// --- Styled Components ---
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #000;
  color: white;
  min-height: 100vh;
`;

const PosterImg = styled.img`
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin-bottom: 30px;
`;

const MovieInfo = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
`;

const Rating = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #f9f9f9;
`;

const ReleaseDate = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #f9f9f9;
`;

const Overview = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ddd;
  white-space: pre-wrap;
`;