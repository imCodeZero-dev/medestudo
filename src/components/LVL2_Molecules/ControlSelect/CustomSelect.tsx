import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { selectProps } from "./@types";
import { ErrorMessage } from "../../LVL1_Atoms/ErrorMessage";
import styles from "./Select.module.css";
const CustomSelect = ({
  control,
  name,
  options,
  placeholder,
  defaultValue,
  isClearable,
}: selectProps) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, formState: { errors } }) => (
          <div>
            <Select
              isClearable={isClearable}
              classNamePrefix={styles.select}
              // styles={{ height: "44px" }}
              {...field}
              // isOptionSelected={defa}
              defaultInputValue={defaultValue}
              defaultValue={defaultValue}
              placeholder={placeholder}
              options={options?.map((option: any) => ({
                label: option.name,
                value: option,
              }))}
            />
            {errors && <ErrorMessage errors={`${errors?.[name]?.message}`} />}
          </div>
        )}
      />
    </div>
  );
};

export default CustomSelect;
