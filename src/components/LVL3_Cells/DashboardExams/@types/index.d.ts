import { ReactNode } from "react";

export interface DashboardExamsProps {
  data: any;
  play?: boolean;
  getDetails?: (data: string) => void;
  getDetailsExam?: (data: any) => void;
  openDeleteModal?: (data: string) => void;
  openEditModal?: (data: examCardData) => void;
}

interface examCardData {
  title: string;
  institute: string;
  time?: string;
  year: string;
  month?: string;
  createdAt?: string;
  _id: string;
}
[];
