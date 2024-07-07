import { Control, UseFormHandleSubmit } from "react-hook-form";
import {
  DeckDetailType,
  Flashcard,
  Tag,
} from "../../../../utils/constants/DataTypes";
import { SetStateAction } from "react";
// import { SetStateAction } from "react";

export type StudentReviewAllCardsProps = {
  bookmarkLoading?: boolean;
  loading: boolean;
  editLoading?: boolean;
  currentFlashcardIndex: number;

  setValue: any;
  control: Control<any>;
  tags?: string[];
  allTags: string[];
  allFlashcards: string[];
  handleNextFlashcard: () => void;
  handlePreviousFlashcard: () => void;
  handleDeleteOpen?: (data: any) => void;
  handleEditOpen?: (data: any) => void;
  handleEditClose?: () => void;
  enableEdit?: boolean;
  deckDetails?: DeckDetailType;
  key?: number;
  onSubmitEdit?: (data?: any) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<
    {
      question: string;
      answer: string;
      tags: string[];
    },
    undefined
  >;
  ratingLoading?: boolean;
  revealAnswer?: boolean;
  custom?: boolean;
  setRevealAnswer?: SetStateAction;
  mode?: "free" | "test" | "exam";
  handleRatingChange?: any;
  // handleRatingChange?: (data: number, id?: string) => Promise<void>;
  handleViewCardModalOpen: () => void;
  toggleBookmark?: (data: any) => void;
};
