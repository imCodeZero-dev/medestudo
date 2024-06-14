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
import {
  MdOutlineDashboard,
  MdOutlineExplore,
  MdOutlineIntegrationInstructions,
} from "react-icons/md";
import { PiNewspaperBold } from "react-icons/pi";
import { MdOutlineViewCarousel } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdClipboard } from "react-icons/io";
import { IoBookmarkOutline, IoSettingsOutline } from "react-icons/io5";
import Input from "../../LVL1_Atoms/Input";
import { BiMenu, BiSearch } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { CiFolderOn, CiShare2 } from "react-icons/ci";
import { BsQuestionCircle } from "react-icons/bs";
import { FaRegFileAlt, FaRegFolder } from "react-icons/fa";
import { AiOutlineFileSync } from "react-icons/ai";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HomeLayout = ({ children, createButton }: HomeLayoutProps) => {
  const navigate = useNavigate();
  // const [activeButton, setActiveButton] = useState<string>("");
  const [cookies, removeCookie] = useCookies(["professor"]);
  let userData = cookies?.professor?.professor;

  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
  const optionsStudent = [
    {
      title: localeLables?.LABEL_DASHBOARD,
      url: "/student",
      image: <MdOutlineDashboard />,
    },
    {
      title: localeLables?.LABEL_FLASHCARDS,
      url: "/student/flashcards/explore",
      image: <PiNewspaperBold />,
      submenu: [
        {
          title: localeLables?.LABEL_EXPLORE,
          url: "/student/flashcards/explore",
          image: <MdOutlineExplore />,
        },
        {
          title: localeLables?.LABEL_CUSTOM,
          url: "/student/flashcards/custom",
          image: <MdOutlineIntegrationInstructions />,
        },
        {
          title: localeLables?.LABEL_CREATE_NEW,
          url: "/student/flashcards/new",
          image: <IoMdAddCircleOutline />,
        },
        {
          title: localeLables?.LABEL_REVIEW_DECK,
          url: "/student/flashcards/review",
          image: <BsQuestionCircle />,
        },
        {
          title: localeLables?.LABEL_FAVORITE,
          url: "/student/flashcards/favorite",
          image: <IoBookmarkOutline />,
        },
      ],
    },
    {
      title: localeLables?.LABEL_EXAMS,
      url: "/student/exams/practice",
      image: <IoMdClipboard />,
      submenu: [
        {
          title: localeLables?.LABEL_PRACTICE_EXAMS,
          url: "/student/exams/practice",
          image: <FaRegFolder />,
        },
        {
          title: localeLables?.LABEL_MOCK_EXAMS,
          url: "/student/exams/mock",
          image: <FaRegFileAlt />,
        },
        {
          title: localeLables?.LABEL_RESULT,
          url: "/student/exams/result",
          image: <AiOutlineFileSync />,
        },
      ],
    },
    // {
    //   title: localeLables?.LABEL_INVITE,
    //   url: "/student/invite",
    //   image: <CiShare2 />,
    // },
    {
      title: localeLables?.LABEL_SETTINGS,
      url: "/student/settings",
      image: <IoSettingsOutline />,
    },
  ];
  const options = [
    {
      title: localeLables?.LABEL_DASHBOARD,
      url: "/professor",
      image: <MdOutlineDashboard />,
    },
    {
      title: localeLables?.LABEL_CLASSES,
      url: "/professor/classes",
      image: <PiNewspaperBold />,
      submenu: [
        {
          title: localeLables?.LABEL_ALL_CLASSES,
          url: "/professor/classes",
          image: <MdOutlineViewCarousel />,
        },
        {
          title: localeLables?.LABEL_ADD_NEW,
          url: "/professor/classes/new",
          image: <IoMdAddCircleOutline />,
        },
      ],
    },
    {
      title: localeLables?.LABEL_EXAMS,
      url: "/professor/exams",
      image: <IoMdClipboard />,
      submenu: [
        {
          title: localeLables?.LABEL_ALL_EXAMS,
          url: "/professor/exams",
          image: <MdOutlineViewCarousel />,
        },
        {
          title: localeLables?.LABEL_CREATE_NEW,
          url: "/professor/exams/new",
          image: <IoMdAddCircleOutline />,
        },
      ],
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
    } else if (location.pathname === "/professor/classes") {
      return localeLables?.LABEL_CLASSES;
    } else if (location.pathname === "/professor/exams") {
      return localeLables?.LABEL_EXAMS;
    } else if (location.pathname === "/professor/settings") {
      return localeLables?.LABEL_SETTINGS;
    }
  };

  

  return (
    <div className={styles["HomeLayout"]}>
      {width > breakPoints.lg && (
        <LeftSidebar
          options={
            location?.pathname.includes("/student") ? optionsStudent : options
          }
        />
      )}

      {width <= breakPoints.lg && (
        <Button onClick={() => setDrawerOpen(true)}>
          <BiMenu size={24} />
        </Button>
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: drawerOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={styles["Drawer"]}
      >
        <div
          className={styles["Drawer-overlay"]}
          onClick={() => setDrawerOpen(false)}
        ></div>
        <div className={styles["Drawer-content"]}>
          <LeftSidebar
            options={
              location?.pathname.includes("/student") ? optionsStudent : options
            }
          />
        </div>
      </motion.div>
      <div className={styles["HomeLayout-main"]}>
        <div className={styles["HomeLayout-header"]}>
          <div className="flex items-center space-x-3">
            <div className={styles["pathName"]}>{getName()}</div>
            <div>{createButton && createButton}</div>
          </div>
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
            {/* <div className={styles["iconDiv"]}>
              <SettingIcon />
            </div> */}

            <div className="ml-3 cursor-pointer">
              <UserDropdown
                handleOpenLogout={handleOpenLogout}
                userData={userData}
                userType="Professor"
              />
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
