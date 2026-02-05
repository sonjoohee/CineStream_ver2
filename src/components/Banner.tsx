'use client';

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../lib/api";
import requests from "../lib/requests";

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
  
  if (!movie) return null;

  return (
    <Header
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <BannerContents>
        <BannerTitle>
          {movie.title || movie.name || movie.original_name}
        </BannerTitle>

        <BannerButtons>
          {movie.videos?.results[0]?.key && (
            <PlayButton
              onClick={() => setIsClicked(true)}
            >
              Play
            </PlayButton>
          )}
        </BannerButtons>
        <BannerDescription>{truncate(movie.overview, 100)}</BannerDescription>
      </BannerContents>
      <FadeBottom />
    </Header>
  );
};

export default Banner;

const Header = styled.header`
  position: relative;
  height: 448px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  padding-left: 30px;
  padding-top: 140px;
  margin-bottom: 20px;
  background-size: cover;
  background-position: top center;
  overflow: hidden;
`;

const BannerContents = styled.div`
  max-width: 100%;
  padding-bottom: 100px;
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
  margin-bottom: 25px;
`;

const BannerDescription = styled.p`
  width: 45rem;
  line-height: 1.3;
  padding-right: 3rem;
  font-size: 0.9rem;
  max-width: 360px;
  height: 80px;
`;

const BannerButtons = styled.div`
  margin: 20px -2px 0 0;
`;

const PlayButton = styled.button`
  cursor: pointer;
  color: #000;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 5px 24px;
  margin-right: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 250ms;
  
  &:hover {
    background-color: #e6e6e6;
  }
`;

const FadeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

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