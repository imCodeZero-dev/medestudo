import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface LoginFormProps {
  control: Control<any>;
  handleSubmit: any;
  onSubmit: any;
  loadingLogin: boolean;
  openForgotModal: () => void;
  switchToRegistration: () => void;
}
