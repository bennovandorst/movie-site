import React from 'react';

const NoPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white">404</h1>
                <p className="text-2xl text-gray-400 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
                <a href="/movie-site" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default NoPage;