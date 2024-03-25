import React, { useEffect, useRef } from "react";
import { DashboardChartCardProps } from "./@types";
import styles from "./DashboardChartCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { HiUpload } from "react-icons/hi";

const DashboardChartCard: React.FC<DashboardChartCardProps> = ({
  title,
  value,
  // image,
  icon,
  text,
}) => {
  const { localeText } = useLocale();

  return (
    <div className={styles["DashboardChartCard"]}>
      <div className="w-full">
        <div className={styles["DashboardChartCard-top"]}>
          <Text className={styles["title"]}>{title}</Text>
        </div>

        <div className={styles["DashboardChartCard-bottom"]}>
          <div className="flex flex-col justify-evenly">
            <Text className={styles["value"]}>{value}</Text>
            <div className="flex">
              <HiUpload color={"#77D598"} />
              <Text className={styles["text"]}>{text}</Text>
            </div>
          </div>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardChartCard;
