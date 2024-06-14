import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { HeaderMenuDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import { FaCaretDown } from "react-icons/fa";
import styles from "./HeaderMenuDropdown.module.css";

import { useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdPricetags } from "react-icons/io";
import Text from "../../LVL1_Atoms/Text/Text";
import { MdQuestionAnswer, MdSpaceDashboard } from "react-icons/md";
import { FaUsers, FaUsersLine } from "react-icons/fa6";
import { SiBookstack, SiRundeck } from "react-icons/si";

const HeaderMenuDropdown: React.FC<HeaderMenuDropdownProps> = ({}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const {  } = useLocale();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = [
    { icon: <MdSpaceDashboard />, label: "Dashboard", route: "/admin" },
    { icon: <FaUsers />, label: "Students", route: "/admin/students" },
    {
      icon: <FaUsersLine />,
      label: "Professors",
      route: "/admin/professors",
    },
    {
      icon: <SiRundeck />,
      label: "Flashcards",
      route: "/admin/flashcards",
    },
    {
      icon: <MdQuestionAnswer />,
      label: "Questions",
      route: "/admin/questions",
    },
    { icon: <SiBookstack />, label: "Decks", route: "/admin/decks" },
    { icon: <IoMdPricetags />, label: "Tags", route: "/admin/tags" },
  ];

  return (
    <div className={styles["HeaderMenuDropdown"]}>
      <div className={styles["mainDiv"]} onClick={(e: any) => handleClick(e)}>
        <div className="flex items-center space-x-2">
          <IoMdMenu size={24} />
          <Text>Menu</Text>
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
            {button?.icon}
            <Text className={styles.label}>{button?.label}</Text>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HeaderMenuDropdown;
