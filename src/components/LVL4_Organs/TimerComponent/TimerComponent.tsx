import { useEffect, useState } from "react";
import styles from "./TimerComponent.module.css";
// import { TimerComponentProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import { TimerComponentProps } from ".";
import useLocale from "../../../locales";

const TimerComponent = ({}: TimerComponentProps) => {
  const [seconds, setSeconds] = useState(0);
  const { localeText } = useLocale();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return <Text className={styles["timer"]}>{formatTime(seconds)}</Text>;
};

export default TimerComponent;
