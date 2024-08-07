import styles from "./HeroSection.module.css";
import { HeroSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/Images/Landing/Hero.png";
import reviewImage from "../../../assets/Images/Landing/Hero.png";
import Text from "../../LVL1_Atoms/Text/Text";
import AvatarGroup from "../../LVL3_Cells/AvatarGroup/AvatarGroup";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import InstagramEmbed from "../../LVL3_Cells/InstaEmbed/InstaEmbed";
import landingVideo from "../../../assets/videos/landingVideo.mp4";

const HeroSection = ({ allStudents }: HeroSectionProps) => {
  const { localeButtons, localeTitles, localeText } = useLocale();
  const navigate = useNavigate();
  useEffect(() => {
    // Load Instagram embed script after component mounts
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      // Clean up script element
      document.body.removeChild(script);
    };
  }, []);
  const url =
    "https://www.instagram.com/reel/C5zByZlO9k6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D";

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <button className={styles.welcomeButton}>
            {localeTitles.WELCOME_WELCOME_TO_MEDESTUDO}
          </button>
          <Text className={styles.heading}>
            {localeTitles?.GET_YOURSELF_READY}{" "}
            <span className={styles.brandName1}>
              Med<span className={styles.brandName2}>Estudo</span>
            </span>
          </Text>
          <Text className={styles.detailText}>
            {localeText.TEXT_FLASHCARD_SUBTEXT}
          </Text>

          <div className={styles.buttons}>
            <button
              className={styles.getStarted}
              onClick={() => navigate("/student")}
            >
              {localeButtons?.BUTTON_GET_STARTED}
            </button>
            <button
              className={styles.imStudent}
              onClick={() => navigate("/student")}
            >
              {localeButtons?.BUTTON_IM_A_STUDENT}
            </button>
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
        <video
          className={styles.video}
          src={landingVideo}
          autoPlay
          loop
          muted
        ></video>

        {/* <iframe
          // width="100%"
          // height="315"
          src={landingVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        ></iframe> */}
      </div>
    </section>
  );
};

export default HeroSection;
