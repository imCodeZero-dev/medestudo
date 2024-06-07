import { Control } from "react-hook-form";

export type CreateResultModalProps = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  control: Control<any>;
  filteredDecks?: { name: string; _id: string }[];
  errors: any;
  watch: any;
};

// export type EditExamModalProps = {
//   open: boolean;
//   loading: boolean;
//   handleClose: () => void;
//   handleSubmit: any;
//   onSubmit: (data: any) => void;
//   control: Control<any>;
//   filteredDecks?: { name: string; _id: string }[];
//   errors: any;
//   watch: any;
// };
