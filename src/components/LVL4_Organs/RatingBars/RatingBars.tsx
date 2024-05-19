import { useEffect, useState } from "react";
import styles from "./RatingBars.module.css";
import { RatingBarsProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";

const RatingBars = ({ ratings, heading }: RatingBarsProps) => {
  return (
    <div className={styles.container}>
      <Text className={styles['heading']}>{heading}</Text>
      {ratings.map((rating, index) => (
        <div key={index} className={styles.ratingRow}>
          <span className={styles.label}>{rating.label}</span>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{
                width: `${(rating.value / rating.maxValue) * 100}%`,
                backgroundColor: index === 0 ? "#4AC776" : "#6683EB",
              }}
            />
          </div>
          <span className={styles.value}>{rating.value}</span>
        </div>
      ))}
    </div>
  );
};

export default RatingBars;
