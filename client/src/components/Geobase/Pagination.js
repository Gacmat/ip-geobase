import React from 'react';
import PropTypes from 'prop-types';
import Button from "../Button";

const styles = {
    wrapper: 'px-5 mt-2 border-t flex flex-col xs:flex-row items-center xs:justify-between',
    paginationInfo: 'text-xs xs:text-sm text-gray-900',
    buttonSection: 'inline-flex mt-2 xs:mt-0 space-x-4'
}

const Pagination = ({page, allPages, visibleElements, elements, filteredElements, handleNextPage, handlePrevPage}) => (
    <div className={styles.wrapper}>
            <span className={styles.paginationInfo}>
                {`Showing ${page} of ${allPages} page. Visible ${visibleElements > filteredElements ? filteredElements : visibleElements} of ${elements > filteredElements ? filteredElements : elements}`}
            </span>
        <div className={styles.buttonSection}>
            <Button styleMode="cancel" disabled={page === 1} onClick={handlePrevPage}>Prev</Button>
            <Button styleMode="cancel" disabled={page === allPages} onClick={handleNextPage}>Next</Button>
        </div>
    </div>
)

export default Pagination;