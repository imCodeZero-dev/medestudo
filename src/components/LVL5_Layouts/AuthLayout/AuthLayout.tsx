import { AuthLayoutProps } from "./types";
import styles from "./AuthLayout.module.css";
import AuthImageSlider from "../../LVL4_Organs/AuthImageSlider/AuthImageSlider";
import img1 from "../../../assets/Images/Auth/authHero1.jpg";
import img2 from "../../../assets/Images/Auth/authHero2.jpg";
import img3 from "../../../assets/Images/Auth/authHero3.jpg";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import useLocale from "../../../locales";
import HeaderMenuDropdown from "../../LVL3_Cells/HeaderMenuDropdown/HeaderMenuDropdown";
import Header from "../../LVL4_Organs/Header/Header";
import { motion } from "framer-motion";
import { useState } from "react";
import LeftSidebar from "../../LVL4_Organs/LeftSidebar/LeftSidebar";
import { MdOutlineDashboard } from "react-icons/md";
import { SiRundeck } from "react-icons/si";
import { CiLogin } from "react-icons/ci";

const dummyData = [
  {
    image: img2,
    text: "First Text.",
  },
  {
    image: img3,
    text: "Second Text",
  },
  {
    image: img1,
    text: "Third Text",
  },
];

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { width } = useWidth();
  const navigate = useNavigate();
  const { localeButtons, localeTitles } = useLocale();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const options = [
    {
      title: localeButtons.BUTTON_HOME,
      url: "/home",
      image: <MdOutlineDashboard />,
    },

    {
      title: localeButtons.BUTTON_FLASHCARDS,
      url: "/home",
      image: <SiRundeck />,
    },
    // {
    //   title: localeButtons.BUTTON_GET_STARTED,
    //   url: "/professor/login",
    //   image: <CiLogin />,
    // },
  ];

  //   const navigate = useNavigate();

  return (
    <div>
      <Header setDrawerOpen={setDrawerOpen} />

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
          <LeftSidebar options={options} />
        </div>
      </motion.div>
      <div className={styles["AuthLayout-body"]}>
        <div className={styles["leftSection"]}>{children}</div>
        {/* <div style={{ flex: 1 }}><FormComponent /> </div> */}
        <div className={styles["rightSection"]}>
          <AuthImageSlider items={dummyData} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
