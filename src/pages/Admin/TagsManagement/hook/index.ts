import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";
import {
  changeTagStatusApi,
  createProfessorApi,
  createTagApi,
  deleteTagApi,
  editTagApi,
  getAllTagsApi,
} from "../../../../utils/api/admin";
import useLocale from "../../../../locales";
import { passwordRegex } from "../../../../utils/constants/constants";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useAllTagsQuery } from "../../../../redux/slices/APISlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useTagsManagement = () => {
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
  const [tagData, setTagData] = useState<any>(null);
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
    setTagData(data);
    setDeleteModal(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const [editTagModal, setEditTagModal] = useState<boolean>(false);
  const handleEditTag = (data: any) => {
    setTagData(data);
    setValue("title", data?.title);
    setEditTagModal(true);
  };
  const handleCloseEdit = () => {
    setEditTagModal(false);
  };

  const { allTags, refetchAllTags, allTagsLoading, errorAllTags } =
    useAllTagsQuery(cookies, "admin");

  const onDeleteConfirm = async () => {
    try {
      setCreateLoading(true);
      let response;
      response = await deleteTagApi(tagData?._id, cookies?.admin?.token);
      refetchAllTags();
      showSuccessToast(localeSuccess?.SUCCESS_TAG_DELETED);
    } catch (error: any) {
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
      response = await createTagApi(data, cookies?.admin?.token);
      console.log("response", response);
      refetchAllTags();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_TAG_CREATED);
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
      response = await editTagApi(data, tagData?._id, cookies?.admin?.token);
      console.log("response", response);
      refetchAllTags();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_TAG_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setCreateLoading(false);
      handleCloseEdit();
    }
  };

  const onChangeTagStatus = async (data: any) => {
    const params = {
      status: data?.status === "active" ? "inactive" : "active",
    };
    // console.log("params", params);
    try {
      setStatusLoading((prev) => ({ ...prev, [data._id]: true }));

      let response;
      response = await changeTagStatusApi(
        params,
        data?._id,
        cookies?.admin?.token
      );
      console.log("response", response);
      refetchAllTags();
      // showSuccessToast(localeSuccess?.SUCCESS_TAG_STATUS_CHANGED);
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
    handleEditTag,
    editTagModal,
    allTags,
    createLoading,
    onChangeTagStatus,
    deleteModal,
    handleDeleteModalOpen,
    handleDeleteModalClose,
    onDeleteConfirm,
    watch,
    allTagsLoading,
    statusLoading,
  };
};
