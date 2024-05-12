import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface RegistrationFormProps {
  control: Control<any>;
  handleSubmit: any;
  onSubmit: any;
  loadingRegister: boolean;
  switchToLogin: () => void;
}
