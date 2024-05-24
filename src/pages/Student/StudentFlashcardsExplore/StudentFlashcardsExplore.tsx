import styles from "./StudentFlashcardsExplore.module.css";
import { StudentFlashcardsExploreProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useStudentFlashcardsExplore } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";
import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import { useState } from "react";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import { Flashcard } from "../../../utils/constants/DataTypes";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";
import { examCardData } from "../../../components/LVL3_Cells/DashboardExams/@types";
import { FaChevronRight } from "react-icons/fa6";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import ModeDropdown from "../../../components/LVL3_Cells/ModeDropdown/ModeDropdown";
import ExpandableFlashcard from "../../../components/LVL3_Cells/ExpandableFlashcard/ExpandableFlashcard";
import { dummyFlashCards } from "../StudentDashboard/StudentDashboard";

const StudentFlashcardsExplore = ({}: StudentFlashcardsExploreProps) => {
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
    allDecks,

    allClasses,
    getDetails,
    viewClass,
    openDeleteModal,
    deleteLoading,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
    allExams,
    getDetailsExam,
    setModeType,
    modeType,
  } = useStudentFlashcardsExplore();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["StudentFlashcardsExplore"]}>
        {viewClass && (
          <div className={styles["StudentFlashcardsExplore-main"]}>
            <div className={styles["StudentFlashcardsExplore-head"]}>
              <ModeDropdown setMode={setModeType} mode={modeType} />
              <div>
                <Button
                  rightIcon={<FaChevronRight />}
                  className="yellowButton-lessHeight"
                >
                  {localeButtons?.BUTTON_START_STUDYING}
                </Button>
              </div>
            </div>
            {allClasses?.slice(0, 8)?.map((data: any, i: number) => (
              <ExpandableFlashcard
                control={control}
                key={data?._id}
                data={data}
                // play
                getDetails={getDetails}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
        )}

        <div className={styles["StudentFlashcardsExplore-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/professor/classes")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {allClasses?.slice(0, 4)?.map((data: Flashcard, i: number) => (
              <DashboardFlashcard
                key={i}
                data={data}
                play
                minView
                getDetails={getDetails}
              />
            ))}
          </div>

          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_EXAMS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/professor/exams")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {allExams?.slice(0, 3)?.map((data: examCardData, i: number) => (
              <DashboardExams
                key={i}
                data={data}
                play
                getDetails={getDetailsExam}
              />
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
          filteredDecks={allDecks}
        />

        <ConfirmationModal
          open={deleteModal}
          cancelButtonText={localeButtons?.BUTTON_CANCEL}
          confirmButtonText={localeButtons?.BUTTON_DELETE}
          onConfirm={onDeleteConfirm}
          icon={<AlertIcon />}
          title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
          handleClose={handleDeleteClose}
          loading={deleteLoading}
        />
      </div>
    </HomeLayout>
  );
};

export default function StudentFlashcardsExploreServices() {
  return (
    <StudentRoutes>
      <StudentFlashcardsExplore />
    </StudentRoutes>
  );
}
