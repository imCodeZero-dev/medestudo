import { ReactNode } from "react";

export interface DashboardChartCardProps {
  text: string;
  title: string;
  icon: ReactNode;
  value: string | number;
}
