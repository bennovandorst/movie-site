const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div className="flex justify-center mt-8 mb-6">
        <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-full max-w-md border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
    </div>
);

export default SearchBar;