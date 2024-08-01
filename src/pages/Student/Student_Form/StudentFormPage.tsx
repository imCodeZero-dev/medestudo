// import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

import styles from "./StudentFormPage.module.css";
import { MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useStudentFormPage } from "./hook";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import useLocale from "../../../locales";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import Input from "../../../components/LVL1_Atoms/Input";
import { Button } from "../../../components/LVL1_Atoms/Button";
import AuthLayout from "../../../components/LVL5_Layouts/AuthLayout/AuthLayout";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import Header from "../../../components/LVL4_Organs/Header/Header";
import VerticalLinearStepper from "../../../components/LVL3_Cells/Stepper/Stepper";
import { surveySteps } from "../../../utils/constants/constants";
import CollegeDetailForm from "../../../components/LVL3_Cells/CollegeDetailForm/CollegeDetailForm";
import InterestedInForm from "../../../components/LVL3_Cells/InterestedInForm/InterestedInForm";
import GoalsForm from "../../../components/LVL3_Cells/GoalsForm/GoalsForm";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

const StudentFormPage = (props: any) => {
  const {
    localeButtons,
    localeTitles,
    localeLables,
    localePlaceholders,
    localeText,
  } = useLocale();
  const {
    control,
    handleSubmit,
    onSubmit,
    allInstitutes,
    watch,
    modifiedSubjects,
    arrayOfSubjects,
    selectedCheckboxes,
    setSelectedCheckboxes,
    whyChooseArray,
    toggleButtonWhyChoose,
    toggleButtonInterest,
    mainInteresetArray,
    moveBack,
    activeSection,
    formLogin,
  } = useStudentFormPage();
  const getProgress = () => {
    if (activeSection === 0) {
      return 25;
    } else if (activeSection === 1) {
      return 50;
    } else {
      return 75;
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#0030DD" : "#308fe8",
    },
  }));


  return (
    <div className={styles["StudentFormPage"]}>
      <Header showSkip />

      <div className={styles["StudentFormPage-main"]}>
        <div className={styles["StudentFormPage-left"]}>
          <VerticalLinearStepper
            steps={surveySteps(localeLables)}
            activeSection={activeSection}
            label={localeLables.LABEL_SOME_IMPORTANT_QUESTIONS}
          />
          <BorderLinearProgress
            variant="determinate"
            value={activeSection === 0 ? 25 : activeSection * 50}
          />
        </div>

        <div className={styles["StudentFormPage-right"]}>
          {activeSection === 0 && (
            <CollegeDetailForm
              control={control}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              loading={false}
              allInstitutes={allInstitutes}
              moveBack={moveBack}
            />
          )}
          {activeSection === 1 && (
            <InterestedInForm
              control={control}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              loading={false}
              watch={watch}
              allSubjects={modifiedSubjects}
              arrayOfSubjects={arrayOfSubjects}
              selectedCheckboxes={selectedCheckboxes}
              setSelectedCheckboxes={setSelectedCheckboxes}
              moveBack={moveBack}
            />
          )}
          {activeSection === 2 && (
            <GoalsForm
              control={control}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              loading={formLogin}
              watch={watch}
              whyChooseArray={whyChooseArray}
              toggleButtonWhyChoose={toggleButtonWhyChoose}
              mainInteresetArray={mainInteresetArray}
              toggleButtonInterest={toggleButtonInterest}
              moveBack={moveBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function StudentFormPageServices() {
  return (
    // <StudentRoutes>
    <StudentFormPage />
    // </StudentRoutes>
  );
}
