import { ReactNode } from "react";
import { Control } from "react-hook-form";

export type ProfileInfoProps = {
  control: Control<any>;
  controlImage: Control<any>;
  handleSubmit: any;
  generalLoading: boolean;
  onSubmitGeneral: (data: any) => void;
  handleSubmitImage: any;
  onSubmitImage: (data: any) => void;
  imageLoading: boolean;
  watch: any;
};
