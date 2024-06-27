import { Control } from "react-hook-form";
import { Class, DeckId, Tag } from "../../../../utils/constants/DataTypes";
import { SetStateAction } from "react";

export type HeaderProps = {
  showSkip?: boolean;
  setDrawerOpen?: SetStateAction;
};
