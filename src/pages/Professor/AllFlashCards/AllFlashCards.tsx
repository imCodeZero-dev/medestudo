import styles from "./AllFlashCards.module.css";
import { AllFlashCardsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useAllFlashCards } from "./hook";
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

const AllFlashCards = ({}: AllFlashCardsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [AllFlashCards, setAllFlashCards] = useState<boolean>(false);
  const location = useLocation();
  // const { id } = useParams();

  const {
    control,
    watch,
    handleNextFlashcard,
    handlePreviousFlashcard,
    allFlashcards,
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
    allFlashcardsLoading,
  } = useAllFlashCards();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  return (
    <HomeLayout>
      <div className={styles["AllFlashCards"]}>
        {/* {allFlashcards.map((flashcard) => ( */}
        <div className={styles["AllFlashCards-main"]}>
          <ViewFlashcards
            currentFlashcardIndex={currentFlashcardIndex}
            allFlashcards={allFlashcards}
            control={control}
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
            loading={allFlashcardsLoading}
            editLoading={editLoading}
          />
        </div>
        {/* ))} */}

        <div className={styles["AllFlashCards-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text className={styles["viewMore"]}>
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

export default function AllFlashCardsServices() {
  return (
    <ProfessorRoutes>
      <AllFlashCards />
    </ProfessorRoutes>
  );
}
