import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  changeInstituteStatusApi,
  createInstituteApi,
  deleteInstituteApi,
  editInstituteTitleApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useAllInstituteQuery } from "../../../../redux/slices/APISlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useInstituteManagement = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["admin"]);

  const [statusLoading, setStatusLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const validationSchema = yup.object().shape({
    title: yup.string().required("title is required"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const [instituteData, setInstituteData] = useState<any>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const handleDeleteModalOpen = (data: any) => {
    setInstituteData(data);
    setDeleteModal(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const [editInstituteModal, setEditInstituteModal] = useState<boolean>(false);
  const handleEditInstitute = (data: any) => {
    setInstituteData(data);
    setValue("title", data?.title);
    setEditInstituteModal(true);
  };
  const handleCloseEdit = () => {
    setEditInstituteModal(false);
  };

  const {
    allInstitute,
    allInstituteLoading,
    errorAllInstitute,
    refetchAllInstitute,
  } = useAllInstituteQuery("admin");
  // console.log("cookies", cookies);

  const onDeleteConfirm = async () => {
    try {
      setCreateLoading(true);
      let response;
      response = await deleteInstituteApi(
        instituteData?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllInstitute();
      showSuccessToast(localeSuccess?.SUCCESS_INSTITUTE_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleDeleteModalClose();
    }
  };
  const onSubmitCreate = async (data: any) => {
    try {
      setCreateLoading(true);
      let response;
      response = await createInstituteApi(data, cookies?.admin?.token);
      console.log("response", response);
      refetchAllInstitute();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_INSTITUTE_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };

  const onSubmitEdit = async (data: { title: string }) => {
    try {
      setCreateLoading(true);
      let response;
      response = await editInstituteTitleApi(
        data,
        instituteData?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllInstitute();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_INSTITUTE_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseEdit();
    }
  };

  const onChangeInstituteStatus = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    // console.log("params", params);
    try {
      setStatusLoading((prev) => ({ ...prev, [data._id]: true }));

      let response;
      response = await changeInstituteStatusApi(
        params,
        data?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllInstitute();
      // showSuccessToast(localeSuccess?.SUCCESS_INSTITUTE_STATUS_CHANGED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setTimeout(() => {
        setStatusLoading((prev) => ({ ...prev, [data._id]: false }));
      }, 900);
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    handleOpenCreate,
    onSubmitEdit,
    handleCloseEdit,
    handleEditInstitute,
    editInstituteModal,
    allInstitute,
    createLoading,
    onChangeInstituteStatus,
    deleteModal,
    handleDeleteModalOpen,
    handleDeleteModalClose,
    onDeleteConfirm,
    watch,
    allInstituteLoading,
    statusLoading,
  };
};
