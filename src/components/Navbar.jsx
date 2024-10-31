import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [randomMovieId, setRandomMovieId] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                setRandomMovieId(movies[randomIndex].id);
            } catch (error) {
                console.error('Error fetching random movie:', error);
            }
        };

        fetchRandomMovie();
    }, []);

    return (
        <nav className="bg-gray-700 shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="hidden md:flex space-x-6">
                    <a href="/movie-site" className="text-gray-300 hover:text-white">Home</a>
                    <a href={`watch/${randomMovieId}`} className="block text-gray-300 hover:text-white">Random Movie</a> {/* wtf is this */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;