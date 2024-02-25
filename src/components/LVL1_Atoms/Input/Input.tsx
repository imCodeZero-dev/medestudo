import React from "react";
import { ErrorMessage } from "../ErrorMessage";
import { Control, Controller, FieldValues } from "react-hook-form";

import styles from "./Input.module.css";
import Text from "../Text/Text";
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
  preDefinedWrapClassName?:
    | "inputField-wrap-password"
    | "inputField-wrap"
    | "inputField-account-wrap";
  preDefinedClassName?: "inputField" | "inputField-date" | "inputField-account";
  wrapClassName?: string;
  className?: string;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClickSuffix?: () => void;
  handleChangeCustomly?: (value: string) => void;
  color?: string;
  value?: string;
  showLabelOnFocus?: boolean;
  isFocused?: boolean;
  customError?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      showLabelOnFocus = false,
      isFocused = false,
      wrapClassName = "",
      preDefinedWrapClassName = "",
      preDefinedClassName = "",
      className = "",
      label = "",
      prefix,
      suffix,
      onClickSuffix,
      color = "",
      control,
      name = "",
      value,
      customError,
      ...restProps
    },
    ref
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          return (
            <div className="flex flex-col">
              {!!label && <Text className={styles["labelText"]}>{label}</Text>}
              <div
                className={`${wrapClassName} ${styles[preDefinedWrapClassName]} `}
              >
                {/* {!!label && !showLabelOnFocus && label} */}
                {!!prefix && prefix}
                <input
                  // {...field}

                  value={value}
                  ref={ref}
                  className={`${className} bg-transparent border-0 ${styles[preDefinedClassName]}`}
                  onChange={(e) => {
                    if (restProps.handleChangeCustomly) {
                      restProps.handleChangeCustomly(e.target.value);
                    } else {
                      onChange(e.target.value);
                    }
                  }}
                  {...restProps}
                />
                {!!suffix && (
                  <div role="button" className={`pr-2`} onClick={onClickSuffix}>
                    {suffix}
                  </div>
                )}
              </div>
              {(errors?.[name]?.message + "" !== "undefined" || customError) &&
                (
                  (errors?.[name]?.message != "undefined" &&
                    errors?.[name]?.message + "") ||
                  customError ||
                  ""
                )?.length > 0 && (
                  <ErrorMessage
                    errors={
                      customError ? customError : `${errors?.[name]?.message}`
                    }
                  />
                )}
            </div>
          );
        }}
      />
    );
  }
);

export default Input;
