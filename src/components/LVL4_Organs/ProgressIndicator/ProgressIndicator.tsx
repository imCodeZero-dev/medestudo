import { useEffect, useState } from "react";
import styles from "./ProgressIndicator.module.css";
import { ProgressIndicatorProps } from "./types";

const ProgressIndicator = ({ currentStep,totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className={styles.progressIndicator}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`${styles.circle} ${
            index < currentStep ? styles.completed : ""
          } ${index === currentStep ? styles.current : ""}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
