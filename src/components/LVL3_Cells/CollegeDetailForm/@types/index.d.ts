import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface CollegeDetailFormProps {
  control: Control<any>;
  handleSubmit: any;
  onSubmit: any;
  loading: boolean;
  allInstitutes: { name: string; title?: string }[];
  moveBack: () => void;
}
