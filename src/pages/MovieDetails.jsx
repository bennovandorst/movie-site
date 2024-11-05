import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=c7cf1f564fa32aed665c2abb44d2ffb9&append_to_response=credits`
                );
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return <p>Loading movie details...</p>;
    if (!movie) return <p>Movie not found.</p>;

    return (
        <div className="container mx-auto p-6 text-white min-h-screen">
            <div className="flex flex-col md:flex-row items-start md:space-x-8 p-4 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500"}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0"
                />
                <div className="md:w-2/3">
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-lg mb-4">{movie.overview}</p>
                    <div className="text-gray-300 space-y-3 mb-6">
                        <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        <p><strong>Production Companies:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link to={`/movie-site/watch/${id}`}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
                                Watch
                            </button>
                        </Link>
                        <Link to="/movie-site">
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;