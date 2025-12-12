import React, {useState, useEffect} from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useDebounce } from '../../components/hooks/useDebounce';
import './SearchPage.css';

interface Movie {
  id: number;
  backdrop_path: string | null;
  media_type: string;
  // 다른 필요한 속성들을 여기에 추가할 수 있습니다.
}

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search); //현재 경로의 쿼리 문자열 
      } //url ?뒤의 파라미터들을 가져옴 
    
      let query = useQuery();
      const searchTerm = query.get("q") 
      const debouncedSearchTerm = useDebounce(searchTerm || '', 500);
    


    useEffect(() => {
        if(debouncedSearchTerm){  //만약 searchTerm이 존재한다면 
            fetchSearchMovie(debouncedSearchTerm)
        }
    
    }, [debouncedSearchTerm])

    const fetchSearchMovie = async (searchTerm: string) => {
        try{
            const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.log(error);

        }

    }

    if(searchResults.length > 0) {
        return (
            <section className= 'search-container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl 
                        = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return(
                            <div className= 'movie' key={movie.id}>
                                <div className= 'movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                                    <img src={movieImageUrl} alt="movie" className='movie__poster'/>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </section>
             
        )
    } else {
        return (
            <section className= 'no-results'>
                <div className = 'no-reulsts__text'>
                    <p>
                        찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
          
        )

    }

    
}

export default SearchPage