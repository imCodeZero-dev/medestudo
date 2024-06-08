import React from "react";
import {
  UseFormRegisterReturn,
  RegisterOptions,
  Control,
} from "react-hook-form";

export type InputProps = {
  validation?: RegisterOptions;
  placeholder?: string;
  register?: any;
  value?: string;
  label?: string;
  wrapClassName?: string;
  preDefinedWrapClassName?: string;
  preDefinedClassName?: string;
  fontFamily?: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "checkbox"
    | "radio"
    | "date";
  name: string;
  disabled?: boolean;
  control: Control<any>;
  prefix?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type CustomInputProps = {
  unit?: string;
  label?: string;
  name: string;
  control: Control;
  max?: number;
  min?: number;
  readOnly?: boolean;
};
