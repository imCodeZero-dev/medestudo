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
import Input from "../../../components/LVL1_Atoms/Input";
import { BiSearch } from "react-icons/bi";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import { generateYearsArray } from "../../../utils/hooks/helper";
import CustomTabs from "../../../components/LVL3_Cells/CustomTabs/CustomTabs";
import SelectableCards from "../../../components/LVL2_Molecules/SelectableCards/SelectableCards";
import Checkbox from "../../../components/LVL1_Atoms/CheckBox";
import CustomInput from "../../../components/LVL1_Atoms/Input/CustomInput";
import CustomNonSelectable from "../../../components/LVL2_Molecules/ControlSelect/CustomNonSelectable";

const StudentPracticeExams = ({}: StudentPracticeExamsProps) => {
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
    questionsTime,
  } = useStudentPracticeExams();
  const arrayOfYears = generateYearsArray(25);
  const watchFilter = watch("filter");

  const filteredSubjects =
    watchFilter !== ""
      ? modifiedSubjects.filter((year: any) => year.includes(watchFilter))
      : modifiedSubjects;

  const filteredInstitutes =
    watchFilter !== ""
      ? updatedInstitutes.filter((year: any) => year.includes(watchFilter))
      : updatedInstitutes;

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
      <div className={styles["StudentPracticeExams"]}>
        <div className={styles["StudentPracticeExams-main"]}>
          <div className={styles["StudentPracticeExams-main-head"]}>
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
              <div className={styles["searchDiv"]}>
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
              {filteredSubjects?.map((subject: any, index) => (
                <SelectableCards
                  key={index}
                  control={control}
                  label={subject}
                  name={subject}
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
              {filteredInstitutes?.map((itm, i) => (
                <Checkbox
                  key={i}
                  control={control}
                  label={itm}
                  name={itm}
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
        <div className={styles["StudentPracticeExams-right"]}>
          <div className={styles["right-section-main"]}>
            <div className={styles["right-section-main-top"]}>
              <div className="flex flex-col justify-between space-y-3">
                <Text className={styles.label}>
                  {localeLables.LABEL_QUESTIONS_AND_TIME}
                </Text>
                <CustomInput
                  name="totalQuestions"
                  control={control}
                  max={questionsTime}
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
                  // unit="hr"
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
                  placeholder="All Subjects"
                  clearAll={clearAllSubjects}
                />
              </div>
              <div className="flex flex-col justify-between space-y-3 mt-6">
                <Text className={styles.label}> {localeLables.LABEL_YEAR}</Text>
                <CustomNonSelectable
                  control={control}
                  name="filter_year"
                  value={selectedYears}
                  placeholder="All Years"
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
                  placeholder="All Institutes"
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
                  placeholder="All Exams"
                  clearAll={clearAllExamTypes}
                />
              </div>
            </div>
            <div className={styles.startBtnDiv}>
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

export default function StudentPracticeExamsServices() {
  return (
    <StudentRoutes>
      <StudentPracticeExams />
    </StudentRoutes>
  );
}
