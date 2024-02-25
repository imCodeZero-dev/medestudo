import React, { useState } from "react";
import type { selectProps } from "./@types";
import styles from "./Select.module.css";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "../../LVL1_Atoms/ErrorMessage";

const ControlSelect = ({
  list,
  control,
  name,
  Icon,
  className,
  selectTextClass,
  multiSelect,
  defaultValue,
  
}: selectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <>
          <div
            className={`${styles["select-container"]} ${className} ${
              (errors?.[name]?.message as string)?.length > 0 &&
              styles["error-input"]
            }`}
          >
            <div className={styles["icon-container"]}>
              {Icon && Icon}
              {/* <Img src={icon} alt="Icon" className={styles["icon"]} /> */}
            </div>
            <select
              onChange={(v) => {
                if (multiSelect) {
                  if (value?.length < 3) {
                    if (value.includes(v.target.value)) {
                      onChange(value);
                    } else {
                      onChange([...value, v.target.value]);
                    }
                  }
                } else {
                  onChange(v.target.value);
                }
              }}
              value={value}
              // placeholder={placeholder}
              className={`${
                styles[Icon ? "select-less-width" : "select"]
              } ${selectTextClass} ${
                (errors?.[name]?.message as string)?.length > 0 &&
                styles["error-title"]
              }`}
            >
              {list?.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.value}
                    className={styles["selectOptions"]}
                  >
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          {!!errors && (
            <ErrorMessage errors={errors?.[name]?.message as string} />
          )}
        </>
      )}
    />
  );
};

export default ControlSelect;
