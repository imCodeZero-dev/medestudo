import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { UserDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import styles from "./UserDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useLocale from "../../../locales";
import { useCookies } from "react-cookie";
import SettingIcon from "../../../assets/svgs/SettingIcon";
import { CiLogout } from "react-icons/ci";
import Text from "../../LVL1_Atoms/Text/Text";

const UserDropdown: React.FC<UserDropdownProps> = ({ handleOpenLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { localeDropdowns } = useLocale();
  const [cookies] = useCookies(["admin"]);

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
    {
      label: localeDropdowns?.DROPDOWN_PROFILE,
      route: "/admin/profile",
      icon: <SettingIcon />,
    },
    {
      label: localeDropdowns?.DROPDOWN_LOGOUT,
      route: "/logout",
      icon: <CiLogout size={20} />,
    },
  ];

  return (
    <div className={styles["UserDropdown"]}>
      <div className={styles[""]} onClick={(e: any) => handleClick(e)}>
        <div className="flex items-center space-x-1">
          {cookies?.admin?.pic ? (
            <img className={styles.image} src={cookies?.admin?.pic} />
          ) : (
            <RxAvatar size={40} />
          )}
        </div>

        {/* <FaCaretDown /> */}
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuButtons.map((button, i) => (
          <MenuItem
            key={i}
            onClick={() => navigation(button.route)}
            className="flex space-x-3"
          >
            {button?.icon}
            <Text className={styles.label}>{button?.label}</Text>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserDropdown;
