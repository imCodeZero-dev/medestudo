import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type HomeLayoutProps = {
  children: ReactNode;
  createButton?: ReactNode;
  control?: any;
};
