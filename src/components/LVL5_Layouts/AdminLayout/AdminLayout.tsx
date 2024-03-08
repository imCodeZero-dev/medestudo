import { useState } from "react";
import styles from "./AdminLayout.module.css";
import { AdminLayoutProps } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../LVL1_Atoms/Button";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";

import SettingIcon from "../../../assets/svgs/SettingIcon";
import BellIcon from "../../../assets/svgs/BellIcon";
import LanguageDropdown from "../../LVL3_Cells/LangaugeDropdown/LangaugeDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import HeaderMenuDropdown from "../../LVL3_Cells/HeaderMenuDropdown/HeaderMenuDropdown";
import UserDropdown from "../../LVL3_Cells/UserDropdown/UserDropdown";
import ConfirmationModal from "../../LVL4_Organs/ConfirmationModal";
import useLocale from "../../../locales";
import { useAdminLayout } from "./hook";
import LogoutIcon from "../../../assets/svgs/LogoutIcon";

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");
  const location = useLocation();
  const { width } = useWidth();
  const { localeButtons, localeTitles } = useLocale();
  const {
    logoutModal,
    handleOpenLogout,
    handleCloseLogout,
    logoutLoading,
    onLogoutConfirm,
  } = useAdminLayout();

  const buttons = [
    { label: "Dashboard", route: "/admin" },
    { label: "Students", route: "/admin/students" },
    { label: "Professors", route: "/admin/professors" },
    { label: "Flashcards", route: "/admin/flashcards" },
    { label: "Questions", route: "/admin/questions" },
    { label: "Decks", route: "/admin/decks" },
    { label: "Tags", route: "/admin/tags" },
  ];
  const getNavItemClassName = (label: string) => {
    // console.log("label", label);
    let isActive;
    if (label === "Dashboard" && location.pathname === "/admin") {
      isActive = true;
    } else {
      isActive = location.pathname.includes(label.toLowerCase());
    }

    return isActive ? "primaryTab" : "secondaryTab";
  };

  return (
    <div className={styles["AdminLayout"]}>
      <div className={styles["AdminLayout-header"]}>
        <div className={styles["AdminLayout-header-left"]}>
          <img src={logoImg} className={styles["logo"]} />

          {width > breakPoints.slg ? (
            <div className={styles["AdminLayout-header-buttons"]}>
              {buttons?.map((button) => (
                <Button
                  key={button.label}
                  className={getNavItemClassName(button.label)}
                  onClick={() => {
                    setActiveButton(button.label);
                    navigate(button.route);
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          ) : (
            <HeaderMenuDropdown />
          )}
        </div>
        <div className={styles["AdminLayout-header-right"]}>
          <LanguageDropdown />
          <div className={styles["iconDiv"]}>
            <SettingIcon />
          </div>
          {/* <div className={styles["iconDiv"]}>
            <BellIcon />
          </div> */}
          <div className="ml-3 cursor-pointer">
            <UserDropdown handleOpenLogout={handleOpenLogout} />
          </div>
        </div>
      </div>
      {children}

      <ConfirmationModal
        open={logoutModal}
        cancelButtonText={localeButtons?.BUTTON_CANCEL}
        confirmButtonText={localeButtons?.BUTTON_LOGOUT}
        onConfirm={onLogoutConfirm}
        icon={<LogoutIcon />}
        title={localeTitles.TITLE_ARE_YOU_SURE_LOGOUT}
        handleClose={handleCloseLogout}
        loading={logoutLoading}
      />
    </div>
  );
};

export default AdminLayout;
