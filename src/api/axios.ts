import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "99e2b135ff4afc4350aa59165158ff64",
    language: "ko-KR",
  },
});

export default instance;
// default를 사용해줬기 때문에 import axios from "../api/axios"; 여기서 import axiostnace 이런삭으로 이름 바꿔돋  된다