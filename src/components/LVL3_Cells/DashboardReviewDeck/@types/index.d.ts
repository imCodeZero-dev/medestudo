import { ReactNode } from "react";

export interface DashboardReviewDeckProps {
  // data: any;
  // data: cardData;
  play?: boolean;
  minView?: boolean;
  getDetails?: (data: string) => void;
  openDeleteModal?: (data: string) => void;
}

interface cardData {
  title: string;
  image: string;
  date: string;
}
