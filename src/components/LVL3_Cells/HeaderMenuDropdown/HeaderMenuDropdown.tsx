import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import { HeaderMenuDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import { FaCaretDown, FaCaretUp, FaHamburger } from "react-icons/fa";
import styles from "./HeaderMenuDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { setLanguage } from "../../../redux/slices/languageSlice";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const HeaderMenuDropdown: React.FC<HeaderMenuDropdownProps> = ({}) => {
  const dispatch = useDispatch();

  const currentLang = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { localeDropdowns } = useLocale();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = [
    { label: "Dashboard", route: "/admin" },
    { label: "Students", route: "/admin/students" },
    { label: "Professors", route: "/admin/professors" },
    { label: "Flashcards", route: "/admin/flashcards" },
    { label: "Questions", route: "/admin/questions" },
    { label: "Decks", route: "/admin/decks" },
    { label: "Tags", route: "/admin/tags" },
  ];

  return (
    <div className={styles["HeaderMenuDropdown"]}>
      <div className={styles["mainDiv"]} onClick={(e: any) => handleClick(e)}>
        <div className="flex items-center space-x-1">
          <IoMdMenu />
         
        </div>

        <FaCaretDown />
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuButtons.map((button, i) => (
          <MenuItem
            key={i}
            // onClick={() => handleLanguageChange(language?.code)}
            onClick={() => {
              // setActiveButton(button.label);
              navigate(button.route);
            }}
          >
            {button?.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HeaderMenuDropdown;
