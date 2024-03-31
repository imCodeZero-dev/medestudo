import { RegisterOptions, FieldError, Control } from "react-hook-form";

export type selectProps = {
  name: string;
  control: Control<any>;
  options: any;

  hideLabel?: boolean;
  label?: string;
};

// {
//   value: string;
//   label: string | undefined;
// }[]
