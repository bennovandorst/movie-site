import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import axios from "axios";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
                    );
                    setMovies(response.data.results || []);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            } else {
                setMovies(featuredMovies);
            }
        };
        fetchMovies();
    }, [searchTerm, featuredMovies]);

    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                const trendingResponse = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/day?api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
                );
                setFeaturedMovies(trendingResponse.data.results || []);
            } catch (error) {
                console.error("Error fetching initial movies:", error);
            }
        };

        const fetchGenres = async () => {
            try {
                const genreResponse = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
                );
                setGenres(genreResponse.data.genres || []);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchInitialMovies();
        fetchGenres();
    }, []);

    const nextMovie = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentMovieIndex((prevIndex) => 
            (prevIndex + 1) % featuredMovies.length
        );
    };

    const prevMovie = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentMovieIndex((prevIndex) => 
            (prevIndex - 1 + featuredMovies.length) % featuredMovies.length
        );
    };

    const handleAnimationEnd = () => {
        setIsAnimating(false);
    };

    useEffect(() => {
        const interval = setInterval(nextMovie, 3000);
        return () => clearInterval(interval);
    }, [featuredMovies]);

    const filteredMovies = selectedGenre
        ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
        : movies;

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-white">
            <div className="relative overflow-hidden rounded-lg">
                <div 
                    className={`transition-transform duration-700 ease-in-out ${isAnimating ? 'animate' : ''}`}
                    style={{
                        transform: `translateX(-${currentMovieIndex * 100}%)`,
                        display: 'flex',
                    }}
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
                                    onClick={() => setSearchTerm(movie.original_title)}
                                >
                                    Watch Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8 mb-6">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 w-full max-w-md border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            <div className="flex justify-center mt-8 mb-6">
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="p-3 w-full max-w-md border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <h2 className="text-3xl font-semibold mb-4">Movies</h2>
            <MovieList movies={filteredMovies.length ? filteredMovies : featuredMovies} />
        </div>
    );
};

export default Home;
