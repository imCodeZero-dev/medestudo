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
import { useEffect, useState } from "react";
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
    handleCheckboxChange,
    handleCheckboxDecks,
    selectedDecks,
    customClasses,
    classId,
  } = useStudentFlashcardsExplore();

  const navigate = useNavigate();
  const navigateToStudy = (ids: any) => {
    navigate(`/student/flashcard/deck/flashcard/combine`, {
      state: { ids: ids, classIds: classId, mode: modeType },
    });
  };

  return (
    <HomeLayout>
      <div className={styles["StudentFlashcardsExplore"]}>
        {viewClass && (
          <div className={styles["StudentFlashcardsExplore-main"]}>
            <div className={styles["StudentFlashcardsExplore-head"]}>
              <ModeDropdown setMode={setModeType} mode={modeType} />
              <div>
                <Button
                  disabled={selectedDecks?.length < 1}
                  rightIcon={<FaChevronRight />}
                  className="yellowButton-lessHeight"
                  onClick={() => navigateToStudy(selectedDecks)}
                >
                  {localeButtons?.BUTTON_START_STUDYING}
                </Button>
              </div>
            </div>
            {allClasses?.map((data: any, i: number) => (
              <ExpandableFlashcard
                control={control}
                key={data?._id}
                data={data}
                // play
                getDetails={getDetails}
                openDeleteModal={openDeleteModal}
                onCheckboxChange={handleCheckboxChange}
                handleCheckboxDecks={handleCheckboxDecks}
                selectedDecks={selectedDecks}
              />
            ))}
          </div>
        )}

        <div className={styles["StudentFlashcardsExplore-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_CUSTOM_FLASHCARDS}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/student/flashcards/custom")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {customClasses?.slice(0, 4)?.map((data: any, i: number) => (
              <DashboardFlashcard
                key={data?._id}
                data={data}
                getDetailsCustom={getDetails}
                openDeleteModal={openDeleteModal}
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
                onClick={() => navigate("/student/exams/mock")}
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
          custom
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
