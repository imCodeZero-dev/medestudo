import styles from "./HeroSection.module.css";
import { HeroSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/Images/Landing/Hero.png";
import reviewImage from "../../../assets/Images/Landing/Hero.png";
import Text from "../../LVL1_Atoms/Text/Text";
import AvatarGroup from "../../LVL3_Cells/AvatarGroup/AvatarGroup";

const HeroSection = ({ allStudents }: HeroSectionProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <button className={styles.welcomeButton}>WELCOME TO MEDESTUDO</button>
          <Text className={styles.heading}>
            Get yourself prepared with{" "}
            <span className={styles.brandName1}>
              Med<span className={styles.brandName2}>Estudo</span>
            </span>
          </Text>
          <Text className={styles.detailText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            necessitatibus pariatur doloribus,
          </Text>

          <div className={styles.buttons}>
            <button className={styles.getStarted}>Get Started</button>
            <button className={styles.imStudent}>I'm Student</button>
          </div>
        </div>

        <div>
          <AvatarGroup students={allStudents} />
        </div>
      </div>
      {/* <div className={styles.videoSection}>
        <video controls className={styles.video}>
          <source src={heroImage} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <div className={styles.videoSection}>
        <iframe
          // width="560"
          // height="315"
          src="https://www.youtube.com/embed/UT5F9AXjwhg"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
    </section>
  );
};

export default HeroSection;
