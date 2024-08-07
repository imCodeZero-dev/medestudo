import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  createProfessorApi,
  getAllQuestionsAdmindApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import {
  useAllQuestionsAdminQuery,
  useDashboardDataQuery,
} from "../../../../redux/slices/APISlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useQuestionsManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

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
  const [opneProfessorModal, setOpneProfessorModal] = useState<boolean>(false);
  const [professorLoading, setProfessorLoading] = useState<boolean>(false);
  const handleOpenProfessor = () => {
    setOpneProfessorModal(true);
  };
  const handleCloseProfessor = () => {
    setOpneProfessorModal(false);
  };

  const [editProfessorModal, setEditProfessorModal] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const handleOpenEdit = () => {
    setEditProfessorModal(true);
  };
  const handleCloseEdit = () => {
    setEditProfessorModal(false);
  };
  // const {
  //   data: { data: { cards: allQuestions = [] } = {} } = {},

  const {
    allQuestions,
    allQuestionsLoading,
    errorAllQuestions,
    refetchAllQuestions,
  } = useAllQuestionsAdminQuery(cookies?.admin);

  const {
    dashboardData,
    dashboardDataLoading,
    errorDashboardData,
    refetchDashboardData,
  } = useDashboardDataQuery(cookies?.admin);

  const onSubmitCreateProfessor = async (data: any) => {
    const params = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
    };
    try {
      setProfessorLoading(true);
      let response;
      response = await createProfessorApi(params, cookies?.admin?.token);
      console.log("response", response);

      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfessorLoading(false);
    }
  };
  const onSubmitEditProfessor = async (data: any) => {
    // const params = {
    //   name: data?.name,
    //   email: data?.email,
    //   password: data?.password,
    //   phone: data?.phone,
    // };
    // try {
    //   setProfessorLoading(true);
    //   let response;
    //   response = await createProfessorApi(params, cookies?.admin?.token);
    //   showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
    // } catch (error: any) {
    //   showErrorToast(error?.response?.data?.message);
    // } finally {
    //   setProfessorLoading(false);
    // }
  };

  return {
    control,
    errors,
    handleSubmit,
    opneProfessorModal,
    handleOpenProfessor,
    handleCloseProfessor,
    onSubmitCreateProfessor,
    professorLoading,
    editProfessorModal,
    handleOpenEdit,
    handleCloseEdit,
    editLoading,
    onSubmitEditProfessor,
    watch,
    allQuestions,
    dashboardData,
  };
};
