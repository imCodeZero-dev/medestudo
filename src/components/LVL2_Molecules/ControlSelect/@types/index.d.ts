import { RegisterOptions, FieldError, Control } from "react-hook-form";

export type selectProps = {
  name: string;
  control: Control<any>;
  options: any;

  hideLabel?: boolean;
  isClearable?: boolean;
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
  // labelKey: string;
  // valueKey: string;
};

export type StateSelectProps = {
  name: string;
  control: Control<any>;
  hideLabel?: boolean;
  label?: string;
  items: any;
  labelKey: string;
  valueKey: string;
};
export type NonSelectProps = {
  control: Control<any>;
  name: string;
  value: any;
  placeholder?: string;
  clearAll?: () => void;
};

// {
//   value: string;
//   label: string | undefined;
// }[]
