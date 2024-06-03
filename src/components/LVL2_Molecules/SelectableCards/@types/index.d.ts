import { ReactNode } from "react";

export interface SelectableCardsProps {
  name: string;
  label: string;
  control: any;
  selectedCheckboxes: string[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
}
