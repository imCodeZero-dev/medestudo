import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type SettingsPrivacyProps = {
  control: Control<any>;
  handleSubmit: any;
  loading: boolean;
  onSubmit: (data: any) => void;
  watch?: any;
};
