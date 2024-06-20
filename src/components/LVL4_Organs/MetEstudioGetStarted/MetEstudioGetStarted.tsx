import styles from "./MetEstudioGetStarted.module.css";
import { MetEstudioGetStartedProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import FeatureCard from "../../LVL3_Cells/FeatureCard/FeatureCard";
import StepProcess from "../../LVL3_Cells/StepProcess/StepProcess";
import { steps } from "../../../utils/constants/constants";
import { MdArrowRightAlt } from "react-icons/md";

const MetEstudioGetStarted = ({ features }: MetEstudioGetStartedProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.MetEstudioGetStarted}>
      <div className={styles.MetEstudioGetStarted_left}>
        <button className={styles.welcomeButton}>
          {localeButtons.BUTTON_LETS_BEGIN}
        </button>

        <Text className={styles.heading}>{localeTitles.TITLE_HOW_TO_GET}</Text>
        <Text className={styles.heading}>
          {localeTitles.TITLE_START_ON_MEDESTUDO}
        </Text>

        <Button className={styles.startedBtn}>
          {localeButtons.BUTTON_GET_STARTED} <MdArrowRightAlt />
        </Button>
      </div>
      <div className={styles.featureCards}>
        <StepProcess steps={steps} />
      </div>
    </section>
  );
};

export default MetEstudioGetStarted;
