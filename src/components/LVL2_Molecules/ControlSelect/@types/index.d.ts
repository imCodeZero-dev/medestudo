import { RegisterOptions, FieldError, Control } from "react-hook-form";

export type selectProps = {
  name: string;
  control: Control<any>;
  options: any;

  hideLabel?: boolean;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};
export type CountrySelectProps = {
  name: string;
  control: Control<any>;
  hideLabel?: boolean;
  label?: string;
  items: any;
  labelKey: string;
  valueKey: string;
};

// {
//   value: string;
//   label: string | undefined;
// }[]
