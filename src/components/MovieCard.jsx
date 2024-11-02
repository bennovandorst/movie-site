import { Link } from "react-router-dom";
import React, { useState } from "react";

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            to={`/movie-site/movie/${movie.id}`} 
            className="block transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden w-64 h-96 flex flex-col relative">
                <div className="flex-grow">
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                {isHovered && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 transition-opacity duration-300 ease-in-out">
                        <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
                        <p className="text-sm mb-1">
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
                        </p>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default MovieCard;