const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center mt-8">
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 mx-2"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 mx-2"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
);

export default Pagination;