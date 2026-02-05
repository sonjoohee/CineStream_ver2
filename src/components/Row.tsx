'use client';

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import api from "../lib/api";
import MovieModal from "./movie-modal";

interface Movie {
  id: number;
  backdrop_path: string;
  name?: string;
  title?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  first_air_date?: string;
}

interface RowProps {
  title: string;
  id: string;
  fetchUrl: string;
}

const Row = ({ title, id, fetchUrl }: RowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelection] = useState<Movie>({} as Movie);

  const fetchMovieData = useCallback(async () => {
    const response = await api.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);
 
  const handleClick = (movie: Movie) => {
    setModalOpen(true);
    setMovieSelection(movie);
  }

  const handleScrollLeft = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollLeft -= window.innerWidth - 80;
    }
  };

  const handleScrollRight = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollLeft += window.innerWidth - 80;
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <SliderWrapper className="slider">
        <ArrowButton className="slider__arrow-left" onClick={handleScrollLeft}>
          <Arrow>{"<"}</Arrow>
        </ArrowButton>
        <PosterContainer id={id} className="row__posters">
          {movies.map((movie) => (
            <PosterImage
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name || movie.title}
              onClick={() => handleClick(movie)}
            />
          ))}
        </PosterContainer>
        <ArrowButton className="slider__arrow-right" onClick={handleScrollRight}>
          <Arrow>{">"}</Arrow>
        </ArrowButton>
      </SliderWrapper>

      {modalOpen &&  
      <MovieModal
      {...movieSelected}
      setModalOpen = {setModalOpen}
      />
      }
    </Container>
  )
}

export default Row;

const Container = styled.section`
  margin: 0 0 2.5rem;
  padding: 0 1.25rem;
`;

const Title = styled.h2`
  margin-bottom: 0.625rem;
`;

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;
  
  &.slider__arrow-left {
    left: 10px;
  }
  
  &.slider__arrow-right {
    right: 10px;
  }
`;

const Arrow = styled.span`
  font-size: 24px;
  color: white;
  user-select: none;
`;

const PosterContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  padding: 20px;
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const PosterImage = styled.img`
  object-fit: contain;
  width: 100%;
  max-width: 200px;
  transition: transform 450ms;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover {
    transform: scale(1.08);
    opacity: 1;
  }
`;