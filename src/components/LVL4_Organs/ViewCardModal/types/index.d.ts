import { SetStateAction } from "react";
import { Control } from "react-hook-form";

export type ViewCardModalProps = {
  open: boolean;
  handleClose: () => void;
  control: Control<any>;

  currentFlashcardIndex: number;
  handlePreviousFlashcard: () => void;
  revealAnswer?: boolean;
  setRevealAnswer?: SetStateAction;
  mode?: "free" | "test" | "exam";
  handleRatingChange?: (data: number) => void;
  tags: string[];
  allFlashcards?: string[];
  handleNextFlashcard: () => void;
};
