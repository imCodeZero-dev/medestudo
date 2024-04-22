import styles from "./CreateExamQuestion.module.css";
import { CreateExamQuestionProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useCreateExamQuestion } from "./hook";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";

import { useState } from "react";

import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";

import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import { Class, DecksWithCardCount } from "../../../utils/constants/DataTypes";
import Loader from "../../../components/LVL1_Atoms/Loader";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";
import { dummyQuestions } from "../ProfessorDashboard/ProfessorDashboard";
import QuestionBar from "../../../components/LVL3_Cells/QuestionBar/QuestionBar";
import { BsBuildings } from "react-icons/bs";
import { FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { BiSolidPencil } from "react-icons/bi";
import EditExamModal from "../../../components/LVL4_Organs/CreateExamModal/EditExamModal";
import { totalYears } from "../../../utils/constants/constants";
import TagInput from "../../../components/LVL1_Atoms/Input/TagInput";
import QuillEditor from "../../../components/LVL3_Cells/QuillEditor/QuillEditor";

const CreateExamQuestion = ({}: CreateExamQuestionProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(false);
  const location = useLocation();

  const {
    control,
    handleSubmit,
    watch,
    onSubmitCreate,
    setValue,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
    deleteLoading,
    getDetails,
    examsDetailsLoading,
    examsDetails,
    openDeleteExamModal,
    handleDeleteExamClose,
    onExamDeleteConfirm,
    deleteExamModal,
    editModal,
    openEditModal,
    handleEditClose,
    onSubmitEditExam,
    editExamLoading,
    errors,
    allTags,
  } = useCreateExamQuestion();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText, localePlaceholders } = useLocale();

  const examDetails = location?.state;

  console.log("examDetails", examDetails);

  return (
    <HomeLayout>
      <div className={styles["CreateExamQuestion"]}>
        <div className={styles["CreateExamQuestion-main"]}>
          {examsDetailsLoading ? (
            <div className={"min-h-[75vh] m-auto flex"}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles["CreateExamQuestion-main-inner"]}>
                <div className={styles["main-inner-left"]}>
                  <div className={"flex space-x-2 items-center mb-2"}>
                    <Text className={styles["title"]}>{examsDetails?._id}</Text>
                  </div>
                </div>
                <div className={styles["main-inner-right"]}>
                  <Button
                    className="yellowButton-lessHeight"
                    onClick={() => openDeleteExamModal(examDetails)}
                  >
                    {localeButtons?.BUTTON_DELETE}
                  </Button>
                  <Button className="primaryActive-lessHeight">
                    {localeButtons?.BUTTON_SAVE}
                  </Button>
                </div>
              </div>
              <div className={styles["CreateExamQuestion-main-questions"]}>
                <div className="flex justify-between space-x-6">
                  <div className={styles["inputDiv"]}>
                    <TagInput allTags={allTags} control={control} />
                  </div>
                  <div className={styles["inputDiv"]}>
                    <TagInput allTags={allTags} control={control} />
                  </div>
                </div>
                <div className={styles["CreateExamQuestions-section"]}>
                  <QuillEditor
                    name="question"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE
                    }
                  />
                </div>

                <div className={styles["CreateExamQuestions-section"]}>
                  <Text className={styles.subHeading}>
                    {localeTitles.TITLE_SOLUTION_FOR_THE_QUESTION}
                  </Text>
                </div>
                <div className={styles["CreateExamQuestions-section"]}>
                  <Text className={styles.subHeading}>
                    {localeTitles.TITLE_SOLUTION_FOR_THE_QUESTION}
                  </Text>
                  <QuillEditor
                    name="answer"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                    }
                  />
                </div>
              </div>
              <div className="w-48 mx-auto">
                <Button className="primaryActive">
                  {localeButtons?.BUTTON_ADD_QUESTION}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default function CreateExamQuestionServices() {
  return (
    <ProfessorRoutes>
      <CreateExamQuestion />
    </ProfessorRoutes>
  );
}
