import React from "react";
import Text from "../../LVL1_Atoms/Text/Text";
import styles from "./Chart.module.css";

interface props {
  total: number;
  available: number;
  color: string;
  duration: string;
}
const DonutChart = ({ total, available, color, duration }: props) => {
  // Calculate percentage of available funds
  const percentage = Math.round((available / total) * 100);

  // Calculate the strokeDashoffset to represent the percentage
  const radius = 75; // Set the radius to your desired value

  const circumference = 2 * Math.PI * 50; // Assuming radius of 50 for the donut
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="200" height="200">
      <circle
        cx="100"
        cy="100"
        r="75"
        fill="transparent"
        stroke="#ddd"
        strokeWidth="10"
      />
      <circle
        cx="100"
        cy="100"
        r="75"
        fill="transparent"
        stroke={color ? color : "#007bff"}
        strokeWidth="10"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />{" "}
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
