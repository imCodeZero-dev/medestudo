import React from "react";

import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { InputLabel } from "@mui/material";
import { selectProps } from "./@types";
import Text from "../../LVL1_Atoms/Text/Text";
import styles from "./Select.module.css";

const CountrySelectDropDown = ({
  control,
  name,
  items,
  labelKey,
  valueKey,
  hideLabel,
  label,
}: selectProps) => {
  return (
    <div className="flex flex-col">
      {!!label && <Text className={styles["label14"]}>{label}</Text>}
      <Controller
        name={name}
        control={control}
        defaultValue={JSON.stringify({
          name: items?.[0]?.[labelKey],
          isoCode: items?.[0]?.[valueKey],
        })}
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
                borderBottom: "none", // Remove bottom border on focus
              },
              "&:hover": {
                backgroundColor: "#FFFFFF", // Maintain same background color on hover
              },
              "&:active": {
                backgroundColor: "#FFFFFF", // Maintain same background color on active
              },
              "& option": {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            {items?.map((item: any) => (
              <option
                value={JSON.stringify({
                  name: item?.[labelKey],
                  isoCode: item?.[valueKey],
                })}
                key={item?.[valueKey]}
              >
                {item?.[labelKey]}
              </option>
            ))}
          </NativeSelect>
        )}
      />
    </div>
  );
};

export default CountrySelectDropDown;
