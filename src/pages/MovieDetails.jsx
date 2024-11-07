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

    if (loading) return <div className="text-center text-white">Loading movie details...</div>;
    if (!movie) return <div className="text-center text-white">Movie not found.</div>;

    const totalRevenue = movie.revenue ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(movie.revenue) : "No Data";

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
                        <p><strong>Release Date:</strong> {movie.release_date || "TBA"}</p>
                        <p><strong>Rating:</strong> {movie.vote_average ? `⭐ ${Math.round(movie.vote_average * 10) / 10}` : "No Ratings"}</p>
                        <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} minutes` : "No Data"}</p>
                        <p><strong>Box Office:</strong> {totalRevenue}</p>
                        <p><strong>Production Companies:</strong> {movie.production_companies.map(company => company.name).join(', ') || "No Data"}</p>
                        <p><strong>Director:</strong> {movie.credits.crew.find(crew => crew.job === 'Director').name}</p>
                        <p><strong>Cast:</strong> {movie.credits.cast.slice(0, 5).map(cast => cast.name).join(', ')}</p>
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