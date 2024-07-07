import { Control, UseFormHandleSubmit } from "react-hook-form";
import {
  DeckDetailType,
  Flashcard,
  Tag,
  flashcardData,
} from "../../../../utils/constants/DataTypes";
import { SetStateAction } from "react";
// import { SetStateAction } from "react";

export type StudentViewFlashcardProps = {
  bookmarkLoading?: boolean;
  loading: boolean;
  editLoading?: boolean;
  currentFlashcardIndex: number;

  setValue?: any;
  control: Control<any>;
  // tags?: { label?: string; title?: string }[];
  tags?: any;
  allTags: string[];
  allFlashcards: flashcardData[];
  handleNextFlashcard: () => void;
  handlePreviousFlashcard: () => void;
  handleDeleteOpen?: (data: any) => void;
  handleEditOpen?: (data: any) => void;
  handleEditClose?: () => void;
  enableEdit?: boolean;
  showHeader?: boolean;
  deckDetails?: DeckDetailType;
  key?: number;
  onSubmitEdit?: (data?: any) => Promise<void>;
  handleSubmit?: UseFormHandleSubmit<
    {
      question: string;
      answer: string;
      tags: string[];
    },
    undefined
  >;
  revealAnswer?: boolean;
  custom?: boolean;
  setRevealAnswer?: SetStateAction;
  mode?: "free" | "test" | "exam";
  handleRatingChange?: (data: number) => void;
  handleViewCardModalOpen?: () => void;
  toggleBookmark?: (data: any) => void;
};
