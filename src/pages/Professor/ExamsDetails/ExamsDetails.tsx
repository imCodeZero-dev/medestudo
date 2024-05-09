import styles from "./ExamsDetails.module.css";
import { ExamsDetailsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useExamsDetails } from "./hook";
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
import ExamDetailsHead from "../../../components/LVL3_Cells/ExamDetailsHead/ExamDetailsHead";

const ExamsDetails = ({}: ExamsDetailsProps) => {
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
    examQuestions,updatedInstitutes
  } = useExamsDetails();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  // const examId = location?.state;

  console.log("examQuestions?.length", examQuestions);
  const navigateToCreateQuestion = (exam: any) => {
    // console.log("navigateToCreateFlashcard", exam);
    navigate("/professor/exams/exam/question", {
      state: { ...exam, status: "create" },
    });
    // navigate("/professor/classes/deck/flashcard", { state: deck });
  };
  const navigateToEditQuestion = (exam: any) => {
    // console.log("navigateToEditQuestion", exam);
    navigate(`/professor/exams/exam/question`, {
      state: { ...exam, status: "edit" },
    });
    
  };

  return (
    <HomeLayout>
      <div className={styles["ExamsDetails"]}>
        <div className={styles["ExamsDetails-main"]}>
          {examsDetailsLoading ? (
            <div className={"min-h-[75vh] m-auto flex"}>
              <Loader />
            </div>
          ) : (
            <>
              <ExamDetailsHead
                totalQuestions={examQuestions?.length}
                examsDetails={examsDetails}
                openDeleteModal={openDeleteExamModal}
                openEditModal={openEditModal}
              />
              {/* <div className={styles["ExamsDetails-main-inner"]}>
                <div className={styles["main-inner-left"]}>
                  <div className={"flex space-x-2 items-center mb-2"}>
                    <Text className={styles["title"]}>
                      {examsDetails?.title}
                    </Text>
                    <BiSolidPencil
                      onClick={() => openEditModal(examsDetails)}
                      size={22}
                      color="#3359E4"
                      className="cursor-pointer"
                      // onClick={() => openEditModal && openEditModal(data)}
                    />
                  </div>
                  <div className={styles["details"]}>
                    <div className={styles["details-section"]}>
                      <GoQuestion size={12} color="#545961" />{" "}
                      <Text className={styles["detailText"]}>
                        {examsDetails?.institute}
                      </Text>
                    </div>
                    <div className={styles["details-section"]}>
                      <BsBuildings size={12} color="#545961" />{" "}
                      <Text className={styles["detailText"]}>
                        {examsDetails?.institute}
                      </Text>
                    </div>
                    <div className={styles["details-section"]}>
                      <FaRegClock size={12} color="#545961" />{" "}
                      <Text className={styles["detailText"]}>
                        {" "}
                        {examsDetails?.time}
                      </Text>
                    </div>
                    <div className={styles["details-section"]}>
                      <FaRegCalendar size={12} color="#545961" />{" "}
                      <Text className={styles["detailText"]}>
                        {" "}
                        {examsDetails?.year}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className={styles["main-inner-right"]}>
                  <Button
                    className="yellowButton-lessHeight"
                    onClick={() => openDeleteExamModal(examsDetails?._id)}
                  >
                    {localeButtons?.BUTTON_DELETE_EXAM}
                  </Button>
                  <Button className="primaryActive-lessHeight">
                    {localeButtons?.BUTTON_SAVE_EXAM}
                  </Button>
                </div>
              </div> */}
              <div className={styles["ExamsDetails-main-questions"]}>
                {Array.isArray(examQuestions) &&
                  examQuestions?.map((data: any, i: number) => (
                    <QuestionBar
                      key={i}
                      index={i}
                      data={data}
                      getDetails={getDetails}
                      openDeleteModal={openDeleteModal}
                      openEditModal={navigateToEditQuestion}
                    />
                  ))}
              </div>
              <Button
                className="primary"
                onClick={() => navigateToCreateQuestion(examsDetails)}
              >
                + {localeButtons?.BUTTON_ADD_NEW_QUESTION}
              </Button>
            </>
          )}
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

      <EditExamModal
        errors={errors}
        control={control}
        handleClose={handleEditClose}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitEditExam}
        open={editModal}
        loading={editExamLoading}
        filteredDecks={updatedInstitutes}
        watch={watch}
      />

      <ConfirmationModal
        open={deleteExamModal}
        cancelButtonText={localeButtons?.BUTTON_CANCEL}
        confirmButtonText={localeButtons?.BUTTON_DELETE}
        onConfirm={onExamDeleteConfirm}
        icon={<AlertIcon />}
        title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
        handleClose={handleDeleteExamClose}
        loading={deleteLoading}
      />
    </HomeLayout>
  );
};

export default function ExamsDetailsServices() {
  return (
    <ProfessorRoutes>
      <ExamsDetails />
    </ProfessorRoutes>
  );
}
