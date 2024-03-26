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
  } = useProfessorSettings();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["ProfessorSettings"]}>
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
