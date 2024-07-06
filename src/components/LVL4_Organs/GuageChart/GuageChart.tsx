import { useEffect, useState } from "react";
import styles from "./GuageChart.module.css";
import { GuageChartProps } from "./types";
import GaugeChart from "react-gauge-chart";
import Text from "../../LVL1_Atoms/Text/Text";

const GuageChart = ({ colors, percent }: GuageChartProps) => {
  return (
    <div className={styles["GuageChart"]}>
      {" "}
      <GaugeChart
        style={{ width: "100%" }}
        id="gauge-chart3"
        nrOfLevels={3}
        colors={colors}
        arcWidth={0.3}
        percent={percent}
        needleColor="#0026B1"
        needleBaseColor="#0026B1"
        textColor={"black"}

        // hideText={true} // If you want to hide the text
      />
      <Text className={styles["label"]}>Confidence Gained</Text>
    </div>
  );
};

export default GuageChart;
