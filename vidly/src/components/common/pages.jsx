import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; //underscore

const pages = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //What is itemscount and pagesize for?
  //Pagesize is how many items are displayed in the page and itemscount is total number of movie items EG 9

  console.log(currentPage);
  //pagecount will end up being 0.9 but Math.ceil takes the number to the nearest integer, which is 1, in that case we will not render the pages
  const pagesCount = Math.ceil(itemsCount / pageSize);
  //If there is only 1 page to display, do not render any pages
  if (pagesCount === 1) return null;
  //have to add 1 to pagesCount because it will only display 2 pages if we dont add it. (Probably cause of array starts at 0)
  const allPages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {allPages.map(page => (
          <li
            key={page}
            //if the page number is equal to the current page return page-item active otherwise return page-item
            //in other words the selected page will change to page-item active on click
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <p className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Basic custom ruleset
pages.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default pages;
