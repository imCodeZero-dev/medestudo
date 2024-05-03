import { ReactNode } from "react";

export interface ExamDetailsHeadProps {
  examsDetails: any;
  openEditModal: (data: any) => void;
  openDeleteModal: (data: any) => void;
}
