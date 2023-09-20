import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    const formatDateString = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return (
        <>
            {
                isLoading
                    ?
                    <div className="cards">
                        <SkeletonTheme color="#202020" highlightColor="#444">
                            <Skeleton height={300} duration={2} />
                        </SkeletonTheme>
                    </div>
                    :
                    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
                        <div className="cards">
                            <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
                            <div className="cards__overlay">
                                <div className="card__title">{movie ? movie.original_title : ""}</div>
                                <div className="card__runtime">
                                    {movie ? formatDateString(movie.release_date) : ""}
                                    <span className="card__rating"><i className="fas fa-star" style={{ color: "#f59e0b" }} />{" "}{movie ? movie.vote_average : ""}</span>
                                </div>
                                <div className="card__description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
                            </div>
                        </div>
                    </Link>
            }
        </>
    )
}

export default Cards;
