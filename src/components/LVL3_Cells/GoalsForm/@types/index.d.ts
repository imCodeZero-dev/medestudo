import { ReactNode } from "react";
import { Control } from "react-hook-form";
import { Tag } from "../../../../utils/constants/DataTypes";

export interface GoalsFormProps {
  control: Control<any>;
  handleSubmit: any;
  onSubmit: any;
  loading: boolean;
  watch: any;
  whyChooseArray: { label: string; active: boolean }[];
  toggleButtonWhyChoose: (i: number) => void;
  mainInteresetArray: { label: string; active: boolean }[];
  toggleButtonInterest: (i: number) => void;
  moveBack: () => void;
}
