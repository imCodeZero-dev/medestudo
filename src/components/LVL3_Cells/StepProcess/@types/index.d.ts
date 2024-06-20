import { ReactNode } from "react";
import { ResultDataType } from "../../../../utils/constants/DataTypes";

export interface StepProcessProps {
  steps: Steps[];
}

interface Steps {
  title: string;
  description: string;
}
