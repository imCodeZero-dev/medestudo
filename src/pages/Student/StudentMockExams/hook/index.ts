import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";

import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { closeModal2 } from "../../../../redux/slices/CreateExamModalSlice";
import {
  useAllDecksQuery,
  useAllExamsQuery,
  useAllInstituteQuery,
  useAllSubjectsQuery,
} from "../../../../redux/slices/APISlice";
import {
  createClassApi,
  createExamApi,
  deleteExamApi,
  editExamApi,
} from "../../../../utils/api/professors";
import { Tag, examForm } from "../../../../utils/constants/DataTypes";
import { useNavigate } from "react-router-dom";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";

export const useStudentMockExams = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modifiedSubjects, setModifiedSubjects] = useState<Tag[]>();
  const [selectedTab, setSelectedTab] = useState(0);

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
      totalQuestions: 250,
      time: 3,
      filter: "",
      // institute: "",
      // year: "",
    },
  });
  const tabs = ["Subject", "Year", "Institution", "Exam Type"];
  // console.log("watchInst", watchInst);

  const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
    useAllDecksQuery(cookies?.professor?.token);

  const {
    allInstitute,
    allInstituteLoading,
    errorAllInstitute,
    refetchAllInstitute,
  } = useAllInstituteQuery();

  // console.log("allInstitute", allInstitute);

  const {
    allSubjects,
    allSubjectsLoading,
    errorAllSubjects,
    refetchAllSubjects,
  } = useAllSubjectsQuery();

  useEffect(() => {
    if (allSubjects) {
      const transformedArray = allSubjects.map((item: string) => {
        return { _id: item, name: item };
      });
      setModifiedSubjects(transformedArray);
    }
  }, [allSubjects]);

  useEffect(() => {
    setValue("filter", "");
  }, [selectedTab]);

  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies);

  const [updatedInstitutes, setUpdatedInstitutes] = useState<any[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>([]);

  const startExam = () => {
    navigate(`/student/exams/mock/study`, {
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
        return { _id: item?._id, name: item?.title };
      });
      setUpdatedInstitutes(transformedArray);
    }
  }, [allInstitute]);

  const clearFilter = () => {
    setValue("filter_year", "");
    setValue("filter_institute", "");
    setValue("filter_title", "");
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
  };
};
