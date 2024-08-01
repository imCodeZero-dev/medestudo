import { Control } from "react-hook-form";

export type CheckpointModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit?: any;
  loadMore: (data?: any) => void;
  navigateToDashboard: () => void;
  control: Control<any>;
  timeSpent?: string | number;
  masteryLevel?: string | number;
};
export type AllSetModalProps = {
  open: boolean;
  handleClose: () => void;
};
