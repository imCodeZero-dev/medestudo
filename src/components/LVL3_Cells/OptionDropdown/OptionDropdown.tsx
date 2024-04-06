import React from "react";
import { OptionDropdownProps } from "./@types";
import styles from "./OptionDropdown.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const OptionDropdown: React.FC<OptionDropdownProps> = ({ options }) => {
  const { localeText } = useLocale();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
      <div className="py-1">
        {options.map((option, index) => (
          <button
            key={index}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              option.onClick();
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionDropdown;
