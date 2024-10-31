import { Link } from "react-router-dom";
import React, { useState } from 'react';

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            to={`/movie/${movie.id}`} 
            className="block"
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
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
                        <h3 className="text-lg font-bold">{movie.title}</h3>
                        <p className="text-sm">{new Date(movie.release_date).getFullYear()}</p>
                        <p className="text-sm">{movie.media_type}</p>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default MovieCard;