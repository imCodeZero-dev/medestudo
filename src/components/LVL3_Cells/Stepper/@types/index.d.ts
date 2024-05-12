import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface StepperProps {
  steps: { label: string }[];
  activeSection: number;
  label?: string;
}
