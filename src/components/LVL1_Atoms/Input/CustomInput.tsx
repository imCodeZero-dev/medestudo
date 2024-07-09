import React from "react";
import { ErrorMessage } from "../ErrorMessage";
import { Control, Controller, FieldValues } from "react-hook-form";

import styles from "./Input.module.css";
import Text from "../Text/Text";
import { CustomInputProps } from "./@types";

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  max = 2500,
  min = 1,
  label,
  unit,
  readOnly,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={min}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <>
          <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            {readOnly ? (
              <>
                {/* {unit && ( */}
                <Text className={styles.unitText}>
                  {value} {unit}
                </Text>
                {/* )} */}
              </>
            ) : (
              <div className={styles.inputMain}>
                <button
                  type="button"
                  disabled={value === 0}
                  className={styles.button}
                  onClick={() => onChange(Math.max(min, value - 1))}
                >
                  -
                </button>
                <div className={styles.inputDiv}>
                  <input
                    type="number"
                    className={styles.input}
                    value={value}
                    onChange={(e) =>
                      onChange(Math.max(min, Math.min(max, +e.target.value)))
                    }
                  />
                  {unit && <Text className={styles.unitText}>{unit}</Text>}
                </div>

                <button
                  disabled={value === max}
                  type="button"
                  className={styles.button}
                  onClick={() => onChange(Math.min(max, value + 1))}
                >
                  +
                </button>
              </div>
            )}

            {/* <span className={styles.maxValue}>{max}</span> */}
          </div>
          {errors && <ErrorMessage errors={`${errors?.[name]?.message}`} />}
        </>
      )}
    />
  );
};

export default CustomInput;
