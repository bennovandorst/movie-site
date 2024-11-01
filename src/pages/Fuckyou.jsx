const Fuckyou = () => {
    return (
        <>
            <div className="container mx-auto p-4 min-h-screen flex items-center justify-center bg-gradient-to-r">
                <div className="bg-grey-200 p-8 rounded-lg shadow-2xl text-center transform transition duration-500 hover:scale-105">
                    <h1 className="text-4xl font-extrabold text-white mb-4">Design Feedback</h1>
                    <p className="text-white mb-6">
                        If you think the design could be improved, feel free to create a pull request to fix it yourself.
                    </p>
                    <a href="https://github.com/bennovandorst/movie-site" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-semibold transition duration-300">
                         Github Repo
                    </a>
                </div>
            </div>
        </>
    );
}

export default Fuckyou;