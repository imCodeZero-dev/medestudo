import styles from "./MetEstudioGetStarted.module.css";
import { MetEstudioGetStartedProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import FeatureCard from "../../LVL3_Cells/FeatureCard/FeatureCard";
import StepProcess from "../../LVL3_Cells/StepProcess/StepProcess";
import { steps } from "../../../utils/constants/constants";

const MetEstudioGetStarted = ({ features }: MetEstudioGetStartedProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.MetEstudioGetStarted}>
      <button className={styles.welcomeButton}>
        {localeButtons.BUTTON_LETS_BEGIN}
      </button>

      <Text className={styles.heading}>
        {localeTitles.TITLE_HOW_TO_GET_START}
      </Text>

      <div className={styles.featureCards}>
        <StepProcess steps={steps} />
      </div>
    </section>
  );
};

export default MetEstudioGetStarted;
