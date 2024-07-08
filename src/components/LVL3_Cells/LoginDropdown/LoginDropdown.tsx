import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { LoginDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import styles from "./LoginDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useLocale from "../../../locales";
import { useCookies } from "react-cookie";
import SettingIcon from "../../../assets/svgs/SettingIcon";
import { CiLogout } from "react-icons/ci";
import Text from "../../LVL1_Atoms/Text/Text";
import { Button } from "../../LVL1_Atoms/Button";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

const LoginDropdown: React.FC<LoginDropdownProps> = ({
  // handleOpenLogout,
  userData,
  userType,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { localeDropdowns, localeButtons } = useLocale();

  const navigation = (link: string) => {
    handleClose();
    if (link === "/logout") {
      // handleOpenLogout && handleOpenLogout();
    } else {
      setTimeout(() => {
        navigate(link);
      }, 0);
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
      label: localeDropdowns?.DROPDOWN_STUDENT,
      route: "/student/login",
      icon: <PiStudent />,
    },
    {
      label: localeDropdowns?.DROPDOWN_PROFESSOR,
      route: "/professor/login",
      icon: <FaChalkboardTeacher />,
    },
    {
      label: localeDropdowns?.DROPDOWN_ADMIN,
      route: "/admin/login",
      icon: <MdOutlineAdminPanelSettings />,
    },
  ];

  return (
    <div className={styles["LoginDropdown"]}>
      <div className={styles[""]} onClick={(e: any) => handleClick(e)}>
        <div className="flex items-center space-x-1">
          <Button
            className=""
            onClick={() => {
              navigate("");
            }}
          >
            {localeButtons.BUTTON_LOGIN}
          </Button>
          {/* {userData?.pic ? (
            <img className={styles.image} src={userData?.pic} />
          ) : (
            <RxAvatar size={40} />
          )} */}
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
export default LoginDropdown;
