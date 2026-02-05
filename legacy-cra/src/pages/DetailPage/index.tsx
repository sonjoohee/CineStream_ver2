import  { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

interface Movie {
  backdrop_path: string;
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

const DetailPage = () => {
    let {movieId} = useParams<{movieId: string}>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `/movie/${movieId}`
            )
            setMovie(response.data as Movie);
        }
        fetchData();

    }, [movieId])

    if(!movie) return null;
    
    return(
        <section>
            <img
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt='img'
            />
        </section>
    )
}

export default DetailPage