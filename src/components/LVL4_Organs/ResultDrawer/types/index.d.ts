import { Control } from "react-hook-form";

export type ResultDrawerProps = {
  questions: any;
  isOpen: boolean;
  onClose: () => void;
  control: Control<any>;
};

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
  image?: string;
}
