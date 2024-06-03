import React, { useState } from "react";
import styles from "./SelectableCards.module.css";
import { SelectableCardsProps } from "./@types";
import { Controller } from "react-hook-form";

const SelectableCards: React.FC<SelectableCardsProps> = ({
  name,
  label,
  control,
  selectedCheckboxes,
  setSelectedCheckboxes,
}) => {
  const isChecked = selectedCheckboxes.includes(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div
          className={`${styles.checkbox} ${
            isChecked ? styles.checkboxSelected : ""
          }`}
          onClick={() => {
            if (isChecked) {
              setSelectedCheckboxes((prev) =>
                prev.filter((item) => item !== name)
              );
            } else {
              setSelectedCheckboxes((prev) => [...prev, name]);
            }
            onChange(!isChecked);
          }}
        >
          <input
            type="checkbox"
            id={name}
            checked={isChecked}
            onChange={() => {}}
          />
          {label && <span className={styles.checkboxLabel}>{label}</span>}
          <span className="ml-3">{isChecked ? " -" : " +"}</span>
        </div>
      )}
    />
  );
};

export default SelectableCards;
