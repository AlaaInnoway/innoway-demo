/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface PaginatorProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Paginator(props: PaginatorProps) {
  const { itemsPerPage, totalItems, currentPage, onPageChange } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = 1;
    // reset currentPage to 1 if totalPages is less than the currentPage
    if (currentPage > totalPages) onPageChange(1);

    // set up startPage and endPage
    if (currentPage === totalPages)
      startPage = Math.max(1, currentPage - halfPagesToShow * 2);
    else if (currentPage + halfPagesToShow <= totalPages)
      startPage = Math.max(1, currentPage - halfPagesToShow);
    else if (currentPage + halfPagesToShow > totalPages)
      startPage = Math.max(1, currentPage - halfPagesToShow * 2 + 1);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    // If there are fewer total pages than pages to show, display all pages
    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    // Defer the state update until after rendering
    requestAnimationFrame(() => {
      onPageChange(page); // This should update the state
    });
  };

  const pageNumbers = getPageNumbers();

  // Calculate the range of displayed items
  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    totalItems !== 0 && (
      <nav className="flex items-center justify-end space-x-4">
        {/* Display the range of displayed items */}
        <span className="text-gray-400 text-[11px]">
          Showing from {rangeStart} to {rangeEnd} of {totalItems} items
        </span>

        <div className="flex space-x-2">
          {/* Add button for moving to the first page */}
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-50'
            } text-gray-500 text-xs rounded-lg px-3 py-2.5`}
          >
            <ChevronDoubleLeftIcon width={12} height={12} />
          </button>

          {/* Add button for moving to the previous page */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? 'opacity-50' : 'hover:bg-gray-50'
            } text-gray-500 text-xs rounded-lg px-3 py-2.5`}
          >
            <ChevronLeftIcon width={12} height={12} />
          </button>

          {pageNumbers.map((page, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (typeof page === 'number') {
                  handlePageChange(page);
                }
              }}
              disabled={page === currentPage}
              className={`${
                page === currentPage
                  ? 'text-serene-600 bg-serene-50 font-medium'
                  : 'text-gray-500 hover:bg-gray-50'
              } text-xs rounded-lg px-3 py-2.5`}
            >
              {page}
            </button>
          ))}

          {/* Add button for moving to the next page */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-50'
            } text-gray-500 text-xs rounded-lg px-3 py-2.5`}
          >
            <ChevronRightIcon width={12} height={12} />
          </button>

          {/* Add button for moving to the last page */}
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? 'opacity-50' : 'hover:bg-gray-50'
            } text-gray-500 text-xs rounded-lg px-3 py-2.5`}
          >
            <ChevronDoubleRightIcon width={12} height={12} />
          </button>
        </div>
      </nav>
    )
  );
}
