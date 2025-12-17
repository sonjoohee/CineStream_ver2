//index.js라고 하면 다른 파일에서 import하면 default 파일이기 때ans에 이름 안넣어줘도 됨.
//즉 다른 파일에서 import componentname from './Detailpage'이런식으로 폴더 이름만 써도 됨
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

interface Movie {
  backdrop_path: string;
}

const DetailPage = () => {
    let {movieId} = useParams<{movieId: string}>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `/movie/${movieId}`
            )
            setMovie(response.data);
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