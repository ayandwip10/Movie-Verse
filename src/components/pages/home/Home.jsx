import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import { getResponse } from "../../services/api";
import MovieList from "../../movieList/MovieList";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=e4bc5bda0328f92e8950dea555312c3e&language=en-US"
            const response = await getResponse(API_URL);
            setMovies(response.results);
        }
        getData();
    }, [])

    const handleCarouselChange = (selectedIndex) => {
        setCurrentSlideIndex(selectedIndex);
        console.log(currentSlideIndex);
    };

    const formatDateString = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const getUpNextMovies = () => {
        if (movies.length === 0) return [];

        const nextIndex1 = (currentSlideIndex + 1) % movies.length;
        const nextIndex2 = (currentSlideIndex + 2) % movies.length;
        const nextIndex3 = (currentSlideIndex + 3) % movies.length;

        return [movies[nextIndex1], movies[nextIndex2], movies[nextIndex3]];
    };

    const getUpNextMovies2 = () => {
        if (movies.length === 0) return [];

        const nextIndex1 = (currentSlideIndex + 1) % movies.length;
        const nextIndex2 = (currentSlideIndex + 2) % movies.length;

        return [movies[nextIndex1], movies[nextIndex2]];
    };

    return (
        <>
            <div className="poster">
                <div className="banner">
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={3}
                        infiniteLoop={true}
                        showStatus={false}
                        onChange={handleCarouselChange}
                        showIndicators={false}
                    >
                        {movies.map((movie, index) => (
                            <Link
                                key={index}
                                style={{ textDecoration: 'none', color: "white" }}
                                to={`/movie/${movie.id}`}
                            >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="banner" />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">
                                        {movie ? movie.original_title : ""}
                                    </div>
                                    <div className="posterImage__runtime">
                                        {movie ? formatDateString(movie.release_date) : ""}
                                        <span className="posterImage__rating">
                                            <i className="fas fa-star fa-sm" style={{ color: "#f59e0b", marginRight: "8px" }} />
                                            {movie ? movie.vote_average : ""}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview.slice(0, 100) + " ..." : ""}</div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
                <div className="upnextLargeScreen">
                    <h3>Up Next</h3>
                    {getUpNextMovies().map((movie, index) => (
                        <Link
                            key={index}
                            style={{ textDecoration: 'none', color: "white" }}
                            to={`/movie/${movie.id}`}
                        >
                            <div style={{ display: "flex" }}>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster" style={{ width: "30%" }} />
                                <div style={{ marginLeft: "8px" }}>
                                    <h4 style={{ marginBottom: "16px" }}>{movie.original_title}</h4>
                                    <span style={{ display: "flex" }}>
                                        <i className="fas fa-star fa-sm" style={{ color: "#f59e0b", marginRight: "10px" }} />
                                        {movie.vote_average}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="upnextSmallScreen">
                    <h3>Up Next</h3>
                    {getUpNextMovies2().map((movie, index) => (
                        <Link
                            key={index}
                            style={{ textDecoration: 'none', color: "white" }}
                            to={`/movie/${movie.id}`}
                        >
                            <div style={{ display: "flex" }}>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster" style={{ width: "40%" }} />
                                <div style={{ marginLeft: "8px" }}>
                                    <h4 style={{ marginBottom: "16px" }}>{movie.original_title}</h4>
                                    <span style={{ display: "flex" }}>
                                        <i className="fas fa-star fa-sm" style={{ color: "#f59e0b", marginRight: "8px" }} />
                                        {movie.vote_average}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <MovieList />
        </>
    )
}

export default Home;
