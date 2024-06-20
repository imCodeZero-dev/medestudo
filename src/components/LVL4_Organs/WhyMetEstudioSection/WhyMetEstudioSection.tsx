import styles from "./WhyMetEstudioSection.module.css";
import { WhyMetEstudioSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import laptop from "../../../assets/Images/Landing/laptop.png";

const WhyMetEstudioSection = ({}: WhyMetEstudioSectionProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.WhyMetEstudioSection}>
      <button className={styles.welcomeButton}>
        {localeButtons.BUTTON_WHY_MEDESTUDO}
      </button>

      <Text className={styles.heading}>
        {localeTitles.TITLE_THE_BEST_IN_THE_BUSINESS}
      </Text>
      <Text className={styles.text}>
        Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem,
        tempus id condimentum
      </Text>

      <img className={styles.laptop} src={laptop} alt="medestudio" />
    </section>
  );
};

export default WhyMetEstudioSection;
