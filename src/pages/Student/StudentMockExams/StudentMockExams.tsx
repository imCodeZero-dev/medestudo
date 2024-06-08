import styles from "./StudentMockExams.module.css";
import { StudentMockExamsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";
import { useStudentMockExams } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { useEffect, useState } from "react";
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
import CustomTabs from "../../../components/LVL3_Cells/CustomTabs/CustomTabs";
import SelectableCards from "../../../components/LVL2_Molecules/SelectableCards/SelectableCards";
import { generateYearsArray } from "../../../utils/hooks/helper";
import Checkbox from "../../../components/LVL1_Atoms/CheckBox";
import CustomNonSelectable from "../../../components/LVL2_Molecules/ControlSelect/CustomNonSelectable";
import CustomInput from "../../../components/LVL1_Atoms/Input/CustomInput";

const StudentMockExams = ({}: StudentMockExamsProps) => {
  const { localeTitles, localeButtons, localeLables, localePlaceholders } =
    useLocale();
  const [cookies] = useCookies(["admin"]);

  const {
    control,
    watch,
    errors,
    startExam,
    updatedInstitutes,
    clearFilter,
    modifiedSubjects,
    clearAllYears,
    selectedYears,
    setSelectedYears,
    selectedSubjects,
    setSelectedSubjects,
    clearAllSubjects,
    selectedInstitutes,
    setSelectedInstitutes,
    selectedExamTypes,
    setSelectedExamTypes,
    clearAllInstitutes,
    clearAllExamTypes,
    tabs,
    selectedTab,
    setSelectedTab,
    filteredExamTitles,
  } = useStudentMockExams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleCreateExamModal = () => {
    dispatch(openCreateModalExam() as any);
  };

  const examType = ["Practice", "Mock"];

  const arrayOfYears = generateYearsArray(25);
  const watchFilter = watch("filter");
  // console.log("watcFilter", watcFilter);
  const filteredYears =
    watchFilter !== ""
      ? arrayOfYears.filter((year) => year.includes(watchFilter))
      : arrayOfYears;
  const filteredExamTypes =
    watchFilter !== ""
      ? filteredExamTitles.filter((year: any) => year.includes(watchFilter))
      : filteredExamTitles;

  return (
    <HomeLayout>
      <div className={styles["StudentMockExams"]}>
        <div className={styles["StudentMockExams-main"]}>
          <div className={styles["StudentMockExams-main-head"]}>
            <Text className={styles["headerText"]}>
              {localeTitles?.TITLE_FILTERED_EXAMS_ARE_LISTED_BELOW}
            </Text>

            <div className="flex flex-col mt-3">
              <div className={styles["HomeLayout-header-mid"]}>
                <CustomTabs
                  tabs={tabs}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className={styles["HomeLayout-header-mid"]}>
                  <Input
                    control={control}
                    name="filter"
                    prefix={<BiSearch size={24} />}
                    placeholder={localePlaceholders.PLACEHOLDER_SEARCH}
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
          </div>

          {selectedTab === 0 && (
            <div className={styles.checkboxContainer}>
              {modifiedSubjects?.map((subject: any, index) => (
                <SelectableCards
                  key={index}
                  control={control}
                  label={subject?.name}
                  name={subject?.name}
                  selectedCheckboxes={selectedSubjects}
                  setSelectedCheckboxes={setSelectedSubjects}
                />
              ))}
            </div>
          )}

          {selectedTab === 1 && (
            <div className={styles.checkboxContainer}>
              {filteredYears?.map((year, index) => (
                <SelectableCards
                  key={index}
                  control={control}
                  label={year}
                  name={year}
                  selectedCheckboxes={selectedYears}
                  setSelectedCheckboxes={setSelectedYears}
                />
              ))}
            </div>
          )}
          {selectedTab === 2 && (
            <div className={styles.instituteContainer}>
              {updatedInstitutes?.map((itm, i) => (
                <Checkbox
                  key={i}
                  control={control}
                  label={itm?.name}
                  name={itm?.name}
                  selectedCheckboxes={selectedInstitutes}
                  setSelectedCheckboxes={setSelectedInstitutes}
                />
              ))}
            </div>
          )}

          {selectedTab === 3 && (
            <div className={styles.checkboxContainer}>
              {filteredExamTypes.map((exam: any, index) => (
                <SelectableCards
                  key={index}
                  control={control}
                  label={exam}
                  name={exam}
                  selectedCheckboxes={selectedExamTypes}
                  setSelectedCheckboxes={setSelectedExamTypes}
                />
              ))}
            </div>
          )}
        </div>
        {/* )} */}
        <div className={styles["StudentMockExams-right"]}>
          <div className={styles["right-section-main"]}>
            <div className={styles["right-section-main-top"]}>
              <div className="flex flex-col justify-between space-y-3">
                <Text className={styles.label}>
                  {localeLables.LABEL_QUESTIONS_AND_TIME}
                </Text>
                <CustomInput
                  name="totalQuestions"
                  control={control}
                  max={2510}
                  min={0}
                  label="Total Questions"
                />
                <CustomInput
                  readOnly
                  name="time"
                  control={control}
                  max={5}
                  min={0}
                  label="Time"
                  unit="hr"
                />
              </div>
              <div className="flex flex-col justify-between space-y-3 mt-6">
                <Text className={styles.label}>
                  {" "}
                  {localeLables.LABEL_Subject}
                </Text>
                <CustomNonSelectable
                  control={control}
                  name="filter_subject"
                  value={selectedSubjects}
                  placeholder="Select Subjects..."
                  clearAll={clearAllSubjects}
                />
              </div>
              <div className="flex flex-col justify-between space-y-3 mt-6">
                <Text className={styles.label}> {localeLables.LABEL_YEAR}</Text>
                <CustomNonSelectable
                  control={control}
                  name="filter_year"
                  value={selectedYears}
                  placeholder="Select Year..."
                  clearAll={clearAllYears}
                />
              </div>
              <div className="flex flex-col justify-between  space-y-3 mt-6">
                <Text className={styles.label}>
                  {localeLables.LABEL_INSTITUTE}
                </Text>
                <CustomNonSelectable
                  control={control}
                  name="filter_institutes"
                  value={selectedInstitutes}
                  placeholder="Select Institutes..."
                  clearAll={clearAllInstitutes}
                />
              </div>
              <div className="flex flex-col justify-between  space-y-3 mt-6">
                <Text className={styles.label}>
                  {localeLables.LABEL_EXAM_TYPE}
                </Text>
                <CustomNonSelectable
                  control={control}
                  name="filter_examType"
                  value={selectedExamTypes}
                  placeholder="Select Exam Types..."
                  clearAll={clearAllExamTypes}
                />
              </div>
            </div>
            <div className="">
              <Button className="yellowButton" onClick={() => startExam()}>
                {localeButtons.BUTTON_START_EXAM}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default function StudentMockExamsServices() {
  return (
    <StudentRoutes>
      <StudentMockExams />
    </StudentRoutes>
  );
}
