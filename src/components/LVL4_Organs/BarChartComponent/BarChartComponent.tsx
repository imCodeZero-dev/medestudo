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
import { BarChartComponentProps } from "./types";
import styles from "./BarChartComponent.module.css";
import Text from "../../LVL1_Atoms/Text/Text";

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  title,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

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
  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
      <div className={styles.chartWrapper}>
        <BarChart width={containerWidth} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend className={styles.legend} verticalAlign="top" align="right" />
          <Bar dataKey="Sales" fill="#FF900E" barSize={20} />
          <Bar dataKey="Expenses" fill="#0030DD" barSize={20} />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartComponent;
