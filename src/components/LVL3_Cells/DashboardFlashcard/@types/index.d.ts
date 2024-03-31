import { ReactNode } from "react";

export interface DashboardFlashcardProps {
  data: any;
  // data: cardData;
  play?: boolean;
  minView?: boolean;
  getDetails?: (data: string) => void;
}

interface cardData {
  title: string;
  image: string;
  date: string;
}
