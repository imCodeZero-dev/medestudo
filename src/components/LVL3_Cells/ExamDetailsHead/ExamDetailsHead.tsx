import React, { useEffect, useRef, useState } from "react";
import { ExamDetailsHeadProps } from "./@types";
import styles from "./ExamDetailsHead.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { useDropdown } from "../../../utils/hooks/helper";
import { GoQuestion } from "react-icons/go";
import { BsBuildings } from "react-icons/bs";
import { FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { Button } from "../../LVL1_Atoms/Button";

const ExamDetailsHead: React.FC<ExamDetailsHeadProps> = ({
  examsDetails,
  openEditModal,
  openDeleteModal,
  totalQuestions,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText, localeButtons } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div className={styles["ExamsDetails-main-inner"]}>
      <div className={styles["main-inner-left"]}>
        <div className={"flex space-x-2 items-center mb-2"}>
          <Text className={styles["title"]}>{examsDetails?.title}</Text>
          {/* <BiSolidPencil
            onClick={() => openEditModal(examsDetails)}
            size={22}
            color="#3359E4"
            className="cursor-pointer"
            // onClick={() => openEditModal && openEditModal(data)}
          /> */}
        </div>
        <div className={styles["details"]}>
          <div className={styles["details-section"]}>
            <GoQuestion size={12} color="#545961" />{" "}
            <Text className={styles["detailText"]}>{totalQuestions}</Text>
          </div>
          <div className={styles["details-section"]}>
            <BsBuildings size={12} color="#545961" />{" "}
            <Text className={styles["detailText"]}>
              {examsDetails?.institute}
            </Text>
          </div>
          <div className={styles["details-section"]}>
            <FaRegClock size={12} color="#545961" />{" "}
            <Text className={styles["detailText"]}> {examsDetails?.time}</Text>
          </div>
          <div className={styles["details-section"]}>
            <FaRegCalendar size={12} color="#545961" />{" "}
            <Text className={styles["detailText"]}> {examsDetails?.year}</Text>
          </div>
        </div>
      </div>
      <div className={styles["main-inner-right"]}>
        <Button
          className="yellowButton-lessHeight"
          onClick={() => openDeleteModal(examsDetails?._id)}
        >
          {localeButtons?.BUTTON_DELETE_EXAM}
        </Button>
        <Button
          className="primaryActive-lessHeight"
          onClick={() => openEditModal(examsDetails)}
        >
          {localeButtons?.BUTTON_EDIT}
        </Button>
      </div>
    </div>
  );
};

export default ExamDetailsHead;
