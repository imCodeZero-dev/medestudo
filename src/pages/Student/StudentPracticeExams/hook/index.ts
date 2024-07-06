import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  useAllExamsQuery,
  useAllInstituteQuery,
  useAllSubjectsQuery,
  useallQuestionsQuery,
} from "../../../../redux/slices/APISlice";

import { Tag, examData, examForm } from "../../../../utils/constants/DataTypes";
import { useNavigate } from "react-router-dom";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";
import { formattedTime } from "../../../../utils/hooks/helper";

export const useStudentPracticeExams = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modifiedSubjects, setModifiedSubjects] = useState<Tag[]>([]);
  const [filteredExamTitles, setFilteredExamTitles] = useState<examCardData[]>(
    []
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [questionsTime, setQuestionsTime] = useState(0);

  const validationSchema = yup.object().shape({
    title: yup.string().required("title is required"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      totalQuestions: 0,
      time: 0,
      filter: "",
    },
  });
  const tabs = ["Subject", "Year", "Institution", "Exam Type"];

  const {
    allInstitute,
    allInstituteLoading,
    errorAllInstitute,
    refetchAllInstitute,
  } = useAllInstituteQuery();

  const {
    allSubjects,
    allSubjectsLoading,
    errorAllSubjects,
    refetchAllSubjects,
  } = useAllSubjectsQuery();

  useEffect(() => {
    if (allSubjects) {
      const transformedArray = allSubjects.map((item: string) => {
        return item;
      });
      setModifiedSubjects(transformedArray);
    }
  }, [allSubjects]);

  useEffect(() => {
    setValue("filter", "");
  }, [selectedTab]);

  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies?.student);
  console.log("allExams", allExams);

  useEffect(() => {
    const filteredData = allExams?.map((item: any) => item.title);

    setFilteredExamTitles(filteredData);
    const getTotalTime = allExams?.reduce(
      (total: number, item: examData) => total + item.questionCount,
      0
    );
    setQuestionsTime(getTotalTime);
    setValue("time", formattedTime(getTotalTime * 5));
    setValue("totalQuestions", getTotalTime);
  }, [allExams]);

  const [updatedInstitutes, setUpdatedInstitutes] = useState<any[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>([]);

  const startExam = () => {
    navigate(`/student/exams/practice/study`, {
      state: {
        selectedYears,
        selectedSubjects,
        selectedInstitutes,
        selectedExamTypes,
        totalQuestions: watch("totalQuestions"),
        time: watch("time"),
      },
    });
  };

  useEffect(() => {
    if (allInstitute) {
      const transformedArray = allInstitute.map((item: any) => {
        return item?.title;
      });
      setUpdatedInstitutes(transformedArray);
    }
  }, [allInstitute]);

  const clearFilter = () => {
    setValue("filter_year", "");
    setValue("filter_institute", "");
    setValue("filter_title", "");
    clearAllYears();
    clearAllSubjects();
    clearAllInstitutes();
    clearAllExamTypes();
  };

  const clearAllYears = () => {
    setSelectedYears([]);
  };
  const clearAllSubjects = () => {
    setSelectedSubjects([]);
  };
  const clearAllInstitutes = () => {
    setSelectedInstitutes([]);
  };
  const clearAllExamTypes = () => {
    setSelectedExamTypes([]);
  };
  const totalQuestionsNumbers = watch("totalQuestions");
  useEffect(() => {
    setValue("time", formattedTime(totalQuestionsNumbers * 5));
  }, [totalQuestionsNumbers]);

  return {
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
  };
};
