import { RegisterOptions, FieldError, Control } from "react-hook-form";

export type selectProps = {
  className?: string;
  selectTextClass?: string;
  placeholder?: string;
  list: { value: string | number; label: string | undefined }[];
  control: Control<any>;
  name: string;
  inputSubText?: string;
  labelColor?: string;
  Icon?: any;
  multiSelect?: boolean;
  defaultValue: { value: string | number; label: string | undefined }[];
  preDefinedClassName?: string;
};

// {
//   value: string;
//   label: string | undefined;
// }[]
