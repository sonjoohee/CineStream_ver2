import  { useCallback,useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

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
    <div>
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
    </div>
  )
}

export default Row;