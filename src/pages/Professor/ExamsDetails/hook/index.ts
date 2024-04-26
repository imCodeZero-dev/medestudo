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
  createClassDeckApi,
  deleteExamApi,
  editExamApi,
  getExamByIdApi,
} from "../../../../utils/api/professors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAllExamsQuery } from "../../../../redux/slices/APISlice";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";

export const useExamsDetails = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["professor"]);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [editExamLoading, setEditExamLoading] = useState<boolean>(false);
  const location = useLocation();

  const examId = location?.state;

  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const [specificDecks, setSpecificDecks] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteExamModal, setDeleteExamModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<null | string>(null);
  const [editModal, setEditModal] = useState(false);

  const openEditModal = (data: examCardData) => {
    setSelectedExamId(data?._id);
    setEditModal(true);
    setValue("title", data?.title);
    setValue("institute", data?.institute);
    setValue("year", data?.year);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };
  const handleCloseCreate = () => {
    setCreateModal(false);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = (id: string) => {
    console.log("openDeleteModal", id);
    setSelectedExamId(id);
    setDeleteModal(true);
  };

  const handleDeleteExamClose = () => {
    setDeleteExamModal(false);
  };
  const openDeleteExamModal = (id: string) => {
    console.log("openDeleteModal", id);
    setSelectedExamId(id);
    setDeleteExamModal(true);
  };

  const { allExams, allExamsLoading, errorAllExams, refetchAllExams } =
    useAllExamsQuery(cookies);

  const {
    // data: examsDetails,
    data: { data: examsDetails = {} } = {},
    isLoading: examsDetailsLoading,
    error: errorexamsDetails,
    refetch: refetchexamsDetails,
  } = useQuery(
    [
      "examsDetails",
      {
        cookies,
        examId,
      },
    ],

    async () => {
      return getExamByIdApi(examId, cookies?.professor?.token);
    },
    {
      enabled: !!cookies?.professor?.token && !!examId,
    }
  );

  console.log("examsDetails", examsDetails);

  const onSubmitCreate = async (data: any) => {
    console.log("onSubmitCreate", data);

    // try {
    //   setCreateLoading(true);
    //   let response;
    //   response = await createClassDeckApi(
    //     requestData,
    //     classDetails?._id,
    //     cookies?.professor?.token
    //   );
    //   console.log("response", response);
    //   refetchClassDetails();
    //   refetchclassDecks();
    //   showSuccessToast(localeSuccess?.SUCCESS_DECK_CREATED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setCreateLoading(false);
    //   handleCloseCreate();
    // }
  };

  const onDeleteConfirm = async () => {
    // try {
    //   setDeleteLoading(true);
    //   let response;
    //   response = await deleteClassDeckApi(
    //     selectedExamId,
    //     cookies?.professor?.token
    //   );
    //   console.log("response", response);
    //   refetchClassDetails();
    //   refetchclassDecks();
    //   showSuccessToast(localeSuccess?.SUCCESS_DECK_DELETED);
    // } catch (error: any) {
    //   console.log("error", error);
    //   showErrorToast(error?.response?.data?.errorMessage);
    // } finally {
    //   setDeleteLoading(false);
    //   handleDeleteClose();
    // }
  };
  const onExamDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteExamApi(
        selectedExamId as string,
        cookies?.professor?.token
      );
      console.log("response", response);

      refetchAllExams();
      navigate("/professor/exams");
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_DELETED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
      // }
    }
  };

  const onSubmitEditExam = async (data: any) => {
    console.log("onSubmitEdit", data);
    const params = {
      title: data?.title,
      institute: data?.institute?.label,
      year: data?.year?.label,
    };
    try {
      setEditExamLoading(true);
      let response;
      response = await editExamApi(
        params,
        selectedExamId as string,
        cookies?.professor?.token
      );
      console.log("response", response);
      refetchAllExams();
      refetchexamsDetails();
      reset();
      showSuccessToast(localeSuccess?.SUCCESS_EXAM_UPDATED);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.errorMessage);
    } finally {
      setEditExamLoading(false);
      handleEditClose();
    }
  };

  const getDetails = (data: string) => {
    // navigate(`/professor/classes/deck?${data}`, { state: data });
  };

  return {
    control,
    errors,
    handleSubmit,
    setValue,
    watch,

    handleCloseCreate,
    onSubmitCreate,

    openDeleteModal,
    onDeleteConfirm,
    deleteModal,
    handleDeleteClose,
    deleteLoading,

    getDetails,
    examsDetailsLoading,
    examsDetails,
    openDeleteExamModal,
    handleDeleteExamClose,
    onExamDeleteConfirm,
    deleteExamModal,
    editModal,
    openEditModal,
    handleEditClose,
    onSubmitEditExam,
    editExamLoading,
  };
};
