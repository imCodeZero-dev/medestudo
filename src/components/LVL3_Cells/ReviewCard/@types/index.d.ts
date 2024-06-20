import { ReactNode } from "react";
import { ResultDataType } from "../../../../utils/constants/DataTypes";

export interface ReviewCardProps {
  rating: number;
  review: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}
