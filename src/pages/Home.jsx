import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
            );
            const data = await response.json();
            if (data.results) setMovies(data.results);
        };
        fetchMovies();
    }, [searchTerm]);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">Movies</h1>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 w-full max-w-md border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <MovieList movies={movies} />
        </div>
    );
};

export default Home;