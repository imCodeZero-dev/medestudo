import React, { useEffect, useRef } from "react";
import { StepProcessProps } from "./@types";
import styles from "./StepProcess.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const StepProcess: React.FC<StepProcessProps> = ({ steps }) => {
  const { localeText } = useLocale();

  return (
    <div className={styles.stepContainer}>
      {steps?.map((step, index) => (
        <div className={styles.step} key={index}>
          <div className={styles.stepNumberContainer}>
            <div
              className={`${styles.stepNumber} ${
                index === 0 ? styles.active : ""
              }`}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && <div className={styles.line} />}
          </div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepProcess;
