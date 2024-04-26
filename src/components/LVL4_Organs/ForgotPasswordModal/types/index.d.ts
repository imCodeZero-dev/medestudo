import { Control } from "react-hook-form";

export type ForgotPasswordModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
};

export type StepEmailProps = {
  loading: boolean;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
  handleClose: () => void;
};
export type SuccessProps = {
  handleClose: () => void;
};
