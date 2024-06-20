import styles from "./MetEstudioFeatures.module.css";
import { MetEstudioFeaturesProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import FeatureCard from "../../LVL3_Cells/FeatureCard/FeatureCard";

const MetEstudioFeatures = ({ features }: MetEstudioFeaturesProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.MetEstudioFeatures}>
      <button className={styles.welcomeButton}>
        {localeButtons.BUTTON_MEDESTUDO_FEATURES}
      </button>

      <Text className={styles.heading}>
        {localeTitles.TITLE_SO_MANY_REASONS_TO_START}
      </Text>
      <Text className={styles.text}>
        Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem,
        tempus id condimentum
      </Text>

      <div className={styles.featureCards}>
        {features?.map((feature, i) => (
          <FeatureCard {...feature} key={i} />
        ))}
      </div>
    </section>
  );
};

export default MetEstudioFeatures;
