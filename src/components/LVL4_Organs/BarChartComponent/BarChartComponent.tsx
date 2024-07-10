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
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  title,
  legends,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [chartData, setChartData] = useState(data);
  const [activeButton, setActiveButton] = useState<string>("1Y");
  const [lastMonthData, setLastMonthData] = useState<any>({});
  const [progress, setProgress] = useState<any>({});

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

  // const handle6MonthsClick = () => {
  //   if (data?.length < 12) {
  //     const filteredData = data?.slice(-6);
  //     setActiveButton("6M");

  //     setChartData(filteredData);
  //   } else if (data?.length < 6) {
  //     setChartData(data);
  //   } else return;
  // };

  // const handle1YearClick = () => {
  //   if (data?.length >= 12) {
  //     const filteredData = data?.slice(-12);
  //     setActiveButton("1Y");
  //     setChartData(filteredData);
  //   } else if (data?.length < 12) {
  //     setChartData(data);
  //   } else return;
  // };
  const handle6MonthsClick = () => {
    if (data?.length <= 6) {
      // If the array length is less than or equal to 6, return the entire array
      setChartData(data);
    } else {
      // Otherwise, return the last 6 elements
      const filteredData = data.slice(-6);
      setChartData(filteredData);
    }
    setActiveButton("6M");
  };

  const handle1YearClick = () => {
    if (data?.length <= 12) {
      // If the array length is less than or equal to 12, return the entire array
      setChartData(data);
    } else {
      // Otherwise, return the last 12 elements
      const filteredData = data.slice(-12);
      setChartData(filteredData);
    }
    setActiveButton("1Y");
  };

  // const calculatePercentageChange = (
  //   currentValue: number,
  //   lastValue: number
  // ) => {
  //   if (lastValue === 0) return 0;
  //   return ((currentValue - lastValue) / lastValue) * 100;
  // };
  const calculatePercentageChange = (
    currentValue: number,
    lastValue: number
  ) => {
    if (lastValue === 0) {
      if (currentValue === 0) {
        return 0;
      } else {
        return 100;
      }
    }
    return ((currentValue - lastValue) / lastValue) * 100;
  };

  useEffect(() => {
    console.log("chartData", data);
    // Convert the new data format to match the format expected by Recharts
    const formattedData = data.map((item: any, index: number) => ({
      name: item.month,
      Flashcards: item.decks,
      Questions: item.questions,
      differenceFlashcards: index > 0 ? item.decks - data[index - 1].decks : 0,
      differenceQuestions:
        index > 0 ? item.questions - data[index - 1].questions : 0,
    }));
    setLastMonthData(formattedData[formattedData.length - 1]);
    setChartData(formattedData);
    var deckProgress = calculatePercentageChange(
      formattedData[formattedData.length - 1]?.Flashcards,
      formattedData[formattedData.length - 2]?.Flashcards
    ).toFixed(2);
    var questionProgress = calculatePercentageChange(
      formattedData[formattedData.length - 1]?.Questions,
      formattedData[formattedData.length - 2]?.Questions
    ).toFixed(2);
    setProgress({ questionProgress, deckProgress });
    // console.log("formattedData", formattedData);
    console.log("formattedData", formattedData);
  }, [data, activeButton]);
  console.log("progress", progress);
  // console.log("chartData", chartData[chartData?.length - 2]);

  return (
    <div className={`${styles.chartContainer}`} ref={chartContainerRef}>
      <div className={styles.chartWrapper}>
        <div className={styles.buttonGroup}>
          <div className="flex space-x-2">
            <Text
              className={
                progress.deckProgress > 0
                  ? styles.deckText
                  : styles.deckTextDecrease
              }
            >
              {progress.deckProgress > 0 ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}
              {`  ${
                !isNaN(progress.deckProgress) ? progress.deckProgress : 0
              }%`}
            </Text>
            <Text
              className={
                progress.questionProgress > 0
                  ? styles.questionText
                  : styles.questionTextDecrease
              }
            >
              {" "}
              {progress.questionProgress > 0 ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}
              {`  ${
                !isNaN(progress.questionProgress)
                  ? progress.questionProgress
                  : 0
              }%`}
            </Text>
            {/* <Text className={styles.increaseText}>{`${chartData[chartData.length - 1]?.differenceQuestions}`}</Text> */}
          </div>

          <div className="flex-wrap space-y-2 justify-between flex lg:space-x-6">
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
        <BarChart
          className={styles.chartMain}
          width={containerWidth}
          height={250}
          data={chartData}
        >
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
          <Bar dataKey="Flashcards" fill="#FF900E" barSize={20} />
          <Bar dataKey="Questions" fill="#0030DD" barSize={20} />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartComponent;
