import styles from "./ProfessorFlashcards.module.css";
import { ProfessorFlashcardsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useProfessorFlashcards } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import DashboardChartCard from "../../../components/LVL3_Cells/DashboardChartCard/DashboardChartCard";
import BarChartComponent from "../../../components/LVL4_Organs/BarChartComponent/BarChartComponent";
import flashcard1 from "../../../assets/Images/dashboard/flashcard1.png";
import flashcard2 from "../../../assets/Images/dashboard/flashcard2.png";
import flashcard3 from "../../../assets/Images/dashboard/flashcard3.png";
import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";
import flashcardsImg from "../../../assets/Images/dashboard/flashcards.png";
import examsImgs from "../../../assets/Images/dashboard/exams.png";
import { MdOutlineViewCarousel } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import { dummyFlashCards } from "../ProfessorDashboard/ProfessorDashboard";

const ProfessorFlashcards = ({}: ProfessorFlashcardsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const {
    control,

    handleSubmit,

    watch,
    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,
    handleOpenCreate,
  } = useProfessorFlashcards();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["ProfessorFlashcards"]}>
        <div className={styles["ProfessorFlashcards-main"]}>
          {dummyFlashCards?.slice(0, 8)?.map((data, i) => (
            <DashboardFlashcard key={i} data={data} play minView />
          ))}
        </div>

        <div className={styles["ProfessorFlashcards-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text className={styles["viewMore"]}>
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {dummyFlashCards?.slice(0, 8)?.map((data, i) => (
              <DashboardFlashcard key={i} data={data} play minView />
            ))}
          </div>
        </div>

        <CreateClassModal
          control={control}
          handleClose={handleCloseCreate}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitCreate}
          open={openCreate}
          loading={createLoading}
        />
      </div>
    </HomeLayout>
  );
};

export default function ProfessorFlashcardsServices() {
  return (
    <ProfessorRoutes>
      <ProfessorFlashcards />
    </ProfessorRoutes>
  );
}