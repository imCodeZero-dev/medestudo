import React, { useState } from "react";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import { Language, LanguageDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "./LangaugeDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { setLanguage } from "../../../redux/slices/languageSlice";

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({}) => {
  const dispatch = useDispatch();

  const currentLang = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  console.log("currentLang", currentLang);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { localeDropdowns } = useLocale();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    dispatch(setLanguage(selectedLanguage));
    handleClose();
  };

  const langs = [
    { code: "en", label: localeDropdowns?.DROPDOWN_ENG },
    { code: "es", label: localeDropdowns?.DROPDOWN_ESP },
  ];

  return (
    <div className={styles["LanguageDropdown"]}>
      <div className={styles["mainDiv"]} onClick={(e: any) => handleClick(e)}>
        <div className="flex items-center space-x-1">
          <TbWorld />
          <Text className={styles["dropdownTxt"]}>
            {currentLang === "en"
              ? localeDropdowns.DROPDOWN_ENG
              : localeDropdowns.DROPDOWN_ESP}
          </Text>
        </div>

        <FaCaretDown />
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {langs.map((language) => (
          <MenuItem
            key={language?.code}
            onClick={() => handleLanguageChange(language?.code)}
          >
            {language?.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
