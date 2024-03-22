import React, { useEffect, useRef } from "react";
import { DashboardChartCardProps } from "./@types";
import styles from "./DashboardChartCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const DashboardChartCard: React.FC<DashboardChartCardProps> = ({
  title,
  value,
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
    </div>
  );
};

export default DashboardChartCard;
