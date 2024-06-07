import { ReactNode } from "react";

export interface MockExamHeadProps {
  totalQuestions: number;
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  getTotalTime: (time?: number | undefined) => void;
  stopTimer: boolean;
}
