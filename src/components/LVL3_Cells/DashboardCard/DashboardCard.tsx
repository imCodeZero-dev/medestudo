import React from "react";
import { DashboardCardProps } from "./@types";
import styles from "./DashboardCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, img }) => {
  const { localeText } = useLocale();

  return (
    <div className={styles["DashboardCard"]}>
      <div className={styles["DashboardCard-top"]}>
        <Text className={styles["title"]}>{title}</Text>

        {/* <CiMenuKebab /> */}

        {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {langs.map((language) => (
          <MenuItem
            key={language?.code}
            onClick={() => handleLanguageChange(language?.code)}
          >
            {language?.label}
          </MenuItem>
        ))}
      </Menu> */}
      </div>

      <div className={styles["DashboardCard-bottom"]}>
        <div>
          <Text className={styles["value"]}>{value}</Text>
          <Text className={styles["updatedText"]}>
            {localeText?.TEXT_UPDATE_TODAY}
          </Text>
        </div>

        {img && <img src={img} />}
      </div>
    </div>
  );
};

export default DashboardCard;
