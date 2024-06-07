import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { NonSelectProps, selectProps } from "./@types";
import { ErrorMessage } from "../../LVL1_Atoms/ErrorMessage";
import styles from "./Select.module.css";
import { IoClose, IoCloseCircle } from "react-icons/io5";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
const CustomNonSelectable = ({
  control,
  name,
  value,
  placeholder,
  clearAll,
}: NonSelectProps) => {
  const MAX_VISIBLE_ITEMS = 2;
  const MAX_ITEM_LENGTH = 10; // Adjust this length as needed

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, formState: { errors } }) => {
          // const { value } = field;

          let displayText = value;
          if (value?.length > MAX_VISIBLE_ITEMS) {
            displayText = [...value?.slice(0, MAX_VISIBLE_ITEMS), "..."];
          }

          // Join the items with a comma and space, then truncate if necessary
          const displayString = displayText.join(", ");
          const finalDisplayString = truncateText(
            displayString,
            MAX_ITEM_LENGTH
          );

          return (
            <div>
              <div className={styles.nonSelectableInput}>
                {finalDisplayString ? finalDisplayString : placeholder}
                {value?.length > 0 && (
                  <IoClose className="cursor-pointer" onClick={clearAll} />
                )}
              </div>
              {errors && <ErrorMessage errors={`${errors?.[name]?.message}`} />}
            </div>
          );
        }}
      />

      {/* {value?.map} */}
    </div>
  );
};

export default CustomNonSelectable;
