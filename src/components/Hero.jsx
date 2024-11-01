import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Hero = ({ setSearchValue }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };
        
        fetchPopularMovies();
    }, []);

    const handleMovieClick = (title) => {
        setSearchValue(title);
    };

    return (
        <div className="hero text-white py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-6">Popular Movies</h1>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id} onClick={() => handleMovieClick(movie.title)}>
                            <div className="movie-card bg-gray-800 p-4 rounded-lg cursor-pointer">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-auto rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold">{movie.title}</h2>
                                <p className="text-gray-400">{movie.release_date}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Hero;