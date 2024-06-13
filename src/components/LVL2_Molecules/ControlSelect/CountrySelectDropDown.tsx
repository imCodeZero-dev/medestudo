import React from "react";

import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { InputLabel } from "@mui/material";
import { CountrySelectProps, selectProps } from "./@types";
import Text from "../../LVL1_Atoms/Text/Text";
import styles from "./Select.module.css";

const CountrySelectDropDown = ({
  control,
  name,
  items,
  label,
}: CountrySelectProps) => {
  return (
    <div className="flex flex-col">
      {!!label && <Text className={styles["label14"]}>{label}</Text>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <NativeSelect
            {...field}
            sx={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid rgba(15, 19, 34, 0.2)",
              padding: "8px",
              width: "100%",
              height: "44px",
              borderRadius: "8px",
              "&:focus": {
                borderBottom: "none",
              },
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
              "&:active": {
                backgroundColor: "#FFFFFF",
              },
              "& option": {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            {items?.map((item: any) => (
              <option value={item} key={item.id}>
                {item.name}
              </option>

              
            ))}
          </NativeSelect>
        )}
      />
    </div>
  );
};

export default CountrySelectDropDown;
