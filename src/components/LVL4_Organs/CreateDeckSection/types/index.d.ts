import { Control } from "react-hook-form";

export type CreateDeckSectionProps = {
  open?: boolean;
  handleClose?: () => void;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
  setValue: any;
  watch: any;
  getValues: any;
};
