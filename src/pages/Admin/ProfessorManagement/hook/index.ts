import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  changeProfessorStatusApi,
  createProfessorApi,
  deleteProfessorApi,
  updateProfessorApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useProfessorsQuery } from "../../../../redux/slices/APISlice";
import { passwordRegex } from "../../../../utils/constants/constants";
// import { useLocation, useNavigate } from "react-router-dom";

export const useProfessorManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess, localeErrors } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(localeErrors.ERROR_EMAIL_REQUIRED)
      .email(localeErrors.ERROR_INVALID_EMAIL),
    password: yup
      .string()
      .required(localeErrors.ERROR_PASSWORD_REQUIRED)
      .matches(passwordRegex, localeErrors.ERROR_INVALID_PASSWORD),
    name: yup.string().required("Name is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phone: yup.string().required("Phone number is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [opneProfessorModal, setOpneProfessorModal] = useState<boolean>(false);
  const [professorLoading, setProfessorLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [editProfessorModal, setEditProfessorModal] = useState<boolean>(false);
  const [professorData, setProfessorData] = useState<any>();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const handleOpenEdit = (data: any) => {
    setEditProfessorModal(true);
    setProfessorData(data);
    setValue("name", data?.name);
    setValue("email", data?.email);
    setValue("phone", data?.phone);
  };
  const handleCloseEdit = () => {
    setEditProfessorModal(false);
  };

  const handleOpenProfessor = () => {
    setOpneProfessorModal(true);
  };
  const handleCloseProfessor = () => {
    setOpneProfessorModal(false);
  };

  const handleDeleteOpen = (data: any) => {
    setDeleteModal(true);
    setProfessorData(data);
  };
  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const {
    allProfessors,
    refetchAllProfessors,
    allProfessorsLoading,
    errorAllProfessors,
  } = useProfessorsQuery(cookies as any);

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

      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
      refetchAllProfessors();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfessorLoading(false);
      handleCloseProfessor();
    }
  };
  const onSubmitEditProfessor = async (data: any) => {
    const params = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
    };
    console.log("params", params);
    try {
      setEditLoading(true);
      let response;
      response = await updateProfessorApi(
        params,
        professorData?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_UPDATED);
      refetchAllProfessors();
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setEditLoading(false);
      handleCloseEdit();
    }
  };

  const onChangeProfessorStatus = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    console.log("params", params);
    try {
      setProfessorLoading(true);
      let response;
      response = await changeProfessorStatusApi(
        params,
        data?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllProfessors();
      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_STATUS_CHANGED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setProfessorLoading(false);
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteProfessorApi(
        professorData?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllProfessors();
      showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
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
    editProfessorModal,
    handleOpenEdit,
    handleCloseEdit,
    editLoading,
    onSubmitEditProfessor,
    watch,

    allProfessors,
    refetchAllProfessors,
    onChangeProfessorStatus,
    allProfessorsLoading,

    deleteModal,
    handleDeleteOpen,
    handleDeleteClose,
    onDeleteConfirm,
    deleteLoading,
  };
};
