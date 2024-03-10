import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { UserDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import styles from "./UserDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const UserDropdown: React.FC<UserDropdownProps> = ({ handleOpenLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
