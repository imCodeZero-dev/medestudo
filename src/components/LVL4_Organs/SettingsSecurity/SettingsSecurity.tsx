import { useEffect, useState } from "react";
import styles from "./SettingsSecurity.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import { SettingsSecurityProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";

const SettingsSecurity = ({
  control,
  handleSubmit,
  emailLoading,
  onSubmitPassword,
  handleSubmitPassword,
  onSubmitEmail,
  passwordLoading,
  watch,
}: SettingsSecurityProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { localeTitles, localeLables, localePlaceholders, localeButtons } =
    useLocale();

  return (
    <div className={styles.SettingsSecurity}>
      <div className="grid grid-cols-3 space-x-6 my-6">
        <form
          onSubmit={handleSubmit(onSubmitPassword)}
          className={`${styles["form"]} col-span-2`}
        >
          <div className={styles["SettingsSecurity-section-1"]}>
            <Text className={styles.heading}>
              {localeTitles.TITLE_PASSWORD}
            </Text>
            <div className="mt-4">
              <Input
                label={localeLables?.LABEL_CURRENT_PASSWORD}
                control={control}
                name="currentPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="password"
              />
            </div>

            <div className="grid grid-cols-2 space-x-2 my-4">
              <Input
                label={localeLables?.LABEL_NEW_PASSWORD}
                control={control}
                name="newPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="password"
              />
              <Input
                label={localeLables?.LABEL_CONFIRM_PASSWORD}
                control={control}
                name="confirmPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="password"
              />
            </div>
            <Button
              type="submit"
              loading={emailLoading}
              className="purpleBtn"
              onClick={handleSubmit(onSubmitPassword)}
            >
              {localeButtons?.BUTTON_UPDATE}
            </Button>
          </div>
        </form>

        <form
          onSubmit={handleSubmitPassword(onSubmitEmail)}
          className={styles["form"]}
        >
          <div className={styles["SettingsSecurity-section-2"]}>
            <div className="flex flex-col justify-between h-full items-start">
              <Text className={styles.heading}>{localeTitles.TITLE_EMAIL}</Text>
              <Input
                label={localeLables?.LABEL_EMAIL}
                control={control}
                name="email"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_EMAIL}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />

              <Button
                className="purpleBtn"
                type="submit"
                loading={passwordLoading}
              >
                {localeButtons?.BUTTON_CHANGE_IMAGE}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsSecurity;
