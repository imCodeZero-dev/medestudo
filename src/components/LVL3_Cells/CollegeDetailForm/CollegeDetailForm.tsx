import React, { useEffect, useRef, useState } from "react";
import { CollegeDetailFormProps } from "./@types";
import styles from "./CollegeDetailForm.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import { totalYears } from "../../../utils/constants/constants";

const CollegeDetailForm: React.FC<CollegeDetailFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  loading,
  allInstitutes,
  moveBack,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const {
    localeText,
    localeTitles,
    localeButtons,
    localeLables,
    localePlaceholders,
  } = useLocale();
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className={styles["CollegeDetailForm"]}>
      <Text className={styles.title}>
        {localeTitles.TITLE_PLEASE_ENTER_FOLLOWING_DETAILS}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["selectDivs"]}>
          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {localeLables.LABEL_INSTITUTION}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>
            <CustomSelect
              placeholder="Select Institute"
              name="institution"
              control={control}
              options={allInstitutes}
            />
          </div>
          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {localeLables.LABEL_SELECT_YEAR}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>

            <CustomSelect
              name="year"
              control={control}
              options={totalYears}
              placeholder="Select Year"
            />
          </div>
        </div>

        <div className={styles["actionBtns"]} onClick={moveBack}>
          <Button type="button" className="primary">
            {localeButtons.BUTTON_BACK}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {localeButtons.BUTTON_NEXT}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CollegeDetailForm;
