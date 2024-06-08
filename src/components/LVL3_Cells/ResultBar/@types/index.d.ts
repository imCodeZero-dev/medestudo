import { ReactNode } from "react";
import { ResultDataType } from "../../../../utils/constants/DataTypes";

export interface ResultBarProps {
  data: any;
  play?: boolean;
  getDetails?: (data: ResultDataType) => void;
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
