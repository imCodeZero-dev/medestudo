import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import { UserDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import { FaCaretDown, FaCaretUp, FaHamburger } from "react-icons/fa";
import styles from "./UserDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { setLanguage } from "../../../redux/slices/languageSlice";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const UserDropdown: React.FC<UserDropdownProps> = ({ handleOpenLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { localeDropdowns } = useLocale();
  const navigate = useNavigate();

  const navigation = (link: string) => {
    if (link === "/logout") {
      handleClose();
      handleOpenLogout && handleOpenLogout();
    } else {
      handleClose();
      navigate(link);
      // setIsUserDropdownVisible(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = [
    { label: "Settings", route: "/settings" },
    { label: "Logout", route: "/logout" },
  ];

  return (
    <div className={styles["UserDropdown"]}>
      <div className={styles[""]} onClick={(e: any) => handleClick(e)}>
        <div className="flex items-center space-x-1">
          <RxAvatar size={40} />
        </div>

        {/* <FaCaretDown /> */}
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuButtons.map((button, i) => (
          <MenuItem key={i} onClick={() => navigation(button.route)}>
            {button?.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserDropdown;
