import styles from "./ProfessorClasses.module.css";
import { ProfessorClassesProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useProfessorClasses } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";

import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";

import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import {
  dummyExams,
  dummyFlashCards,
} from "../ProfessorDashboard/ProfessorDashboard";
import { useState } from "react";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import { Flashcard } from "../../../utils/constants/DataTypes";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";

const ProfessorClasses = ({}: ProfessorClassesProps) => {
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
    handleSubmitFlashcard,
    controlFlashcard,
    allClasses,
    getDetails,
    viewClass,
    viewClassDetails,
    anchorEl,
    handleClickOptions,
    handleCloseOptions,
    openDeleteModal,
    deleteLoading,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
  } = useProfessorClasses();
  console.log("allDecks", allDecks);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["ProfessorClasses"]}>
        {viewClass && (
          <div className={styles["ProfessorClasses-main"]}>
            {allClasses?.slice(0, 8)?.map((data: any, i: number) => (
              <DashboardFlashcard
                key={data?._id}
                data={data}
                // play
                getDetails={getDetails}
                handleClickOptions={handleClickOptions}
                anchorEl={anchorEl}
                handleCloseOptions={handleCloseOptions}
                openDeleteModal={openDeleteModal}
              />
            ))}
          </div>
        )}

        {/* <div className={styles["ProfessorClasses-main"]}>
            <CreateQuestions
              setCreateFlashcard={setCreateFlashcard}
              control={controlFlashcard}
              handleSubmit={handleSubmitFlashcard}
              loading={false}
              onSubmit={onSubmitCreate}
            />
          </div> */}

        <div className={styles["ProfessorClasses-right"]}>
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
              <Text className={styles["viewMore"]}>
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {dummyExams?.slice(0, 3)?.map((data, i) => (
              <DashboardExams key={i} data={data} play />
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

export default function ProfessorClassesServices() {
  return (
    <ProfessorRoutes>
      <ProfessorClasses />
    </ProfessorRoutes>
  );
}
