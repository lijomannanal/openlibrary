import React, { useState } from 'react';
import './style.scss';

type Props = {
  totalCount: number,
  currentPage: number,
  itemsPerPage: number,
  onPagevisit: (pageNumber: number)=> void
};

const Pagination = ({
  totalCount, currentPage, itemsPerPage, onPagevisit,
}: Props) => {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalCount / itemsPerPage); i += 1) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          role="tab"
          key={number}
          onKeyDown={() => onPagevisit(number)}
          onClick={() => onPagevisit(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </li>
      );
    }
    return null;
  });

  const handleNextbtn = () => {
    onPagevisit(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    onPagevisit(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li role="tab" onKeyDown={handleNextbtn} onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li role="tab" onKeyDown={handlePrevbtn} onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    totalCount ? (
      <ul className="pageNumbers">
        <li
          role="tab"
          className={currentPage === pages[0] ? 'disabled' : ''}
          onKeyDown={handlePrevbtn}
          onClick={handlePrevbtn}
        >
          Prev
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li
          role="tab"
          className={currentPage === pages[pages.length - 1] ? 'disabled' : ''}
          onKeyDown={handleNextbtn}
          onClick={handleNextbtn}
        >
          Next
        </li>
      </ul>
    ) : null
  );
};

export default Pagination;
