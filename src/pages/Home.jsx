import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import axios from 'axios';
import Hero from "../components/Hero";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [randomMovieId, setRandomMovieId] = useState(null);
    
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

    useEffect(() => {
        const fetchRandomMovie = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: 'c7cf1f564fa32aed665c2abb44d2ffb9',
                        language: 'en-US',
                        page: 1
                    }
                });
                const movies = response.data.results;
                const randomIndex = Math.floor(Math.random() * movies.length);
                setRandomMovieId(movies[randomIndex].original_title);
            } catch (error) {
                console.error('Error fetching random movie:', error);
            }
        };

        fetchRandomMovie();
    }, []);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">Movies</h1>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder={randomMovieId}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 w-full max-w-md border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <MovieList movies={movies} />
            <Hero setSearchValue={setSearchTerm} />
        </div>
    );
};

export default Home;