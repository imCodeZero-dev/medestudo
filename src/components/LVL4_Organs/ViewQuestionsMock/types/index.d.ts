import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Flashcard, Tag } from "../../../../utils/constants/DataTypes";

export type ViewQuestionsMockProps = {
  loading: boolean;
  editLoading?: boolean;
  currentIndex: number;
  control: Control<any>;
  getValues?: any;
  watch?: any;
  allQuestion: any;
  handleNext: () => void;
  handlePrevious: () => void;
  handleDeleteOpen?: (data: any) => void;
  handleEditOpen?: (data: any) => void;
  handleEditClose?: () => void;
  enableEdit?: boolean;
  revealedAnswer: boolean;
  selectAnswer: (data: any) => void;
  selectedAnswer: any;
  respondToNext: () => void;
  finishExam: () => void;
  onSubmitEdit?: (data: any) => Promise<void>;
  handleSubmit?: UseFormHandleSubmit<any>;
};
