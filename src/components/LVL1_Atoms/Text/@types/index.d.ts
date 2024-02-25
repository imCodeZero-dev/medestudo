import { ReactNode } from "react";

export type TextProps = {
  children: string | number | ReactNode;
  preDefinedClass?: string;
  text?: string;
  size?: xxl | xl | l | m | s | xs | xxs;
  color?: string;
  weight?: string;
  justifyContent?: string;
  cursor?: "pointer" | "default" | "progress";
  style?: React.CSSProperties;
  width?: string | number;
  fontFamily?: string;
  textStyle?: React.CSSProperties | any;
} & React.HTMLAttributes<HTMLParagraphElement>;
