import React from "react";

const Pagination = ({ pageCount = 0, currentPage = 1, setCurrentPage }) => {
  if (!pageCount || pageCount <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > pageCount) return;
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  const getPages = () => {
    const windowSize = 5;
    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let end = Math.min(pageCount, start + windowSize - 1);

    if (end - start + 1 < windowSize) {
      start = Math.max(1, end - windowSize + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();
  const firstVisible = pages[0];
  const lastVisible = pages[pages.length - 1];
  const showLeftDots = firstVisible > 2;
  const showRightDots = lastVisible < pageCount - 1;

  return (
    <nav className="mt-8 mb-4 space-y-3" aria-label="Pagination">
      <p className="text-center text-sm text-gray-600">
        Page {currentPage} of {pageCount}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="rounded-md border border-blue-500 px-3 py-2 text-sm font-medium disabled:opacity-40"
          aria-label="First page"
        >
          First
        </button>

        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-blue-500 px-3 py-2 text-sm font-medium disabled:opacity-40"
          aria-label="Previous page"
        >
          Prev
        </button>

        {firstVisible > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToPage(1)}
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
            {page}
          </button>
        ))}

        {lastVisible < pageCount && (
          <>
            {showRightDots && <span className="px-1">...</span>}
            <button
              type="button"
              onClick={() => goToPage(pageCount)}
              className="w-10 h-10 border border-blue-500 rounded-md"
            >
              {pageCount}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="rounded-md border border-blue-500 px-3 py-2 text-sm font-medium disabled:opacity-40"
          aria-label="Next page"
        >
          Next
        </button>

        <button
          type="button"
          onClick={() => goToPage(pageCount)}
          disabled={currentPage === pageCount}
          className="rounded-md border border-blue-500 px-3 py-2 text-sm font-medium disabled:opacity-40"
          aria-label="Last page"
        >
          Last
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
