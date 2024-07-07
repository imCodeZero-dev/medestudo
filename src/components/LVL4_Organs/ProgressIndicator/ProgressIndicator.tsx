import { useEffect, useState } from "react";
import styles from "./ProgressIndicator.module.css";
import { ProgressIndicatorProps } from "./types";

const ProgressIndicator = ({
  currentStep,
  totalSteps,
  rate,
}: ProgressIndicatorProps) => {
  const getColor = (rate: number): string => {
    switch (rate) {
      case 1:
        return "#cc5200";
      case 2:
        return "#ff8433";
      case 3:
        return "#ffc299";
      case 4:
        return "#4ac776";
      case 5:
        return "#1db954";
      default:
        return "#ccc";
    }
  };
  return (
    <div className={styles.progressIndicator}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`${styles.circle} ${
            index < currentStep ? styles.completed : ""
          } ${index === currentStep ? styles.current : ""}`}
          style={{ backgroundColor: getColor(rate[index]) }}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
