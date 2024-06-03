import { SetStateAction } from "react";

export type TimerComponentProps = {
  getTotaltime: (data: any) => void;
  stopTimer: boolean;
};
