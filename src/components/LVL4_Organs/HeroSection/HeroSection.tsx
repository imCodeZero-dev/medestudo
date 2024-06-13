import styles from "./HeroSection.module.css";
import { HeroSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/Images/Landing/Hero.png";
import reviewImage from "../../../assets/Images/Landing/Hero.png";
import Text from "../../LVL1_Atoms/Text/Text";

const HeroSection = ({}: HeroSectionProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <button className={styles.welcomeButton}>WELCOME TO MEDESTUDO</button>
        <Text className={styles.heading}>
          Get yourself prepared with{" "}
          <span className={styles.brandName1}>
            Med<span className={styles.brandName2}>Estudo</span>
          </span>
        </Text>

        <div className={styles.buttons}>
          <button className={styles.getStarted}>Get Started</button>
          <button className={styles.imStudent}>I'm Student</button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={styles.stats}>
          <div className={styles.stat}>
            <blockquote>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem
              lorem, tempus id condimentum.
            </blockquote>
            <div className={styles.statsNumbers}>
              <span>5k</span>
              <p>Students</p>
            </div>
            <div className={styles.statsNumbers}>
              <span>0.5k</span>
              <p>Professors</p>
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={heroImage} alt="Hero" className={styles.heroImage} />
        </div>
        <div className={styles.review}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem
            lorem, tempus id condimentum
          </p>
          <div className={styles.reviewDetails}>
            <div className={styles.stars}>
              <span>★★★★★</span>
            </div>
            <div className={styles.reviewer}>
              <img
                src={reviewImage}
                alt="Review"
                className={styles.reviewImage}
              />
              <p>Adam David</p>
              <span>Student</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
