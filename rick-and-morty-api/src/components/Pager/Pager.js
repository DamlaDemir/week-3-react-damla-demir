import { useEffect, useState } from "react";
import "./style.css";

let PAGE_DEVIDER = 5;

const Pager = ({ totalPageCount, goToPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    calculatePageCount(
      1,
      totalPageCount < PAGE_DEVIDER ? totalPageCount : PAGE_DEVIDER
    );
  }, []);

  const showFirstButton = () => {
    return currentPage > PAGE_DEVIDER && totalPageCount > PAGE_DEVIDER;
  };

  const showPreviousButton = () => {
    return currentPage > PAGE_DEVIDER;
  };

  const showNextButton = () => {
    return totalPageCount > PAGE_DEVIDER && currentPage != totalPageCount;
  };

  const showLastButton = () => {
    return totalPageCount > PAGE_DEVIDER && currentPage != totalPageCount;
  };

  const calculatePageCount = (begin, end) => {
    let newPageList = [];

    for (let index = begin; index <= end; index++) {
      newPageList.push(index);
    }

    setPages(newPageList);
  };

  const getNextPages = () => {
    calculatePageCount(
      pages[pages.length - 1] + 1,
      pages[pages.length - 1] + PAGE_DEVIDER
    );

    goto(pages[pages.length - 1] + 1);
  };

  const getPreviousPages = () => {
    calculatePageCount(pages[0] - PAGE_DEVIDER, pages[0] - 1);

    goto(pages[0] - 1);
  };

  const getFirstPage = () => {
    calculatePageCount(1, PAGE_DEVIDER);
    goto(1);
  };

  const getLastPage = () => {
    calculatePageCount(totalPageCount - PAGE_DEVIDER + 1, totalPageCount);
    goto(totalPageCount);
  };

  const goto = (page) => {
    setCurrentPage(page);
    goToPage(page);
  };

  return (
    <ul className="paging-wrapper">
      {showFirstButton() ? (
        <li>
          <a
            onClick={(e) => {
              e.stopPropagation();
              getFirstPage();
            }}
          >
            First
          </a>
        </li>
      ) : null}
      {showPreviousButton() ? (
        <li>
          <a
            onClick={(e) => {
              e.stopPropagation();
              getPreviousPages();
            }}
          >
            <i className="fas fa-chevron-left" />
          </a>
        </li>
      ) : null}

      {pages.map((page) => (
        <li key={page}>
          <a
            onClick={(e) => {
              e.stopPropagation();
              goto(page);
            }}
            className={currentPage === page ? "selected" : ""}
          >
            {page}
          </a>
        </li>
      ))}

      {showNextButton() ? (
        <li>
          <a
            onClick={(e) => {
              e.stopPropagation();
              getNextPages();
            }}
          >
            <i className="fas fa-chevron-right" />
          </a>
        </li>
      ) : null}

      {showLastButton() ? (
        <li>
          <a
            onClick={(e) => {
              e.stopPropagation();
              getLastPage();
            }}
          >
            Last
          </a>
        </li>
      ) : null}
    </ul>
  );
};

export default Pager;
