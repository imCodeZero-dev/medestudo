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
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useProfessorsQuery } from "../../../../redux/slices/APISlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useProfessorManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {},
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

  const {
    allProfessors,
    refetchAllProfessors,
    allProfessorsLoading,
    errorAllProfessors,
  } = useProfessorsQuery(cookies);

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
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
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
    // console.log("params", params);
    // try {
    //   setProfessorLoading(true);
    //   let response;
    //   response = await createProfessorApi(params, cookies?.admin?.token);
    //   console.log("response", response);
    //   showSuccessToast(localeSuccess?.SUCCESS_PROFESSOR_CREATED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setProfessorLoading(false);
    // }
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
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setProfessorLoading(false);
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
    allProfessorsLoading
  };
};
