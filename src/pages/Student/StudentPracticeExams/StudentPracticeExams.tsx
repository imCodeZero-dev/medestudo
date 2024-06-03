import styles from "./StudentPracticeExams.module.css";
import { StudentPracticeExamsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";
import { useStudentPracticeExams } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { useState } from "react";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";
import CreateExamModal from "../../../components/LVL4_Organs/CreateExamModal/CreateExamModal";
import { examCardData } from "../../../components/LVL3_Cells/DashboardExams/@types";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import EditExamModal from "../../../components/LVL4_Organs/CreateExamModal/EditExamModal";
import Input from "../../../components/LVL1_Atoms/Input";
import { BiSearch } from "react-icons/bi";
import CustomSelect from "../../../components/LVL2_Molecules/ControlSelect/CustomSelect";
import { totalYears } from "../../../utils/constants/constants";
import { useDispatch } from "react-redux";
import { openCreateModalExam } from "../../../redux/actions/modalActions";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";

const StudentPracticeExams = ({}: StudentPracticeExamsProps) => {
  const { localeTitles, localeButtons, localeLables, localePlaceholders } =
    useLocale();
  const [cookies] = useCookies(["admin"]);

  const {
    control,
    handleSubmit,
    watch,
    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,

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
    updatedInstitutes,
    filteredArray,
    clearFilter,
  } = useStudentPracticeExams();
  // console.log("cookies", cookies);
  // console.log("allExams", allExams);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleCreateExamModal = () => {
    dispatch(openCreateModalExam() as any);
  };

  return (
    <HomeLayout>
      <div className={styles["StudentPracticeExams"]}>
        <div className={styles["StudentPracticeExams-main"]}>
          <div className={styles["StudentPracticeExams-main-head"]}>
            <Text className={styles["headerText"]}>
              {localeTitles?.TITLE_FILTERED_EXAMS_ARE_LISTED_BELOW}
            </Text>

            <div className="flex justify-between items-center mt-6">
              <div className={styles["HomeLayout-header-mid"]}>
                <Input
                  control={control}
                  name="filter_title"
                  prefix={<BiSearch size={24} />}
                  placeholder={localePlaceholders.PLACEHOLDER_SEARCH_TITILE}
                  preDefinedClassName="lesserHeight"
                  preDefinedWrapClassName="inputField-wrap"
                  type="text"
                />
              </div>

              <div>
                <Button className="orangeButton" onClick={clearFilter}>
                  {localeButtons?.BUTTON_CLEAR_FILTERS}
                </Button>
              </div>
            </div>
          </div>
          {filteredArray?.map((data: examCardData, i: number) => (
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
        <div className={styles["StudentPracticeExams-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex flex-col justify-between space-y-3">
              <Text className={styles.label}> {localeLables.LABEL_YEAR}</Text>
              <CustomSelect
                name="filter_year"
                control={control}
                options={totalYears}
                placeholder="Select Year"
              />
            </div>
            <div className="flex flex-col justify-between  space-y-3 mt-6">
              <Text className={styles.label}>
                {localeLables.LABEL_INSTITUTE}
              </Text>
              <CustomSelect
                name="filter_institute"
                control={control}
                options={updatedInstitutes}
                placeholder="Select Institute"
              />
            </div>
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
          filteredDecks={updatedInstitutes}
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
          filteredDecks={updatedInstitutes}
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

export default function StudentPracticeExamsServices() {
  return (
    <StudentRoutes>
      <StudentPracticeExams />
    </StudentRoutes>
  );
}
