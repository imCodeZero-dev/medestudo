import { useEffect, useState } from "react";
import styles from "./SettingsSecurity.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { SettingsSecurityProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SettingsSecurity = ({
  control,
  onSubmitPassword,
  handleSubmitPassword,
  passwordLoading,
  watch,
}: SettingsSecurityProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { localeTitles, localeLables, localePlaceholders, localeButtons } =
    useLocale();
  const [viewCurrentPassword, setViewCurrentPassword] =
    useState<boolean>(false);
  const [viewNewPassword, setViewNewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);

  const handleViewCurrent = () => {
    setViewCurrentPassword(!viewCurrentPassword);
  };

  const handleViewNew = () => {
    setViewNewPassword(!viewNewPassword);
  };
  const handleViewConfirm = () => {
    setViewConfirmPassword(!viewConfirmPassword);
  };

  return (
    <div className={styles.SettingsSecurity}>
      <div className="my-6">
        <form
          onSubmit={handleSubmitPassword(onSubmitPassword)}
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
                type={!viewCurrentPassword ? "password" : "text"}
                suffix={
                  !viewCurrentPassword ? (
                    <AiFillEyeInvisible
                      size={24}
                      color="#8b93a1"
                      onClick={handleViewCurrent}
                    />
                  ) : (
                    <AiFillEye
                      size={24}
                      color="#8b93a1"
                      onClick={handleViewCurrent}
                    />
                  )
                }
              />
            </div>

            <div className="grid md:grid-cols-2 md:space-x-2 space-y-3 md:space-y-0 my-4">
              <Input
                label={localeLables?.LABEL_NEW_PASSWORD}
                control={control}
                name="newPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type={!viewNewPassword ? "password" : "text"}
                suffix={
                  !viewNewPassword ? (
                    <AiFillEyeInvisible
                      size={24}
                      color="#8b93a1"
                      onClick={handleViewNew}
                    />
                  ) : (
                    <AiFillEye
                      size={24}
                      color="#8b93a1"
                      onClick={handleViewNew}
                    />
                  )
                }
              />
              <Input
                label={localeLables?.LABEL_CONFIRM_PASSWORD}
                control={control}
                name="confirmPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type={!viewConfirmPassword ? "password" : "text"}
                suffix={
                  !viewConfirmPassword ? (
                    <AiFillEyeInvisible
                      size={24}
                      color="#8b93a1"
                      onClick={handleViewConfirm}
                    />
                  ) : (
                    <AiFillEye
                      size={24}
                      color="#8b93a1"
                      onClick={handleViewConfirm}
                    />
                  )
                }
              />
            </div>
            <Button
              type="submit"
              loading={passwordLoading}
              className="purpleBtn"
              onClick={handleSubmitPassword(onSubmitPassword)}
            >
              {localeButtons?.BUTTON_UPDATE}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsSecurity;
