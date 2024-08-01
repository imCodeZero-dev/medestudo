// import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import Input from "../../components/LVL1_Atoms/Input";
import Text from "../../components/LVL1_Atoms/Text/Text";
import AuthLayout from "../../components/LVL5_Layouts/AuthLayout/AuthLayout";
import styles from "./LoginPage.module.css";
import useLocale from "../../locales";
import { useLoginPage } from "./hook";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import ForgotPasswordModal from "../../components/LVL4_Organs/ForgotPasswordModal/ForgotPasswordModal";
import RegistrationForm from "../../components/LVL3_Cells/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LVL3_Cells/LoginForm/LoginForm";


// import { useNavigate } from "react-router-dom";
// import { useLoginPage } from "./hook";
// import { loginProps } from "./types";

const LoginPage = (props: any) => {
  const {
    localeButtons,
    localeTitles,
    localeLables,
    localePlaceholders,
    localeText,
  } = useLocale();
  const {
    control,
    handleSubmit,
    onSubmit,

    loadingLogin,
    forgotLoading,
    forgotModal,
    handleForgotClose,
    onSubmitForgotEmail,
    openForgotModal,
    forgotSteps,
    onSubmitOTP,
    onSubmitPassword,
    resendOtp,
    validOtp,
    onSubmitRegistration,
    switchToRegistration,
    switchToLogin,
    authType,
    loadingRegister,
    loginGoogle,
    registerGoogle,
  } = useLoginPage();


  return (
    <div className={styles["login"]}>
      <div className={styles[""]}></div>
      {authType === "login" ? (
        <LoginForm
          control={control}
          handleSubmit={handleSubmit}
          loadingLogin={loadingLogin}
          onSubmit={onSubmit}
          openForgotModal={openForgotModal}
          loginGoogle={loginGoogle}
          // professorPanel
          switchToRegistration={switchToRegistration}
        />
      ) : (
        <RegistrationForm
          control={control}
          handleSubmit={handleSubmit}
          loadingRegister={loadingRegister}
          onSubmit={onSubmitRegistration}
          switchToLogin={switchToLogin}
          loginGoogle={registerGoogle}
        />
      )}
      {/* <div className={styles["login-main"]}>
        <div className={styles["login-main-text"]}>
          <Text className={styles["h2Heading"]}>
            {localeTitles.TITLE_LOGIN_TO_YOUR_ACCOUNT}
          </Text>
          <Text className="text-center">{localeText.TEXT_ENTER_DETAILS}</Text>
        </div>

        <div className="my-4">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Text className="text-[#6F7680] text-center mt-6">-OR-</Text>
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

          <Button
            type="submit"
            className="primaryActive"
            loading={loadingLogin}
          >
            {localeButtons.BUTTON_LOGIN}
          </Button>
        </form>
      </div> */}
      <div className={styles["loginBottom"]}>
        <Text className={styles["labelText"]}>
          {localeLables?.LABEL_PRIVACY_POLICY}
        </Text>
        <Text className={styles["labelText"]}>
          {localeLables?.LABEL_COPYRIGHT}
        </Text>
      </div>

      <ForgotPasswordModal
        control={control}
        forgotSteps={forgotSteps}
        handleClose={handleForgotClose}
        handleSubmit={handleSubmit}
        onSubmitEmail={onSubmitForgotEmail}
        onSubmitOTP={onSubmitOTP}
        onSubmitPassword={onSubmitPassword}
        open={forgotModal}
        loading={forgotLoading}
        resendOtp={resendOtp}
        validOtp={validOtp}
        // watch={watch}
      />
    </div>
  );
};

// export default LoginPage;

export default function LoginServices() {
  return (
    // <AdminRoutes>
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
    // </AdminRoutes>
  );
}
