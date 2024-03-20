import { Control } from "react-hook-form";

export type CreateProfessorModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
};
