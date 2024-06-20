import React, { useEffect, useRef } from "react";
import { StatsSectionProps } from "./@types";
import styles from "./StatsSection.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { useDropdown } from "../../../utils/hooks/helper";

const StatsSection: React.FC<StatsSectionProps> = ({}) => {
  const { localeText, localeTitles } = useLocale();

  return (
    <div className={styles.statsSection}>
      <div className={styles.each}>
        <Text className={styles.value}>100</Text>
        <Text className={styles.label}>{localeTitles.TITLE_SUBJECTS}</Text>
      </div>
      <div className={styles.each}>
        <Text className={styles.value}>5k</Text>
        <Text className={styles.label}>{localeTitles.TITLE_STUDENTS}</Text>
      </div>
      <div className={styles.each}>
        <Text className={styles.value}>0.5k</Text>
        <Text className={styles.label}>{localeTitles.TITLE_PROFESSORS}</Text>
      </div>
      <div className={styles.each}>
        <Text className={styles.value}>20k</Text>
        <Text className={styles.label}>{localeTitles.TITLE_FLASHCARDS}</Text>
      </div>
    </div>
  );
};

export default StatsSection;
