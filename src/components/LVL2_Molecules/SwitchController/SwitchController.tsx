import React from "react";
import { Controller } from "react-hook-form";
import { SwitchControllerProps } from "./@types";
import Switch from "react-switch";
import styles from "./SwitchController.module.css";
import Text from "../../LVL1_Atoms/Text/Text";

const SwitchController = ({
  control,
  name,
  label,
  text,
  ...rest
}: SwitchControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className={styles["SwitchController"]}>
          <div>
            <Text className={styles["SwitchController-label"]}>{label}</Text>
            <Text className={styles["SwitchController-text"]}>{text}</Text>
          </div>
          <Switch
            onChange={onChange}
            checked={value}
            uncheckedIcon={false}
            checkedIcon={false}
            onHandleColor={"#FFFFFF"}
            onColor="#0030DD"
            activeBoxShadow="#fff"
            handleDiameter={20}
            width={40}
            height={24}
          />
        </div>
      )}
    />
  );
};

export default SwitchController;
