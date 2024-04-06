import { Control } from "react-hook-form";
import { Tag } from "../../../../utils/constants/DataTypes";

export type CreateQuestionsProps = {
  loading: boolean;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  setCreateFlashcard: (data: boolean) => void;
  control: Control<any>;
  allTags: Tag[];
};
