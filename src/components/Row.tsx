import React, { useCallback,useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

interface Movie {
  id: number;
  backdrop_path: string;
  name?: string;
  title?: string;
  // 다른 필요한 속성들을 여기에 추가할 수 있습니다.
}

interface RowProps {
  title: string;
  id: string;
  fetchUrl: string;
}

const Row = ({ title, id, fetchUrl }: RowProps) => {
  //title,id,fetchUrl을 props로 가져온 것임(MainPage가 부모)
  const [movies, setMovies] = useState<Movie[]>([]);
  //전체 영화의 정보
  const [modalOpen, setModalOpen] = useState(false);
  //영화 상세 정보
  const [movieSelected, setMovieSelection] = useState<any>({});


  //컴포넌트가 렌더링 될 떄 마다 함수도 다시 새롭게 생성되는데 이것이 불필요함으로 콜백함수이용
  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    //console.log('response',response);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);
  //fetchUrl이 바뀌면 fetchMovieData도 변하기 때문에 다시 호출 해야됨
  //첫 번째 인자는 실행할 함수, 두 번째 인자는 의존성 배열입니다. 의존성 배열에 포함된 값이 변경될 때마다 함수가 호출됩니다.

  const handleClick = (movie: Movie) => {
    setModalOpen(true);
    setMovieSelection(movie);

    //나중에 추가할것 :  
// <SwiperSlide key ={movie.id}>
//<Wrap></Wrap>


// <content> 에서 주소애서 original다음에  / 빼주기
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


//나중에 추가할것 :  
// <SwiperSlide key ={movie.id}>
//<Wrap></Wrap>