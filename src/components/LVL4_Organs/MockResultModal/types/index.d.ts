import { Control } from "react-hook-form";

export type MockResultModalProps = {
  open: boolean;
  loading: boolean;
  practice?: boolean;
  handleClose: () => void;
  handleSubmit?: any;
  // loadMore: (data?: any) => void;
  // navigateToDashboard: () => void;
  control?: Control<any>;
  timeSpent?: string | number;
  saveResult?: () => void;
  showDetails?: () => void;
  totalMarks: number;
  totalQuestion: number;
};
export type AllSetModalProps = {
  open: boolean;
  handleClose: () => void;
};
