import React from "react";
import { ErrorMessage } from "../ErrorMessage";
import { Control, Controller, FieldValues } from "react-hook-form";

import styles from "./InputDeck.module.css";
import Text from "../Text/Text";
import DeleteDeckIcon from "../../../assets/svgs/DeleteDeckIcon";
import AddDeckIcon from "../../../assets/svgs/AddDeckIcon";
// import { Text } from "../Text";

// Define a generic InputProps type that accepts the Control type and automatically extracts the name prop.
type InputProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "size" | "prefix" | "onChange"
> & {
  control: Control<any>;
  name: keyof TFieldValues;

  className?: string;
  label?: string;
  prefix?: React.ReactNode;
  onDelete?: () => void;
  onAdd?: () => void;
  suffix?: React.ReactNode;
  onClickSuffix?: () => void;
  color?: string;
  value?: string;
  showLabelOnFocus?: boolean;
  isFocused?: boolean;
  customError?: string;
};

const InputDeck = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      prefix,
      color = "",
      control,
      name = "",
      value,
      customError,
      onAdd,
      onDelete,
      ...restProps
    },
    ref
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="flex flex-col">
            <div className={` ${styles["inputField-wrap"]} `}>
              {!!prefix && prefix}
              <input
                value={value}
                ref={ref}
                className={`${className} bg-transparent border-0 ${styles["inputField"]}`}
                onChange={(e) => onChange(e.target.value)}
                {...restProps}
              />
              {!!onAdd && (
                <div role="button" className={`pr-2`} onClick={onAdd}>
                  {<AddDeckIcon />}
                </div>
              )}
              {!!onDelete && (
                <div role="button" className={`pr-2`} onClick={onDelete}>
                  {<DeleteDeckIcon />}
                </div>
              )}
            </div>
            {error && <ErrorMessage errors={error.message} />}
          </div>
        )}
      />
    );
  }
);

export default InputDeck;
