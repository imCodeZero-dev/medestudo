import React, { useEffect, useRef } from "react";
import { FeatureCardProps } from "./@types";
import styles from "./FeatureCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { useDropdown } from "../../../utils/hooks/helper";

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, pic }) => {
  const { localeText } = useLocale();

  return (
    <div className={styles.FeatureCard}>
      <img src={pic} alt={title} className={styles.avatar} />
      <div className={styles.author}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
