import styles from "./CreateFlashcard.module.css";
import { CreateFlashcardProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useCreateFlashcard } from "./hook";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";

import flashcard1 from "../../../assets/Images/dashboard/flashcard1.png";

import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";

import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import { dummyFlashCards } from "../ProfessorDashboard/ProfessorDashboard";
import { useState } from "react";

import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";

import CreateDeckModal from "../../../components/LVL4_Organs/CreateDeckModal/CreateDeckModal";
import CreateQuestions from "../../../components/LVL4_Organs/CreateQuestions/CreateQuestions";

const CreateFlashcard = ({}: CreateFlashcardProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(false);
  const location = useLocation();

  const {
    control,

    handleSubmit,

    watch,
    handleCloseCreate,
    onSubmitCreate,
    setCreateModal,
    createModal,
    createLoading,
    // classDetails,
    setValue,
    allTags,
  } = useCreateFlashcard();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  return (
    <HomeLayout>
      <div className={styles["CreateFlashcard"]}>
        <div className={styles["CreateFlashcard-main"]}>
          <CreateQuestions
            setCreateFlashcard={setCreateFlashcard}
            control={control}
            handleSubmit={handleSubmit}
            loading={false}
            onSubmit={onSubmitCreate}
            allTags={allTags}
          />
        </div>

        <div className={styles["CreateFlashcard-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text className={styles["viewMore"]}>
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {dummyFlashCards?.slice(0, 8)?.map((data, i) => (
              <DashboardFlashcard key={i} data={data} play minView />
            ))}
          </div>
        </div>
      </div>
      {/* <CreateDeckModal
        setValue={setValue}
        watch={watch}
        control={control}
        handleClose={handleCloseCreate}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitCreate}
        open={createModal}
        loading={createLoading}
        filteredDecks={classDetails?.deckId}
      /> */}
    </HomeLayout>
  );
};

export default function CreateFlashcardServices() {
  return (
    <ProfessorRoutes>
      <CreateFlashcard />
    </ProfessorRoutes>
  );
}
