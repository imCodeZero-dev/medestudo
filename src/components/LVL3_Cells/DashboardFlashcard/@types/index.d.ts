import { ReactNode } from "react";

export interface DashboardFlashcardProps {
  data: cardData;
  play?: boolean;
  minView?: boolean;
}

interface cardData {
  title: string;
  image: string;
  date: string;
}
