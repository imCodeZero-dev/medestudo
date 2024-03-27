import React, { HtmlHTMLAttributes } from "react";
import { UseFormRegisterReturn, RegisterOptions } from "react-hook-form";

export type SwitchControllerProps = {
  control: UseFormHandleSubmit<FieldValues>;
  name: string;
  text: string;
  label: string;
  ref?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;
