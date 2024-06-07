import React, { useEffect, useRef, useState } from "react";
import { CircularProgressChartProps } from "./@types";
import styles from "./CircularProgressChart.module.css";
import useLocale from "../../../locales";

const CircularProgressChart: React.FC<CircularProgressChartProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  outOf,
  totalMarks,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const {
    localeText,
    localeTitles,
    localeButtons,
    localeLables,
    localePlaceholders,
  } = useLocale();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = (() => {
    if (percentage !== undefined) {
      return circumference - (percentage / 100) * circumference;
    }

    if (totalMarks !== undefined && outOf !== undefined) {
      return circumference - (totalMarks / outOf) * circumference;
    }

    // Return a default value or handle the undefined case appropriately
    return circumference;
  })();

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#27ae60", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#2980b9", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle
          className={styles.background}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.text}>
        {percentage && (
          <>
            <div className={styles.label}>Mastery</div>
            <div className={styles.percentage}>{percentage}%</div>
          </>
        )}

        {outOf && (
          <>
            <div className={styles.label}>Correct</div>
            <div
              className={styles.percentage}
            >{`${totalMarks} / ${outOf}`}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CircularProgressChart;
