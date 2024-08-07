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
  changeStudentStatusApi,
  createProfessorApi,
  deleteProfessorApi,
  deleteStudentApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useStudentsQuery } from "../../../../redux/slices/APISlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useStudentManagement = () => {
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

  const {
    allStudents,
    refetchAllStudents,
    allStudentsLoading,
    errorAllStudents,
  } = useStudentsQuery(cookies as any);

  const [opneProfessorModal, setOpneProfessorModal] = useState<boolean>(false);
  const [studentLoading, setStudentLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>();
  const [statusLoading, setStatusLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const handleOpenProfessor = () => {
    setOpneProfessorModal(true);
  };
  const handleCloseProfessor = () => {
    setOpneProfessorModal(false);
  };

  const handleDeleteOpen = (data: any) => {
    setDeleteModal(true);
    setStudentData(data);
  };
  const handleDeleteClose = () => {
    setDeleteModal(false);
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
      setTimeout(() => {
        setStatusLoading((prev) => ({ ...prev, [data._id]: false }));
      }, 900);
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteStudentApi(
        studentData?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllStudents();
      // showSuccessToast(localeSuccess?.SUCCESS_STUDENT_DELETED);
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

    watch,
    allStudents,
    allStudentsLoading,
    onChangeStudentStatus,
    studentLoading,
    onDeleteConfirm,
    deleteLoading,
    deleteModal,
    handleDeleteOpen,
    handleDeleteClose,
    statusLoading,
  };
};
