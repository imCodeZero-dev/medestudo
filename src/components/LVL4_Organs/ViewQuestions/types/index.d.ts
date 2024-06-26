import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Flashcard, Tag } from "../../../../utils/constants/DataTypes";

export type ViewQuestionsProps = {
  loading: boolean;
  editLoading: boolean;
  currentIndex: number;
  // handleSubmit: any;
  // onSubmit: (data: any) => void;
  // setCreateFlashcard: (data: boolean) => void;
  control: Control<any>;
  getValues: any;
  watch: any;
  allQuestion: any;
  handleNext: () => void;
  handlePrevious: () => void;
  handleDeleteOpen: (data: any) => void;
  handleEditOpen: (data: any) => void;
  handleEditClose: () => void;
  enableEdit: boolean;

  onSubmitEdit: (data: any) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<any>;
};
