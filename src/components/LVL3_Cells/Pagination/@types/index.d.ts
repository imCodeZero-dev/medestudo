import { ReactNode } from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNext: () => void;
  handlePrevious: () => void;
}
