import { useState, useEffect } from "react";

const MovieCarousel = ({ featuredMovies, onSelectMovie }) => {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextMovie = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    };

    const prevMovie = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentMovieIndex((prevIndex) => (prevIndex - 1 + featuredMovies.length) % featuredMovies.length);
    };

    useEffect(() => {
        const interval = setInterval(nextMovie, 7000);
        return () => clearInterval(interval);
    }, [featuredMovies]);

    const handleAnimationEnd = () => setIsAnimating(false);

    return (
        <div className="relative overflow-hidden rounded-lg group">
            <div 
                className={`transition-transform duration-700 ease-in-out ${isAnimating ? 'animate' : ''}`}
                style={{
                    transform: `translateX(-${currentMovieIndex * 100}%)`,
                    display: 'flex',
                }}
                onTransitionEnd={handleAnimationEnd}
            >
                {featuredMovies.map((movie, index) => (
                    <div 
                        key={index} 
                        className="w-full flex-shrink-0 bg-cover bg-center h-96"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        }}
                    >
                        <div className="p-6">
                            <h1 className="text-5xl font-bold mb-4">{movie.original_title}</h1>
                            <p className="mb-6">{movie.overview}</p>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
                                onClick={() => onSelectMovie(movie.original_title)}
                            >
                                Watch Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevMovie}
            >
                &#9664;
            </button>
            <button 
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextMovie}
            >
                &#9654;
            </button>
        </div>
    );
};

export default MovieCarousel;
