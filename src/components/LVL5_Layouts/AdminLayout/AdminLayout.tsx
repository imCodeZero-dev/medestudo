import { useState } from "react";
import styles from "./AdminLayout.module.css";
import { AdminLayoutProps } from "./types";
import { useNavigate } from "react-router-dom";
import { Button } from "../../LVL1_Atoms/Button";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { RxAvatar } from "react-icons/rx";
import settingImg from "../../../assets/Images/dashboard/setting.png";
import notificationImg from "../../../assets/Images/dashboard/notification.png";
import SettingIcon from "../../../assets/svgs/SettingIcon";
import BellIcon from "../../../assets/svgs/BellIcon";
import LanguageDropdown from "../../LVL3_Cells/LangaugeDropdown/LangaugeDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");

  const buttons = [
    { label: "Dashboard", route: "/admin" },
    { label: "Students", route: "/admin/students" },
    { label: "Professors", route: "/admin/professors" },
    { label: "Flashcards", route: "/admin/flashcards" },
    { label: "Questions", route: "/admin/questions" },
    { label: "Decks", route: "/admin/decks" },
    { label: "Tags", route: "/admin/tags" },
  ];

  return (
    <div className={styles["AdminLayout"]}>
      <div className={styles["AdminLayout-header"]}>
        <div className={styles["AdminLayout-header-left"]}>
          <img src={logoImg} className={styles["logo"]} />
          <div className={styles["AdminLayout-header-buttons"]}>
            {buttons?.map((button) => (
              <Button
                key={button.label}
                className={
                  activeButton === button.label ? "primaryTab" : "secondaryTab"
                }
                onClick={() => {
                  setActiveButton(button.label);
                  // navigate(button.route);
                }}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles["AdminLayout-header-right"]}>
          <LanguageDropdown />
          <div className={styles["iconDiv"]}>
            <SettingIcon />
          </div>
          <div className={styles["iconDiv"]}>
            <BellIcon />
          </div>
          <div className="ml-3 cursor-pointer">
            <RxAvatar size={40} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
