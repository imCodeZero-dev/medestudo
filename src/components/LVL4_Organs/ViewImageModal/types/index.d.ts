import { Control } from "react-hook-form";

export type ViewImageModalProps = {
  open: boolean;
  loading?: boolean;
  image: string;
  handleClose: () => void;
};
