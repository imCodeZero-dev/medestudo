import { SetStateAction } from "react";
import { Control } from "react-hook-form";

export type HomeHeaderProps = {
  setDrawerOpen: SetStateAction;
  scrollToExploreFlashcards: (data: any) => void;
};
