import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type SettingsSecurityProps = {
  control: Control<any>;
  handleSubmitPassword: any;
  onSubmitPassword: (data: any) => void;
  passwordLoading: boolean;
  watch?: any;
};
