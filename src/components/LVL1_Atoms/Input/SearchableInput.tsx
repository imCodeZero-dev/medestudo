import React from "react";
import Select, { ValueType, OptionTypeBase } from "react-select";
import { Controller, Control } from "react-hook-form";

interface SearchableInputProps {
  name: string;
  options: OptionTypeBase[];
  control: Control<any>;
}

const SearchableInput: React.FC<SearchableInputProps> = ({
  name,
  options,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          onChange={(value: ValueType<OptionTypeBase>) => {
            field.onChange(value);
          }}
          placeholder="Search..."
          isClearable
          isSearchable
        />
      )}
    />
  );
};

export default SearchableInput;
