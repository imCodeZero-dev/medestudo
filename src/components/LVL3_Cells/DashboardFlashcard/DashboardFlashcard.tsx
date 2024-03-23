import React, { useEffect, useRef } from "react";
import { DashboardFlashcardProps } from "./@types";
import styles from "./DashboardFlashcard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";

const DashboardFlashcard: React.FC<DashboardFlashcardProps> = ({
  data,
  play,
  minView,
}) => {
  const { localeText } = useLocale();

  return (
    <div className={styles["DashboardFlashcard"]}>
      <div className={styles["DashboardFlashcard-left"]}>
        <img className={styles["image"]} src={data?.image} />
        <Text className={styles["title"]}>{data?.title}</Text>
        {!minView && <Text className={styles["date"]}> • {data?.date}</Text>}
      </div>
      <div className={styles["DashboardFlashcard-right"]}>
        <BiSolidPencil size={25} color="#2A2D31" className="cursor-pointer" />
        {play ? (
          <IoIosPlayCircle
            size={32}
            color="#FF900E"
            className="cursor-pointer"
          />
        ) : (
          <IoEllipsisHorizontal
            size={25}
            color="#2A2D31"
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardFlashcard;
