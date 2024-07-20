import styles from "./StudentResult.module.css";
import { StudentResultProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useStudentResult } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { useState } from "react";

import { examCardData } from "../../../components/LVL3_Cells/DashboardExams/@types";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import Input from "../../../components/LVL1_Atoms/Input";
import { BiSearch } from "react-icons/bi";
import CustomSelect from "../../../components/LVL2_Molecules/ControlSelect/CustomSelect";
import { totalMonths, totalYears } from "../../../utils/constants/constants";
import { useDispatch } from "react-redux";
import { openCreateModalExam } from "../../../redux/actions/modalActions";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import ResultBar from "../../../components/LVL3_Cells/ResultBar/ResultBar";
import ResultDrawer from "../../../components/LVL4_Organs/ResultDrawer/ResultDrawer";
import MockResultModal from "../../../components/LVL4_Organs/MockResultModal/MockResultModal";
import SelectComponent from "../../../components/LVL2_Molecules/ControlSelect/SelectComponent";
import DynamicTabs from "../../../components/LVL3_Cells/Tabs/Tabs";

const StudentResult = ({}: StudentResultProps) => {
  const { localeTitles, localeButtons, localeLables, localePlaceholders } =
    useLocale();
  const [cookies] = useCookies(["student"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(true);

  const {
    control,
    getDetails,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    deleteLoading,
    updatedInstitutes,
    filteredArray,
    clearFilter,
    onDeleteConfirm,
    resultModal,
    handleResultModalClose,
    selecteResultData,
    handleResultModalOpen,
    type,
    handleChangeType,
  } = useStudentResult();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleCreateExamModal = () => {
    dispatch(openCreateModalExam() as any);
  };

  return (
    <HomeLayout>
      <div className={styles["StudentResult"]}>
        <div className={styles["StudentResult-main"]}>
          <div className={styles["StudentResult-main-head"]}>
            <Text className={styles["headerText"]}>
              {localeTitles?.TITLE_FILTERED_EXAMS_ARE_LISTED_BELOW}
            </Text>

            <div className={styles["searchDiv"]}>
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

          <div className="md:px-[24px]">
            <DynamicTabs
              value={type}
              onChange={handleChangeType}
              tabLabels={[
                localeLables?.LABEL_MOCK,
                localeLables?.LABEL_PRACTICE,
              ]}
            />
          </div>
          {filteredArray?.map((data: examCardData, i: number) => (
            <ResultBar
              key={i}
              data={data}
              getDetails={getDetails}
              openDeleteModal={openDeleteModal}
            />
          ))}
        </div>
        {/* )} */}
        <div className={styles["StudentResult-right"]}>
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
              <Text className={styles.label}>{localeLables.LABEL_MONTH}</Text>
              <CustomSelect
                name="filter_month"
                control={control}
                options={totalMonths}
                placeholder="Select Month"
              />
            </div>
          </div>
        </div>

        {/* <CreateExamModal
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
        /> */}

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

        <MockResultModal
          handleClose={handleResultModalClose}
          open={resultModal}
          loading={false}
          totalMarks={Number(selecteResultData?.achievedMarks)}
          totalQuestion={Number(selecteResultData?.totalQuestions)}
        />
      </div>
    </HomeLayout>
  );
};

export default function StudentResultServices() {
  return (
    <StudentRoutes>
      <StudentResult />
    </StudentRoutes>
  );
}
