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
} from "../../../../redux/slices/APISlice";
import {
  createClassApi,
  createExamApi,
  deleteExamApi,
  editExamApi,
} from "../../../../utils/api/professors";
import { examForm } from "../../../../utils/constants/DataTypes";
import { useNavigate } from "react-router-dom";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";

export const useProfessorExams = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      // institute: "",
      // year: "",
    },
  });

  // console.log("watchInst", watchInst);

  const { allDecks, allDecksLoading, errorAllDecks, refetchAllDecks } =
    useAllDecksQuery(cookies);

  const {
    allInstitute,
    allInstituteLoading,
    errorAllInstitute,
    refetchAllInstitute,
  } = useAllInstituteQuery(cookies);

  console.log("allInstitute", allInstitute);

  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies);

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [selecteExamId, setSelecteExamId] = useState<null | string>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updatedInstitutes, setUpdatedInstitutes] = useState<any[]>([]);

  const openCreate = useSelector((state: any) => state.modalCreateExam.isOpen);

  const handleCloseCreate = () => {
    dispatch(closeModal2());
  };
  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id: string) => {
    setSelecteExamId(id);
    setDeleteModal(true);
  };
  const openEditModal = (data: examCardData) => {
    setSelecteExamId(data?._id);
    setEditModal(true);
    setValue("title", data?.title);
    setValue("institute", data?.institute);
    setValue("year", data?.year);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const onSubmitEdit = async (data: any) => {
    console.log("onSubmitEdit", data);
    const params = {
      title: data?.title,
      institute: data?.institute?.label,
      year: data?.year?.label,
    };
    try {
      setCreateLoading(true);
      let response;
      response = await editExamApi(
        params,
        selecteExamId as string,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchAllExams();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setCreateLoading(false);
      handleEditClose();
    }
  };

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);
    const params = {
      title: data?.title,
      institute: data?.institute?.label,
      year: data?.year?.label,
    };
    try {
      setCreateLoading(true);
      let response;
      response = await createExamApi(params, cookies?.professor?.token);
      console.log("response", response);
      refetchAllExams();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_CREATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setCreateLoading(false);
      handleCloseCreate();
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteExamApi(
        selecteExamId as string,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchAllExams();
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_DELETED);
      setSelecteExamId(null);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const getDetails = (data: string) => {
    console.log("getDetails", data);
    navigate(`/professor/exams/exam?${data}`, { state: data });
  };

  useEffect(() => {
    if (allInstitute) {
      const updatedInstitutes = allInstitute.map((institute: any) => ({
        ...institute,
        name: institute.title,
        title: undefined,
      }));
      setUpdatedInstitutes(updatedInstitutes);
    }
  }, [allInstitute]);

  return {
    control,
    errors,
    handleSubmit,

    watch,

    handleCloseCreate,
    onSubmitCreate,
    openCreate,
    createLoading,
    allDecks,
    onDeleteConfirm,
    allExams,
    deleteLoading,
    getDetails,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    handleEditClose,
    openEditModal,
    editModal,
    onSubmitEdit,
    updatedInstitutes,
  };
};
