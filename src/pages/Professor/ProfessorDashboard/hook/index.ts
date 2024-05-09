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
import {
  useAllClassesQuery,
  useAllExamsQuery,
} from "../../../../redux/slices/APISlice";
import { useNavigate } from "react-router-dom";
import { getDashboardDataApi } from "../../../../utils/api/professors";

export const useProfessorDashboard = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const navigate = useNavigate();
  const [totals, setTotals] = useState({
    allFlashcards: 0,
    allQuestions: 0,
    allExams: 0,
    allDecks: 0,
  });
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .matches(passwordRegex, "Invalid password format"),
    phone: yup.string().required("Phone number is required"),
    // .matches(/^\d{10}$/, "Invalid phone number format"),
    name: yup.string().required("Name is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
    },
  });

  const { allClasses, allClassesLoading, errorAllClasses, refetchAllClasses } =
    useAllClassesQuery(cookies);
  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies);

  const {
    data: { data: { data: dashboardData = [] } = {} } = {},
    isLoading: dashboardDataLoading,
    error: errorDashboardData,
    refetch: refetchDashboardData,
  } = useQuery(
    [
      "dashboardData",
      {
        cookies,
      },
    ],

    async () => {
      return getDashboardDataApi(cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token,
    }
  );

  console.log("dashboardData", dashboardData);

  const getDetails = (data: string) => {
    navigate(`/professor/classes/deck?${data}`, { state: data });
  };
  const getDetailsExam = (data: string) => {
    navigate(`/professor/exams/exam?${data}`, { state: data });
  };

  const onChangeProfessorStatus = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    console.log("params", params);
    // try {
    //   setProfessorLoading(true);
    //   let response;
    //   response = await changeProfessorStatusApi(
    //     params,
    //     data?._id,
    //     cookies?.admin?.token
    //   );
    //   console.log("response", response);
    //   refetchAllProfessors();
    //   showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_STATUS_CHANGED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.message);
    // } finally {
    //   setProfessorLoading(false);
    // }
  };

  useEffect(() => {
    if (dashboardData?.length > 0) {
      const allQuestions = dashboardData.reduce(
        (total: number, item: any) => total + item.questions,
        0
      );

      const allExams = dashboardData?.reduce(
        (total: number, item: any) => total + item.exams,
        0
      );
      const allFlashcards = dashboardData?.reduce(
        (total: number, item: any) => total + item.flashcards,
        0
      );
      const allDecks = dashboardData?.reduce(
        (total: number, item: any) => total + item.decks,
        0
      );

      setTotals({ allQuestions, allExams, allFlashcards, allDecks });
    }
  }, [dashboardData]);

  return {
    control,
    errors,
    handleSubmit,

    onChangeProfessorStatus,

    watch,
    allClasses,
    allClassesLoading,
    getDetails,
    getDetailsExam,
    allExams,
    dashboardData,
    totals,
  };
};
