import React, { useEffect, useRef, useState } from "react";
import { RegistrationFormProps } from "./@types";
import styles from "./RegistrationForm.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { GoogleLogin } from "@react-oauth/google";
import Input from "../../LVL1_Atoms/Input";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "../../LVL1_Atoms/Button";

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  loadingRegister,
  switchToLogin,
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
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };
  const handleViewConfirmPassword = () => {
    setViewConfirmPassword(!viewConfirmPassword);
  };

  return (
    <div className={styles["RegistrationForm"]}>
      <Text className={styles.title}>
        {localeTitles?.TITLE_REGISTER_A_NEW_ACCOUNT}
      </Text>
      <Text className={styles.grayText}>
        {localeText?.TEXT_ENTER_DETAILS_TO_CONTINUE}
      </Text>
      <div className="my-2">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <Text className="text-[#6F7680] text-center mt-4">-OR-</Text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["inputDiv"]}>
          <Input
            label={localeLables?.LABEL_NAME}
            control={control}
            name="name"
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_FULL_NAME}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type="text"
            prefix={<FaCircleUser size={24} />}
          />
        </div>
        <div className={styles["inputDiv"]}>
          <Input
            label={localeLables?.LABEL_EMAIL}
            control={control}
            name="email"
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_EMAIL}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type="email"
            prefix={<MdEmail size={24} />}
          />
        </div>
        <div className={styles["inputDiv"]}>
          <Input
            label={localeLables?.LABEL_PASSWORD}
            control={control}
            name="password"
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type={!viewPassword ? "password" : "text"}
            prefix={<MdOutlineKey size={24} />}
            suffix={
              !viewPassword ? (
                <AiFillEyeInvisible
                  size={24}
                  color="#8b93a1"
                  onClick={handleView}
                />
              ) : (
                <AiFillEye size={24} color="#8b93a1" onClick={handleView} />
              )
            }
          />{" "}
        </div>
        <div className={styles["inputDiv"]}>
          <Input
            label={localeLables?.LABEL_CONFIRM_PASSWORD}
            control={control}
            name="confirmPassword"
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type={!viewConfirmPassword ? "password" : "text"}
            prefix={<MdOutlineKey size={24} />}
            suffix={
              !viewConfirmPassword ? (
                <AiFillEyeInvisible
                  size={24}
                  color="#8b93a1"
                  onClick={handleViewConfirmPassword}
                />
              ) : (
                <AiFillEye
                  size={24}
                  color="#8b93a1"
                  onClick={handleViewConfirmPassword}
                />
              )
            }
          />{" "}
        </div>

        <Button
          type="submit"
          className="primaryActive"
          loading={loadingRegister}
        >
          {localeButtons.BUTTON_SIGNUP}
        </Button>
      </form>

      <Text className={styles.alreadyTxt}>
        {localeText.TEXT_ALREADY_A_MEMBER}
        <span className={styles.loginTxt} onClick={switchToLogin}>
          {localeText.TEXT_LOGIN_NOW}
        </span>
      </Text>
    </div>
  );
};

export default RegistrationForm;
