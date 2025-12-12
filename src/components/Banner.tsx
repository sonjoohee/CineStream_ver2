import React, { useEffect ,useState } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import styled from "styled-components";
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
  const [movie, setMovie] = useState<Movie>({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  //첫 번째 인자는 실행할 함수, 두 번째 인자는 의존성 배열입니다. 의존성 배열에 포함된 값이 변경될 때마다 함수가 호출됩니다.


  // Axios를 사용하여 현재 상영 중인 영화 정보를 가져오고, 그 중 무작위로 하나의 영화 ID를 선택하는 과정
  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기(여러영화)
    //요청을 보내는 곳에 await 사용
    const response= await axios.get(requests.fetchNowPLaying);
    //여러 영화 종 하나의 영화 id 가져오기
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    //특정 영화의 더 상세한 정보 가져오기 (비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str: string | undefined, n: number) => {
    return str?.length && str.length > n ? str.substring(0, n) + "..." : str || "";
    //str가 있어? 있으면 n보다 큰 글이 있어? 있으면 자르고 "..."
    //즉 ? 전이 참이면 다음 단계로 넘어가기 아니면 종료
  };

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1`}
            
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>X</button>
      </>
    );
  } 
    return (
      <header
        className="banner"
        style={{
          backgroundImage:
            `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          //위에 useState 부분에 설정함
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="bannner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className="banner__buttons">
            {movie.videos?.results[0]?.key && (
              //movie가 있어? 그러면 videos가 있어? 있으면 그 비디오 가져오고 play 버튼 생성
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
  }

export default Banner;



const Container = styled.div`
display:flex;
jusify-conent: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 100vh;
`;

const HomeContainer = styled.div`
width:100%;
height:100%;
`;

const Iframe = styled.iframe`
width:100%;
height: 100%;
z-index: -1;
opacity: 0.65;
border: none;

&::after {
  content: "",
  positino: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;

}`;