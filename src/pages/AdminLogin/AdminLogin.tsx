// import React, { useState } from "react";
import styles from "./AdminLogin.module.css";
// import { useNavigate } from "react-router-dom";
// import { useLoginPage } from "./hook";
// import { loginProps } from "./types";
import logoImg from "../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import useLocale from "../../locales";
import Text from "../../components/LVL1_Atoms/Text/Text";
import Input from "../../components/LVL1_Atoms/Input";
import { useAdminLogin } from "./hook";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import Checkbox from "../../components/LVL1_Atoms/CheckBox";
import { Button } from "../../components/LVL1_Atoms/Button";
import handImg from "../../assets/Images/Auth/Group 8.png";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../../components/LVL3_Cells/LangaugeDropdown/LangaugeDropdown";

const AdminLogin = ({}) => {
  const {
    localeTitles,
    localeText,
    localePlaceholders,
    localeLables,
    localeButtons,
  } = useLocale();
  // const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleView = () => {
    setViewPassword(!viewPassword);
  };
  const { control, handleSubmit, onSubmit, loadingLogin } = useAdminLogin();

  return (
    <div className={styles["AdminLogin"]}>
      <div className={styles["AdminLogin-header"]}>
        <img
          src={logoImg}
          className={styles["logo"]}
          onClick={() => navigate("/")}
        />
          <LanguageDropdown />
      </div>
      <div className={styles["AdminLogin-main"]}>
        <div className={styles["AdminLogin-main-text"]}>
          <Text className={styles["h2Heading"]}>
            {localeTitles.WELCOME_ADMIN} <img src={handImg} />
          </Text>
          <Text className="text-center">{localeText.TEXT_ENTER_DETAILS}!</Text>
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
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_USERNAME}
              preDefinedClassName="inputField"
              preDefinedWrapClassName="inputField-wrap"
              prefix={<MdOutlineKey size={24} />}
              type={!viewPassword ? "password" : "text"}
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
            {/* <Text className={styles["forgotText"]}>
              {localeText?.TEXT_FORGOT_PASSWORD}
            </Text> */}
          </div>

          <Button
            type="submit"
            className="primaryActive"
            loading={loadingLogin}
          >
            {localeButtons.BUTTON_LOGIN}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
