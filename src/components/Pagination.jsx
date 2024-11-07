import { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(() => {
        setInputPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        window.scrollTo({ top: 610 });
        onPageChange(newPage);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) > 0 && Number(value) <= totalPages)) {
            setInputPage(value);
        }
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        const pageNumber = Number(inputPage);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            handlePageChange(pageNumber);
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 mx-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹ Prev
            </button>
            <form onSubmit={handleInputSubmit} className="flex items-center">
                <input
                    type="number"
                    value={inputPage}
                    onChange={handleInputChange}
                    className="px-2 py-1 border border-gray-500 rounded-lg mx-2 bg-gray-800 text-white"
                    min="1"
                    max={totalPages}
                />
                <span className="px-4 py-2 text-white">/ {totalPages}</span>
            </form>
            <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 mx-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next ›
            </button>
        </div>
    );
};

export default Pagination;