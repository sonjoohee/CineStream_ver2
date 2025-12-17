import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../api/axios";
import requests from "../api/request";
import "./Banner.css";

interface Movie {
  backdrop_path?: string;
  title?: string;
  name?: string;
  original_name?: string;
  overview?: string;
  videos?: {
    results: Array<{
      key: string;
    }>;
  };
}

const Banner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 현재 상영 중인 영화 목록 가져오기
      const request = await axios.get(requests.fetchNowPLaying);
      
      // 목록 중 랜덤으로 영화 ID 하나 선택
      const movieId =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ].id;

      // 선택된 영화의 상세 정보(비디오 포함) 가져오기
      const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
        params: { append_to_response: "videos" },
      });
      
      setMovie(movieDetail);
    } catch (error) {
      console.error("영화 정보를 가져오는데 실패했습니다:", error);
    }
  };

  const truncate = (str?: string, n: number = 100) => {
    return str && str.length > n ? str.substring(0, n) + "..." : str;
  };

  if (isClicked && movie?.videos?.results[0]?.key) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1`}
              title="YouTube video player"
              allow="autoplay; fullscreen"
            />
          </HomeContainer>
        </Container>
        <CloseButton onClick={() => setIsClicked(false)}>X</CloseButton>
      </>
    );
  }

  // 데이터가 로딩되지 않았을 때의 처리가 필요하다면 여기에 추가
  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className="banner__buttons">
          {movie.videos?.results[0]?.key && (
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
          )}
        </div>
        <p className="banner__description">{truncate(movie.overview, 100)}</p>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;


const Container = styled.div`
  display: flex;
  justify-content: center; /* 오타 수정: jusify-conent */
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: ""; 
    position: absolute; /* 오타 수정: positino */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  padding: 5px 10px;
  cursor: pointer;
`;