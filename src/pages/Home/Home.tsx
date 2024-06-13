import HeroSection from "../../components/LVL4_Organs/HeroSection/HeroSection";
import HomeHeader from "../../components/LVL4_Organs/HomeHeader/HomeHeader";
import styles from "./Home.module.css";

type HomeProps = {};

const Home = ({}: HomeProps) => {
  return (
    <div className={styles.home}>
      <HomeHeader />
      <HeroSection />
      {/* <StatsSection />
      <TestimonialsSection />
      <VideoSection />
      <Footer /> */}
    </div>
  );
};

export default Home;
