import { Control } from "react-hook-form";

export type CreateDeckModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
  filteredDecks: any;
  setValue: any;
  watch: any;
  custom: boolean;
  // filteredDecks: { name: string; _id: string }[];
};
