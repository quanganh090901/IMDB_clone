import React, { useEffect, useState } from 'react';
import Skeleton , { SkeletonTheme} from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({movie}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },1500)
    }, [])
    return ( 
        <>
            {
            isLoading 
            ? 
            <div className='cards'>
                <SkeletonTheme 
                // Màu nền của bộ xương.
                baseColor='#202020' 
                // Màu nổi bật trong hoạt hình bộ xương
                highlightColor='#444' >
                    <Skeleton 
                    // Chiều cao của mỗi dòng xương
                    height={300} 
                    // Độ dài của hoạt ảnh tính bằng giây.
                    duration={2} />
                </SkeletonTheme>
            </div>
            : <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
                    <div className="cards">
                        <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                        <div className="cards__overlay">
                            <div className="card__title">{movie?movie.original_title:""}</div>
                            <div className="card__runtime">
                                {movie?movie.release_date:""}
                                <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                            </div>
                            <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                        </div>
                    </div>
                </Link>
        }
        </>
     );
}

export default Cards;