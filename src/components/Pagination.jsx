import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ pageCount, currentPage, setCurrentPage }) => {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showNextButton = currentPage !== pageCount - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-blue-500 ml-4">
              <FaAngleRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-blue-500 mr-4">
              <FaAngleLeft />
            </span>
          ) : null
        }
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border border-solid border-blue-500 hover:bg-blue-500 w-10 h-10 flex items-center justify-center rounded-md mr-2"
        activeClassName="bg-blue-500 text-white"
      />
    </div>
  );
};

export default Pagination;
