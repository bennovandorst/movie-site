import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=c7cf1f564fa32aed665c2abb44d2ffb9`
            );
            const data = await response.json();
            setMovie(data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500"}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
                />
                <div className="md:w-2/3">
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-lg mb-4">{movie.overview}</p>
                    <div className="text-gray-400 space-y-2">
                        <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                    </div>
                    <Link to={`/movie-site/watch/${id}`} className="block mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Watch
                        </button>
                    </Link>
                    <Link to="/movie-site" className="block mt-4">
                        <button className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;