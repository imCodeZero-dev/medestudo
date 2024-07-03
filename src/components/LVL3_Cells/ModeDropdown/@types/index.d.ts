import { SetStateAction } from "react";

export interface ModeDropdownProps {
  // handleOpenLogout: () => void;
  setMode: SetStateAction;
  mode: ModeType;
}

export type ModeType = "free" | "test" | "exam";
