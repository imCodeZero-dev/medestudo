import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Flashcard, Tag } from "../../../../utils/constants/DataTypes";

export type ViewFlashcardsProps = {
  loading: boolean;
  editLoading: boolean;
  currentFlashcardIndex: number;
  // handleSubmit: any;
  // onSubmit: (data: any) => void;
  // setCreateFlashcard: (data: boolean) => void;
  control: Control<any>;
  tags: string[];
  allTags: string[];
  allFlashcards: string[];
  handleNextFlashcard: () => void;
  handlePreviousFlashcard: () => void;
  handleDeleteOpen: (data: any) => void;
  handleEditOpen: (data: any) => void;
  handleEditClose: () => void;
  enableEdit: boolean;

  onSubmitEdit: (data: any) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<
    {
      question: string;
      answer: string;
      tags: string[];
    },
    undefined
  >;
};
