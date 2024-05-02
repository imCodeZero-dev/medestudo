import { Control } from "react-hook-form";

export type ForgotPasswordModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmitEmail: (data: string) => void;
  onSubmitOTP: (data: string) => void;
  onSubmitPassword: (data: any) => void;
  control: Control<any>;
  forgotSteps: forgotSteps;
  resendOtp: () => void;
  validOtp: boolean;
};

export type forgotSteps = {
  email: boolean;
  otp: boolean;
  password: boolean;
  success: boolean;
};

export type StepEmailProps = {
  loading: boolean;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
  handleClose: () => void;
  resendOtp?: () => void;
  validOtp?: boolean;
};
export type SuccessProps = {
  handleClose: () => void;
};
