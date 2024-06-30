import React, { useEffect, useRef, useState } from "react";
import { LoginFormProps } from "./@types";
import styles from "./LoginForm.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { GoogleLogin } from "@react-oauth/google";
import Input from "../../LVL1_Atoms/Input";
import { FaCircleUser, FaGoogle } from "react-icons/fa6";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "../../LVL1_Atoms/Button";
import Checkbox from "../../LVL1_Atoms/CheckBox";
import { useLocation } from "react-router-dom";

const LoginForm: React.FC<LoginFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  loadingLogin,
  openForgotModal,
  // professorPanel,
  switchToRegistration,
  loginGoogle,
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
  const pathName = useLocation().pathname;
  const professorPanel = pathName.includes("/professor");
  // console.log("professorPanel", professorPanel);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className={styles["LoginForm"]}>
      <Text className={styles.title}>
        {localeTitles?.TITLE_LOGIN_TO_YOUR_ACCOUNT}
      </Text>
      <Text className={styles.grayText}>
        {localeText?.TEXT_ENTER_DETAILS_TO_CONTINUE}
      </Text>
      <div className="my-2">
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
        <Button
          className="primary"
          leftIcon={<FaGoogle size={20} onClick={loginGoogle} />}
        >
          {localeButtons.BUTTON_LOGIN_WITH_GOOGLE}
        </Button>
        <Text className="text-[#6F7680] text-center mt-4">-OR-</Text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["inputDiv"]}>
          <Input
            label={localeLables?.LABEL_USERNAME}
            control={control}
            name="email"
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_USERNAME}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type="text"
            prefix={<FaCircleUser size={24} />}
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
        <div className="flex justify-between mb-10">
          <Checkbox
            control={control}
            label={localeLables?.LABEL_REMEMBER_ME}
            name="remember"
          />
          <Text className={styles["forgotText"]} onClick={openForgotModal}>
            {localeText?.TEXT_FORGOT_PASSWORD}
          </Text>
        </div>

        <Button type="submit" className="primaryActive" loading={loadingLogin}>
          {localeButtons.BUTTON_LOGIN}
        </Button>
      </form>
      {!professorPanel && (
        <Text className={styles.alreadyTxt}>
          {localeText.TEXT_NOT_YET_A_MEMBER}
          <span className={styles.loginTxt} onClick={switchToRegistration}>
            {localeText.TEXT_REGISTER_NOW}
          </span>
        </Text>
      )}
    </div>
  );
};

export default LoginForm;
