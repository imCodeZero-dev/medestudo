import { SetStateAction } from "react";
import { Control } from "react-hook-form";

export type ViewCardModalProps = {
  open: boolean;
  // loading: boolean;
  handleClose: () => void;
  // handleSubmit: any;
  // onSubmit: (data: any) => void;
  control: Control<any>;

  currentFlashcardIndex: number;
  handlePreviousFlashcard: () => void;
  revealAnswer: boolean;
  setRevealAnswer: SetStateAction;
  mode: "free" | "test" | "exam";
  handleRatingChange: (data: number) => void;
  tags: string[];
  allFlashcards: string[];
  handleNextFlashcard: () => void;
};
