import { Control } from "react-hook-form";

export type ViewQuestionModalProps = {
  open: boolean;
  loading?: boolean;
  handleClose: () => void;

  // control: Control<any>;

  errors?: any;
  watch?: any;
  questionDetails: any;
};
