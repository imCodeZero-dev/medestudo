import styles from "./ProfessorDashboard.module.css";
import { ProfessorDashboardProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useProfessorDashboard } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import DashboardChartCard from "../../../components/LVL3_Cells/DashboardChartCard/DashboardChartCard";
import BarChartComponent from "../../../components/LVL4_Organs/BarChartComponent/BarChartComponent";

const ProfessorDashboard = ({}: ProfessorDashboardProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const {
    control,

    handleSubmit,

    watch,
  } = useProfessorDashboard();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  const dummyData = [
    { name: "January", Sales: 65, Expenses: 28 },
    { name: "February", Sales: 59, Expenses: 48 },
    { name: "March", Sales: 80, Expenses: 40 },
    { name: "April", Sales: 81, Expenses: 19 },
    { name: "May", Sales: 56, Expenses: 86 },
  ];

  const dsahboardCards = [
    { title: localeTitles?.TITLE_FLASHCARDS_CREATED, value: 33 },
    { title: localeTitles?.TITLE_PASTEXAMS_CREATED, value: 5 },
    { title: localeTitles?.TITLE_QUESTIONS_CREATED, value: 126 },
  ];

  return (
    <HomeLayout>
      <div className={styles["ProfessorDashboard"]}>
        <div className={styles["ProfessorDashboard-main"]}>
          <div className={styles["ProfessorDashboard-cards"]}>
            {dsahboardCards?.map((data, i) => (
              <DashboardChartCard
                title={data?.title}
                value={data?.value} // Example value representing progress
              />
            ))}
          </div>

          <div className={styles["ProfessorDashboard-section"]}>
            <Text className={styles["sectionHeading"]}>
              {localeTitles?.TITLE_FLASHCARDS_AND_QUESTIONS_CREATED}
            </Text>
            <BarChartComponent data={dummyData} />
          </div>
        </div>
        <div className={styles["ProfessorDashboard-right"]}></div>
      </div>
    </HomeLayout>
  );
};

export default function ProfessorDashboardServices() {
  return (
    <ProfessorRoutes>
      <ProfessorDashboard />
    </ProfessorRoutes>
  );
}
