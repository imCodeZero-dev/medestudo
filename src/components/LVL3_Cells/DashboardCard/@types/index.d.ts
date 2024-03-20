import { ReactNode } from "react";

export interface DashboardCardProps {
  title: string;
  value: string;
  img: string;
  text: string;
  outOf?: string;
}
