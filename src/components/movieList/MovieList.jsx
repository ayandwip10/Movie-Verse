import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Card";
import { getResponse } from "../services/api";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        const getData = async (API_URL) => {
            const response = await getResponse(API_URL);
            setMovieList(response.results);
        }
        const API_URL = `https://api.themoviedb.org/3/movie/${type ? type : "now_playing"}?api_key=e4bc5bda0328f92e8950dea555312c3e&language=en-US`;
        getData(API_URL);
    }, [type])

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "Now Playing").replace(/_/, ' ').toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map((movie, index) => (
                        <Cards key={index} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList;