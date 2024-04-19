import styles from "./ProfessorExams.module.css";
import { ProfessorExamsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useProfessorExams } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";

import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";

import { RiQuestionAnswerLine } from "react-icons/ri";
import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import {
  dummyExams,
  dummyFlashCards,
} from "../ProfessorDashboard/ProfessorDashboard";
import { useState } from "react";
import CreateQuestions from "../../../components/LVL4_Organs/CreateQuestions/CreateQuestions";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";
import CreateExamModal from "../../../components/LVL4_Organs/CreateExamModal/CreateExamModal";
import { examCardData } from "../../../components/LVL3_Cells/DashboardExams/@types";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import EditExamModal from "../../../components/LVL4_Organs/CreateExamModal/EditExamModal";

const ProfessorExams = ({}: ProfessorExamsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    watch,
    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,
    allDecks,
    allExams,
    onDeleteConfirm,
    errors,
    getDetails,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    deleteLoading,
    handleEditClose,
    openEditModal,
    editModal,
    onSubmitEdit,
  } = useProfessorExams();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className={styles["ProfessorExams"]}>
        {/* {createFlashcard ? (
          <CreateQuestions
            setCreateFlashcard={setCreateFlashcard}
            control={control}
            handleSubmit={handleSubmit}
            loading={false}
            onSubmit={onSubmitCreate}
          />
        ) : ( */}
        <div className={styles["ProfessorExams-main"]}>
          {allExams?.map((data: examCardData, i: number) => (
            <DashboardExams
              key={i}
              data={data}
              getDetails={getDetails}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
            />
          ))}
        </div>
        {/* )} */}
        <div className={styles["ProfessorExams-right"]}>
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

            {dummyFlashCards?.slice(0, 8)?.map((data, i) => (
              <DashboardFlashcard key={i} data={data} play minView />
            ))}
          </div>
        </div>

        <CreateExamModal
          errors={errors}
          control={control}
          handleClose={handleCloseCreate}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitCreate}
          open={openCreate}
          loading={createLoading}
          filteredDecks={allDecks}
          watch={watch}
        />

        <EditExamModal
          errors={errors}
          control={control}
          handleClose={handleEditClose}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitEdit}
          open={editModal}
          loading={createLoading}
          filteredDecks={allDecks}
          watch={watch}
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

export default function ProfessorExamsServices() {
  return (
    <ProfessorRoutes>
      <ProfessorExams />
    </ProfessorRoutes>
  );
}
