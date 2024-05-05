import { ReactNode } from "react";

export interface ExamDetailsHeadProps {
  totalQuestions: number;
  examsDetails: any;
  openEditModal: (data: any) => void;
  openDeleteModal: (data: any) => void;
}
