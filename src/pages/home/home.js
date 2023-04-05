import React, { useEffect, useState } from "react";
import './home.css';
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

function Home() {

    const [ popularMovies, setPopularMovies] = useState([])

    useEffect(() =>{
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
        .then(function (response) {
            // xử trí khi thành công
            return setPopularMovies(response.data.results)
          })
        .catch(function (error) {
        // xử trí khi bị lỗi
        console.log(error);
        })
    }, [])
    return ( 
        <>
            <div className="poster">
                <Carousel 
                    // Bật ngón tay cái, mặc định là đúng
                    showThumbs={false}
                    // Thay đổi slide tự động dựa trên interval(khoảng thời gian) prop.
                    autoPlay={true}
                    // Thời lượng hoạt ảnh của các slide thay đổi 
                    transitionTime={3}
                    // Đi sau mục cuối cùng sẽ quay lại trang trình bày đầu tiên.
                    infiniteLoop= {true}
                    // Kích hoạt trạng thái của mục hiện tại thành tổng số, mặc định là true.
                    showStatus={false}
                >
                    {
                        popularMovies.map((movie) => (
                            <Link style={{textDecoration:'none' , color:'white'}} to={`/movies/${movie.id}`}>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div> 
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average : ""}
                                            <i className="fas fa-star" />{""}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>    
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
     );
}

export default Home;
