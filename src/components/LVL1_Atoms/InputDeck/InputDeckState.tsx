import React, { useState, ChangeEvent } from "react";
import { ErrorMessage } from "../ErrorMessage";

import styles from "./InputDeck.module.css";
import DeleteDeckIcon from "../../../assets/svgs/DeleteDeckIcon";
import AddDeckIcon from "../../../assets/svgs/AddDeckIcon";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  className?: string;
  label?: string;
  prefix?: React.ReactNode;
  onDelete?: () => void;
  onAdd?: () => void;
  suffix?: React.ReactNode;
  onClickSuffix?: () => void;
  color?: string;
  initialValue?: string;
  showLabelOnFocus?: boolean;
  isFocused?: boolean;
  customError?: string;
  onChange?: (value: string) => void;
};

const InputDeckState = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      prefix,
      color = "",
      initialValue = "",
      customError,
      onAdd,
      onDelete,
      onChange,
      ...restProps
    },
    ref
  ) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="flex flex-col">
        <div className={`${styles["inputField-wrap"]}`}>
          {!!prefix && prefix}
          <input
            value={value}
            ref={ref}
            className={`${className} bg-transparent border-0 ${styles["inputField"]}`}
            onChange={handleChange}
            {...restProps}
          />
          {!!onAdd && (
            <div role="button" className="pr-2" onClick={onAdd}>
              <AddDeckIcon />
            </div>
          )}
          {!!onDelete && (
            <div role="button" className="pr-2" onClick={onDelete}>
              <DeleteDeckIcon />
            </div>
          )}
        </div>
        {customError && <ErrorMessage errors={customError} />}
      </div>
    );
  }
);

export default InputDeckState;
