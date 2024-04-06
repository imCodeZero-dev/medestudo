import { ReactNode } from "react";

export interface DashboardFlashcardProps {
  data: any;
  // data: cardData;
  play?: boolean;
  minView?: boolean;
  getDetails?: (data: string) => void;
  handleClickOptions?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCloseOptions?: () => void;
  openDeleteModal?: (data: string) => void;
  anchorEl?: any;
}

interface cardData {
  title: string;
  image: string;
  date: string;
}
