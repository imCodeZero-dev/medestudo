import styles from "./StudentAllFlashCards.module.css";
import { StudentAllFlashCardsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
// import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useStudentAllFlashCards } from "./hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";
import { useEffect, useState } from "react";

import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";

import CreateQuestions from "../../../components/LVL4_Organs/CreateQuestions/CreateQuestions";
import { Class, Flashcard } from "../../../utils/constants/DataTypes";
import ViewFlashcards from "../../../components/LVL4_Organs/ViewFlashcards/ViewFlashcards";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import GuageChart from "../../../components/LVL4_Organs/GuageChart/GuageChart";
import {
  dummyDecks,
  dummyFlashcardDetails,
} from "../StudentDashboard/StudentDashboard";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Button, ButtonGroup } from "@mui/material";
import ProgressIndicator from "../../../components/LVL4_Organs/ProgressIndicator/ProgressIndicator";
import StudentViewFlashcard from "../../../components/LVL4_Organs/StudentViewFlashcard/StudentViewFlashcard";
import CircularProgressChart from "../../../components/LVL3_Cells/CircularProgressChart/CircularProgressChart";
import RatingBars from "../../../components/LVL4_Organs/RatingBars/RatingBars";
import ViewCardModal from "../../../components/LVL4_Organs/ViewCardModal/ViewCardModal";
import dayjs from "dayjs";
import TimerComponent from "../../../components/LVL4_Organs/TimerComponent/TimerComponent";
import AllSetModal from "../../../components/LVL4_Organs/CheckpointModal/AllSetModal";
import CheckpointModal from "../../../components/LVL4_Organs/CheckpointModal/CheckpointModal";

