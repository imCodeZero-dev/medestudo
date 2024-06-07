import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface CircularProgressChartProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  outOf?: number;
  totalMarks?: number;
}
