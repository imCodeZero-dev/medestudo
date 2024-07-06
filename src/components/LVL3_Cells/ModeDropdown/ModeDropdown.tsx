import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { ModeDropdownProps } from "./@types";
// import LanguageIcon from "@mui/icons-material/Language";
import styles from "./ModeDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useLocale from "../../../locales";
import { useCookies } from "react-cookie";
import SettingIcon from "../../../assets/svgs/SettingIcon";
import { CiLogout } from "react-icons/ci";
import Text from "../../LVL1_Atoms/Text/Text";
import { IoSettingsSharp } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineCreditCard } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { TbCards } from "react-icons/tb";

const ModeDropdown: React.FC<ModeDropdownProps> = ({ setMode, mode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { localeDropdowns, localeLables } = useLocale();

  const setType = (data: string) => {
    setMode(data);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = [
    {
      label: localeLables.LABEL_FREE_MODE,
      type: "free",
      icon: <MdOutlineCreditCard size={14} />,
    },
    {
      label: localeLables.LABEL_TEST_MODE,
      type: "test",
      icon: <TbCards size={14} />,
    },
    {
      label: localeLables.LABEL_EXAM_MODE,
      type: "exam",
      icon: <AiOutlineIdcard size={14} />,
    },
  ];
  const currentButton = menuButtons.find((data) => data.type === mode);

  return (
    <div className={styles["ModeDropdown"]}>
      <div className={styles[""]} onClick={(e: any) => handleClick(e)}>
        <div className="bg-white flex items-center space-x-2 p-2 rounded-lg cursor-pointer">
          <IoSettingsSharp size={16} />
          <Text>
            {currentButton ? currentButton.label : localeLables.LABEL_FREE_MODE}
          </Text>
          <FaChevronDown size={12} />
        </div>

        {/* <FaCaretDown /> */}
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuButtons.map((button, i) => (
          <MenuItem
            key={i}
            onClick={() => setType(button.type)}
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

export default ModeDropdown;
