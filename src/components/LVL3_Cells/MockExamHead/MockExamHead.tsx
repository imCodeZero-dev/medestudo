import React, { useEffect, useRef, useState } from "react";
import { MockExamHeadProps } from "./@types";
import styles from "./MockExamHead.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { useDropdown } from "../../../utils/hooks/helper";
import Pagination from "../Pagination/Pagination";

const MockExamHead: React.FC<MockExamHeadProps> = ({
  currentIndex,
  totalQuestions,
  handleNext,
  handlePrevious,
  getTotalTime,
  stopTimer,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText, localeButtons } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();
  const totalPages = totalQuestions;
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (!stopTimer) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      getTotalTime(timeLeft);
    }
  }, [stopTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className={styles["ExamsDetails-main-inner"]}>
      <div className={styles["main-inner-left"]}>
        <div className={"flex space-x-2 items-center mb-2"}>
          <Pagination
            currentPage={currentIndex + 1}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      </div>
      <div className={styles["main-inner-right"]}>
        <div className={styles["timeDiv"]}>
          <Text>
            {localeText.TEXT_TIME_LEFT}:{" "}
            <span className={styles.timeText}>{formatTime(timeLeft)}</span> Secs
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MockExamHead;
