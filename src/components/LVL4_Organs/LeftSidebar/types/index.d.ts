import { ReactNode } from "react";

export type LeftSidebarProps = {
  options: SidebarOption[];
};

export interface SidebarOption {
  title: string;
  url: string;
  image: ReactNode
  submenu?: SidebarOption[];
}

e;
