import { ReactNode } from "react";

export interface OptionDropdownProps {
  options: Option[];
}

interface Option {
  label: string;
  onClick: () => void;
}
