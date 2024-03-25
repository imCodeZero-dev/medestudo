// import { useState } from "react";
import styles from "./HomeLayout.module.css";
import { HomeLayoutProps } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../LVL1_Atoms/Button";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";

import SettingIcon from "../../../assets/svgs/SettingIcon";
import LanguageDropdown from "../../LVL3_Cells/LangaugeDropdown/LangaugeDropdown";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import HeaderMenuDropdown from "../../LVL3_Cells/HeaderMenuDropdown/HeaderMenuDropdown";
import UserDropdown from "../../LVL3_Cells/UserDropdown/UserDropdown";
import ConfirmationModal from "../../LVL4_Organs/ConfirmationModal";
import useLocale from "../../../locales";
import { useHomeLayout } from "./hook";
import LogoutIcon from "../../../assets/svgs/LogoutIcon";
import LeftSidebar from "../../LVL4_Organs/LeftSidebar/LeftSidebar";
import { MdOutlineDashboard } from "react-icons/md";
import { PiNewspaperBold } from "react-icons/pi";
import { MdOutlineViewCarousel } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdClipboard } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Input from "../../LVL1_Atoms/Input";
import { BiSearch } from "react-icons/bi";

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const navigate = useNavigate();
  // const [activeButton, setActiveButton] = useState<string>("");
  const location = useLocation();
  const { width } = useWidth();
  const { localeButtons, localeTitles, localeLables, localePlaceholders } =
    useLocale();
  const {
    logoutModal,
    handleOpenLogout,
    handleCloseLogout,
    onLogoutConfirm,
    control,
  } = useHomeLayout();
  const options = [
    {
      title: localeLables?.LABEL_DASHBOARD,
      url: "/professor",
      image: <MdOutlineDashboard />,
    },
    {
      title: localeLables?.LABEL_FLASHCARDS,
      url: "/professor/flashcards",
      image: <PiNewspaperBold />,
      submenu: [
        {
          title: localeLables?.LABEL_ALL_FLASHCARDS,
          url: "/professor/flashcards",
          image: <MdOutlineViewCarousel />,
        },
        {
          title: localeLables?.LABEL_ADD_NEW,
          url: "/professor/flashcards/new",
          image: <IoMdAddCircleOutline />,
        },
      ],
    },
    {
      title: localeLables?.LABEL_EXAMS,
      url: "/professor/exams",
      image: <IoMdClipboard />,
    },
    {
      title: localeLables?.LABEL_SETTINGS,
      url: "/professor/settings",
      image: <IoSettingsOutline />,
    },
  ];
  const getName = () => {
    if (location.pathname === "/professor") {
      return localeLables?.LABEL_DASHBOARD;
    } else if (location.pathname === "/professor/flashcards") {
      return localeLables?.LABEL_FLASHCARDS;
    } else if (location.pathname === "/professor/exams") {
      return localeLables?.LABEL_EXAMS;
    } else if (location.pathname === "/professor/settings") {
      return localeLables?.LABEL_SETTINGS;
    }
  };

  return (
    <div className={styles["HomeLayout"]}>
      <LeftSidebar options={options} />
      <div className={styles["HomeLayout-main"]}>
        <div className={styles["HomeLayout-header"]}>
          <div className={styles["pathName"]}>{getName()}</div>
          <div className={styles["HomeLayout-header-mid"]}>
            <Input
              control={control}
              name="name"
              prefix={<BiSearch size={24} />}
              placeholder={localePlaceholders.PLACEHOLDER_SEARCH}
              preDefinedClassName="lesserHeight"
              preDefinedWrapClassName="inputField-wrap"
              type="text"
            />
          </div>
          <div className={styles["HomeLayout-header-right"]}>
            <LanguageDropdown />
            <div className={styles["iconDiv"]}>
              <SettingIcon />
            </div>

            <div className="ml-3 cursor-pointer">
              <UserDropdown handleOpenLogout={handleOpenLogout} />
            </div>
          </div>
        </div>
        {children}
      </div>

      <ConfirmationModal
        open={logoutModal}
        cancelButtonText={localeButtons?.BUTTON_CANCEL}
        confirmButtonText={localeButtons?.BUTTON_LOGOUT}
        onConfirm={onLogoutConfirm}
        icon={<LogoutIcon />}
        title={localeTitles.TITLE_ARE_YOU_SURE_LOGOUT}
        handleClose={handleCloseLogout}
        loading={false}
      />
    </div>
  );
};

export default HomeLayout;