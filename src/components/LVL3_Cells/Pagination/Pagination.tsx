import React, { useEffect, useRef, useState } from "react";
import { PaginationProps } from "./@types";
import styles from "./Pagination.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNext,
  handlePrevious,
}) => {
  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     onPageChange(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     onPageChange(currentPage + 1);
  //   }
  // };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        &lt;
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
