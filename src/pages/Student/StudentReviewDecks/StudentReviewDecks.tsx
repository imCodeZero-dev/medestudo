import styles from "./StudentReviewDecks.module.css";
import { StudentReviewDecksProps } from "./types";
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
import ViewCardModal from "../../../components/LVL4_Organs/ViewCardModal/ViewCardModal";
import { useStudentReviewDecks } from "./hook";
import StudentReviewAllCards from "../../../components/LVL4_Organs/StudentReviewAllCards/StudentReviewAllCards";
import NoCardMsg from "../../../components/LVL2_Molecules/NoCardMsg/NoCardMsg";

const StudentReviewDecks = ({}: StudentReviewDecksProps) => {
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
    reviewDecks,
    getDetails,
    reviewDecksLoading,
    key,
    handleRatingChange,
    ratingLoading,
    bookmarkLoading,
  } = useStudentReviewDecks();

  const { localeText } = useLocale();
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["StudentReviewDecks"]}>
        <div className={styles["StudentReviewDecks-main"]}>
          {!reviewDecksLoading && reviewDecks?.length > 0 ? (
            <StudentReviewAllCards
              handleViewCardModalOpen={handleViewCardModalOpen}
              currentFlashcardIndex={currentFlashcardIndex}
              allFlashcards={reviewDecks}
              control={control}
              setValue={setValue}
              allTags={allTags}
              tags={tags}
              handleNextFlashcard={handleNextFlashcard}
              handlePreviousFlashcard={handlePreviousFlashcard}
              handleSubmit={handleSubmit}
              loading={reviewDecksLoading}
              custom={false}
              handleRatingChange={handleRatingChange}
              ratingLoading={ratingLoading}
              // toggleBookmark={toggleBookmark}
              revealAnswer
              key={key}
              bookmarkLoading={bookmarkLoading}
            />
          ) : (
            <NoCardMsg msg="No cards yet, please review some" />
          )}
        </div>

        <div className={styles["StudentReviewDecks-right"]}>
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
          key={key}
        />
      </div>
    </HomeLayout>
  );
};

export default function StudentReviewDecksServices() {
  return (
    <StudentRoutes>
      <StudentReviewDecks />
    </StudentRoutes>
  );
}
