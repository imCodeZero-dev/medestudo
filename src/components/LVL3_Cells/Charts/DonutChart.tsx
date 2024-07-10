import React from "react";
import styles from "./Chart.module.css";

interface Props {
  total: number;
  available: number;
  color: string;
  duration: string;
}

const DonutChart: React.FC<Props> = ({ total, available, color, duration }) => {
  const radius = 75; // Set the radius to your desired value
  const circumference = 2 * Math.PI * radius;
  const percentage = total === 0 ? 0 : (available / total) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="200" height="200">
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="transparent"
        stroke="#ddd"
        strokeWidth="10"
      />
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="transparent"
        stroke={color ? color : "#007bff"}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 100 100)"
      />
      <text
        className={styles["duration"]}
        x="100"
        y="70"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="16"
      >
        {duration}
      </text>
      <text
        className={styles["values"]}
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {available}/{total}
      </text>
    </svg>
  );
};

export default DonutChart;
