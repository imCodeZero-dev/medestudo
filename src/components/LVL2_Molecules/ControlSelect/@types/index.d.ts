import { RegisterOptions, FieldError, Control } from "react-hook-form";

export type selectProps = {
  name: string;
  control: Control<any>;
  items: any;
  labelKey: string;
  valueKey: string;
  hideLabel?: boolean;
  label?: string;
};

// {
//   value: string;
//   label: string | undefined;
// }[]
