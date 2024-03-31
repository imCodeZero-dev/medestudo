import { Control } from "react-hook-form";

export type CreateClassModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
  filteredDecks: { name: string; _id: string }[];
};
