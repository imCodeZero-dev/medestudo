import { Control } from "react-hook-form";
import { Class, DeckId, Tag } from "../../../../utils/constants/DataTypes";

export type CreateQuestionsProps = {
  loading: boolean;
  deckData?: DeckId;
  handleSubmit: any;
  onSubmit: (data: any) => void;
  setCreateFlashcard: (data: boolean) => void;
  control: Control<any>;
  allTags: Tag[];
  setValue:any
};
