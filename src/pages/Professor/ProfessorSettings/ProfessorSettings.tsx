import styles from "./ProfessorSettings.module.css";
import { ProfessorSettingsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useProfessorSettings } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";

import ProfileInfo from "../../../components/LVL4_Organs/ProfileInfo/ProfileInfo";
import { useState } from "react";
import DynamicTabs from "../../../components/LVL3_Cells/Tabs/Tabs";
import SettingsSecurity from "../../../components/LVL4_Organs/SettingsSecurity/SettingsSecurity";
import SettingsPrivacy from "../../../components/LVL4_Organs/SettingsPrivacy/SettingsPrivacy";

const ProfessorSettings = ({}: ProfessorSettingsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const {
    control,
    controlImage,
    controlPassword,
    handleSubmit,

    watch,
    watchImg,
    handleSubmitImage,
    onSubmitGeneral,
    onSubmitImage,
    handleSubmitPassword,
    onSubmitPassword,
    handleSubmitPrivacy,
    onSubmitPrivacy,
    generalLoading,
    profilePicLoading,
    passwordLoading,
  } = useProfessorSettings();
  console.log("cookies", cookies);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <HomeLayout>
      <div className={styles["ProfessorSettings"]}>
        <div className="px-[24px]">
          <DynamicTabs
            value={value}
            onChange={handleChange}
            tabLabels={[
              localeLables?.LABEL_PERSONAL_INFO,
              localeLables?.LABEL_SECURITY,
              localeLables?.LABEL_PRIVACY,
            ]}
          />
        </div>

        {value === 0 && (
          <ProfileInfo
            control={control}
            controlImage={controlImage}
            generalLoading={generalLoading}
            handleSubmit={handleSubmit}
            handleSubmitImage={handleSubmitImage}
            imageLoading={profilePicLoading}
            onSubmitGeneral={onSubmitGeneral}
            onSubmitImage={onSubmitImage}
            watch={watchImg}
          />
        )}

        {value === 1 && (
          <SettingsSecurity
            control={controlPassword}
            passwordLoading={passwordLoading}
            handleSubmitPassword={handleSubmitPassword}
            onSubmitPassword={onSubmitPassword}
          />
        )}
        {value === 2 && (
          <SettingsPrivacy
            control={control}
            loading={false}
            handleSubmit={handleSubmitPrivacy}
            onSubmit={onSubmitPrivacy}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default function ProfessorSettingsServices() {
  return (
    <ProfessorRoutes>
      <ProfessorSettings />
    </ProfessorRoutes>
  );
}
