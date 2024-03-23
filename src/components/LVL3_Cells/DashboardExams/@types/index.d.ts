import { ReactNode } from "react";

export interface DashboardExamsProps {
  data: cardData;
  play?: boolean;
}

interface cardData {
  title: string;
  institute: string;
  time: string;
  year: string;
}
