import { useState, useRef } from "react";
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
import ReviewSection from "../../components/LVL4_Organs/ReviewSection/ReviewSection";
import StatsSection from "../../components/LVL3_Cells/StatsSection/StatsSection";
import ExploreFlashcards from "../../components/LVL4_Organs/ExploreFlashcards/ExploreFlashcards";
import { allFlashcardsData, features } from "../../utils/constants/constants";
import WhyMetEstudioSection from "../../components/LVL4_Organs/WhyMetEstudioSection/WhyMetEstudioSection";
import MetEstudioFeatures from "../../components/LVL4_Organs/MetEstudioFeatures/MetEstudioFeatures";
import MetEstudioGetStarted from "../../components/LVL4_Organs/MetEstudioGetStarted/MetEstudioGetStarted";
import TestimonialSection from "../../components/LVL4_Organs/TestimonialSection/TestimonialSection";
import JoinPlatformSection from "../../components/LVL4_Organs/JoinPlatformSection/JoinPlatformSection";
import AffiliateProgramSection from "../../components/LVL4_Organs/AffiliateProgramSection/AffiliateProgramSection";
import FooterSection from "../../components/LVL4_Organs/FooterSection/FooterSection";

type HomeProps = {};

const Home = ({}: HomeProps) => {
  const { width } = useWidth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const exploreFlashcardsRef = useRef<HTMLDivElement>(null);

  const { localeButtons, localeTitles, localeLables, localePlaceholders } =
    useLocale();
  const { allStudents } = useHome();

  const scrollToExploreFlashcards = () => {
    if (exploreFlashcardsRef.current) {
      exploreFlashcardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const reviewData = [
    {
      rating: 5,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem lorem, tempus id condimentum.",
      authorName: "Adam David",
      authorRole: "Student",
      authorAvatar:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
    {
      rating: 4,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem lorem, tempus id condimentum.",
      authorName: "Mr David",
      authorRole: "Student",
      authorAvatar:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
    {
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem lorem, tempus id condimentum.",
      authorName: "John David",
      authorRole: "Student",
      authorAvatar:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
    {
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem lorem, tempus id condimentum.",
      authorName: "John David",
      authorRole: "Student",
      authorAvatar:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  ];

  return (
    <div className={styles.home}>
      {/* {width > breakPoints.lg && ( */}
      <HomeHeader
        setDrawerOpen={setDrawerOpen}
        scrollToExploreFlashcards={scrollToExploreFlashcards}
      />

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
      <ReviewSection reviews={reviewData} />
      <div className={styles.stats}>
        <StatsSection />
      </div>
      <div ref={exploreFlashcardsRef}>
        <ExploreFlashcards allFlashcards={allFlashcardsData} />
      </div>
      <WhyMetEstudioSection />
      <MetEstudioFeatures features={features(localeTitles)} />
      <div className={styles.whiteBgDiv}>
        <MetEstudioGetStarted />
        <TestimonialSection />
        <JoinPlatformSection />
      </div>

      <AffiliateProgramSection />
      <FooterSection />
      {/* <StatsSection />
      <TestimonialsSection />
      <VideoSection />
      <Footer /> */}
    </div>
  );
};

export default Home;
