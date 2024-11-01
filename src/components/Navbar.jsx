const Navbar = () => {
    return (
        <nav className="bg-gray-700 shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="hidden md:flex space-x-6">
                    <a href="/movie-site" className="text-gray-300 hover:text-white">Home</a>
                    <a href="/movie-site/fuckyou" className="text-gray-300 hover:text-white">Designs sucks wtf</a>
                    {/* <a href={`watch/${randomMovieId}`} className="block text-gray-300 hover:text-white">Random Movie</a> wtf is this */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;