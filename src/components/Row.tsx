'use client';

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../api/axios";
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
    const response = await axios.get(fetchUrl);
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
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={handleScrollLeft}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name || movie.title}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={handleScrollRight}
          >
            {">"}
          </span>
        </div>
      </div>

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

const Container = styled.div`
  .slider {
    position: relative;
  }
  .slider__arrow-left {
    background-clip: content-box;
    padding: 20px 0;
    box-sizing: border-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center; 
    justify-content: center;
    visibility: hidden;
  }
  
  .slider__arrow-right {
    background-clip: content-box;
    padding: 20px 0;
    box-sizing: border-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 1000;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden; 
  }
  
  .arrow {
    transition: 400ms all ease-in-out;
  }
  .arrow:hover {
    transition: 400ms all ease-in-out;
    transform: scale(1.5);
  }
  
  .slider:hover .slider__arrow-left {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
  
  .slider:hover .slider__arrow-right {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
  
  .slider__arrow-left:hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
  .slider__arrow-right:hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
  
  .row__posters {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px 0 20px 20px;
    scroll-behavior: smooth;
  }
  
  .row__posters::-webkit-scrollbar {
    display: none;
  }
  .row__poster {
    object-fit: contain;
    width: 100%;
    max-height: 144px;
    margin-right: 10px;
    transform: transform 450ms;
    border-radius: 4px;
  }
  
  .row__poster:hover {
    transform: scale(1.08);
  }
  
  @media screen and (min-width: 1200px) {
    .row__poster {
      max-height: 160px;
    }
  }
  
  @media screen and (max-width: 768px) {
    .row__poster {
      max-height: 280px;
    }
  }
`;