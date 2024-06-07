import { Control } from "react-hook-form";

export type MockResultModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit?: any;
  // loadMore: (data?: any) => void;
  // navigateToDashboard: () => void;
  control: Control<any>;
  timeSpent?: string | number;
  saveResult: () => void;
  showDetails: () => void;
};
export type AllSetModalProps = {
  open: boolean;
  handleClose: () => void;
};
