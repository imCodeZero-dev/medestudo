import { Control } from "react-hook-form";

export type CreateQuestionsProps = {
  loading: boolean;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  setCreateFlashcard: (data:boolean) => void;
  control: Control<any>;
};
