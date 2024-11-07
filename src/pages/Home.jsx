import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const API_KEY = "c7cf1f564fa32aed665c2abb44d2ffb9";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async (page = 1) => {
        try {
            const url = searchTerm
                ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=${API_KEY}`
                : `https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=${API_KEY}`;
            const response = await axios.get(url);
            setMovies(response.data.results || []);
            setTotalPages(response.data.total_pages || 1);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const fetchGenres = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
            );
            setGenres(response.data.genres || []);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const fetchFeaturedMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            );
            setFeaturedMovies(response.data.results || []);
        } catch (error) {
            console.error("Error fetching featured movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [searchTerm, currentPage]);

    useEffect(() => {
        fetchMovies(currentPage);
        fetchGenres();
        fetchFeaturedMovies();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedGenre]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const filteredMovies = selectedGenre
        ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
        : movies;

    return (
        <div className="container mx-auto p-4 min-h-screen text-white">
            <MovieCarousel featuredMovies={featuredMovies} onSelectMovie={setSearchTerm} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
            <h2 className="text-3xl font-semibold mb-4">Movies</h2>
            {filteredMovies.length ? (
                <MovieList movies={filteredMovies} />
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    <span role="img" aria-label="Popcorn" className="text-6xl mb-4">🍿</span>
                    <p className="text-center text-2xl font-semibold mb-2">
                        Uh-oh! It's like a movie without a plot...
                    </p>
                    <p className="text-center text-lg text-gray-500 mb-4">
                        We couldn’t find any results for your search.
                    </p>
                    <p className="text-center text-sm italic text-gray-400">
                        (Try another search, or just grab some popcorn and browse instead!)
                    </p>
                </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;