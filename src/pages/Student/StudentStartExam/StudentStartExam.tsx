import styles from "./StudentStartExam.module.css";
import { StudentStartExamProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";
import { useStudentStartExam } from "./hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";

import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import ViewQuestions from "../../../components/LVL4_Organs/ViewQuestions/ViewQuestions";
import ExamDetailsHead from "../../../components/LVL3_Cells/ExamDetailsHead/ExamDetailsHead";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import ViewQuestionsMock from "../../../components/LVL4_Organs/ViewQuestionsMock/ViewQuestionsMock";
import MockExamHead from "../../../components/LVL3_Cells/MockExamHead/MockExamHead";
import MockResultModal from "../../../components/LVL4_Organs/MockResultModal/MockResultModal";
import CreateResultModal from "../../../components/LVL4_Organs/CreateResultModal/CreateResultModal";

const StudentStartExam = ({}: StudentStartExamProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["student"]);
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
    examDetails,
    openEditModal,
    openDeleteExamModal,
    deleteExamModal,
    onDeleteExamConfirm,
    closeDeleteExamModal,
    getValues,
    allQuestions,
    selectAnswer,
    revealedAnswer,
    selectedAnswer,
    respondToNext,
    handleResultModalClose,
    resultModal,
    saveResult,
    showDetails,
    totalTime,
    handleResultModalOpen,
    getTotalTime,
    stopTimer,
    onCreateResult,
    createResultModal,
    handleOpenCreateResult,
    handleCloseCreateResult,
    createLoading,
  } = useStudentStartExam();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  return (
    <HomeLayout>
      <div className={styles["StudentStartExam"]}>
        {/* {StudentStartExam.map((flashcard) => ( */}
        <div className={styles["StudentStartExam-main"]}>
          <MockExamHead
            totalQuestions={allQuestions?.length}
            currentIndex={currentQuestionIndex}
            handleNext={handleNextQuestion}
            handlePrevious={handlePreviousQuestion}
            getTotalTime={getTotalTime}
            stopTimer={stopTimer}
          />
          <ViewQuestionsMock
            currentIndex={currentQuestionIndex}
            respondToNext={respondToNext}
            selectAnswer={selectAnswer}
            selectedAnswer={selectedAnswer}
            revealedAnswer={revealedAnswer}
            allQuestion={allQuestions}
            control={control}
            watch={watch}
            getValues={getValues}
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

        <ConfirmationModal
          open={deleteExamModal}
          cancelButtonText={localeButtons?.BUTTON_CANCEL}
          confirmButtonText={localeButtons?.BUTTON_DELETE}
          onConfirm={onDeleteExamConfirm}
          icon={<AlertIcon />}
          title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
          handleClose={closeDeleteExamModal}
          loading={deleteLoading}
        />

        <MockResultModal
          handleClose={handleResultModalClose}
          open={resultModal}
          control={control}
          loading={false}
          // loadMore={loadMoreFlashcards}
          timeSpent={totalTime}
          saveResult={handleOpenCreateResult}
          showDetails={showDetails}
        />

        <CreateResultModal
          control={control}
          onSubmit={onCreateResult}
          handleSubmit={handleSubmit}
          open={createResultModal}
          handleClose={handleCloseCreateResult}
          loading={createLoading}
          watch={watch}
          errors={errors}
        />
      </div>
    </HomeLayout>
  );
};

export default function StudentStartExamServices() {
  return (
    <StudentRoutes>
      <StudentStartExam />
    </StudentRoutes>
  );
}
