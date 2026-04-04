import React from "react";

const Pagination = ({ pageCount = 0, currentPage = 0, setCurrentPage }) => {
  if (!pageCount || pageCount <= 1) return null;

  const goToPage = (page) => {
    if (page < 0 || page >= pageCount) return;
    setCurrentPage(page);
  };

  const getPages = () => {
    const windowSize = 5;
    let start = Math.max(0, currentPage - Math.floor(windowSize / 2));
    let end = Math.min(pageCount - 1, start + windowSize - 1);

    if (end - start + 1 < windowSize) {
      start = Math.max(0, end - windowSize + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();
  const showLeftDots = pages[0] > 1;
  const showRightDots = pages[pages.length - 1] < pageCount - 2;

  return (
    <nav
      className="flex items-center justify-center mt-8 mb-4 gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className="w-10 h-10 border border-blue-500 rounded-md disabled:opacity-40"
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages[0] > 0 && (
        <>
          <button
            type="button"
            onClick={() => goToPage(0)}
            className="w-10 h-10 border border-blue-500 rounded-md"
          >
            1
          </button>
          {showLeftDots && <span className="px-1">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          className={`w-10 h-10 border border-blue-500 rounded-md ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-500 hover:text-white"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page + 1}
        </button>
      ))}

      {pages[pages.length - 1] < pageCount - 1 && (
        <>
          {showRightDots && <span className="px-1">...</span>}
          <button
            type="button"
            onClick={() => goToPage(pageCount - 1)}
            className="w-10 h-10 border border-blue-500 rounded-md"
          >
            {pageCount}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === pageCount - 1}
        className="w-10 h-10 border border-blue-500 rounded-md disabled:opacity-40"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
