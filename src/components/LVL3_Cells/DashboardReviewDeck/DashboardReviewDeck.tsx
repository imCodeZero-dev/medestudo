import React, { useEffect, useRef, useState } from "react";
import { DashboardReviewDeckProps } from "./@types";
import styles from "./DashboardReviewDeck.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

import { IoIosPlayCircle } from "react-icons/io";

import { useDropdown } from "../../../utils/hooks/helper";
import { TbCards } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const DashboardReviewDeck: React.FC<DashboardReviewDeckProps> = ({
  redirectTo,
  total,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText, localeTitles } = useLocale();
  const navigate = useNavigate();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div className={styles["DashboardReviewDeck"]}>
      <div className={styles["DashboardReviewDeck-left"]}>
        <IoIosPlayCircle
          size={40}
          color="#FF900E"
          className="cursor-pointer"
          onClick={() => navigate(redirectTo)}
        />
        <Text className={styles["title"]}>
          {localeTitles?.TITLE_REVIEW_DECK}
        </Text>
      </div>
      <div
        className={styles["DashboardReviewDeck-right"]}
        // onClick={() => getDetails && getDetails(data?._id)}
      >
        <Text className={styles["cardNumber"]}>{total}</Text>
        <TbCards size={26} fill="#0030DD" />
      </div>
    </div>
  );
};

export default DashboardReviewDeck;
