import styles from "./StudentCustomClasses.module.css";
import { StudentCustomClassesProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useStudentCustomClasses } from "./hook";
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
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";

const StudentCustomClasses = ({}: StudentCustomClassesProps) => {
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

    customClasses,
    getDetailsFlashcards,
    startExam,
  } = useStudentCustomClasses();

  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["StudentCustomClasses"]}>
        {viewClass && (
          <div className={styles["StudentCustomClasses-main"]}>
            <div className={styles["StudentCustomClasses-head"]}>
              {/* <ModeDropdown setMode={setModeType} mode={modeType} /> */}
              {/* <div>
                <Button
                  rightIcon={<FaChevronRight />}
                  className="yellowButton-lessHeight"
                >
                  {localeButtons?.BUTTON_START_STUDYING}
                </Button>
              </div> */}
            </div>
            {customClasses?.length > 0 ? (
              <>
                {customClasses?.map((data: any, i: number) => (
                  <DashboardFlashcard
                    key={data?._id}
                    data={data}
                    getDetailsCustom={getDetails}
                    openDeleteModal={openDeleteModal}
                  />
                ))}
              </>
            ) : (
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_NO_CLASS_CREATED}
              </Text>
            )}
          </div>
        )}

        <div className={styles["StudentCustomClasses-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/student/flashcards/explore")}
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
                getDetailsCustom={getDetailsFlashcards}
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
                getDetailsExam={startExam}
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

export default function StudentCustomClassesServices() {
  return (
    <StudentRoutes>
      <StudentCustomClasses />
    </StudentRoutes>
  );
}
