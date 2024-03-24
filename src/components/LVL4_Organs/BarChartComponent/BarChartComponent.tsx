import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./BarChartComponent.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import { BarChartComponentProps } from "./types";

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  title,
  legends,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [chartData, setChartData] = useState(data);
  const [activeButton, setActiveButton] = useState<string>("1Y");

  useEffect(() => {
    const updateContainerWidth = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  const handle6MonthsClick = () => {
    const filteredData = data?.slice(-6);
    setActiveButton("6M");

    setChartData(filteredData);
  };

  const handle1YearClick = () => {
    const filteredData = data?.slice(-12);
    setActiveButton("1Y");
    setChartData(filteredData);
  };

  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
      <div className={styles.chartWrapper}>
        <div className={styles.buttonGroup}>
          <Text className={styles.increaseText}>5% Increase</Text>

          <div className="flex space-x-6">
            <div className="flex space-x-3">
              <div className="flex items-center space-x-1">
                <div className={styles.legendIndicator1}></div>
                <Text className={styles.legendText}>{legends[0]}</Text>
              </div>
              <div className="flex items-center space-x-1">
                <div className={styles.legendIndicator2}></div>
                <Text className={styles.legendText}>{legends[1]}</Text>
              </div>
            </div>
            <div className={styles.rightButtons}>
              <button
                onClick={handle6MonthsClick}
                className={`${styles.button} ${
                  activeButton === "6M" ? styles.activeBtn : styles.inactiveBtn
                }`}
              >
                6M
              </button>
              <button
                onClick={handle1YearClick}
                className={`${styles.button} ${
                  activeButton === "1Y" ? styles.activeBtn : styles.inactiveBtn
                }`}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
        <BarChart width={containerWidth} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#A2A9B3", fontSize: "12px" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#A2A9B3", fontSize: "12px" }}
          />
          <Tooltip />
          {/* <Legend className={styles.legend} verticalAlign="top" align="right" /> */}
          <Bar dataKey="Sales" fill="#FF900E" barSize={20} />
          <Bar dataKey="Expenses" fill="#0030DD" barSize={20} />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartComponent;
