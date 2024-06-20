import styles from "./StudentFavorites.module.css";
import { StudentFavoritesProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
// import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";
import { useEffect, useState } from "react";

import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";

import { Flashcard } from "../../../utils/constants/DataTypes";

import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";

import StudentViewFlashcard from "../../../components/LVL4_Organs/StudentViewFlashcard/StudentViewFlashcard";
import ViewCardModal from "../../../components/LVL4_Organs/ViewCardModal/ViewCardModal";
import { useStudentFavorites } from "./hook";

const StudentFavorites = ({}: StudentFavoritesProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,
    handleNextFlashcard,
    handlePreviousFlashcard,
    allTags,
    currentFlashcardIndex,
    tags,
    allClasses,
    allClassesLoading,
    handleViewCardModalClose,
    openViewCardModal,
    handleViewCardModalOpen,
    toggleBookmark,
    bookmarkCards,
    getDetails,
    bookmarkCardsLoading,
  } = useStudentFavorites();

  const { localeText } = useLocale();
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["StudentFavorites"]}>
        <div className={styles["StudentFavorites-main"]}>
          <StudentViewFlashcard
            handleViewCardModalOpen={handleViewCardModalOpen}
            currentFlashcardIndex={currentFlashcardIndex}
            allFlashcards={bookmarkCards}
            control={control}
            setValue={setValue}
            allTags={allTags}
            tags={tags}
            handleNextFlashcard={handleNextFlashcard}
            handlePreviousFlashcard={handlePreviousFlashcard}
            handleSubmit={handleSubmit}
            loading={bookmarkCardsLoading}
            custom={false}
            toggleBookmark={toggleBookmark}
            revealAnswer
          />
        </div>

        <div className={styles["StudentFavorites-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/student/classes")}
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
        </div>

        <ViewCardModal
          handleClose={handleViewCardModalClose}
          open={openViewCardModal}
          control={control}
          tags={tags}
          handleNextFlashcard={handleNextFlashcard}
          handlePreviousFlashcard={handlePreviousFlashcard}
          currentFlashcardIndex={currentFlashcardIndex}
        />
      </div>
    </HomeLayout>
  );
};

export default function StudentFavoritesServices() {
  return (
    <StudentRoutes>
      <StudentFavorites />
    </StudentRoutes>
  );
}