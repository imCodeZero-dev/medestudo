import React, { useEffect, useRef } from "react";
import { ResultBarProps } from "./@types";
import styles from "./ResultBar.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";

import { DropdownMenu } from "../DashboardFlashcard/DashboardFlashcard";
import { useDropdown } from "../../../utils/hooks/helper";
import dayjs from "dayjs";

const ResultBar: React.FC<ResultBarProps> = ({
  data,
  play,
  getDetails,
  openDeleteModal,
  openEditModal,
}) => {
  const { localeText } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  const calculateMarks = (achievedMarks: number, totalQuestions: number) => {
    const percentage = (achievedMarks / totalQuestions) * 100;
    const result = percentage >= 50 ? "marksGood" : "marksBad";
    return result;
  };

  return (
    <div className={styles["ResultBar"]}>
      <div
        className={styles["ResultBar-left"]}
        onClick={() => getDetails && getDetails(data)}
      >
        <div className={styles["icon"]}>
          <MdMenuBook color="#0030DD" size={24} />
        </div>
        <div className={styles["ResultBar-left-main"]}>
          <Text className={styles["title"]}>{data?.title} • </Text>
          <div className={styles["details"]}>
            <div className={styles["details-section"]}>
              <FaRegCalendar size={9} color="#545961" />{" "}
              <Text className={styles["detailText"]}>
                {" "}
                {dayjs(data?.createdAt).format("DD/MM/YY - MM:HH A")}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomDiv}>
        <Text className={styles["CompletedTag"]}>Completed </Text>
        <Text
          className={
            styles[calculateMarks(data?.achievedMarks, data?.totalQuestions)]
          }
        >
          {data?.achievedMarks} /{data?.totalQuestions}{" "}
        </Text>
        <div className={styles["ResultBar-right"]} ref={dropdownRef}>
          <IoEllipsisHorizontal
            size={25}
            color="#2A2D31"
            className="cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <DropdownMenu openDeleteModal={openDeleteModal} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultBar;
