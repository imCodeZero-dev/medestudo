import React, { useEffect, useRef, useState } from "react";
import { DashboardReviewDeckProps } from "./@types";
import styles from "./DashboardReviewDeck.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import dayjs from "dayjs";
import { Menu, MenuItem } from "@mui/material";
import { Flashcard } from "../../../utils/constants/DataTypes";
import { TiDeleteOutline } from "react-icons/ti";
import { useDropdown } from "../../../utils/hooks/helper";
import { examCardData } from "../DashboardExams/@types";
import { TbCards } from "react-icons/tb";

const DashboardReviewDeck: React.FC<DashboardReviewDeckProps> = ({
  // data,
  play,
  minView,
  getDetails,
  openDeleteModal,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText, localeTitles } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div className={styles["DashboardReviewDeck"]}>
      <div className={styles["DashboardReviewDeck-left"]}>
        <IoIosPlayCircle size={40} color="#FF900E" className="cursor-pointer" />
        <Text className={styles["title"]}>
          {localeTitles?.TITLE_REVIEW_DECK}
        </Text>
      </div>
      <div
        className={styles["DashboardReviewDeck-right"]}
        // onClick={() => getDetails && getDetails(data?._id)}
      >
        <Text className={styles["cardNumber"]}>55</Text>
        <TbCards size={26} fill="#0030DD" />
      </div>
    </div>
  );
};

export default DashboardReviewDeck;
