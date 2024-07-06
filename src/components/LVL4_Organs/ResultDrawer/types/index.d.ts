import { Control } from "react-hook-form";
import { SelectedAnswersType } from "../../../../utils/constants/DataTypes";

export type ResultDrawerProps = {
  questions: any;
  showReasoning?: boolean;
  isOpen: boolean;
  onClose: () => void;
  control: Control<any>;
  selectedAnswer: SelectedAnswersType | undefined;
};

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
  image?: string;
}
