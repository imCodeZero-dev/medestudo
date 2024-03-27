import { useEffect, useState } from "react";
import styles from "./SettingsPrivacy.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import { SettingsPrivacyProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import SwitchController from "../../LVL2_Molecules/SwitchController/SwitchController";
import { privacySettings } from "../../../utils/constants/constants";

const SettingsPrivacy = ({
  control,
  handleSubmit,
  loading,
  onSubmit,
  watch,
}: SettingsPrivacyProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    localeTitles,
    localeLables,
    localePlaceholders,
    localeButtons,
    localeText,
  } = useLocale();

  return (
    <div className={styles.SettingsPrivacy}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles["form"]} `}>
        <div className={styles["SettingsPrivacy-section"]}>
          <Text className={styles.heading}>{localeTitles.TITLE_PRIVACY}</Text>
          <div className="mt-4">
            {privacySettings(localeLables, localeText).map((option, index) => (
              <SwitchController
                name={option.value}
                control={control}
                label={option?.label}
                text={option?.text}
              />
            ))}
          </div>
          <Button
            type="submit"
            loading={loading}
            className="purpleBtn"
            onClick={handleSubmit(onSubmit)}
          >
            {localeButtons?.BUTTON_UPDATE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPrivacy;
