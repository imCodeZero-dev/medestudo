import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { selectProps } from "./@types";

const CustomSelect = ({ control, name, options }: selectProps) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select
            {...field}
            options={options.map((option: any) => ({
              label: option.name,
              value: option,
            }))}
          />
        )}
      />
    </div>
  );
};

export default CustomSelect;
