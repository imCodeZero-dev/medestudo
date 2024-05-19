import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface ExpandableFlashcardProps {
  data: any;
  // data: cardData;
  play?: boolean;
  minView?: boolean;
  getDetails?: (data: string) => void;
  openDeleteModal?: (data: string) => void;
  control: Control<any>;
}

interface cardData {
  title: string;
  image: string;
  date: string;
}
