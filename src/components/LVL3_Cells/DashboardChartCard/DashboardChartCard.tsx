import React, { useEffect, useRef } from "react";
import { DashboardChartCardProps } from "./@types";
import styles from "./DashboardChartCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const DashboardChartCard: React.FC<DashboardChartCardProps> = ({
  title,
  value,
  image,
}) => {
  const { localeText } = useLocale();

  return (
    <div className={styles["DashboardChartCard"]}>
      <div>
        <div className={styles["DashboardChartCard-top"]}>
          <Text className={styles["title"]}>{title}</Text>
        </div>

        <div className={styles["DashboardChartCard-bottom"]}>
          <div>
            <Text className={styles["value"]}>{value}</Text>
          </div>
        </div>
      </div>
      <img src={image} className="w-14 object-contain" />
    </div>
  );
};

export default DashboardChartCard;
