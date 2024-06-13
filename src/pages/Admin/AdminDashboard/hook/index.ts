import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  changeProfessorStatusApi,
  changeStudentStatusApi,
  createProfessorApi,
  getAllProfessorApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfessorsQuery,
  useStudentsQuery,
} from "../../../../redux/slices/APISlice";
import { AdminCookies } from "../../../../utils/constants/DataTypes";

export const useAdminDashboard = () => {
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
  const [statusLoading, setStatusLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const handleOpenProfessor = () => {
    setOpneProfessorModal(true);
  };
  const handleCloseProfessor = () => {
    setOpneProfessorModal(false);
  };

  // const dispatch = useDispatch();
  // const { allProfessors, loading, error } = useSelector(
  //   (state: any) => state.professors
  // );

  const {
    allProfessors,
    refetchAllProfessors,
    allProfessorsLoading,
    errorAllProfessors,
  } = useProfessorsQuery(cookies as AdminCookies);
  const {
    allStudents,
    refetchAllStudents,
    allStudentsLoading,
    errorAllStudents,
  } = useStudentsQuery(cookies as AdminCookies);

  // console.log("allProfessors", allProfessors);

  const onSubmitCreateProfessor = async (data: any) => {
    const params = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
    };
    console.log("params", params);
    try {
      setProfessorLoading(true);
      let response;
      response = await createProfessorApi(params, cookies?.admin?.token);
      console.log("response", response);
      refetchAllProfessors();

      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfessorLoading(false);
      handleCloseProfessor();
    }
  };

  const onChangeProfessorStatus = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    console.log("params", params);
    try {
      // setProfessorLoading(true);
      setStatusLoading((prev) => ({ ...prev, [data._id]: true }));
      let response;
      response = await changeProfessorStatusApi(
        params,
        data?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllProfessors();
      // showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_STATUS_CHANGED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setStatusLoading((prev) => ({ ...prev, [data._id]: false }));

      // setProfessorLoading(false);
    }
  };

  const onChangeStudentStatus = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    console.log("params", params);
    try {
      setStatusLoading((prev) => ({ ...prev, [data._id]: true }));
      let response;
      response = await changeStudentStatusApi(
        params,
        data?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllStudents();
      // showSuccessToast(localeSuccess?.SUCCESS_STUDENT_STATUS_CHANGED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setStatusLoading((prev) => ({ ...prev, [data._id]: false }));
    }
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
    onChangeProfessorStatus,
    allProfessors,
    watch,
    allStudents,
    allProfessorsLoading,
    allStudentsLoading,
    statusLoading,
    onChangeStudentStatus,
  };
};
