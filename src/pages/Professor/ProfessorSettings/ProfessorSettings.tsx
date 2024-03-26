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

import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";

import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import { dummyFlashCards } from "../ProfessorDashboard/ProfessorDashboard";
import ProfileInfo from "../../../components/LVL4_Organs/ProfileInfo/ProfileInfo";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DynamicTabs from "../../../components/LVL3_Cells/Tabs/Tabs";
import SettingsSecurity from "../../../components/LVL4_Organs/SettingsSecurity/SettingsSecurity";

const ProfessorSettings = ({}: ProfessorSettingsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const {
    control,

    handleSubmit,

    watch,
    handleSubmitImage,
    onSubmitGeneral,
    onSubmitImage,
    handleSubmitEmail,
    handleSubmitPassword,
    onSubmitEmail,
    onSubmitPassword,
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
            generalLoading={false}
            handleSubmit={handleSubmit}
            handleSubmitImage={handleSubmitImage}
            imageLoading={false}
            onSubmitGeneral={onSubmitGeneral}
            onSubmitImage={onSubmitImage}
            watch={watch}
          />
        )}

        {value === 1 && (
          <SettingsSecurity
            control={control}
            emailLoading={false}
            passwordLoading={false}
            handleSubmit={handleSubmitEmail}
            handleSubmitPassword={handleSubmitPassword}
            onSubmitEmail={onSubmitEmail}
            onSubmitPassword={onSubmitPassword}
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
