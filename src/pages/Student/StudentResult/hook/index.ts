import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../config/toastProvider/toastUtils";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { closeModal2 } from "../../../../redux/slices/CreateExamModalSlice";
import { useNavigate } from "react-router-dom";
import { examCardData } from "../../../../components/LVL3_Cells/DashboardExams/@types";
import {
  deleteResultByIDApi,
  getAllResultApi,
} from "../../../../utils/api/Students";
import { ResultDataType } from "../../../../utils/constants/DataTypes";

export const useStudentResult = () => {
  // const navigate = useNavigate();
  const { localeSuccess } = useLocale();
  const [cookies] = useCookies(["student"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredArray, setFilteredArray] = useState<examCardData[]>([]);

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

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [selecteResultId, setSelecteResultId] = useState<null | string>(null);
  const [selecteResultData, setSelecteResultData] =
    useState<ResultDataType | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updatedInstitutes, setUpdatedInstitutes] = useState<any[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const questions = [
    {
      questionText:
        "Man, 50 years old, complaining of palpitations and malaise for 3 days, developed drowsiness and chest pain. He comes to the emergency department bringing the ECG with him. The initial conduct is:",
      options: [
        "Measure biomarkers and initiate therapy for acute coronary syndrome.",
        "Synchronized electrical cardioversion.",
        "Synchronized electrical cardioversion.",
        "Synchronized electrical cardioversion.",
      ],
      correctAnswer: 1,
      selectedAnswer: 2,
      image: "/path/to/image.png",
    },
    // Add more questions as needed
  ];

  useEffect(() => {
    console.log("selecteResultData", selecteResultData);
  }, [selecteResultData]);

  const handleResultModalOpen = (data: any) => {
    setSelecteResultData(data);
    setResultModal(true);
  };

  const handleResultModalClose = () => {
    setResultModal(false);
    setSelecteResultData(null);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openCreate = useSelector((state: any) => state.modalCreateExam.isOpen);

  const {
    data: { data: { allResult = [] } = {} } = {},
    isLoading: allResultLoading,
    error: errorAllResult,
    refetch: refetchAllResult,
  } = useQuery(
    [
      "allResult",
      {
        cookies,
      },
    ],

    async () => {
      return getAllResultApi(cookies?.student?.token);
    },
    {
      enabled: !!cookies?.student?.token,
    }
  );

  console.log("allResult", allResult);

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id: string) => {
    setSelecteResultId(id);
    setDeleteModal(true);
  };

  const onDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      let response;
      response = await deleteResultByIDApi(
        selecteResultId as string,
        cookies?.student?.token
      );
      console.log("response", response);
      refetchAllResult();
      showSuccessToast(localeSuccess?.SUCCESS_RESULT_DELETED);
      setSelecteResultId(null);
    } catch (error: any) {
      console.log("error", error);
      showErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
      handleDeleteClose();
    }
  };

  const getDetails = (data: ResultDataType) => {
    console.log("getDetails", data);
    handleResultModalOpen(data);
    // handleOpenDrawer();
    // navigate(`/student/exams/exam?${data}`, { state: data });
  };

  const clearFilter = () => {
    setValue("filter_year", "");
    setValue("filter_institute", "");
    setValue("filter_title", "");
  };

  const year = watch("filter_year");
  const institute = watch("filter_institute");
  const title = watch("filter_title");
  useEffect(() => {
    console.log("year", year, "institute", institute, "title", title);
    const filteredData = allResult?.filter((item: examCardData) => {
      if (!year && !institute && !title) {
        return true;
      }
      return (
        (!year || item?.year === year?.label) &&
        (!title || item?.title.toLowerCase().includes(title.toLowerCase())) &&
        (!institute || item?.institute === institute?.label)
      );
    });

    setFilteredArray(filteredData);
  }, [allResult, year, institute, title]);

  return {
    control,
    errors,
    handleSubmit,
    watch,
    openCreate,
    createLoading,
    deleteLoading,
    getDetails,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    updatedInstitutes,
    filteredArray,
    clearFilter,
    allResult,
    isDrawerOpen,
    questions,
    handleOpenDrawer,
    handleCloseDrawer,
    onDeleteConfirm,
    resultModal,
    handleResultModalClose,
    handleResultModalOpen,
    selecteResultData,
  };
};
