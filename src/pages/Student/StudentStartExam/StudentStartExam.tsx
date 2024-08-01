import styles from "./StudentStartExam.module.css";
import { StudentStartExamProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";
import { useStudentStartExam } from "./hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import ViewQuestionsMock from "../../../components/LVL4_Organs/ViewQuestionsMock/ViewQuestionsMock";
import MockExamHead from "../../../components/LVL3_Cells/MockExamHead/MockExamHead";
import MockResultModal from "../../../components/LVL4_Organs/MockResultModal/MockResultModal";
import CreateResultModal from "../../../components/LVL4_Organs/CreateResultModal/CreateResultModal";
import ResultDrawer from "../../../components/LVL4_Organs/ResultDrawer/ResultDrawer";

const StudentStartExam = ({}: StudentStartExamProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["student"]);

  const {
    control,
    errors,
    handleSubmit,
    watch,
    handleNextQuestion,
    handlePreviousQuestion,
    currentQuestionIndex,
    examQuestionsLoading,
    allQuestions,
    selectAnswer,
    revealedAnswer,
    selectedAnswer,
    respondToNext,
    handleResultModalClose,
    resultModal,
    totalTime,
    getTotalTime,
    stopTimer,
    onCreateResult,
    createResultModal,
    handleOpenCreateResult,
    handleCloseCreateResult,
    createLoading,
    finishExam,
    totalMarks,
    isDrawerOpen,
    handleCloseDrawer,
    handleOpenDrawer,
    allQuestionControl,
    practice,
    toggleReveal,
    questionTime,
  } = useStudentStartExam();
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
            practice={practice}
            questionTime={questionTime}
          />
          <ViewQuestionsMock
            toggleReveal={toggleReveal}
            practice={practice}
            control={control}
            watch={watch}
            allQuestion={allQuestions}
            handleNext={handleNextQuestion}
            handlePrevious={handlePreviousQuestion}
            currentIndex={currentQuestionIndex}
            loading={examQuestionsLoading}
            revealedAnswer={revealedAnswer}
            selectAnswer={selectAnswer}
            selectedAnswer={selectedAnswer}
            respondToNext={respondToNext}
            finishExam={finishExam}
          />
        </div>
        {/* ))} */}

        <MockResultModal
          practice={practice}
          handleClose={handleResultModalClose}
          open={resultModal}
          control={control}
          loading={false}
          // loadMore={loadMoreFlashcards}
          timeSpent={totalTime}
          saveResult={handleOpenCreateResult}
          showDetails={handleOpenDrawer}
          totalMarks={totalMarks}
          totalQuestion={allQuestions?.length}
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

        <ResultDrawer
          selectedAnswer={selectedAnswer}
          questions={allQuestions}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          control={allQuestionControl}
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
