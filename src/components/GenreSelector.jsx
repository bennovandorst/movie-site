const GenreSelector = ({ genres, selectedGenre, setSelectedGenre }) => (
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
);

export default GenreSelector;