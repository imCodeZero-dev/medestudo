import { ReactNode } from "react";
import { Control } from "react-hook-form";
import { Tag } from "../../../../utils/constants/DataTypes";

export interface InterestedInFormProps {
  control: Control<any>;
  handleSubmit: any;
  onSubmit: any;
  loading: boolean;
  watch: any;
  allSubjects: any;
  arrayOfSubjects: string[];
  selectedCheckboxes: string[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
  moveBack: () => void;
}
