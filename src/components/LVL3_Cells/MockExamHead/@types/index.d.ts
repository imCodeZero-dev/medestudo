import { ReactNode } from "react";

export interface MockExamHeadProps {
  totalQuestions: number;
  questionTime: number;
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  getTotalTime: (time?: number | undefined) => void;
  stopTimer: boolean;
  practice?: boolean;
}
