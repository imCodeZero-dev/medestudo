import { ReactNode } from "react";

export interface CustomTableProps {
  headers: string[];
  data: (string | number)[][];
  pagination?: boolean;
  rowsPerPage?: number;
}
