import React from "react";
import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
import { selectProps } from "./@types";
import { ErrorMessage } from "../../LVL1_Atoms/ErrorMessage";
import styles from "./Select.module.css";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const SelectComponent = ({
  control,
  name,
  options,
  placeholder,
  defaultValue,
  isClearable,
}: selectProps) => {
  return (
    <div>
      <FormControl fullWidth variant="filled" margin="normal">
        <InputLabel>{placeholder}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field, formState: { errors } }) => (
            <>
              <Select {...field} label={placeholder}>
                {isClearable && (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                )}
                {options?.map((option: any) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {errors && <ErrorMessage errors={`${errors?.[name]?.message}`} />}
              {/* {errors[name] && (
                <FormHelperText error>{errors[name]?.message}</FormHelperText>
              )} */}
            </>
          )}
        />
      </FormControl>
    </div>
  );
};

export default SelectComponent;
