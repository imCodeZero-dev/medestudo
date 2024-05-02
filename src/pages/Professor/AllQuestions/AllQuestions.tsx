import styles from "./AllQuestions.module.css";
import { AllQuestionsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useAllQuestions } from "./hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";
import { dummyFlashCards } from "../ProfessorDashboard/ProfessorDashboard";
import { useState } from "react";

import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";

import CreateQuestions from "../../../components/LVL4_Organs/CreateQuestions/CreateQuestions";
import { Class, Flashcard } from "../../../utils/constants/DataTypes";
import ViewFlashcards from "../../../components/LVL4_Organs/ViewFlashcards/ViewFlashcards";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import ViewQuestions from "../../../components/LVL4_Organs/ViewQuestions/ViewQuestions";

const AllQuestions = ({}: AllQuestionsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const location = useLocation();
  // const { id } = useParams();

  const {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,
    handleNextQuestion,
    handlePreviousQuestion,
    examQuestions,
    currentQuestionIndex,
    onDeleteConfirm,
    deleteModal,
    deleteLoading,
    handleDeleteOpen,
    handleDeleteClose,
    handleEditOpen,
    handleEditClose,
    enableEdit,
    onSubmitEdit,
    editLoading,
    examQuestionsLoading,
  } = useAllQuestions();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  return (
    <HomeLayout>
      <div className={styles["AllQuestions"]}>
        {/* {AllQuestions.map((flashcard) => ( */}
        <div className={styles["AllQuestions-main"]}>
          <ViewQuestions
            currentIndex={currentQuestionIndex}
            allQuestion={examQuestions}
            control={control}
            handleNext={handleNextQuestion}
            handlePrevious={handlePreviousQuestion}
            handleDeleteOpen={handleDeleteOpen}
            handleEditOpen={handleEditOpen}
            handleEditClose={handleEditClose}
            enableEdit={enableEdit}
            handleSubmit={handleSubmit}
            onSubmitEdit={onSubmitEdit}
            loading={examQuestionsLoading}
            editLoading={editLoading}
          />
        </div>
        {/* ))} */}

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

export default function AllQuestionsServices() {
  return (
    <ProfessorRoutes>
      <AllQuestions />
    </ProfessorRoutes>
  );
}
