import { ReactNode, SetStateAction } from "react";

export interface CustomTabsProps {
  tabs: string[];
  selectedTab: number;
  setSelectedTab: SetStateAction;
}
