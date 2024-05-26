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
  onCheckboxChange?: (check: boolean, data: any) => void;
  handleCheckboxDecks?: (check: boolean, data: any) => void;
  selectedDecks?: any;
  custom?: boolean;
}

interface cardData {
  title: string;
  image: string;
  date: string;
}
