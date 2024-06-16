import { useState } from "react";
import HeroSection from "../../components/LVL4_Organs/HeroSection/HeroSection";
import HomeHeader from "../../components/LVL4_Organs/HomeHeader/HomeHeader";
import { breakPoints } from "../../utils/constants/ResponsiveDesignBreakPoints";
import { useWidth } from "../../utils/hooks/responsiveHook";
import styles from "./Home.module.css";
import { useHome } from "./hook";
import { motion } from "framer-motion";
import useLocale from "../../locales";
import LeftSidebar from "../../components/LVL4_Organs/LeftSidebar/LeftSidebar";
import { MdDeck, MdOutlineDashboard } from "react-icons/md";
import { IoCardSharp, IoSettingsOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { SiRundeck } from "react-icons/si";
import { CiLogin } from "react-icons/ci";

type HomeProps = {};

const Home = ({}: HomeProps) => {
  const { width } = useWidth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { localeButtons, localeTitles, localeLables, localePlaceholders } =
    useLocale();
  const { allStudents } = useHome();

  const options = [
    {
      title: localeButtons.BUTTON_HOME,
      url: "/student",
      image: <MdOutlineDashboard />,
    },

    {
      title: localeButtons.BUTTON_FLASHCARDS,
      url: "/student/flashcards",
      image: <SiRundeck />,
    },
    {
      title: localeButtons.BUTTON_LOGIN,
      url: "/student/login",
      image: <CiLogin />,
    },
  ];
  return (
    <div className={styles.home}>
      {/* {width > breakPoints.lg && ( */}
      <HomeHeader setDrawerOpen={setDrawerOpen} />

      {/* )} */}

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

      <HeroSection allStudents={allStudents} />
      {/* <StatsSection />
      <TestimonialsSection />
      <VideoSection />
      <Footer /> */}
    </div>
  );
};

export default Home;
