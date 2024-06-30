import React, { useEffect, useRef, useState } from "react";
import { GoalsFormProps } from "./@types";
import styles from "./GoalsForm.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";

const GoalsForm: React.FC<GoalsFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  loading,
  watch,
  whyChooseArray,
  toggleButtonWhyChoose,
  toggleButtonInterest,
  mainInteresetArray,
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

  // console.log("whyChoose", whyChooseArray);

  return (
    <div className={styles["GoalsForm"]}>
      <Text className={styles.title}>
        {localeTitles.TITLE_YOU_ARE_ONE_STEP_AWAY}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className="mt-6">
          <Text className={styles.subHeading}>
            {localeTitles.TITLE_WHY_DID_YOU_CHOOSE}
          </Text>
          <div className={styles.eachSection}>
            {whyChooseArray?.map((btn, index: number) => (
              <div key={index} className="min-w-44 mt-4">
                <Button
                  type="button"
                  className={!btn.active ? "inactiveButton" : "yellowButton"}
                  onClick={() => toggleButtonWhyChoose(index)}
                >
                  {btn.label}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Text className={styles.subHeading}>
            {localeTitles.TITLE_WHAT_IS_YOUR_MAIN_INTERES}
          </Text>
          <div className={styles.eachSection}>
            {mainInteresetArray?.map((btn, index: number) => (
              <div key={index} className="min-w-44 mt-4">
                <Button
                  type="button"
                  className={!btn.active ? "inactiveButton" : "yellowButton"}
                  onClick={() => toggleButtonInterest(index)}
                >
                  {btn.label}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["actionBtns"]}>
          <Button type="button" className="primary" onClick={moveBack}>
            {localeButtons.BUTTON_BACK}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {localeButtons.BUTTON_FINISH}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GoalsForm;