const StudentAllFlashCards = ({}: StudentAllFlashCardsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [StudentAllFlashCards, setStudentAllFlashCards] =
    useState<boolean>(false);
  const location = useLocation();
  // const { id } = useParams();

  const {
    control,
    watch,
    handleNextFlashcard,
    handlePreviousFlashcard,
    allClassesLoading,
    allFlashcards,
    allFlashcardsLoading,
    allTags,
    currentFlashcardIndex,
    onDeleteConfirm,
    deleteModal,
    deleteLoading,
    handleDeleteOpen,
    handleDeleteClose,
    handleEditOpen,
    handleEditClose,
    enableEdit,
    tags,
    allClasses,
    getDetails,
    onSubmitEdit,
    handleSubmit,
    editLoading,
    setValue,
    deckDetails,
    mode,
    handleRatingChange,
    handleViewCardModalClose,
    openViewCardModal,
    handleViewCardModalOpen,
    allSetModal,
    handleAllSetModalClose,
    custom,
    toggleBookmark,
    flashcards,
    currentBatchIndex,
    checkpointModal,
    handleCheckpointModalClose,
    loadMoreFlashcards,
    getTotalTime,
    TotalTime,
    stopTimer,
    navigateToDashboard,
    key,
    revealAnswer,
    setRevealAnswer,
  } = useStudentAllFlashCards();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();
  const [activeSection, setActiveSection] = useState("thisRound");
  const [currentStep, setCurrentStep] = useState(2); // Example current step
  const totalSteps = allFlashcards?.length;
  // const [seconds, setSeconds] = useState(0);
  const ratings = [
    { label: "New", value: 15, maxValue: 20 },
    { label: "1", value: 3, maxValue: 20 },
    { label: "2", value: 4, maxValue: 20 },
    { label: "3", value: 5, maxValue: 20 },
    { label: "4", value: 2, maxValue: 20 },
    { label: "5", value: 1, maxValue: 20 },
  ];

  return (
    <HomeLayout>
      <div className={styles["StudentAllFlashCards"]}>
        {/* {StudentAllFlashCards.map((flashcard) => ( */}
        <div className={styles["StudentAllFlashCards-main"]}>
          <StudentViewFlashcard
            key={key}
            handleRatingChange={handleRatingChange}
            mode={mode}
            handleViewCardModalOpen={handleViewCardModalOpen}
            currentFlashcardIndex={currentFlashcardIndex}
            allFlashcards={flashcards}
            // allFlashCards={allFlashCards}
            deckDetails={deckDetails}
            control={control}
            setValue={setValue}
            allTags={allTags}
            tags={tags}
            handleNextFlashcard={handleNextFlashcard}
            handlePreviousFlashcard={handlePreviousFlashcard}
            handleDeleteOpen={handleDeleteOpen}
            handleEditOpen={handleEditOpen}
            handleEditClose={handleEditClose}
            enableEdit={enableEdit}
            handleSubmit={handleSubmit}
            onSubmitEdit={onSubmitEdit}
            loading={false}
            editLoading={editLoading}
            revealAnswer={revealAnswer}
            setRevealAnswer={setRevealAnswer}
            custom={custom}
            toggleBookmark={toggleBookmark}
          />
        </div>
        {/* ))} */}

        {custom ? (
          <div className={styles["StudentAllFlashCards-right"]}>
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

              {allClasses?.slice(0, 8)?.map((data: Class, i: number) => (
                <DashboardFlashcard
                  key={i}
                  data={data}
                  play
                  minView
                  getDetails={getDetails}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles["StudentAllFlashCards-right"]}>
            <div className={styles["right-section-main"]}>
              <div className="mb-6">
                <div className="flex space-x-3 mb-4">
                  <img
                    className={styles["classImg"]}
                    src={dummyFlashcardDetails[0]?.image}
                  />
                  <div className="flex flex-col justify-center">
                    <Text className={styles["classTitle"]}>
                      {dummyFlashcardDetails[0]?.title}
                    </Text>
                    <div className="flex items-center space-x-1">
                      <IoIosCheckmarkCircle fill="#1DB954" />
                      <Text className={styles.certifiedText}>
                        {localeLables.LABEL_MEDESTUDIO_CERTIFIED}
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Button
                      className={
                        styles[
                          activeSection === "thisRound"
                            ? "yellowButton"
                            : "secondaryBtn"
                        ]
                      }
                      onClick={() => setActiveSection("thisRound")}
                    >
                      {localeButtons.BUTTON_THIS_ROUND}
                    </Button>
                    <Button
                      className={
                        styles[
                          activeSection === "overall"
                            ? "yellowButton"
                            : "secondaryBtn"
                        ]
                      }
                      onClick={() => setActiveSection("overall")}
                    >
                      {localeButtons.BUTTON_OVERALL}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              {activeSection === "thisRound" ? (
                <>
                  <div className={styles["guageBox"]}>
                    <GuageChart colors={["#FF900E", "#ca6b89", "#9747FF"]} />
                  </div>

                  <div>
                    <ProgressIndicator
                      totalSteps={flashcards?.length}
                      currentStep={currentFlashcardIndex}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles["circularProgress"]}>
                    <CircularProgressChart
                      percentage={85}
                      size={177}
                      strokeWidth={16}
                    />
                  </div>
                  <RatingBars
                    ratings={ratings}
                    heading={localeTitles.TITLE_CONFIDENCE_GAINED}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Text className={styles["thisRound"]}>
                {localeText.TEXT_THIS_ROUND}
              </Text>
              {/* <Text className={styles["timer"]}> {formatTime(seconds)}</Text> */}
              <TimerComponent
                getTotaltime={getTotalTime}
                stopTimer={stopTimer}
              />
            </div>
          </div>
        )}
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

        <AllSetModal handleClose={handleAllSetModalClose} open={allSetModal} />
        <CheckpointModal
          handleClose={handleCheckpointModalClose}
          open={checkpointModal}
          control={control}
          loading={false}
          loadMore={loadMoreFlashcards}
          timeSpent={TotalTime}
          navigateToDashboard={navigateToDashboard}
        />

        <ViewCardModal
          handleClose={handleViewCardModalClose}
          open={openViewCardModal}
          revealAnswer={revealAnswer}
          setRevealAnswer={setRevealAnswer}
          control={control}
          tags={tags}
          handleNextFlashcard={handleNextFlashcard}
          handlePreviousFlashcard={handlePreviousFlashcard}
          handleRatingChange={handleRatingChange}
          mode={mode}
          currentFlashcardIndex={currentFlashcardIndex}
          allFlashcards={allFlashcards}
        />
      </div>
    </HomeLayout>
  );
};

export default function StudentAllFlashCardsServices() {
  return (
    <StudentRoutes>
      <StudentAllFlashCards />
    </StudentRoutes>
  );
}
