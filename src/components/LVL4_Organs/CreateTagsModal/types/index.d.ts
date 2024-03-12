import { Control } from "react-hook-form";

export type CreateTagsModalProps = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmit: (data:any) => void;
  control: Control<any>;
};
