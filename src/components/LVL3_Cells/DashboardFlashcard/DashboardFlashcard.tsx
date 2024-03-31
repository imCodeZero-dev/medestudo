import React, { useEffect, useRef } from "react";
import { DashboardFlashcardProps } from "./@types";
import styles from "./DashboardFlashcard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import dayjs from "dayjs";

const DashboardFlashcard: React.FC<DashboardFlashcardProps> = ({
  data,
  play,
  minView,
  getDetails,
}) => {
  const { localeText } = useLocale();

  return (
    <div className={styles["DashboardFlashcard"]}>
      <div
        className={styles["DashboardFlashcard-left"]}
        onClick={() => getDetails && getDetails(data?._id)}
      >
        <img className={styles["image"]} src={data?.deckId?.image} />
        <Text className={styles["title"]}>{data?.deckId?.name}</Text>
        {!minView && (
          <Text className={styles["date"]}>
            {" "}
            • {dayjs(data?.updatedAt).format("DD MMM, YYYY")}
          </Text>
        )}
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
