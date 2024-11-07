import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, genres, selectedGenre, setSelectedGenre }) => (
    <div className="flex justify-center mt-8 mb-6">
        <div className="relative w-full max-w-lg flex items-center border border-gray-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white">
            <FaSearch className="absolute left-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-3 pl-12 w-full rounded-l-full focus:outline-none text-black bg-white"
                aria-label="Search for a movie"
            />
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-40 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Clear search"
                >
                    <FaTimes />
                </button>
            )}
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="p-3 w-40 bg-white text-black border-l border-gray-300 rounded-r-full focus:outline-none"
                aria-label="Select genre"
            >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export default SearchBar;