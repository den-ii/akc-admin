import React, { useEffect, useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsShown,
  data,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const startItem = (currentPage - 1) * itemsPerPage;
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [totalPaginate, setTotalPaginate] = useState(0);
  const [arr, setArr] = useState(new Array(totalPaginate).fill(1));
  useEffect(() => {
    setItemsShown(data.slice(startItem, startItem + itemsPerPage));
    setTotalPaginate(Math.ceil(data.length / itemsPerPage));
    setArr(new Array(totalPaginate).fill(1));
    setTotalPages(data.length / itemsPerPage);
  }, [startItem, data, totalPaginate]);

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const prev = currentPage > 1;
  const next = currentPage < totalPaginate;

  function handlePageChange(page) {
    setCurrentPage(page);
  }
  return (
    <div>
      <nav>
        <ul className="flex mt-5">
          {prev && (
            <li
              onClick={paginatePrev}
              className={`px-2 py-1 border border-blue-700 rounded hover:bg-orange-600 hover:text-white cursor-pointer`}
            >
              {"<"} Prev
            </li>
          )}
          {arr.map((x, index) => {
            if (
              index + 1 < maxPageNumberLimit + 1 &&
              index + 1 > minPageNumberLimit
            ) {
              return (
                <li
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`py-1 px-2 border border-blue-700 rounded hover:bg-orange-700 hover:text-white ${
                    currentPage === index + 1 ? "bg-blue-700 text-white" : null
                  }`}
                >
                  {index + 1}
                </li>
              );
            }
          })}
          {next && (
            <li
              onClick={paginateNext}
              className={`px-2 py-1 border border-blue-700 rounded hover:bg-orange-600 hover:text-white cursor-pointer`}
            >
              Next {">"}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
