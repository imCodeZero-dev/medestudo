import { ReactNode } from "react";

export interface QuestionBarProps {
  data: examCardData;
  play?: boolean;
  index: number;
  getDetails?: (data: string) => void;
  openDeleteModal?: (data: string) => void;
  openEditModal?: (data: examCardData) => void;
}

interface examCardData {
  title: string;
  institute: string;
  time?: string;
  year: string;
  _id: string;
}
