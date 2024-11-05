import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import GenreSelector from "../components/GenreSelector";
import Pagination from "../components/Pagination";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async (page = 1) => {
            if (searchTerm) {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}&api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
                    );
                    setMovies(response.data.results || []);
                    setTotalPages(response.data.total_pages || 1);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            } else {
                setMovies(featuredMovies);
            }
        };
        fetchMovies(currentPage);
    }, [searchTerm, featuredMovies, currentPage]);

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

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const filteredMovies = selectedGenre
        ? movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
        : movies;

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-white">
            <MovieCarousel featuredMovies={featuredMovies} onSelectMovie={setSearchTerm} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <GenreSelector genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
            <h2 className="text-3xl font-semibold mb-4">Movies</h2>
            <MovieList movies={filteredMovies.length ? filteredMovies : featuredMovies} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;